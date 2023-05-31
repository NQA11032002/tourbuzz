<?php

namespace App\Http\Controllers\api\tour;

use App\Http\Controllers\Controller;
use App\Models\tour\tour_picture;
use App\Models\tour\tours;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ToursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $id = null)
    {
        date_default_timezone_set("Asia/Ho_Chi_Minh");

        $tours = tours::orderByDesc('id');

        if (!empty($id)) {
            $tours = $tours->where('id', $id);
        }

        if ($request->address_start) {
            $tours = $tours->where('address_start', 'like', $request->address_start);
        }

        if ($request->address_end) {
            $tours = $tours->where('address_end', 'like', $request->address_end);
        }

        if ($request->date_start) {
            $tours = $tours->whereDate('date_start',  $request->date_start);
        }

        if ($request->date_end) {
            $tours = $tours->whereDate('date_end',  $request->date_end);
        }

        if ($request->price_tour) {
            $tours = $tours->where('price_tour', $request->price_tour);
        }

        if ($request->status) {
            $tours = $tours->where('status', $request->status);
        }

        $tours = $tours->with('tour_picture')->with('tour_evaluation')->with('tour_comments')->with('vehicles')->with('user_information')->get();

        if ($tours->count() > 0) {
            $response = [
                'title' => 'get list tours',
                'data' => $tours,
                'status' => 200,
                'detail' => 'get list tours success'
            ];
        } else {
            $response = [
                'title' => 'get list tours',
                'data' => [],
                'status' => 503,
                'detail' => 'get list tours error'
            ];
        }

        return $response;
    }

    public function toursPopular()
    {
        $tours = DB::table("tours as t")->join('tour_evaluation as e', 'e.tour_id', '=', 't.id')
            ->join('tour_picture as p', 'p.tour_id', '=', 't.id')
            ->selectRaw("t.id, t.title, t.description, t.address_start, t.address_end, t.date_start, t.date_end, t.price_tour, t.amount_customer_maximum, t.amount_customer_present, t.status, p.images")
            ->groupBy('t.id')->orderByDesc(DB::raw("sum(e.rate)"))->limit(6)->get();

        if ($tours->count() > 0) {
            $response = [
                'title' => 'get list tours',
                'data' => $tours,
                'status' => 200,
                'detail' => 'get list tours success'
            ];
        } else {
            $response = [
                'title' => 'get list tours',
                'data' => [],
                'status' => 503,
                'detail' => 'get list tours error'
            ];
        }

        return $response;
    }

    public function uploadImages(Request $request){
        $file = $request->file('file');

        //upload file
        //lấy ra file
        $file = $request->file;

        //lấy ra đuôi file
        $ext = $file->extension();

        //đổi tên file gán với đuôi
        $file_name = Str::random(20) . '.' . time() . '.' . $ext;

        //get current url disk backend
        $urlDisk = public_path('assets');

        //replace url disk current backend change to url disk tour
        $directory = str_replace("backend\\public\\assets", "tourbuzz/tour/src/assets/images/tours", $urlDisk);
        $directory = str_replace("\\", "/", $directory);

        //di chuyển file vào thư mực avatar
        $file->move($directory, $file_name);

        $image = $file_name;

        //images will create with a new post if user is chooses images

        DB::table('tour_picture')->insert([
            "tour_id" => $request->post,
            "images" => $image,
        ]);

        $response = [
            'title' => 'create a new post',
            'status' => 200,
            'detail' => 'post was create with the images',
        ];

        return $response;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $rules = [
            "title" => "required|max:150",
            "description" => "required",
            "address_start" => "required",
            "address_end" => "required",
            "date_start" => "required|after_or_equal:today",
            "date_end" => "required|after_or_equal:date_start",
            "price_tour" => "required",
            "detail_price_tour" => "required",
            "amount_customer_maximum" => "required",
            "amount_customer_present" => "required|lt:amount_customer_maximum",
        ];

        $messenger = [
            "title.required" => "Tiêu đề không được để trống",
            "title.max" => "Tiêu đề không được dài hơn 150 ký tự",

            "description.required" => "Tiêu đề không được để trống",
            "address_start.required" => "Địa điểm bắt đầu không được để trống",
            "address_end.required" => "Địa điểm kết thúc không được để trống",
            "date_start.required" => "Ngày bắt đầu không được để trống",
            "date_start.after_or_equal" => "Ngày bắt đầu phải từ hôm nay trở đi",
            "date_end.required" => "Ngày kết thúc không được để trống",
            "date_end.after_or_equal" => "Ngày kết thúc phải lơn hơn ngày bắt đầu",
            "price_tour.required" => "Giá tour không được để trống",
            "detail_price_tour.required" => "Mô tả chi tiết giá tour không được để trống",
            "amount_customer_maximum.required" => "Số lượng khách tối đa không được để trống",
            "amount_customer_present.required" => "Số lượng khách hiện tại không được để trống",
            "amount_customer_present.lt" => "Số lượng khách hiện tại phải nhỏ hơn số lượng khách tối đa",
        ];

        $validator = Validator::make($request->all(), $rules, $messenger);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $tour = DB::table('tours')->insertGetId([
            "user_id" => Auth::user()->user_information->id,
            "vehicle_id" => $request->vehicle_id,
            "title" => $request->title,
            "description" => $request->description,
            "address_start" => $request->address_start,
            "address_end" => $request->address_end,
            "date_start" => $request->date_start,
            "date_end" => $request->date_end,
            "price_tour" => $request->price_tour,
            "detail_price_tour" => $request->detail_price_tour,
            "amount_customer_maximum" => $request->amount_customer_maximum,
            "amount_customer_present" => $request->amount_customer_present,
            "status" => 0
        ]);

        if ($tour) {
            if ($request->images) {
                $images = explode(",", $request->images);

                if (count($images) > 0) {
                    foreach ($images as $image) {
                        tour_picture::insert([
                            "tour_id" => $tour,
                            "images" => $image,
                        ]);
                    }
                }
            }


            $response = [
                'title' => 'Create new a tour',
                'status' => 200,
                'detail' => 'The tour was create success'
            ];
        } else {
            $response = [
                'title' => 'Create new a tour',
                'status' => 500,
                'detail' => 'error'
            ];
        }

        return $response;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(tours $tours)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(tours $tours)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $rules = [
            "title" => "required|max:150",
            "description" => "required",
            "address_start" => "required",
            "address_end" => "required",
            "date_start" => "required|after_or_equal:today",
            "date_end" => "required|after_or_equal:date_start",
            "price_tour" => "required",
            "detail_price_tour" => "required",
            "amount_customer_maximum" => "required",
            "amount_customer_present" => "required|lt:amount_customer_maximum",
        ];

        $messenger = [
            "title.required" => "Tiêu đề không được để trống",
            "title.max" => "Tiêu đề không được dài hơn 150 ký tự",

            "description.required" => "Tiêu đề không được để trống",
            "address_start.required" => "Địa điểm bắt đầu không được để trống",
            "address_end.required" => "Địa điểm kết thúc không được để trống",
            "date_start.required" => "Ngày bắt đầu không được để trống",
            "date_start.after_or_equal" => "Ngày bắt đầu phải từ hôm nay trở đi",
            "date_end.required" => "Ngày kết thúc không được để trống",
            "date_end.after_or_equal" => "Ngày kết thúc phải lơn hơn ngày bắt đầu",
            "price_tour.required" => "Giá tour không được để trống",
            "detail_price_tour.required" => "Mô tả chi tiết giá tour không được để trống",
            "amount_customer_maximum.required" => "Số lượng khách tối đa không được để trống",
            "amount_customer_present.required" => "Số lượng khách hiện tại không được để trống",
            "amount_customer_present.lt" => "Số lượng khách hiện tại phải nhỏ hơn số lượng khách tối đa",
        ];

        $validator = Validator::make($request->all(), $rules, $messenger);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $tour = tours::find($id);

        if ($tour) {
            $tour->vehicle_id = $request->vehicle_id;
            $tour->title = $request->title;
            $tour->description = $request->description;
            $tour->address_start = $request->address_start;
            $tour->address_end = $request->address_end;
            $tour->date_start = $request->date_start;
            $tour->date_end = $request->date_end;
            $tour->price_tour = $request->price_tour;
            $tour->detail_price_tour = $request->detail_price_tour;
            $tour->amount_customer_maximum = $request->amount_customer_maximum;
            $tour->amount_customer_present = $request->amount_customer_present;
            $tour->status = 0;
            $tour->save();

            if ($request->images) {
                tour_picture::where('tour_id', $tour->id)->delete();

                $images = explode(",", $request->images);

                if (count($images) > 0) {
                    foreach ($images as $image) {
                        tour_picture::insert([
                            "tour_id" => $tour->id,
                            "images" => $image,
                        ]);
                    }
                }
            }


            $response = [
                'title' => 'update a tour',
                'status' => 200,
                'detail' => 'The tour was success'
            ];
        } else {
            $response = [
                'title' => 'update a tour',
                'status' => 500,
                'detail' => 'error'
            ];
        }

        return $response;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tour = tours::find($id);

        if (!empty($tour)) {
            $tour->delete();

            $response = [
                'title' => 'delete a tour',
                'status' => 200,
                'detail' => 'The tour was delete success'
            ];
        } else {
            $response = [
                'title' => 'delete a tour',
                'status' => 500,
                'detail' => 'error'
            ];
        }

        return $response;
    }
}

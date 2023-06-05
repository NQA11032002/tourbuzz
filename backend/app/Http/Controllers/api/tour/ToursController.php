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
use Illuminate\Support\Str;

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

        if (!empty($request->title) && $request->title != "undefined") {
            $tours = $tours->where('title', 'like', '%' . $request->title . '%');
        }

        if (!empty($request->order)) {
            switch ($request->order) {
                case "1":
                    $tours = $tours->whereDate('date_start', '=', date('Y-m-d'));
                    break;
                case "2":
                    $tours = $tours->whereRaw('amount_customer_maximum > amount_customer_present');
                    break;
            }
        }

        if (!empty($request->price)) {
            switch ($request->price) {
                case "49":
                    $tours = $tours->whereBetween('price_tour', [1, 49]);
                    break;
                case "50":
                    $tours = $tours->whereBetween('price_tour', [50, 249]);
                    break;
                case "250":
                    $tours = $tours->whereBetween('price_tour', [250, 500]);
                    break;
                case "501":
                    $tours = $tours->where('price_tour', '>=', 501);
                    break;
                default:
                    $tours = $tours->where('price_tour', '>=', 1);
                    break;
            }
        }


        if (!empty($request->address_start) && $request->address_start != "all") {
            $tours = $tours->where('address_start', 'like', '%' . $request->address_start);
        }

        if (!empty($request->address_end) && $request->address_end != "all") {
            $tours = $tours->where('address_end', 'like', '%' . $request->address_end);
        }

        if (!empty($request->date_start) && $request->date_start != "all" && $request->date_start != "undefined") {
            $tours = $tours->whereDate('date_start',  $request->date_start);
        }

        if (!empty($request->date_end) && $request->date_end != "all" && $request->date_end != "undefined") {
            $tours = $tours->whereDate('date_end',  $request->date_end);
        }

        $arr = explode(",", $request->vehicles);

        if (!empty($request->vehicles)) {
            $tours = $tours->whereIn('vehicle_id', $arr);
        }

        if (!empty($request->list)) {
            $tours = $tours->where('status', 1);
        }

        $tours = $tours->with('tour_picture')->with('tour_comments')->with('vehicles')->with('user_information')->get();

        if ($tours->count() > 0) {
            $response = [
                'title' => 'get list tours',
                'data' => $tours,
                'status' => 200,
                'address_end' => $request->address_end,
                "address_start" => $request->address_start,
                'detail' => 'get list tours success'
            ];
        } else {
            $response = [
                'title' => 'get list tours',
                'data' => [],
                'status' => 503,
                'address_end' => $request->address_end,
                "address_start" => $request->address_start,
                'date' => date('Y-m-d'),
                'detail' => 'get list tours error'
            ];
        }

        return $response;
    }

    public function toursPopular()
    {
        $tours = DB::table("tours as t")
            ->join('tour_picture as p', 'p.tour_id', '=', 't.id')
            ->selectRaw("t.id, t.title, t.description, t.address_start, t.address_end, t.date_start, t.date_end, t.price_tour, t.amount_customer_maximum, t.amount_customer_present, t.status, p.images")
            ->groupBy('t.id')->limit(6)->get();

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
            $response = [
                'title' => 'Create new a tour',
                'status' => 200,
                'data' => $tour,
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

    public function uploadImages(Request $request)
    {
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
        $directory = str_replace("backend\\public\\assets", "tour/src/assets/images/tours", $urlDisk);
        $directory = str_replace("\\", "/", $directory);

        //di chuyển file vào thư mực avatar
        $file->move($directory, $file_name);

        $image = $file_name;

        //images will create with a new post if user is chooses images
        if ($request->post !== null) {
            // Lưu ảnh với tourId đã lấy được
            DB::table('tour_picture')->insert([
                "tour_id" => $request->post,
                "images" => $image,
            ]);
        }

        $response = [
            'title' => 'create a new post',
            'status' => 200,
            'detail' => 'post was create with the images',
        ];

        return $response;
    }
}

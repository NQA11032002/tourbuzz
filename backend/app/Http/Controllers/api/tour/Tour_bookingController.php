<?php

namespace App\Http\Controllers\api\tour;

use App\Http\Controllers\Controller;
use App\Models\tour\categories_pay;
use App\Models\tour\status_booking;
use App\Models\tour\tour_booking;
use App\Models\tour\tour_pay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class Tour_bookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $bookings = tour_booking::orderByDesc("id");

        if ($request->tour_id && $request->tour_id != 0) {
            $bookings = $bookings->where('tour_id', $request->tour_id);
        }

        if ($request->user_id && $request->user_id != 0) {
            $bookings = $bookings->where('user_id', $request->user_id);
        }

        if ($request->status_booking_id && $request->status_booking_id != 0) {
            $bookings = $bookings->where('status_booking_id', $request->status_booking_id);
        }

        $bookings = $bookings->with('tour_pay')->with('tours')->paginate(10);

        if ($bookings->count() > 0) {
            $response = [
                'title' => 'get list bookings',
                'data' => $bookings,
                'status' => 200,
                'detail' => 'get list bookings success'
            ];
        } else {
            $response = [
                'title' => 'get list bookings',
                'data' => [],
                'status' => 503,
                'detail' => 'get list bookings error'
            ];
        }

        return $response;
    }

    public function categories_pay()
    {
        $categories_pay = categories_pay::all();

        if ($categories_pay->count() > 0) {
            $response = [
                'title' => 'list categories_pay',
                'status' => 200,
                'data' => $categories_pay,
                'detail' => 'get list categories_pay success'
            ];
        } else {
            $response = [
                'title' => 'list categories_pay',
                'status' => 500,
                'data' => [],
                'detail' => 'error'
            ];
        }

        return $response;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $booking = DB::table("tour_booking")->insertGetId([
            "tour_id" => $request->tour_id,
            "name_user" => $request->user_name,
            "phone" => $request->phone,
            "email" => $request->email,
            "amount_crew" => $request->amount_crew,
            "description" => $request->description,
            "status_booking" => "chờ duyệt",
        ]);

        if ($booking) {
            tour_pay::insert([
                "tour_booking_id" => $booking,
                "category_pay_id" => $request->category_pay_id,
                "total_price" => 0,
            ]);

            $response = [
                'title' => 'The user is booking tour',
                'status' => 200,
                'detail' => 'Booking tour is success'
            ];
        } else {
            $response = [
                'title' => 'The user is booking tour',
                'status' => 200,
                'detail' => 'Booking tour is error'
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
    public function show(tour_booking $tour_booking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(tour_booking $tour_booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $rules = [
            "amount_customer" => "required|max:30",
        ];

        $messenger = [
            "amount_customer.required" => "Số lượng đặt chỗ không được để trống",
            "amount_customer.max" => "Số lượng đặt chỗ tối đa 25 người",
        ];

        $validator = Validator::make($request->all(), $rules, $messenger);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $booking = tour_booking::find($id);

        if (!empty($booking)) {
            $booking->amount_customer = $request->amount_customer;
            $booking->status_booking_id = $request->status_booking_id;
            $booking->save();

            $tour_pay = tour_pay::where('tour_booking_id', $id)->first();

            if (!empty($tour_pay)) {
                $tour_pay->category_pay_id = $request->category_pay_id;
                $tour_pay->total_price = $request->total_price;
                $tour_pay->save();
            }

            $response = [
                'title' => 'The user is changing booking tour',
                'status' => 200,
                'detail' => 'Booking tour is change success'
            ];
        } else {
            $response = [
                'title' => 'The user is changing booking tour',
                'status' => 200,
                'detail' => 'Booking tour is change error'
            ];
        }

        return $response;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tour_pay = tour_pay::where('tour_booking_id', $id)->delete();

        $booking = tour_booking::find($id);

        if (!empty($booking)) {
            $booking->delete();

            $response = [
                'title' => 'delete a booking tour',
                'status' => 200,
                'detail' => 'The booking tour was delete success'
            ];
        } else {
            $response = [
                'title' => 'delete a booking tour',
                'status' => 500,
                'detail' => 'error'
            ];
        }

        return $response;
    }
}

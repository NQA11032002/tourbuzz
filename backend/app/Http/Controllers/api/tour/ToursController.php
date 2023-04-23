<?php

namespace App\Http\Controllers\api\tour;

use App\Http\Controllers\Controller;
use App\Models\tour\tours;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ToursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        date_default_timezone_set("Asia/Ho_Chi_Minh");

        $tours = tours::orderByDesc('id');

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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function update(Request $request, tours $tours)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(tours $tours)
    {
        //
    }
}

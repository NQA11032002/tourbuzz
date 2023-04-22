<?php

namespace App\Http\Controllers\api\common;

use App\Http\Controllers\Controller;
use App\Models\common\province_city;
use Illuminate\Http\Request;

class Province_cityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cities = province_city::all();

        if ($cities->count() > 0) {
            $response = [
                'title' => 'list city',
                'status' => 200,
                'data' => $cities,
                'detail' => 'get list city success'
            ];
        } else {
            $response = [
                'title' => 'list city',
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
    public function show(province_city $province_city)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(province_city $province_city)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, province_city $province_city)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(province_city $province_city)
    {
        //
    }
}

<?php

namespace App\Http\Controllers\api\common;

use App\Http\Controllers\Controller;
use App\Models\common\district;
use Illuminate\Http\Request;

class DistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!empty($request->matp)) {
            $districts = district::where('matp', $request->matp)->get();
        } else {
            $districts = district::all();
        }

        if ($districts->count() > 0) {
            $response = [
                'title' => 'list district',
                'status' => 200,
                'data' => $districts,
                'detail' => 'get list district success'
            ];
        } else {
            $response = [
                'title' => 'list district',
                'status' => 500,
                'data' => $districts,
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
    public function show(district $district)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(district $district)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, district $district)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(district $district)
    {
        //
    }
}

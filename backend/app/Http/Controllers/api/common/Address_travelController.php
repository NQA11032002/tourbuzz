<?php

namespace App\Http\Controllers\api\common;

use App\Http\Controllers\Controller;
use App\Models\social\address_travel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Address_travelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!empty($request->type_travel_id)) {
            $address_travels = address_travel::where('type_travel_id ', $request->type_travel_id)->get();
        } else {
            $address_travels = address_travel::all();
        }

        if ($address_travels->count() > 0) {
            $response = [
                'title' => 'list address_travel',
                'status' => 200,
                'data' => $address_travels,
                'detail' => 'get list address_travel success'
            ];
        } else {
            $response = [
                'title' => 'list address_travel',
                'status' => 500,
                'data' => $address_travels,
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
    public function show(address_travel $address_travel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(address_travel $address_travel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, address_travel $address_travel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(address_travel $address_travel)
    {
        //
    }
}

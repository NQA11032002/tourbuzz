<?php

namespace App\Http\Controllers\api\common;

use App\Http\Controllers\Controller;
use App\Models\common\vehicles;
use Illuminate\Http\Request;

class VehiclesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vehicles = vehicles::all();

        if ($vehicles->count() > 0) {
            $response = [
                'title' => 'list vehicles',
                'status' => 200,
                'data' => $vehicles,
                'detail' => 'get list vehicles success'
            ];
        } else {
            $response = [
                'title' => 'list vehicles',
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
    public function show(vehicles $vehicles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(vehicles $vehicles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, vehicles $vehicles)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(vehicles $vehicles)
    {
        //
    }
}

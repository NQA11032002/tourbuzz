<?php

namespace App\Http\Controllers\api\common;

use App\Http\Controllers\Controller;
use App\Models\social\type_travel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Type_travelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $type_travels = type_travel::with('address_travel')->get();

        if ($type_travels->count() > 0) {
            $response = [
                'title' => 'list type travel',
                'status' => 200,
                'data' => $type_travels,
                'detail' => 'get list travel success'
            ];
        } else {
            $response = [
                'title' => 'list travel',
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
    public function show(type_travel $type_travel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(type_travel $type_travel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, type_travel $type_travel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(type_travel $type_travel)
    {
        //
    }
}

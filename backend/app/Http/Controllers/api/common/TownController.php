<?php

namespace App\Http\Controllers\api\common;

use App\Http\Controllers\Controller;
use App\Models\common\town;
use Illuminate\Http\Request;

class TownController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!empty($request->maqh)) {
            $towns = town::where('maqh', $request->maqh)->get();
        } else {
            $towns = town::all();
        }

        if ($towns->count() > 0) {
            $response = [
                'title' => 'list towns',
                'status' => 200,
                'data' => $towns,
                'detail' => 'get list towns success'
            ];
        } else {
            $response = [
                'title' => 'list towns',
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
    public function show(town $town)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(town $town)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, town $town)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(town $town)
    {
        //
    }
}

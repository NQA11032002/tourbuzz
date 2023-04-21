<?php

namespace App\Http\Controllers\api\social;

use App\Http\Controllers\Controller;
use App\Models\social\posts;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $posts = posts::all()->post_picture;

        if ($posts->count() > 0) {
            return response()->json(["post" => $posts], 200);
        }

        return response()->json([], 500);
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
    public function show(posts $posts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(posts $posts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, posts $posts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(posts $posts)
    {
        //
    }
}
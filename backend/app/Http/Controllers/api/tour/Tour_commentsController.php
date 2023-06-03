<?php

namespace App\Http\Controllers\api\tour;

use App\Http\Controllers\Controller;
use App\Models\tour\tour_comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Tour_commentsController extends Controller
{
    public function comments(Request $request)
    {
        $tourComment = tour_comments::create([
            "user_id" => Auth::user()->user_information->id,
            "tour_id" => $request->tour_id,
            "content" => $request->content,
        ]);

        if (!empty($tourComment)) {
            $response = [
                'title' => 'The user comment tour',
                'status' => 200,
                'detail' => 'success'
            ];
        } else {
            $response = [
                'title' => 'The user comment tour',
                'status' => 500,
                'detail' => 'error'
            ];
        }

        return $response;
    }
}

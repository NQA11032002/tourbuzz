<?php

namespace App\Http\Controllers\api\social;

use App\Http\Controllers\Controller;
use App\Models\auth\users_connect;
use App\Models\auth\users_relationship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class User_ConnectController extends Controller
{
    //get list friend of the user
    public function getFriends()
    {
        $myUser = Auth::user()->user_information->id;

        $friends = users_relationship::where('user_1_id', $myUser)->whereHas('user_information', function ($query) {
            $query = $query->orderByDesc('is_login');
        })->groupBy('user_2_id')->with('user_information')->get();

        if ($friends->count() > 0) {
            $response = [
                'title' => 'list friends of the user',
                'status' => 200,
                'data' => $friends,
                'detail' => 'success'
            ];
        } else {
            $response = [
                'title' => 'list friends of the user',
                'status' => 200,
                'data' => $friends,
                'detail' => 'fail'
            ];
        }

        return $response;
    }

    //get list messenger
    public function getMessenger($user_id)
    {
        $myUser = Auth::user()->user_information->id;

        $messenger = users_connect::orWhere(function ($query) use ($myUser, $user_id) {
            $query->where('user_1_id', $myUser)->where("user_2_id", $user_id);
        })->orWhere(function ($query) use ($myUser, $user_id) {
            $query->where('user_2_id', $myUser)->where("user_1_id", $user_id);
        })->orderBy('id')->with('user_information')->get();

        if ($messenger->count() > 0) {
            $response = [
                'title' => 'list messenger of the user with friend',
                'status' => 200,
                'data' => $messenger,
                'detail' => 'success'
            ];
        } else {
            $response = [
                'title' => 'list messenger of the user with friend',
                'status' => 200,
                'data' => $messenger,
                'detail' => 'messenger is empty'
            ];
        }

        return $response;
    }

    //User chat messenger
    public function insertMessenger(Request $request)
    {
        $myUser = Auth::user()->user_information->id;

        users_connect::create([
            "user_1_id" => $myUser,
            "user_2_id" => $request->user_2,
            "chat_user_1" => $request->chat_user_1,
            "chat_user_2" => $request->chat_user_2,
        ]);
    }
}
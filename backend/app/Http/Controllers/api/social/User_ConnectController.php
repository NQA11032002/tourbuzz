<?php

namespace App\Http\Controllers\api\social;

use App\Http\Controllers\Controller;
use App\Models\auth\users_connect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class User_ConnectController extends Controller
{
    //get list friend of the user
    public function getFriends()
    {
        $myUser = Auth::user()->user_information->id;

        $friends = users_connect::where('user_1_id', $myUser)->orderBy('id')->groupBy('user_2_id')->with('user_information')->get();


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

        $messenger = users_connect::where('user_1_id', $myUser)->where('user_2_id', $user_id)->orderBy('id')->get();

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
                'detail' => 'fail'
            ];
        }

        return $response;
    }
}

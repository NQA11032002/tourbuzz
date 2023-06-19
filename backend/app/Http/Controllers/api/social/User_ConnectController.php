<?php

namespace App\Http\Controllers\api\social;

use App\Http\Controllers\Controller;
use App\Models\auth\user_information;
use App\Models\auth\users_connect;
use App\Models\auth\users_relationship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isNull;

class User_ConnectController extends Controller
{
    //get list friend of the user
    public function getFriends(Request $request)
    {
        $myUser = Auth::user()->user_information->id;

        $friends = users_relationship::whereHas('user_information', function ($query) use ($request) {
            if (!empty($request->keyword)) {
                $query = $query->where("name", "like", "%" . $request->keyword . "%");
            }
            if (!empty($request->user_1_id)) {
                $query = $query->where("user_1_id", $request->user_1_id );
            }

            $query = $query->orderByDesc('is_login');
        })->with('user_information')->get();

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
                'status' => 203,
                'data' => $friends,
                'detail' => 'empty'
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
        })->orderBy('id')->get();

        $friend = user_information::where('id', $user_id)->first();

        if ($messenger->count() > 0) {
            $response = [
                'title' => 'list messenger of the user with friend',
                'status' => 200,
                'data' => $messenger,
                'friend' => $friend,
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

        $message = users_connect::create([
            "user_1_id" => $myUser,
            "user_2_id" => $request->user_friend,
            "chat_user" => $request->chat_user,
        ]);

        if ($message) {
            $response = [
                'title' => 'Send message to friend',
                'status' => 200,
                'detail' => 'success'
            ];
        } else {
            $response = [
                'title' => 'Send message to friend',
                'status' => 500,
                'detail' => 'fail'
            ];
        }

        return $response;
    }

    // Check Friend
    public function checkFriend(Request $request)
    {
        $user_1_id = Auth::user()->user_information->id;

        $friends = users_relationship::where('user_1_id', $user_1_id)->where('user_2_id', $request->user_2_id)->get();
        
        if ($friends->count() > 0) {
            $response = [
                'title' => 'You are friend',
                'status' => 200,
                'data' => $friends,
                'detail' => 'Friend'
            ];
        } else {
            $response = [
                'title' => 'You are not friend yet',
                'status' => 203,
                'data' => $friends,
                'detail' => 'Not Friend yet'
            ];
        }
        return $response;
    }

    // Add Friend
    public function addFriend(Request $request){
        $myUser = Auth::user()->user_information->id;

        $message = users_relationship::create([
            "user_1_id" => $myUser,
            "user_2_id" => $request->user_2_id,
            "status_user_1" => '1',
            "status_user_2" => '0',
            "status" => 'Chờ xác nhận'
        ]);

        if ($message) {
            $response = [
                'title' => 'Add friend success',
                'status' => 200,
                'detail' => 'success'
            ];
        } else {
            $response = [
                'title' => 'Add friend fail',
                'status' => 500,
                'detail' => 'fail'
            ];
        }

        return $response;
    }

    // Accept Friend
    public function acceptFriend(Request $request){
        $user_1_id = Auth::user()->user_information->id;

        $message = users_relationship::where('user_1_id',$user_1_id)
        ->where('user_2_id', $request->user_2_id)
        ->update([
            "status_user_2" => '1',
            "status" => 'Bạn bè'
        ]);

        if ($message) {
            $response = [
                'title' => 'Accept friend success',
                'status' => 200,
                'detail' => 'success'
            ];
        } else {
            $response = [
                'title' => 'Accept friend fail',
                'status' => 500,
                'detail' => 'fail'
            ];
        }

        return $response;
    }

    // Delete Friend
    public function unFriend(Request $request){
        $user_1_id = Auth::user()->user_information->id;

        $message = users_relationship::where('user_1_id',$user_1_id)
        ->where('user_2_id', $request->user_2_id)
        ->delete();

        if ($message) {
            $response = [
                'title' => 'Delete friend success',
                'status' => 200,
                'detail' => 'success'
            ];
        } else {
            $response = [
                'title' => 'Delete friend fail',
                'status' => 500,
                'detail' => 'fail'
            ];
        }

        return $response;
    }

    //Ban chung
    // public function muntualFriend(Request $request){
    //     $user_1_id = Auth::user()->user_information->id;

    //     $result = users_relationship::selectRaw('COUNT(*) as count')
    //     ->where('user_1_id', $user_1_id)
    //     ->whereIn('user_2_id', function ($query) use ($request){
    //         $query->select('user_2_id')
    //             ->from('users_relationship')
    //             ->where('user_1_id', $request->user_2_id);
    //     })
    //     ->where('status', 'Bạn bè')
    //     ->count();
        
    //     if ($result) {
    //         $response = [
    //             'title' => 'Get mutual Friend sucess',
    //             'status' => 200,
    //             'detail' => 'success',
    //             'data' => $result
    //         ];
    //     } else {
    //         $response = [
    //             'title' => 'Get mutual Friend fail',
    //             'status' => 500,
    //             'detail' => 'fail',
    //             'data' => $result

    //         ];
    //     }

    //     return $response;
    // }
}
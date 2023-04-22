<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $rules = [
            "email" => 'required|email',
            "password" => 'required'
        ];

        $messenger = [
            "email.required" => 'Email đăng nhập không được để trống',
            "email.email" => 'Email đăng nhập không đúng định dạng',
            "password.required" => 'Mật khẩu đăng nhập không được để trống',
        ];

        $validator = Validator::make($request->all(), $rules, $messenger);

        if ($validator->fails()) {
            return $validator->errors();
        }


        $email = $request->email;
        $password = $request->password;

        $checkLogin = Auth::attempt([
            'email' => $email,
            'password' => $password,
        ]);

        if ($checkLogin) {
            $user = Auth::user();

            //create new token for user
            $token = $user->createToken('auth_token')->plainTextToken;

            $response = [
                'status' => 200,
                'token' => $token,
            ];
        } else {
            $response = [
                'status' => 401,
                'title' => 'Unauthorized',
            ];
        }

        return $response;
    }
}

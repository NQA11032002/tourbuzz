<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\Controller;
use App\Models\auth\roles;
use App\Models\auth\user_image;
use Carbon\Carbon;
use DB;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //log in account user
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

        $arr = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        $checkLogin = Auth::attempt($arr);
        if ($checkLogin) {
            if (auth('sanctum')->check()) {
                auth()->user()->tokens()->delete();
            }

            $user = Auth::user();

            //create new token for user
            $token = $user->createToken('auth_token', ["*"], Carbon::now()->addHours(3))->plainTextToken;

            $response = [
                'status' => 200,
                'token' => $token,
                'data' => $user->user_information,
            ];
        } else {
            $response = [
                'status' => 401,
                'title' => 'Unauthorized',
            ];
        }

        return $response;
    }

    //Register user
    public function register(Request $request)
    {
        $rules = [
            "email" => 'required|email|unique:users,email',
            "password" => [
                'required',
                'min:6',
                'regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/',
            ],
            "name" => 'required|max:80',
            'birth_date' => 'required|date',
        ];

        $messenger = [
            "email.required" => 'Email đăng nhập không được để trống',
            "email.email" => 'Email đăng nhập không đúng định dạng',
            "email.unique" => 'Email đã được sử dụng',
            "password.required" => 'Mật khẩu đăng nhập không được để trống',
            "password.min" => "Mật khẩu phải trên 6 ký tự",
            "password.regex" => "Mật khẩu phải bao gồm *số-chữ thường-chữ hoa*",
            "name.required" => "Vui lòng điền tên của bạn",
            "name.max" => "Tên phải dưới 80 ký tự",
            "birth_date.required" => "Ngày sinh không được để trống",
            "birth_date.date" => "Ngày sinh không hợp lệ"
        ];

        $validator = Validator::make($request->all(), $rules, $messenger);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $user = DB::table('users')->insertGetId([
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "role_id" => 1,
            "status" => 1
        ]);

        if ($user) {
            DB::table('user_information')->insertGetId([
                "user_id" => $user,
                "name" => $request->name,
                "birth_date" => $request->birth_date,
                "image" => "./assets/img/avatar/default.png",
            ]);

            $response = [
                'status' => 200,
                'title' => 'Register new user success'
            ];
        } else {
            $response = [
                'status' => 500,
                'title' => 'Register new user false'
            ];
        }

        return $response;
    }

    //log out account user
    public function logout()
    {
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Logout successfully', 'status' => 200]);
    }

    //reset password account user
    public function resetPassword(Request $request)
    {

        $rules = [
            "old_password" => "required",
            'new_password' => [
                'required',
                'min:6',
                'regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/',
            ],
            'confirm_password' => [
                'required',
                'same:new_password',
            ]
        ];

        $messenger = [
            'old_password.required' => ":attribute không được để trống",
            'new_password.required' => ":attribute không được để trống",
            'new_password.min' => ":attribute ít nhất 6 ký tự",
            'new_password.regex' => ":attribute phải bao gồm *(chữ thường, chữ hoa và số)",
            'confirm_password.required' => ":attribute không được để trống",
            'confirm_password.same' => ":attribute không đúng",
        ];

        $attributes = [
            'old_password' => 'Mật khẩu hiện tại',
            'new_password' => 'Mật khẩu mới',
            'confirm_password' => 'Mật khẩu xác nhận',
        ];

        $validator = Validator::make($request->all(), $rules, $messenger, $attributes);

        if ($validator->fails()) {
            $errors = $validator->errors();

            return $errors;
        }

        $user = Auth::user();
        //Check old password
        if (!Hash::check($request->old_password, Auth::user()->password)) {
            $response = [
                'title' => 'Current password is not correct',
                'status' => 200,
            ];
        } else {


            $user->password = Hash::make($request->new_password);
            $user->save();

            $response = [
                'title' => 'password has changed',
                'status' => 200,
            ];
        }

        return $response;
    }

    //get roles
    public function roles()
    {
        $roles = roles::all();

        if ($roles->count() > 0) {
            $response = [
                'title' => 'list roles',
                'status' => 200,
                'data' => $roles,
                'detail' => 'get list roles success'
            ];
        } else {
            $response = [
                'title' => 'list roles',
                'status' => 500,
            ];
        }

        return $response;
    }
}

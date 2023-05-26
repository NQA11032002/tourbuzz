<?php

namespace App\Http\Controllers\api\social;

use App\Http\Controllers\Controller;
use App\Models\auth\user;
use App\Models\social\posts;
use Illuminate\Http\Request;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\auth\user_information;
use App\Models\auth\users_connect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $users = user_information::with('posts')->with('users_connect')->where('id', Auth::user()->user_information->id)->get();
        // $users = PostResource::collection($users);

        foreach ($users as $user) {
            foreach ($user->users_connect as $connect) {
                $connect->user_information;
            }
        }

        if ($users->count() > 0) {
            $title = 'success';
            $status = 200;
            $detail = 'get list user has many posts';
            $users = new UserCollection($users, $status, $title, $detail);
        } else {
            $title = 'server error';
            $status = 500;
            $detail = '';
        }

        $response = [
            'title' => $title,
            'status' => $status,
            'detail' => $detail,
            'data' => $users,
        ];

        return $response;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $rules = [
            'email' => 'required|max:250|email|unique:users,email',
            'role_id' => 'required',
            'password' => [
                'required',
                'min:6',
                'regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/',
            ],
            'name' => 'required|min:3|max:40',
            'birth_date' => 'required|before_or_equal:today',
            'gender' => 'required',
        ];

        $messenger = [
            'email.required' => ":attribute không được để trống",
            'email.unique' => ":attribute đã tồn tại",
            'email.max' => ":attribute của bạn quá dài. Email chỉ được dưới 40 ký tự",
            'email.email' => ":attribute không đúng định dạng '@gmail.com'",
            'role_id.required' => ":attribute không được để trống",
            'password.required' => ":attribute không được để trống",
            'password.min' => ":attribute ít nhất 6 ký tự",
            'password.regex' => ":attribute phải bao gồm *(chữ thường, chữ hoa và số)",
            'name.required' => ":attribute không được để trống",
            'name.min' => ":attribute của bạn quá ngắn.",
            'name.max' => ":attribute của bạn không được vượt quá 40 ký tự",
            'birth_date.required' => ":attribute không được để trống",
            'birth_date.after_or_equal' => ":attribute của bạn chưa đủ tuổi để dùng ứng dụng",
            'gender' => ":attribute không được để trống"
        ];

        $attributes = [
            'email' => 'Email',
            'role_id' => 'Vai trò',
            'password' => 'Mật khẩu',
            'name' => 'Họ tên',
            'birth_date' => 'Ngày sinh',
            'gender' => 'Giới tính',
        ];

        $validator = Validator::make($request->all(), $rules, $messenger, $attributes);

        if ($validator->fails()) {
            $errors = $validator->errors();

            return $errors;
        }

        //create new user
        $user = DB::table('users')->insertGetId([
            'role_id' => $request->role_id,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status' => 1
        ]);

        //create user success
        //create information of new user
        $user_info = DB::table("user_information")->insertGetId([
            "user_id" => $user,
            "name" => $request->name,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
        ]);

        if (!empty($user_info)) {
            $response = [
                'title' => 'create new user',
                'status' => 200,
                'detail' => 'create new user success',
            ];
        } else {
            $response = [
                'title' => 'error',
                'status' => 500,
                'detail' => 'create new user error',
            ];
        }

        return $response;
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
    public function show($id)
    {
        $user = user_information::with('posts');

        if (!empty($user)) {
            $user = $user->where('id', $id)->orWhere('name', 'like', '%' . $id . '%');
        }

        $user = $user->get();

        // $users = PostResource::collection($users);

        if ($user->count() > 0) {
            $title = 'success';
            $status = 200;
            $detail = 'get list user has many posts';
            $users = new UserCollection($user, $status, $title, $detail);
        } else {
            $title = 'server error';
            $status = 500;
            $detail = '';
            $users = [];
        }

        $response = [
            'title' => $title,
            'status' => $status,
            'detail' => $detail,
            'data' => $users,
        ];

        return $response;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user_information $users)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $rules = [
            'name' => 'required|max:40',
            'birth_date' => 'required|before_or_equal:today',
            'gender' => 'required',
            'address' => 'max:300',
            'phone' => 'max:13',
        ];

        $messenger = [
            'gender.required' => ":attribute không được để trống",
            'address.max' => ":attribute không được vượt quá 300 ký tự",
            'phone.max' => ":attribute không được vượt 13 số",
            'name.required' => ":attribute không được để trống",
            'name.max' => ":attribute của bạn không được vượt quá 40 ký tự",
            'birth_date.required' => ":attribute không được để trống",
            'birth_date.after_or_equal' => ":attribute của bạn chưa đủ tuổi để dùng ứng dụng",

        ];

        $attributes = [
            'gender' => 'Giới tính',
            'address' => 'Địa chỉ',
            'phone' => 'Số điện thoại',
            'name' => 'Họ tên',
            'birth_date' => 'Ngày sinh'
        ];

        $validator = Validator::make($request->all(), $rules, $messenger, $attributes);

        if ($validator->fails()) {
            $errors = $validator->errors();

            return $errors;
        }


        //create user success
        //create information of new user
        $user = user_information::find($id);

        if (!empty($user)) {
            $user->name = $request->name;
            $user->birth_date = $request->birth_date;
            $user->gender = $request->gender;
            $user->address = $request->address;
            $user->phone = $request->phone;
            $user->education = $request->education;
            $user->save();

            $response = [
                'title' => 'update user',
                'status' => 200,
                'detail' => 'update user success',
            ];
        }

        return $response;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = user_information::where('user_id', $id)->first();

        if (!empty($user)) {
            $account = user::find($user->user_id);

            if (!empty($account)) {
                $account->delete();


                $response = [
                    'title' => 'delete user',
                    'status' => 200,
                    'detail' => 'delete user success',
                ];
            }
        } else {
            $response = [
                'title' => 'user not exist',
                'status' => 500,
                'detail' => 'delete user error',
            ];
        }

        return $response;
    }
}

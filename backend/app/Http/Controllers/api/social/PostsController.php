<?php

namespace App\Http\Controllers\api\social;

use App\Http\Controllers\Controller;
use App\Models\social\post_comments;
use App\Models\social\post_favorite;
use App\Models\social\post_picture;
use App\Models\social\posts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($keyWork = null)
    {
        $posts = posts::whereHas('user_information', function ($query) use ($keyWork) {
            if (!empty($keyWork)) {
                $query->where('name', 'like', '%' . $keyWork . '%')->orWhere('address', 'like', '%' . $keyWork . '%');
            }
        })->orderByDesc('id')->with('post_picture')->with('post_comments')->with('user_information')->with('post_favorite')->with('type_travel')->with('address_travel')->get();


        foreach ($posts as $post) {
            foreach ($post->post_comments as $comment) {
                $comment->user_information;
            }
        }

        if ($posts->count() > 0) {
            $response = [
                'title' => 'list posts on page social',
                'status' => 200,
                'data' => $posts,
                'detail' => 'information of posts are show success'
            ];
        } else {
            $response = [
                'title' => 'list posts on page social',
                'status' => 500,
                'data' => [],
                'detail' => 'information of posts are show error'
            ];
        }

        return $response;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $rules = [
            "address_travel_id" => 'required',
            "type_travel_id" => 'required',
            "title" => 'required|max:200',
            "content" => 'required|max:300',
        ];

        $messenger = [
            "address_travel_id.required" => 'Hãy chọn địa chỉ du lịch của bạn',
            "type_travel_id.required" => 'Hãy chọn loại hình du lịch mà bạn muốn chia sẽ',
            "title.required" => 'Tiêu đề không được để trống',
            "title.max" => 'Tiêu đề tối đa là 200 ký tự',
            "content.required" => 'Tiêu đề không được để trống',
            "content.max" => 'Tiêu đề tối đa là 300 ký tự',
        ];

        $validator = Validator::make($request->all(), $rules, $messenger);

        if ($validator->fails()) {
            return $validator->errors();
        }

        //create new post and get id new post
        $post = DB::table('posts')->insertGetId([
            "user_id" => Auth::user()->user_information->id,
            "address_travel_id" => $request->address_travel_id,
            "type_travel_id" => $request->type_travel_id,
            "title" => $request->title,
            "content" => $request->content,
            "status" => 1
        ]);

        //images will create with a new post if user is chooses images
        if (!empty($request->images)) {
            $images = explode(',', $request->images);

            if (count($images) > 0) {
                foreach ($images as $image) {
                    DB::table('post_picture')->insert([
                        "post_id" => $post,
                        "images" => $image
                    ]);
                };
            } else {
                DB::table('post_picture')->insert([
                    "post_id" => $post,
                    "images" => $images
                ]);
            }
        }

        if (!empty($post)) {
            $response = [
                'title' => 'create a new post',
                'status' => 200,
                'detail' => 'post was create with the images'
            ];
        } else {
            $response = [
                'title' => 'create a new post',
                'status' => 500,
                'data' => [],
                'detail' => 'error create new post'
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
    public function update(Request $request, $id)
    {
        $rules = [
            "user_id" => 'required',
            "address_travel_id" => 'required',
            "type_travel_id" => 'required',
            "title" => 'required|max:200',
            "content" => 'required|max:300',
        ];

        $messenger = [
            "user_id.required" => 'ID người đăng không được để trống',
            "address_travel_id.required" => 'Hãy chọn địa chỉ du lịch của bạn',
            "type_travel_id.required" => 'Hãy chọn loại hình du lịch mà bạn muốn chia sẽ',
            "title.required" => 'Tiêu đề không được để trống',
            "title.max" => 'Tiêu đề tối đa là 200 ký tự',
            "content.required" => 'Tiêu đề không được để trống',
            "content.max" => 'Tiêu đề tối đa là 300 ký tự',
        ];

        $validator = Validator::make($request->all(), $rules, $messenger);

        if ($validator->fails()) {
            return $validator->errors();
        }

        //update post by id
        $post = posts::find($id);

        if (!empty($post)) {
            $post->user_id = $request->user_id;
            $post->address_travel_id = $request->address_travel_id;
            $post->type_travel_id = $request->type_travel_id;
            $post->title = $request->title;
            $post->content = $request->content;
            $post->status = 1;
            $post->save();

            //images will update with a post if user is chooses change images
            if (!empty($request->images)) {
                $images = explode(',', $request->images);

                if (count($images) > 0) {
                    //delete images of post
                    post_picture::where('post_id', $post->id)->delete();

                    //insert new images change with post
                    foreach ($images as $image) {
                        DB::table('post_picture')->insert([
                            "post_id" => $post->id,
                            "images" => $image
                        ]);
                    };
                }
            }

            $response = [
                'title' => 'update a post',
                'status' => 200,
                'detail' => 'post updated with the images'
            ];
        } else {
            $response = [
                'title' => 'can not find post to update',
                'status' => 500,
                'detail' => 'error update post'
            ];
        }

        return $response;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //update post by id
        $post = posts::find($id);

        if (!empty($post)) {
            post_picture::where('post_id', $id)->delete();
            post_comments::where('post_id', $id)->delete();
            post_favorite::where('post_id', $id)->delete();

            $post->delete();

            $response = [
                'title' => 'delete a post',
                'status' => 200,
                'detail' => 'post deleted success'
            ];
        } else {
            $response = [
                'title' => 'can not find post to delete',
                'status' => 500,
                'detail' => 'error delete post'
            ];
        }

        return $response;
    }
}

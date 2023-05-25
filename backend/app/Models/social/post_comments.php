<?php

namespace App\Models\social;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\auth\user_information;
use App\Models\social\post_comments_reply;

class post_comments extends Model
{
    use HasFactory;
    protected $table = "post_comments";
    protected $fillable = ["post_id", "user_id", "content"];

    public function user_information()
    {
        return $this->hasMany(user_information::class, 'id', "user_id");
    }

    public function post_comments_reply()
    {
        return $this->hasMany(post_comments_reply::class, 'comment_id', "id");
    }
}

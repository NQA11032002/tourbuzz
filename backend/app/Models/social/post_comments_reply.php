<?php

namespace App\Models\social;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\auth\user_information;

class post_comments_reply extends Model
{
    use HasFactory;
    protected $table = "post_comment_reply";
    protected $fillable = ["comment_id", "users_id_1", "users_id_2", "content"];
    public function user_information()
    {
        return $this->hasMany(user_information::class, 'id', "users_id_1");
    }

    public function user_information_2()
    {
        return $this->hasMany(user_information::class, 'id', "users_id_2");
    }
}
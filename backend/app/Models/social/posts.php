<?php

namespace App\Models\social;

use App\Models\auth\user_information;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\social\post_picture;
use App\Models\social\address_travel;
use App\Models\social\type_travel;
use App\Models\social\post_comments;
use App\Models\social\post_favorite;

class posts extends Model
{
    use HasFactory;
    protected $table = "posts";
    protected $fillable = ["user_id", "address_travel_id", "type_travel_id", "title", "content", "status", "created_at", "updated_at"];

    public function post_picture()
    {
        return $this->hasMany(post_picture::class, "post_id", "id");
    }
    public function post_comments()
    {
        return $this->hasMany(post_comments::class, "post_id", "id");
    }

    public function post_favorite()
    {
        return $this->hasMany(post_favorite::class, "post_id", "id");
    }

    public function user_information()
    {
        return $this->belongsTo(user_information::class, 'user_id', "id");
    }
    public function type_travel()
    {
        return $this->hasOne(type_travel::class, 'id', "type_travel_id");
    }

    public function address_travel()
    {
        return $this->hasOne(address_travel::class, 'id', "address_travel_id");
    }
}

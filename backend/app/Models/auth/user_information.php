<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\social\posts;
use App\Models\auth\user;

class user_information extends Model
{
    use HasFactory;
    protected $table = 'user_information';
    protected $fillable = ["user_id", "name", "birth_date", "gender", "phone", "education", "image"];

    public function user()
    {
        return $this->belongsTo(user::class, 'user_id', 'id');
    }

    public function posts()
    {
        return $this->hasMany(posts::class, 'user_id', 'id');
    }

    public function users_connect()
    {
        return $this->hasMany(users_connect::class, "user_1_id", "id");
    }
}

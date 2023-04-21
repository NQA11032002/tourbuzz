<?php

namespace App\Models\social;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\social\post_picture;

class posts extends Model
{
    use HasFactory;

    public function post_picture()
    {
        return $this->hasMany(post_picture::class, "post_id", "id");
    }
}
<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_information extends Model
{
    use HasFactory;
    protected $fillable = ["user_id", "name", "birth_date", "gender", "gender", "phone", "education"];
}
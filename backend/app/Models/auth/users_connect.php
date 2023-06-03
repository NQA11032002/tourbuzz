<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\auth\user_information;

class users_connect extends Model
{
    use HasFactory;
    protected $table = "users_connect";
    protected $fillable = ["user_1_id", "user_2_id", "chat_user"];

    public function user_information()
    {
        return $this->belongsTo(user_information::class, "user_2_id", "id");
    }
}

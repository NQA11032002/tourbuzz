<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\auth\user_information;

class users_relationship extends Model
{
    use HasFactory;
    protected $table = "users_relationship";
    protected $fillable = ["user_1_id", "user_2_id", "status_user_1", "status_user_2", "status"];
    public function user_information()
    {
        return $this->belongsTo(user_information::class, "user_2_id", "id");
    }
}
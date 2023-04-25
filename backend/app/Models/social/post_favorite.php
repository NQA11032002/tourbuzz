<?php

namespace App\Models\social;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\auth\user_information;

class post_favorite extends Model
{
    use HasFactory;

    protected $table = "post_favorite";
    protected $fillable = ["post_id", "user_id"];

    public function user_information()
    {
        return $this->hasOne(user_information::class, 'user_id', "id");
    }
}

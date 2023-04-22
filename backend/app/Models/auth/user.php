<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\auth\user_information;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class user extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    protected $hidden = ["password"];
    protected $fillable = ["role_id", "email", "email_verify", "password", "status"];
    public function user_information()
    {
        return $this->hasOne(user_information::class, 'user_id', 'id');
    }
}

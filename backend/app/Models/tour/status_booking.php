<?php

namespace App\Models\tour;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class status_booking extends Model
{
    use HasFactory;

    protected $table = "status_booking";
    protected $fillable = ["name"];
}

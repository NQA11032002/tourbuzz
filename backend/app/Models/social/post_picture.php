<?php

namespace App\Models\social;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\social\posts;

class post_picture extends Model
{
    use HasFactory;
    protected $table = "post_picture";

    protected $fillable = ["post_id", "images"];

    public function posts()
    {
        return $this->belongsTo(posts::class, "post_id", "id");
    }
}

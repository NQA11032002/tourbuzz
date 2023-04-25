<?php

namespace App\Models\tour;

use App\Models\auth\user_information;
use App\Models\tour\tours;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tour_comments extends Model
{
    use HasFactory;
    protected $table = "tour_comments";
    protected $fillable = ["user_id", "tour_id", "content"];

    public function user_information()
    {
        return $this->hasOne(user_information::class, "id", "user_id");
    }

    public function tours()
    {
        return $this->belongsTo(tours::class, "id", "tour_id");
    }
}

<?php

namespace App\Models\tour;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\auth\user_information;
use App\Models\tour\tours;

class tour_evaluation extends Model
{
    use HasFactory;
    protected $table = "tour_evaluation";

    protected $fillable = ["user_id", "tour_id", "rate"];

    public function user_information()
    {
        return $this->hasOne(user_information::class, "id", "user_id");
    }

    public function tours()
    {
        return $this->belongsTo(tours::class, "id", "tour_id");
    }
}

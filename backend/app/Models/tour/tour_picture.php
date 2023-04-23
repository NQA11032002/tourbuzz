<?php

namespace App\Models\tour;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\tour\tours;

class tour_picture extends Model
{
    use HasFactory;
    protected $table = "tour_picture";
    protected $fillable = ["tour_id", "images"];

    public function tours()
    {
        return $this->belongsTo(tours::class, "id", "tour_id");
    }
}

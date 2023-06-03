<?php

namespace App\Models\tour;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\tour\tours;
use App\Models\auth\user_information;

class tour_booking extends Model
{
    use HasFactory;
    protected $table = "tour_booking";
    protected $fillable = ["name_user", "phone", "email", "amount_crew", "tour_id", "description", "status_booking"];

    public function status_booking()
    {
        return $this->hasOne(status_booking::class, "id", "status_booking_id");
    }

    public function tours()
    {
        return $this->belongsTo(tours::class, "tour_id", "id");
    }


    public function tour_pay()
    {
        return $this->belongsTo(tour_pay::class, "id", "tour_booking_id");
    }
}

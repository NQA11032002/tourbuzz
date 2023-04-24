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
    protected $fillable = ["tour_id", "user_id", "amount_customer", "status_booking_id"];

    public function status_booking()
    {
        return $this->hasOne(status_booking::class, "id", "status_booking_id");
    }

    public function tours()
    {
        return $this->belongsTo(tours::class, "tour_id", "id");
    }

    public function user_information()
    {
        return $this->hasOne(user_information::class, "id", "user_id");
    }

    public function tour_pay()
    {
        return $this->belongsTo(tour_pay::class, "id", "tour_booking_id");
    }
}

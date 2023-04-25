<?php

namespace App\Models\tour;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\tour\tour_booking;
use App\Models\tour\categories_pay;
use App\Models\auth\user_information;

class tour_pay extends Model
{
    use HasFactory;
    protected $table = "tour_pay";
    protected $fillable = ["user_id", "tour_booking_id", "category_pay_id", "total_price"];

    public function tour_booking()
    {
        return $this->belongsTo(tour_booking::class, "id", "tour_booking_id");
    }

    public function user_information()
    {
        return $this->hasOne(user_information::class, "id", "user_id");
    }

    public function categories_pay()
    {
        return $this->hasOne(categories_pay::class, "id", "category_pay_id");
    }
}

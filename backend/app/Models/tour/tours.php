<?php

namespace App\Models\tour;

use App\Models\auth\user_information;
use App\Models\common\vehicles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\tour\tour_picture;
use App\Models\tour\tour_comments;
use App\Models\tour\tour_evaluation;

class tours extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id", "vehicle_id", "type_travel_id", "title",  "description", "address_start", "address_end", "date_start", "date_end", "price_tour",
        "detail_price_tour",  "amount_customer_maximum", "amount_customer_present", "status"
    ];

    public function tour_picture()
    {
        return $this->hasMany(tour_picture::class, "tour_id", "id");
    }

    public function tour_comments()
    {
        return $this->hasMany(tour_comments::class, "tour_id", "id");
    }

    public function tour_evaluation()
    {
        return $this->hasMany(tour_evaluation::class, "tour_id", "id");
    }

    public function vehicles()
    {
        return $this->hasOne(vehicles::class, "id", "vehicle_id");
    }

    public function user_information()
    {
        return $this->hasOne(user_information::class, "id", "user_id");
    }
}

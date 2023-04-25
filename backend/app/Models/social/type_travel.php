<?php

namespace App\Models\social;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\social\address_travel;

class type_travel extends Model
{
    use HasFactory;
    protected $table = "type_travel";

    public function address_travel()
    {
        return $this->hasMany(address_travel::class, 'type_travel_id', "id");
    }
}

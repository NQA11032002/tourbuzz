<?php

namespace Database\Seeders;

use App\Models\social\address_travel;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker;

class ToursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fake  = Faker\Factory::create();

        DB::table('tours')->insert([
            "user_id" => 4,
            "vehicle_id" => 3,
            "title" => $fake->title(),
            "description" => $fake->text(),
            "address_start" => $fake->address(),
            "address_end" => $fake->address(),
            "date_start" => $fake->date(),
            "date_end" => $fake->date(),
            "price_tour" => random_int(100000, 1000000),
            "detail_price_tour" => $fake->text(),
            "amount_customer_maximum" => 25,
            "amount_customer_present" => 2,
            "status" => 1
        ]);
    }
}
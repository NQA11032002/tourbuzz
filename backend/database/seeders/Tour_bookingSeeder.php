<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Faker;

class Tour_bookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('tour_booking')->insert([
            "tour_id" => 4,
            "user_id" => 5,
            "amount_customer" => random_int(0, 50),
            "status_booking_id" => random_int(0, 1),
        ]);
    }
}
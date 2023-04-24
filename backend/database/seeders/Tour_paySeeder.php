<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Tour_paySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tour_pay')->insert([
            "user_id" => 5,
            "tour_booking_id" => 4,
            "category_pay_id" => random_int(1, 4),
            "total_price" => random_int(50000, 500000),
        ]);
    }
}

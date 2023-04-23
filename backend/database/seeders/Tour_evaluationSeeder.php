<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker;
use DB;

class Tour_evaluationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fake  = Faker\Factory::create();

        DB::table('tour_evaluation')->insert([
            "user_id" => 3,
            "tour_id" => 2,
            "rate" => random_int(1, 10),
        ]);
    }
}

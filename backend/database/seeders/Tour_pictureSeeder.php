<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker;

class Tour_pictureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fake  = Faker\Factory::create();

        DB::table('tour_picture')->insert([
            "tour_id" => 21,
            "images" => $fake->imageUrl(),
        ]);
    }
}

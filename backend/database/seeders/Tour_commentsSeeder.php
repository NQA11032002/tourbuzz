<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Faker;

class Tour_commentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fake  = Faker\Factory::create();

        DB::table('tour_comments')->insert([
            "user_id " => 2,
            "tour_id" => 1,
            "content" => $fake->text(),
        ]);
    }
}

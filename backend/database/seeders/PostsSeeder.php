<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fake  = Faker\Factory::create();

        DB::table('posts')->insert([
            "user_id" => 4,
            "address_travel_id" => 1,
            "type_travel_id" => 1,
            "title" => $fake->title(),
            "content" => $fake->text(),
            "status" => random_int(0, 1),
        ]);
    }
}
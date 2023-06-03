<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Faker;

class Post_pictureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('post_picture')->insert([
            "post_id" => 2,
            "images" => "https://i.pinimg.com/564x/b5/85/11/b58511cfc2f13627fafa33118f70bead.jpg",
        ]);
    }
}

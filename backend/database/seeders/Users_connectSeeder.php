<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker;
use Illuminate\Support\Facades\DB;

class Users_connectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fake  = Faker\Factory::create();

        DB::table('users_connect')->insert([
            "user_1_id" => 1,
            "user_2_id" => 10,
            "chat_user_1" => $fake->slug(),
            "chat_user_2" => $fake->slug()
        ]);
    }
}

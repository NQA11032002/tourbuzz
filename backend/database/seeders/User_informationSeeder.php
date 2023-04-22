<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker;
use DB;

class User_informationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fake  = Faker\Factory::create();

        DB::table('user_information')->insert([
            "user_id" => 10,
            "name" => $fake->name(),
            "birth_date" => $fake->date(),
            "gender" => random_int(0, 1),
            "address" => $fake->address(),
            "phone" => $fake->phoneNumber(),
            "education" => $fake->text(),
        ]);
    }
}

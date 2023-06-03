<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Faker;

class Address_travelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fake  = Faker\Factory::create();

        DB::table('address_travel')->insert([
            "name_travel" => $fake->name(),
            "city_matp" => "01",
            "district_maqh" => "001",
            "town_xaid" => "00001",
            "type_travel_id" => 1,
        ]);
    }
}

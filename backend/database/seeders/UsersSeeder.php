<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fake  = Faker\Factory::create();

        DB::table('users')->insert([
            "role_id" => 1,
            "email" => $fake->email(),
            "password" => Hash::make('3747267Bi'),
            "status" => 1,
        ]);
    }
}

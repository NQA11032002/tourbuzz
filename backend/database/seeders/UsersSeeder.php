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
<<<<<<< HEAD
            "email" => 'anh@gmail.com',
=======
            "email" => 'admin@gmail.com',
>>>>>>> 53091debd10ddad87402760e09ecf7a27b3d91d8
            "password" => Hash::make('3747267Bi'),
            "status" => 1,
        ]);
    }
}

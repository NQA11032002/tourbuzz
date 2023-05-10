<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('address_travel', function (Blueprint $table) {
            $table->increments("id");
            $table->string("name_travel", 60);
            $table->string("city_matp");
            $table->string("district_maqh");
            $table->string("town_xaid");
            $table->integer("type_travel_id")->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('address_travel');
    }
};

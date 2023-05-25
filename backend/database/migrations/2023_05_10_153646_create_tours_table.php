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
        Schema::create('tours', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("user_id")->unsigned();
            $table->integer("vehicle_id")->unsigned();
            $table->string("title", 70);
            $table->text("description");
            $table->string("address_start");
            $table->string("address_end");
            $table->date("date_start");
            $table->date("date_end");
            $table->double("price_tour");
            $table->text("detail_price_tour");
            $table->integer("amount_customer_maximum");
            $table->integer("amount_customer_present");
            $table->integer("status");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};

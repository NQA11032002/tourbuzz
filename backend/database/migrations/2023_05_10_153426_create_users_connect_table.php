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
        Schema::create('users_connect', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("user_1_id")->unsigned();
            $table->integer("user_2_id")->unsigned();
            $table->text("chat_user_1")->nullable();;
            $table->text("chat_user_2")->nullable();;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_connect');
    }
};

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
        Schema::create('post_comment_reply', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("comment_id")->unsigned();
            $table->integer("users_id_1")->unsigned();
            $table->integer("users_id_2")->unsigned();
            $table->integer("content");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_comment_reply');
    }
};

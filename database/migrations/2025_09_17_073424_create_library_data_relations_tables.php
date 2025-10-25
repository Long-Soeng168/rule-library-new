<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('library_data_target_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('library_data_id')->constrained('library_data')->onDelete('cascade');
            $table->string('target_user_type_code');
            $table->foreign('target_user_type_code')->references('code')->on('types')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('library_data_age_target_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('library_data_id')->constrained('library_data')->onDelete('cascade');
            $table->string('age_target_type_code');
            $table->foreign('age_target_type_code')->references('code')->on('types')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('library_data_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('library_data_id')->constrained('library_data')->onDelete('cascade');
            $table->string('image');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('library_data_images');
        Schema::dropIfExists('library_data_age_target_users');
        Schema::dropIfExists('library_data_target_users');
    }
};

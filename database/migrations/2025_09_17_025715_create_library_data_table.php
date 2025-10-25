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
        Schema::create('library_data', function (Blueprint $table) {
            $table->id();

            // Relations
            $table->unsignedBigInteger('user_id')->nullable();      // Owner of the data
            $table->unsignedBigInteger('created_by')->nullable();   // Audit
            $table->unsignedBigInteger('updated_by')->nullable();   // Audit

            // Core info
            $table->year('year_of_data')->nullable();
            $table->string('name_of_library');
            $table->string('affiliated_institution')->nullable();

            // Type codes (FKs to "types" or lookup tables)
            $table->string('source_of_funding_type_code')->nullable();
            $table->string('class_type_code')->nullable();
            $table->string('library_type_code')->nullable();
            $table->string('province_code')->nullable();
            $table->string('annual_budget_type_code')->nullable();
            $table->string('library_system_type_code')->nullable();

            // Contact
            $table->string('facebook_name')->nullable();
            $table->string('website')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('address')->nullable();

            $table->text('memberships')->nullable();;
            $table->text('partnerships')->nullable();;
            $table->text('programs_and_projects')->nullable();

            // Counts / numbers
            $table->integer('full_time_staff_count')->default(0)->nullable();;
            $table->integer('part_time_staff_count')->default(0)->nullable();;
            $table->integer('volunteers_count')->default(0)->nullable();;
            $table->decimal('physical_size', 10, 2)->nullable(); // e.g., square meters
            $table->integer('table_count')->default(0)->nullable();;
            $table->integer('chair_count')->default(0)->nullable();;
            $table->integer('computer_count')->default(0)->nullable();;
            $table->integer('meeting_room_count')->default(0)->nullable();;

            $table->integer('monograph_title_count')->default(0)->nullable();;
            $table->integer('monograph_count')->default(0)->nullable();;
            $table->integer('serial_title_count')->default(0)->nullable();;
            $table->integer('article_databases_count')->default(0)->nullable();;

            $table->integer('user_count')->default(0)->nullable();;
            $table->integer('unique_user_count')->default(0)->nullable();;
            $table->integer('unique_borrower_count')->default(0)->nullable();;
            $table->integer('book_or_material_borrowed_count')->default(0)->nullable();;
            $table->integer('online_resource_downloaded_count')->default(0)->nullable();;
            $table->integer('online_resource_viewer_count')->default(0)->nullable();;
            $table->integer('website_visitor_count')->default(0)->nullable();;
            $table->integer('facebook_like_count')->default(0)->nullable();;

            // Extra info
            $table->string('logo')->nullable();
            $table->string('banner')->nullable();
            $table->longText('about')->nullable();

            // Foreign Keys
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreign('created_by')
                ->references('id')->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreign('updated_by')
                ->references('id')->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            // type_code style references (optional, if you use "types" table with code field)
            $table->foreign('source_of_funding_type_code')
                ->references('code')->on('types')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreign('class_type_code')
                ->references('code')->on('types')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreign('library_type_code')
                ->references('code')->on('types')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreign('province_code')
                ->references('code')->on('locations')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreign('annual_budget_type_code')
                ->references('code')->on('types')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreign('library_system_type_code')
                ->references('code')->on('types')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('library_data');
    }
};

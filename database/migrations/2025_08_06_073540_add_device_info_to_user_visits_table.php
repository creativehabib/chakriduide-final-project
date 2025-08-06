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
        Schema::table('user_visits', function (Blueprint $table) {
            $table->string('browser')->nullable()->after('user_agent');
            $table->string('os')->nullable()->after('browser');
            $table->string('device')->nullable()->after('os');
            $table->string('device_type')->nullable()->after('device'); // desktop, mobile, tablet
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_visits', function (Blueprint $table) {
            $table->dropColumn(['browser', 'os', 'device', 'device_type']);
        });
    }
};

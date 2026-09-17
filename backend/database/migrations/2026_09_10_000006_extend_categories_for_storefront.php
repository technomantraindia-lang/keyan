<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('supply_class')->nullable()->after('description');
            $table->string('application')->nullable()->after('supply_class');
            $table->json('items')->nullable()->after('application');
            $table->string('cta_text')->nullable()->after('items');
        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['supply_class', 'application', 'items', 'cta_text']);
        });
    }
};

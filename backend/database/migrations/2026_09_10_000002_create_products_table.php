<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->restrictOnDelete();
            $table->string('catalog_id')->unique();
            $table->string('sku')->unique();
            $table->string('name');
            $table->string('brand')->nullable();
            $table->text('short_description')->nullable();
            $table->longText('full_description')->nullable();
            $table->text('specs')->nullable();
            $table->json('specifications')->nullable();
            $table->json('applications')->nullable();
            $table->string('image_path')->nullable();
            $table->json('gallery')->nullable();
            $table->decimal('price_usd', 12, 2)->default(0);
            $table->string('availability')->default('Available on Request');
            $table->boolean('is_quote_only')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['category_id', 'is_active']);
            $table->index(['brand', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

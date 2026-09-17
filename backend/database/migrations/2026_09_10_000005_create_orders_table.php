<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('order_number')->unique();
            $table->string('full_name');
            $table->string('company_name');
            $table->string('vessel_name')->nullable();
            $table->string('delivery_port')->nullable();
            $table->string('email');
            $table->string('phone', 40)->nullable();
            $table->string('payment_method')->default('Proforma Invoice (Wire Transfer)');
            $table->string('status', 30)->default('pending')->index();
            $table->decimal('subtotal_usd', 12, 2);
            $table->decimal('shipping_usd', 12, 2)->default(0);
            $table->decimal('total_usd', 12, 2);
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();
            $table->string('sku');
            $table->string('product_name');
            $table->unsignedInteger('quantity');
            $table->decimal('unit_price_usd', 12, 2);
            $table->decimal('line_total_usd', 12, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};

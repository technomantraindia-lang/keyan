<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quote_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quote_request_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sender_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('sender_role', 20); // customer or admin
            $table->longText('body');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            $table->index(['quote_request_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quote_messages');
    }
};

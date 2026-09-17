<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'order_number', 'full_name', 'company_name',
        'vessel_name', 'delivery_port', 'email', 'phone',
        'payment_method', 'status', 'subtotal_usd', 'shipping_usd',
        'total_usd', 'metadata',
    ];

    protected function casts(): array
    {
        return [
            'subtotal_usd' => 'decimal:2',
            'shipping_usd' => 'decimal:2',
            'total_usd' => 'decimal:2',
            'metadata' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}

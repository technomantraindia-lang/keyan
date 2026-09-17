<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id', 'catalog_id', 'sku', 'name', 'brand', 'short_description',
        'full_description', 'specs', 'specifications', 'applications',
        'image_path', 'gallery', 'price_usd', 'availability',
        'is_quote_only', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'specifications' => 'array',
            'applications' => 'array',
            'gallery' => 'array',
            'price_usd' => 'decimal:2',
            'is_quote_only' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function quoteRequests(): HasMany
    {
        return $this->hasMany(QuoteRequest::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
}

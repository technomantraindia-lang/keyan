<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug', 'name', 'description', 'supply_class', 'application', 'items',
        'cta_text', 'image_path', 'sort_order', 'is_active',
    ];

    protected function casts(): array
    {
        return ['items' => 'array', 'is_active' => 'boolean'];
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}

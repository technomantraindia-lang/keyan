<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Product::query()
            ->with('category')
            ->where('is_active', true);

        $query->when($request->filled('q'), function ($products) use ($request) {
            $term = trim((string) $request->string('q'));
            $products->where(function ($match) use ($term) {
                $match->where('name', 'like', "%{$term}%")
                    ->orWhere('brand', 'like', "%{$term}%")
                    ->orWhere('sku', 'like', "%{$term}%")
                    ->orWhere('short_description', 'like', "%{$term}%");
            });
        });

        $query->when($request->filled('category'), function ($products) use ($request) {
            $category = (string) $request->string('category');
            $products->whereHas('category', fn ($match) => $match->where('slug', $category));
        });

        $query->when($request->filled('brand'), fn ($products) => $products->where('brand', 'like', '%'.(string) $request->string('brand').'%'));

        match ($request->string('sort')->toString()) {
            'price-asc' => $query->orderBy('price_usd'),
            'price-desc' => $query->orderByDesc('price_usd'),
            'name-asc' => $query->orderBy('name'),
            default => $query->latest('id'),
        };

        return ProductResource::collection($query->paginate(min((int) $request->input('per_page', 24), 60)));
    }

    public function show(string $product): ProductResource
    {
        $record = Product::query()
            ->with('category')
            ->where('is_active', true)
            ->where(function ($query) use ($product) {
                $query->where('catalog_id', $product)->orWhere('sku', $product);
                if (ctype_digit($product)) {
                    $query->orWhereKey((int) $product);
                }
            })
            ->firstOrFail();

        return new ProductResource($record);
    }
}

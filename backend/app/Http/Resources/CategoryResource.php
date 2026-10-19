<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $path = $this->image_path;
        $backendUrl = rtrim($request->getSchemeAndHttpHost(), '/');
        $imageUrl = null;

        if ($path) {
            if (Str::startsWith($path, ['http://', 'https://'])) {
                $imageUrl = $path;
            } elseif (Str::startsWith($path, ['/storage/', 'storage/'])) {
                $imageUrl = $backendUrl.'/'.ltrim($path, '/');
            } else {
                $encodedPath = collect(explode('/', ltrim($path, '/')))
                    ->map(fn (string $segment) => rawurlencode($segment))
                    ->implode('/');
                $imageUrl = $backendUrl.'/product-assets/'.$encodedPath;
            }
        }

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'description' => $this->description,
            'supply_class' => $this->supply_class,
            'application' => $this->application,
            'items' => $this->items ?? [],
            'cta_text' => $this->cta_text,
            'image_path' => $imageUrl,
            'sort_order' => $this->sort_order,
            'is_active' => $this->is_active,
            'product_count' => $this->when(isset($this->products_count), $this->products_count),
        ];
    }
}

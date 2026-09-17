<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $category = $this->category?->slug;
        $frontendCategory = match ($category) {
            'marine-ship-supply' => 'marine',
            'fire-safety', 'breathing-air' => 'safety',
            'industrial-machinery' => 'machinery',
            'marine-instruments' => 'instruments',
            'gas-detection' => 'gas',
            default => $category,
        };
        $image = $this->image_path;
        $backendUrl = rtrim((string) env('APP_URL', $request->getSchemeAndHttpHost()), '/');
        $imageUrl = $this->imageUrl($image, $backendUrl);
        $quoteOnly = $this->is_quote_only || strcasecmp(trim((string) $this->availability), 'Available on Request') === 0;
        $specifications = is_array($this->specifications) ? $this->specifications : [];
        if (! $specifications && $this->specs) {
            $specifications = ['Specifications' => $this->specs];
        }

        return [
            'id' => $this->catalog_id,
            'database_id' => $this->id,
            'sku' => $this->sku,
            'name' => $this->name,
            'brand' => $this->brand,
            'category' => $frontendCategory,
            'category_slug' => $category,
            'categoryName' => $this->category?->name,
            'shortDesc' => $this->short_description,
            'fullDesc' => $this->full_description,
            'specs' => $this->specs,
            'specifications' => $specifications,
            'applications' => $this->applications ?? [],
            'img' => $imageUrl,
            'images' => collect($this->gallery ?: array_filter([$image]))
                ->map(fn ($path) => $this->imageUrl($path, $backendUrl))
                ->values()
                ->all(),
            'price_usd' => (float) $this->price_usd,
            'availability' => $this->availability,
            'is_quote_only' => $quoteOnly,
        ];
    }

    private function imageUrl(?string $path, string $backendUrl): ?string
    {
        if (! $path) {
            return null;
        }

        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }

        if (Str::startsWith($path, ['/storage/', 'storage/'])) {
            return $backendUrl.'/'.ltrim($path, '/');
        }

        $encodedPath = collect(explode('/', ltrim($path, '/')))
            ->map(fn (string $segment) => rawurlencode($segment))
            ->implode('/');

        return $backendUrl.'/product-assets/'.$encodedPath;
    }
}

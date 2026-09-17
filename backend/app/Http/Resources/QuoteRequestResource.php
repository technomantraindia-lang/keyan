<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuoteRequestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'reference' => $this->reference,
            'status' => $this->status,
            'product' => $this->whenLoaded('product', fn () => [
                'id' => $this->product?->catalog_id,
                'name' => $this->product?->name,
                'sku' => $this->product?->sku,
            ]),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CartController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $cart = $this->resolveCart($request);

        return response()->json($this->cartPayload($cart, $request));
    }

    public function add(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_id' => ['required', 'string'],
            'quantity' => ['nullable', 'integer', 'min:1', 'max:1000000'],
        ]);
        $product = Product::where('catalog_id', $data['product_id'])->where('is_active', true)->firstOrFail();
        if ($this->isQuoteOnly($product)) {
            return response()->json([
                'message' => 'This product is available on request. Please submit a quote request instead.',
            ], 422);
        }
        $cart = $this->resolveCart($request);
        $item = $cart->items()->firstOrNew(['product_id' => $product->id]);
        $item->quantity = ($item->exists ? $item->quantity : 0) + ($data['quantity'] ?? 1);
        $item->unit_price_usd = $product->price_usd;
        $item->save();

        return response()->json($this->cartPayload($cart->fresh('items.product.category'), $request));
    }

    public function update(Request $request, int $item): JsonResponse
    {
        $data = $request->validate(['quantity' => ['required', 'integer', 'min:1', 'max:1000000']]);
        $cart = $this->resolveCart($request);
        $cart->items()->whereKey($item)->firstOrFail()->update(['quantity' => $data['quantity']]);

        return response()->json($this->cartPayload($cart->fresh('items.product.category'), $request));
    }

    public function remove(Request $request, int $item): JsonResponse
    {
        $cart = $this->resolveCart($request);
        $cart->items()->whereKey($item)->delete();

        return response()->json($this->cartPayload($cart->fresh('items.product.category'), $request));
    }

    private function resolveCart(Request $request): Cart
    {
        if ($request->user()) {
            return Cart::firstOrCreate(
                ['user_id' => $request->user()->id, 'status' => 'active'],
                ['guest_token' => null]
            )->load('items.product.category');
        }

        $guestToken = $request->header('X-Cart-Token');
        if (! $guestToken || ! Str::isUuid($guestToken)) {
            $guestToken = (string) Str::uuid();
        }

        return Cart::firstOrCreate(
            ['guest_token' => $guestToken, 'status' => 'active'],
            ['user_id' => null]
        )->load('items.product.category');
    }

    private function cartPayload(Cart $cart, Request $request): array
    {
        $items = $cart->items->map(fn ($item) => [
            'id' => $item->id,
            'product_id' => $item->product?->catalog_id,
            'sku' => $item->product?->sku,
            'name' => $item->product?->name,
            'brand' => $item->product?->brand,
            'img' => $item->product?->image_path,
            'qty' => $item->quantity,
            'price_usd' => (float) $item->unit_price_usd,
            'line_total_usd' => (float) $item->unit_price_usd * $item->quantity,
            'product' => $item->product ? (new ProductResource($item->product))->toArray($request) : null,
        ])->values();

        return [
            'data' => [
                'cart_token' => $cart->guest_token,
                'items' => $items,
                'subtotal_usd' => (float) $items->sum('line_total_usd'),
            ],
        ];
    }

    private function isQuoteOnly(Product $product): bool
    {
        return $product->is_quote_only || strcasecmp(trim((string) $product->availability), 'Available on Request') === 0;
    }
}

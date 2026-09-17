<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'full_name' => ['required', 'string', 'max:190'],
            'company_name' => ['nullable', 'string', 'max:190'],
            'vessel_name' => ['nullable', 'string', 'max:190'],
            'delivery_port' => ['nullable', 'string', 'max:190'],
            'email' => ['required', 'email', 'max:190'],
            'phone' => ['nullable', 'string', 'max:40'],
            'payment_method' => ['nullable', 'string', 'max:100'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'string', 'max:80'],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:1000000'],
            'address_id' => ['nullable', 'required_without:address', 'integer'],
            'address' => ['nullable', 'required_without:address_id', 'array'],
            'address.label' => ['required_with:address', 'string', 'max:80'],
            'address.recipient_name' => ['required_with:address', 'string', 'max:190'],
            'address.company_name' => ['nullable', 'string', 'max:190'],
            'address.line1' => ['required_with:address', 'string', 'max:190'],
            'address.line2' => ['nullable', 'string', 'max:190'],
            'address.city' => ['required_with:address', 'string', 'max:100'],
            'address.state' => ['nullable', 'string', 'max:100'],
            'address.postal_code' => ['nullable', 'string', 'max:30'],
            'address.country' => ['required_with:address', 'string', 'max:100'],
            'address.phone' => ['nullable', 'string', 'max:40'],
        ]);

        $order = DB::transaction(function () use ($data, $request) {
            $address = null;
            if (! empty($data['address_id'])) {
                $address = $request->user()->addresses()->findOrFail($data['address_id']);
            } elseif (! empty($data['address'])) {
                $address = $request->user()->addresses()->create($data['address']);
            }

            $products = Product::whereIn('catalog_id', collect($data['items'])->pluck('product_id'))->get()->keyBy('catalog_id');
            if ($products->count() !== count($data['items'])) {
                abort(422, 'One or more selected products are no longer available.');
            }

            $lineItems = collect($data['items'])->map(function (array $item) use ($products) {
                $product = $products->get($item['product_id']);
                if ($product->is_quote_only || strcasecmp(trim((string) $product->availability), 'Available on Request') === 0) {
                    abort(422, 'One or more selected products are available on request and must be quoted before purchase.');
                }
                $lineTotal = (float) $product->price_usd * $item['quantity'];

                return [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'line_total' => $lineTotal,
                ];
            });
            $subtotal = (float) $lineItems->sum('line_total');
            $shipping = $subtotal > 0 ? 45.00 : 0.00;

            $created = Order::create([
                'user_id' => $request->user()?->id,
                'order_number' => 'KEY-ORD-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
                'full_name' => $data['full_name'],
                'company_name' => $data['company_name'] ?? $address?->company_name ?? 'Individual Customer',
                'vessel_name' => $data['vessel_name'] ?? null,
                'delivery_port' => $address ? $this->formatAddress($address) : ($data['delivery_port'] ?? null),
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'payment_method' => $data['payment_method'] ?? 'Proforma Invoice (Wire Transfer)',
                'status' => 'pending',
                'subtotal_usd' => $subtotal,
                'shipping_usd' => $shipping,
                'total_usd' => $subtotal + $shipping,
                'metadata' => ['delivery_address' => $address?->toArray()],
            ]);

            foreach ($lineItems as $line) {
                $product = $line['product'];
                $created->items()->create([
                    'product_id' => $product->id,
                    'sku' => $product->sku,
                    'product_name' => $product->name,
                    'quantity' => $line['quantity'],
                    'unit_price_usd' => $product->price_usd,
                    'line_total_usd' => $line['line_total'],
                ]);
            }

            return $created->load('items');
        });

        return response()->json(['message' => 'Order created successfully.', 'data' => $order], 201);
    }

    private function formatAddress(Address $address): string
    {
        return collect([
            $address->line1,
            $address->line2,
            $address->city,
            $address->state,
            $address->postal_code,
            $address->country,
        ])->filter()->implode(', ');
    }
}

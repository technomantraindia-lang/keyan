<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuoteRequestResource;
use App\Models\Product;
use App\Models\QuoteRequest;
use App\Models\User;
use App\Services\PushNotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class QuoteRequestController extends Controller
{
    public function store(Request $request, PushNotificationService $push): JsonResponse
    {
        $data = $request->validate([
            'product_id' => ['nullable', 'integer', 'exists:products,id'],
            'product_catalog_id' => ['nullable', 'string', 'max:80'],
            'first_name' => ['nullable', 'string', 'max:100'],
            'last_name' => ['nullable', 'string', 'max:100'],
            'company_name' => ['nullable', 'string', 'max:190'],
            'email' => ['required', 'email', 'max:190'],
            'phone' => ['nullable', 'string', 'max:40'],
            'subject' => ['required', 'string', 'max:190'],
            'message' => ['required', 'string', 'max:10000'],
            'quantity' => ['nullable', 'integer', 'min:1', 'max:1000000'],
            'source' => ['nullable', 'string', 'max:40'],
        ]);

        $customer = $request->user('sanctum') ?: $request->user();

        $product = isset($data['product_id'])
            ? Product::find($data['product_id'])
            : (isset($data['product_catalog_id']) ? Product::where('catalog_id', $data['product_catalog_id'])->first() : null);

        if ($product && ($product->is_quote_only || strcasecmp(trim((string) $product->availability), 'Available on Request') === 0) && ! $customer) {
            return response()->json([
                'message' => 'Please sign in or register before requesting a quote for this product.',
            ], 401);
        }

        $quote = QuoteRequest::create([
            ...$data,
            'user_id' => $customer?->id,
            'product_id' => $product?->id,
            'reference' => 'KEY-RFQ-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
            'status' => 'new',
            'source' => $data['source'] ?? 'website',
            'metadata' => [
                'ip' => $request->ip(),
                'user_agent' => Str::limit((string) $request->userAgent(), 500),
            ],
        ]);

        if ($customer) {
            $quote->messages()->create([
                'sender_id' => $customer->id,
                'sender_role' => 'customer',
                'body' => $quote->message,
            ]);
        }

        // A new request is also the first customer message. Notify every
        // admin device so the team can open the matching conversation even
        // when the admin panel is closed.
        User::query()->where('account_type', 'admin')->each(fn (User $admin) => $push->sendToUser(
            $admin,
            'New quote request',
            ($customer?->name ?: $quote->email).' submitted '.$quote->reference,
            '/admin/quotes/'.$quote->id
        ));

        return response()->json([
            'message' => 'Your quotation request has been received.',
            'data' => (new QuoteRequestResource($quote->load('product')))->resolve(),
        ], 201);
    }
}

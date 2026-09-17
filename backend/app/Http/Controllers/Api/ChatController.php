<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PushSubscription;
use App\Models\QuoteMessage;
use App\Models\QuoteRequest;
use App\Models\User;
use App\Services\QuoteChatCleanupService;
use App\Services\PushNotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    public function quotes(Request $request, QuoteChatCleanupService $cleanup): JsonResponse
    {
        $cleanup->purgeInactive();
        $this->attachEmailQuotesToCustomer($request->user());

        $quotes = QuoteRequest::with('product')
            ->withCount(['messages as unread_messages_count' => fn ($query) => $query
                ->where('sender_role', 'admin')->whereNull('read_at')])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json(['data' => $quotes->map(fn (QuoteRequest $quote) => $this->quotePayload($quote))]);
    }

    public function messages(Request $request, QuoteRequest $quote): JsonResponse
    {
        $this->ensureCustomerOwnsQuote($request, $quote);
        $quote->messages()->where('sender_role', 'admin')->whereNull('read_at')->update(['read_at' => now()]);

        return response()->json(['data' => $this->messagePayload($quote->messages()->with('sender')->oldest()->get())]);
    }

    public function sendCustomerMessage(Request $request, QuoteRequest $quote, PushNotificationService $push): JsonResponse
    {
        $this->ensureCustomerOwnsQuote($request, $quote);
        $data = $request->validate(['body' => ['required', 'string', 'max:10000']]);

        $message = $quote->messages()->create([
            'sender_id' => $request->user()->id,
            'sender_role' => 'customer',
            'body' => trim($data['body']),
        ]);

        $quote->update(['status' => $quote->status === 'new' ? 'contacted' : $quote->status]);
        User::query()->where('account_type', 'admin')->each(fn (User $admin) => $push->sendToUser(
            $admin,
            'New customer message',
            $request->user()->name.' replied on '.$quote->reference,
            '/admin/quotes/'.$quote->id
        ));

        return response()->json(['message' => 'Message sent.', 'data' => $this->messagePayload(collect([$message->load('sender')]))], 201);
    }

    public function publicKey(): JsonResponse
    {
        return response()->json(['public_key' => config('services.webpush.public_key')]);
    }

    public function startGuestChat(Request $request, PushNotificationService $push): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:190'],
            'email' => ['required', 'email', 'max:190'],
            'phone' => ['required', 'string', 'max:40'],
            'message' => ['required', 'string', 'max:10000'],
        ]);

        $token = Str::random(48);
        $quote = QuoteRequest::create([
            'reference' => 'KEY-CHAT-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
            'first_name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'subject' => 'Guest admin chat',
            'message' => trim($data['message']),
            'status' => 'new',
            'source' => 'guest-chat',
            'metadata' => [
                'guest_chat_token' => hash('sha256', $token),
                'ip' => $request->ip(),
                'user_agent' => Str::limit((string) $request->userAgent(), 500),
            ],
        ]);

        $message = $quote->messages()->create([
            'sender_role' => 'customer',
            'body' => trim($data['message']),
        ]);

        User::query()->where('account_type', 'admin')->each(fn (User $admin) => $push->sendToUser(
            $admin,
            'New guest chat',
            $data['name'].' started '.$quote->reference,
            '/admin/quotes/'.$quote->id
        ));

        return response()->json([
            'message' => 'Chat started.',
            'data' => [
                'quote' => $this->quotePayload($quote),
                'guest_token' => $token,
                'messages' => $this->messagePayload(collect([$message])),
            ],
        ], 201);
    }

    public function guestMessages(Request $request, QuoteRequest $quote): JsonResponse
    {
        $this->ensureGuestOwnsQuote($request, $quote);
        $quote->messages()->where('sender_role', 'admin')->whereNull('read_at')->update(['read_at' => now()]);

        return response()->json([
            'data' => [
                'quote' => $this->quotePayload($quote),
                'messages' => $this->messagePayload($quote->messages()->with('sender')->oldest()->get()),
            ],
        ]);
    }

    public function sendGuestMessage(Request $request, QuoteRequest $quote, PushNotificationService $push): JsonResponse
    {
        $this->ensureGuestOwnsQuote($request, $quote);
        $data = $request->validate(['body' => ['required', 'string', 'max:10000']]);

        $message = $quote->messages()->create([
            'sender_role' => 'customer',
            'body' => trim($data['body']),
        ]);

        $quote->update(['status' => $quote->status === 'new' ? 'contacted' : $quote->status]);
        User::query()->where('account_type', 'admin')->each(fn (User $admin) => $push->sendToUser(
            $admin,
            'New guest message',
            ($quote->first_name ?: $quote->email).' replied on '.$quote->reference,
            '/admin/quotes/'.$quote->id
        ));

        return response()->json(['message' => 'Message sent.', 'data' => $this->messagePayload(collect([$message]))], 201);
    }

    public function storeSubscription(Request $request): JsonResponse
    {
        $data = $request->validate([
            'endpoint' => ['required', 'url', 'max:2000'],
            'keys.p256dh' => ['nullable', 'string', 'max:500'],
            'keys.auth' => ['nullable', 'string', 'max:500'],
            'expirationTime' => ['nullable'],
        ]);

        PushSubscription::updateOrCreate(
            ['user_id' => $request->user()->id, 'endpoint_hash' => hash('sha256', $data['endpoint'])],
            [
                'endpoint' => $data['endpoint'],
                'public_key' => data_get($data, 'keys.p256dh'),
                'auth_token' => data_get($data, 'keys.auth'),
                'content_encoding' => 'aes128gcm',
                'last_used_at' => now(),
            ]
        );

        return response()->json(['message' => 'Notifications enabled.']);
    }

    public function removeSubscription(Request $request): JsonResponse
    {
        $request->validate(['endpoint' => ['required', 'url', 'max:2000']]);
        PushSubscription::where('user_id', $request->user()->id)->where('endpoint', $request->input('endpoint'))->delete();

        return response()->json(['message' => 'Notifications disabled.']);
    }

    private function ensureCustomerOwnsQuote(Request $request, QuoteRequest $quote): void
    {
        abort_unless($quote->user_id === $request->user()->id, 404);
    }

    private function ensureGuestOwnsQuote(Request $request, QuoteRequest $quote): void
    {
        $token = (string) ($request->input('guest_token') ?: $request->query('guest_token'));
        $metadata = $quote->metadata ?: [];

        abort_unless(
            $quote->user_id === null &&
            isset($metadata['guest_chat_token']) &&
            hash_equals((string) $metadata['guest_chat_token'], hash('sha256', $token)),
            404
        );
    }

    private function attachEmailQuotesToCustomer(User $customer): void
    {
        QuoteRequest::query()
            ->whereNull('user_id')
            ->where('email', $customer->email)
            ->get()
            ->each(function (QuoteRequest $quote) use ($customer) {
                $quote->update(['user_id' => $customer->id]);

                if ($quote->message && ! $quote->messages()->where('sender_role', 'customer')->exists()) {
                    $quote->messages()->create([
                        'sender_id' => $customer->id,
                        'sender_role' => 'customer',
                        'body' => $quote->message,
                    ]);
                }
            });
    }

    private function quotePayload(QuoteRequest $quote): array
    {
        return [
            'id' => $quote->id,
            'reference' => $quote->reference,
            'subject' => $quote->subject,
            'message' => $quote->message,
            'status' => $quote->status,
            'product' => $quote->product ? ['id' => $quote->product->catalog_id, 'name' => $quote->product->name, 'sku' => $quote->product->sku] : null,
            'unread_messages_count' => $quote->unread_messages_count,
            'created_at' => $quote->created_at?->toISOString(),
        ];
    }

    private function messagePayload($messages): array
    {
        return $messages->map(fn (QuoteMessage $message) => [
            'id' => $message->id,
            'body' => $message->body,
            'sender_role' => $message->sender_role,
            'sender_name' => $message->sender?->name ?: ucfirst($message->sender_role),
            'created_at' => $message->created_at?->toISOString(),
        ])->values()->all();
    }
}

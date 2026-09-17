<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use App\Models\QuoteRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_catalog_and_quote_request_api_work(): void
    {
        $category = Category::create([
            'slug' => 'marine-ship-supply',
            'name' => 'Marine & Ship Supply',
            'is_active' => true,
        ]);
        Product::create([
            'category_id' => $category->id,
            'catalog_id' => 'p-test',
            'sku' => 'KEY-TEST-001',
            'name' => 'Test Marine Valve',
            'brand' => 'Keyan Test',
            'short_description' => 'Test product',
            'price_usd' => 100,
            'availability' => 'In Stock',
            'image_path' => 'iamges/prod_valve.jpg',
            'is_active' => true,
        ]);

        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonPath('data.0.id', 'p-test');

        $this->postJson('/api/quote-requests', [
            'product_catalog_id' => 'p-test',
            'first_name' => 'Test',
            'email' => 'buyer@example.com',
            'subject' => 'Test quote',
            'message' => 'Please provide a quotation.',
        ])->assertCreated()->assertJsonPath('data.status', 'new');
    }

    public function test_customer_can_register_and_receive_a_token(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test Customer',
            'email' => 'customer@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertCreated()->assertJsonStructure(['data' => ['user', 'token']]);
        $this->assertNotEmpty($response->json('data.token'));
    }

    public function test_signed_in_customer_can_request_available_on_request_product(): void
    {
        $category = Category::create([
            'slug' => 'fire-safety-equipment',
            'name' => 'Fire & Safety Equipment',
            'is_active' => true,
        ]);

        $product = Product::create([
            'category_id' => $category->id,
            'catalog_id' => 'p-request-only',
            'sku' => 'KEY-REQ-001',
            'name' => 'Request Only Test Product',
            'brand' => 'Keyan Test',
            'short_description' => 'Test product',
            'price_usd' => 100,
            'availability' => 'Available on Request',
            'image_path' => 'iamges/prod_valve.jpg',
            'is_active' => true,
            'is_quote_only' => true,
        ]);

        $payload = [
            'product_catalog_id' => $product->catalog_id,
            'first_name' => 'Test',
            'email' => 'buyer@example.com',
            'subject' => 'Test quote',
            'message' => 'Please provide a quotation.',
        ];

        $this->postJson('/api/quote-requests', $payload)
            ->assertUnauthorized();

        $user = User::factory()->create(['email' => 'signedin@example.com']);
        Sanctum::actingAs($user);

        $this->postJson('/api/quote-requests', $payload)
            ->assertCreated()
            ->assertJsonPath('data.status', 'new');

        $this->assertDatabaseHas('quote_requests', [
            'user_id' => $user->id,
            'product_id' => $product->id,
            'email' => 'buyer@example.com',
        ]);
        $this->assertDatabaseHas('quote_messages', [
            'sender_id' => $user->id,
            'sender_role' => 'customer',
            'body' => 'Please provide a quotation.',
        ]);
    }

    public function test_customer_can_view_and_reply_to_a_quote_thread(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $quote = QuoteRequest::create([
            'user_id' => $user->id,
            'reference' => 'KEY-CHAT-TEST',
            'email' => $user->email,
            'subject' => 'Need a valve quotation',
            'message' => 'Please confirm availability.',
            'status' => 'new',
        ]);

        $quote->messages()->create(['sender_id' => $user->id, 'sender_role' => 'customer', 'body' => $quote->message]);

        $this->getJson('/api/quote-requests')->assertOk()->assertJsonPath('data.0.reference', 'KEY-CHAT-TEST');
        $this->postJson('/api/quote-requests/'.$quote->id.'/messages', ['body' => 'Is delivery to Bhavnagar possible?'])
            ->assertCreated()->assertJsonPath('data.0.sender_role', 'customer');

        $this->assertDatabaseHas('quote_messages', ['quote_request_id' => $quote->id, 'body' => 'Is delivery to Bhavnagar possible?']);
    }

    public function test_customer_can_see_admin_reply_in_quote_thread(): void
    {
        $customer = User::factory()->create(['email' => 'buyer@keyan.test']);
        $admin = User::factory()->create(['account_type' => 'admin']);
        $quote = QuoteRequest::create([
            'user_id' => $customer->id,
            'reference' => 'KEY-ADMIN-REPLY',
            'email' => $customer->email,
            'subject' => 'Need a valve quotation',
            'message' => 'Please send pricing.',
            'status' => 'new',
        ]);

        $quote->messages()->create(['sender_id' => $customer->id, 'sender_role' => 'customer', 'body' => $quote->message]);
        $quote->messages()->create(['sender_id' => $admin->id, 'sender_role' => 'admin', 'body' => 'Pricing is ready.']);

        Sanctum::actingAs($customer);

        $this->getJson('/api/quote-requests/'.$quote->id.'/messages')
            ->assertOk()
            ->assertJsonPath('data.1.sender_role', 'admin')
            ->assertJsonPath('data.1.body', 'Pricing is ready.');
    }

    public function test_customer_message_center_claims_guest_quotes_by_email(): void
    {
        $customer = User::factory()->create(['email' => 'buyer@keyan.test']);
        $admin = User::factory()->create(['account_type' => 'admin']);
        $quote = QuoteRequest::create([
            'reference' => 'KEY-GUEST-CLAIM',
            'email' => $customer->email,
            'subject' => 'General enquiry',
            'message' => 'Please call me back.',
            'status' => 'new',
        ]);

        $quote->messages()->create(['sender_id' => $admin->id, 'sender_role' => 'admin', 'body' => 'We can help with this.']);

        Sanctum::actingAs($customer);

        $this->getJson('/api/quote-requests')
            ->assertOk()
            ->assertJsonPath('data.0.reference', 'KEY-GUEST-CLAIM')
            ->assertJsonPath('data.0.unread_messages_count', 1);

        $this->assertSame($customer->id, $quote->fresh()->user_id);
        $this->getJson('/api/quote-requests/'.$quote->id.'/messages')
            ->assertOk()
            ->assertJsonPath('data.0.sender_role', 'admin')
            ->assertJsonPath('data.0.body', 'We can help with this.');
    }

    public function test_inactive_quote_chats_are_deleted_after_seven_days(): void
    {
        $customer = User::factory()->create();

        $oldQuote = QuoteRequest::create([
            'user_id' => $customer->id,
            'reference' => 'KEY-OLD-CHAT',
            'email' => $customer->email,
            'subject' => 'Old chat',
            'message' => 'This should be deleted.',
            'status' => 'new',
        ]);
        $oldQuote->forceFill(['created_at' => now()->subDays(9), 'updated_at' => now()->subDays(9)])->save();
        $oldMessage = $oldQuote->messages()->create([
            'sender_id' => $customer->id,
            'sender_role' => 'customer',
            'body' => 'Old message.',
        ]);
        $oldMessage->forceFill(['created_at' => now()->subDays(8), 'updated_at' => now()->subDays(8)])->save();

        $recentQuote = QuoteRequest::create([
            'user_id' => $customer->id,
            'reference' => 'KEY-RECENT-CHAT',
            'email' => $customer->email,
            'subject' => 'Recent chat',
            'message' => 'This should stay.',
            'status' => 'new',
        ]);
        $recentQuote->forceFill(['created_at' => now()->subDays(9), 'updated_at' => now()->subDays(9)])->save();
        $recentMessage = $recentQuote->messages()->create([
            'sender_id' => $customer->id,
            'sender_role' => 'customer',
            'body' => 'Recent message.',
        ]);
        $recentMessage->forceFill(['created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)])->save();

        Artisan::call('quotes:purge-inactive');

        $this->assertDatabaseMissing('quote_requests', ['id' => $oldQuote->id]);
        $this->assertDatabaseMissing('quote_messages', ['id' => $oldMessage->id]);
        $this->assertDatabaseHas('quote_requests', ['id' => $recentQuote->id]);
    }

    public function test_guest_can_start_and_continue_admin_chat_without_login(): void
    {
        $start = $this->postJson('/api/guest-chat/start', [
            'name' => 'Guest Buyer',
            'email' => 'guest@example.com',
            'phone' => '+91 9825200000',
            'message' => 'Need details about a valve.',
        ]);

        $start->assertCreated()
            ->assertJsonPath('data.quote.subject', 'Guest admin chat')
            ->assertJsonPath('data.messages.0.sender_role', 'customer');

        $quoteId = $start->json('data.quote.id');
        $token = $start->json('data.guest_token');

        $this->assertDatabaseHas('quote_requests', [
            'id' => $quoteId,
            'email' => 'guest@example.com',
            'source' => 'guest-chat',
        ]);

        $this->getJson('/api/guest-chat/'.$quoteId.'/messages?guest_token='.$token)
            ->assertOk()
            ->assertJsonPath('data.messages.0.body', 'Need details about a valve.');

        $this->postJson('/api/guest-chat/'.$quoteId.'/messages', [
            'guest_token' => $token,
            'body' => 'Please also share delivery time.',
        ])->assertCreated()->assertJsonPath('data.0.body', 'Please also share delivery time.');
    }
}

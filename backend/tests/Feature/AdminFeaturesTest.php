<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\QuoteRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminFeaturesTest extends TestCase
{
    use RefreshDatabase;

    private function createAdminUser(): User
    {
        return User::create([
            'name' => 'Admin User',
            'email' => 'admin@keyan.com',
            'account_type' => 'admin',
            'password' => Hash::make('password123'),
        ]);
    }

    public function test_admin_can_view_password_form_and_change_password(): void
    {
        $admin = $this->createAdminUser();

        $this->actingAs($admin)
            ->get(route('admin.password'))
            ->assertOk()
            ->assertSee('Change administrator password');

        $response = $this->actingAs($admin)
            ->put(route('admin.password.update'), [
                'current_password' => 'password123',
                'password' => 'newsecret123',
                'password_confirmation' => 'newsecret123',
            ]);

        $response->assertRedirect(route('admin.password'));
        $response->assertSessionHas('success');

        $this->assertTrue(Hash::check('newsecret123', $admin->fresh()->password));
    }

    public function test_admin_rejects_incorrect_current_password(): void
    {
        $admin = $this->createAdminUser();

        $response = $this->actingAs($admin)
            ->put(route('admin.password.update'), [
                'current_password' => 'wrongpassword',
                'password' => 'newsecret123',
                'password_confirmation' => 'newsecret123',
            ]);

        $response->assertSessionHasErrors('current_password');
    }

    public function test_admin_filtered_views_load_successfully(): void
    {
        $admin = $this->createAdminUser();

        $this->actingAs($admin)
            ->get(route('admin.orders', ['status' => 'pending', 'search' => '123']))
            ->assertOk()
            ->assertSee('All Statuses');

        $this->actingAs($admin)
            ->get(route('admin.quotes', ['status' => 'new', 'search' => 'valve']))
            ->assertOk()
            ->assertSee('All Statuses');

        $this->actingAs($admin)
            ->get(route('admin.customers', ['account_type' => 'customer', 'search' => 'john']))
            ->assertOk()
            ->assertSee('All Account Types');

        $this->actingAs($admin)
            ->get(route('admin.products', ['status' => 'active', 'search' => 'pump']))
            ->assertOk()
            ->assertSee('All Categories');
    }

    public function test_admin_can_permanently_delete_category_and_product(): void
    {
        $admin = $this->createAdminUser();

        $category = \App\Models\Category::create([
            'slug' => 'test-cat',
            'name' => 'Test Category',
            'is_active' => true,
        ]);

        $product = \App\Models\Product::create([
            'category_id' => $category->id,
            'catalog_id' => 'p-del-test',
            'sku' => 'SKU-DEL-1',
            'name' => 'Deletable Product',
            'price_usd' => 50,
            'availability' => 'In Stock',
            'is_active' => true,
        ]);

        // Permanently delete product
        $this->actingAs($admin)
            ->delete(route('admin.products.destroy', $product))
            ->assertRedirect();
        $this->assertDatabaseMissing('products', ['id' => $product->id]);

        // Permanently delete category
        $this->actingAs($admin)
            ->delete(route('admin.categories.destroy', $category))
            ->assertRedirect();
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }

    public function test_admin_can_reply_to_a_customer_quote(): void
    {
        $admin = $this->createAdminUser();
        $customer = User::factory()->create(['email' => 'buyer@keyan.test']);
        $quote = QuoteRequest::create([
            'user_id' => $customer->id,
            'reference' => 'KEY-ADMIN-CHAT',
            'email' => $customer->email,
            'subject' => 'Product request',
            'message' => 'Please send pricing.',
            'status' => 'new',
        ]);

        $this->actingAs($admin)->post(route('admin.quotes.messages.store', $quote), ['body' => 'Our team will send pricing shortly.'])
            ->assertRedirect()->assertSessionHas('success');

        $this->assertDatabaseHas('quote_messages', ['quote_request_id' => $quote->id, 'sender_role' => 'admin', 'body' => 'Our team will send pricing shortly.']);
        $this->assertSame('quoted', $quote->fresh()->status);
    }

    public function test_admin_can_save_product_as_draft_and_toggle_live_status(): void
    {
        $admin = $this->createAdminUser();

        $category = \App\Models\Category::create([
            'slug' => 'draft-cat',
            'name' => 'Draft Category',
            'is_active' => true,
        ]);

        // 1. Admin creates product in Draft mode (is_active = 0)
        $storeResponse = $this->actingAs($admin)->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'sku' => 'SKU-DRAFT-1',
            'name' => 'Draft Industrial Pump',
            'brand' => 'Keyan Brand',
            'price_usd' => '120.00',
            'availability' => 'In Stock',
            'is_active' => '0',
        ]);

        $storeResponse->assertRedirect(route('admin.products'));
        $storeResponse->assertSessionHas('success');

        $product = \App\Models\Product::where('sku', 'SKU-DRAFT-1')->firstOrFail();
        $this->assertFalse($product->is_active);

        // 2. Public API does NOT show this draft product
        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonMissing(['sku' => 'SKU-DRAFT-1']);

        $this->getJson('/api/products/'.$product->catalog_id)
            ->assertNotFound();

        // 3. Admin product list shows product with Draft badge and filters work
        $this->actingAs($admin)->get(route('admin.products', ['status' => 'draft']))
            ->assertOk()
            ->assertSee('Draft Industrial Pump')
            ->assertSee('Draft Only (Hidden)');

        $this->actingAs($admin)->get(route('admin.products', ['status' => 'live']))
            ->assertOk()
            ->assertDontSee('Draft Industrial Pump');

        // 4. Admin toggles product to Live with 1-click
        $toggleResponse = $this->actingAs($admin)
            ->post(route('admin.products.toggle-status', $product));

        $toggleResponse->assertRedirect();
        $this->assertTrue($product->fresh()->is_active);

        // 5. Public API now shows this product
        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonFragment(['sku' => 'SKU-DRAFT-1']);

        // 6. Admin toggles product back to Draft
        $this->actingAs($admin)
            ->post(route('admin.products.toggle-status', $product))
            ->assertRedirect();

        $this->assertFalse($product->fresh()->is_active);
    }
}

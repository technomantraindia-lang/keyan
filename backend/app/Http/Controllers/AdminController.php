<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\QuoteRequest;
use App\Models\PushSubscription;
use App\Models\QuoteMessage;
use App\Models\User;
use App\Services\QuoteChatCleanupService;
use App\Services\PushNotificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class AdminController extends Controller
{
    public function loginForm(): View
    {
        return view('admin.login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt([...$credentials, 'account_type' => 'admin'], $request->boolean('remember'))) {
            return back()->withErrors(['email' => 'Those administrator credentials are not valid.'])->withInput();
        }

        $request->session()->regenerate();

        return redirect()->intended(route('admin.dashboard'));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }

    public function dashboard(): View
    {
        return view('admin.dashboard', [
            'stats' => [
                'products' => Product::count(),
                'categories' => Category::count(),
                'orders' => Order::count(),
                'quotes' => QuoteRequest::where('status', 'new')->count(),
                'customers' => User::where('account_type', 'customer')->count(),
                'revenue' => Order::whereIn('status', ['paid', 'processing', 'shipped', 'completed'])->sum('total_usd'),
            ],
            'recentOrders' => Order::latest()->take(6)->get(),
            'recentQuotes' => QuoteRequest::with('product')->latest()->take(6)->get(),
        ]);
    }

    public function products(Request $request): View
    {
        $query = Product::with('category')->latest();

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        if ($request->filled('status')) {
            if ($request->input('status') === 'active') {
                $query->where('is_active', true);
            } elseif ($request->input('status') === 'archived') {
                $query->where('is_active', false);
            }
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%")
                  ->orWhere('catalog_id', 'like', "%{$search}%")
                  ->orWhere('brand', 'like', "%{$search}%");
            });
        }

        return view('admin.products.index', [
            'products' => $query->paginate(12)->withQueryString(),
            'categories' => Category::orderBy('name')->get(),
            'filters' => $request->only(['category_id', 'status', 'search']),
        ]);
    }

    public function productCreate(): View
    {
        return view('admin.products.form', ['product' => new Product(), 'categories' => Category::orderBy('name')->get()]);
    }

    public function productStore(Request $request): RedirectResponse
    {
        Product::create($this->productData($request));

        return redirect()->route('admin.products')->with('success', 'Product created successfully.');
    }

    public function productEdit(Product $product): View
    {
        return view('admin.products.form', ['product' => $product, 'categories' => Category::orderBy('name')->get()]);
    }

    public function productUpdate(Request $request, Product $product): RedirectResponse
    {
        $product->update($this->productData($request, $product));

        return redirect()->route('admin.products')->with('success', 'Product updated successfully.');
    }

    public function productToggleStatus(Product $product): RedirectResponse
    {
        $newStatus = ! $product->is_active;
        $product->update(['is_active' => $newStatus]);

        $label = $newStatus ? 'restored to active' : 'archived';

        return back()->with('success', "Product '{$product->name}' {$label}.");
    }

    public function productDestroy(Product $product): RedirectResponse
    {
        $productName = $product->name;
        $product->cartItems()->delete();
        $product->delete();

        return back()->with('success', "Product '{$productName}' permanently deleted.");
    }

    public function categories(): View
    {
        return view('admin.categories.index', ['categories' => Category::withCount('products')->orderBy('sort_order')->get()]);
    }

    public function categoryCreate(): View
    {
        return view('admin.categories.form', ['category' => new Category()]);
    }

    public function categoryEdit(Category $category): View
    {
        return view('admin.categories.form', ['category' => $category]);
    }

    public function categoryStore(Request $request): RedirectResponse
    {
        Category::create($this->categoryData($request));

        return back()->with('success', 'Category created successfully.');
    }

    public function categoryUpdate(Request $request, Category $category): RedirectResponse
    {
        $category->update($this->categoryData($request, $category));

        return back()->with('success', 'Category updated successfully.');
    }

    public function categoryToggleStatus(Category $category): RedirectResponse
    {
        $newStatus = ! $category->is_active;
        $category->update(['is_active' => $newStatus]);

        $label = $newStatus ? 'restored to active' : 'archived';

        return back()->with('success', "Category '{$category->name}' {$label}.");
    }

    public function categoryDestroy(Category $category): RedirectResponse
    {
        if ($category->products()->exists()) {
            return back()->with('error', "Cannot permanently delete category '{$category->name}' because it still contains products. Move or delete its products first.");
        }

        $categoryName = $category->name;
        $category->delete();

        return back()->with('success', "Category '{$categoryName}' permanently deleted.");
    }

    public function orders(Request $request): View
    {
        $query = Order::with('items')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('date')) {
            $date = $request->input('date');
            if ($date === 'today') {
                $query->whereDate('created_at', today());
            } elseif ($date === 'week') {
                $query->where('created_at', '>=', now()->subDays(7));
            } elseif ($date === 'month') {
                $query->where('created_at', '>=', now()->subDays(30));
            }
        }

        return view('admin.orders.index', [
            'orders' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['status', 'search', 'date']),
        ]);
    }

    public function orderShow(Order $order): View
    {
        return view('admin.orders.show', [
            'order' => $order->load(['items', 'user', 'user.addresses']),
        ]);
    }

    public function orderUpdate(Request $request, Order $order): RedirectResponse
    {
        $order->update($request->validate(['status' => ['required', 'in:pending,paid,processing,shipped,completed,cancelled']]));

        return back()->with('success', "Order {$order->order_number} updated.");
    }

    public function quotes(Request $request, QuoteChatCleanupService $cleanup): View
    {
        $cleanup->purgeInactive();

        $query = QuoteRequest::with('product')
            ->withCount(['messages as unread_customer_messages_count' => fn ($query) => $query
                ->where('sender_role', 'customer')
                ->whereNull('read_at')])
            ->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('reference', 'like', "%{$search}%")
                  ->orWhere('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        return view('admin.quotes.index', [
            'quotes' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function quoteShow(QuoteRequest $quote): View
    {
        $quote->messages()->where('sender_role', 'customer')->whereNull('read_at')->update(['read_at' => now()]);

        return view('admin.quotes.show', [
            'quote' => $quote->load(['product', 'user', 'messages.sender']),
        ]);
    }

    public function quoteMessage(Request $request, QuoteRequest $quote, PushNotificationService $push): RedirectResponse
    {
        $data = $request->validate(['body' => ['required', 'string', 'max:10000']]);
        $quote->messages()->create([
            'sender_id' => Auth::id(),
            'sender_role' => 'admin',
            'body' => trim($data['body']),
        ]);
        $quote->messages()->where('sender_role', 'customer')->whereNull('read_at')->update(['read_at' => now()]);
        $quote->update(['status' => in_array($quote->status, ['new', 'contacted'], true) ? 'quoted' : $quote->status]);

        if ($quote->user) {
            $push->sendToUser(
                $quote->user,
                'Keyan replied to your request',
                'You have a new message about '.$quote->reference,
                '/customer-portal.html?quote='.$quote->id
            );
        }

        return back()->with('success', 'Reply sent to the customer.');
    }

    public function storePushSubscription(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'endpoint' => ['required', 'url', 'max:2000'],
            'keys.p256dh' => ['nullable', 'string', 'max:500'],
            'keys.auth' => ['nullable', 'string', 'max:500'],
        ]);

        PushSubscription::updateOrCreate(
            ['user_id' => Auth::id(), 'endpoint_hash' => hash('sha256', $data['endpoint'])],
            [
                'endpoint' => $data['endpoint'],
                'public_key' => data_get($data, 'keys.p256dh'),
                'auth_token' => data_get($data, 'keys.auth'),
                'content_encoding' => 'aes128gcm',
                'last_used_at' => now(),
            ]
        );

        return response()->json(['message' => 'Mobile notifications enabled.']);
    }

    public function requestedProducts(Request $request, QuoteChatCleanupService $cleanup): View
    {
        $cleanup->purgeInactive();

        $query = QuoteRequest::with(['product', 'user'])
            ->withCount(['messages as unread_customer_messages_count' => fn ($query) => $query
                ->where('sender_role', 'customer')
                ->whereNull('read_at')])
            ->whereNotNull('product_id')
            ->latest();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('reference', 'like', "%{$search}%")
                    ->orWhere('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('company_name', 'like', "%{$search}%")
                    ->orWhere('product_catalog_id', 'like', "%{$search}%");
            });
        }

        return view('admin.requested-products.index', [
            'requests' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function quoteUpdate(Request $request, QuoteRequest $quote): RedirectResponse
    {
        $quote->update($request->validate(['status' => ['required', 'in:new,contacted,quoted,won,lost,closed']]));

        return back()->with('success', "Quote {$quote->reference} updated.");
    }

    public function customers(Request $request): View
    {
        $query = User::with('addresses')->where('account_type', '!=', 'admin')->latest();

        if ($request->filled('account_type')) {
            $query->where('account_type', $request->input('account_type'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('gstin', 'like', "%{$search}%");
            });
        }

        return view('admin.customers.index', [
            'customers' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['account_type', 'search']),
        ]);
    }

    public function passwordForm(): View
    {
        return view('admin.password');
    }

    public function passwordUpdate(Request $request): RedirectResponse
    {
        $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if (! Hash::check($request->input('current_password'), Auth::user()->password)) {
            return back()->withErrors(['current_password' => 'The provided current password does not match our records.']);
        }

        Auth::user()->update([
            'password' => Hash::make($request->input('password')),
        ]);

        return redirect()->route('admin.password')->with('success', 'Admin password updated successfully.');
    }

    private function productData(Request $request, ?Product $product = null): array
    {
        $data = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'sku' => ['required', 'string', 'max:100', 'unique:products,sku'.($product ? ','.$product->id : '')],
            'name' => ['required', 'string', 'max:190'],
            'brand' => ['nullable', 'string', 'max:190'],
            'short_description' => ['nullable', 'string'],
            'full_description' => ['nullable', 'string'],
            'specs' => ['nullable', 'string'],
            'specifications' => ['nullable', 'string'],
            'applications' => ['nullable', 'string'],
            'gallery' => ['nullable', 'string'],
            'price_usd' => ['required', 'numeric', 'min:0'],
            'availability' => ['required', 'string', 'max:100'],
            'is_quote_only' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'image_path' => ['nullable', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:5120'],
            'gallery_files' => ['nullable', 'array'],
            'gallery_files.*' => ['image', 'mimes:jpg,jpeg,png,webp,gif', 'max:5120'],
        ]);

        $data['specifications'] = $this->parseStructuredInput($request->input('specifications'), 'map');
        $data['applications'] = $this->parseStructuredInput($request->input('applications'), 'list');
        $data['gallery'] = $request->exists('gallery')
            ? $this->parseStructuredInput($request->input('gallery'), 'list')
            : ($product?->gallery ?? []);

        if ($request->hasFile('image_file')) {
            $storedPath = $request->file('image_file')->store('products', 'public');
            $data['image_path'] = '/storage/'.$storedPath;
        }

        foreach ($request->file('gallery_files', []) as $galleryFile) {
            $data['gallery'][] = '/storage/'.$galleryFile->store('products/gallery', 'public');
        }

        $data['is_quote_only'] = $request->boolean('is_quote_only');
        $data['is_quote_only'] = $data['is_quote_only'] || $data['availability'] === 'Available on Request';
        $data['is_active'] = $request->boolean('is_active');
        $data['catalog_id'] = $product?->catalog_id ?? $this->nextCatalogId();
        unset($data['image_file'], $data['gallery_files']);

        return $data;
    }

    private function nextCatalogId(): string
    {
        $nextNumber = ((int) Product::max('id')) + 1;
        $catalogId = 'p'.$nextNumber;

        while (Product::where('catalog_id', $catalogId)->exists()) {
            $nextNumber++;
            $catalogId = 'p'.$nextNumber;
        }

        return $catalogId;
    }

    private function categoryData(Request $request, ?Category $category = null): array
    {
        $data = $request->validate([
            'slug' => ['required', 'alpha_dash', 'max:100', 'unique:categories,slug'.($category ? ','.$category->id : '')],
            'name' => ['required', 'string', 'max:190'],
            'description' => ['nullable', 'string'],
            'supply_class' => ['nullable', 'string', 'max:190'],
            'application' => ['nullable', 'string', 'max:190'],
            'items' => ['nullable', 'string'],
            'cta_text' => ['nullable', 'string', 'max:190'],
            'image_path' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:5120'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('image_file')) {
            $data['image_path'] = '/storage/'.$request->file('image_file')->store('categories', 'public');
        }

        $data['items'] = $this->parseStructuredInput($request->input('items'), 'list');
        $data['sort_order'] = (int) ($request->input('sort_order', $category?->sort_order ?? 0));

        unset($data['image_file']);

        if (! $category) {
            $data['sort_order'] = ((int) Category::max('sort_order')) + 1;
        }

        return $data + ['is_active' => $request->boolean('is_active')];
    }

    private function parseStructuredInput(?string $value, string $format): array
    {
        $value = trim((string) $value);
        if ($value === '') {
            return [];
        }

        $decoded = json_decode($value, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
            return $decoded;
        }

        $lines = preg_split('/\r\n|\r|\n/', $value) ?: [];
        if ($format === 'map') {
            $result = [];
            foreach ($lines as $line) {
                $parts = explode(':', $line, 2);
                if (count($parts) === 2 && trim($parts[0]) !== '') {
                    $result[trim($parts[0])] = trim($parts[1]);
                }
            }
            return $result;
        }

        return array_values(array_filter(array_map('trim', preg_split('/[,\r\n]+/', $value) ?: [])));
    }
}

<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

$frontendRoot = dirname(base_path());

// The Keyan storefront lives beside the Laravel backend. Serving it here keeps
// the storefront and API on the same local URL during development.
$serveFrontendFile = static function (string $path = 'index.html') use ($frontendRoot) {
    $relativePath = ltrim(str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $path), DIRECTORY_SEPARATOR);
    $frontendRootReal = realpath($frontendRoot);
    $frontendFile = $frontendRootReal
        ? realpath($frontendRootReal.DIRECTORY_SEPARATOR.$relativePath)
        : false;

    abort_unless(
        $frontendRootReal &&
        $frontendFile &&
        str_starts_with(strtolower($frontendFile), strtolower($frontendRootReal.DIRECTORY_SEPARATOR)) &&
        is_file($frontendFile),
        404
    );

    $contentTypes = [
        'html' => 'text/html; charset=UTF-8',
        'css' => 'text/css; charset=UTF-8',
        'js' => 'application/javascript; charset=UTF-8',
        'json' => 'application/json; charset=UTF-8',
        'svg' => 'image/svg+xml',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'webp' => 'image/webp',
        'ico' => 'image/x-icon',
        'mp4' => 'video/mp4',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
    ];
    $extension = strtolower(pathinfo($frontendFile, PATHINFO_EXTENSION));

    return response()->file($frontendFile, array_filter([
        'Content-Type' => $contentTypes[$extension] ?? null,
        'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma' => 'no-cache',
        'Expires' => '0',
    ]));
};

Route::get('/', $serveFrontendFile);

// Serve the catalogue images that live beside the Laravel backend during local development.
Route::get('/product-assets/{path}', function (string $path) {
    $imageRoot = realpath(dirname(base_path()).DIRECTORY_SEPARATOR.'iamges');
    $relativePath = preg_replace('#^iamges[\\/]#i', '', $path);
    $imageFile = $imageRoot ? realpath($imageRoot.DIRECTORY_SEPARATOR.str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $relativePath)) : false;

    abort_unless($imageRoot && $imageFile && str_starts_with(strtolower($imageFile), strtolower($imageRoot.DIRECTORY_SEPARATOR)) && is_file($imageFile), 404);

    return response()->file($imageFile);
})->where('path', '.*')->name('product.assets');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AdminController::class, 'loginForm'])->name('login');
        Route::post('/login', [AdminController::class, 'login'])->name('login.submit');
    });

    Route::middleware('admin')->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::post('/logout', [AdminController::class, 'logout'])->name('logout');

        Route::get('/products', [AdminController::class, 'products'])->name('products');
        Route::get('/products/create', [AdminController::class, 'productCreate'])->name('products.create');
        Route::post('/products', [AdminController::class, 'productStore'])->name('products.store');
        Route::get('/products/{product}/edit', [AdminController::class, 'productEdit'])->name('products.edit');
        Route::put('/products/{product}', [AdminController::class, 'productUpdate'])->name('products.update');
        Route::post('/products/{product}/toggle-status', [AdminController::class, 'productToggleStatus'])->name('products.toggle-status');
        Route::delete('/products/{product}', [AdminController::class, 'productDestroy'])->name('products.destroy');

        Route::get('/categories', [AdminController::class, 'categories'])->name('categories');
        Route::get('/categories/create', [AdminController::class, 'categoryCreate'])->name('categories.create');
        Route::get('/categories/{category}/edit', [AdminController::class, 'categoryEdit'])->name('categories.edit');
        Route::post('/categories', [AdminController::class, 'categoryStore'])->name('categories.store');
        Route::put('/categories/{category}', [AdminController::class, 'categoryUpdate'])->name('categories.update');
        Route::post('/categories/{category}/toggle-status', [AdminController::class, 'categoryToggleStatus'])->name('categories.toggle-status');
        Route::delete('/categories/{category}', [AdminController::class, 'categoryDestroy'])->name('categories.destroy');

        Route::get('/orders', [AdminController::class, 'orders'])->name('orders');
        Route::get('/orders/{order}', [AdminController::class, 'orderShow'])->name('orders.show');
        Route::patch('/orders/{order}', [AdminController::class, 'orderUpdate'])->name('orders.update');
        Route::get('/quotes', [AdminController::class, 'quotes'])->name('quotes');
        Route::get('/quotes/{quote}', [AdminController::class, 'quoteShow'])->name('quotes.show');
        Route::patch('/quotes/{quote}', [AdminController::class, 'quoteUpdate'])->name('quotes.update');
        Route::post('/quotes/{quote}/messages', [AdminController::class, 'quoteMessage'])->name('quotes.messages.store');
        Route::post('/push-subscriptions', [AdminController::class, 'storePushSubscription'])->name('push-subscriptions.store');
        Route::get('/requested-products', [AdminController::class, 'requestedProducts'])->name('requested-products');
        Route::get('/customers', [AdminController::class, 'customers'])->name('customers');

        Route::get('/password', [AdminController::class, 'passwordForm'])->name('password');
        Route::put('/password', [AdminController::class, 'passwordUpdate'])->name('password.update');
    });
});

// Serve storefront pages and static assets from the project root. API and
// admin routes are excluded so they continue to be handled by Laravel.
Route::get('/{path}', $serveFrontendFile)
    ->where('path', '^(?!api(?:/|$)|admin(?:/|$)).*');

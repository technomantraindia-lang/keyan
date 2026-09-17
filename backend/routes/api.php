<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\QuoteRequestController;
use App\Http\Controllers\Api\ChatController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json([
    'status' => 'ok',
    'service' => config('app.name'),
    'timestamp' => now()->toISOString(),
]));

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::post('/quote-requests', [QuoteRequestController::class, 'store']);
Route::get('/push-public-key', [ChatController::class, 'publicKey']);
Route::post('/guest-chat/start', [ChatController::class, 'startGuestChat']);
Route::get('/guest-chat/{quote}/messages', [ChatController::class, 'guestMessages']);
Route::post('/guest-chat/{quote}/messages', [ChatController::class, 'sendGuestMessage']);

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::put('/me', [AuthController::class, 'update']);
        Route::get('/addresses', [AddressController::class, 'index']);
        Route::post('/addresses', [AddressController::class, 'store']);
        Route::put('/addresses/{address}', [AddressController::class, 'update']);
        Route::delete('/addresses/{address}', [AddressController::class, 'destroy']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/quote-requests', [ChatController::class, 'quotes']);
    Route::get('/quote-requests/{quote}/messages', [ChatController::class, 'messages']);
    Route::post('/quote-requests/{quote}/messages', [ChatController::class, 'sendCustomerMessage']);
    Route::post('/push-subscriptions', [ChatController::class, 'storeSubscription']);
    Route::delete('/push-subscriptions', [ChatController::class, 'removeSubscription']);
});

Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'show']);
    Route::post('/items', [CartController::class, 'add']);
    Route::patch('/items/{item}', [CartController::class, 'update']);
    Route::delete('/items/{item}', [CartController::class, 'remove']);
});

Route::middleware('auth:sanctum')->post('/orders', [OrderController::class, 'store']);

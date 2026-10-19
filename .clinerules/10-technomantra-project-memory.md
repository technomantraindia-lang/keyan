# Technomantra Project Memory

> This is a persistent locator map, not a claim that file contents are current. Read each target only once per task and rely on normal invalidation after edits.

- Workspace: keyan
- Technology: Vite, Tailwind CSS, Node.js/npm, Laravel/PHP
- Active file at refresh: None
- Local code graph: 121 files · 72 edges · 0 matched flows
- Refreshed: 2026-10-19T10:12:20.680Z

## Framework Intelligence (V4.7.8)
- Profiles: laravel
- Nested app root: backend
- Package manager: npm
- Laravel requirement: ^12.0

### Entry / bootstrap candidates
- app.js
- index.html
- backend/artisan
- backend/routes/web.php
- backend/routes/api.php
- backend/public/index.php

### Pages / views
- backend/resources/views/welcome.blade.php
- backend/resources/views/admin/requested-products/index.blade.php
- backend/resources/views/admin/quotes/show.blade.php
- backend/resources/views/admin/quotes/index.blade.php
- backend/resources/views/admin/products/index.blade.php
- backend/resources/views/admin/products/form.blade.php
- backend/resources/views/admin/password.blade.php
- backend/resources/views/admin/orders/show.blade.php
- backend/resources/views/admin/orders/index.blade.php
- backend/resources/views/admin/login.blade.php
- backend/resources/views/admin/layout.blade.php
- backend/resources/views/admin/dashboard.blade.php
- backend/resources/views/admin/customers/index.blade.php
- backend/resources/views/admin/categories/index.blade.php
- backend/resources/views/admin/categories/form.blade.php

### Backend API contracts
- backend/routes/api.php: GET /api/categories -> CategoryController@index
- backend/routes/api.php: GET /api/products -> ProductController@index
- backend/routes/api.php: GET /api/products/{product} -> ProductController@show
- backend/routes/api.php: POST /api/quote-requests -> QuoteRequestController@store
- backend/routes/api.php: GET /api/push-public-key -> ChatController@publicKey
- backend/routes/api.php: POST /api/guest-chat/start -> ChatController@startGuestChat
- backend/routes/api.php: GET /api/guest-chat/{quote}/messages -> ChatController@guestMessages
- backend/routes/api.php: POST /api/guest-chat/{quote}/messages -> ChatController@sendGuestMessage
- backend/routes/api.php: POST /api/register -> AuthController@register
- backend/routes/api.php: POST /api/login -> AuthController@login
- backend/routes/api.php: GET /api/me -> AuthController@me
- backend/routes/api.php: PUT /api/me -> AuthController@update
- backend/routes/api.php: GET /api/addresses -> AddressController@index
- backend/routes/api.php: POST /api/addresses -> AddressController@store
- backend/routes/api.php: PUT /api/addresses/{address} -> AddressController@update
- backend/routes/api.php: DELETE /api/addresses/{address} -> AddressController@destroy
- backend/routes/api.php: POST /api/logout -> AuthController@logout
- backend/routes/api.php: GET /api/quote-requests -> ChatController@quotes
- backend/routes/api.php: GET /api/quote-requests/{quote}/messages -> ChatController@messages
- backend/routes/api.php: POST /api/quote-requests/{quote}/messages -> ChatController@sendCustomerMessage
- backend/routes/api.php: POST /api/push-subscriptions -> ChatController@storeSubscription
- backend/routes/api.php: DELETE /api/push-subscriptions -> ChatController@removeSubscription
- backend/routes/api.php: GET /api -> CartController@show
- backend/routes/api.php: POST /api/items -> CartController@add
- backend/routes/api.php: PATCH /api/items/{item} -> CartController@update
- backend/routes/api.php: DELETE /api/items/{item} -> CartController@remove
- backend/routes/web.php: GET /login -> AdminController@loginForm
- backend/routes/web.php: POST /login -> AdminController@login

### Safe runtime configuration hints
- backend/config/cache.php: env DB_CACHE_CONNECTION, DB_CACHE_TABLE, DB_CACHE_LOCK_CONNECTION, DB_CACHE_LOCK_TABLE, REDIS_CACHE_CONNECTION, REDIS_CACHE_LOCK_CONNECTION
- backend/config/database.php: MySQL · env DB_CONNECTION, DB_URL, DB_DATABASE, DB_FOREIGN_KEYS, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_SOCKET, DB_CHARSET, DB_COLLATION, MYSQL_ATTR_SSL_CA, DB_SSLMODE, DB_ENCRYPT
- backend/config/queue.php: env DB_QUEUE_CONNECTION, DB_QUEUE_TABLE, DB_QUEUE, DB_QUEUE_RETRY_AFTER, REDIS_QUEUE_CONNECTION, REDIS_QUEUE, REDIS_QUEUE_RETRY_AFTER, DB_CONNECTION

### Database schema shapes
- backend/database/migrations/2026_09_17_000002_create_push_subscriptions_table.php: table push_subscriptions (user_id, endpoint, endpoint_hash, public_key, auth_token, content_encoding, last_used_at)
- backend/database/migrations/2026_09_17_000001_create_quote_messages_table.php: table quote_messages (quote_request_id, sender_id, sender_role, read_at)
- backend/database/migrations/2026_09_10_000007_create_addresses_table.php: table addresses (user_id, label, recipient_name, company_name, line1, line2, city, state, postal_code, country, phone, is_default)
- backend/database/migrations/2026_09_10_000005_create_orders_table.php: table orders (user_id, order_number, full_name, company_name, vessel_name, delivery_port, email, phone, payment_method, status, subtotal_usd, shipping_usd)
- backend/database/migrations/2026_09_10_000005_create_orders_table.php: table order_items (order_id, product_id, sku, product_name, unit_price_usd, line_total_usd)
- backend/database/migrations/2026_09_10_000004_create_carts_table.php: table carts (user_id, status)
- backend/database/migrations/2026_09_10_000004_create_carts_table.php: table cart_items (cart_id, product_id, unit_price_usd)
- backend/database/migrations/2026_09_10_000003_create_quote_requests_table.php: table quote_requests (user_id, product_id, reference, first_name, last_name, company_name, email, phone, subject, status, source, metadata)
- backend/database/migrations/2026_09_10_000002_create_products_table.php: table products (category_id, catalog_id, sku, name, brand, short_description, specs, specifications, applications, image_path, gallery, price_usd)
- backend/database/migrations/2026_09_10_000001_create_categories_table.php: table categories (slug, name, description, image_path, is_active)
- backend/database/migrations/2019_12_14_000001_create_personal_access_tokens_table.php: table personal_access_tokens (name, token, abilities, last_used_at, expires_at)
- backend/database/migrations/0001_01_01_000002_create_jobs_table.php: table jobs (queue)
- backend/database/migrations/0001_01_01_000002_create_jobs_table.php: table job_batches (id, name, total_jobs, pending_jobs, failed_jobs, cancelled_at, created_at, finished_at)
- backend/database/migrations/0001_01_01_000002_create_jobs_table.php: table failed_jobs (uuid, connection, queue, failed_at)
- backend/database/migrations/0001_01_01_000001_create_cache_table.php: table cache (key, expiration)
- backend/database/migrations/0001_01_01_000001_create_cache_table.php: table cache_locks (key, owner, expiration)
- backend/database/migrations/0001_01_01_000000_create_users_table.php: table users (name, email, phone, company_name, gstin, account_type, email_verified_at, password)
- backend/database/migrations/0001_01_01_000000_create_users_table.php: table password_reset_tokens (email, token, created_at)
- backend/database/migrations/0001_01_01_000000_create_users_table.php: table sessions (id, user_id, ip_address, user_agent, last_activity)

### Laravel route / class / method symbols
- backend/routes/web.php: GET /, GET /product-assets/{path}, GET /login, POST /login, POST /logout, GET /products, GET /products/create, POST /products
- backend/routes/api.php: GET /health, GET /categories, GET /products, GET /products/{product}, POST /quote-requests, GET /push-public-key, POST /guest-chat/start, GET /guest-chat/{quote}/messages
- backend/app/Services/QuoteChatCleanupService.php: class QuoteChatCleanupService, purgeInactive()
- backend/app/Services/PushNotificationService.php: class PushNotificationService, sendToUser()
- backend/app/Models/User.php: class User, casts(), quoteRequests(), carts(), orders(), addresses(), quoteMessages(), pushSubscriptions()
- backend/app/Models/QuoteRequest.php: class QuoteRequest, casts(), product(), user(), messages()
- backend/app/Models/QuoteMessage.php: class QuoteMessage, casts(), quoteRequest(), sender()
- backend/app/Models/PushSubscription.php: class PushSubscription, casts(), user()
- backend/app/Models/Product.php: class Product, casts(), category(), quoteRequests(), cartItems()
- backend/app/Models/OrderItem.php: class OrderItem, casts(), order(), product()
- backend/app/Models/Order.php: class Order, casts(), user(), items()
- backend/app/Models/Category.php: class Category, casts(), products()
- backend/app/Models/CartItem.php: class CartItem, casts(), cart(), product()
- backend/app/Models/Cart.php: class Cart, user(), items()
- backend/app/Models/Address.php: class Address, casts(), user()
- backend/app/Http/Controllers/Controller.php: class Controller
- backend/app/Http/Controllers/AdminController.php: class AdminController, loginForm(), login(), logout(), dashboard(), products(), productCreate(), productStore(), productEdit(), productUpdate()
- backend/app/Http/Controllers/Api/QuoteRequestController.php: class QuoteRequestController, store()
- backend/app/Http/Controllers/Api/ProductController.php: class ProductController, index(), show()
- backend/app/Http/Controllers/Api/OrderController.php: class OrderController, store()
- backend/app/Http/Controllers/Api/ChatController.php: class ChatController, quotes(), messages(), sendCustomerMessage(), publicKey(), startGuestChat(), guestMessages(), sendGuestMessage(), storeSubscription(), removeSubscription()
- backend/app/Http/Controllers/Api/CategoryController.php: class CategoryController, index()
- backend/app/Http/Controllers/Api/CartController.php: class CartController, show(), add(), update(), remove()
- backend/app/Http/Controllers/Api/AuthController.php: class AuthController, register(), login(), me(), update(), logout()
- backend/app/Http/Controllers/Api/AddressController.php: class AddressController, index(), store(), update(), destroy()

### Laravel route -> controller graph
- backend/routes/web.php: GET /login -> AdminController@loginForm, POST /login -> AdminController@login, GET / -> AdminController@dashboard, POST /logout -> AdminController@logout, GET /products -> AdminController@products, GET /products/create -> AdminController@productCreate, POST /products -> AdminController@productStore, GET /products/{product}/edit -> AdminController@productEdit, PUT /products/{product} -> AdminController@productUpdate, POST /products/{product}/toggle-status -> AdminController@productToggleStatus, DELETE /products/{product} -> AdminController@productDestroy, GET /categories -> AdminController@categories, GET /categories/create -> AdminController@categoryCreate, GET /categories/{category}/edit -> AdminController@categoryEdit, POST /categories -> AdminController@categoryStore, PUT /categories/{category} -> AdminController@categoryUpdate, POST /categories/{category}/toggle-status -> AdminController@categoryToggleStatus, DELETE /categories/{category} -> AdminController@categoryDestroy, GET /orders -> AdminController@orders, GET /orders/{order} -> AdminController@orderShow
- backend/routes/api.php: GET /categories -> CategoryController@index, GET /products -> ProductController@index, GET /products/{product} -> ProductController@show, POST /quote-requests -> QuoteRequestController@store, GET /push-public-key -> ChatController@publicKey, POST /guest-chat/start -> ChatController@startGuestChat, GET /guest-chat/{quote}/messages -> ChatController@guestMessages, POST /guest-chat/{quote}/messages -> ChatController@sendGuestMessage, POST /register -> AuthController@register, POST /login -> AuthController@login, GET /me -> AuthController@me, PUT /me -> AuthController@update, GET /addresses -> AddressController@index, POST /addresses -> AddressController@store, PUT /addresses/{address} -> AddressController@update, DELETE /addresses/{address} -> AddressController@destroy, POST /logout -> AuthController@logout, GET /quote-requests -> ChatController@quotes, GET /quote-requests/{quote}/messages -> ChatController@messages, POST /quote-requests/{quote}/messages -> ChatController@sendCustomerMessage

### Laravel controller/service/model chains
- backend/app/Services/QuoteChatCleanupService.php -> app/Models/QuoteRequest.php
- backend/app/Services/PushNotificationService.php -> app/Models/PushSubscription.php, app/Models/User.php
- backend/app/Http/Controllers/AdminController.php -> app/Models/Category.php, app/Models/Order.php, app/Models/Product.php, app/Models/QuoteRequest.php, app/Models/PushSubscription.php, app/Models/QuoteMessage.php, app/Models/User.php, app/Services/QuoteChatCleanupService.php, FormRequest QuoteRequest
- backend/app/Http/Controllers/Api/QuoteRequestController.php -> app/Http/Resources/QuoteRequestResource.php, app/Models/Product.php, app/Models/QuoteRequest.php, app/Models/User.php, app/Services/PushNotificationService.php
- backend/app/Http/Controllers/Api/ProductController.php -> app/Http/Resources/ProductResource.php, app/Models/Product.php
- backend/app/Http/Controllers/Api/OrderController.php -> app/Models/Address.php, app/Models/Order.php, app/Models/Product.php
- backend/app/Http/Controllers/Api/ChatController.php -> app/Models/PushSubscription.php, app/Models/QuoteMessage.php, app/Models/QuoteRequest.php, app/Models/User.php, app/Services/QuoteChatCleanupService.php, app/Services/PushNotificationService.php, FormRequest QuoteRequest
- backend/app/Http/Controllers/Api/CategoryController.php -> app/Http/Resources/CategoryResource.php, app/Models/Category.php
- backend/app/Http/Controllers/Api/CartController.php -> app/Http/Resources/ProductResource.php, app/Models/Cart.php, app/Models/Product.php
- backend/app/Http/Controllers/Api/AuthController.php -> app/Models/User.php
- backend/app/Http/Controllers/Api/AddressController.php -> app/Models/Address.php

### Frontend routes
- backend/routes/api.php
- backend/routes/console.php
- backend/routes/web.php

### Styles
- style.css
- about.css
- backend/resources/css/app.css
- cart.css
- categories.css
- checkout.css
- contact.css
- customer-portal.css
- guest-chat.css
- industries.css
- product-detail.css
- products.css

### Node routes
- app.js

### Controllers
- backend/app/Http/Controllers/Controller.php
- backend/app/Http/Controllers/AdminController.php
- backend/app/Http/Controllers/Api/QuoteRequestController.php
- backend/app/Http/Controllers/Api/ProductController.php
- backend/app/Http/Controllers/Api/OrderController.php
- backend/app/Http/Controllers/Api/ChatController.php
- backend/app/Http/Controllers/Api/CategoryController.php
- backend/app/Http/Controllers/Api/CartController.php
- backend/app/Http/Controllers/Api/AuthController.php
- backend/app/Http/Controllers/Api/AddressController.php

### Services / actions
- backend/app/Services/QuoteChatCleanupService.php
- backend/app/Services/PushNotificationService.php

### Models / entities
- backend/app/Models/User.php
- backend/app/Models/QuoteRequest.php
- backend/app/Models/QuoteMessage.php
- backend/app/Models/PushSubscription.php
- backend/app/Models/Product.php
- backend/app/Models/OrderItem.php
- backend/app/Models/Order.php
- backend/app/Models/Category.php
- backend/app/Models/CartItem.php
- backend/app/Models/Cart.php
- backend/app/Models/Address.php

### Middleware
- backend/app/Http/Middleware/AdminMiddleware.php

### Laravel routes
- backend/routes/web.php
- backend/routes/api.php
- backend/routes/console.php

### Laravel API/Filament resources
- backend/app/Http/Resources/QuoteRequestResource.php
- backend/app/Http/Resources/ProductResource.php
- backend/app/Http/Resources/CategoryResource.php

### Recent migrations
- backend/database/migrations/2026_09_17_000002_create_push_subscriptions_table.php
- backend/database/migrations/2026_09_17_000001_create_quote_messages_table.php
- backend/database/migrations/2026_09_10_000007_create_addresses_table.php
- backend/database/migrations/2026_09_10_000006_extend_categories_for_storefront.php
- backend/database/migrations/2026_09_10_000005_create_orders_table.php
- backend/database/migrations/2026_09_10_000004_create_carts_table.php
- backend/database/migrations/2026_09_10_000003_create_quote_requests_table.php
- backend/database/migrations/2026_09_10_000002_create_products_table.php
- backend/database/migrations/2026_09_10_000001_create_categories_table.php
- backend/database/migrations/2019_12_14_000001_create_personal_access_tokens_table.php

### Available validation scripts
- build: vite build
- dev: vite

### Composer scripts
- setup
- dev
- test
- post-autoload-dump
- post-update-cmd
- post-root-package-install
- post-create-project-cmd
- pre-package-uninstall

## Recently edited files
- None recorded yet

## High-value project files
- backend/composer.json
- backend/package.json
- backend/README.md
- backend/vite.config.js
- index.html
- backend/config/app.php
- backend/config/auth.php
- backend/config/cache.php
- backend/config/cors.php
- backend/config/database.php
- backend/config/filesystems.php
- backend/config/logging.php
- backend/config/mail.php
- backend/config/queue.php
- backend/config/services.php
- backend/config/session.php
- backend/resources/views/admin/categories/form.blade.php
- backend/resources/views/admin/categories/index.blade.php
- backend/resources/views/admin/customers/index.blade.php
- backend/resources/views/admin/dashboard.blade.php
- backend/resources/views/admin/layout.blade.php
- backend/resources/views/admin/login.blade.php
- backend/resources/views/admin/orders/index.blade.php
- backend/resources/views/admin/orders/show.blade.php
- backend/resources/views/admin/password.blade.php
- backend/resources/views/admin/products/form.blade.php
- backend/resources/views/admin/products/index.blade.php
- backend/resources/views/admin/quotes/index.blade.php
- backend/resources/views/admin/quotes/show.blade.php
- backend/resources/views/admin/requested-products/index.blade.php
- backend/resources/views/welcome.blade.php
- backend/routes/api.php
- backend/routes/console.php
- backend/routes/web.php
- backend/storage/framework/views/1e3d8f4e594692171c53b13e6be38ce2.php
- backend/storage/framework/views/52203cf1585af94c0aefae2d6e2cf89b.php
- backend/storage/framework/views/58f1b281f838dd5875cba590befef95e.php
- backend/storage/framework/views/61494e460350dc091c543bcf61d6fedd.php
- backend/storage/framework/views/669fe6665a3adbb53e367a6201d150b9.php
- backend/storage/framework/views/675e8aea05ce50e1df7a32f646a65a5d.php
- backend/storage/framework/views/6c9e1581b94caa25895974e2299017bf.php
- backend/storage/framework/views/7d9856071126b398ac24b7528d507c51.php
- backend/storage/framework/views/8c1103870c0d187c3f275bbdc415735a.php
- backend/storage/framework/views/b1b4f7e95d78d1a5208f94318669acb1.php
- backend/storage/framework/views/b57b6eabddc1c387b7ec53f9558d966a.php
- backend/storage/framework/views/c01e953cb3b5636a72636f79091b5cb6.php
- backend/storage/framework/views/c03496948391050cb2d81bf9cbd22374.php
- backend/storage/framework/views/c5963de98a15a2a0ed519b8398dc50ea.php
- backend/storage/framework/views/cabf2d6ee21bc15e8d9ea1fc2dc738ec.php
- backend/storage/framework/views/e3f455551f7b8fbce7fc0f3a4938483e.php
- style.css
- .clinerules/05-technomantra-execution-mode.md
- .clinerules/06-technomantra-developer-mode.md
- .clinerules/07-technomantra-eco-execution.md
- .clinerules/08-technomantra-task-watchdog.md
- .clinerules/09-technomantra-multitask-isolation.md
- .clinerules/10-technomantra-project-memory.md
- .clinerules/11-technomantra-code-knowledge.md
- .clinerules/12-technomantra-task-capsules.md
- .clinerules/13-technomantra-runtime-price-optimizer.md
- .clinerules/14-technomantra-adaptive-cost-optimizer.md
- .clinerules/90-technomantra-selected-agent.md
- about.css
- about.html
- about.js
- app.js
- backend/app/Http/Controllers/AdminController.php
- backend/app/Http/Controllers/Api/AddressController.php
- backend/app/Http/Controllers/Api/AuthController.php
- backend/app/Http/Controllers/Api/CartController.php
- backend/app/Http/Controllers/Api/CategoryController.php
- backend/app/Http/Controllers/Api/ChatController.php
- backend/app/Http/Controllers/Api/OrderController.php
- backend/app/Http/Controllers/Api/ProductController.php
- backend/app/Http/Controllers/Api/QuoteRequestController.php
- backend/app/Http/Controllers/Controller.php
- backend/app/Http/Middleware/AdminMiddleware.php
- backend/app/Http/Resources/CategoryResource.php
- backend/app/Http/Resources/ProductResource.php
- backend/app/Http/Resources/QuoteRequestResource.php

## Additional indexed files
- backend/app/Models/Address.php
- backend/app/Models/Cart.php
- backend/app/Models/CartItem.php
- backend/app/Models/Category.php
- backend/app/Models/Order.php
- backend/app/Models/OrderItem.php
- backend/app/Models/Product.php
- backend/app/Models/PushSubscription.php
- backend/app/Models/QuoteMessage.php
- backend/app/Models/QuoteRequest.php
- backend/app/Models/User.php
- backend/app/Providers/AppServiceProvider.php
- backend/app/Services/PushNotificationService.php
- backend/app/Services/QuoteChatCleanupService.php
- backend/bootstrap/app.php
- backend/bootstrap/providers.php
- backend/database/factories/UserFactory.php
- backend/database/migrations/0001_01_01_000000_create_users_table.php
- backend/database/migrations/0001_01_01_000001_create_cache_table.php
- backend/database/migrations/0001_01_01_000002_create_jobs_table.php
- backend/database/migrations/2019_12_14_000001_create_personal_access_tokens_table.php
- backend/database/migrations/2026_09_10_000001_create_categories_table.php
- backend/database/migrations/2026_09_10_000002_create_products_table.php
- backend/database/migrations/2026_09_10_000003_create_quote_requests_table.php
- backend/database/migrations/2026_09_10_000004_create_carts_table.php
- backend/database/migrations/2026_09_10_000005_create_o

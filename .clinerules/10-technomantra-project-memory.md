# Technomantra Project Memory

> This is a persistent locator map, not a claim that file contents are current. Read each target only once per task and rely on normal invalidation after edits.

- Workspace: keyan
- Technology: Vite, Tailwind CSS, Node.js/npm, Laravel/PHP
- Active file at refresh: None
- Local code graph: 37 files · 45 edges · 0 matched flows
- Refreshed: 2026-09-17T08:34:07.895Z

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
- backend/routes/web.php: GET / -> AdminController@dashboard
- backend/routes/web.php: POST /logout -> AdminController@logout
- backend/routes/web.php: GET /products -> AdminController@products

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
- backend/routes/api.php: GET /health, GET /categories, GET /products, GET /products/{product}, POST /quote-requests, GET /push-public-key, POST /register, POST /login

### Laravel route -> controller graph
- backend/routes/web.php: GET /login -> AdminController@loginForm, POST /login -> AdminController@login, GET / -> AdminController@dashboard, POST /logout -> AdminController@logout, GET /products -> AdminController@products, GET /products/create -> AdminController@productCreate, POST /products -> AdminController@productStore, GET /products/{product}/edit -> AdminController@productEdit, PUT /products/{product} -> AdminController@productUpdate, POST /products/{product}/toggle-status -> AdminController@productToggleStatus, DELETE /products/{product} -> AdminController@productDestroy, GET /categories -> AdminController@categories, GET /categories/create -> AdminController@categoryCreate, GET /categories/{category}/edit -> AdminController@categoryEdit, POST /categories -> AdminController@categoryStore, PUT /categories/{category} -> AdminController@categoryUpdate, POST /categories/{category}/toggle-status -> AdminController@categoryToggleStatus, DELETE /categories/{category} -> AdminController@categoryDestroy, GET /orders -> AdminController@orders, GET /orders/{order} -> AdminController@orderShow
- backend/routes/api.php: GET /categories -> CategoryController@index, GET /products -> ProductController@index, GET /products/{product} -> ProductController@show, POST /quote-requests -> QuoteRequestController@store, GET /push-public-key -> ChatController@publicKey, POST /register -> AuthController@register, POST /login -> AuthController@login, GET /me -> AuthController@me, PUT /me -> AuthController@update, GET /addresses -> AddressController@index, POST /addresses -> AddressController@store, PUT /addresses/{address} -> AddressController@update, DELETE /addresses/{address} -> AddressController@destroy, POST /logout -> AuthController@logout, GET /quote-requests -> ChatController@quotes, GET /quote-requests/{quote}/messages -> ChatController@messages, POST /quote-requests/{quote}/messages -> ChatController@sendCustomerMessage, POST /push-subscriptions -> ChatController@storeSubscription, DELETE /push-subscriptions -> ChatController@removeSubscription, GET / -> CartController@show

### Frontend routes
- backend/routes/api.php
- backend/routes/console.php
- backend/routes/web.php

### Styles
- style.css
- about.css
- backend/resources/css/app.css

### Node routes
- app.js

### Controllers
- backend/app/Http/Controllers/AdminController.php

### Laravel routes
- backend/routes/web.php
- backend/routes/api.php
- backend/routes/console.php

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
- backend/storage/framework/views/02b9944c8843cd98e89334f3cb1f9254.php
- backend/storage/framework/views/0928fb5822a3239c8f2db0e055188ed1.php
- backend/storage/framework/views/0b2cf5cab225a7f713d96d8a8e92a4b3.php
- backend/storage/framework/views/11148b2e82bece1dbec889d572023f5a.php
- backend/storage/framework/views/13d2095750205f838696e5d5c1a09129.php
- backend/storage/framework/views/1574c57f9e95e7af9736fc760d72563d.php
- backend/storage/framework/views/1830f01627c6d6586b8c495113dc1b90.php
- backend/storage/framework/views/1a23598da57f3e0374a84d95a1472ff3.php
- backend/storage/framework/views/1a58aa0419ec4a34ccdc36c9ea594f2c.php
- backend/storage/framework/views/1a905c6ea82d01050701107195df364f.php
- backend/storage/framework/views/1c2bf3d5f1a9cd4419713d5585de17ff.php
- backend/storage/framework/views/1caf62f5df0b05ebd30646e33f45eb63.php
- backend/storage/framework/views/1da06c2404e6ed730b63b1760d16dcc5.php
- backend/storage/framework/views/1de68017254406c30f1b58f490c00c5c.php
- backend/storage/framework/views/1e3d8f4e594692171c53b13e6be38ce2.php
- backend/storage/framework/views/208f562d90aa982e0b900d23637ce85a.php
- backend/storage/framework/views/24bf1a348426929388b2430b0f3e8c40.php
- backend/storage/framework/views/27609c96b44f767ded16ad95618b55ff.php
- backend/storage/framework/views/28f99876d17af2e03841fb9d086e07bb.php
- backend/storage/framework/views/2a414c322e33abb41d452d94a1ec73cd.php
- backend/storage/framework/views/328ebef42bae64bc7a9cc0879d0133a5.php
- backend/storage/framework/views/3317c936daeb3476ba4818a5bd506c51.php
- backend/storage/framework/views/378ab2723e097edb99d2b5def0c89961.php
- backend/storage/framework/views/3b69f945511b636817d7dc2f87e00c4e.php
- backend/storage/framework/views/3b86505d02814ce0f21725ffc3cb0e19.php
- backend/storage/framework/views/423c3d2da2ae0f2757126345eba28c7f.php
- backend/storage/framework/views/432afa49fe9a1fec0ea43d2a154a9841.php
- backend/storage/framework/views/44b28cafe25ad757f6f217ecfb0aba9a.php
- backend/storage/framework/views/4623bff2d104fe68406d2ff96cfbc6eb.php
- backend/storage/framework/views/47e21b5693227bd3ee50d18066190fe8.php
- backend/storage/framework/views/487b45b50652ea97e3b274a625144ee7.php
- backend/storage/framework/views/48d1aacf3dfc7d7c6612af0d8409729b.php
- backend/storage/framework/views/495de4a66293280914051882d97f48f3.php
- backend/storage/framework/views/49fd557b5ba7e5da686be46ae23f4746.php
- backend/storage/framework/views/4aebf8c18bd41b72aab1f2094fb1cc6f.php
- backend/storage/framework/views/4b0902f077209835925c117de0a3cd76.php
- backend/storage/framework/views/4c35aa86447ad85e4ca56f1a2c1f9678.php
- backend/storage/framework/views/4e2121d73601686168e63d0e2dc07617.php
- backend/storage/framework/views/50b94597878eecc5cf4d3ed244d33c74.php
- backend/storage/framework/views/510428a8865d8436cbbfb7d1b55c0036.php
- backend/storage/framework/views/52203cf1585af94c0aefae2d6e2cf89b.php
- backend/storage/framework/views/58f1b281f838dd5875cba590befef95e.php
- backend/storage/framework/views/5939c63391ccfee94e2b5bf8ea786251.php
- backend/storage/framework/views/5a90662446713084a46dfbdab672322c.php
- backend/storage/framework/views/5af3cf9f05e8264a48a8f3d3fa8c460c.php
- backend/storage/framework/views/61494e460350dc091c543bcf61d6fedd.php

## Additional indexed files
- backend/storage/framework/views/635d5f25ff9c355d666bd2691c0967a9.php
- backend/storage/framework/views/652463ae1df8400f6d66ab8f5d20b021.php
- backend/storage/framework/views/669fe6665a3adbb53e367a6201d150b9.php
- backend/storage/framework/views/675e8aea05ce50e1df7a32f646a65a5d.php
- backend/storage/framework/views/6a25095bea80b79cf9fda46669fe0ba7.php
- backend/storage/framework/views/6c9e1581b94caa25895974e2299017bf.php
- backend/storage/framework/views/6cb6d15dba8aa555636d12e016230786.php
- backend/storage/framework/views/6e796f46c045457b30177c70cfe50bce.php
- backend/storage/framework/views/6fe493f9db5732265189d994cde082e2.php
- backend/storage/framework/views/7096d5f8be78469e6c2046a5b57cba8f.php
- backend/storage/framework/views/73815f46f556cae5027bba03c54da76b.php
- backend/storage/framework/views/73da3aa9a953a10a0404e218e6bd07d7.php
- backend/storage/framework/views/7587e061bc0ea6df0190449b990fe93e.php
- backend/storage/framework/views/76b3b8e08ee352d67ccdfc634a8d8506.php
- backend/storage/framework/views/78654d246752b8c1906824be2a858543.php
- backend/storage/framework/views/7d9856071126b398ac24b7528d507c51.php
- backend/storage/framework/views/7f790558232368023fe70554503b3afa.php
- backend/storage/framework/views/7f7dbe5accbb18425e324eb6ea47a50f.php
- backend/storage/framework/views/80bf1ebb18c1ead4685f7526d2ed9cc8.php
- backend/storage/framework/views/83612f0ae7837848f932e486d525b61e.php
- backend/storage/framework/views/851cd97e2e11b23bcbdaf777bfbb065b.php
- backend/storage/framework/views/87ca49812dbfd071680949c96fd00799.php
- backend/storage/framework/views/88f88258f10bdf33651acd3d1aca73c7.php
- backend/storage/framework/views/8c1103870c0d187c3f275bbdc415735a.php
- backend/storage/framework/views/8cf12ba4a71bbdb293b3ce9877c8296a.php
- backend/storage/framework/views/8e0b929b1cb429d7f57291d0e2c49e53.php
- backend/storage/framework/views/8fecfca98d0ffa4f32e7ffcc62ea95ca.php
- backend/storage/framework/views/90d474825c46938bb33acdc001db6618.php
- backend/storage/framework/views/9657dbc8c5000f2e60c327b9f8a1a00f.php
- backend/storage/framework/views/97a0ea06bf42311a8262b6f58b0ebc7b.php
- backend/storage/framework/views/9c64f5625fa09569908fbaf7ffea873b.php
- backend/storage/framework/views/9d055a3d61d2f6a8152837968524d9c2.php
- backend/storage/framework/views/a8a1638e4d412ec3419a6223f07bb7b4.php
- backend/storage/framework/views/aa3ea8baa1230266100318b7e73251a5.php
- backend/storage/framework/views/abf7f948554daf1e8052c73490d7ff8e.php
- backend/storage/framework/views/b1b4f7e95d78d1a5208f94318669acb1.php
- backend/storage/framework/views/b2236ddf00827fdb2a239b792fb62056.php
- backend/storage/framework/views/b57b6eabddc1c387b7ec53f9558d966a.php
- backend/storage/framework/views/b6201b0de225ba384dc6d943deb0d470.php
- backend/storage/framework/views/b6544dc10a7248879fa92e7d699e95d0.php
- backend/storage/framework/views/b7a3c84950f86d3349cb3f54fd2ed365.php
- backend/storage/framework/views/bb88c093a9622d9826f0d3e6d4c12812.php
- backend/storage/framework/views/bbfb4646f54ba6f8bcc72346b9f211dc.php
- backend/storage/framework/views/bd3578e43fa9d86c5ecd708b2211eae1.php
- backend/storage/framework/views/bd6a00896219da3f8c4d4cd64d536bbf.php
- backend/storage/framework/views/be18f676acadb93195e94fc1c7e167ad.php
- backend/storage/framework/views/bfc84a7523c74f58c8bbef38bec8724f.php
- backend/storage/framework/views/c01e953cb3b5636a72636f79091b5cb6.php
- backend/storage/framework/views/c03496948391050cb2d81bf9cbd22374.php
- backend/storage/framework/views/c0bdfe2bf09c73ccd90f0e9ccb52294b.php
- backend/storage/framework/views/c1e622462e69b94b97c4b307a234354d.php
- backend/storage/framework/views/c276f94b4a7e21788956a72fec64f363.php
- backend/storage/framework/views/c3e7b80d9a2dd4d204ef415087c77d53.php
- backend/storage/framework/views/c3ed71899afc3174d52b458b695e4943.php
- backend/storage/framework/views/c5963de98a15a2a0ed519b8398dc50ea.php
- backend/storage/framework/views/c99351e7bbc0f7cc32bfb47fe35df311.php
- backend/storage/framework/views/cabf2d6ee21bc15e8d9ea1fc2dc738ec.php
- backend/storage/framework/views/cc0b4c89ee54690ba656d0865c5cbe51.php
- backend/storage/framework/views/cf182aede846697d5791cf85ad8b592d.php
- backend/storage/framework/views/d2375a4e4d3936ddad027710f8d42ec8.php
- backend/storage/framework/views/d6f1b35c00a21161d583634f5b21f041.php
- backend/storage/framework/views/d9f8c25e27bcfb6fec3c6df62eea9390.php
- backend/storage/framework/views/dae7195eb38872859da3679cff746101.php
- backend/storage/framework/views/de5941d16e7ef9c948dc635229a3a871.php
- backend/storage/framework/views/e0e27de0398cb49cecb5e1fb0b39c9b8.php
- backend/storage/framework/views/e11571d55abbaef0aaf09163aca5c211.php
- backend/storage/framework/views/e313be07593c79214cf031dd29c3c8b1.php
- backend/storage/framework/views/e34a4d162d849061a7c46278479c4e48.php
- backend/storage/framework/views/e38466cdb68f099d17ca25ec2c930283.php
- backend/storage/framework/views/e3f455551f7b8fbce7fc0f3a4938483e.php
- backend/storage/framework/views/e5b46a301ba0978fe729b18713fdb17e.php
- backend/storage/framework/views/e728920bbad6edcb7748c2003865a353.php
- backend/storage/framework/views/e87570891bf6d771ec317b86a33a5997.php
- backend/storage/framework/views/eb6c38043a375573b2c86b36f7d5b757.php
- backend/storage/framework/views/ec98e3aa949b9e94495bd5f6755678a6.php
- backend/storage/framework/views/ecc930f0854ba19c44c196241f707527.php
- backend/storage/framework/views/efc5139705f06f795b068b6f58f22924.php
- backend/storage/framework/views/f0188108cd4c35d826ca6b494df65692.php
- backend/storage/framework/views/f596f92598d102cef08fd25f1d64fdd4.php
- backend/storage/framework/views/f7d071c065fec0ed5e8731fa8b0bbeb1.php
- backend/storage/framework/views/f87712d39bbd86decaed3ffb7a8507f0.php
- backend/storage/framework/views/f98eeff5cd99201089ba5b02a828e213.php
- backend/storage/framework/views/fc6c51819b47f93467bfa98bd75021f7.php
- backend/storage/framework/views/fd879d14bc66840518b588ed52bfb51d.php
- style.css
- .clinerules/05-technomantra-execution-mode.md
- .clinerules/06-technomantra-developer-mode.md
- .clinerules/08-technomantra-task-watchdog.md
- .clinerules/09-technomantra-multitask-isolation.md

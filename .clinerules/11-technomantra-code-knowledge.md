# Technomantra Local Code Knowledge Graph (V4.8.14)

> Structural local index. Read current source before editing. Secrets are intentionally excluded.

- Indexed source files: 121
- Structural edges: 72
- Matched end-to-end flows: 0
- Updated: 2026-10-19T10:12:20.670Z

## Routes
- ROUTE GET /api/categories -> CategoryController@index @ backend/routes/api.php
- ROUTE GET /api/products -> ProductController@index @ backend/routes/api.php
- ROUTE GET /api/products/{product} -> ProductController@show @ backend/routes/api.php
- ROUTE POST /api/quote-requests -> QuoteRequestController@store @ backend/routes/api.php
- ROUTE GET /api/push-public-key -> ChatController@publicKey @ backend/routes/api.php
- ROUTE POST /api/guest-chat/start -> ChatController@startGuestChat @ backend/routes/api.php
- ROUTE GET /api/guest-chat/{quote}/messages -> ChatController@guestMessages @ backend/routes/api.php
- ROUTE POST /api/guest-chat/{quote}/messages -> ChatController@sendGuestMessage @ backend/routes/api.php
- ROUTE POST /api/register -> AuthController@register @ backend/routes/api.php
- ROUTE POST /api/login -> AuthController@login @ backend/routes/api.php
- ROUTE GET /api/me -> AuthController@me @ backend/routes/api.php
- ROUTE PUT /api/me -> AuthController@update @ backend/routes/api.php
- ROUTE GET /api/addresses -> AddressController@index @ backend/routes/api.php
- ROUTE POST /api/addresses -> AddressController@store @ backend/routes/api.php
- ROUTE PUT /api/addresses/{address} -> AddressController@update @ backend/routes/api.php
- ROUTE DELETE /api/addresses/{address} -> AddressController@destroy @ backend/routes/api.php
- ROUTE POST /api/logout -> AuthController@logout @ backend/routes/api.php
- ROUTE GET /api/quote-requests -> ChatController@quotes @ backend/routes/api.php
- ROUTE GET /login -> AdminController@loginForm @ backend/routes/web.php
- ROUTE POST /login -> AdminController@login @ backend/routes/web.php
- ROUTE GET / -> AdminController@dashboard @ backend/routes/web.php
- ROUTE POST /logout -> AdminController@logout @ backend/routes/web.php
- ROUTE GET /products -> AdminController@products @ backend/routes/web.php
- ROUTE GET /products/create -> AdminController@productCreate @ backend/routes/web.php
- ROUTE POST /products -> AdminController@productStore @ backend/routes/web.php
- ROUTE GET /products/{product}/edit -> AdminController@productEdit @ backend/routes/web.php
- ROUTE PUT /products/{product} -> AdminController@productUpdate @ backend/routes/web.php
- ROUTE POST /products/{product}/toggle-status -> AdminController@productToggleStatus @ backend/routes/web.php
- ROUTE DELETE /products/{product} -> AdminController@productDestroy @ backend/routes/web.php
- ROUTE GET /categories -> AdminController@categories @ backend/routes/web.php
- ROUTE GET /categories/create -> AdminController@categoryCreate @ backend/routes/web.php
- ROUTE GET /categories/{category}/edit -> AdminController@categoryEdit @ backend/routes/web.php
- ROUTE POST /categories -> AdminController@categoryStore @ backend/routes/web.php
- ROUTE PUT /categories/{category} -> AdminController@categoryUpdate @ backend/routes/web.php
- ROUTE POST /categories/{category}/toggle-status -> AdminController@categoryToggleStatus @ backend/routes/web.php
- ROUTE DELETE /categories/{category} -> AdminController@categoryDestroy @ backend/routes/web.php

## Frontend API calls
- API GET /${KEYAN_API_URL}${path} <- app.js
- API GET /header.html <- app.js
- API GET /footer.html <- app.js

## Dependency edges
- IMPORT index.html -> style.css, app.js
- IMPORT about.html -> style.css, about.css, app.js, about.js
- IMPORT backend/resources/js/app.js -> backend/resources/js/bootstrap.js
- IMPORT cart.html -> style.css, categories.css, cart.css, app.js, cart.js
- IMPORT categories.html -> style.css, about.css, categories.css, app.js, categories.js
- IMPORT checkout.html -> style.css, categories.css, checkout.css, app.js, checkout.js
- IMPORT contact.html -> style.css, contact.css, app.js, contact.js
- IMPORT customer-portal.html -> style.css, customer-portal.css, app.js, customer-portal.js
- IMPORT guest-chat.html -> style.css, guest-chat.css, app.js, guest-chat.js
- IMPORT industries.html -> style.css, industries.css, app.js, industries.js
- IMPORT login.html -> style.css, app.js
- IMPORT product-detail.html -> style.css, categories.css, product-detail.css, app.js, product-detail.js
- IMPORT products.html -> style.css, categories.css, products.css, app.js, products.js
- LARAVEL backend/app/Services/QuoteChatCleanupService.php -> app/Models/QuoteRequest.php
- LARAVEL backend/app/Services/PushNotificationService.php -> app/Models/PushSubscription.php, app/Models/User.php
- LARAVEL backend/app/Http/Controllers/AdminController.php -> app/Models/Category.php, app/Models/Order.php, app/Models/Product.php, app/Models/QuoteRequest.php, app/Models/PushSubscription.php, app/Models/QuoteMessage.php, app/Models/User.php, app/Services/QuoteChatCleanupService.php, FormRequest QuoteRequest
- LARAVEL backend/app/Http/Controllers/Api/QuoteRequestController.php -> app/Http/Resources/QuoteRequestResource.php, app/Models/Product.php, app/Models/QuoteRequest.php, app/Models/User.php, app/Services/PushNotificationService.php
- LARAVEL backend/app/Http/Controllers/Api/ProductController.php -> app/Http/Resources/ProductResource.php, app/Models/Product.php
- LARAVEL backend/app/Http/Controllers/Api/OrderController.php -> app/Models/Address.php, app/Models/Order.php, app/Models/Product.php
- LARAVEL backend/app/Http/Controllers/Api/ChatController.php -> app/Models/PushSubscription.php, app/Models/QuoteMessage.php, app/Models/QuoteRequest.php, app/Models/User.php, app/Services/QuoteChatCleanupService.php, app/Services/PushNotificationService.php, FormRequest QuoteRequest
- LARAVEL backend/app/Http/Controllers/Api/CategoryController.php -> app/Http/Resources/CategoryResource.php, app/Models/Category.php
- LARAVEL backend/app/Http/Controllers/Api/CartController.php -> app/Http/Resources/ProductResource.php, app/Models/Cart.php, app/Models/Product.php
- LARAVEL backend/app/Http/Controllers/Api/AuthController.php -> app/Models/User.php
- LARAVEL backend/app/Http/Controllers/Api/AddressController.php -> app/Models/Address.php

## Database references
- DB backend/vite.config.js -> vite, laravel
- DB app.js -> an, the, basket
- DB backend/resources/js/bootstrap.js -> axios
- DB cart.js -> Cart
- DB categories.js -> single
- DB product-detail.js -> the, Line, Contact
- DB products.js -> Counter

## Schema shapes
- SCHEMA backend/database/migrations/0001_01_01_000000_create_users_table.php: table users; table password_reset_tokens; table sessions
- SCHEMA backend/database/migrations/0001_01_01_000001_create_cache_table.php: table cache; table cache_locks
- SCHEMA backend/database/migrations/0001_01_01_000002_create_jobs_table.php: table jobs; table job_batches; table failed_jobs
- SCHEMA backend/database/migrations/2019_12_14_000001_create_personal_access_tokens_table.php: table personal_access_tokens
- SCHEMA backend/database/migrations/2026_09_10_000001_create_categories_table.php: table categories
- SCHEMA backend/database/migrations/2026_09_10_000002_create_products_table.php: table products
- SCHEMA backend/database/migrations/2026_09_10_000003_create_quote_requests_table.php: table quote_requests
- SCHEMA backend/database/migrations/2026_09_10_000004_create_carts_table.php: table carts; table cart_items
- SCHEMA backend/database/migrations/2026_09_10_000005_create_orders_table.php: table orders; table order_items
- SCHEMA backend/database/migrations/2026_09_10_000007_create_addresses_table.php: table addresses
- SCHEMA backend/database/migrations/2026_09_17_000001_create_quote_messages_table.php: table quote_messages
- SCHEMA backend/database/migrations/2026_09_17_000002_create_push_subscriptions_table.php: table push_subscriptions

## Symbols
- SYMBOL backend/resources/views/admin/categories/form.blade.php: categoryImageUrl, refreshCategoryPreview
- SYMBOL backend/resources/views/admin/products/form.blade.php: refreshImagePreview, addSpecificationRow, escapeSpecificationValue, syncSpecifications, syncQuoteOnlyAvailability, updateStatusCardStyles
- SYMBOL about.js: initEcosystemTabs, initDnaPanels, initTimelineScroll, initSmoothScroll
- SYMBOL app.js: isCustomerAuthenticated, isProductQuoteOnly, requireCustomerAuth, saveCartToStorage, updateCartBadgeCount, syncCatalogFromBackend, initUniversalMotion, initScrollReveal, renderFeaturedProducts, handleBuyNow
- SYMBOL backend/app/Http/Controllers/AdminController.php: AdminController, loginForm, login, logout, dashboard, products, productCreate, productStore, productEdit, productUpdate
- SYMBOL backend/app/Http/Controllers/Api/AddressController.php: AddressController, index, store, update, destroy, validatedData, makeDefaultIfFirst
- SYMBOL backend/app/Http/Controllers/Api/AuthController.php: AuthController, register, login, me, update, logout, tokenResponse
- SYMBOL backend/app/Http/Controllers/Api/CartController.php: CartController, show, add, update, remove, resolveCart, cartPayload, isQuoteOnly
- SYMBOL backend/app/Http/Controllers/Api/CategoryController.php: CategoryController, index
- SYMBOL backend/app/Http/Controllers/Api/ChatController.php: ChatController, quotes, messages, sendCustomerMessage, publicKey, startGuestChat, guestMessages, sendGuestMessage, storeSubscription, removeSubscription
- SYMBOL backend/app/Http/Controllers/Api/OrderController.php: OrderController, store, formatAddress
- SYMBOL backend/app/Http/Controllers/Api/ProductController.php: ProductController, index, show
- SYMBOL backend/app/Http/Controllers/Api/QuoteRequestController.php: QuoteRequestController, store
- SYMBOL backend/app/Http/Controllers/Controller.php: Controller
- SYMBOL backend/app/Http/Middleware/AdminMiddleware.php: AdminMiddleware, handle
- SYMBOL backend/app/Http/Resources/CategoryResource.php: CategoryResource, toArray
- SYMBOL backend/app/Http/Resources/ProductResource.php: ProductResource, toArray, imageUrl
- SYMBOL backend/app/Http/Resources/QuoteRequestResource.php: QuoteRequestResource, toArray
- SYMBOL backend/app/Models/Address.php: Address, casts, user
- SYMBOL backend/app/Models/Cart.php: Cart, user, items
- SYMBOL backend/app/Models/CartItem.php: CartItem, casts, cart, product
- SYMBOL backend/app/Models/Category.php: Category, casts, products
- SYMBOL backend/app/Models/Order.php: Order, casts, user, items
- SYMBOL backend/app/Models/OrderItem.php: OrderItem, casts, order, product
- SYMBOL backend/app/Models/Product.php: Product, casts, category, quoteRequests, cartItems
- SYMBOL backend/app/Models/PushSubscription.php: PushSubscription, casts, user
- SYMBOL backend/app/Models/QuoteMessage.php: QuoteMessage, casts, quoteRequest, sender
- SYMBOL backend/app/Models/QuoteRequest.php: QuoteRequest, casts, product, user, messages
- SYMBOL backend/app/Models/User.php: User, casts, quoteRequests, carts, orders, addresses, quoteMessages, pushSubscriptions
- SYMBOL backend/app/Providers/AppServiceProvider.php: AppServiceProvider, register, boot
- SYMBOL backend/app/Services/PushNotificationService.php: PushNotificationService, sendToUser
- SYMBOL backend/app/Services/QuoteChatCleanupService.php: QuoteChatCleanupService, purgeInactive
- SYMBOL backend/database/factories/UserFactory.php: UserFactory, definition, unverified
- SYMBOL backend/database/migrations/0001_01_01_000000_create_users_table.php: extends, up, down
- SYMBOL backend/database/migrations/0001_01_01_000001_create_cache_table.php: extends, up, down
- SYMBOL backend/database/migrations/0001_01_01_000002_create_jobs_table.php: extends, up, down

## Safe configuration variable names
- CONFIG backend/config/cache.php: DB_CACHE_CONNECTION, DB_CACHE_TABLE, DB_CACHE_LOCK_CONNECTION, DB_CACHE_LOCK_TABLE, REDIS_CACHE_CONNECTION, REDIS_CACHE_LOCK_CONNECTION
- CONFIG backend/config/database.php: DB_CONNECTION, DB_URL, DB_DATABASE, DB_FOREIGN_KEYS, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_SOCKET, DB_CHARSET, DB_COLLATION, MYSQL_ATTR_SSL_CA, DB_SSLMODE, DB_ENCRYPT
- CONFIG backend/config/queue.php: DB_QUEUE_CONNECTION, DB_QUEUE_TABLE, DB_QUEUE, DB_QUEUE_RETRY_AFTER, REDIS_QUEUE_CONNECTION, REDIS_QUEUE, REDIS_QUEUE_RETRY_AFTER, DB_CONNECTION

## UI/style selectors
- UI index.html: #header-container, #mobileNavBackdrop, #mobileNavDrawer, #nav-mob-home, #nav-mob-about, #nav-mob-categories, #nav-mob-products, #nav-mob-industries, #nav-mob-contact, #headerSearchInput, #cartHeaderBadge, #mobileNavBtn, #nav-link-home, #nav-link-about
- UI style.css: #F47B20, #FFFFFF, #F4F8FA, #DCE6EB, #D8630B, .container, .section-padding, .bg-soft-section, .text-orange, .btn, .btn-orange, .btn-navy, .btn-outline-navy, .top-utility-bar
- UI about.css: #FF7A18, #E06305, #FFFFFF, #A0C0D0, #F3F7F9, #DCEAF1, .about-page-wrapper, .tech-tag, .dot, .about-section-header, .about-display-title, .highlight-orange, .about-section-desc, .about-hero
- UI about.html: #header-container, #mobileNavBackdrop, #mobileNavDrawer, #nav-mob-home, #nav-mob-about, #nav-mob-categories, #nav-mob-products, #nav-mob-industries, #nav-mob-contact, #headerSearchInput, #cartHeaderBadge, #mobileNavBtn, #nav-link-home, #nav-link-about
- UI cart.css: #FF7A18, #E06305, #F8FAFC, #F1F5F9, #E2E8F0, .cart-page-body, #FFFFFF, .cart-hero-section, .cart-hero-title, .cart-hero-sub, .cart-main-section, .cart-grid, .cart-items-card, .cart-items-header
- UI cart.html: #header-container, #mobileNavBackdrop, #mobileNavDrawer, #nav-mob-home, #nav-mob-about, #nav-mob-categories, #nav-mob-products, #nav-mob-industries, #nav-mob-contact, #headerSearchInput, #cartHeaderBadge, #mobileNavBtn, #nav-link-home, #nav-link-about
- UI categories.css: #FF7A18, #F47B20, #F3F7F9, #EBF2F5, #FFFFFF, #E06305, #DCEAF1, .cat-page-body, .cat-hud-badge, .dot, .cat-display-title, .cat-hero-section, .cat-hero-bg, .cat-hero-overlay
- UI categories.html: #header-container, #mobileNavBackdrop, #mobileNavDrawer, #nav-mob-home, #nav-mob-about, #nav-mob-categories, #nav-mob-products, #nav-mob-industries, #nav-mob-contact, #headerSearchInput, #cartHeaderBadge, #mobileNavBtn, #nav-link-home, #nav-link-about
- UI checkout.css: #FF7A18, #E06305, #F8FAFC, #E2E8F0, .chk-page-body, #FFFFFF, .chk-hero-section, .chk-hero-title, .chk-hero-sub, .chk-account-note, .chk-address-toggle, .chk-address-fields, .chk-main-section, .chk-grid
- UI checkout.html: #header-container, #mobileNavBackdrop, #mobileNavDrawer, #nav-mob-home, #nav-mob-about, #nav-mob-categories, #nav-mob-products, #nav-mob-industries, #nav-mob-contact, #headerSearchInput, #cartHeaderBadge, #mobileNavBtn, #nav-link-home, #nav-link-about
- UI contact.css: #FF7A18, #F8FAFC, .cnt-banner-section, .cnt-banner-wrapper, .cnt-banner-img, .cnt-stage-section, .cnt-stage-container, .cnt-main-card, #FFFFFF, #E2E8F0, .cnt-split-grid, .cnt-eyebrow, .cnt-left-title, .cnt-squiggly-svg
- UI contact.html: #header-container, #mobileNavBackdrop, #mobileNavDrawer, #nav-mob-home, #nav-mob-about, #nav-mob-categories, #nav-mob-products, #nav-mob-industries, #nav-mob-contact, #headerSearchInput, #cartHeaderBadge, #mobileNavBtn, #nav-link-home, #nav-link-about
- UI customer-portal.css: #f7fafc, #edf3f7, .portal-send-btn, #cbd7e2, #f47b2033, #ffd9b7, .muted, #fbfcfe, #ffd5b0, #d2dde7, #f47b2020, .no-requests, .customer-portal-header, .customer-portal-shell
- UI customer-portal.html: #header-container, #customerPushCard, #customerPushStatus, #enableCustomerPushButton, #requestCount, #conversationList, #conversationEmpty, #conversationView, #threadReference, #threadSubject, #threadProduct, #threadStatus, #threadMessages, #messageForm
- UI footer.html: .main-footer, .container, .footer-grid, .footer-col-brand, .header-brand, .header-logo, .brand-text-wrap, .brand-name, .brand-sub, .footer-tagline-quote, .fas, .fa-quote-left, .footer-col-heading, .footer-links-group
- UI guest-chat.css: #eef5f9, #f9fbfd, .guest-send-btn, #c9d7e4, #f47b2030, #dfe8f1, .guest-form-row, .guest-message-form, #cfdae6, #f47b2020, #fbfcfe, #ffd5b0, .guest-chat-grid
- UI guest-chat.html: #guestStartForm, #guestName, #guestEmail, #guestPhone, #guestInitialMessage, #guestThread, #guestReference, #guestStatus, #guestMessages, #guestMessageForm, #guestMessageInput, .guest-chat-body, .guest-chat-shell, .guest-chat-header
- UI header.html: #mobileNavBackdrop, #mobileNavDrawer, #nav-mob-home, #nav-mob-about, #nav-mob-categories, #nav-mob-products, #nav-mob-industries, #nav-mob-contact, #headerSearchInput, #cartHeaderBadge, #mobileNavBtn, #nav-link-home, #nav-link-about, #nav-link-categories
- UI industries.css: #FF7A18, #FFFFFF, .ind-hero-section, .ind-hero-container, .ind-hero-badge, .ind-hero-title, #FFA857, .ind-hero-subtitle, .ind-stats-grid, .ind-stat-card, .ind-stat-icon, .ind-stat-num, .ind-stat-label, .ind-filter-bar-section
- UI industries.html: #header-container, #mobileNavBackdrop, #mobileNavDrawer, #nav-mob-home, #nav-mob-about, #nav-mob-categories, #nav-mob-products, #nav-mob-industries, #nav-mob-contact, #headerSearchInput, #cartHeaderBadge, #mobileNavBtn, #nav-link-home, #nav-link-about

# Technomantra Local Code Knowledge Graph (V4.8.14)

> Structural local index. Read current source before editing. Secrets are intentionally excluded.

- Indexed source files: 37
- Structural edges: 45
- Matched end-to-end flows: 0
- Updated: 2026-09-17T08:34:07.894Z

## Routes
- ROUTE GET /api/categories -> CategoryController@index @ backend/routes/api.php
- ROUTE GET /api/products -> ProductController@index @ backend/routes/api.php
- ROUTE GET /api/products/{product} -> ProductController@show @ backend/routes/api.php
- ROUTE POST /api/quote-requests -> QuoteRequestController@store @ backend/routes/api.php
- ROUTE GET /api/push-public-key -> ChatController@publicKey @ backend/routes/api.php
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
- ROUTE GET /api/quote-requests/{quote}/messages -> ChatController@messages @ backend/routes/api.php
- ROUTE POST /api/quote-requests/{quote}/messages -> ChatController@sendCustomerMessage @ backend/routes/api.php
- ROUTE POST /api/push-subscriptions -> ChatController@storeSubscription @ backend/routes/api.php
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

## Database references
- DB backend/vite.config.js -> vite, laravel
- DB app.js -> an, the, basket

## Symbols
- SYMBOL backend/resources/views/admin/categories/form.blade.php: categoryImageUrl, refreshCategoryPreview
- SYMBOL backend/resources/views/admin/products/form.blade.php: refreshImagePreview, addSpecificationRow, escapeSpecificationValue, syncSpecifications, syncQuoteOnlyAvailability
- SYMBOL about.js: initEcosystemTabs, initDnaPanels, initTimelineScroll, initSmoothScroll
- SYMBOL app.js: isCustomerAuthenticated, isProductQuoteOnly, requireCustomerAuth, saveCartToStorage, updateCartBadgeCount, syncCatalogFromBackend, initUniversalMotion, initScrollReveal, renderFeaturedProducts, handleBuyNow
- SYMBOL backend/app/Http/Controllers/AdminController.php: AdminController, loginForm, login, logout, dashboard, products, productCreate, productStore, productEdit, productUpdate

## Safe configuration variable names
- CONFIG backend/config/cache.php: DB_CACHE_CONNECTION, DB_CACHE_TABLE, DB_CACHE_LOCK_CONNECTION, DB_CACHE_LOCK_TABLE, REDIS_CACHE_CONNECTION, REDIS_CACHE_LOCK_CONNECTION
- CONFIG backend/config/database.php: DB_CONNECTION, DB_URL, DB_DATABASE, DB_FOREIGN_KEYS, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_SOCKET, DB_CHARSET, DB_COLLATION, MYSQL_ATTR_SSL_CA, DB_SSLMODE, DB_ENCRYPT
- CONFIG backend/config/queue.php: DB_QUEUE_CONNECTION, DB_QUEUE_TABLE, DB_QUEUE, DB_QUEUE_RETRY_AFTER, REDIS_QUEUE_CONNECTION, REDIS_QUEUE, REDIS_QUEUE_RETRY_AFTER, DB_CONNECTION

## UI/style selectors
- UI index.html: #header-container, #mobileNavBackdrop, #mobileNavDrawer, #nav-mob-home, #nav-mob-about, #nav-mob-categories, #nav-mob-products, #nav-mob-industries, #nav-mob-contact, #headerSearchInput, #cartHeaderBadge, #mobileNavBtn, #nav-link-home, #nav-link-about
- UI style.css: #F47B20, #FFFFFF, #F4F8FA, #DCE6EB, #D8630B, .container, .section-padding, .bg-soft-section, .text-orange, .btn, .btn-orange, .btn-navy, .btn-outline-navy, .top-utility-bar
- UI about.css: #FF7A18, #E06305, #FFFFFF, #A0C0D0, #F3F7F9, #DCEAF1, .about-page-wrapper, .tech-tag, .dot, .about-section-header, .about-display-title, .highlight-orange, .about-section-desc, .about-hero
- UI about.html: #header-container, #mobileNavBackdrop, #mobileNavDrawer, #nav-mob-home, #nav-mob-about, #nav-mob-categories, #nav-mob-products, #nav-mob-industries, #nav-mob-contact, #headerSearchInput, #cartHeaderBadge, #mobileNavBtn, #nav-link-home, #nav-link-about

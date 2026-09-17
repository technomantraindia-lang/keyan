# Keyan Corporation API

Laravel 12 backend for the Keyan Corporation B2B marine, industrial, safety, and instrumentation catalogue.

## Local setup (XAMPP / phpMyAdmin)

1. Start Apache and MySQL in XAMPP.
2. Open `http://localhost/phpmyadmin` and confirm the `keyan_corporation` database exists. The database is already created by the project setup; migrations create all tables.
3. If your MySQL root account has a password, update `DB_PASSWORD` in `backend/.env`.
4. From this folder run:

```bash
php artisan migrate:fresh --seed
php artisan serve
```

The frontend and API are served together at `http://127.0.0.1:8000`. The frontend automatically uses the same origin for API requests.

## Admin panel

Open `http://127.0.0.1:8000/admin` to manage products, categories, orders, quote requests, and customer accounts.

The local seeded administrator is:

- Email: `admin@keyancorporation.com`
- Password: `admin123`

Change this password before deploying the application publicly.

## Customer conversations and mobile alerts

Quote requests from signed-in customers automatically become conversation threads. Customers use `customer-portal.html`; admins open a quote from Quote Requests or Requested Products and reply from the conversation panel.

To enable notifications when the admin website is closed:

1. Install dependencies with `composer install`.
2. Generate a VAPID key pair from the backend directory:

   `php -r "require 'vendor/autoload.php'; print_r(\Minishlink\WebPush\VAPID::createVapidKeys());"`

3. Put the returned public and private values in `.env` as `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY` (keep the private value secret), then run `php artisan config:clear`.
4. Run the migrations with `php artisan migrate`.

An admin enables alerts once from the yellow banner in the admin panel. The service worker then receives customer-message notifications and opens the exact quote thread when the notification is tapped. Browser push requires HTTPS in production; localhost is allowed for development.

## Main API routes

- `GET /api/health`
- `GET /api/categories`
- `GET /api/products?q=valve&category=marine-ship-supply&sort=price-asc`
- `GET /api/products/{catalog_id_or_sku}`
- `POST /api/quote-requests`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/cart`, `POST /api/cart/items`, `PATCH /api/cart/items/{item}`, `DELETE /api/cart/items/{item}`
- `POST /api/orders`

Authentication uses Laravel Sanctum bearer tokens. Guest carts use the `X-Cart-Token` header; pricing is always recalculated on the server when an order is created.

## Validation

```bash
php artisan test
```

@extends('admin.layout')
@section('title', 'Products')
@section('heading', 'Products')
@section('content')
@php($backendUrl = rtrim(request()->getSchemeAndHttpHost(), '/'))
<div class="page-actions">
    <div>
        <h2>Product catalogue</h2>
        <div class="muted">Manage all products. Publish products live on the storefront or save them in draft mode to keep them hidden from customers.</div>
    </div>
    <a class="btn" href="{{ route('admin.products.create') }}">+ Add product</a>
</div>

{{-- Quick Status Filter Pills --}}
<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
    <a href="{{ route('admin.products') }}" class="btn small {{ empty($filters['status']) ? '' : 'secondary' }}" style="{{ empty($filters['status']) ? 'background:var(--navy);color:#fff;' : '' }}">
        All Products ({{ $totalCount ?? $products->total() }})
    </a>
    <a href="{{ route('admin.products', array_merge($filters, ['status' => 'live'])) }}" class="btn small secondary" style="{{ ($filters['status'] ?? '') === 'live' ? 'background:#e2f6ed;border:1px solid #16845b;color:#12734f;font-weight:800;' : '' }}">
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#16845b;margin-right:4px;"></span>
        Live on Storefront ({{ $liveCount ?? 0 }})
    </a>
    <a href="{{ route('admin.products', array_merge($filters, ['status' => 'draft'])) }}" class="btn small secondary" style="{{ ($filters['status'] ?? '') === 'draft' ? 'background:#fff0df;border:1px solid #ff7a18;color:#b65708;font-weight:800;' : '' }}">
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#ff7a18;margin-right:4px;"></span>
        Draft Only (Hidden) ({{ $draftCount ?? 0 }})
    </a>
</div>

<div class="panel">
    <form method="GET" action="{{ route('admin.products') }}" class="filter-bar">
        <div class="field">
            <input type="text" name="search" value="{{ $filters['search'] ?? '' }}" placeholder="Search name, SKU, catalog ID, brand...">
        </div>
        <div class="field" style="max-width: 220px;">
            <select name="category_id" onchange="this.form.submit()">
                <option value="">All Categories</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}" @selected(($filters['category_id'] ?? '') == $category->id)>{{ $category->name }}</option>
                @endforeach
            </select>
        </div>
        <div class="field" style="max-width: 200px;">
            <select name="status" onchange="this.form.submit()">
                <option value="">All Statuses (Live & Draft)</option>
                <option value="live" @selected(($filters['status'] ?? '') === 'live' || ($filters['status'] ?? '') === 'active')>Live on Storefront</option>
                <option value="draft" @selected(($filters['status'] ?? '') === 'draft' || ($filters['status'] ?? '') === 'archived')>Draft (Hidden)</option>
            </select>
        </div>
        <div class="filter-actions">
            <button type="submit" class="btn small">Filter</button>
            @if(!empty($filters['search']) || !empty($filters['category_id']) || !empty($filters['status']))
                <a href="{{ route('admin.products') }}" class="btn small secondary">Reset</a>
            @endif
        </div>
    </form>
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Availability</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
@forelse($products as $product)
@php($imagePath = (string) ($product->image_path ?? ''))
@php($encodedImagePath = collect(explode('/', ltrim($imagePath, '/')))->map(fn ($segment) => rawurlencode($segment))->implode('/'))
@php($imageUrl = preg_match('/^https?:\/\//i', $imagePath) ? $imagePath : (preg_match('/^\/?storage\//i', $imagePath) ? $backendUrl.'/'.ltrim($imagePath, '/') : $backendUrl.'/product-assets/'.$encodedImagePath))
                <tr>
                    <td>
                        <div class="product-cell">
                            <div class="product-thumb {{ $imagePath ? '' : 'is-empty' }}">
                                <img src="{{ $imageUrl }}" alt="{{ $product->name }}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('is-empty')">
                                <span class="image-fallback">▣</span>
                            </div>
                            <div>
                                <strong>{{ $product->name }}</strong><br>
                                <span class="muted">{{ $product->brand ?: 'No brand' }} · {{ $product->catalog_id }}</span>
                            </div>
                        </div>
                    </td>
                    <td>{{ $product->category?->name ?: '—' }}</td>
                    <td><code>{{ $product->sku }}</code></td>
                    <td>
                        ${{ number_format((float)$product->price_usd, 2) }}
                        @if($product->is_quote_only)
                            <br><span class="badge orange">Quote only</span>
                        @endif
                    </td>
                    <td>
                        @if($product->is_active)
                            <span class="badge green" title="Live on frontend storefront" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
                                <span style="width:7px;height:7px;border-radius:50%;background:#16845b;display:inline-block;"></span> Live
                            </span>
                        @else
                            <span class="badge orange" title="Draft mode — hidden from customers on frontend" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
                                <span style="width:7px;height:7px;border-radius:50%;background:#e06d10;display:inline-block;"></span> Draft
                            </span>
                        @endif
                    </td>
                    <td>{{ $product->availability }}</td>
                    <td>
                        <div class="category-actions" style="display:flex;align-items:center;gap:6px;">
                            <a class="btn small secondary" href="{{ route('admin.products.edit', $product) }}">Edit</a>
                            
                            {{-- Fast 1-Click Draft / Live Toggle --}}
                            <form class="inline" method="POST" action="{{ route('admin.products.toggle-status', $product) }}">
                                @csrf
                                @if($product->is_active)
                                    <button class="btn small secondary" type="submit" title="Hide this product from the storefront and keep in Draft" style="color:#b65708;border:1px solid #ffd8af;background:#fff8f1;white-space:nowrap;">
                                        To Draft
                                    </button>
                                @else
                                    <button class="btn small" type="submit" title="Make this product Live on the customer storefront" style="background:#16845b;border:1px solid #16845b;color:#fff;white-space:nowrap;">
                                        Publish Live
                                    </button>
                                @endif
                            </form>

                            <form class="inline" method="POST" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('PERMANENTLY DELETE product &quot;{{ addslashes($product->name) }}&quot;? This action cannot be undone.')">
                                @csrf @method('DELETE')
                                <button class="btn small danger" type="submit">Delete</button>
                            </form>
                        </div>
                    </td>
                </tr>
@empty
                <tr><td colspan="7" class="empty">No products found matching the selected criteria.</td></tr>
@endforelse
            </tbody>
        </table>
    </div>
    {{ $products->links() }}
</div>
@endsection

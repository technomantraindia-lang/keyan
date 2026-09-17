@extends('admin.layout')
@section('title', 'Products')
@section('heading', 'Products')
@section('content')
@php($backendUrl = rtrim(env('APP_URL', 'http://127.0.0.1:8000'), '/'))
<div class="page-actions"><div><h2>Product catalogue</h2><div class="muted">Create, update, and archive products shown on the storefront.</div></div><a class="btn" href="{{ route('admin.products.create') }}">+ Add product</a></div>
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
        <div class="filter-actions">
            <button type="submit" class="btn small">Filter</button>
            @if(!empty($filters['search']) || !empty($filters['category_id']))
                <a href="{{ route('admin.products') }}" class="btn small secondary">Reset</a>
            @endif
        </div>
    </form>
    <div class="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>SKU</th><th>Price</th><th>Availability</th><th>Actions</th></tr></thead><tbody>
@forelse($products as $product)
@php($imagePath = (string) ($product->image_path ?? ''))
@php($encodedImagePath = collect(explode('/', ltrim($imagePath, '/')))->map(fn ($segment) => rawurlencode($segment))->implode('/'))
@php($imageUrl = preg_match('/^https?:\/\//i', $imagePath) ? $imagePath : (preg_match('/^\/?storage\//i', $imagePath) ? $backendUrl.'/'.ltrim($imagePath, '/') : $backendUrl.'/product-assets/'.$encodedImagePath))
<tr><td><div class="product-cell"><div class="product-thumb {{ $imagePath ? '' : 'is-empty' }}"><img src="{{ $imageUrl }}" alt="{{ $product->name }}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('is-empty')"><span class="image-fallback">▣</span></div><div><strong>{{ $product->name }}</strong><br><span class="muted">{{ $product->brand ?: 'No brand' }} · {{ $product->catalog_id }}</span></div></div></td><td>{{ $product->category?->name ?: '—' }}</td><td>{{ $product->sku }}</td><td>${{ number_format((float)$product->price_usd, 2) }} @if($product->is_quote_only)<br><span class="badge orange">Quote only</span>@endif</td><td>{{ $product->availability }}</td><td><div class="category-actions"><a class="btn small secondary" href="{{ route('admin.products.edit', $product) }}">Edit</a><form class="inline" method="POST" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('PERMANENTLY DELETE product &quot;{{ addslashes($product->name) }}&quot;? This action cannot be undone.')">@csrf @method('DELETE')<button class="btn small danger" type="submit">Delete</button></form></div></td></tr>
@empty
<tr><td colspan="6" class="empty">No products found matching the selected criteria.</td></tr>
@endforelse
</tbody></table></div>{{ $products->links() }}</div>
@endsection

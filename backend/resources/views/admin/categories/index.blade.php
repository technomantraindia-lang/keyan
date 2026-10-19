@extends('admin.layout')
@section('title', 'Categories')
@section('heading', 'Categories')
@section('content')
@php($backendUrl = rtrim(request()->getSchemeAndHttpHost(), '/'))
<div class="page-actions"><div><h2>Product categories</h2><div class="muted">Organise the catalogue and control category visibility.</div></div><a class="btn" href="{{ route('admin.categories.create') }}">+ Add category</a></div>
<div class="panel"><div class="panel-head"><h3>Existing categories</h3></div><div class="table-wrap"><table><thead><tr><th>Category</th><th>Products</th><th>Actions</th></tr></thead><tbody>
@forelse($categories as $category)
    @php($imagePath = (string) ($category->image_path ?? ''))
    @php($encodedImagePath = collect(explode('/', ltrim($imagePath, '/')))->map(fn ($segment) => rawurlencode($segment))->implode('/'))
    @php($imageUrl = preg_match('/^https?:\/\//i', $imagePath) ? $imagePath : (preg_match('/^\/?storage\//i', $imagePath) ? $backendUrl.'/'.ltrim($imagePath, '/') : $backendUrl.'/product-assets/'.$encodedImagePath))
    <tr><td><div class="category-cell"><div class="category-thumb {{ $imagePath ? '' : 'is-empty' }}"><img src="{{ $imageUrl }}" alt="{{ $category->name }}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('is-empty')"><span class="image-fallback">IMAGE</span></div><div><strong>{{ $category->name }}</strong><br><span class="muted">{{ $category->slug }}</span></div></div></td><td>{{ $category->products_count }}</td><td><div class="category-actions"><a class="btn small secondary" href="{{ route('admin.categories.edit', $category) }}">Edit</a><form class="inline" method="POST" action="{{ route('admin.categories.destroy', $category) }}" onsubmit="return confirm('PERMANENTLY DELETE category &quot;{{ addslashes($category->name) }}&quot;? This action cannot be undone.')">@csrf @method('DELETE')<button class="btn small danger" type="submit">Delete</button></form></div></td></tr>
@empty
    <tr><td colspan="3" class="empty">No categories found.</td></tr>
@endforelse
</tbody></table></div></div>
@endsection

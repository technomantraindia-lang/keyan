@extends('admin.layout')
@section('title', 'Requested Products')
@section('heading', 'Requested Products')
@section('content')
<div class="page-actions"><div><h2>Product request inbox</h2><div class="muted">Customers who requested products marked Available on Request.</div></div><a class="btn secondary" href="{{ route('admin.quotes') }}">All quote requests</a></div>
<div class="panel">
    <form method="GET" action="{{ route('admin.requested-products') }}" class="filter-bar"><div class="field"><input type="text" name="search" value="{{ $filters['search'] ?? '' }}" placeholder="Search product, catalog ID, customer, email..."></div><div class="filter-actions"><button type="submit" class="btn small">Search</button>@if(!empty($filters['search']))<a href="{{ route('admin.requested-products') }}" class="btn small secondary">Reset</a>@endif</div></form>
    <div class="table-wrap"><table><thead><tr><th>Requested product</th><th>Customer</th><th>Contact</th><th>Request</th><th>Status</th><th>Received</th><th>Conversation</th></tr></thead><tbody>
@forelse($requests as $request)
<tr class="{{ $request->unread_customer_messages_count ? 'has-unread-message' : '' }}">
    <td><a href="{{ route('admin.quotes.show', $request) }}"><strong>{{ $request->product?->name ?: 'Product request' }}</strong></a>@if($request->unread_customer_messages_count)<span class="new-message-pill">New {{ $request->unread_customer_messages_count }}</span>@endif<br><span class="muted">Catalog ID: {{ $request->product?->catalog_id ?: ($request->product_catalog_id ?: '—') }}</span><br><span class="badge orange">Available on Request</span></td>
    <td><strong>{{ trim($request->first_name.' '.$request->last_name) ?: ($request->user?->name ?: '—') }}</strong><br><span class="muted">{{ $request->company_name ?: ($request->user?->company_name ?: 'No company') }}</span></td>
    <td><a href="mailto:{{ $request->email }}">{{ $request->email }}</a><br><span class="muted">{{ $request->phone ?: ($request->user?->phone ?: '—') }}</span></td>
    <td><strong>{{ $request->reference }}</strong><br><span class="muted">{{ \Illuminate\Support\Str::limit($request->message, 100) }}</span></td>
    <td><span class="badge {{ $request->status === 'new' ? 'orange' : ($request->status === 'lost' ? 'red' : 'green') }}">{{ $request->status }}</span></td>
    <td>{{ $request->created_at->format('d M Y, H:i') }}</td>
    <td><a class="btn small secondary" href="{{ route('admin.quotes.show', $request) }}">Chat</a></td>
</tr>
@empty
<tr><td colspan="7" class="empty">No product requests found.</td></tr>
@endforelse
</tbody></table></div>{{ $requests->links() }}</div>
@endsection

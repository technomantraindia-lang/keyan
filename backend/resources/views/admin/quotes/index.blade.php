@extends('admin.layout')
@section('title', 'Quote requests')
@section('heading', 'Quote requests')
@section('content')
<div class="page-actions"><div><h2>Quote inbox</h2><div class="muted">Respond to enquiries from customers and vendors.</div></div></div>
<div class="panel">
    <form method="GET" action="{{ route('admin.quotes') }}" class="filter-bar">
        <div class="field">
            <input type="text" name="search" value="{{ $filters['search'] ?? '' }}" placeholder="Search ref, name, email, company, subject...">
        </div>
        <div class="field" style="max-width: 180px;">
            <select name="status" onchange="this.form.submit()">
                <option value="">All Statuses</option>
                <option value="new" @selected(($filters['status'] ?? '') === 'new')>New</option>
                <option value="contacted" @selected(($filters['status'] ?? '') === 'contacted')>Contacted</option>
                <option value="quoted" @selected(($filters['status'] ?? '') === 'quoted')>Quoted</option>
                <option value="won" @selected(($filters['status'] ?? '') === 'won')>Won</option>
                <option value="lost" @selected(($filters['status'] ?? '') === 'lost')>Lost</option>
                <option value="closed" @selected(($filters['status'] ?? '') === 'closed')>Closed</option>
            </select>
        </div>
        <div class="filter-actions">
            <button type="submit" class="btn small">Filter</button>
            @if(!empty($filters['search']) || !empty($filters['status']))
                <a href="{{ route('admin.quotes') }}" class="btn small secondary">Reset</a>
            @endif
        </div>
    </form>
    <div class="table-wrap"><table><thead><tr><th>Reference</th><th>Requester</th><th>Request</th><th>Product</th><th>Contact</th><th>Status</th><th>Update</th></tr></thead><tbody>
@forelse($quotes as $quote)
<tr class="{{ $quote->unread_customer_messages_count ? 'has-unread-message' : '' }}">
    <td><a href="{{ route('admin.quotes.show', $quote) }}"><strong>{{ $quote->reference }}</strong></a>@if($quote->unread_customer_messages_count)<span class="new-message-pill">New {{ $quote->unread_customer_messages_count }}</span>@endif<br><span class="muted">{{ $quote->created_at->format('d M Y, H:i') }}</span></td>
    <td>{{ trim($quote->first_name.' '.$quote->last_name) ?: '—' }}<br><span class="muted">{{ $quote->company_name ?: 'No company' }}</span></td>
    <td><strong>{{ $quote->subject }}</strong><br><span class="muted">{{ Str::limit($quote->message, 80) }}</span><br>@if($quote->quantity)<span class="muted">Qty: {{ $quote->quantity }}</span>@endif</td>
    <td>{{ $quote->product?->name ?: 'General enquiry' }}</td>
    <td><a href="mailto:{{ $quote->email }}">{{ $quote->email }}</a><br><span class="muted">{{ $quote->phone ?: '—' }}</span></td>
    <td><span class="badge {{ $quote->status === 'new' ? 'orange' : ($quote->status === 'lost' ? 'red' : 'green') }}">{{ $quote->status }}</span></td>
    <td><form method="POST" action="{{ route('admin.quotes.update', $quote) }}">@csrf @method('PATCH')<select name="status" onchange="this.form.submit()" style="border:1px solid #d5dde7;border-radius:6px;padding:7px;font:inherit"><option value="new" @selected($quote->status==='new')>New</option><option value="contacted" @selected($quote->status==='contacted')>Contacted</option><option value="quoted" @selected($quote->status==='quoted')>Quoted</option><option value="won" @selected($quote->status==='won')>Won</option><option value="lost" @selected($quote->status==='lost')>Lost</option><option value="closed" @selected($quote->status==='closed')>Closed</option></select></form></td>
</tr>
@empty
<tr><td colspan="7" class="empty">No quote requests found matching the selected criteria.</td></tr>
@endforelse
</tbody></table></div>{{ $quotes->links() }}</div>
@endsection

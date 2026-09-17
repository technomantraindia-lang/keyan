@extends('admin.layout')
@section('title', 'Orders')
@section('heading', 'Orders')
@section('content')
<div class="page-actions"><div><h2>Order management</h2><div class="muted">Review orders and move them through fulfilment.</div></div></div>
<div class="panel">
    <form method="GET" action="{{ route('admin.orders') }}" class="filter-bar">
        <div class="field">
            <input type="text" name="search" value="{{ $filters['search'] ?? '' }}" placeholder="Search order #, customer, email, phone...">
        </div>
        <div class="field" style="max-width: 180px;">
            <select name="status" onchange="this.form.submit()">
                <option value="">All Statuses</option>
                <option value="pending" @selected(($filters['status'] ?? '') === 'pending')>Pending</option>
                <option value="paid" @selected(($filters['status'] ?? '') === 'paid')>Paid</option>
                <option value="processing" @selected(($filters['status'] ?? '') === 'processing')>Processing</option>
                <option value="shipped" @selected(($filters['status'] ?? '') === 'shipped')>Shipped</option>
                <option value="completed" @selected(($filters['status'] ?? '') === 'completed')>Completed</option>
                <option value="cancelled" @selected(($filters['status'] ?? '') === 'cancelled')>Cancelled</option>
            </select>
        </div>
        <div class="field" style="max-width: 170px;">
            <select name="date" onchange="this.form.submit()">
                <option value="">All Dates</option>
                <option value="today" @selected(($filters['date'] ?? '') === 'today')>Today</option>
                <option value="week" @selected(($filters['date'] ?? '') === 'week')>Past 7 Days</option>
                <option value="month" @selected(($filters['date'] ?? '') === 'month')>Past 30 Days</option>
            </select>
        </div>
        <div class="filter-actions">
            <button type="submit" class="btn small">Filter</button>
            @if(!empty($filters['search']) || !empty($filters['status']) || !empty($filters['date']))
                <a href="{{ route('admin.orders') }}" class="btn small secondary">Reset</a>
            @endif
        </div>
    </form>
    <div class="table-wrap"><table><thead><tr><th>Order</th><th>Buyer</th><th>Delivery</th><th>Items</th><th>Total</th><th>Status</th><th>Update</th></tr></thead><tbody>
@forelse($orders as $order)
<tr><td><a href="{{ route('admin.orders.show', $order) }}"><strong>{{ $order->order_number }}</strong></a><br><span class="muted">{{ $order->created_at->format('d M Y, H:i') }}</span></td><td>{{ $order->full_name }}<br><span class="muted">{{ $order->email }}</span><br><span class="muted">{{ $order->company_name }}</span></td><td>{{ $order->delivery_port ?: '—' }}@if($order->vessel_name)<br><span class="muted">Vessel: {{ $order->vessel_name }}</span>@endif</td><td>{{ $order->items->sum('quantity') }} units<br><span class="muted">{{ $order->items->count() }} products</span></td><td><strong>${{ number_format((float)$order->total_usd, 2) }}</strong><br><span class="muted">{{ $order->payment_method }}</span></td><td><span class="badge {{ in_array($order->status,['completed','paid']) ? 'green' : ($order->status === 'cancelled' ? 'red' : 'orange') }}">{{ $order->status }}</span></td><td><form method="POST" action="{{ route('admin.orders.update', $order) }}">@csrf @method('PATCH')<select name="status" onchange="this.form.submit()" style="border:1px solid #d5dde7;border-radius:6px;padding:7px;font:inherit"><option value="pending" @selected($order->status==='pending')>Pending</option><option value="paid" @selected($order->status==='paid')>Paid</option><option value="processing" @selected($order->status==='processing')>Processing</option><option value="shipped" @selected($order->status==='shipped')>Shipped</option><option value="completed" @selected($order->status==='completed')>Completed</option><option value="cancelled" @selected($order->status==='cancelled')>Cancelled</option></select></form></td></tr>
@empty
<tr><td colspan="7" class="empty">No orders found matching the selected criteria.</td></tr>
@endforelse
</tbody></table></div>{{ $orders->links() }}</div>
@endsection

@extends('admin.layout')
@section('title', 'Customers')
@section('heading', 'Customers')
@section('content')
<div class="page-actions"><div><h2>Customer accounts</h2><div class="muted">View registered buyers and vendor accounts.</div></div></div>
<div class="panel">
    <form method="GET" action="{{ route('admin.customers') }}" class="filter-bar">
        <div class="field">
            <input type="text" name="search" value="{{ $filters['search'] ?? '' }}" placeholder="Search customer name, email, company, phone, gstin...">
        </div>
        <div class="field" style="max-width: 180px;">
            <select name="account_type" onchange="this.form.submit()">
                <option value="">All Account Types</option>
                <option value="customer" @selected(($filters['account_type'] ?? '') === 'customer')>Customer</option>
                <option value="vendor" @selected(($filters['account_type'] ?? '') === 'vendor')>Vendor</option>
            </select>
        </div>
        <div class="filter-actions">
            <button type="submit" class="btn small">Filter</button>
            @if(!empty($filters['search']) || !empty($filters['account_type']))
                <a href="{{ route('admin.customers') }}" class="btn small secondary">Reset</a>
            @endif
        </div>
    </form>
    <div class="table-wrap"><table><thead><tr><th>Customer</th><th>Company</th><th>Account type</th><th>Contact</th><th>Addresses</th><th>Orders</th><th>Joined</th></tr></thead><tbody>@forelse($customers as $customer)<tr><td><strong>{{ $customer->name }}</strong><br><span class="muted">{{ $customer->email }}</span></td><td>{{ $customer->company_name ?: '—' }}@if($customer->gstin)<br><span class="muted">GSTIN: {{ $customer->gstin }}</span>@endif</td><td><span class="badge">{{ $customer->account_type }}</span></td><td>{{ $customer->phone ?: '—' }}</td><td>{{ $customer->addresses->count() }}</td><td>{{ $customer->orders()->count() }}</td><td>{{ $customer->created_at->format('d M Y') }}</td></tr>@empty<tr><td colspan="7" class="empty">No customer accounts found matching the selected criteria.</td></tr>@endforelse</tbody></table></div>{{ $customers->links() }}</div>
@endsection

@extends('admin.layout')
@section('title', 'Quote '.$quote->reference)
@section('heading', 'Quote request details')
@section('content')
<div class="page-actions">
    <div><h2>{{ $quote->reference }}</h2><div class="muted">Received {{ $quote->created_at->format('d M Y, H:i') }}</div></div>
    <div class="detail-actions"><a class="btn secondary" href="{{ route('admin.quotes') }}">← Back to quotes</a><form method="POST" action="{{ route('admin.quotes.update', $quote) }}">@csrf @method('PATCH')<select name="status" onchange="this.form.submit()" aria-label="Update quote status"><option value="new" @selected($quote->status==='new')>New</option><option value="contacted" @selected($quote->status==='contacted')>Contacted</option><option value="quoted" @selected($quote->status==='quoted')>Quoted</option><option value="won" @selected($quote->status==='won')>Won</option><option value="lost" @selected($quote->status==='lost')>Lost</option><option value="closed" @selected($quote->status==='closed')>Closed</option></select></form></div>
</div>
<div class="detail-grid quote-detail-grid">
    <div class="panel detail-panel"><div class="panel-head"><h3>Requester details</h3><span class="badge {{ $quote->status === 'new' ? 'orange' : ($quote->status === 'lost' ? 'red' : 'green') }}">{{ $quote->status }}</span></div><div class="detail-body"><div class="detail-fields"><div><span class="detail-label">Name</span><strong>{{ trim($quote->first_name.' '.$quote->last_name) ?: '—' }}</strong></div><div><span class="detail-label">Company</span><strong>{{ $quote->company_name ?: '—' }}</strong></div><div><span class="detail-label">Email</span><a href="mailto:{{ $quote->email }}">{{ $quote->email }}</a></div><div><span class="detail-label">Phone</span><strong>{{ $quote->phone ?: '—' }}</strong></div><div><span class="detail-label">Source</span><strong>{{ $quote->source ?: 'Website' }}</strong></div><div><span class="detail-label">Quantity</span><strong>{{ $quote->quantity ?: 'Not specified' }}</strong></div></div></div></div>
    <div class="panel detail-panel"><div class="panel-head"><h3>Requested product</h3></div><div class="detail-body"><div class="detail-fields"><div><span class="detail-label">Subject</span><strong>{{ $quote->subject }}</strong></div><div><span class="detail-label">Product</span><strong>{{ $quote->product?->name ?: 'General enquiry' }}</strong></div>@if($quote->product)<div><span class="detail-label">SKU</span><strong>{{ $quote->product->sku }}</strong></div>@endif</div></div></div>
    <div class="panel detail-panel detail-message-panel chat-panel">
        <div class="panel-head"><div><h3>Conversation with customer</h3><span class="muted">Reply here and the customer will see it in their Message Center.</span></div><span class="badge green">{{ $quote->messages->count() }} messages</span></div>
        <div class="chat-thread">
            @if($quote->messages->isEmpty() && $quote->message)
                <div class="chat-bubble chat-bubble-customer"><div class="chat-meta"><strong>{{ trim($quote->first_name.' '.$quote->last_name) ?: ($quote->user?->name ?: 'Customer') }}</strong><span>{{ $quote->created_at->format('d M Y, H:i') }}</span></div><div>{{ $quote->message }}</div></div>
            @endif
            @forelse($quote->messages as $message)
                <div class="chat-bubble {{ $message->sender_role === 'admin' ? 'chat-bubble-admin' : 'chat-bubble-customer' }}">
                    <div class="chat-meta"><strong>{{ $message->sender_role === 'admin' ? 'You / Keyan' : ($message->sender?->name ?: 'Customer') }}</strong><span>{{ $message->created_at->format('d M Y, H:i') }}</span></div>
                    <div>{{ $message->body }}</div>
                </div>
            @empty
                <div class="chat-empty">No replies yet. Send the first message to this customer.</div>
            @endforelse
        </div>
        <form method="POST" action="{{ route('admin.quotes.messages.store', $quote) }}" class="chat-compose">
            @csrf
            <div class="field"><label for="quoteReply">Reply to {{ $quote->email }}</label><textarea id="quoteReply" name="body" required maxlength="10000" placeholder="Write a reply about price, availability, lead time or delivery..."></textarea></div>
            <button class="btn" type="submit"><span>Send reply</span> ↗</button>
        </form>
    </div>
    @if($quote->metadata)<div class="panel detail-panel"><div class="panel-head"><h3>Additional submitted data</h3></div><div class="detail-body"><pre class="metadata-block">{{ json_encode($quote->metadata, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) }}</pre></div></div>@endif
</div>
@endsection
@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.chat-compose');
    const textarea = document.getElementById('quoteReply');
    if (!form || !textarea) return;

    textarea.addEventListener('keydown', event => {
        if (event.key !== 'Enter' || event.shiftKey) return;
        event.preventDefault();
        if (textarea.value.trim()) form.requestSubmit();
    });
});
</script>
@endpush

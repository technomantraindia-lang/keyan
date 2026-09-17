@extends('admin.layout')
@section('title', 'Change Password')
@section('heading', 'Change Password')
@section('content')
<div class="page-actions">
    <div>
        <h2>Security settings</h2>
        <div class="muted">Update your administrator account password.</div>
    </div>
</div>

<div class="panel" style="max-width: 650px;">
    <div class="panel-head">
        <h3>Change administrator password</h3>
    </div>
    <div class="detail-body">
        <form method="POST" action="{{ route('admin.password.update') }}">
            @csrf
            @method('PUT')

            <div class="form-grid" style="grid-template-columns: 1fr;">
                <div class="field">
                    <label for="current_password">Current Password</label>
                    <input type="password" id="current_password" name="current_password" required autocomplete="current-password" placeholder="Enter your current password">
                    @error('current_password')
                        <span class="muted" style="color: var(--red); font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>

                <div class="field">
                    <label for="password">New Password</label>
                    <input type="password" id="password" name="password" required autocomplete="new-password" placeholder="Enter new password (minimum 8 characters)">
                    @error('password')
                        <span class="muted" style="color: var(--red); font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>

                <div class="field">
                    <label for="password_confirmation">Confirm New Password</label>
                    <input type="password" id="password_confirmation" name="password_confirmation" required autocomplete="new-password" placeholder="Re-enter new password">
                </div>
            </div>

            <div class="form-actions" style="margin-top: 24px;">
                <button type="submit" class="btn">Update Password</button>
                <a href="{{ route('admin.dashboard') }}" class="btn secondary">Cancel</a>
            </div>
        </form>
    </div>
</div>
@endsection

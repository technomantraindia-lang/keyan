<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('quotes:purge-inactive {--days=7}', function () {
    $days = max(1, (int) $this->option('days'));
    $deleted = app(\App\Services\QuoteChatCleanupService::class)->purgeInactive($days);

    $this->info("Deleted {$deleted} inactive quote chat(s) older than {$days} days.");
})->purpose('Delete quote request chats with no activity for the configured number of days');

Schedule::command('quotes:purge-inactive --days=7')->dailyAt('02:00');

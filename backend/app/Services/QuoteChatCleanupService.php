<?php

namespace App\Services;

use App\Models\QuoteRequest;

class QuoteChatCleanupService
{
    public function purgeInactive(int $days = 7): int
    {
        $cutoff = now()->subDays($days);
        $deleted = 0;

        QuoteRequest::query()
            ->where(function ($query) use ($cutoff) {
                $query
                    ->where(function ($query) use ($cutoff) {
                        $query->whereDoesntHave('messages')
                            ->where('created_at', '<=', $cutoff);
                    })
                    ->orWhere(function ($query) use ($cutoff) {
                        $query->whereHas('messages')
                            ->whereDoesntHave('messages', fn ($messages) => $messages->where('created_at', '>', $cutoff));
                    });
            })
            ->chunkById(100, function ($quotes) use (&$deleted) {
                foreach ($quotes as $quote) {
                    $quote->delete();
                    $deleted++;
                }
            });

        return $deleted;
    }
}

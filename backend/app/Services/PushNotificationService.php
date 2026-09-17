<?php

namespace App\Services;

use App\Models\PushSubscription;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class PushNotificationService
{
    public function sendToUser(User $user, string $title, string $body, string $url): void
    {
        $subscriptions = $user->pushSubscriptions()->get();
        if ($subscriptions->isEmpty() || ! class_exists('Minishlink\\WebPush\\WebPush')) {
            if ($subscriptions->isNotEmpty()) {
                Log::warning('Web push package is not installed; notification was stored but not delivered.');
            }
            return;
        }

        $auth = config('services.webpush');
        if (blank($auth['public_key']) || blank($auth['private_key']) || blank($auth['subject'])) {
            Log::warning('Web push is not configured. Add VAPID keys to the backend environment.');
            return;
        }

        $webPush = new \Minishlink\WebPush\WebPush([
            'VAPID' => [
                'subject' => $auth['subject'],
                'publicKey' => $auth['public_key'],
                'privateKey' => $auth['private_key'],
            ],
        ]);

        foreach ($subscriptions as $subscription) {
            try {
                $webPush->queueNotification(
                    \Minishlink\WebPush\Subscription::create([
                        'endpoint' => $subscription->endpoint,
                        'publicKey' => $subscription->public_key,
                        'authToken' => $subscription->auth_token,
                        'contentEncoding' => $subscription->content_encoding ?: 'aes128gcm',
                    ]),
                    json_encode(['title' => $title, 'body' => $body, 'url' => $url], JSON_THROW_ON_ERROR)
                );
            } catch (\Throwable $exception) {
                Log::warning('Could not queue web push notification.', ['message' => $exception->getMessage()]);
            }
        }

        foreach ($webPush->flush() as $report) {
            if ($report->isSuccess()) {
                continue;
            }

            $endpoint = (string) $report->getRequest()->getUri();
            if ($report->isSubscriptionExpired()) {
                PushSubscription::where('endpoint', $endpoint)->delete();
            }
            Log::warning('Web push delivery failed.', ['endpoint' => $endpoint]);
        }
    }
}

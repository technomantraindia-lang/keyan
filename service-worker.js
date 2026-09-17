/* Keyan background notification worker. It stays available after the admin tab closes. */
self.addEventListener('push', event => {
  let data = { title: 'Keyan Corporation', body: 'You have a new message.', url: '/admin' };
  try { data = { ...data, ...(event.data ? event.data.json() : {}) }; } catch (error) {}
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/iamges/image.png',
    badge: '/iamges/image.png',
    data: { url: data.url || '/admin' },
    tag: 'keyan-message',
    renotify: true
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || '/admin', self.location.origin).href;
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
    const existing = clients.find(client => 'focus' in client);
    return existing ? existing.navigate(target).then(client => client.focus()) : self.clients.openWindow(target);
  }));
});

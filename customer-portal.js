let customerQuotes = [];
let selectedQuoteId = null;
let lastMessagesSignature = '';

document.addEventListener('DOMContentLoaded', async () => {
  if (!localStorage.getItem('keyan_api_token') || typeof window.keyanApiRequest !== 'function') {
    window.location.href = 'login.html?return=customer-portal.html';
    return;
  }

  document.getElementById('messageForm')?.addEventListener('submit', sendMessage);
  document.getElementById('messageInput')?.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    document.getElementById('messageForm')?.requestSubmit();
  });
  document.getElementById('enableCustomerPushButton')?.addEventListener('click', enableCustomerPushNotifications);
  updateCustomerPushStatus();

  try {
    await loadQuotes();
  } catch (error) {
    if (error.status === 401) {
      localStorage.removeItem('keyan_api_token');
      window.location.href = 'login.html?return=customer-portal.html';
    }
  }

  setInterval(refreshOpenConversation, 8000);
  setInterval(() => loadQuotes({ preserveSelection: true, silent: true }), 30000);
});

async function loadQuotes(options = {}) {
  const payload = await window.keyanApiRequest('/quote-requests');
  customerQuotes = payload.data || [];
  document.getElementById('requestCount').textContent = customerQuotes.length;

  const list = document.getElementById('conversationList');
  if (!customerQuotes.length) {
    list.innerHTML = '<div class="no-requests">No quote requests yet.<br><br><a href="products.html" class="portal-send-btn">Browse products</a></div>';
    return;
  }

  list.innerHTML = customerQuotes.map(quote => `<article class="conversation-item ${quote.unread_messages_count ? 'has-new-message' : ''}" data-quote-id="${quote.id}" onclick="openConversation(${quote.id})"><div class="conversation-item-top"><span>${escapeHtml(quote.reference)}</span><span>${formatDate(quote.created_at)}</span></div><h3>${escapeHtml(quote.subject)}${quote.unread_messages_count ? `<span class="unread-label">New ${quote.unread_messages_count}</span>` : ''}</h3><p>${escapeHtml(quote.product?.name || 'General enquiry')}</p></article>`).join('');

  const requestedId = new URLSearchParams(window.location.search).get('quote');
  const preferredId = options.preserveSelection && selectedQuoteId ? selectedQuoteId : requestedId;
  const firstQuoteId = String(customerQuotes[0].id);
  const targetId = customerQuotes.some(quote => String(quote.id) === String(preferredId)) ? preferredId : firstQuoteId;
  openConversation(targetId, { silent: options.silent });
}

async function openConversation(id, options = {}) {
  selectedQuoteId = id;
  const quote = customerQuotes.find(item => String(item.id) === String(id));
  if (!quote) return;

  document.querySelectorAll('.conversation-item').forEach(item => item.classList.toggle('active', String(item.dataset.quoteId) === String(id)));
  const emptyState = document.getElementById('conversationEmpty');
  const chatView = document.getElementById('conversationView');
  emptyState.hidden = true;
  emptyState.style.display = 'none';
  chatView.hidden = false;
  chatView.style.display = 'flex';
  document.getElementById('threadReference').textContent = quote.reference;
  document.getElementById('threadSubject').textContent = quote.subject;
  document.getElementById('threadProduct').textContent = quote.product?.name || 'Website enquiry';
  document.getElementById('threadStatus').textContent = quote.status;

  if (!options.silent) {
    lastMessagesSignature = '';
    document.getElementById('threadMessages').innerHTML = '<div class="no-messages">Loading conversation...</div>';
  }

  await refreshOpenConversation({ force: !options.silent });
}

async function refreshOpenConversation(options = {}) {
  if (!selectedQuoteId) return;

  const quote = customerQuotes.find(item => String(item.id) === String(selectedQuoteId));
  const container = document.getElementById('threadMessages');

  try {
    const payload = await window.keyanApiRequest(`/quote-requests/${selectedQuoteId}/messages`);
    const messages = payload.data || [];
    const signature = messages.map(message => `${message.id}:${message.created_at}`).join('|');

    if (options.force || signature !== lastMessagesSignature) {
      renderMessages(messages);
      lastMessagesSignature = signature;
    }

    if (quote) quote.unread_messages_count = 0;
    const currentItem = document.querySelector(`.conversation-item[data-quote-id="${selectedQuoteId}"]`);
    currentItem?.classList.remove('has-new-message');
    currentItem?.querySelector('.unread-label')?.remove();
  } catch (error) {
    if (options.force) {
      container.innerHTML = `<div class="no-messages">${escapeHtml(error.message || 'Unable to load conversation.')}</div>`;
    }
  }
}

function renderMessages(messages) {
  const container = document.getElementById('threadMessages');
  container.innerHTML = messages.length
    ? messages.map(message => `<div class="thread-message ${message.sender_role}"><div class="thread-message-meta"><strong>${escapeHtml(message.sender_name)}</strong><span>${formatDate(message.created_at)}</span>${message.sender_role === 'customer' ? '<span class="message-ticks">Read</span>' : ''}</div>${escapeHtml(message.body)}</div>`).join('')
    : '<div class="no-messages">No replies yet. Send a message to the Keyan team.</div>';
  container.scrollTop = container.scrollHeight;
}

async function sendMessage(event) {
  event.preventDefault();
  if (!selectedQuoteId) return;

  const input = document.getElementById('messageInput');
  const button = event.target.querySelector('button');
  const body = input.value.trim();
  if (!body) return;

  button.disabled = true;
  try {
    await window.keyanApiRequest(`/quote-requests/${selectedQuoteId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ body })
    });
    input.value = '';
    await refreshOpenConversation({ force: true });
  } catch (error) {
    alert(error.message || 'Unable to send message.');
  } finally {
    button.disabled = false;
  }
}

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

async function updateCustomerPushStatus() {
  const button = document.getElementById('enableCustomerPushButton');
  const status = document.getElementById('customerPushStatus');
  const card = document.getElementById('customerPushCard');
  if (!button || !status || !card) return;

  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
    status.textContent = 'Push alerts are not supported in this browser';
    card.classList.add('warn');
    button.disabled = true;
    return;
  }

  if (Notification.permission === 'granted') {
    const registration = await navigator.serviceWorker.getRegistration('/').catch(() => null);
    const subscription = await registration?.pushManager.getSubscription();
    if (subscription) {
      status.textContent = 'Message alerts are enabled';
      card.classList.add('ready');
      button.textContent = 'Alerts enabled';
    }
  }
}

async function enableCustomerPushNotifications() {
  const button = document.getElementById('enableCustomerPushButton');
  const status = document.getElementById('customerPushStatus');
  const card = document.getElementById('customerPushCard');
  if (!button || !status || !card) return;

  const encodeKey = value => {
    const padding = '='.repeat((4 - value.length % 4) % 4);
    const raw = atob((value + padding).replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from([...raw].map(char => char.charCodeAt(0)));
  };

  button.disabled = true;
  card.classList.remove('ready', 'warn');

  try {
    const keyPayload = await window.keyanApiRequest('/push-public-key');
    if (!keyPayload.public_key) throw new Error('Add VAPID keys to enable device alerts.');

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') throw new Error('Notification permission was not granted.');

    const registration = await navigator.serviceWorker.register('/service-worker.js');
    let subscription = await registration.pushManager.getSubscription();
    subscription = subscription || await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: encodeKey(keyPayload.public_key)
    });

    await window.keyanApiRequest('/push-subscriptions', {
      method: 'POST',
      body: JSON.stringify(subscription.toJSON())
    });

    status.textContent = 'Message alerts are enabled';
    card.classList.add('ready');
    button.textContent = 'Alerts enabled';
  } catch (error) {
    status.textContent = error.message || 'Could not enable alerts';
    card.classList.add('warn');
  } finally {
    button.disabled = false;
  }
}

let guestChat = null;
let guestMessagesSignature = '';

document.addEventListener('DOMContentLoaded', () => {
  restoreGuestChat();
  document.getElementById('guestStartForm')?.addEventListener('submit', startGuestChat);
  document.getElementById('guestMessageForm')?.addEventListener('submit', sendGuestMessage);
  document.getElementById('guestMessageInput')?.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    document.getElementById('guestMessageForm')?.requestSubmit();
  });
  setInterval(refreshGuestMessages, 8000);
});

function restoreGuestChat() {
  try {
    guestChat = JSON.parse(localStorage.getItem('keyan_guest_chat') || 'null');
  } catch (error) {
    guestChat = null;
  }

  if (guestChat?.quote_id && guestChat?.guest_token) {
    showThread();
    refreshGuestMessages({ force: true });
  }
}

async function startGuestChat(event) {
  event.preventDefault();
  const button = event.target.querySelector('button');
  button.disabled = true;

  try {
    const payload = await window.keyanApiRequest('/guest-chat/start', {
      method: 'POST',
      body: JSON.stringify({
        name: document.getElementById('guestName').value.trim(),
        email: document.getElementById('guestEmail').value.trim(),
        phone: document.getElementById('guestPhone').value.trim(),
        message: document.getElementById('guestInitialMessage').value.trim()
      })
    });

    guestChat = {
      quote_id: payload.data.quote.id,
      guest_token: payload.data.guest_token,
      reference: payload.data.quote.reference,
      status: payload.data.quote.status
    };
    localStorage.setItem('keyan_guest_chat', JSON.stringify(guestChat));
    showThread();
    renderGuestMessages(payload.data.messages || []);
    event.target.reset();
  } catch (error) {
    alert(error.message || 'Unable to start chat.');
  } finally {
    button.disabled = false;
  }
}

function showThread() {
  document.getElementById('guestStartForm').hidden = true;
  document.getElementById('guestThread').hidden = false;
  document.getElementById('guestReference').textContent = guestChat.reference || '';
  document.getElementById('guestStatus').textContent = guestChat.status || 'new';
}

async function refreshGuestMessages(options = {}) {
  if (!guestChat?.quote_id || !guestChat?.guest_token) return;

  try {
    const payload = await window.keyanApiRequest(`/guest-chat/${guestChat.quote_id}/messages?guest_token=${encodeURIComponent(guestChat.guest_token)}`);
    guestChat.reference = payload.data.quote.reference;
    guestChat.status = payload.data.quote.status;
    localStorage.setItem('keyan_guest_chat', JSON.stringify(guestChat));
    showThread();

    const messages = payload.data.messages || [];
    const signature = messages.map(message => `${message.id}:${message.created_at}`).join('|');
    if (options.force || signature !== guestMessagesSignature) {
      renderGuestMessages(messages);
      guestMessagesSignature = signature;
    }
  } catch (error) {
    document.getElementById('guestMessages').innerHTML = `<div class="guest-empty">${escapeHtml(error.message || 'Unable to load chat.')}</div>`;
  }
}

async function sendGuestMessage(event) {
  event.preventDefault();
  if (!guestChat?.quote_id || !guestChat?.guest_token) return;

  const input = document.getElementById('guestMessageInput');
  const button = event.target.querySelector('button');
  const body = input.value.trim();
  if (!body) return;

  button.disabled = true;
  try {
    await window.keyanApiRequest(`/guest-chat/${guestChat.quote_id}/messages`, {
      method: 'POST',
      body: JSON.stringify({ body, guest_token: guestChat.guest_token })
    });
    input.value = '';
    await refreshGuestMessages({ force: true });
  } catch (error) {
    alert(error.message || 'Unable to send message.');
  } finally {
    button.disabled = false;
  }
}

function renderGuestMessages(messages) {
  const container = document.getElementById('guestMessages');
  container.innerHTML = messages.length
    ? messages.map(message => `<div class="guest-message ${message.sender_role}"><div class="guest-message-meta"><strong>${escapeHtml(message.sender_name)}</strong><span>${formatDate(message.created_at)}</span></div>${escapeHtml(message.body)}</div>`).join('')
    : '<div class="guest-empty">No messages yet.</div>';
  container.scrollTop = container.scrollHeight;
}

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

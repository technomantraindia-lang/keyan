/**
 * KEYAN CORPORATION — B2B CHECKOUT & ORDER CONFIRMATION LOGIC
 */

let selectedPaymentMethod = 'Proforma Invoice (Wire Transfer)';
let checkoutAddresses = [];

document.addEventListener('DOMContentLoaded', () => {
  if (!requireCustomerAuth('checkout.html')) return;
  renderCheckoutOrderReview();
  initPaymentOptionCards();
  loadCheckoutCustomer();
});

async function loadCheckoutCustomer() {
  try {
    const payload = await window.keyanApiRequest('/auth/me');
    const customer = payload.data || {};
    const fullName = document.getElementById('chkFullName');
    const company = document.getElementById('chkCompanyName');
    const email = document.getElementById('chkEmail');
    const phone = document.getElementById('chkPhone');
    if (fullName) fullName.value = customer.name || '';
    if (company) company.value = customer.company_name || '';
    if (email) email.value = customer.email || '';
    if (phone) phone.value = customer.phone || '';
    renderSavedAddresses(Array.isArray(customer.addresses) ? customer.addresses : []);
  } catch (error) {
    if (error.status === 401) {
      localStorage.removeItem('keyan_api_token');
      requireCustomerAuth('checkout.html');
    }
  }
}

function renderSavedAddresses(addresses) {
  checkoutAddresses = addresses;
  const select = document.getElementById('chkSavedAddress');
  const fields = document.getElementById('chkNewAddressFields');
  if (!select) return;

  select.innerHTML = '<option value="">Add a new delivery address</option>' + addresses.map(address => `
    <option value="${address.id}">${escapeCheckoutText(address.label)} — ${escapeCheckoutText(address.line1)}, ${escapeCheckoutText(address.city)}</option>
  `).join('');

  const defaultAddress = addresses.find(address => address.is_default) || addresses[0];
  if (defaultAddress) {
    select.value = String(defaultAddress.id);
    select.dataset.selectedAddressId = String(defaultAddress.id);
    if (fields) fields.hidden = true;
  } else if (fields) {
    fields.hidden = false;
    prefillNewAddress();
  }

  select.onchange = () => {
    select.dataset.selectedAddressId = select.value;
    if (fields) fields.hidden = !select.value;
    if (!select.value) prefillNewAddress();
  };

  document.getElementById('chkNewAddressToggle')?.addEventListener('click', () => {
    select.value = '';
    if (fields) fields.hidden = false;
    prefillNewAddress();
  });
}

function prefillNewAddress() {
  const name = document.getElementById('chkFullName')?.value || '';
  const recipient = document.getElementById('chkAddressRecipient');
  const label = document.getElementById('chkAddressLabel');
  const country = document.getElementById('chkAddressCountry');
  if (recipient && !recipient.value) recipient.value = name;
  if (label && !label.value) label.value = 'Primary address';
  if (country && !country.value) country.value = 'India';
}

function getCheckoutAddress() {
  const select = document.getElementById('chkSavedAddress');
  if (select?.value) return { address_id: Number(select.value) };

  const value = id => document.getElementById(id)?.value.trim() || '';
  const address = {
    label: value('chkAddressLabel'),
    recipient_name: value('chkAddressRecipient') || value('chkFullName'),
    company_name: value('chkCompanyName'),
    line1: value('chkAddressLine1'),
    line2: value('chkAddressLine2'),
    city: value('chkAddressCity'),
    state: value('chkAddressState'),
    postal_code: value('chkAddressPostal'),
    country: value('chkAddressCountry') || 'India',
    phone: value('chkPhone')
  };

  if (!address.label || !address.line1 || !address.city || !address.country) {
    showToast('Please complete the delivery address before placing the order.');
    return null;
  }
  return { address };
}

function formatCheckoutAddress(address) {
  return [address?.line1, address?.line2, address?.city, address?.state, address?.postal_code, address?.country].filter(Boolean).join(', ');
}

function escapeCheckoutText(value) {
  return String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character]));
}

function renderCheckoutOrderReview() {
  const container = document.getElementById('chkReviewItemsList');
  const subEl = document.getElementById('chkSubtotal');
  const shipEl = document.getElementById('chkShipping');
  const totalEl = document.getElementById('chkGrandTotal');
  if (!container) return;

  if (!cartBasket || cartBasket.length === 0) {
    container.innerHTML = `
      <p style="text-align:center; color:var(--chk-text-muted); padding: 2rem 0;">
        No items selected. <a href="products.html" style="color:var(--chk-orange); font-weight:700;">Return to Catalogue</a>
      </p>
    `;
    if (subEl) subEl.innerText = '$0.00 USD';
    if (shipEl) shipEl.innerText = '$0.00 USD';
    if (totalEl) totalEl.innerText = '$0.00';
    return;
  }

  const subtotal = cartBasket.reduce((sum, item) => sum + ((item.price_usd || 125.00) * item.qty), 0);
  const shipping = 45.00;
  const grandTotal = subtotal + shipping;

  container.innerHTML = cartBasket.map(item => `
    <div class="chk-review-item">
      <img src="${item.img || 'iamges/prod_gas_detector.jpg'}" alt="${item.name}">
      <div style="flex:1;">
        <h5 style="font-family:var(--font-heading); font-size:0.92rem; color:var(--chk-navy-darkest); margin-bottom:0.2rem;">${item.name}</h5>
        <span style="display:block; font-size:0.72rem; color:var(--chk-navy-mid); margin-bottom:0.15rem;">${item.categoryName || item.category || ''}${item.availability ? ` · ${item.availability}` : ''}</span>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--chk-navy-mid);">Qty: ${item.qty} × $${(item.price_usd || 125.00).toFixed(2)} USD</span>
      </div>
      <span style="font-family:var(--font-heading); font-size:0.95rem; font-weight:800; color:var(--chk-navy-darkest);">
        $${((item.price_usd || 125.00) * item.qty).toFixed(2)}
      </span>
    </div>
  `).join('');

  if (subEl) subEl.innerText = `$${subtotal.toFixed(2)} USD`;
  if (shipEl) shipEl.innerText = `$${shipping.toFixed(2)} USD`;
  if (totalEl) totalEl.innerText = `$${grandTotal.toFixed(2)}`;
}

function initPaymentOptionCards() {
  const cards = document.querySelectorAll('.chk-pay-option-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('.chk-pay-radio');
      if (radio) {
        radio.checked = true;
        selectedPaymentMethod = radio.value;
      }
    });
  });
}

async function handleCheckoutSubmit(event) {
  event.preventDefault();

  if (!requireCustomerAuth('checkout.html')) return;

  if (!cartBasket || cartBasket.length === 0) {
    showToast('Your cart is empty. Add products to proceed with order.');
    return;
  }

  const fullName = document.getElementById('chkFullName')?.value || 'Customer';
  const companyName = document.getElementById('chkCompanyName')?.value || 'Corporate Partner';
  const email = document.getElementById('chkEmail')?.value || 'sales@keyancorporation.com';
  const phone = document.getElementById('chkPhone')?.value || '';
  const address = getCheckoutAddress();
  if (!address) return;

  const submitButton = event.target.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;

  let backendOrder = null;
  if (typeof window.keyanApiRequest === 'function') {
    try {
      const payload = await window.keyanApiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify({
          full_name: fullName,
          company_name: companyName,
          email,
          phone,
          payment_method: selectedPaymentMethod,
          ...address,
          items: cartBasket.map(item => ({ product_id: item.id, quantity: item.qty }))
        })
      });
      backendOrder = payload.data;
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem('keyan_api_token');
        requireCustomerAuth('checkout.html');
        return;
      }
      showToast(error.message || 'Unable to create your order. Please try again.');
      if (submitButton) submitButton.disabled = false;
      return;
    }
  }

  const subtotal = cartBasket.reduce((sum, item) => sum + ((item.price_usd || 125.00) * item.qty), 0);
  const grandTotal = subtotal + 45.00;

  const orderRefNum = backendOrder?.order_number || ('KEY-ORD-2026-' + Math.floor(100000 + Math.random() * 900000));

  // Populate Modal
  const modal = document.getElementById('checkoutConfirmModal');
  const refEl = document.getElementById('confirmOrderRef');
  const compEl = document.getElementById('confirmCompany');
  const addressEl = document.getElementById('confirmVessel');
  const addressNameEl = document.getElementById('confirmPort');
  const totalEl = document.getElementById('confirmGrandTotal');
  const payEl = document.getElementById('confirmPaymentMethod');

  if (refEl) refEl.innerText = orderRefNum;
  if (compEl) compEl.innerText = companyName;
  const confirmationAddress = address.address || checkoutAddresses.find(item => String(item.id) === String(document.getElementById('chkSavedAddress')?.value));
  if (addressEl) addressEl.innerText = confirmationAddress ? formatCheckoutAddress(confirmationAddress) : 'Saved customer address';
  if (addressNameEl) addressNameEl.innerText = confirmationAddress?.label || 'Saved customer address';
  if (totalEl) totalEl.innerText = `$${grandTotal.toFixed(2)} USD`;
  if (payEl) payEl.innerText = selectedPaymentMethod;

  // Clear Cart
  cartBasket = [];
  saveCartToStorage();

  if (modal) modal.classList.add('active');
  if (submitButton) submitButton.disabled = false;
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutConfirmModal');
  if (modal) modal.classList.remove('active');
  window.location.href = 'index.html';
}

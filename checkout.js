/**
 * KEYAN CORPORATION — B2B CHECKOUT & ORDER CONFIRMATION LOGIC
 */

let selectedPaymentMethod = 'Proforma Invoice (Wire Transfer)';

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutOrderReview();
  initPaymentOptionCards();
});

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

function handleCheckoutSubmit(event) {
  event.preventDefault();

  if (!cartBasket || cartBasket.length === 0) {
    showToast('Your cart is empty. Add products to proceed with order.');
    return;
  }

  const fullName = document.getElementById('chkFullName')?.value || 'Customer';
  const companyName = document.getElementById('chkCompanyName')?.value || 'Corporate Partner';
  const vesselName = document.getElementById('chkVesselName')?.value || 'Vessel / Plant';
  const deliveryPort = document.getElementById('chkDeliveryPort')?.value || 'Bhavnagar / Alang Cluster';
  const email = document.getElementById('chkEmail')?.value || 'sales@keyancorporation.com';

  const subtotal = cartBasket.reduce((sum, item) => sum + ((item.price_usd || 125.00) * item.qty), 0);
  const grandTotal = subtotal + 45.00;

  const orderRefNum = 'KEY-ORD-2026-' + Math.floor(100000 + Math.random() * 900000);

  // Populate Modal
  const modal = document.getElementById('checkoutConfirmModal');
  const refEl = document.getElementById('confirmOrderRef');
  const compEl = document.getElementById('confirmCompany');
  const vesselEl = document.getElementById('confirmVessel');
  const portEl = document.getElementById('confirmPort');
  const totalEl = document.getElementById('confirmGrandTotal');
  const payEl = document.getElementById('confirmPaymentMethod');

  if (refEl) refEl.innerText = orderRefNum;
  if (compEl) compEl.innerText = companyName;
  if (vesselEl) vesselEl.innerText = vesselName;
  if (portEl) portEl.innerText = deliveryPort;
  if (totalEl) totalEl.innerText = `$${grandTotal.toFixed(2)} USD`;
  if (payEl) payEl.innerText = selectedPaymentMethod;

  // Clear Cart
  cartBasket = [];
  saveCartToStorage();

  if (modal) modal.classList.add('active');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutConfirmModal');
  if (modal) modal.classList.remove('active');
  window.location.href = 'index.html';
}

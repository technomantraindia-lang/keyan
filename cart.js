/**
 * KEYAN CORPORATION — B2B SHOPPING CART ENGINE
 */

let discountPercentage = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
});

function renderCartPage() {
  const container = document.getElementById('cartItemsList');
  const summaryContainer = document.getElementById('cartSummaryContent');
  if (!container) return;

  if (!cartBasket || cartBasket.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 4rem 1.5rem; color: var(--cart-text-muted);">
        <i class="fas fa-shopping-cart" style="font-size: 3rem; color: var(--cart-orange); margin-bottom: 1.2rem;"></i>
        <h3 style="font-family: var(--font-heading); color: var(--cart-navy-darkest); font-weight: 800; font-size: 1.5rem;">YOUR B2B CART IS EMPTY</h3>
        <p style="max-width: 480px; margin: 0.5rem auto 2rem; font-size: 0.98rem; line-height: 1.6;">
          You haven't selected any marine, industrial, safety, or instrumentation equipment yet.
        </p>
        <a href="products.html" class="cart-btn-checkout" style="width: auto; display: inline-flex; padding: 0.9rem 2rem;">
          BROWSE B2B CATALOGUE <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    `;

    if (summaryContainer) {
      summaryContainer.style.opacity = '0.5';
      summaryContainer.style.pointerEvents = 'none';
    }
    return;
  }

  if (summaryContainer) {
    summaryContainer.style.opacity = '1';
    summaryContainer.style.pointerEvents = 'auto';
  }

  const checkoutButton = document.getElementById('cartCheckoutButton');
  if (checkoutButton) {
    checkoutButton.innerHTML = isCustomerAuthenticated()
      ? 'PROCEED TO CHECKOUT <i class="fas fa-arrow-right"></i>'
      : 'LOGIN / REGISTER TO CHECKOUT <i class="fas fa-user-lock"></i>';
  }

  // Render Line Item Rows
  container.innerHTML = cartBasket.map((item, index) => {
    const unitPrice = item.price_usd || 125.00;
    const lineTotal = (unitPrice * item.qty).toFixed(2);

    return `
      <div class="cart-item-row">
        <img src="${item.img || 'iamges/prod_gas_detector.jpg'}" alt="${item.name}" class="cart-item-img">
        
        <div class="cart-item-info">
          <div class="cart-item-meta">
            <span><i class="fas fa-tag"></i> ${item.brand || 'KEYAN'}</span>
            <span>SKU: ${item.sku || 'KEY-PROD-001'}</span>
          </div>
          <h4><a href="product-detail.html?id=${item.id}">${item.name}</a></h4>
          <div class="cart-item-meta">${item.categoryName || item.category || ''}${item.availability ? ` · ${item.availability}` : ''}</div>
          <div class="cart-item-price-unit">$${unitPrice.toFixed(2)} USD / Unit</div>
        </div>

        <div class="cart-item-stepper-wrap">
          <div class="cart-stepper">
            <button class="cart-stepper-btn" onclick="updateCartItemQty(${index}, -1)">−</button>
            <input type="text" class="cart-stepper-val" value="${item.qty}" readonly>
            <button class="cart-stepper-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
          </div>
          <button class="cart-item-remove-btn" onclick="removeCartItem(${index})">
            <i class="fas fa-trash-alt"></i> Remove
          </button>
        </div>

        <div class="cart-item-line-total">
          $${lineTotal}<br>
          <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--cart-orange);">USD</span>
        </div>
      </div>
    `;
  }).join('');

  updateCartSummaryTotals();
}

function updateCartItemQty(index, change) {
  if (cartBasket[index]) {
    cartBasket[index].qty = Math.max(1, cartBasket[index].qty + change);
    saveCartToStorage();
    renderCartPage();
  }
}

function removeCartItem(index) {
  if (cartBasket[index]) {
    showToast(`Removed "${cartBasket[index].name}" from Cart.`);
    cartBasket.splice(index, 1);
    saveCartToStorage();
    renderCartPage();
  }
}

function updateCartSummaryTotals() {
  const subtotal = cartBasket.reduce((sum, item) => sum + ((item.price_usd || 125.00) * item.qty), 0);
  const discountAmount = subtotal * (discountPercentage / 100);
  const taxableTotal = subtotal - discountAmount;
  const estimatedShipping = subtotal > 0 ? 45.00 : 0.00;
  const grandTotal = taxableTotal + estimatedShipping;

  const subEl = document.getElementById('cartSubtotal');
  const shipEl = document.getElementById('cartShipping');
  const discEl = document.getElementById('cartDiscountRow');
  const discVal = document.getElementById('cartDiscountVal');
  const grandEl = document.getElementById('cartGrandTotal');

  if (subEl) subEl.innerText = `$${subtotal.toFixed(2)} USD`;
  if (shipEl) shipEl.innerText = `$${estimatedShipping.toFixed(2)} USD`;

  if (discEl && discVal) {
    if (discountPercentage > 0) {
      discEl.style.display = 'flex';
      discVal.innerText = `-$${discountAmount.toFixed(2)} USD (${discountPercentage}%)`;
    } else {
      discEl.style.display = 'none';
    }
  }

  if (grandEl) grandEl.innerText = `$${grandTotal.toFixed(2)}`;
}

function applyPromoCode() {
  const input = document.getElementById('cartPromoInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'KEYAN10' || code === 'SAVE10') {
    discountPercentage = 10;
    showToast('Promo Code "KEYAN10" Applied: 10% B2B Discount!');
    updateCartSummaryTotals();
  } else if (code === 'ALANG2026') {
    discountPercentage = 15;
    showToast('Promo Code "ALANG2026" Applied: 15% Port Partner Discount!');
    updateCartSummaryTotals();
  } else {
    showToast('Invalid or expired B2B promo code.');
  }
}

function proceedToCheckout() {
  if (cartBasket.length === 0) {
    showToast('Your cart is empty. Add products to proceed.');
    return;
  }
  if (!requireCustomerAuth('checkout.html')) return;
  window.location.href = 'checkout.html';
}

/**
 * KEYAN CORPORATION — PRODUCT DETAIL PAGE LOGIC
 * Dynamic B2B Product Detail Engine & Ecommerce Actions
 */

let currentProduct = null;
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'p1';

  currentProduct = CATALOG_ITEMS.find(p => p.id === productId || p.sku === productId) || CATALOG_ITEMS[0];

  renderProductDetail(currentProduct);
  trackRecentlyViewed(currentProduct.id);
  renderRelatedProducts(currentProduct);
  renderRecentlyViewedProducts();
  initTabs();
});

// Render Main Product Detail Layout
function renderProductDetail(p) {
  // 1. Breadcrumb
  const bcCat = document.getElementById('pdBreadcrumbCat');
  const bcProd = document.getElementById('pdBreadcrumbProd');
  if (bcCat) {
    bcCat.innerText = p.categoryName;
    bcCat.href = `categories.html#${p.category}`;
  }
  if (bcProd) bcProd.innerText = p.name;

  // 2. Main Image & Gallery Thumbnails
  const mainImg = document.getElementById('pdMainImg');
  if (mainImg) mainImg.src = p.img;

  const thumbsStrip = document.getElementById('pdThumbsStrip');
  if (thumbsStrip) {
    const galleryImages = p.images && p.images.length > 0 ? p.images : [p.img];
    thumbsStrip.innerHTML = galleryImages.map((imgUrl, idx) => `
      <div class="pd-thumb-box ${idx === 0 ? 'active' : ''}" onclick="switchGalleryImg('${imgUrl}', this)">
        <img src="${imgUrl}" alt="${p.name} Thumbnail ${idx+1}">
      </div>
    `).join('');
  }

  // 3. Product Meta Info
  const catTag = document.getElementById('pdCategoryTag');
  const skuTag = document.getElementById('pdSkuTag');
  const title = document.getElementById('pdTitle');
  const brand = document.getElementById('pdBrand');
  const stock = document.getElementById('pdStock');
  const price = document.getElementById('pdPrice');
  const desc = document.getElementById('pdShortDesc');

  if (catTag) catTag.innerText = p.categoryName.toUpperCase();
  if (skuTag) skuTag.innerText = `SKU: ${p.sku}`;
  if (title) title.innerText = p.name;
  if (brand) brand.innerText = p.brand;
  
  if (stock) {
    stock.innerText = p.availability;
    if (p.availability.toLowerCase().includes('request')) {
      stock.classList.add('request-only');
    } else {
      stock.classList.remove('request-only');
    }
  }

  // Sample Editable USD Price Display
  if (price) {
    price.innerText = `$${p.price_usd.toFixed(2)}`;
  }

  const mobPrice = document.getElementById('pdMobPrice');
  if (mobPrice) {
    mobPrice.innerText = `$${p.price_usd.toFixed(2)} USD`;
  }

  if (desc) desc.innerText = p.shortDesc;

  // 4. Update Line Subtotal
  updateQuantitySubtotal();

  // 5. Populate Specifications & Tab Content
  renderSpecificationsTable(p);
  renderApplicationPills(p);

  // 6. Pre-fill RFQ Form
  const rfqProductInput = document.getElementById('rfqProductName');
  if (rfqProductInput) rfqProductInput.value = `${p.name} (SKU: ${p.sku})`;
}

// Switch Main Gallery Image
function switchGalleryImg(imgUrl, thumbEl) {
  const mainImg = document.getElementById('pdMainImg');
  if (mainImg) {
    mainImg.style.opacity = '0.5';
    setTimeout(() => {
      mainImg.src = imgUrl;
      mainImg.style.opacity = '1';
    }, 150);
  }

  document.querySelectorAll('.pd-thumb-box').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

// Lightbox Zoom Handler
function openLightbox() {
  const modal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const mainImg = document.getElementById('pdMainImg');

  if (modal && lightboxImg && mainImg) {
    lightboxImg.src = mainImg.src;
    modal.classList.add('active');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.remove('active');
}

// Quantity Stepper Handler
function updateQuantity(change) {
  currentQuantity = Math.max(1, currentQuantity + change);
  const input = document.getElementById('pdQtyInput');
  if (input) input.value = currentQuantity;
  updateQuantitySubtotal();
}

function handleQuantityInput(val) {
  const parsed = parseInt(val, 10);
  currentQuantity = isNaN(parsed) || parsed < 1 ? 1 : parsed;
  updateQuantitySubtotal();
}

function updateQuantitySubtotal() {
  if (!currentProduct) return;
  const subtotalEl = document.getElementById('pdLineSubtotal');
  const total = (currentProduct.price_usd * currentQuantity).toFixed(2);
  if (subtotalEl) {
    subtotalEl.innerText = `${currentQuantity} × $${currentProduct.price_usd.toFixed(2)} = $${total} USD`;
  }
}

// Tabs Controller
function initTabs() {
  const tabBtns = document.querySelectorAll('.pd-tab-btn');
  const panels = document.querySelectorAll('.pd-tab-content-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

// Render Specs Table
function renderSpecificationsTable(p) {
  const container = document.getElementById('pdSpecsTable');
  if (!container || !p.specifications) return;

  const entries = Object.entries(p.specifications);
  container.innerHTML = entries.map(([key, val]) => `
    <tr>
      <td class="pd-specs-key">${key}</td>
      <td class="pd-specs-val">${val}</td>
    </tr>
  `).join('');
}

// Render Application Pills
function renderApplicationPills(p) {
  const container = document.getElementById('pdAppPills');
  if (!container || !p.applications) return;

  container.innerHTML = p.applications.map(app => `
    <span class="pd-app-pill"><i class="fas fa-check-circle"></i> ${app}</span>
  `).join('');
}

// Cart Action Handlers
function executeAddToCart() {
  if (!currentProduct) return;

  const cartItem = {
    id: currentProduct.id,
    sku: currentProduct.sku,
    name: currentProduct.name,
    brand: currentProduct.brand,
    price_usd: currentProduct.price_usd,
    img: currentProduct.img,
    qty: currentQuantity
  };

  const existingIndex = cartBasket.findIndex(item => item.id === currentProduct.id);
  if (existingIndex > -1) {
    cartBasket[existingIndex].qty += currentQuantity;
  } else {
    cartBasket.push(cartItem);
  }

  saveCartToStorage();
  showToast(`Added ${currentQuantity} × "${currentProduct.name}" to Cart.`);
  openQuoteDrawer();
}

function executeBuyNow() {
  executeAddToCart();
  window.location.href = 'checkout.html';
}

function executeRequestQuote() {
  openModal('quoteModal');
}

// Related Products ("YOU MAY ALSO NEED")
function renderRelatedProducts(p) {
  const container = document.getElementById('pdRelatedGrid');
  if (!container) return;

  const related = CATALOG_ITEMS.filter(item => item.id !== p.id && (item.category === p.category || item.brand === p.brand)).slice(0, 4);

  container.innerHTML = related.map(rel => `
    <div class="b2b-product-card">
      <div class="b2b-card-img-stage">
        <img src="${rel.img}" alt="${rel.name}" class="b2b-card-img" loading="lazy">
      </div>
      <div class="b2b-card-content">
        <span class="b2b-card-brand-tag"><i class="fas fa-tag"></i> ${rel.brand}</span>
        <h4 class="b2b-card-title">${rel.name}</h4>
        <span class="b2b-card-status request-only">$${rel.price_usd.toFixed(2)} USD</span>
        
        <div class="b2b-card-actions">
          <a href="product-detail.html?id=${rel.id}" class="b2b-btn-quote" style="text-decoration:none; text-align:center;">
            <i class="fas fa-eye"></i> View Detail
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// Recently Viewed Products Persistence
function trackRecentlyViewed(productId) {
  let viewed = JSON.parse(sessionStorage.getItem('keyan_recently_viewed') || '[]');
  viewed = viewed.filter(id => id !== productId);
  viewed.unshift(productId);
  sessionStorage.setItem('keyan_recently_viewed', JSON.stringify(viewed.slice(0, 4)));
}

function renderRecentlyViewedProducts() {
  const container = document.getElementById('pdRecentlyViewedGrid');
  const section = document.getElementById('pdRecentlyViewedSection');
  if (!container || !section) return;

  const viewedIds = JSON.parse(sessionStorage.getItem('keyan_recently_viewed') || '[]');
  const items = CATALOG_ITEMS.filter(item => viewedIds.includes(item.id));

  if (items.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  container.innerHTML = items.map(rv => `
    <div class="b2b-product-card">
      <div class="b2b-card-img-stage">
        <img src="${rv.img}" alt="${rv.name}" class="b2b-card-img" loading="lazy">
      </div>
      <div class="b2b-card-content">
        <span class="b2b-card-brand-tag"><i class="fas fa-tag"></i> ${rv.brand}</span>
        <h4 class="b2b-card-title">${rv.name}</h4>
        <span class="b2b-card-status request-only">$${rv.price_usd.toFixed(2)} USD</span>
        
        <div class="b2b-card-actions">
          <a href="product-detail.html?id=${rv.id}" class="b2b-btn-quote" style="text-decoration:none; text-align:center;">
            <i class="fas fa-eye"></i> View Item
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

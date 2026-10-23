/**
 * KEYAN CORPORATION — PRODUCT DETAIL PAGE LOGIC
 * Dynamic B2B Product Detail Engine & Ecommerce Actions
 */

let currentProduct = null;
let currentQuantity = 1;
const PRODUCT_CACHE_KEY = 'keyan_product_detail_';

function findProductEverywhere(productId) {
  if (!productId) return null;
  const targetId = String(productId).trim().toLowerCase();

  // 1. Search CATALOG_ITEMS
  if (typeof CATALOG_ITEMS !== 'undefined' && Array.isArray(CATALOG_ITEMS)) {
    const item = CATALOG_ITEMS.find(p =>
      String(p.id).toLowerCase() === targetId ||
      String(p.sku || '').toLowerCase() === targetId
    );
    if (item) return item;
  }

  // 2. Search CATEGORIES_MASTER featured products
  if (typeof CATEGORIES_MASTER !== 'undefined' && Array.isArray(CATEGORIES_MASTER)) {
    for (const cat of CATEGORIES_MASTER) {
      if (Array.isArray(cat.featuredProducts)) {
        const item = cat.featuredProducts.find(p =>
          String(p.id).toLowerCase() === targetId ||
          String(p.sku || '').toLowerCase() === targetId
        );
        if (item) return item;
      }
    }
  }

  // 3. Search ALL_DISCOVERY_PRODUCTS
  if (typeof ALL_DISCOVERY_PRODUCTS !== 'undefined' && Array.isArray(ALL_DISCOVERY_PRODUCTS)) {
    const item = ALL_DISCOVERY_PRODUCTS.find(p =>
      String(p.id).toLowerCase() === targetId ||
      String(p.sku || '').toLowerCase() === targetId
    );
    if (item) return item;
  }

  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'p1';

  const productMatch = findProductEverywhere(productId) || (typeof CATALOG_ITEMS !== 'undefined' ? CATALOG_ITEMS[0] : null);
  currentProduct = normaliseProduct(productMatch);

  renderProductDetail(currentProduct);
  trackRecentlyViewed(currentProduct.id);
  renderRelatedProducts(currentProduct);
  renderRecentlyViewedProducts();
  if (typeof initTabs === 'function') initTabs();
  loadBackendProduct(productId);
});

function normaliseProduct(product) {
  if (!product) return null;

  let specifications = product.specifications;
  if (typeof specifications === 'string') {
    try { specifications = JSON.parse(specifications); } catch (error) { specifications = {}; }
  }

  const specsObj = specifications && typeof specifications === 'object' && Object.keys(specifications).length > 0
    ? specifications
    : (product.specs ? { 'Key Specifications': product.specs, 'Product Class': product.categoryName || 'Standard' } : {});

  return {
    ...product,
    id: product.id || 'p1',
    sku: product.sku || `KEY-${(product.id || 'GEN').toUpperCase()}`,
    name: product.name || 'Industrial Product',
    brand: product.brand || 'Keyan Corporation',
    category: product.category || product.category_slug || 'marine',
    categoryName: product.categoryName || product.category_slug || product.category || 'Product Catalogue',
    price_usd: Number(product.price_usd) || 0,
    availability: product.availability || 'Available on Request',
    shortDesc: product.shortDesc || product.fullDesc || (product.specs ? `${product.name} — ${product.specs}` : 'Class-approved industrial and marine grade equipment from Keyan Corporation.'),
    fullDesc: product.fullDesc || product.shortDesc || 'Manufactured and certified to international marine and industrial quality standards. Suitable for vessel, rig, terminal, and plant applications.',
    specifications: specsObj,
    applications: Array.isArray(product.applications) && product.applications.length > 0
      ? product.applications
      : ['Marine & Vessel Operations', 'Industrial Plant Maintenance', 'Offshore Supply', 'Port Logistics'],
    images: Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.img || 'iamges/hero.jpg']
  };
}

async function loadBackendProduct(productId) {
  const cacheKey = `${PRODUCT_CACHE_KEY}${productId}`;
  const cachedProduct = readCachedProduct(cacheKey);

  try {
    const payload = await requestProductWithRetry(`/products/${encodeURIComponent(productId)}`);
    const remoteProduct = normaliseProduct(payload.data || payload);
    if (!remoteProduct || !remoteProduct.id) throw new Error('The product response was empty.');

    localStorage.setItem(cacheKey, JSON.stringify(remoteProduct));
    applyBackendProduct(remoteProduct);
  } catch (error) {
    if (error && (error.status === 404 || error.message?.includes('not found') || error.message?.includes('No query results'))) {
      const localProduct = findProductEverywhere(productId);

      if (!localProduct) {
        localStorage.removeItem(cacheKey);
        renderDraftOrUnavailableProduct();
        return;
      }
      currentProduct = normaliseProduct(localProduct);
      renderProductDetail(currentProduct);
      renderRelatedProducts(currentProduct);
      console.info('Product detail API 404; displaying local catalogue item.', error.message);
      return;
    }
    if (cachedProduct) {
      applyBackendProduct(cachedProduct);
      return;
    }
    console.info('Product detail API unavailable; showing the local catalogue.', error.message);
  }
}

function renderDraftOrUnavailableProduct() {
  const stageSection = document.querySelector('.pd-stage-section');
  const tabsSection = document.querySelector('.pd-tabs-section');
  const relatedSection = document.querySelector('.pd-related-section');
  if (tabsSection) tabsSection.style.display = 'none';
  if (relatedSection) relatedSection.style.display = 'none';
  if (stageSection) {
    stageSection.innerHTML = `
      <div class="container" style="padding: 5rem 1rem; text-align: center; max-width: 680px; margin: 0 auto;">
        <div style="width: 76px; height: 76px; border-radius: 50%; background: #fff0df; color: #ff7a18; display: grid; place-items: center; margin: 0 auto 1.5rem; font-size: 2.2rem; box-shadow: 0 10px 25px rgba(255,122,24,0.18);">
          <i class="fas fa-file-alt"></i>
        </div>
        <div style="margin-bottom: 1rem;">
          <span class="badge orange" style="font-size: 0.85rem; padding: 5px 14px; font-weight: 700; border-radius: 99px; background: #fff0df; color: #b65708;">● Draft / Unpublished</span>
        </div>
        <h2 style="font-family: var(--font-heading, inherit); font-size: 2.1rem; color: #071525; margin-bottom: 0.85rem; font-weight: 800;">This product is in Draft</h2>
        <p style="color: #64748b; font-size: 1.05rem; line-height: 1.65; margin-bottom: 2.2rem;">
          The administrator has not published this product live on the storefront yet. It is currently saved as a draft.
        </p>
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="products.html" class="btn btn-navy" style="display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; border-radius: 8px; background: #071525; color: #fff; text-decoration: none; font-weight: 700;">
            <i class="fas fa-boxes"></i> Explore Live Products
          </a>
          <a href="contact.html" class="btn btn-orange" style="display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; border-radius: 8px; background: #ff7a18; color: #fff; text-decoration: none; font-weight: 700;">
            <i class="fas fa-envelope"></i> Request Custom Quote
          </a>
        </div>
      </div>
    `;
  }
}

async function requestProductWithRetry(path) {
  if (typeof window.keyanApiRequest !== 'function') throw new Error('Catalogue API is not available.');

  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await window.keyanApiRequest(path);
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
  throw lastError || new Error('The catalogue API is unavailable.');
}

function readCachedProduct(cacheKey) {
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    return cached ? normaliseProduct(cached) : null;
  } catch (error) {
    return null;
  }
}

function applyBackendProduct(product) {
  currentProduct = product;
  renderProductDetail(currentProduct);
  renderRelatedProducts(currentProduct);
}

// The API catalogue loads asynchronously after the local fallback catalogue.
// Re-render once an admin-created product arrives from the backend.
window.addEventListener('keyan:catalog-updated', () => {
  const productId = new URLSearchParams(window.location.search).get('id') || 'p1';
  const remoteProduct = CATALOG_ITEMS.find(p => p.id === productId || p.sku === productId);
  if (! remoteProduct) return;
  applyBackendProduct(normaliseProduct(remoteProduct));
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
  const primaryImage = p.img || 'iamges/hero.jpg';
  if (mainImg) mainImg.src = primaryImage;

  const thumbsStrip = document.getElementById('pdThumbsStrip');
  if (thumbsStrip) {
    const galleryImages = p.images && p.images.length > 0 ? p.images : [primaryImage];
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

  if (catTag) catTag.innerText = (p.categoryName || 'PRODUCT CATALOGUE').toUpperCase();
  if (skuTag) skuTag.innerText = `SKU: ${p.sku}`;
  if (title) title.innerText = p.name;
  if (brand) brand.innerText = p.brand || 'Keyan Corporation';
  
  if (stock) {
    stock.innerText = p.availability;
    if (p.availability.toLowerCase().includes('request')) {
      stock.classList.add('request-only');
    } else {
      stock.classList.remove('request-only');
    }
  }

  // Recalculate this from the latest product returned by the backend. The
  // detail page initially renders a local fallback and then re-renders API data.
  const quoteOnly = productRequiresQuote(p);
  const addCartButton = document.querySelector('.pd-btn-add-cart');
  const buyNowButton = document.querySelector('.pd-btn-buy-now');
  const mobileCartButton = document.querySelector('.pd-mob-bar-btn');
  const quantityWrapper = document.querySelector('.pd-qty-wrapper');
  document.body.classList.toggle('pd-request-only-mode', quoteOnly);
  if (quoteOnly) {
    if (addCartButton) {
      addCartButton.innerHTML = 'REQUEST QUOTE <i class="fas fa-file-signature"></i>';
      addCartButton.classList.add('pd-btn-quote-only');
    }
    if (buyNowButton) buyNowButton.style.display = 'none';
    if (mobileCartButton) mobileCartButton.innerHTML = 'REQUEST QUOTE <i class="fas fa-file-signature"></i>';
    if (quantityWrapper) quantityWrapper.style.display = 'none';
  } else {
    if (addCartButton) {
      addCartButton.innerHTML = 'ADD TO CART <i class="fas fa-shopping-cart"></i>';
      addCartButton.classList.remove('pd-btn-quote-only');
    }
    if (buyNowButton) buyNowButton.style.display = '';
    if (mobileCartButton) mobileCartButton.innerHTML = 'ADD TO CART <i class="fas fa-shopping-cart"></i>';
    if (quantityWrapper) quantityWrapper.style.display = '';
  }

  // Sample Editable USD Price Display
  if (price) {
    price.innerText = `$${p.price_usd.toFixed(2)}`;
  }

  const mobPrice = document.getElementById('pdMobPrice');
  if (mobPrice) {
    mobPrice.innerText = `$${p.price_usd.toFixed(2)} USD`;
  }

  if (desc) desc.innerText = p.shortDesc || '';
  const fullDesc = document.getElementById('pdFullDesc');
  if (fullDesc) fullDesc.innerText = p.fullDesc || p.shortDesc || '';

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
  if (!container) return;

  const entries = Object.entries(p.specifications || {});
  container.innerHTML = entries.map(([key, val]) => `
    <tr>
      <td class="pd-specs-key">${escapeProductHtml(key)}</td>
      <td class="pd-specs-val">${escapeProductHtml(val)}</td>
    </tr>
  `).join('') || (p.specs ? `<tr><td class="pd-specs-key">Specifications</td><td class="pd-specs-val">${escapeProductHtml(p.specs)}</td></tr>` : '<tr><td colspan="2" class="pd-specs-empty">No technical specifications available.</td></tr>');
}

function escapeProductHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character]));
}

// Render Application Pills
function renderApplicationPills(p) {
  const container = document.getElementById('pdAppPills');
  if (!container) return;

  container.innerHTML = (p.applications || []).map(app => `
    <span class="pd-app-pill"><i class="fas fa-check-circle"></i> ${escapeProductHtml(app)}</span>
  `).join('');
}

// Cart Action Handlers
function executeAddToCart() {
  if (!currentProduct) return;
  if (productRequiresQuote(currentProduct)) {
    requestProductQuote(currentProduct.id);
    return;
  }

  const cartItem = {
    id: currentProduct.id,
    sku: currentProduct.sku,
    name: currentProduct.name,
    brand: currentProduct.brand,
    category: currentProduct.category,
    categoryName: currentProduct.categoryName,
    shortDesc: currentProduct.shortDesc,
    availability: currentProduct.availability,
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
  // Cart actions stay on the product page; inquiries are submitted from Contact Us.
}

function executeBuyNow() {
  if (currentProduct && productRequiresQuote(currentProduct)) {
    requestProductQuote(currentProduct.id);
    return;
  }
  executeAddToCart();
  if (!requireCustomerAuth('checkout.html')) return;
  window.location.href = 'checkout.html';
}

function executeRequestQuote() {
  if (currentProduct) requestProductQuote(currentProduct.id);
}

function productRequiresQuote(product) {
  return Boolean(product && (
    product.is_quote_only === true ||
    String(product.is_quote_only || '').toLowerCase() === 'true' ||
    String(product.availability || '').trim().toLowerCase() === 'available on request'
  ));
}

// Related Products ("YOU MAY ALSO NEED")
function renderRelatedProducts(p) {
  const container = document.getElementById('pdRelatedGrid');
  if (!container) return;

  const related = CATALOG_ITEMS.filter(item => item.id !== p.id && (item.category === p.category || item.brand === p.brand)).slice(0, 4);

  container.innerHTML = related.map(rel => `
    <div class="b2b-product-card" onclick="if (!event.target.closest('button, a')) window.location.href = 'product-detail.html?id=${rel.id}'" style="cursor: pointer;">
      <div class="b2b-card-img-stage">
        <a href="product-detail.html?id=${rel.id}" style="display:flex; width:100%; height:100%; align-items:center; justify-content:center; text-decoration:none;">
          <img src="${rel.img}" alt="${rel.name}" class="b2b-card-img" loading="lazy">
        </a>
      </div>
      <div class="b2b-card-content">
        <span class="b2b-card-brand-tag"><i class="fas fa-tag"></i> ${rel.brand}</span>
        <h4 class="b2b-card-title"><a href="product-detail.html?id=${rel.id}" style="color:inherit; text-decoration:none;">${rel.name}</a></h4>
        <span class="b2b-card-status request-only">$${rel.price_usd.toFixed(2)} USD</span>
        
        <div class="b2b-card-actions">
          <a href="product-detail.html?id=${rel.id}" class="b2b-btn-quote" onclick="event.stopPropagation();" style="text-decoration:none; text-align:center;">
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
    <div class="b2b-product-card" onclick="if (!event.target.closest('button, a')) window.location.href = 'product-detail.html?id=${rv.id}'" style="cursor: pointer;">
      <div class="b2b-card-img-stage">
        <a href="product-detail.html?id=${rv.id}" style="display:flex; width:100%; height:100%; align-items:center; justify-content:center; text-decoration:none;">
          <img src="${rv.img}" alt="${rv.name}" class="b2b-card-img" loading="lazy">
        </a>
      </div>
      <div class="b2b-card-content">
        <span class="b2b-card-brand-tag"><i class="fas fa-tag"></i> ${rv.brand}</span>
        <h4 class="b2b-card-title"><a href="product-detail.html?id=${rv.id}" style="color:inherit; text-decoration:none;">${rv.name}</a></h4>
        <span class="b2b-card-status request-only">$${rv.price_usd.toFixed(2)} USD</span>
        
        <div class="b2b-card-actions">
          <a href="product-detail.html?id=${rv.id}" class="b2b-btn-quote" onclick="event.stopPropagation();" style="text-decoration:none; text-align:center;">
            <i class="fas fa-eye"></i> View Item
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

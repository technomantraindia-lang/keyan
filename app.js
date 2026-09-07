/**
 * KEYAN CORPORATION - 2026 Trend-Forward B2B Procurement Marketplace Logic
 */

// B2B Catalogue Products
const CATALOG_ITEMS = [
  {
    id: 'p1',
    name: 'Portable Multi Gas Detector X-am 2500',
    brand: 'Dräger',
    category: 'gas',
    categoryName: 'Fire & Safety',
    img: 'iamges/prod_gas_detector.jpg',
    availability: 'Available on Request',
    specs: 'O2, H2S, CO, Ex Gas Detection | IP67'
  },
  {
    id: 'p2',
    name: 'SCBA Air Breathing Apparatus System',
    brand: 'MSA Safety',
    category: 'safety',
    categoryName: 'Fire & Safety',
    img: 'iamges/prod_scba.jpg',
    availability: 'Available on Request',
    specs: '300 Bar Carbon Composite Cylinder'
  },
  {
    id: 'p3',
    name: 'Air-Operated Double Diaphragm Pump (AODD)',
    brand: 'Wilden',
    category: 'machinery',
    categoryName: 'Industrial Machinery',
    img: 'iamges/prod_pump.jpg',
    availability: 'In Stock / On Request',
    specs: 'Heavy-Duty Industrial Duty | 2" Flange'
  },
  {
    id: 'p4',
    name: 'Marine Bronze Flanged Globe Valve DN100',
    brand: 'Sikla / Marine Standard',
    category: 'marine',
    categoryName: 'Marine & Ship Supply',
    img: 'iamges/prod_valve.jpg',
    availability: 'Available on Request',
    specs: 'Class Approved | RG5 Bronze Marine Spec'
  },
  {
    id: 'p5',
    name: 'Digital Marine Pressure Transmitter Gauge',
    brand: 'Consilium / Nav-Tech',
    category: 'instruments',
    categoryName: 'Rig & Instruments',
    img: 'iamges/prod_transmitter.jpg',
    availability: 'Available on Request',
    specs: 'ATEX Certified | 4-20mA Output'
  },
  {
    id: 'p6',
    name: 'SOLAS Approved Inflatable Life Jacket (275N)',
    brand: 'Unitor / SOLAS',
    category: 'marine',
    categoryName: 'Marine & Ship Supply',
    img: 'iamges/prod_lifejacket.jpg',
    availability: 'In Stock / On Request',
    specs: 'MED Certified | Dual Chamber Auto-Inflate'
  },
  {
    id: 'p7',
    name: 'Heavy Duty Fire Hose & Couplings (2.5")',
    brand: 'Scott / Fire Guard',
    category: 'safety',
    categoryName: 'Fire & Safety',
    img: 'iamges/fire.png',
    availability: 'Available on Request',
    specs: 'Rubber Lined High Pressure Hose'
  },
  {
    id: 'p8',
    name: 'Offshore Rig Monitoring Control Telemetry',
    brand: 'Apollo / Marine Instrumentation',
    category: 'instruments',
    categoryName: 'Rig & Instruments',
    img: 'iamges/Offshore Rig Monitoring Control Telemetry.png',
    availability: 'Available on Request',
    specs: 'Offshore Telemetry & Depth Gauge Unit'
  }
];

let quoteBasket = [];
let wishlist = new Set();

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts('all');
  initTabs();
  initSearchAutocomplete();
  initScrollReveal();
});

// Scroll Reveal Intersection Observer
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-from-bottom, .reveal-from-top, .reveal-3d-pop');
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('reveal-active'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

// Global Event Listeners for Mobile Navigation & Modals
window.addEventListener('resize', () => {
  if (window.innerWidth > 992) {
    closeMobileNav();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileNav();
    document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }
});


function renderFeaturedProducts(categoryFilter = 'all') {
  const container = document.getElementById('featuredProductsGrid');
  if (!container) return;

  const filtered = categoryFilter === 'all'
    ? CATALOG_ITEMS
    : CATALOG_ITEMS.filter(p => p.category === categoryFilter);

  container.innerHTML = filtered.map(p => `
    <div class="product-card-clean">
      <button class="product-wishlist-toggle ${wishlist.has(p.id) ? 'active' : ''}" onclick="toggleWishlist('${p.id}')" title="Wishlist">
        <i class="${wishlist.has(p.id) ? 'fas' : 'far'} fa-heart"></i>
      </button>
      
      <div class="product-img-stage">
        <img src="${p.img}" alt="${p.name}" class="product-photo" loading="lazy">
      </div>

      <div class="product-info-wrap">
        <span class="product-meta-cat">${p.categoryName}</span>
        <h4 class="product-name-title">${p.name}</h4>
        <div class="product-brand-tag"><i class="fas fa-tag"></i> ${p.brand}</div>
        
        <div class="product-stock-status">
          <i class="fas fa-circle"></i> ${p.availability}
        </div>

        <div class="product-actions-group">
          <button class="btn-card-buy" onclick="handleBuyNow('${p.id}')" title="Buy Now">
            <i class="fas fa-bolt"></i> Buy Now
          </button>
          <button class="btn-card-quote" onclick="addToQuote('${p.id}')" title="Request Quote">
            <i class="fas fa-file-signature"></i> Request Quote
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function handleBuyNow(productId) {
  const item = CATALOG_ITEMS.find(p => p.id === productId);
  if (!item) return;
  addToQuote(productId);
  showToast(`"${item.name}" added for Immediate Purchase.`);
  openQuoteDrawer();
}

function initTabs() {
  const tabs = document.querySelectorAll('.prod-tab-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-cat');
      renderFeaturedProducts(cat);
    });
  });
}

function toggleWishlist(productId) {
  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    showToast('Item removed from Wishlist.');
  } else {
    wishlist.add(productId);
    showToast('Item added to Wishlist.');
  }
  document.getElementById('wishlistCount').innerText = wishlist.size;
  const activeTab = document.querySelector('.prod-tab-item.active')?.getAttribute('data-cat') || 'all';
  renderFeaturedProducts(activeTab);
}

function addToQuote(productId) {
  const item = CATALOG_ITEMS.find(p => p.id === productId);
  if (!item) return;

  const existing = quoteBasket.find(q => q.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    quoteBasket.push({ ...item, qty: 1 });
  }

  updateQuoteBadge();
  showToast(`"${item.name}" added to Quote List.`);
}

function updateQuoteBadge() {
  const count = quoteBasket.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById('quoteCartCount');
  if (badge) {
    badge.innerText = count;
  }
}

function openQuoteDrawer() {
  const modal = document.getElementById('quoteDrawerModal');
  const body = document.getElementById('quoteDrawerItems');
  if (!modal || !body) return;

  if (quoteBasket.length === 0) {
    body.innerHTML = `<p style="text-align:center; color: var(--text-muted); padding: 2rem;">Your Quote List is empty. Select products from the catalogue!</p>`;
  } else {
    body.innerHTML = `
      <div style="display:flex; flex-direction:column; gap: 0.8rem;">
        ${quoteBasket.map(item => `
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.8rem;">
            <div>
              <h5 style="font-size:0.95rem; color:var(--navy-deep);">${item.name}</h5>
              <span style="font-size:0.8rem; color:var(--marine-blue);">${item.brand}</span>
            </div>
            <div style="display:flex; align-items:center; gap:0.8rem;">
              <span style="font-weight:800; color:var(--orange-accent);">Qty: ${item.qty}</span>
              <button onclick="removeFromQuote('${item.id}')" style="background:none; border:none; color:#E11D48; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  openModal('quoteDrawerModal');
}

function removeFromQuote(productId) {
  quoteBasket = quoteBasket.filter(q => q.id !== productId);
  updateQuoteBadge();
  openQuoteDrawer();
}

function initSearchAutocomplete() {
  const input = document.getElementById('headerSearchInput');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase().trim();
    if (val.length > 1) {
      const match = CATALOG_ITEMS.filter(p => 
        p.name.toLowerCase().includes(val) || 
        p.brand.toLowerCase().includes(val) || 
        p.categoryName.toLowerCase().includes(val)
      );
      if (match.length > 0) {
        showToast(`Found ${match.length} product(s) matching "${val}".`);
      }
    }
  });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('headerSearchInput');
  const term = input ? input.value : '';
  showToast(`Searching Keyan catalogue for "${term}"...`);
  document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

function handleFormSubmit(event, title) {
  event.preventDefault();
  showToast(`Thank you! Your ${title} has been submitted to Keyan Corporation sales team.`);
  event.target.reset();
  const activeModal = event.target.closest('.modal-backdrop');
  if (activeModal) activeModal.classList.remove('active');
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:var(--orange-accent)"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// Mobile Navigation Toggle Functions
function toggleMobileNav() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  if (drawer && backdrop) {
    const isActive = drawer.classList.contains('active');
    if (isActive) {
      closeMobileNav();
    } else {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
}

function closeMobileNav() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global Event Listeners for Mobile Navigation & Modals
window.addEventListener('resize', () => {
  if (window.innerWidth > 992) {
    closeMobileNav();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileNav();
    document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }
});


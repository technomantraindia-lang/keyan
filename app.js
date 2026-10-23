/**
 * KEYAN CORPORATION - 2026 Trend-Forward B2B Procurement Marketplace Logic
 */

// B2B Catalogue Products with USD Pricing & Technical Specifications
const defaultApiUrl = ['http:', 'https:'].includes(window.location.protocol)
  ? `${window.location.origin}/api`
  : 'http://127.0.0.1:8000/api';
const KEYAN_API_URL = (window.KEYAN_API_URL || defaultApiUrl).replace(/\/$/, '');

window.keyanApiRequest = async function (path, options = {}) {
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };
  const token = localStorage.getItem('keyan_api_token');
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${KEYAN_API_URL}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const validationMessage = payload.errors
      ? Object.values(payload.errors).flat().join(' ')
      : '';
    const error = new Error(validationMessage || payload.message || 'The server could not complete this request.');
    error.status = response.status;
    throw error;
  }
  return payload;
};

let CATALOG_ITEMS = [
  {
    id: 'p1',
    sku: 'KEY-GD-2500',
    name: 'Portable Multi Gas Detector X-am 2500',
    brand: 'Dräger',
    category: 'gas',
    categoryName: 'Gas Detection & Safety',
    img: 'iamges/prod_gas_detector.jpg',
    images: ['iamges/prod_gas_detector.jpg', 'iamges/prod_transmitter.jpg', 'iamges/rig_instruments.jpg'],
    price_usd: 485.00,
    availability: 'In Stock',
    shortDesc: 'Continuous detection of up to 4 gases: O2, H2S, CO, and combustible gases (Ex). IP67 water and dust resistance with ATEX Zone 0/20 certification.',
    fullDesc: 'The Dräger X-am 2500 was developed for personal monitoring. The 1 to 4 gas detector reliably detects combustible gases and vapors, as well as O2, CO, NO2, SO2 and H2S. Reliable and fully mature measurement technology, durable sensors and easy handling guarantee a high degree of safety with extremely low operating costs.',
    specs: 'O2, H2S, CO, Ex Gas Detection | IP67 Water Resistant',
    specifications: {
      'Product Type': 'Portable Multi-Gas Detector',
      'Brand': 'Dräger Safety',
      'Model': 'X-am 2500 Series',
      'Target Gases': 'O2, H2S, CO, Ex (Combustible Vapors)',
      'Ingress Protection': 'IP67 Water & Dust Proof',
      'Certification': 'ATEX Zone 0/20 | MED SOLAS Approved',
      'Battery Life': '> 12 Hours Continuous Operation',
      'Country of Origin': 'Germany'
    },
    applications: ['Confined Space Entry', 'Shiphold Inspection', 'Refinery Turnaround', 'Offshore Rig Monitoring'],
    is_quote_only: false
  },
  {
    id: 'p2',
    sku: 'KEY-SCBA-300',
    name: 'SCBA Air Breathing Apparatus System',
    brand: 'MSA Safety',
    category: 'safety',
    categoryName: 'Fire & Safety Equipment',
    img: 'iamges/prod_scba.jpg',
    images: ['iamges/prod_scba.jpg', 'iamges/fire_safety.jpg', 'iamges/fire.png'],
    price_usd: 1450.00,
    availability: 'Available on Request',
    shortDesc: 'Heavy-duty 300 Bar composite carbon cylinder SCBA system with ergonomic harness, positive pressure full face mask, and acoustic alarm whistle.',
    fullDesc: 'Self-Contained Breathing Apparatus (SCBA) engineered for firefighting, marine vessel emergency response, and industrial chemical safety. Features an ultra-lightweight carbon composite air cylinder rated for 300 Bar pressure.',
    specs: '300 Bar Carbon Composite Cylinder | Ergonomic Harness',
    specifications: {
      'Product Type': 'Self-Contained Breathing Apparatus',
      'Brand': 'MSA Safety / SOLAS',
      'Cylinder Rating': '300 Bar Working Pressure',
      'Cylinder Volume': '6.8 Liters Carbon Composite',
      'Face Mask': 'Full Face Positive Pressure Silicone Mask',
      'Whistle Alarm': 'Acoustic Signal > 90 dB at 55 Bar',
      'Certification': 'EN 137 Type 2 | SOLAS / MED Certified',
      'Country of Origin': 'United States / EU'
    },
    applications: ['Shipboard Firefighting', 'Chemical Plant Emergency', 'Industrial Rescue', 'Toxic Atmosphere Entry'],
    is_quote_only: false
  },
  {
    id: 'p3',
    sku: 'KEY-PMP-200',
    name: 'Air-Operated Double Diaphragm Pump (AODD)',
    brand: 'Wilden',
    category: 'machinery',
    categoryName: 'Industrial Machinery & Tools',
    img: 'iamges/prod_pump.jpg',
    images: ['iamges/prod_pump.jpg', 'iamges/INDUSTRIAL & MFG].png', 'iamges/consumables.jpg'],
    price_usd: 890.00,
    availability: 'In Stock',
    shortDesc: 'Heavy-duty 2" flanged aluminum body AODD pump for bilge transfer, chemical slurry, viscous fluids, and harsh marine environments.',
    fullDesc: 'Wilden original air-operated double diaphragm pump designed for high-volume fluid transfer without electrical hazard. Self-priming up to 7.6m dry lift with dry-run capabilities.',
    specs: 'Heavy-Duty Industrial Duty | 2" Flange Port',
    specifications: {
      'Product Type': 'Double Diaphragm AODD Pump',
      'Brand': 'Wilden Pumps',
      'Body Material': 'Cast Aluminum / Ductile Iron',
      'Diaphragm Material': 'Buna-N / Teflon PTFE',
      'Port Diameter': '2 Inch ANSI Flange',
      'Max Flow Rate': '617 L/min (163 GPM)',
      'Air Supply Pressure': '8.6 Bar (125 PSI)',
      'Country of Origin': 'United States'
    },
    applications: ['Ship Bilge Pumping', 'Industrial Slurry Transfer', 'Chemical Transfer', 'Oil Spill Response'],
    is_quote_only: false
  },
  {
    id: 'p4',
    sku: 'KEY-VLV-100',
    name: 'Marine Bronze Flanged Globe Valve DN100',
    brand: 'Sikla / Marine Standard',
    category: 'marine',
    categoryName: 'Marine & Ship Supply',
    img: 'iamges/prod_valve.jpg',
    images: ['iamges/prod_valve.jpg', 'iamges/marine and shipping.png', 'iamges/ship_supplier.jpg'],
    price_usd: 320.00,
    availability: 'Available on Request',
    shortDesc: 'Class-approved RG5 bronze marine globe valve DN100 for seawater lines, cooling water, and fuel oil distribution.',
    fullDesc: 'Heavy-duty cast bronze marine globe valve built to international SOLAS and classification society standards (DNV-GL, Lloyd\'s Register). Resistant to seawater corrosion.',
    specs: 'Class Approved | RG5 Bronze Marine Spec',
    specifications: {
      'Product Type': 'Flanged Marine Globe Valve',
      'Brand': 'Sikla / SOLAS Standard',
      'Nominal Size': 'DN100 (4 Inch)',
      'Pressure Rating': 'PN16 / 16 Bar',
      'Material Body': 'RG5 Gunmetal Bronze',
      'Connection': 'Flanged ANSI / DIN standard',
      'Class Certification': 'DNV-GL / Lloyd\'s Register',
      'Country of Origin': 'EU / India'
    },
    applications: ['Seawater Cooling Lines', 'Fuel Oil Transfer', 'Ballast Piping', 'Shipboard Engine Room'],
    is_quote_only: false
  },
  {
    id: 'p5',
    sku: 'KEY-TX-420',
    name: 'Digital Marine Pressure Transmitter Gauge',
    brand: 'Consilium / Nav-Tech',
    category: 'instruments',
    categoryName: 'Marine & Industrial Instruments',
    img: 'iamges/prod_transmitter.jpg',
    images: ['iamges/prod_transmitter.jpg', 'iamges/rig_instruments.jpg', 'iamges/Offshore Rig Monitoring Control Telemetry.png'],
    price_usd: 650.00,
    availability: 'In Stock',
    shortDesc: 'ATEX Zone 0 certified piezoresistive pressure transmitter with 4-20mA HART protocol for rig depth and tank gauging.',
    fullDesc: 'High-precision marine pressure transmitter engineered for tank level measurement, pipeline pressure monitoring, and offshore platform telemetry.',
    specs: 'ATEX Certified | 4-20mA Output | IP68 Submersible',
    specifications: {
      'Product Type': 'Industrial Pressure Transmitter',
      'Brand': 'Consilium Nav-Tech',
      'Signal Output': '4-20mA HART Protocol',
      'Pressure Range': '0 to 40 Bar (Customizable)',
      'Accuracy': '±0.1% Full Scale',
      'Explosion Proof': 'ATEX Ex ia IIC T4 Ga',
      'Housing': '316L Stainless Steel / Titanium',
      'Country of Origin': 'Sweden / Germany'
    },
    applications: ['Offshore Tank Level', 'Cargo Pipeline Monitoring', 'Hydraulic System Control', 'Rig Telemetry'],
    is_quote_only: false
  },
  {
    id: 'p6',
    sku: 'KEY-LJ-275',
    name: 'SOLAS Approved Inflatable Life Jacket (275N)',
    brand: 'Unitor / SOLAS',
    category: 'marine',
    categoryName: 'Marine & Ship Supply',
    img: 'iamges/prod_lifejacket.jpg',
    images: ['iamges/prod_lifejacket.jpg', 'iamges/ship_supplier.jpg', 'iamges/offshore and rig.png'],
    price_usd: 195.00,
    availability: 'In Stock',
    shortDesc: 'Dual chamber automatic inflation 275N buoyancy SOLAS/MED certified life jacket with emergency light and whistle.',
    fullDesc: 'Heavy-duty offshore life jacket engineered for heavy weather and industrial marine work. Provides 275 Newtons of buoyancy to self-right an unconscious wearer clad in heavy weather gear.',
    specs: 'MED Certified | Dual Chamber Auto-Inflate 275N',
    specifications: {
      'Product Type': 'Inflatable SOLAS Life Jacket',
      'Brand': 'Unitor SOLAS',
      'Buoyancy Rating': '275 Newtons (ISO 12402-2)',
      'Inflation Mechanism': 'Halkey-Roberts Automatic & Manual',
      'Chamber Setup': 'Twin Independent Bladders',
      'Light System': 'MED Approved Self-Igniting LED Light',
      'Certification': 'SOLAS 74/96 | MED Wheelmark Approved',
      'Country of Origin': 'United Kingdom / EU'
    },
    applications: ['Offshore Vessel Work', 'Ship Crew Safety', 'Pilot Transport', 'Rig Platform Operations'],
    is_quote_only: false
  },
  {
    id: 'p7',
    sku: 'KEY-FH-25',
    name: 'Heavy Duty Fire Hose & Couplings (2.5")',
    brand: 'Scott / Fire Guard',
    category: 'safety',
    categoryName: 'Fire & Safety Equipment',
    img: 'iamges/fire.png',
    images: ['iamges/fire.png', 'iamges/fire_safety.jpg', 'iamges/prod_scba.jpg'],
    price_usd: 145.00,
    availability: 'In Stock',
    shortDesc: 'Synthetic rubber lined high pressure 2.5" 30m fire hose complete with Storz brass couplings and nozzle adapter.',
    fullDesc: 'Heavy-duty all-weather marine and industrial fire hose. All-synthetic polyester jacket with internal EPDM rubber lining. Resistant to ozone, seawater, and chemical abrasion.',
    specs: 'Rubber Lined High Pressure Hose | 30m Length',
    specifications: {
      'Product Type': 'Industrial Fire Hose Assembly',
      'Brand': 'Scott Fire Guard',
      'Internal Diameter': '2.5 Inch (65mm)',
      'Length': '30 Meters Roll',
      'Working Pressure': '16 Bar (230 PSI)',
      'Burst Pressure': '48 Bar (690 PSI)',
      'Coupling Type': 'Instantaneous BS336 / Storz Brass',
      'Country of Origin': 'India / EU'
    },
    applications: ['Shipboard Hydrants', 'Industrial Plant Fire Protection', 'Refinery Safety Lines', 'Port Terminals'],
    is_quote_only: false
  },
  {
    id: 'p8',
    sku: 'KEY-RIG-88',
    name: 'Offshore Rig Monitoring Control Telemetry',
    brand: 'Apollo / Marine Instrumentation',
    category: 'instruments',
    categoryName: 'Marine & Industrial Instruments',
    img: 'iamges/Offshore Rig Monitoring Control Telemetry.png',
    images: ['iamges/Offshore Rig Monitoring Control Telemetry.png', 'iamges/rig_instruments.jpg', 'iamges/oil and gas.png'],
    price_usd: 2850.00,
    availability: 'Available on Request',
    shortDesc: 'Integrated offshore telemetry unit for real-time rig depth, inclination, ballast pressure, and gas alarm dashboard.',
    fullDesc: 'Comprehensive rig control telemetry system engineered for jack-up rigs, drillships, and offshore platforms. Centralizes multi-sensor signals into an ATEX certified explosion-proof console.',
    specs: 'Offshore Telemetry & Depth Gauge Unit | Modbus/Ethernet',
    specifications: {
      'Product Type': 'Offshore Telemetry Control Unit',
      'Brand': 'Apollo Instrumentation',
      'Display Interface': '15" Sunlight Readable Touch Console',
      'Protocol': 'Modbus TCP/IP | RS485 | CANbus',
      'Channels': '32 Sensor Inputs (Analog & Digital)',
      'Enclosure': 'IP66 316 Stainless Steel Console',
      'Certification': 'ATEX Zone 1 / DNV Offshore',
      'Country of Origin': 'United Kingdom'
    },
    applications: ['Offshore Drilling Rigs', 'Jack-Up Platforms', 'FPSO Vessels', 'Subsea Telemetry'],
    is_quote_only: true
  }
];

let quoteBasket = [];
let cartBasket = JSON.parse(localStorage.getItem('keyan_cart') || '[]');

const KEYAN_WHATSAPP_NUMBER = '919825206341';

function isCustomerAuthenticated() {
  return Boolean(localStorage.getItem('keyan_api_token'));
}

function isProductQuoteOnly(product) {
  return Boolean(product && (product.is_quote_only || String(product.availability || '').trim().toLowerCase() === 'available on request'));
}

function requireCustomerAuth(returnPath = 'checkout.html') {
  if (isCustomerAuthenticated()) return true;

  const safeReturnPath = String(returnPath || 'checkout.html').replace(/^\/+/, '');
  window.location.href = `login.html?return=${encodeURIComponent(safeReturnPath)}`;
  return false;
}

function saveCartToStorage() {
  localStorage.setItem('keyan_cart', JSON.stringify(cartBasket));
  updateCartBadgeCount();
}

function updateCartBadgeCount() {
  const count = cartBasket.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('quoteCartCount');
  if (badge) {
    badge.innerText = count;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts('all');
  initTabs();
  initSearchAutocomplete();
  initScrollReveal();
  initUniversalMotion();
  syncCatalogFromBackend();
  initBusinessContactActions();
});

async function syncCatalogFromBackend() {
  try {
    const payload = await window.keyanApiRequest('/products?per_page=60');
    const remoteProducts = Array.isArray(payload.data) ? payload.data : [];
    if (!remoteProducts.length) return;

    CATALOG_ITEMS = remoteProducts;
    const quoteOnlyIds = new Set(remoteProducts.filter(isProductQuoteOnly).map(product => product.id));
    const filteredCart = cartBasket.filter(item => !quoteOnlyIds.has(item.id));
    if (filteredCart.length !== cartBasket.length) {
      cartBasket = filteredCart;
      saveCartToStorage();
    }
    renderFeaturedProducts('all');
    if (typeof window.applyCatalogueFilters === 'function') window.applyCatalogueFilters();
    window.dispatchEvent(new CustomEvent('keyan:catalog-updated'));
  } catch (error) {
    // The existing in-page catalogue remains available when the API is offline.
    console.info('Keyan API unavailable; using the local catalogue.', error.message);
  }
}

/*
 * Universal interaction layer.
 * Page-specific files can keep their own visual language; this adds a shared
 * depth response to every existing and dynamically-rendered surface.
 */
function initUniversalMotion() {
  if (document.body.classList.contains('no-hover-page')) return;
  const disableCardRotation = document.body.classList.contains('no-card-rotation');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sectionObserver = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -70px 0px', threshold: 0.08 })
    : null;
  const surfaceSelector = [
    '.explore-featured-hero', '.explore-split-card', '.explore-bottom-banner',
    '.industry-card-premium', '.product-card-clean', '.benefit-card-animated',
    '.rfq-conversion-banner', '.brand-strip-tile', '.brand-chip',
    '.cat-image-panel-wrap', '.cat-info-panel-wrap', '.b2b-product-card',
    '.cat-brand-pill', '.cat-finder-quick-btn', '.cat-preview-container',
    '.cat-discovery-filter-card', '.cat-cta-contact-box', '.ind-stat-card',
    '.ind-sector-card', '.ind-cap-card', '.ind-rfq-card', '.cnt-main-card',
    '.cnt-info-card', '.cnt-dark-card', '.built-map-box', '.location-info-box',
    '.location-map-wrapper', '.cta-box-wrapper', '.pd-gallery-container',
    '.pd-info-container', '.pd-main-img-stage', '.pd-price-card',
    '.pd-purchasing-box', '.pd-trust-strip', '.pd-trust-item',
    '.pd-tab-content-panel', '.pd-rfq-card', '.prod-filter-card', '.prod-card',
    '.chk-form-card', '.chk-review-card',
    '.chk-pay-option-card', '.cart-items-card', '.cart-summary-card',
    '.cart-item-row', '.portal-feature-item', '.portal-quote-card', '.sso-tile-btn',
    '.form-container-wide', '.timeline-card', '.route-step', '.why-card', '.dna-panel',
    '.ecosystem-detail-card', '.eco-nav-item', '.eco-chip', '.hud-vertical-item',
    '.cat-tag-pill', '.cat-nav-item', '.pd-thumb-box', '.chk-step-box',
    '.chk-form-group', '.cnt-input-group', '.qv-modal-card', '.prod-depth-card',
    '.map-route-bar', '.location-detail-list', '.brand-marquee-row'
  ].join(',');

  const applyMotion = (root = document) => {
    const find = selector => {
      const elements = [];
      if (root.nodeType === 1 && root.matches(selector)) elements.push(root);
      elements.push(...root.querySelectorAll(selector));
      return elements;
    };

    find('section:not(.reveal-on-scroll):not(.reveal-from-left):not(.reveal-from-right):not(.reveal-from-bottom):not(.reveal-from-top):not(.reveal-3d-pop)').forEach((section, index) => {
      section.classList.add('motion-section');
      section.style.setProperty('--motion-delay', `${Math.min(index * 70, 420)}ms`);
      if (sectionObserver) sectionObserver.observe(section);
      else section.classList.add('motion-visible');
    });

    find(surfaceSelector).forEach(surface => {
      if (surface.dataset.motionReady === 'true') return;
      surface.dataset.motionReady = 'true';
      surface.classList.add('motion-surface');
      if (disableCardRotation) surface.classList.add('no-card-rotation-surface');

      if (reduceMotion) return;

      surface.addEventListener('pointermove', event => {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        const nearestSurface = event.target && event.target.closest
          ? event.target.closest('.motion-surface')
          : surface;
        if (nearestSurface !== surface) {
          surface.style.setProperty('--motion-rotate-y', '0deg');
          surface.style.setProperty('--motion-rotate-x', '1.5deg');
          return;
        }
        const bounds = surface.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        surface.style.setProperty('--motion-rotate-y', `${(x * 5).toFixed(2)}deg`);
        surface.style.setProperty('--motion-rotate-x', `${(-y * 5).toFixed(2)}deg`);
      });

      surface.addEventListener('pointerleave', () => {
        surface.style.setProperty('--motion-rotate-y', '0deg');
        surface.style.setProperty('--motion-rotate-x', '1.5deg');
      });
    });

    find('button, a[href]').forEach(action => {
      if (!action.dataset.motionAction && !action.closest('.motion-surface')) {
        action.dataset.motionAction = 'true';
        action.classList.add('motion-action');
      }
    });
  };

  applyMotion();

  // Product cards and shared header/footer components can be inserted after
  // the initial page load, so keep the same effects on new content.
  if ('MutationObserver' in window) {
    const motionObserver = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === 1) applyMotion(node);
      }));
    });
    motionObserver.observe(document.body, { childList: true, subtree: true });
  }
}

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
    <div class="product-card-clean" onclick="if (!event.target.closest('button, a')) window.location.href = 'product-detail.html?id=${p.id}'" style="cursor: pointer;">
      <div class="product-img-stage">
        <a href="product-detail.html?id=${p.id}" class="product-img-link" style="display:flex; width:100%; height:100%; align-items:center; justify-content:center; text-decoration:none;">
          <img src="${p.img || 'iamges/hero.jpg'}" alt="${p.name}" class="product-photo" loading="lazy">
        </a>
      </div>

      <div class="product-info-wrap">
        <span class="product-meta-cat">${p.categoryName}</span>
        <h4 class="product-name-title"><a href="product-detail.html?id=${p.id}" style="color:inherit; text-decoration:none;">${p.name}</a></h4>
        <div class="product-brand-tag"><i class="fas fa-tag"></i> ${p.brand || 'Keyan Corporation'}</div>
        
        <div class="product-stock-status">
          <i class="fas fa-circle"></i> ${p.availability}
        </div>

        <div class="product-actions-group">
          ${isProductQuoteOnly(p)
            ? `<button class="btn-card-quote btn-card-quote-only" onclick="event.stopPropagation(); requestProductQuote('${p.id}')" title="Request Quote"><i class="fas fa-file-signature"></i> Request Quote</button>`
            : `<button class="btn-card-buy" onclick="event.stopPropagation(); handleBuyNow('${p.id}')" title="Buy Now"><i class="fas fa-bolt"></i> Buy Now</button>`}
        </div>
      </div>
    </div>
  `).join('');
}

function handleBuyNow(productId) {
  const item = CATALOG_ITEMS.find(p => p.id === productId);
  if (!item) return;
  if (isProductQuoteOnly(item)) {
    requestProductQuote(productId);
    return;
  }
  const existing = cartBasket.find(cartItem => cartItem.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cartBasket.push({
      id: item.id,
      sku: item.sku,
      name: item.name,
      brand: item.brand,
      category: item.category,
      categoryName: item.categoryName,
      shortDesc: item.shortDesc,
      availability: item.availability,
      price_usd: item.price_usd,
      img: item.img,
      qty: 1
    });
  }
  saveCartToStorage();
  showToast(`"${item.name}" added to your cart.`);
  window.location.href = 'cart.html';
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

// Send a product-card quote request directly to the Contact Us form.
function requestProductQuote(productId) {
  let item = CATALOG_ITEMS.find(product => product.id === productId);

  // Category-page products live in categories.js, so use that catalogue when
  // the request originated from the category discovery cards.
  if (!item && typeof ALL_DISCOVERY_PRODUCTS !== 'undefined') {
    item = ALL_DISCOVERY_PRODUCTS.find(product => product.id === productId);
  }

  if (!item) {
    window.location.href = 'contact.html?quote=1#contactFormMain';
    return;
  }

  const quoteRequest = {
    id: item.id,
    name: item.name,
    sku: item.sku || '',
    brand: item.brand || '',
    category: item.categoryName || item.category || '',
    specs: item.specs || ''
  };

  sessionStorage.setItem('keyan_quote_request', JSON.stringify(quoteRequest));
  const quotePath = `contact.html?quote=${encodeURIComponent(item.id)}#contactFormMain`;
  if (!isCustomerAuthenticated()) {
    window.location.href = `login.html?return=${encodeURIComponent(quotePath)}`;
    return;
  }

  window.location.href = quotePath;
}

function updateQuoteBadge() {
  const stored = localStorage.getItem('keyan_cart');
  const cart = stored ? JSON.parse(stored) : quoteBasket;
  const count = cart.reduce((sum, i) => sum + (i.qty || 1), 0);

  const badge = document.getElementById('quoteCartCount');
  if (badge) badge.innerText = count;
  const headerBadge = document.getElementById('cartHeaderBadge');
  if (headerBadge) headerBadge.innerText = count;
}

function openQuoteDrawer() {
  const modal = document.getElementById('quoteDrawerModal');
  const body = document.getElementById('quoteDrawerItems');
  if (!modal || !body) return;

  const stored = localStorage.getItem('keyan_cart');
  const cart = stored ? JSON.parse(stored) : quoteBasket;

  if (cart.length === 0) {
    body.innerHTML = `
      <div style="text-align:center; padding: 2.5rem 1rem; color: #94A3B8;">
        <i class="fas fa-shopping-basket" style="font-size: 2.8rem; color: #FF7A18; margin-bottom: 1rem;"></i>
        <h4 style="color: #FFFFFF; font-weight: 800; font-size: 1.2rem; margin-bottom: 0.5rem;">Your Cart & Quote Basket is Empty</h4>
        <p style="font-size: 0.88rem; color: #94A3B8; margin-bottom: 1.5rem;">Select products from the catalogue to generate a formal quote or place an order.</p>
        <a href="products.html" class="btn btn-orange" style="display: inline-flex; width: auto;" onclick="closeModal('quoteDrawerModal')">
          <i class="fas fa-boxes"></i> Explore Products Catalogue
        </a>
      </div>
    `;
  } else {
    let subtotal = 0;
    const itemsHTML = cart.map((item, index) => {
      const price = parseFloat(item.price_usd || item.price || 125.00);
      const lineTotal = price * (item.qty || 1);
      subtotal += lineTotal;
      const imgSrc = item.img || item.image || 'iamges/prod_gas_detector.jpg';

      return `
        <div class="drawer-cart-item">
          <img src="${imgSrc}" alt="${item.name}" class="drawer-item-img">
          
          <div class="drawer-item-info">
            <div class="drawer-item-sku">SKU: ${item.sku || 'KEY-PROD-' + (index + 1)}</div>
            <h5 class="drawer-item-title">${item.name}</h5>
            <div class="drawer-item-unit-price">$${price.toFixed(2)} USD / Unit</div>
          </div>

          <div class="drawer-item-actions">
            <div class="drawer-item-qty">
              <button onclick="changeDrawerQty(${index}, -1)">−</button>
              <span>${item.qty || 1}</span>
              <button onclick="changeDrawerQty(${index}, 1)">+</button>
            </div>
            <div class="drawer-item-subtotal">
              <div class="total-amount">$${lineTotal.toFixed(2)}</div>
              <div class="total-curr">USD</div>
            </div>
            <button onclick="removeFromQuote(${index})" class="drawer-item-remove" title="Remove Item">
              <i class="fas fa-trash-alt" style="font-size: 0.8rem;"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    body.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        ${itemsHTML}
        <div class="drawer-basket-total-box">
          <span style="font-weight: 700; color: #CBD5E1; font-size: 0.9rem;">ESTIMATED BASKET TOTAL:</span>
          <span style="font-weight: 900; color: #FF7A18; font-size: 1.3rem; font-family: monospace;">$${subtotal.toFixed(2)} USD</span>
        </div>
      </div>
    `;
  }
  openModal('quoteDrawerModal');
}

function changeDrawerQty(index, delta) {
  let stored = localStorage.getItem('keyan_cart');
  let cart = stored ? JSON.parse(stored) : quoteBasket;
  if (cart[index]) {
    cart[index].qty = Math.max(1, (cart[index].qty || 1) + delta);
    localStorage.setItem('keyan_cart', JSON.stringify(cart));
    quoteBasket = cart;
    updateQuoteBadge();
    openQuoteDrawer();
  }
}

function removeFromQuote(index) {
  let stored = localStorage.getItem('keyan_cart');
  let cart = stored ? JSON.parse(stored) : quoteBasket;
  if (cart[index]) {
    showToast(`Removed "${cart[index].name}" from basket.`);
    cart.splice(index, 1);
    localStorage.setItem('keyan_cart', JSON.stringify(cart));
    quoteBasket = cart;
    updateQuoteBadge();
    openQuoteDrawer();
  }
}

function initSearchAutocomplete() {
  // Silent autocomplete initialization - no toast popups on search
}

function handleSearchSubmit(event) {
  if (event) event.preventDefault();
  let term = '';
  if (event && event.target) {
    const input = event.target.querySelector('input[name="q"]') ||
      event.target.querySelector('input[type="text"]') ||
      document.getElementById('headerSearchInput');
    if (input) term = input.value.trim();
  }
  if (!term) {
    const headerInput = document.getElementById('headerSearchInput');
    if (headerInput) term = headerInput.value.trim();
  }

  if (term) {
    window.location.href = `products.html?q=${encodeURIComponent(term)}`;
  } else {
    window.location.href = `products.html`;
  }
}

function handleHeroSearchSubmit(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('heroSearchInput');
  const term = input ? input.value.trim() : '';

  if (term) {
    window.location.href = `products.html?q=${encodeURIComponent(term)}`;
  } else {
    window.location.href = `products.html`;
  }
}

function quickSearchTag(tag) {
  if (tag) {
    window.location.href = `products.html?q=${encodeURIComponent(tag)}`;
  }
}

function openModal(id) {
  if (id === 'quoteModal' && !document.body.classList.contains('cnt-page-body')) {
    window.location.href = 'contact.html?inquiry=1#contactFormMain';
    return;
  }
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

function handleFormSubmit(event, title) {
  event.preventDefault();
  const form = event.target;
  const inputs = [...form.querySelectorAll('input, textarea, select')].filter(field => field.value.trim());
  const email = form.querySelector('input[type="email"]')?.value.trim() || '';
  const phone = form.querySelector('input[type="tel"]')?.value.trim() || '';
  const textInputs = [...form.querySelectorAll('input[type="text"]')].map(field => field.value.trim()).filter(Boolean);
  const messageField = form.querySelector('textarea');
  const details = inputs
    .filter(field => field !== messageField && field.type !== 'email' && field.type !== 'tel')
    .map(field => `${field.previousElementSibling?.innerText || field.placeholder || 'Requirement'}: ${field.value.trim()}`);

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;

  const request = {
    first_name: textInputs[0] || '',
    company_name: textInputs[1] || '',
    email,
    phone,
    subject: title,
    message: [details.join('\n'), messageField?.value.trim() || ''].filter(Boolean).join('\n\n') || title,
    source: 'website-modal'
  };

  window.keyanApiRequest('/quote-requests', {
    method: 'POST',
    body: JSON.stringify(request)
  }).then(payload => {
    const reference = payload.data?.reference ? ` Reference: ${payload.data.reference}.` : '';
    showToast(`Thank you! Your ${title} has been submitted.${reference}`);
    form.reset();
    const activeModal = form.closest('.modal-backdrop');
    if (activeModal) activeModal.classList.remove('active');
  }).catch(error => {
    showToast(error.message || 'We could not submit your request. Please try again.');
  }).finally(() => {
    if (submitButton) submitButton.disabled = false;
  });
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

// Component Loader for Header & Footer
document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNavLinks();
  loadExternalComponents();
});

function loadExternalComponents() {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer && !headerContainer.innerHTML.trim()) {
    fetch('header.html')
      .then(res => res.text())
      .then(data => {
        headerContainer.innerHTML = data;
        highlightActiveNavLinks();
        updateCartBadgeCount();
        updateCustomerHeader();
        initBusinessContactActions();
      })
      .catch(err => console.log('Header load error:', err));
  } else {
    highlightActiveNavLinks();
    updateCartBadgeCount();
    updateCustomerHeader();
    initBusinessContactActions();
  }

  const footerContainer = document.getElementById('footer-container');
  if (footerContainer && !footerContainer.innerHTML.trim()) {
    fetch('footer.html')
      .then(res => res.text())
      .then(data => {
        footerContainer.innerHTML = data;
        initBusinessContactActions();
      })
      .catch(err => console.log('Footer load error:', err));
  }
}

function initBusinessContactActions() {
  document.querySelectorAll('.utility-right, .mobile-nav-contact').forEach(container => {
    if (container.querySelector('[data-keyan-secondary-phone], a[href="tel:+919825206341"]')) return;

    const phoneLink = document.createElement('a');
    phoneLink.href = 'tel:+919825206341';
    phoneLink.dataset.keyanSecondaryPhone = 'true';
    phoneLink.innerHTML = '<i class="fas fa-phone-alt"></i> +91 9825206341';
    const gstin = container.querySelector('.utility-gstin');
    if (gstin) gstin.before(phoneLink);
    else container.appendChild(phoneLink);
  });

  if (document.querySelector('.keyan-whatsapp-float')) return;

  const whatsappLink = document.createElement('a');
  whatsappLink.className = 'keyan-whatsapp-float';
  whatsappLink.href = `https://wa.me/${KEYAN_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Keyan Corporation, I need help with a product or quotation.')}`;
  whatsappLink.target = '_blank';
  whatsappLink.rel = 'noopener noreferrer';
  whatsappLink.setAttribute('aria-label', 'Chat with Keyan Corporation on WhatsApp');
  whatsappLink.innerHTML = '<i class="fab fa-whatsapp"></i><span>WhatsApp Us</span>';
  document.body.appendChild(whatsappLink);
}

async function updateCustomerHeader() {
  const accountLinks = document.querySelectorAll('.tool-item[href="login.html"], .mobile-nav-actions a[href="login.html"]');
  const accountButtons = document.querySelectorAll('.header-rfq-btn, .mobile-nav-actions .btn-orange');
  const customerChatLinks = document.querySelectorAll('.customer-chat-nav');
  const token = localStorage.getItem('keyan_api_token');
  let customer = null;
  let unreadMessages = 0;

  if (token && typeof window.keyanApiRequest === 'function') {
    try {
      const payload = await window.keyanApiRequest('/auth/me');
      customer = payload.data || null;
      const quotePayload = await window.keyanApiRequest('/quote-requests');
      unreadMessages = (quotePayload.data || []).reduce((total, quote) => total + Number(quote.unread_messages_count || 0), 0);
    } catch (error) {
      localStorage.removeItem('keyan_api_token');
    }
  }

  const label = customer ? (customer.name || 'Customer Details') : 'Login / Register';
  accountLinks.forEach(link => {
    link.title = customer ? 'View customer details' : 'Login or register';
    const text = link.querySelector('span:not(.tool-badge)');
    if (text) text.textContent = customer ? 'Account' : 'Account';
  });
  accountButtons.forEach(button => {
    button.innerHTML = `<i class="fas fa-user-circle"></i> ${label}`;
    button.onclick = () => {
      if (typeof closeMobileNav === 'function') closeMobileNav();
    window.location.href = customer ? 'customer-portal.html' : 'login.html';
    };
  });
  customerChatLinks.forEach(link => {
    link.href = customer ? 'customer-portal.html' : 'login.html?return=customer-portal.html';
    link.classList.toggle('has-new-request', unreadMessages > 0);
    link.querySelectorAll('[data-chat-unread-badge]').forEach(badge => {
      badge.textContent = unreadMessages;
      badge.hidden = unreadMessages === 0;
    });
    link.querySelectorAll('[data-chat-new-label]').forEach(label => { label.hidden = unreadMessages === 0; });
  });
}

// Keep the red unread indicator current while the customer browses the catalogue.
setInterval(() => {
  if (document.querySelector('.customer-chat-nav')) updateCustomerHeader();
}, 30000);

function updateCartBadgeCount() {
  const stored = localStorage.getItem('keyan_cart');
  const cart = stored ? JSON.parse(stored) : [];
  const totalCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const cartHeaderBadge = document.getElementById('cartHeaderBadge');
  if (cartHeaderBadge) {
    cartHeaderBadge.textContent = totalCount;
  }
  const quoteCartCount = document.getElementById('quoteCartCount');
  if (quoteCartCount) {
    quoteCartCount.textContent = totalCount;
  }
}

function highlightActiveNavLinks() {
  const path = window.location.pathname.toLowerCase();
  const isAbout = path.includes('about.html');
  const isCategories = path.includes('categories.html');
  const isProducts = path.includes('products.html');
  const isIndustries = path.includes('industries.html');
  const isContact = path.includes('contact.html');
  const isHome = (path.includes('index.html') || path.endsWith('/') || path === '') && !isAbout && !isCategories && !isProducts && !isIndustries && !isContact;

  const homeLink = document.getElementById('nav-link-home');
  const aboutLink = document.getElementById('nav-link-about');
  const catLink = document.getElementById('nav-link-categories');
  const prodLink = document.getElementById('nav-link-products');
  const indLink = document.getElementById('nav-link-industries');
  const cntLink = document.getElementById('nav-link-contact');
  const mobHomeLink = document.getElementById('nav-mob-home');
  const mobAboutLink = document.getElementById('nav-mob-about');
  const mobCatLink = document.getElementById('nav-mob-categories');
  const mobProdLink = document.getElementById('nav-mob-products');
  const mobIndLink = document.getElementById('nav-mob-industries');
  const mobCntLink = document.getElementById('nav-mob-contact');

  [homeLink, aboutLink, catLink, prodLink, indLink, cntLink, mobHomeLink, mobAboutLink, mobCatLink, mobProdLink, mobIndLink, mobCntLink].forEach(link => {
    if (link) link.classList.remove('active');
  });

  if (isAbout) {
    if (aboutLink) aboutLink.classList.add('active');
    if (mobAboutLink) mobAboutLink.classList.add('active');
  } else if (isCategories) {
    if (catLink) catLink.classList.add('active');
    if (mobCatLink) mobCatLink.classList.add('active');
  } else if (isProducts) {
    if (prodLink) prodLink.classList.add('active');
    if (mobProdLink) mobProdLink.classList.add('active');
  } else if (isIndustries) {
    if (indLink) indLink.classList.add('active');
    if (mobIndLink) mobIndLink.classList.add('active');
  } else if (isContact) {
    if (cntLink) cntLink.classList.add('active');
    if (mobCntLink) mobCntLink.classList.add('active');
  } else if (isHome) {
    if (homeLink) homeLink.classList.add('active');
    if (mobHomeLink) mobHomeLink.classList.add('active');
  }
}

/**
 * KEYAN CORPORATION - 2026 Trend-Forward B2B Procurement Marketplace Logic
 */

// B2B Catalogue Products with USD Pricing & Technical Specifications
const CATALOG_ITEMS = [
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
            <div class="drawer-item-sku">SKU: ${item.sku || 'KEY-PROD-' + (index+1)}</div>
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
      })
      .catch(err => console.log('Header load error:', err));
  } else {
    highlightActiveNavLinks();
    updateCartBadgeCount();
  }

  const footerContainer = document.getElementById('footer-container');
  if (footerContainer && !footerContainer.innerHTML.trim()) {
    fetch('footer.html')
      .then(res => res.text())
      .then(data => {
        footerContainer.innerHTML = data;
      })
      .catch(err => console.log('Footer load error:', err));
  }
}

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



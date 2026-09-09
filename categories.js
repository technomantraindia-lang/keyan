/**
 * KEYAN CORPORATION — CATEGORIES PAGE INTERACTIVE LOGIC
 * Master Catalogue Dataset & B2B Ecommerce Interactive Controllers
 */

// Master Category & Product Catalogue Database
const CATEGORIES_MASTER = [
  {
    id: 'marine-ship-supply',
    num: '01',
    name: 'MARINE & SHIP SUPPLY',
    shortDesc: 'Marine equipment and essential supplies for vessel, shipboard, and port requirements.',
    img: 'iamges/marine and shipping.png',
    supplyClass: 'MARINE / VESSEL',
    application: 'SHIPBOARD & PORT',
    productCount: '11+ Approved Products',
    ctaText: 'EXPLORE MARINE SUPPLY →',
    items: [
      'Navigation Lights', 'IMO Symbols', 'Daylight Signaling Lamp', 'Lifebuoy',
      'Lifebuoy Light', 'Life Jacket & Light', 'Pilot Ladder', 'Anchor',
      'Clinometer', 'Marine Aneroid Barometer', 'Nautical Sextant'
    ],
    featuredProducts: [
      {
        id: 'cat-m1',
        name: 'Marine Bronze Flanged Globe Valve DN100',
        brand: 'Sikla / SOLAS',
        category: 'marine-ship-supply',
        categoryName: 'Marine & Ship Supply',
        img: 'iamges/prod_valve.jpg',
        availability: 'Available on Request',
        specs: 'Class Approved | RG5 Bronze Marine Standard'
      },
      {
        id: 'cat-m2',
        name: 'SOLAS Approved Inflatable Life Jacket (275N)',
        brand: 'Unitor / SOLAS',
        category: 'marine-ship-supply',
        categoryName: 'Marine & Ship Supply',
        img: 'iamges/prod_lifejacket.jpg',
        availability: 'Available on Request',
        specs: 'MED Certified | Dual Chamber Auto-Inflate'
      },
      {
        id: 'cat-m3',
        name: 'Nautical Sextant & Precision Marine Barometer',
        brand: 'Consilium',
        category: 'marine-ship-supply',
        categoryName: 'Marine & Ship Supply',
        img: 'iamges/ship_supplier.jpg',
        availability: 'Available on Request',
        specs: 'High Precision Navigation & Weather Instrument'
      },
      {
        id: 'cat-m4',
        name: 'Pilot Ladder Heavy Duty SOLAS Standard',
        brand: 'SOLAS',
        category: 'marine-ship-supply',
        categoryName: 'Marine & Ship Supply',
        img: 'iamges/marine and shipping.png',
        availability: 'Available on Request',
        specs: 'Hardwood Steps | ISO 799 Compliant'
      }
    ]
  },
  {
    id: 'fire-safety',
    num: '02',
    name: 'FIRE & SAFETY EQUIPMENT',
    shortDesc: 'Certified firefighting suits, hoses, valves, and emergency containment systems.',
    img: 'iamges/fire_safety.jpg',
    supplyClass: 'FIRE SAFETY',
    application: 'INDUSTRIAL & OFFSHORE',
    productCount: '9+ Certified Products',
    ctaText: 'EXPLORE FIRE & SAFETY →',
    items: [
      'Fire Suit', 'Fire Hose Pipe', 'Fire Hose Coupling', 'Fire Hose Box',
      'Fire Hydrant Valve', 'Fire Blanket', 'Fire ABC Powder', 'Fire Hose Nozzle',
      'Rechargeable Safety Hand Lamps'
    ],
    featuredProducts: [
      {
        id: 'cat-f1',
        name: 'Heavy Duty Fire Hose & Couplings (2.5")',
        brand: 'Scott / Fire Guard',
        category: 'fire-safety',
        categoryName: 'Fire & Safety Equipment',
        img: 'iamges/fire.png',
        availability: 'Available on Request',
        specs: 'Synthetic Rubber Lined | High Burst Pressure'
      },
      {
        id: 'cat-f2',
        name: 'Nomex Pro Heavy Duty Firefighting Suit',
        brand: 'Tyco Safety',
        category: 'fire-safety',
        categoryName: 'Fire & Safety Equipment',
        img: 'iamges/fire_safety.jpg',
        availability: 'Available on Request',
        specs: 'EN469 Certified | Thermal Barrier Protective Wear'
      },
      {
        id: 'cat-f3',
        name: 'Rechargeable Explosive-Proof Safety Hand Lamp',
        brand: 'Apollo',
        category: 'fire-safety',
        categoryName: 'Fire & Safety Equipment',
        img: 'iamges/prod_scba.jpg',
        availability: 'Available on Request',
        specs: 'ATEX Zone 1 Certified | High Power LED'
      }
    ]
  },
  {
    id: 'breathing-air',
    num: '03',
    name: 'BREATHING AIR & RESPIRATORY SAFETY',
    shortDesc: 'Life-critical SCBA systems, EEBD emergency escape devices, and air quality kits.',
    img: 'iamges/prod_scba.jpg',
    supplyClass: 'RESPIRATORY',
    application: 'HAZARDOUS ATMOSPHERE',
    productCount: '12+ Life-Saving Products',
    ctaText: 'EXPLORE RESPIRATORY →',
    items: [
      'Breathing Air Compressor & Spares', 'Self-Contained Breathing Apparatus',
      'Emergency Escape Breathing Device', 'Breathing Air Quality Test Kit',
      'Airline Breathing Apparatus', 'Emergency Oxygen Pack', 'Chemical Protective Suit',
      'Immersion Suit', 'Immersion Suit Test Kit', 'Full Face Gas Mask Respirator',
      'Half Face Gas Mask Respirator', 'Disposable Kitchen Suit'
    ],
    featuredProducts: [
      {
        id: 'cat-b1',
        name: 'SCBA Air Breathing Apparatus System',
        brand: 'MSA Safety',
        category: 'breathing-air',
        categoryName: 'Breathing Air & Respiratory',
        img: 'iamges/prod_scba.jpg',
        availability: 'Available on Request',
        specs: '300 Bar Carbon Composite Cylinder | Ergonomic Harness'
      },
      {
        id: 'cat-b2',
        name: 'EEBD Emergency Escape Breathing Device (15 Min)',
        brand: 'Dräger',
        category: 'breathing-air',
        categoryName: 'Breathing Air & Respiratory',
        img: 'iamges/prod_scba.jpg',
        availability: 'Available on Request',
        specs: 'SOLAS Approved | Positive Pressure Hood System'
      },
      {
        id: 'cat-b3',
        name: 'Chemical Protective Suit & Immersion Kit',
        brand: '3M / Solas',
        category: 'breathing-air',
        categoryName: 'Breathing Air & Respiratory',
        img: 'iamges/fire_safety.jpg',
        availability: 'Available on Request',
        specs: 'Gas-Tight Protective Suit | EN943 Type 1a'
      }
    ]
  },
  {
    id: 'gas-detection',
    num: '04',
    name: 'GAS DETECTION & INDUSTRIAL SAFETY',
    shortDesc: 'Precision multi-gas monitoring, tube sampling detectors, and flame sensors.',
    img: 'iamges/prod_gas_detector.jpg',
    supplyClass: 'GAS DETECTION',
    application: 'REFINERY & SHIP HOLD',
    productCount: '11+ Monitoring Devices',
    ctaText: 'EXPLORE GAS DETECTION →',
    items: [
      'Tube Type Gas Detector', 'Portable Multi Gas Detector', 'Gas Tubes',
      'Heat Detector', 'Smoke Detector', 'UV Flame Detector', 'Heat Detector Tester',
      'Smoke Detector Tester', 'UV Flame Detector Tester Light',
      'Solo Smoke & Heat Detector Test Kit', 'PPM Panel'
    ],
    featuredProducts: [
      {
        id: 'cat-g1',
        name: 'Portable Multi Gas Detector X-am 2500',
        brand: 'Dräger',
        category: 'gas-detection',
        categoryName: 'Gas Detection & Safety',
        img: 'iamges/prod_gas_detector.jpg',
        availability: 'Available on Request',
        specs: 'O2, H2S, CO, Ex Gas Sensor Suite | IP67 Water Resistant'
      },
      {
        id: 'cat-g2',
        name: 'Solo Smoke & Heat Detector Test Kit Set',
        brand: 'Apollo',
        category: 'gas-detection',
        categoryName: 'Gas Detection & Safety',
        img: 'iamges/prod_gas_detector.jpg',
        availability: 'Available on Request',
        specs: 'Telescopic Test Pole | Battery Powered Heat Generator'
      },
      {
        id: 'cat-g3',
        name: 'UV Flame Detector & Flame Sensor Tester Light',
        brand: 'Consilium',
        category: 'gas-detection',
        categoryName: 'Gas Detection & Safety',
        img: 'iamges/prod_transmitter.jpg',
        availability: 'Available on Request',
        specs: 'High Speed Optical Sensor | ATEX Explosion Proof'
      }
    ]
  },
  {
    id: 'industrial-machinery',
    num: '05',
    name: 'INDUSTRIAL MACHINERY & TOOLS',
    shortDesc: 'Pneumatic tools, diaphragm pumps, gas cutting torches, and scaling machines.',
    img: 'iamges/INDUSTRIAL & MFG].png',
    supplyClass: 'HEAVY MACHINERY',
    application: 'PLANT & SHIPYARD',
    productCount: '9+ Industrial Machinery Tools',
    ctaText: 'EXPLORE INDUSTRIAL EQUIPMENT →',
    items: [
      'Double Diaphragm Wilden Pump & Spares', 'Chain Drums for Scaling Machine',
      'Pneumatic Jet Chisel & Needles', 'Electric Portable Ventilators',
      'Unitor Gas Cutting Torch', 'Unitor Gas Regulator Set', 'Unitor Arrestors',
      'Compressed Air Electric Safety Light', 'AFT Water Mist System'
    ],
    featuredProducts: [
      {
        id: 'cat-im1',
        name: 'Air-Operated Double Diaphragm Pump (AODD)',
        brand: 'Wilden',
        category: 'industrial-machinery',
        categoryName: 'Industrial Machinery',
        img: 'iamges/prod_pump.jpg',
        availability: 'Available on Request',
        specs: 'Heavy-Duty Aluminum Body | 2" Flanged Port'
      },
      {
        id: 'cat-im2',
        name: 'Unitor Gas Cutting Torch & Regulator Set',
        brand: 'Unitor',
        category: 'industrial-machinery',
        categoryName: 'Industrial Machinery',
        img: 'iamges/INDUSTRIAL & MFG].png',
        availability: 'Available on Request',
        specs: 'Oxy-Acetylene Cutting Kit | Flashback Arrestors Included'
      },
      {
        id: 'cat-im3',
        name: 'Pneumatic Jet Chisel & Scaling Needles Unit',
        brand: 'Unitor',
        category: 'industrial-machinery',
        categoryName: 'Industrial Machinery',
        img: 'iamges/prod_pump.jpg',
        availability: 'Available on Request',
        specs: 'Shipboard De-Rusting Chisel | 4000 BPM Impact Rate'
      }
    ]
  },
  {
    id: 'industrial-consumables',
    num: '06',
    name: 'INDUSTRIAL CONSUMABLES & MAINTENANCE',
    shortDesc: 'High-performance engineering sealants, anti-splashing tapes, and Belzona composites.',
    img: 'iamges/consumables.jpg',
    supplyClass: 'CONSUMABLES',
    application: 'MAINTENANCE & REPAIR',
    productCount: '10+ Essential Repair Items',
    ctaText: 'EXPLORE CONSUMABLES →',
    items: [
      'Gasket Sealant', 'Kolorkut Water Finding Paste', 'Molykote Products',
      'Cordobond', 'Belzona', 'Anti-Seize Compound', 'Anti-Splashing Tape',
      'Pipe Repair Kit', 'Oil Tape', 'Medium Tape Roll'
    ],
    featuredProducts: [
      {
        id: 'cat-c1',
        name: 'Belzona High-Performance Epoxy Composite Compound',
        brand: 'Belzona',
        category: 'industrial-consumables',
        categoryName: 'Industrial Consumables',
        img: 'iamges/consumables.jpg',
        availability: 'Available on Request',
        specs: 'Metal Repair & Surface Coating Paste'
      },
      {
        id: 'cat-c2',
        name: 'Kolorkut Water Finding Paste & Oil Paste',
        brand: 'Permatex',
        category: 'industrial-consumables',
        categoryName: 'Industrial Consumables',
        img: 'iamges/consumables.jpg',
        availability: 'Available on Request',
        specs: 'Instant Color Change Water Level Gauge Paste'
      },
      {
        id: 'cat-c3',
        name: 'Anti-Splashing Pipe Repair Tape Kit',
        brand: 'Molykote',
        category: 'industrial-consumables',
        categoryName: 'Industrial Consumables',
        img: 'iamges/consumables.jpg',
        availability: 'Available on Request',
        specs: 'SOLAS Safety High Pressure Pipe Wrap'
      }
    ]
  },
  {
    id: 'marine-rescue',
    num: '07',
    name: 'MARINE RESCUE & LIFE-SAVING',
    shortDesc: 'SOLAS approved rescue boats, inflatable liferafts, and marine lifebuoys.',
    img: 'iamges/offshore and rig.png',
    supplyClass: 'LIFE-SAVING',
    application: 'VESSEL SAFETY',
    productCount: '7+ SOLAS Rescue Items',
    ctaText: 'EXPLORE RESCUE EQUIPMENT →',
    items: [
      'Rescue Boat', 'Liferaft', 'Lifebuoy', 'Lifebuoy Light',
      'Life Jacket & Light', 'Pilot Ladder', 'Anchor'
    ],
    featuredProducts: [
      {
        id: 'cat-r1',
        name: 'SOLAS Approved Inflatable Throwover Liferaft',
        brand: 'SOLAS / Unitor',
        category: 'marine-rescue',
        categoryName: 'Marine Rescue',
        img: 'iamges/offshore and rig.png',
        availability: 'Available on Request',
        specs: '25-Person Emergency Capacity | Insulated Canopy'
      },
      {
        id: 'cat-r2',
        name: 'Rigid SOLAS Marine Lifebuoy & Self-Igniting Light',
        brand: 'SOLAS',
        category: 'marine-rescue',
        categoryName: 'Marine Rescue',
        img: 'iamges/prod_lifejacket.jpg',
        availability: 'Available on Request',
        specs: '4.3kg Polyethylene Ring | Floating Lanyard Included'
      },
      {
        id: 'cat-r3',
        name: 'Fast Rescue Boat & Davit Launching System',
        brand: 'Unitor',
        category: 'marine-rescue',
        categoryName: 'Marine Rescue',
        img: 'iamges/ship_supplier.jpg',
        availability: 'Available on Request',
        specs: 'Diesel Outboard Powered | SOLAS Approved Hull'
      }
    ]
  },
  {
    id: 'marine-instruments',
    num: '08',
    name: 'MARINE & INDUSTRIAL INSTRUMENTS',
    shortDesc: 'Calibrators, pressure transmitters, level indicators, and marine aneroid barometers.',
    img: 'iamges/rig_instruments.jpg',
    supplyClass: 'INSTRUMENTATION',
    application: 'PROCESS & NAVIGATION',
    productCount: '9+ Precision Instruments',
    ctaText: 'EXPLORE INSTRUMENTS →',
    items: [
      'Temperature Calibration', 'Temperature Calibrator', 'Liquid Level Indicator',
      'Marine Aneroid Barometer', 'Clinometer', 'Nautical Sextant', 'PPM Panel',
      'Oil Tape', 'Hammer H20'
    ],
    featuredProducts: [
      {
        id: 'cat-i1',
        name: 'Digital Marine Pressure Transmitter Gauge',
        brand: 'Consilium',
        category: 'marine-instruments',
        categoryName: 'Marine & Industrial Instruments',
        img: 'iamges/prod_transmitter.jpg',
        availability: 'Available on Request',
        specs: 'ATEX Certified | 4-20mA Signal Output'
      },
      {
        id: 'cat-i2',
        name: 'Offshore Rig Monitoring Control Telemetry Unit',
        brand: 'Apollo',
        category: 'marine-instruments',
        categoryName: 'Marine & Industrial Instruments',
        img: 'iamges/Offshore Rig Monitoring Control Telemetry.png',
        availability: 'Available on Request',
        specs: 'Multi-Channel Sensor Dashboard | Real-Time Telemetry'
      },
      {
        id: 'cat-i3',
        name: 'Precision Temperature Dry Block Calibrator Unit',
        brand: 'Consilium',
        category: 'marine-instruments',
        categoryName: 'Marine & Industrial Instruments',
        img: 'iamges/rig_instruments.jpg',
        availability: 'Available on Request',
        specs: 'Temperature Range -35°C to 650°C | Sub-Degree Accuracy'
      }
    ]
  }
];

// Flattened Catalog Items for Product Discovery Finder
let ALL_DISCOVERY_PRODUCTS = [];

document.addEventListener('DOMContentLoaded', () => {
  buildFlatProductCatalog();
  renderCategoryExperienceSections();
  initStickyNavScrollSpy();
  renderDiscoveryProducts(ALL_DISCOVERY_PRODUCTS);
  initDiscoveryFilters();
});

// Compile all products into single catalog array
function buildFlatProductCatalog() {
  ALL_DISCOVERY_PRODUCTS = [];
  CATEGORIES_MASTER.forEach(cat => {
    cat.featuredProducts.forEach(prod => {
      ALL_DISCOVERY_PRODUCTS.push(prod);
    });
  });
}

// 1. Render Alternating Category Sections
function renderCategoryExperienceSections() {
  const container = document.getElementById('categoriesExperienceWrapper');
  if (!container) return;

  container.innerHTML = CATEGORIES_MASTER.map((cat, index) => {
    const isReverse = index % 2 !== 0;

    return `
      <section id="${cat.id}" class="cat-experience-section">
        <div class="container">
          
          <div class="cat-editorial-grid ${isReverse ? 'reverse' : ''}">
            
            <!-- Image Panel -->
            <div class="cat-image-panel-wrap">
              <img src="${cat.img}" alt="${cat.name}" class="cat-image-panel-img" loading="lazy">
              <div class="cat-image-panel-overlay"></div>
              
              <div class="cat-image-hud-bar">
                <div class="cat-hud-metric">
                  <span class="cat-hud-label">SUPPLY CLASS</span>
                  <span class="cat-hud-val">${cat.supplyClass}</span>
                </div>
                <div class="cat-hud-metric" style="text-align:right;">
                  <span class="cat-hud-label">APPLICATION</span>
                  <span class="cat-hud-val">${cat.application}</span>
                </div>
              </div>
            </div>

            <!-- Content Panel -->
            <div class="cat-info-panel-wrap">
              <div class="cat-hud-badge">
                <span class="dot"></span> KEYAN / CATEGORY / ${cat.num}
              </div>
              <div class="cat-section-num">${cat.num}</div>
              <h2 class="cat-category-title">${cat.name}</h2>
              <p class="cat-category-desc">${cat.shortDesc}</p>
              
              <!-- Items Chips List -->
              <div class="cat-item-tags-grid">
                ${cat.items.map(item => `
                  <span class="cat-item-chip"><i class="fas fa-check-circle"></i> ${item}</span>
                `).join('')}
              </div>

              <a href="products.html?category=${cat.id}" class="cat-explore-btn">
                SEE ${cat.name} PRODUCTS <i class="fas fa-arrow-right"></i>
              </a>
            </div>

          </div>

        </div>
      </section>
    `;
  }).join('');
}

// 2. Sticky Category Navigation ScrollSpy
function initStickyNavScrollSpy() {
  const links = document.querySelectorAll('.cat-nav-link');
  const sections = CATEGORIES_MASTER.map(c => document.getElementById(c.id)).filter(Boolean);

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// 3. Product Discovery Area Controller
function renderDiscoveryProducts(items) {
  const container = document.getElementById('discoveryProductsGrid');
  const counter = document.getElementById('discoveryCounter');
  if (!container) return;

  if (counter) {
    counter.innerText = `Showing ${items.length} product(s)`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 4rem 1rem; color: var(--cat-text-muted-dark);">
        <i class="fas fa-search" style="font-size: 2.5rem; color: var(--cat-orange); margin-bottom: 1rem;"></i>
        <h4>No matching industrial products found.</h4>
        <p>Try adjusting your search query or clear filters to view all products.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(p => `
    <div class="b2b-product-card">
      <div class="b2b-card-img-stage">
        <img src="${p.img}" alt="${p.name}" class="b2b-card-img" loading="lazy">
        <div class="b2b-quick-view-trigger">
          <button class="b2b-qv-btn" onclick="openQuickView('${p.id}')">
            <i class="fas fa-eye"></i> Quick View
          </button>
        </div>
      </div>
      <div class="b2b-card-content">
        <span class="b2b-card-brand-tag"><i class="fas fa-tag"></i> ${p.brand}</span>
        <h4 class="b2b-card-title"><a href="product-detail.html?id=${p.id}" style="color:inherit; text-decoration:none;">${p.name}</a></h4>
        <span class="b2b-card-status request-only"><i class="fas fa-info-circle"></i> ${p.availability}</span>
        
        <div class="b2b-card-actions">
          <button class="b2b-btn-quote" onclick="addToQuoteList('${p.id}')">
            <i class="fas fa-file-signature"></i> Request Quote
          </button>
          <button class="b2b-btn-buy" onclick="handleDirectBuy('${p.id}')" title="Immediate Purchase">
            <i class="fas fa-bolt"></i> Buy
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function initDiscoveryFilters() {
  const searchInput = document.getElementById('discoverySearch');
  const catSelect = document.getElementById('discoveryCatSelect');
  const brandSelect = document.getElementById('discoveryBrandSelect');
  const resetBtn = document.getElementById('discoveryResetBtn');

  function applyFilters() {
    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const catVal = catSelect ? catSelect.value : 'all';
    const brandVal = brandSelect ? brandSelect.value : 'all';

    const filtered = ALL_DISCOVERY_PRODUCTS.filter(p => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q);
      const matchCat = catVal === 'all' || p.category === catVal;
      const matchBrand = brandVal === 'all' || p.brand.toLowerCase().includes(brandVal.toLowerCase());
      return matchQ && matchCat && matchBrand;
    });

    renderDiscoveryProducts(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (catSelect) catSelect.addEventListener('change', applyFilters);
  if (brandSelect) brandSelect.addEventListener('change', applyFilters);
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (catSelect) catSelect.value = 'all';
      if (brandSelect) brandSelect.value = 'all';
      renderDiscoveryProducts(ALL_DISCOVERY_PRODUCTS);
    });
  }
}

function filterByCatId(catId) {
  const catSelect = document.getElementById('discoveryCatSelect');
  if (catSelect) {
    catSelect.value = catId;
    const searchInput = document.getElementById('discoverySearch');
    if (searchInput) searchInput.value = '';
    const brandSelect = document.getElementById('discoveryBrandSelect');
    if (brandSelect) brandSelect.value = 'all';
    
    const filtered = ALL_DISCOVERY_PRODUCTS.filter(p => p.category === catId);
    renderDiscoveryProducts(filtered);
  }
}

// 4. Quick View Modal Handler
function openQuickView(productId) {
  const item = ALL_DISCOVERY_PRODUCTS.find(p => p.id === productId);
  if (!item) return;

  const modal = document.getElementById('quickViewModal');
  const imgEl = document.getElementById('qvProductImg');
  const brandEl = document.getElementById('qvProductBrand');
  const titleEl = document.getElementById('qvProductTitle');
  const statusEl = document.getElementById('qvProductStatus');
  const specsEl = document.getElementById('qvProductSpecs');
  const quoteBtn = document.getElementById('qvQuoteBtn');

  const detailLink = document.getElementById('qvDetailLink');
  if (detailLink) detailLink.href = `product-detail.html?id=${item.id}`;

  if (imgEl) imgEl.src = item.img;
  if (brandEl) brandEl.innerText = item.brand;
  if (titleEl) titleEl.innerText = item.name;
  if (statusEl) statusEl.innerText = item.availability;
  if (specsEl) specsEl.innerText = item.specs;

  if (quoteBtn) {
    quoteBtn.onclick = () => {
      addToQuoteList(item.id);
      closeQuickView();
    };
  }

  if (modal) modal.classList.add('active');
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) modal.classList.remove('active');
}

// 5. Search Overlay Modal Logic
function openSearchOverlay() {
  const overlay = document.getElementById('searchOverlayModal');
  if (overlay) {
    overlay.classList.add('active');
    const input = document.getElementById('overlaySearchInput');
    if (input) {
      input.focus();
      handleOverlaySearch('');
    }
  }
}

function closeSearchOverlay() {
  const overlay = document.getElementById('searchOverlayModal');
  if (overlay) overlay.classList.remove('active');
}

function handleOverlaySearch(term) {
  const resultsContainer = document.getElementById('overlaySearchResults');
  if (!resultsContainer) return;

  const q = term.toLowerCase().trim();
  const matches = q
    ? ALL_DISCOVERY_PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q))
    : ALL_DISCOVERY_PRODUCTS.slice(0, 5);

  resultsContainer.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="openQuickView('${p.id}'); closeSearchOverlay();">
      <img src="${p.img}" alt="${p.name}" class="search-result-img">
      <div>
        <h5 style="font-family: var(--font-heading); color: var(--cat-navy-darkest); font-size: 0.95rem;">${p.name}</h5>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--cat-navy-mid);">${p.brand} • ${p.categoryName}</span>
      </div>
    </div>
  `).join('');
}

// Search bar submit handler
function handleHeroSearchSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('heroSearchInput');
  const val = input ? input.value.trim() : '';
  if (val) {
    const searchInput = document.getElementById('discoverySearch');
    if (searchInput) searchInput.value = val;
    const catSelect = document.getElementById('discoveryCatSelect');
    if (catSelect) catSelect.value = 'all';
    
    const filtered = ALL_DISCOVERY_PRODUCTS.filter(p => p.name.toLowerCase().includes(val.toLowerCase()) || p.brand.toLowerCase().includes(val.toLowerCase()));
    renderDiscoveryProducts(filtered);

    document.getElementById('discovery-area')?.scrollIntoView({ behavior: 'smooth' });
  }
}

function quickSearchTag(tagText) {
  const input = document.getElementById('heroSearchInput');
  if (input) {
    input.value = tagText;
    handleHeroSearchSubmit(new Event('submit'));
  }
}

// Integration with app.js quoteBasket
function addToQuoteList(productId) {
  if (typeof addToQuote === 'function') {
    addToQuote(productId);
  } else {
    alert('Product added to Quote List.');
  }
}

function handleDirectBuy(productId) {
  if (typeof handleBuyNow === 'function') {
    handleBuyNow(productId);
  } else {
    addToQuoteList(productId);
  }
}

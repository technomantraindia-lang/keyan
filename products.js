/**
 * KEYAN CORPORATION — PRODUCTS CATALOGUE INTERACTIVE LOGIC
 * Complete B2B Industrial Ecommerce Product Filtering & Routing
 */

let activeCategoryFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category') || 'all';
  const qParam = urlParams.get('q') || '';

  activeCategoryFilter = catParam;

  const searchInput = document.getElementById('filterSearch');
  if (searchInput && qParam) {
    searchInput.value = qParam;
  }

  const headerSearchInput = document.getElementById('headerSearchInput');
  if (headerSearchInput && qParam) {
    headerSearchInput.value = qParam;
  }

  initCategoryPillsNav();
  initProductFilters();
  syncCategoryFilterOptions();
  applyCatalogueFilters();
});

async function syncCategoryFilterOptions() {
  const select = document.getElementById('filterCatSelect');
  if (!select || typeof window.keyanApiRequest !== 'function') return;

  try {
    const payload = await window.keyanApiRequest('/categories');
    const categories = Array.isArray(payload.data) ? payload.data : [];
    if (!categories.length) return;

    const currentValue = select.value || activeCategoryFilter || 'all';
    select.innerHTML = '<option value="all">All Categories</option>' + categories.map(category =>
      `<option value="${escapeHtml(category.slug)}">${escapeHtml(category.name)}</option>`
    ).join('');
    select.value = categories.some(category => category.slug === currentValue) ? currentValue : 'all';
    activeCategoryFilter = select.value;
    applyCatalogueFilters();
  } catch (error) {
    console.info('Category filter API unavailable; using the local filter options.', error.message);
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[character]));
}

// Category Navigation Pill Tabs
function initCategoryPillsNav() {
  const pillBtns = document.querySelectorAll('.prod-cat-pill-btn');
  pillBtns.forEach(btn => {
    const catVal = btn.getAttribute('data-category');
    if (catVal === activeCategoryFilter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      pillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategoryFilter = catVal;

      const catSelect = document.getElementById('filterCatSelect');
      if (catSelect) catSelect.value = catVal;

      applyCatalogueFilters();
    });
  });

  const catSelect = document.getElementById('filterCatSelect');
  if (catSelect) catSelect.value = activeCategoryFilter;
}

// Master Catalogue Filter Engine
function applyCatalogueFilters() {
  const searchInput = document.getElementById('filterSearch');
  const catSelect = document.getElementById('filterCatSelect');
  const brandSelect = document.getElementById('filterBrandSelect');
  const sortSelect = document.getElementById('filterSortSelect');
  const counter = document.getElementById('prodResultsCounter');
  const grid = document.getElementById('productsCatalogGrid');

  if (!grid) return;

  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const catVal = catSelect ? catSelect.value : activeCategoryFilter;
  const brandVal = brandSelect ? brandSelect.value : 'all';
  const sortVal = sortSelect ? sortSelect.value : 'default';

  let filtered = CATALOG_ITEMS.filter(p => {
    const qLower = q.toLowerCase();
    const brand = p.brand || '';
    const matchQ = !q || 
      (p.name && p.name.toLowerCase().includes(qLower)) || 
      brand.toLowerCase().includes(qLower) || 
      (p.sku && p.sku.toLowerCase().includes(qLower)) || 
      (p.categoryName && p.categoryName.toLowerCase().includes(qLower)) ||
      (p.category && p.category.toLowerCase().includes(qLower)) ||
      (p.shortDesc && p.shortDesc.toLowerCase().includes(qLower)) ||
      (p.specs && p.specs.toLowerCase().includes(qLower));

    const matchCat = catVal === 'all' || p.category === catVal || getCategorySlug(p.categoryName) === catVal;
    const matchBrand = brandVal === 'all' || brand.toLowerCase().includes(brandVal.toLowerCase());
    return matchQ && matchCat && matchBrand;
  });

  // Sorting Logic
  if (sortVal === 'price-asc') {
    filtered.sort((a, b) => a.price_usd - b.price_usd);
  } else if (sortVal === 'price-desc') {
    filtered.sort((a, b) => b.price_usd - a.price_usd);
  } else if (sortVal === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Update Counter
  if (counter) {
    counter.innerText = `Showing ${filtered.length} B2B Product(s)`;
  }

  // Render Grid
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 4rem 1rem; color: var(--prod-text-muted);">
        <i class="fas fa-search" style="font-size: 2.8rem; color: var(--prod-orange); margin-bottom: 1rem;"></i>
        <h4 style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--prod-navy-darkest);">No matching products found.</h4>
        <p>Try clearing your search filters or select a different category above.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="prod-card">
      <div class="prod-card-img-stage">
        <a href="product-detail.html?id=${p.id}" style="display:contents;">
          <img src="${p.img || 'iamges/hero.jpg'}" alt="${p.name}" class="prod-card-img" loading="lazy">
        </a>
      </div>
      
      <div class="prod-card-body">
        <span class="prod-card-brand"><i class="fas fa-tag"></i> ${p.brand || 'Keyan Corporation'}</span>
        <h4 class="prod-card-title">
          <a href="product-detail.html?id=${p.id}">${p.name}</a>
        </h4>

        <div class="prod-card-price-row">
          <span class="prod-card-price-usd">$${p.price_usd.toFixed(2)}</span>
          <span class="prod-card-currency">USD</span>
        </div>

        <span class="prod-card-status ${p.availability.toLowerCase().includes('request') ? 'request-only' : ''}">
          <i class="fas fa-circle" style="font-size: 0.5rem; margin-right: 0.3rem;"></i> ${p.availability}
        </span>

        <div class="prod-card-actions">
          ${isProductQuoteOnly(p)
            ? `<button class="prod-btn-rfq prod-btn-rfq-only" onclick="requestProductQuote('${p.id}')" title="Request Quote"><i class="fas fa-file-signature"></i> Request Quote</button>`
            : `<a href="product-detail.html?id=${p.id}" class="prod-btn-buy">BUY NOW <i class="fas fa-bolt"></i></a>`}
        </div>
      </div>
    </div>
  `).join('');
}

function getCategorySlug(categoryName) {
  if (!categoryName) return '';
  const lower = categoryName.toLowerCase();
  if (lower.includes('marine') && lower.includes('ship')) return 'marine-ship-supply';
  if (lower.includes('fire')) return 'fire-safety';
  if (lower.includes('breathing')) return 'breathing-air';
  if (lower.includes('gas')) return 'gas-detection';
  if (lower.includes('machinery')) return 'industrial-machinery';
  if (lower.includes('consumable')) return 'industrial-consumables';
  if (lower.includes('rescue')) return 'marine-rescue';
  if (lower.includes('instrument')) return 'marine-instruments';
  return 'all';
}

function initProductFilters() {
  const searchInput = document.getElementById('filterSearch');
  const catSelect = document.getElementById('filterCatSelect');
  const brandSelect = document.getElementById('filterBrandSelect');
  const sortSelect = document.getElementById('filterSortSelect');
  const resetBtn = document.getElementById('filterResetBtn');

  if (searchInput) searchInput.addEventListener('input', applyCatalogueFilters);
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      activeCategoryFilter = e.target.value;
      const pillBtns = document.querySelectorAll('.prod-cat-pill-btn');
      pillBtns.forEach(b => {
        if (b.getAttribute('data-category') === activeCategoryFilter) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      applyCatalogueFilters();
    });
  }
  if (brandSelect) brandSelect.addEventListener('change', applyCatalogueFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyCatalogueFilters);
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (catSelect) catSelect.value = 'all';
      if (brandSelect) brandSelect.value = 'all';
      if (sortSelect) sortSelect.value = 'default';
      activeCategoryFilter = 'all';
      const pillBtns = document.querySelectorAll('.prod-cat-pill-btn');
      pillBtns.forEach(b => b.classList.remove('active'));
      const firstPill = document.querySelector('.prod-cat-pill-btn[data-category="all"]');
      if (firstPill) firstPill.classList.add('active');
      applyCatalogueFilters();
    });
  }
}

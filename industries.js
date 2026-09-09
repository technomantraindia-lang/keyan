/* ==================================================
   KEYAN CORPORATION — DEDICATED INDUSTRY SECTORS JS
   ================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSectorTabs();
  checkUrlSectorParam();
});

function initSectorTabs() {
  const tabs = document.querySelectorAll('.ind-tab-btn');
  const cards = document.querySelectorAll('.ind-sector-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetSector = tab.getAttribute('data-sector');
      filterSectors(targetSector);
    });
  });
}

function filterSectors(sector) {
  const cards = document.querySelectorAll('.ind-sector-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardSector = card.getAttribute('data-sector');
    if (sector === 'all' || cardSector === sector) {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      visibleCount++;
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });

  const countBadge = document.getElementById('visibleSectorCount');
  if (countBadge) {
    countBadge.textContent = `${visibleCount} Sector(s) Displayed`;
  }
}

function checkUrlSectorParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const sectorParam = urlParams.get('sector');
  if (sectorParam) {
    const tabToClick = document.querySelector(`.ind-tab-btn[data-sector="${sectorParam}"]`);
    if (tabToClick) {
      tabToClick.click();
      const mainGrid = document.getElementById('sectorsGrid');
      if (mainGrid) {
        mainGrid.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}

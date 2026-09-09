/* 
  KEYAN CORPORATION - ABOUT US INTERACTIVE ENGINE (2026)
  Handles timeline progress, interactive ecosystem tabs, DNA panels,
  sticky storytelling, product strip, and smooth HUD triggers.
*/

document.addEventListener('DOMContentLoaded', () => {
  initEcosystemTabs();
  initTimelineScroll();
  initDnaPanels();
  initSmoothScroll();
});

/* --------------------------------------------------
   1. SECTION 04: ECOSYSTEM INTERACTIVE TABS & PRODUCTS
   -------------------------------------------------- */
const ecosystemData = {
  marine: {
    category: "01 / MARINE SUPPLY",
    title: "Ship Spare Parts & Vessel Equipment",
    description: "Comprehensive marine supply solutions supporting vessel maintenance, deck machinery, safety, navigation, and offshore operations across ports.",
    products: [
      { name: "Rescue Boat", icon: "fa-life-ring" },
      { name: "Liferaft", icon: "fa-ship" },
      { name: "Lifebuoy", icon: "fa-ring" },
      { name: "Navigation Lights", icon: "fa-lightbulb" },
      { name: "Pilot Ladder", icon: "fa-stream" },
      { name: "Nautical Sextant", icon: "fa-compass" },
      { name: "Anchor & Mooring Chain", icon: "fa-anchor" },
      { name: "Deck Winch Spares", icon: "fa-cogs" }
    ]
  },
  industrial: {
    category: "02 / INDUSTRIAL AUTOMATION & MACHINERY",
    title: "Industrial Machinery & Operational Plant Components",
    description: "High-grade industrial equipment, pneumatic tools, air ventilation, and fluid handling systems engineered for manufacturing plants and heavy industry.",
    products: [
      { name: "Double Diaphragm Pump", icon: "fa-oil-can" },
      { name: "Electric Portable Ventilator", icon: "fa-fan" },
      { name: "Gas Cutting Equipment", icon: "fa-fire-burner" },
      { name: "Pneumatic Jet Chisel", icon: "fa-hammer" },
      { name: "Industrial Air Compressor", icon: "fa-wind" },
      { name: "High Pressure Hose", icon: "fa-water" }
    ]
  },
  fire: {
    category: "03 / FIRE & SAFETY",
    title: "Fire Protection & Emergency Response Systems",
    description: "Certified safety gear, emergency breathing apparatus, fire suppression valves, protective chemical suits, and gas detection systems for extreme environments.",
    products: [
      { name: "Fire Hose & Nozzles", icon: "fa-hose" },
      { name: "Fire Hydrant Valve", icon: "fa-faucet" },
      { name: "Fire Suit & Chemical Gear", icon: "fa-user-shield" },
      { name: "Fire Hose Box", icon: "fa-box-archive" },
      { name: "Gas Mask & SCBA", icon: "fa-mask-ventilator" },
      { name: "Smoke & Flame Detector", icon: "fa-bell" },
      { name: "EEBD Escape Unit", icon: "fa-head-side-mask" }
    ]
  },
  instruments: {
    category: "04 / RIG & MARINE INSTRUMENTS",
    title: "Precision Measuring & Monitoring Instrumentation",
    description: "Calibrated marine barometers, liquid level transmitters, clinometers, and temperature calibrators for shipboard and offshore rig monitoring.",
    products: [
      { name: "Marine Aneroid Barometer", icon: "fa-gauge" },
      { name: "Clinometer Indicator", icon: "fa-compass-drafting" },
      { name: "Temperature Calibrator", icon: "fa-temperature-high" },
      { name: "Liquid Level Indicator", icon: "fa-ruler-vertical" },
      { name: "PPM Monitoring Panel", icon: "fa-microchip" },
      { name: "Pressure Transmitter", icon: "fa-tachograph-digital" }
    ]
  }
};

function initEcosystemTabs() {
  const ecoNavItems = document.querySelectorAll('.eco-nav-item');
  const catBadge = document.getElementById('ecoCategoryBadge');
  const catName = document.getElementById('ecoCategoryName');
  const catDesc = document.getElementById('ecoCategoryDesc');
  const chipsContainer = document.getElementById('ecoProductsChips');

  if (!ecoNavItems.length) return;

  ecoNavItems.forEach(item => {
    item.addEventListener('click', () => {
      ecoNavItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      const targetKey = item.getAttribute('data-target');
      const data = ecosystemData[targetKey];

      if (data) {
        // Smooth transition
        if (catBadge) catBadge.textContent = data.category;
        if (catName) catName.textContent = data.title;
        if (catDesc) catDesc.textContent = data.description;

        if (chipsContainer) {
          chipsContainer.innerHTML = '';
          data.products.forEach(p => {
            const chip = document.createElement('div');
            chip.className = 'eco-chip';
            chip.innerHTML = `<i class="fas ${p.icon}"></i> ${p.name}`;
            chipsContainer.appendChild(chip);
          });
        }
      }
    });
  });
}

/* --------------------------------------------------
   2. SECTION 03: DNA PANELS HOVER EFFECT
   -------------------------------------------------- */
function initDnaPanels() {
  const dnaPanels = document.querySelectorAll('.dna-panel');
  dnaPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
      dnaPanels.forEach(p => p.style.zIndex = '1');
      panel.style.zIndex = '5';
    });
  });
}

/* --------------------------------------------------
   3. SECTION 08: TIMELINE SCROLL PROGRESS & ACTIVATION
   -------------------------------------------------- */
function initTimelineScroll() {
  const progressLine = document.getElementById('timelineProgressLine');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineSection = document.querySelector('.section-timeline');

  if (!timelineSection || !progressLine) return;

  window.addEventListener('scroll', () => {
    const rect = timelineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const totalHeight = rect.height;
      const scrolled = windowHeight - rect.top;
      let percentage = (scrolled / (totalHeight + windowHeight * 0.5)) * 100;
      percentage = Math.min(Math.max(percentage, 0), 100);

      progressLine.style.height = `${percentage}%`;

      timelineItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < windowHeight * 0.75) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
}

/* --------------------------------------------------
   4. SMOOTH SCROLL HELPER
   -------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

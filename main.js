/* ═══════════════════════════════════════════════════════════════
   NGD — main.js
   Mega panels · Hero animations · Live time · Scroll reveals
   Filter pills · Talent tabs · A-to-Z · Card navigation
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── ALL TALENT (for A-Z tab) ──────────────────────────────── */
const TALENT = [
  // Athletes
  'Candace Parker','Coco Gauff','Grant Williams','Kelsey Plum','Marshawn Lynch',
  'Meg Rapino','Qinwen Zheng','Sabrina Ionescu','Serena Williams','Sue Bird',
  'Sydney McLaughlin','Toni Breidinger','Venus Williams',
  // Music
  'Brothers Osborne','Camila Cabello','EJAE','Esperanza Spalding','Grace Bowers',
  'King Princess','Minus the Bear','Myles Smith','Portugal the Man','Sam Smith',
  'Tegan and Sara','Teyana Taylor','Victoria Monet',
  // Film and TV
  'Angelina Jolie','Ashly Burch','Ashlyn Harris','Coco Jones','Ilana Glazer',
  'Keke Palmer','Lupita Nyong\'o','Niecy Nash','Renee Rapp','Ryan Reynolds',
  'Tay Lautner','Winnie Harlow',
  // Media and Press
  'Cari Champion','Deux Moi','Joe Santagato','Julian Shapiro-Barnum','LeVar Burton',
  'Robin Roberts','Steven Bartlett','Taylor Rooks','Vivian Tu','William Goodge',
  // Fashion and Creators
  'Alex Consani','Benito Skinner','Bunnie XO','Naeemah Lafond','Nara Smith',
  'Paige Lorenze','Pokimane','Precious Lee','Richie Shazam','Tyra Banks','Wisdom Kaye',
];

/* ─── MEGA PANEL SYSTEM ─────────────────────────────────────── */
(function initMegaPanels() {
  const overlay   = document.getElementById('mega-overlay');
  const panels    = document.querySelectorAll('.mega-panel');
  const navBtns   = document.querySelectorAll('.nav-link-btn[data-panel]');
  const heroBtns  = document.querySelectorAll('.hero-panel-btn[data-panel]');
  let   activeId  = null;

  function openPanel(id) {
    if (activeId === id) { closeAll(); return; }
    closeAll(false);
    activeId = id;
    const panel = document.getElementById('panel-' + id);
    if (!panel) return;
    panel.classList.add('open');
    overlay.classList.add('visible');
    document.querySelectorAll('[data-panel="' + id + '"]').forEach(b => b.classList.add('active'));
  }

  function closeAll(reset = true) {
    if (reset) activeId = null;
    panels.forEach(p => p.classList.remove('open'));
    overlay.classList.remove('visible');
    document.querySelectorAll('[data-panel]').forEach(b => b.classList.remove('active'));
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => openPanel(btn.dataset.panel));
  });
  heroBtns.forEach(btn => {
    btn.addEventListener('click', () => openPanel(btn.dataset.panel));
  });

  overlay.addEventListener('click', closeAll);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });

  // Work panel filter links
  document.querySelectorAll('[data-filter][data-close-panel]').forEach(el => {
    el.addEventListener('click', () => {
      const filter = el.dataset.filter;
      setTimeout(() => {
        closeAll();
        setFilter(filter);
      }, 0);
    });
  });
})();

/* ─── HAMBURGER / MOBILE NAV ─────────────────────────────────── */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  let open = false;
  hamburger.addEventListener('click', () => {
    open = !open;
    mobileNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
})();

/* ─── PAGE LOAD ANIMATIONS ───────────────────────────────────── */
(function initLoadAnimations() {
  const nav = document.getElementById('top-nav');
  if (nav) requestAnimationFrame(() => nav.classList.add('loaded'));

  const delays = { eyebrow: 100, line1: 200, line2: 350, line3: 500, line4: 650, right: 600 };

  const eyebrow = document.querySelector('.hero-eyebrow');
  if (eyebrow) setTimeout(() => eyebrow.classList.add('loaded'), delays.eyebrow);

  const lines = document.querySelectorAll('.hero-line-inner');
  lines.forEach((line, i) => {
    const delay = [delays.line1, delays.line2, delays.line3, delays.line4][i] || (200 + i * 150);
    setTimeout(() => line.classList.add('loaded'), delay);
  });

  const heroRight = document.querySelector('.hero-right');
  if (heroRight) setTimeout(() => heroRight.classList.add('loaded'), delays.right);
})();

/* ─── LIVE TIME ──────────────────────────────────────────────── */
(function initLiveTime() {
  const el = document.getElementById('hero-time');
  if (!el) return;

  function update() {
    const now = new Date();
    const ny  = now.toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    el.textContent = 'New York — ' + ny;
  }
  update();
  setInterval(update, 1000);
})();

/* ─── SCROLL REVEALS (IntersectionObserver) ──────────────────── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => observer.observe(el));
})();

/* ─── FILTER PILLS ───────────────────────────────────────────── */
function setFilter(value) {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(p => {
    p.classList.toggle('active', p.dataset.filter === value);
  });

  document.querySelectorAll('.case-card').forEach(card => {
    if (value === 'all') {
      card.classList.remove('filtered-out');
    } else {
      const types = (card.dataset.type || '').split(' ');
      card.classList.toggle('filtered-out', !types.includes(value));
    }
  });
}

(function initFilter() {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => setFilter(pill.dataset.filter));
  });
})();

/* ─── CARD CLICK NAVIGATION ──────────────────────────────────── */
(function initCardNav() {
  document.querySelectorAll('.case-card[data-href]').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      window.location.href = card.dataset.href;
    });
  });
})();

/* ─── TALENT TABS ────────────────────────────────────────────── */
(function initTalentTabs() {
  const tabs  = document.querySelectorAll('.talent-tab');
  const views = document.querySelectorAll('.talent-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t  => t.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('view-' + tab.dataset.view);
      if (target) target.classList.add('active');

      // Build A-Z on first open
      if (tab.dataset.view === 'az') buildAZ();
    });
  });
})();

/* ─── PARALLAX — interstitial bg text ───────────────────────── */
(function initParallax() {
  const bgText = document.querySelector('.interstitial-bg-text');
  if (!bgText) return;
  window.addEventListener('scroll', () => {
    bgText.style.transform = 'translateX(' + (window.scrollY * 0.3) + 'px)';
  }, { passive: true });
})();

/* ─── A-TO-Z BUILDER ─────────────────────────────────────────── */
let azBuilt = false;
function buildAZ() {
  if (azBuilt) return;
  azBuilt = true;

  const grid = document.getElementById('az-grid');
  if (!grid) return;

  const sorted = [...TALENT].sort((a, b) => a.localeCompare(b));

  // Group by first letter
  const groups = {};
  sorted.forEach(name => {
    const letter = name[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(name);
  });

  // Flatten into cells: one cell per name, with letter header as first in each group
  // Use 4-col grid — insert letter headers inline
  let html = '';
  Object.keys(groups).sort().forEach(letter => {
    const cell = document.createElement('div');
    cell.className = 'az-cell';
    cell.innerHTML = '<span class="az-letter">' + letter + '</span>' +
      groups[letter].map(n => '<span class="talent-name">' + n + '</span>').join('');
    grid.appendChild(cell);
  });
}

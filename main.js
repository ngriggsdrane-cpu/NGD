/* ═══════════════════════════════════════════════════════════════
   NGD — main.js
   Hero animations · Live time · Scroll reveals · Scroll nav
   Filter pills · Work scroll arrows · Card navigation
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── HAMBURGER / MOBILE NAV ─────────────────────────────────── */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  let open = false;

  function closeNav() {
    open = false;
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    open = !open;
    mobileNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  // Close when any link is clicked
  mobileNav.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', closeNav);
  });
})();

/* ─── PAGE LOAD ANIMATIONS ───────────────────────────────────── */
(function initLoadAnimations() {
  const nav = document.getElementById('top-nav');
  if (nav) requestAnimationFrame(() => nav.classList.add('loaded'));

  // Hero lines stagger in immediately on page load
  const delays = {
    line1: 100,
    line2: 220,
    line3: 420,
    right: 50,
  };

  const lines = document.querySelectorAll('.hero-line-inner');
  lines.forEach((line, i) => {
    const delay = [delays.line1, delays.line2, delays.line3][i] || (100 + i * 150);
    setTimeout(() => line.classList.add('loaded'), delay);
  });

  const heroOrange = document.querySelector('.hero-orange');
  if (heroOrange) setTimeout(() => heroOrange.classList.add('loaded'), delays.right);
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
  const items = document.querySelectorAll('.reveal, .reveal-from-left, .reveal-from-right');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
})();

/* ─── NAV SCROLL SHADOW ──────────────────────────────────────── */
(function initNavScroll() {
  const nav = document.getElementById('top-nav');
  const hero = document.getElementById('hero');
  if (!nav || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => nav.classList.toggle('scrolled', !entry.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(hero);
})();

/* ─── SCROLL-BASED NAV ACTIVE STATE ──────────────────────────── */
(function initScrollNav() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sectionIds = ['work', 'talent', 'brands', 'events', 'about'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
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

/* ─── WORK GRID EXPAND / COLLAPSE ───────────────────────────── */
(function initWorkExpand() {
  const btn      = document.querySelector('.work-expand-btn');
  const expanded = document.querySelector('.work-grid-expanded');
  if (!btn || !expanded) return;

  let open = false;

  btn.addEventListener('click', () => {
    open = !open;
    if (open) {
      expanded.style.maxHeight = expanded.scrollHeight + 'px';
      expanded.style.opacity   = '1';
      btn.textContent = 'See fewer examples';
    } else {
      expanded.style.maxHeight = '0';
      expanded.style.opacity   = '0';
      btn.textContent = 'See all work examples';
    }
  });
})();

/* ─── TALENT ROSTER EXPAND / COLLAPSE ───────────────────────── */
(function initTalentExpand() {
  const btn  = document.querySelector('.talent-expand-btn');
  const grid = document.querySelector('.talent-grid-expanded');
  if (!btn || !grid) return;

  let open = false;

  btn.addEventListener('click', () => {
    open = !open;
    if (open) {
      grid.style.maxHeight  = grid.scrollHeight + 'px';
      grid.style.opacity    = '1';
      grid.style.marginTop  = '40px';
      btn.textContent = 'Collapse roster';
    } else {
      grid.style.maxHeight  = '0';
      grid.style.opacity    = '0';
      grid.style.marginTop  = '0';
      btn.textContent = 'See full talent roster';
    }
  });
})();

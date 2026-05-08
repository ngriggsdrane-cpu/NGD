/* ─── CARD CLICK NAVIGATION ───────────────────────────────── */
(function initCardNav() {
  document.querySelectorAll('.case-card[data-href]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => {
      // Don't navigate if clicking the footer link directly
      if (e.target.closest('a')) return;
      window.location.href = card.dataset.href;
    });
  });
})();

/* ─── HERO HEADLINE ANIMATION ─────────────────────────────── */
(function buildHeadline() {
  const el = document.getElementById('hero-headline');
  if (!el) return;

  const lines = [
    { text: 'Purpose into', cls: 'dim' },
    { text: 'culture.', cls: 'bold' },
    { text: 'Inspiring fans at scale.', cls: 'dim' },
  ];

  let wordIndex = 0;
  const baseDelay = 80; // ms between words

  lines.forEach(line => {
    const lineEl = document.createElement('span');
    lineEl.className = `hero-line ${line.cls}`;

    line.text.split(' ').forEach(word => {
      const span = document.createElement('span');
      span.className = 'hero-word';
      span.textContent = word + ' '; // non-breaking space keeps words apart
      span.style.animationDelay = `${wordIndex * baseDelay + 100}ms`;
      lineEl.appendChild(span);
      wordIndex++;
    });

    // Remove trailing nbsp from last word in line
    const words = lineEl.querySelectorAll('.hero-word');
    if (words.length) {
      words[words.length - 1].textContent = words[words.length - 1].textContent.trimEnd();
    }

    el.appendChild(lineEl);
    el.appendChild(document.createElement('br'));
  });
})();

/* ─── MEGA PANEL SYSTEM ───────────────────────────────────── */
(function initPanels() {
  const buttons = document.querySelectorAll('.panel-nav-btn');
  const overlay = document.getElementById('panel-overlay');
  let activePanel = null;
  let activeBtn = null;

  function openPanel(panelId, btn) {
    // Close any open panel first
    if (activePanel) {
      activePanel.classList.remove('open');
      if (activeBtn) activeBtn.classList.remove('active');
    }

    // If clicking the same button, just close
    if (activePanel && activePanel.id === 'panel-' + panelId) {
      activePanel = null;
      activeBtn = null;
      overlay.classList.remove('active');
      return;
    }

    const panel = document.getElementById('panel-' + panelId);
    if (!panel) return;

    panel.classList.add('open');
    btn.classList.add('active');
    overlay.classList.add('active');

    activePanel = panel;
    activeBtn = btn;
  }

  function closeAll() {
    if (activePanel) {
      activePanel.classList.remove('open');
      activePanel = null;
    }
    if (activeBtn) {
      activeBtn.classList.remove('active');
      activeBtn = null;
    }
    overlay.classList.remove('active');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openPanel(btn.dataset.panel, btn);
    });
  });

  overlay.addEventListener('click', closeAll);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
})();

/* ─── TALENT TABS ─────────────────────────────────────────── */
(function initTalentTabs() {
  const tabs = document.querySelectorAll('.talent-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const viewId = 'view-' + tab.dataset.view;
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.talent-view').forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(viewId).classList.add('active');
    });
  });
})();

/* ─── A–Z TALENT GRID ─────────────────────────────────────── */
(function buildAZGrid() {
  const allNames = [
    'A\'ja Wilson', 'Alicia Keys', 'Aurora James', 'Bethann Hardison', 'Bethany Mota',
    'Billie Eilish', 'Bomani Jones', 'Candace Parker', 'Charlamagne Tha God', 'Chidera Eggerue',
    'Coco Gauff', 'Common', 'Don Lemon', 'Edward Enninful', 'Elaine Welteroth',
    'Gayle King', 'H.E.R.', 'Idris Elba', 'Issa Rae', 'Jemele Hill',
    'John Legend', 'Karlie Kloss', 'Kerry Washington', 'Kevin Durant', 'Leandra Medine',
    'LeBron James', 'Lil Nas X', 'Lizzo', 'Lupita Nyong\'o', 'Mahershala Ali',
    'Maria Taylor', 'Mary J. Blige', 'Megan Rapinoe', 'Michael B. Jordan', 'Michael Strahan',
    'Naomi Osaka', 'Niecy Nash', 'Paloma Elsesser', 'Patrick Mahomes', 'Priyanka Chopra',
    'Questlove', 'Rachel Nichols', 'Robin Roberts', 'Ryan Reynolds', 'Sage Steele',
    'Sam Smith', 'Serena Williams', 'Simone Biles', 'Sinead Burke', 'Stephen Curry',
    'Sterling K. Brown', 'SZA', 'Tamu McPherson', 'Taraji P. Henson', 'Taylor Rooks',
    'Telfar Clemens', 'Usher', 'Van Jones', 'Venus Williams', 'Viola Davis',
  ];

  const sorted = [...allNames].sort((a, b) => a.localeCompare(b));
  const grid = document.getElementById('az-grid');
  if (!grid) return;

  sorted.forEach(name => {
    const div = document.createElement('div');
    div.className = 'talent-az-name';
    div.textContent = name;
    grid.appendChild(div);
  });
})();

/* ─── FILTER BUTTONS ──────────────────────────────────────── */
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.case-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const cats = card.dataset.category || '';
          if (cats.includes(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });

      // Re-apply wide to first visible card
      const visible = [...cards].filter(c => !c.classList.contains('hidden'));
      cards.forEach(c => {
        if (filter !== 'all') c.classList.remove('wide');
      });
      if (filter !== 'all' && visible.length > 0) {
        visible[0].classList.add('wide');
      } else if (filter === 'all') {
        // Restore original wide states
        document.querySelectorAll('.case-card').forEach((c, i) => {
          if (i === 0 || i === 3) c.classList.add('wide');
          else c.classList.remove('wide');
        });
      }
    });
  });
})();

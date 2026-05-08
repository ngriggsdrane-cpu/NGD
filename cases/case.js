/* ─── INTERSECTION OBSERVER — reveal on scroll ─────────── */
(function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // timeline items use their own class, don't unobserve so stagger works
        if (!entry.target.classList.contains('cs-timeline-item')) {
          obs.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-scale, .stagger').forEach(el => obs.observe(el));

  // Timeline items: staggered delay based on index
  const timelineItems = document.querySelectorAll('.cs-timeline-item');
  const tlObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = [...timelineItems].indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        tlObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  timelineItems.forEach(el => tlObs.observe(el));
})();

/* ─── COUNT-UP STATS ────────────────────────────────────── */
(function initCountUp() {
  const statEls = document.querySelectorAll('.cs-stat-num[data-count]');
  if (!statEls.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);

      const el = entry.target;
      const target    = parseFloat(el.dataset.count);
      const prefix    = el.dataset.prefix || '';
      const suffix    = el.dataset.suffix || '';
      const decimals  = parseInt(el.dataset.decimal || '0', 10);
      const duration  = 1400;
      const startTime = performance.now();

      function tick(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = eased * target;
        el.textContent = prefix + value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.3 });

  statEls.forEach(el => obs.observe(el));
})();

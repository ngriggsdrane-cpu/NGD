/* ═══════════════════════════════════════════════════════════════
   NGD — main.js
   Scroll reveals · Scroll nav · Card navigation · Work expand
   Talent expand · Mobile nav
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

/* ─── NAV LOADED STATE ───────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('top-nav');
  if (nav) requestAnimationFrame(() => nav.classList.add('loaded'));
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

/* ─── CASE STUDY DATA ────────────────────────────────────────── */
const caseStudies = {

  lupita: {
    eyebrow: "Lupita Nyong’o \xd7 Foundation for Women’s Health",
    title: 'Make Fibroids Count',
    desc: 'Mobilizing $400,000 via fan fundraising, brand partnerships and foundation funding to drive awareness for uterine fibroid research. The campaign funded research grants focused on accelerating less and non-invasive treatments for an underfunded condition affecting 26M women.',
    hero: { type: 'image', src: 'images/lupita/p1-020.png', position: 'center top' },
    stats: [
      { number: '$400K', label: 'Mobilized' },
      { number: '694M', label: 'Media & social impressions' },
      { number: '$22.8M', label: 'Earned media value' },
      { number: '26M', label: 'Women affected by fibroids' }
    ],
    gallery: [
      { src: 'images/ABC-News-Linsey-Davis-Lupita-Nyongo-2-032326-7e78c931493e49aa98522a63659124e0.jpg', alt: 'ABC News Live Prime' },
      { src: 'images/8-1024x683.jpg', alt: 'Capitol Hill roundtable' },
      { src: 'images/5-scaled.jpg', alt: 'Capitol Hill advocacy day' },
      { src: 'images/b68c9ce40e18d75e0699acb927ef6d8a.webp', alt: 'Press appearance' },
      { src: 'images/aq9bFJ3m-1280.jpg', alt: 'ABC News interview' },
      { src: 'images/lupita/Fruit1.png', alt: 'Campaign visual identity' }
    ],
    press: [
      { name: 'TODAY Show', url: 'https://www.today.com/health/womens-health/lupita-nyongo-fibroids-rcna260617' },
      { name: 'ABC News', url: 'https://abcnews.com/video/131335681/' },
      { name: 'People', url: 'https://people.com/lupita-nyong-o-women-conditioned-to-expect-pain-fibroids-exclusive-11932770' },
      { name: 'Primetimer', url: 'https://www.primetimer.com/features/lupita-nyong-o-turns-personal-pain-into-global-purpose-with-new-fibroids-campaign' },
      { name: 'The Grio', url: 'https://thegrio.com/2026/03/01/lupita-nyongo-shares-powerful-birthday-post-holding-77-fruits-to-represent-struggle-with-fibroids/' },
      { name: 'E! Online', url: 'https://www.eonline.com/news/1428979/lupita-nyongo-on-fibroid-diagnosis-shame' },
      { name: 'NBC News Now', url: 'https://www.nbcnews.com/now/video/new-campaign-spotlights-fibroids-as-celebrities-speak-out-258861125700' },
      { name: 'USA Today', url: 'https://www.usatoday.com/story/entertainment/celebrities/2026/03/24/lupita-nyongo-uterine-fibroids-motherhood/89305049007/' },
      { name: 'Parade', url: 'https://parade.com/news/lupita-nyongo-shares-health-update-after-2014-uterine-fibroid-removal-says-she-now-has-over-50' },
      { name: 'Daily Mail', url: 'https://www.dailymail.co.uk/tvshowbiz/article-15594271/I-felt-shame-scared-reproductive-health-Lupita-Nyongo-details-decade-long-battle-agonising-chronic-uterine-fibroids-reveals-currently-50.html' },
      { name: 'Black Health Matters', url: 'https://blackhealthmatters.com/lupito-nyongos-fibroids-have-returned-she-now-has-50/' },
      { name: 'The Root', url: 'https://theroot.com' }
    ]
  },

  taylor: {
    eyebrow: 'Taylor Rooks Foundation',
    title: 'Medical Debt Relief',
    desc: 'Partnered with Undue Medical Debt and relieved over $2,000,000 in medical debt for individuals and families living in her hometown of Georgia.',
    hero: { type: 'image', src: 'images/taylor-rooks/Taylor Rooks.jpg', position: 'center top' },
    stats: [
      { number: '$2.1M', label: 'Medical debt relieved' },
      { number: '1,805', label: 'Georgia residents helped' }
    ],
    gallery: [],
    press: [
      { name: 'Fadeaway World', url: 'https://fadeawayworld.net/nba-media/taylor-rooks-erases-2-1m-in-medical-debt-for-1805-residents-in-her-hometown' },
      { name: 'Revolt', url: 'https://www.revolt.tv/article/taylor-rooks-georgia-medical-debt-relief' },
      { name: 'Black Enterprise', url: 'https://www.blackenterprise.com/taylor-rooks-foundations-helps-erase-medical-debt/' },
      { name: 'Rolling Out', url: 'https://rollingout.com/2026/04/23/taylor-rooks-stuns-hometown-with/' },
      { name: 'Yahoo Sports', url: 'https://sports.yahoo.com/articles/taylor-rooks-announces-initiative-erased-120000029.html' }
    ]
  },

  sam: {
    eyebrow: 'Sam Smith',
    title: 'The Pink House Foundation',
    desc: 'Launched The Pink House Foundation to support and uplift LGBTQ+ communities, activating their platform to drive funding and visibility for grassroots organizations. Through a network of fundraisers and community partners, the foundation has leveraged residencies in New York and San Francisco to raise capital and amplify local LGBTQ+ organizations.',
    hero: { type: 'image', src: 'images/p1-017.png', position: 'center top' },
    stats: [],
    gallery: [],
    press: []
  },

  venus: {
    eyebrow: 'Venus Williams \xd7 Saving Mothers',
    title: 'Advancing Equity in Maternal Health',
    desc: "Teamed up with Saving Mothers and NYU Langone to advance the organization’s mission to reduce maternal mortality and improve health outcomes for underserved women. This partnership amplifies access to lifesaving care, education, and advocacy in fibroid diagnosis and treatment.",
    hero: { type: 'image', src: 'images/p1-008.png', position: 'center top' },
    stats: [],
    gallery: [],
    press: []
  },

  candace: {
    eyebrow: 'Candace Parker \xd7 Adidas',
    title: 'Glass Ceiling Grants',
    desc: 'Launched the Candace Parker Foundation, with founding partner Adidas, during her memoir book tour, and introduced its inaugural Glass Ceiling Grants, investing over $90,000 in youth-focused organizations that use sport to break barriers. With partners in Chicago, New York, Nashville, Atlanta and Los Angeles.',
    hero: { type: 'image', src: 'images/candace-parker/Candace Parker.jpg', position: 'center top' },
    stats: [
      { number: '$90K', label: 'Glass Ceiling Grants invested' },
      { number: '5', label: 'Partner cities' }
    ],
    gallery: [],
    press: []
  },

  incubator: {
    eyebrow: 'WME Fashion Incubator',
    title: 'Expanding Access to Fashion Careers',
    desc: 'An annual three-month program designed to expand access across creative and executive fashion careers. Built at the intersection of talent, community, and industry, the mission connects emerging leaders with top creatives and executives shaping the global landscape.',
    hero: { type: 'video', videoId: 'spwdzlv88NM' },
    stats: [],
    gallery: [
      { src: 'images/p2-002.png', alt: 'WME Incubator editorial shoot' }
    ],
    press: [
      { name: 'Blanc Magazine', url: 'https://blancmagazine.com/the-veil-wme-incubator/' },
      { name: 'WME Fashion', url: 'https://wmefashion.com/incubator-2026/' }
    ]
  },

  winnie: {
    eyebrow: 'Winnie Harlow \xd7 BBR Creator Summit',
    title: 'The CEO Club',
    desc: "Headlined Black Beauty Roster’s Creator Summit as keynote speaker, with her conversation filmed by Amazon for its docuseries The CEO Club. The appearance amplified diverse female leadership and entrepreneurship, reflecting her commitment to championing representation and empowering the next generation of founders.",
    hero: { type: 'image', src: 'images/winnie-harlow/Winnie Harlow BBR 2.jpeg copy.jpg', position: 'left 20% top 0%' },
    stats: [],
    gallery: [
      { src: 'images/p1-023.png', alt: 'BBR Creator Summit' },
      { src: 'images/p2-017.png', alt: 'BBR Black Beauty celebration' }
    ],
    press: []
  },

  kids: {
    eyebrow: 'Paige Lorenze and Tommy Paul',
    title: 'Kids Outdoors Foundation',
    desc: 'Launched the Kids Outdoors Foundation, expanding access to high-barrier sports like tennis, skiing, and horseback riding. Rooted in their athletic backgrounds, the foundation will fund existing programs and host community-driven events, reflecting their shared belief that sport builds confidence, resilience, and opportunity for the next generation.',
    hero: { type: 'image', src: 'images/kids-outdoors/KidsOutdoors Announcement.jpg.avif', position: 'center top 5%' },
    stats: [],
    gallery: [],
    press: [
      { name: 'Town and Country', url: 'https://www.townandcountrymag.com/leisure/sporting/a69977323/tommy-paul-paige-lorenze-kids-outdoors-foundation-launch/' },
      { name: 'ATP Tour', url: 'https://www.atptour.com/en/news/paul-australian-open-2026-foundation-feature' },
      { name: 'Hard Court', url: 'https://www.hard-court.com/p/paige-lorenze-tommy-paul-the-kids-outdoors-foundation' }
    ]
  },

  grace: {
    eyebrow: 'Grace Bowers',
    title: 'We All Gotta Live Together',
    desc: 'Raised over $30,000 in support of Everytown for Gun Safety and MusiCares at her third annual benefit concert. The event featured performances by Flavorflav, Ingrid Andress, Brothers Osborne, Luke Spiller of The Struts, and donations from Sheryl Crow, Billy Strings, and a Gibson guitar signed by all performers.',
    hero: { type: 'image', src: 'images/p1-014.png', position: 'center top' },
    stats: [
      { number: '$30K+', label: 'Raised for Everytown and MusiCares' }
    ],
    gallery: [],
    press: []
  },

  pokimane: {
    eyebrow: 'Pokimane \xd7 UNICEF',
    title: 'Play For Every Child',
    desc: 'Attended the UNICEF gala and participated in Play For Every Child, a content series featuring celebrity reflections on the role of play in childhood and development, using her platform to amplify global advocacy for children.',
    hero: { type: 'image', src: 'images/pokimane/pokimane.avif', position: 'center top' },
    stats: [],
    gallery: [],
    press: []
  },

  nara: {
    eyebrow: 'Nara Smith \xd7 Save the Children',
    title: 'Erewhon Partnership',
    desc: "Raised over $30,000 to support Save the Children through her Erewhon smoothie partnership. She utilized the moment to spotlight the organization’s mission and is now building a deeper relationship with them.",
    hero: { type: 'image', src: 'images/p1-003.png', position: 'center top' },
    stats: [
      { number: '$30K+', label: 'Raised for Save the Children' }
    ],
    gallery: [],
    press: []
  },

  coco: {
    eyebrow: 'Coco Jones \xd7 Girls Inc.',
    title: 'Why Not More? Tour Partnership',
    desc: 'Partnered with Girls Inc. to create memorable experiences for young girls in select cities by donating VIP tickets, private meet-and-greets and transportation. With support from Lyft, the partnership ensured safe transportation and reflected her commitment to uplifting the next generation of young women.',
    hero: { type: 'image', src: 'images/coco-jones/coco-jones-Header.png.webp', position: 'center top' },
    stats: [],
    gallery: [
      { src: 'images/p1-002.png', alt: 'Coco Jones with Girls Inc.' }
    ],
    press: []
  },

  annie: {
    eyebrow: 'Annie Elise \xd7 Child Rescue Coalition',
    title: 'SERIALously Partnership',
    desc: 'Launched a partnership with Child Rescue Coalition to amplify their mission of protecting children from exploitation on the internet. Through dedicated SERIALously podcast episodes, CrimeCon appearances, custom merchandise and newsletter features, using her platform to raise funds and drive awareness.',
    hero: { type: 'image', src: 'images/annie-elise/Annie Elise.jpg.webp', position: 'center top' },
    stats: [],
    gallery: [
      { src: 'images/p1-001.png', alt: 'Annie Elise \xd7 Child Rescue Coalition' }
    ],
    press: []
  },

  madhappy: {
    eyebrow: 'Madhappy \xd7 Madhappy Foundation',
    title: 'Mental Health Initiatives',
    desc: 'Through the Madhappy Foundation, deploys over $300,000 annually to advance mental health initiatives and is currently developing in-store programming that integrates celebrity talent to amplify advocacy and cultural impact.',
    hero: { type: 'image', src: 'images/Madhappy-Foundation.jpg.webp', position: 'center center' },
    stats: [
      { number: '$300K+', label: 'Deployed annually for mental health' }
    ],
    gallery: [
      { src: 'images/p2-013.png', alt: 'Madhappy Foundation' }
    ],
    press: []
  },

  lemons: {
    eyebrow: 'Tay and Taylor Lautner',
    title: 'The Lemons Foundation',
    desc: "Launched The Lemons Foundation to drive awareness and support around mental health, leveraging their platform, podcast, and live events to engage audiences and build community. Grounded in Tay’s experience as a former ICU nurse during COVID-19, the initiative reflects their commitment to supporting healthcare workers and expanding access to mental health resources.",
    hero: { type: 'image', src: 'images/Tay and Tay Lemons Foundation.webp', position: 'center top 8%' },
    stats: [],
    gallery: [
      { src: 'images/p2-010.png', alt: 'The Lemons Foundation launch' }
    ],
    press: []
  }

};

/* ─── MODAL OPEN / CLOSE ─────────────────────────────────────── */
function openModal(key) {
  const data = caseStudies[key];
  if (!data) return;

  const overlay    = document.getElementById('caseModalOverlay');
  const hero       = document.getElementById('caseModalHero');
  const eyebrow    = document.getElementById('caseModalEyebrow');
  const title      = document.getElementById('caseModalTitle');
  const desc       = document.getElementById('caseModalDesc');
  const stats      = document.getElementById('caseModalStats');
  const gallery    = document.getElementById('caseModalGallery');
  const galleryWrap= document.getElementById('caseModalGalleryWrap');
  const press      = document.getElementById('caseModalPress');
  const pressWrap  = document.getElementById('caseModalPressWrap');

  eyebrow.textContent = data.eyebrow;
  title.textContent   = data.title;
  desc.textContent    = data.desc;

  if (data.hero.type === 'video') {
    hero.style.backgroundImage = '';
    hero.innerHTML = `<iframe src="https://www.youtube.com/embed/${data.hero.videoId}?autoplay=1&mute=1&loop=1&playlist=${data.hero.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1" allow="autoplay; muted" allowfullscreen title="${data.title}"></iframe>`;
  } else {
    hero.innerHTML = '';
    hero.style.backgroundImage = `url('${data.hero.src}')`;
    hero.style.backgroundPosition = data.hero.position || 'center top';
  }

  stats.innerHTML = '';
  if (data.stats && data.stats.length > 0) {
    stats.style.display = 'grid';
    data.stats.forEach(s => {
      stats.innerHTML += `<div class="case-modal-stat"><div class="case-modal-stat-number">${s.number}</div><div class="case-modal-stat-label">${s.label}</div></div>`;
    });
  } else {
    stats.style.display = 'none';
  }

  gallery.innerHTML = '';
  if (data.gallery && data.gallery.length > 0) {
    galleryWrap.style.display = 'block';
    data.gallery.forEach(img => {
      gallery.innerHTML += `<img src="${img.src}" alt="${img.alt}" class="case-modal-gallery-img" loading="lazy">`;
    });
  } else {
    galleryWrap.style.display = 'none';
  }

  press.innerHTML = '';
  if (data.press && data.press.length > 0) {
    pressWrap.style.display = 'block';
    data.press.forEach(p => {
      press.innerHTML += `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="case-modal-press-item">${p.name}</a>`;
    });
  } else {
    pressWrap.style.display = 'none';
  }

  document.getElementById('caseModalInner').scrollTop = 0;
  document.body.style.overflow = 'hidden';
  overlay.classList.add('open');
}

function closeModal() {
  const overlay = document.getElementById('caseModalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('caseModalHero').innerHTML = '';
}

document.getElementById('caseModalClose').addEventListener('click', closeModal);
document.getElementById('caseModalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

/* ─── WORK GRID EXPAND / COLLAPSE ───────────────────────────── */
(function initWorkExpand() {
  const btn       = document.querySelector('.work-expand-btn');
  const expanded  = document.querySelector('.work-grid-expanded');
  const teaserRow = document.getElementById('workTeaserRow');
  if (!btn || !expanded) return;

  let open = false;

  btn.addEventListener('click', () => {
    open = !open;
    if (open) {
      expanded.style.maxHeight = expanded.scrollHeight + 'px';
      expanded.style.opacity   = '1';
      if (teaserRow) {
        teaserRow.style.transition  = 'opacity 0.3s ease, max-height 0.4s ease';
        teaserRow.style.opacity     = '0';
        teaserRow.style.maxHeight   = '0';
        teaserRow.style.overflow    = 'hidden';
      }
      btn.querySelector('.btn-text').textContent = 'Show fewer examples';
      btn.querySelector('.btn-arrow').textContent = '↑';
      btn.style.animation = 'none';
    } else {
      expanded.style.maxHeight = '0';
      expanded.style.opacity   = '0';
      if (teaserRow) {
        teaserRow.style.opacity   = '1';
        teaserRow.style.maxHeight = '400px';
      }
      btn.querySelector('.btn-text').textContent = 'See all work examples';
      btn.querySelector('.btn-arrow').textContent = '↓';
      btn.style.animation = 'btnBounce 2s ease-in-out infinite';
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

/* ═══════════════════════════════════════════════════════════════
   NGD — main.js
   Scroll reveals · Scroll nav · Card navigation · Work expand
   Talent expand · Mobile nav
   ═══════════════════════════════════════════════════════════════ */

window.addEventListener('load', function() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

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
  const sectionIds = ['clients', 'brands', 'events', 'strategy', 'about'];
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

/* ─── RECENT UPDATES DATA ────────────────────────────────────── */
/*
  HOW TO ADD AN UPDATE:
  Add one object to the top of this array.
  cardKey must match a key in the caseStudies object.
  All three surfaces (feed, badge, modal) update automatically.

  {
    date: 'YYYY-MM-DD',
    client: 'Display name',
    cardKey: 'matchingCaseStudiesKey',
    headline: 'Short headline',
    desc: 'One or two sentence description.',
    tag: 'One word category',
    link: 'https://... or null'
  }
*/
const recentUpdates = [
  {
    date: '2026-08-29',
    client: "Lupita Nyong'o",
    cardKey: 'lupita',
    headline: 'Vogue feature alongside Senator Angela Alsobrooks',
    desc: "Vogue explores Lupita's personal fibroid journey and the systemic inequities surrounding women's pain, spotlighting the bipartisan U-FIGHT Act. Lupita has also woven fibroid advocacy into major coverage with Elle and Who What Wear, and was honored by The White Dress Project in Atlanta for her Make Fibroids Count campaign.",
    tag: 'Press',
    link: 'https://www.vogue.com'
  },
  {
    date: '2025-08-24',
    client: 'Paige Lorenze and Tommy Paul',
    cardKey: 'kids',
    headline: 'US Open Activation with NYJTL',
    desc: '10 student athletes aged 16 to 18 experienced the US Open with Tommy Paul — practice sessions, Players Lounge tour, and lunch at Arthur Ashe Stadium.',
    tag: 'Activation',
    link: null
  },
  {
    date: '2026-04-23',
    client: 'Taylor Rooks Foundation',
    cardKey: 'taylor',
    headline: '$2.1M in Medical Debt Relieved',
    desc: 'Partnership with Undue Medical Debt erased debt for 1,805 residents in Gwinnett County, Georgia.',
    tag: 'Foundation',
    link: null
  },
  {
    date: '2026-05-12',
    client: 'Joe Santagato',
    cardKey: 'joe',
    headline: 'The Happy Cry Fund Launches',
    desc: '$100,000 personal commitment plus $1 from every tour ticket sold via PLUS1 partnership.',
    tag: 'Foundation Launch',
    link: null
  },
  {
    date: '2026-08-30',
    client: 'Paige Lorenze and Tommy Paul',
    cardKey: 'kids',
    headline: 'Kids Outdoors Foundation Reel Hits 866K Views',
    desc: 'Foundation content goes viral with 866,000 views on Instagram.',
    tag: 'Social',
    link: 'https://www.instagram.com/reel/Dcee363B0U0/'
  }
];

/* ─── CASE STUDY DATA ────────────────────────────────────────── */
const caseStudies = {

  lupita: {
    eyebrow: "Lupita Nyong’o \xd7 Foundation for Women’s Health",
    title: 'Make Fibroids Count',
    desc: 'Mobilizing $400,000 via fan fundraising, brand partnerships and foundation funding to drive awareness for uterine fibroid research. The campaign funded research grants focused on accelerating less and non-invasive treatments for an underfunded condition affecting 26M women.',
    hero: { type: 'image', src: 'https://images.gofundme.com/6PSxB1IQBLrK0pyRzNuhwcTM9ek=/1200x900/https://d2g8igdw686xgo.cloudfront.net/100419681_1771970330591462_r.png', position: 'center top' },
    stats: [
      { number: '$400K', label: 'Mobilized' },
      { number: '694M', label: 'Media & social impressions' },
      { number: '$22.8M', label: 'Earned media value' },
      { number: '26M', label: 'Women affected by fibroids' }
    ],
    gallery: [],
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
      { name: 'The Root', url: 'https://theroot.com' },
      { name: 'Vogue', url: 'https://www.vogue.com' },
      { name: 'Elle', url: 'https://www.elle.com' },
      { name: 'Who What Wear', url: 'https://www.whowhatwear.com' }
    ]
  },

  taylor: {
    eyebrow: 'Taylor Rooks Foundation',
    title: 'Medical Debt Relief',
    desc: 'Partnered with Undue Medical Debt and relieved over $2,000,000 in medical debt for individuals and families living in her hometown of Georgia.',
    hero: { type: 'image', src: 'images/taylor-rooks/Taylor Rooks.jpg', position: 'center top' },
    stats: [
      { number: '$2.1M', label: 'Medical debt relieved' },
      { number: '1,805', label: 'Georgia residents helped' },
      { number: '22.5M', label: 'Total estimated impressions' }
    ],
    gallery: [],
    press: [
      { name: 'Rolling Out', url: 'https://rollingout.com/2026/04/23/taylor-rooks-stuns-hometown-with/' },
      { name: 'The Grio', url: 'https://thegrio.com/2026/04/22/taylor-rooks-foundation-medical-debt-gwinnett-county/' },
      { name: 'Afro Tech', url: 'https://afrotech.com/taylor-rooks-foundation-and-undue-medical-debt-erase-2-1m-in-medical-debt-for-gwinnett-county-ga-residents' },
      { name: 'Black Enterprise', url: 'https://www.blackenterprise.com/taylor-rooks-foundations-helps-erase-medical-debt/' },
      { name: 'Athlon Sports', url: 'https://athlonsports.com/other-sports/nba-reporter-taylor-rooks-announces-2-1-million-news' },
      { name: 'Fadeaway World', url: 'https://fadeawayworld.net/nba-media/taylor-rooks-erases-2-1m-in-medical-debt-for-1805-residents-in-her-hometown' },
      { name: 'Essentially Sports', url: 'https://www.essentiallysports.com/nfl-active-news-charissa-thompson-joy-taylor-react-as-taylor-rooks-helps-clear-two-point-one-m-in-medical-debt/' },
      { name: 'Undue Medical Debt', url: 'https://unduemedicaldebt.org/press-release/2-million-of-crushing-medical-debt-erased-for-atlanta-families-by-taylor-rooks-foundation/' }
    ]
  },

  sam: {
    eyebrow: 'Sam Smith',
    title: 'The Pink House Foundation',
    desc: 'Launched The Pink House Foundation to support and uplift LGBTQ+ communities, activating their platform to drive funding and visibility for grassroots organizations. Through a network of fundraisers and community partners, the foundation has leveraged residencies in New York and San Francisco to raise capital and amplify local LGBTQ+ organizations.',
    hero: { type: 'image', src: 'images/sam-smith.jpg', position: 'center top' },
    stats: [],
    gallery: [],
    press: []
  },

  venus: {
    eyebrow: 'Venus Williams \xd7 Saving Mothers',
    title: 'Advancing Equity in Maternal Health',
    desc: "Teamed up with Saving Mothers and NYU Langone to advance the organization’s mission to reduce maternal mortality and improve health outcomes for underserved women. This partnership amplifies access to lifesaving care, education, and advocacy in fibroid diagnosis and treatment.",
    hero: { type: 'image', src: 'images/venus-williams/Venus Headshot_Credit to Laura Metzler Photography.jpg', position: 'center top' },
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
    hero: { type: 'localvideo', src: 'images/Incubator-Sizzle-Website-23.mov' },
    stats: [],
    gallery: [],
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
    gallery: [],
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
    hero: { type: 'image', src: 'images/grace-bowers/GraceBowers-BrookylnBowl-101825-4.jpg.webp', position: 'center top' },
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
    hero: { type: 'image', src: 'images/nara-smith/Nara Smith Erewhon.jpg.webp', position: 'center top' },
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
    gallery: [],
    press: []
  },

  annie: {
    eyebrow: 'Annie Elise \xd7 Child Rescue Coalition',
    title: 'SERIALously Partnership',
    desc: 'Launched a partnership with Child Rescue Coalition to amplify their mission of protecting children from exploitation on the internet. Through dedicated SERIALously podcast episodes, CrimeCon appearances, custom merchandise and newsletter features, using her platform to raise funds and drive awareness.',
    hero: { type: 'image', src: 'images/annie-elise/Annie Elise.jpg.webp', position: 'center top' },
    stats: [],
    gallery: [],
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
    gallery: [],
    press: []
  },

  lemons: {
    eyebrow: 'Tay and Taylor Lautner',
    title: 'The Lemons Foundation',
    desc: "Launched The Lemons Foundation to drive awareness and support around mental health, leveraging their platform, podcast, and live events to engage audiences and build community. Grounded in Tay’s experience as a former ICU nurse during COVID-19, the initiative reflects their commitment to supporting healthcare workers and expanding access to mental health resources.",
    hero: { type: 'image', src: 'images/Tay and Tay Lemons Foundation.webp', position: 'center top 8%' },
    stats: [],
    gallery: [],
    press: []
  },

  gracenader: {
    eyebrow: 'Grace Ann Nader \xd7 Safar Global Foundation',
    title: 'Powering Girls Education in Africa',
    desc: "Grace Ann Nader, star of Hulu's Love Thy Nader, hosted an event supporting Safar Global Foundation, focused on powering girls education in Africa. The event raised $15,000 in one evening at the Museum of Ice Cream, with funds directed toward building a study lab at a school. Brand partners included QUAI sunglasses and Tarte Makeup.",
    hero: { type: 'image', src: 'images/Grace Ann Nader_Safar.JPG', position: 'center top' },
    stats: [
      { number: '$15K', label: 'Raised in one evening' }
    ],
    gallery: [],
    press: []
  },

  joe: {
    eyebrow: 'Joe Santagato',
    title: 'The Happy Cry Fund',
    desc: 'Helped Joe Santagato launch The Happy Cry Fund, a new charitable arm of his business supporting hunger relief, mental health, and youth development. Joe is personally donating $100,000 to launch the fund and committing $1 from every ticket sold on his upcoming tour through a partnership with PLUS1. The fund builds on the community Joe has created through The Basement Yard and reflects his commitment to using his platform for social good.',
    hero: { type: 'image', src: 'images/joe-santagato.png', position: 'center top' },
    stats: [
      { number: '$100K', label: 'Personal launch donation' },
      { number: '$1', label: 'Per ticket sold on tour via PLUS1' }
    ],
    gallery: [],
    press: [
      { name: 'People', url: 'https://people.com' } /* UPDATE: add exact People exclusive URL when live */
    ]
  },

  honeyland: {
    eyebrow: 'Honeyland Festival',
    title: 'Honeyland Impact Strategy',
    desc: 'Music and culinary festival impact strategy and creation of the Honeyfund, investing in Black excellence and equity in culture. Honeyland celebrates Black expression and takes active steps towards fostering equity and Black excellence.',
    hero: { type: 'image', src: 'images/Honeyland.jpg', position: 'center top' },
    stats: [],
    gallery: [],
    press: [
      { name: 'Honeyland Festival', url: 'https://www.honeylandfestival.com/impact/' }
    ]
  },

  ilana: {
    eyebrow: 'Ilana Glazer \xd7 Yahoo Makers',
    title: "Yahoo Makers Women's Conference 2026",
    desc: "Booked Ilana Glazer to speak at the 2026 Yahoo Makers women's conference in Santa Barbara, bringing together women leaders from around the world. With a 2026 tour, a new podcast, and a movement for safer, more inclusive civic engagement.",
    hero: { type: 'image', src: 'images/IMG_7127.jpeg', position: 'center top' },
    stats: [],
    gallery: [],
    press: [
      { name: 'Yahoo Makers', url: 'https://www.youtube.com/watch?v=x94iRCpy1Pw' }
    ]
  }

};

/* ─── MODAL OPEN / CLOSE ─────────────────────────────────────── */
function openModal(key) {
  const data = caseStudies[key];
  if (!data) return;

  const backdrop = document.getElementById('modalBackdrop');
  const modal    = document.getElementById('caseModal');
  const hero     = document.getElementById('modalHero');
  const scroll   = document.getElementById('modalScroll');

  scroll.scrollTop = 0;

  document.getElementById('modalEyebrow').textContent = data.eyebrow || '';
  document.getElementById('modalTitle').textContent   = data.title   || '';
  document.getElementById('modalDesc').textContent    = data.desc    || '';

  hero.innerHTML = '';
  if (data.hero.type === 'localvideo') {
    hero.style.backgroundImage = '';
    hero.innerHTML = `<video autoplay muted loop playsinline style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; object-position:center;" src="${data.hero.src}"></video>`;
  } else if (data.hero.type === 'video') {
    hero.style.backgroundImage = '';
    hero.innerHTML = `<iframe src="https://www.youtube.com/embed/${data.hero.videoId}?autoplay=1&mute=1&loop=1&playlist=${data.hero.videoId}&controls=0&rel=0&playsinline=1" style="position:absolute;top:50%;left:50%;width:177.78%;height:100%;min-width:100%;transform:translate(-50%,-50%);border:none;pointer-events:none;" allow="autoplay;muted" allowfullscreen></iframe>`;
  } else {
    const src = data.hero.src ? data.hero.src.replace(/ /g, '%20') : '';
    hero.style.backgroundImage  = src ? `url('${src}')` : '';
    hero.style.backgroundPosition = data.hero.position || 'center top';
    hero.style.backgroundSize   = 'cover';
  }

  const statsEl = document.getElementById('modalStats');
  statsEl.innerHTML = '';
  if (data.stats && data.stats.length > 0) {
    statsEl.style.display = 'grid';
    statsEl.style.gridTemplateColumns = `repeat(${Math.min(data.stats.length, 2)}, 1fr)`;
    data.stats.forEach(s => {
      statsEl.innerHTML += `<div class="modal-stat-cell"><div class="modal-stat-number">${s.number}</div><div class="modal-stat-label">${s.label}</div></div>`;
    });
  } else {
    statsEl.style.display = 'none';
  }

  const galleryWrap = document.getElementById('modalGalleryWrap');
  const gallery     = document.getElementById('modalGallery');
  gallery.innerHTML = '';
  if (data.gallery && data.gallery.length > 0) {
    galleryWrap.style.display = 'block';
    data.gallery.forEach(img => {
      const src = img.src.replace(/ /g, '%20');
      gallery.innerHTML += `<img src="${src}" alt="${img.alt}" class="modal-gallery-img" loading="lazy" onerror="this.style.display='none'">`;
    });
  } else {
    galleryWrap.style.display = 'none';
  }

  const pressWrap = document.getElementById('modalPressWrap');
  const press     = document.getElementById('modalPress');
  press.innerHTML = '';
  if (data.press && data.press.length > 0) {
    pressWrap.style.display = 'block';
    data.press.forEach(p => {
      press.innerHTML += `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="modal-press-btn">${p.name}</a>`;
    });
  } else {
    pressWrap.style.display = 'none';
  }

  // Recent Activity
  const recentWrap = document.getElementById('modalRecentWrap');
  const recentEl   = document.getElementById('modalRecent');
  if (recentWrap && recentEl) {
    const matching = recentUpdates
      .filter(u => u.cardKey === key)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    if (matching.length > 0) {
      recentWrap.style.display = 'block';
      recentEl.innerHTML = '';
      matching.forEach(u => {
        const dateStr = new Date(u.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const linkHtml = u.link
          ? `<a href="${u.link}" target="_blank" rel="noopener noreferrer" class="modal-recent-link">View →</a>`
          : '';
        recentEl.innerHTML += `
          <div class="modal-recent-item">
            <div class="modal-recent-date">${dateStr}</div>
            <div>
              <div class="modal-recent-headline">${u.headline}</div>
              <div class="modal-recent-desc">${u.desc}</div>
              ${linkHtml}
            </div>
          </div>`;
      });
    } else {
      recentWrap.style.display = 'none';
    }
  }

  backdrop.style.display = 'block';
  modal.style.display    = 'flex';
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    backdrop.classList.add('modal-open');
    modal.classList.add('modal-open');
  });
}

function closeModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const modal    = document.getElementById('caseModal');
  const hero     = document.getElementById('modalHero');

  backdrop.classList.remove('modal-open');
  modal.classList.remove('modal-open');
  document.body.style.overflow = '';

  setTimeout(() => {
    backdrop.style.display = 'none';
    modal.style.display    = 'none';
    hero.innerHTML = '';
    hero.style.backgroundImage = '';
  }, 400);
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
});

/* ─── WORK GRID EXPAND / COLLAPSE ───────────────────────────── */
const workBtn      = document.querySelector('.work-expand-btn');
const workExpanded = document.querySelector('.work-grid-expanded');
const teaserRow    = document.getElementById('workTeaserRow');
let workOpen = false;

if (workBtn && workExpanded) {
  workBtn.addEventListener('click', function() {
    workOpen = !workOpen;

    if (workOpen) {
      workExpanded.style.maxHeight = workExpanded.scrollHeight + 'px';
      workExpanded.style.opacity   = '1';
      workExpanded.style.overflow  = 'visible';
      if (teaserRow) {
        teaserRow.style.opacity     = '0';
        teaserRow.style.maxHeight   = '0';
        teaserRow.style.overflow    = 'hidden';
        teaserRow.style.pointerEvents = 'none';
      }
      const btnText  = workBtn.querySelector('.btn-text');
      const btnArrow = workBtn.querySelector('.btn-arrow');
      if (btnText)  btnText.textContent  = 'Show fewer examples';
      if (btnArrow) btnArrow.textContent = '↑';
      workBtn.style.animation = 'none';
    } else {
      workExpanded.style.maxHeight = '0';
      workExpanded.style.opacity   = '0';
      workExpanded.style.overflow  = 'hidden';
      if (teaserRow) {
        teaserRow.style.opacity     = '1';
        teaserRow.style.maxHeight   = '400px';
        teaserRow.style.pointerEvents = 'all';
      }
      const btnText  = workBtn.querySelector('.btn-text');
      const btnArrow = workBtn.querySelector('.btn-arrow');
      if (btnText)  btnText.textContent  = 'See all work examples';
      if (btnArrow) btnArrow.textContent = '↓';
      workBtn.style.animation = 'btnBounce 2s ease-in-out infinite';
    }
  });
}

/* ─── TALENT ROSTER EXPAND / COLLAPSE ───────────────────────── */
(function initTalentExpand() {
  const btn  = document.querySelector('.talent-expand-btn');
  const grid = document.getElementById('talentGridExpanded');
  if (!btn || !grid) return;

  let open = false;

  btn.addEventListener('click', () => {
    open = !open;
    if (open) {
      grid.style.maxHeight = grid.scrollHeight + 'px';
      grid.style.opacity   = '1';
      const txt = btn.querySelector('.talent-btn-text');
      const arr = btn.querySelector('.talent-btn-arrow');
      if (txt) txt.textContent = 'Collapse roster';
      if (arr) arr.textContent = '↑';
    } else {
      grid.style.maxHeight = '0';
      grid.style.opacity   = '0';
      const txt = btn.querySelector('.talent-btn-text');
      const arr = btn.querySelector('.talent-btn-arrow');
      if (txt) txt.textContent = 'See full talent roster';
      if (arr) arr.textContent = '↓';
    }
  });
})();

/* ─── BRAND PARTNER DETAIL PANELS ───────────────────────────── */
const brandDetails = {
  skyy: {
    name: 'SKYY Vodka',
    campaign: 'Born to Be Original — Pride 2022',
    desc: "SKYY Vodka's involvement for Pride 2022 included a 9 week organic social campaign titled Born to be Original. This educational campaign showcased real people from the LGBTQ+ community that represented each color of the flag and the meaning behind it.",
    image: 'images/SKYY.png',
    imageStyle: 'contain',
    imageBg: '#ffffff',
    link: null
  },
  audi: {
    name: 'Audi Gay Ski Week',
    campaign: 'Aspen Gay Ski Week Activation',
    desc: "2025 marks Audi's 4th consecutive year at Aspen Gay Ski Week. Branded touchpoints across Gondola Plaza and Snowmass including vehicle displays, the Audi Ring Swing, branded cocoa carts, and the Audi Skiii-Lift bench with inclusive messaging — all designed to encourage community and user-generated content.",
    image: 'images/Audi Gay Skii Week.png',
    link: null
  },
  lyft: {
    name: 'Lyft',
    campaign: 'Girls Inc. \xd7 Coco Jones Partnership',
    desc: 'Provided Lyft codes in partnership with Girls Inc. to ensure that their mentees could attend the Coco Jones concert without spending a dime. Lyft generously provided transportation codes to ensure safe and accessible travel for all Girls Inc. attendees.',
    image: 'images/Lyft.png',
    link: null
  },
  redbull: {
    name: 'Red Bull',
    campaign: 'WME Fashion Incubator',
    desc: 'Red Bull is the premier sponsor of the WME Fashion Incubator, supporting young creatives in the fashion industry to propel them to the next level.',
    image: 'images/RedBull.png',
    imageStyle: 'contain',
    imageBg: '#ffffff',
    imageHeight: '320px',
    link: null
  },
  ufc: {
    name: 'UFC',
    campaign: 'We Are All Fighters \xd7 GLAAD',
    desc: 'Supported UFC on the We Are All Fighters campaign in partnership with GLAAD, raising over $15,000 in support of LGBTQ+ advocacy.',
    image: 'images/UFC We are all fighters.jpg',
    imageStyle: 'contain',
    imageBg: '#0a0a0a',
    link: 'https://www.ufc.com/news/ufc-raises-more-than-15k-for-GLAAD-we-are-all-fighters'
  }
};

(function initBrandPanels() {
  const brandCells = document.querySelectorAll('.brand-cell');
  const brandPanel = document.getElementById('brandDetailPanel');
  const brandInner = document.getElementById('brandDetailInner');
  const brandClose = document.getElementById('brandDetailClose');
  if (!brandPanel || !brandInner) return;

  let activeBrand = null;

  brandCells.forEach(cell => {
    cell.addEventListener('click', function() {
      const key  = this.dataset.brand;
      const data = brandDetails[key];
      if (!data) return;

      if (activeBrand === key) {
        closeBrandPanel();
        return;
      }

      activeBrand = key;
      document.querySelectorAll('.brand-cell').forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const imgHtml = data.image
        ? `<div style="width:100%; height:${data.imageHeight || '280px'}; overflow:hidden; background:${data.imageBg || 'var(--paper-warm)'};">
             <img src="${data.image}" alt="${data.name}" style="width:100%; height:100%; object-fit:${data.imageStyle || 'cover'}; object-position:center; display:block;" onerror="this.parentElement.style.background='var(--paper)'">
           </div>`
        : `<div style="width:100%; height:280px; background:var(--paper); display:flex; align-items:center; justify-content:center;">
             <span style="font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--warm-grey);">${data.name}</span>
           </div>`;

      const linkHtml = data.link
        ? `<a href="${data.link}" target="_blank" rel="noopener noreferrer" class="brand-detail-link">View more →</a>`
        : '';

      brandInner.innerHTML = `
        <div>
          <div class="brand-detail-campaign">${data.campaign}</div>
          <div class="brand-detail-name">${data.name}</div>
          <div class="brand-detail-desc">${data.desc}</div>
          ${linkHtml}
        </div>
        <div>${imgHtml}</div>
      `;

      brandPanel.classList.add('open');
      if (!suppressScroll) {
        setTimeout(() => {
          brandPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });

  function closeBrandPanel() {
    brandPanel.classList.remove('open');
    document.querySelectorAll('.brand-cell').forEach(c => c.classList.remove('active'));
    activeBrand = null;
  }

  if (brandClose) brandClose.addEventListener('click', closeBrandPanel);
})();

/* ─── ROTATING UPDATE BANNER ─────────────────────────────────── */
function initUpdateBanner() {
  const banner = document.getElementById('updateBanner');
  const textEl = document.getElementById('updateBannerText');
  if (!banner || !textEl || !recentUpdates.length) return;

  const sorted = [...recentUpdates].sort((a, b) => new Date(b.date) - new Date(a.date));
  let currentIndex = 0;
  let rotationInterval;

  function formatBannerText(update) {
    const date = new Date(update.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${update.client} · ${update.headline} · ${date}`;
  }

  function showUpdate(index) {
    textEl.classList.add('fade-out');
    textEl.classList.remove('visible');
    setTimeout(() => {
      textEl.textContent = formatBannerText(sorted[index]);
      textEl.classList.remove('fade-out');
      textEl.classList.add('fade-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          textEl.classList.remove('fade-in');
          textEl.classList.add('visible');
        });
      });
    }, 300);
  }

  textEl.textContent = formatBannerText(sorted[0]);
  textEl.classList.add('visible');

  function startRotation() {
    rotationInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sorted.length;
      showUpdate(currentIndex);
    }, 4000);
  }

  startRotation();

  banner.addEventListener('click', () => {
    const current = sorted[currentIndex];
    if (current.link) {
      window.open(current.link, '_blank', 'noopener noreferrer');
    } else {
      openModal(current.cardKey);
    }
  });

  banner.addEventListener('mouseenter', () => clearInterval(rotationInterval));
  banner.addEventListener('mouseleave', startRotation);
}

/* ─── NEW BADGES ─────────────────────────────────────────────── */
function applyNewBadges() {
  const now = new Date();
  const ninetyDays = 90 * 24 * 60 * 60 * 1000;
  const recentKeys = new Set(
    recentUpdates
      .filter(u => (now - new Date(u.date)) < ninetyDays)
      .map(u => u.cardKey)
  );
  document.querySelectorAll('[onclick]').forEach(card => {
    const onclickVal = card.getAttribute('onclick') || '';
    const match = onclickVal.match(/openModal\(['"](\w+)['"]\)/);
    if (match && recentKeys.has(match[1])) {
      if (!card.querySelector('.case-new-badge')) {
        const badge = document.createElement('div');
        badge.className = 'case-new-badge';
        badge.textContent = 'Updated';
        const imgDiv = card.querySelector('.card-img');
        if (imgDiv) {
          imgDiv.style.position = 'relative';
          imgDiv.appendChild(badge);
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initUpdateBanner);
document.addEventListener('DOMContentLoaded', applyNewBadges);

// Auto-open Audi panel on load to signal interactivity
let suppressScroll = true;

document.addEventListener('DOMContentLoaded', function() {
  const audiCell = document.querySelector('.brand-cell[data-brand="audi"]');
  if (audiCell) {
    setTimeout(() => {
      audiCell.click();
      setTimeout(() => { suppressScroll = false; }, 100);
    }, 800);
  }
});


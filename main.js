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
    date: '2026-09-11',
    client: 'Vic Blends',
    cardKey: 'vic',
    headline: 'Joins Cantor Fitzgerald Charity Day, securing $60K for the Two-Six Project',
    desc: "Vic Blends joined the trading floor for Cantor Fitzgerald's annual Charity Day, securing a $60,000 donation for the Two-Six Project and its work with under-resourced youth.",
    tag: 'Fundraising',
    link: null
  },
  {
    date: '2026-09-17',
    client: 'William Goodge',
    cardKey: 'william',
    headline: 'Previews Mission America on The Rich Roll Podcast',
    desc: 'William returned to The Rich Roll Podcast to break down the challenge of 50 marathons in 50 states in 24 days, from fueling 9,000 calories a day on the move to processing grief through running.',
    tag: 'Media',
    link: 'https://richroll.com/podcast/william-goodge-1014/',
    showInBanner: false
  },
  {
    date: '2026-10-04',
    client: 'William Goodge',
    cardKey: 'william',
    headline: 'Mission America is live ahead of the October 9 start',
    desc: 'Donations are coming in as William Goodge prepares to attempt 50 marathons across 50 states in 24 days in support of Stand Up To Cancer, with a $250,000 fundraising goal.',
    tag: 'Launch',
    link: 'https://missionamerica50.org/'
  },
  {
    date: '2026-09-22',
    client: "Lupita Nyong'o",
    cardKey: 'lupita',
    headline: 'Takes the stage at the 2026 Clinton Global Initiative',
    desc: "Lupita joined Chelsea Clinton and Katy Brodsky Falco on stage at CGI 2026 to advocate for increased medical research, more treatment options, and expanded funding for women's health. Sharing her own fibroids diagnosis, she noted that 26 million women in the U.S. have fibroids and that women in their 20s are still told a hysterectomy is the answer: \"This thing is too pervasive for us to be so casual about it.\"",
    tag: 'Speaking',
    link: 'https://youtu.be/dMBh0UW-QRY'
  },
  {
    date: '2026-08-30',
    client: 'Sam Smith',
    cardKey: 'sam',
    headline: 'The Pink House Foundation relaunches with 5 grantee partners',
    desc: 'The Pink House Foundation relaunches supporting AKT, Ali Forney Center, Courage+, Manos Amigues, and Stonewall Housing — organisations providing safe spaces, housing, and community for LGBTQIA+ youth across the UK and US.',
    tag: 'Foundation',
    link: 'https://thepinkhousefoundation.com/'
  },
  {
    date: '2026-07-01',
    client: 'WME Fashion Incubator',
    cardKey: 'incubator',
    headline: 'WME Fashion partners with Milk Makeup for third cycle',
    desc: 'Mentees will participate in a photoshoot for Milk Makeup at their SoHo headquarters, executing hair, makeup, wardrobe styling, photography, and management. 40 mentees have come through the program across two cycles, selected from nearly 1,000 applicants.',
    tag: 'Partnership',
    link: 'https://wwd.com/fashion-news/fashion-scoops/wme-fashion-partners-milk-makeup-incubator-program-foster-next-gen-creative-talent-1239048569/'
  },
  {
    date: '2026-08-26',
    client: 'Joe Santagato',
    cardKey: 'joe',
    headline: 'Happy Cry Fund partners with Sharing Excess — 250,000+ meals provided',
    desc: 'The Happy Cry Fund partnered with Sharing Excess to spotlight food waste and food insecurity across America. Joe Santagato and The Basement Yard crew joined the national food rescue nonprofit for a day of volunteering. The partnership included a donation helping Sharing Excess provide 250,000+ meals to communities in need. The reel has garnered over 650,000 views.',
    tag: 'Partnership',
    link: 'https://www.instagram.com/joesantagato/reel/DbEEa_fxMPU/'
  },
  {
    date: '2026-07-29',
    client: "Lupita Nyong'o",
    cardKey: 'lupita',
    headline: 'Honored by The White Dress Project in Atlanta',
    desc: 'Lupita was honored by The White Dress Project in recognition of her Make Fibroids Count campaign and her continued efforts to raise awareness and unlock greater funding for uterine fibroid research.',
    tag: 'Recognition',
    link: null
  },
  {
    date: '2026-07-28',
    client: "Lupita Nyong'o",
    cardKey: 'lupita',
    headline: 'Fibroid advocacy woven into The Odyssey press tour',
    desc: 'Alongside The Odyssey press tour, Lupita has intentionally embedded fibroid advocacy into major coverage including cover stories with Elle, Who What Wear, and a Vogue feature alongside US Senator Angela Alsobrooks spotlighting the bipartisan U-FIGHT Act.',
    tag: 'Campaign',
    link: null
  },
  {
    date: '2025-08-24',
    client: 'Paige Lorenze and Tommy Paul',
    cardKey: 'kids',
    headline: 'US Open Activation with NYJTL',
    desc: '10 student athletes aged 16 to 18 experienced the US Open with Tommy Paul, including practice sessions, a Players Lounge tour, and lunch at Arthur Ashe Stadium. The reel has garnered over 1 million views on Instagram.',
    tag: 'Activation',
    link: 'https://www.instagram.com/reel/Dcee363B0U0/'
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
    link: null,
    showInBanner: false
  },
];

/* ─── CASE STUDY DATA ────────────────────────────────────────── */
const caseStudies = {
  vic: {
    eyebrow: 'Vic Blends × Two-Six Project',
    title: 'Cantor Fitzgerald Charity Day',
    desc: "Brought Vic Blends to the trading floor for Cantor Fitzgerald's annual Charity Day on September 11, where Cantor Fitzgerald and BGC Group donate a day's revenue in honor of the 658 Cantor Fitzgerald colleagues lost on 9/11. Vic's participation secured a $60,000 donation for the Two-Six Project, which supports under-resourced youth through mentorship, early literacy, STEAM programs and scholarships.",
    hero: { type: 'image', src: 'images/vic-blends.jpg', position: 'center 20%' },
    stats: [
      { number: '$60K', label: 'Donated to the Two-Six Project' }
    ],
    gallery: [],
    partners: [
      { name: 'Two-Six Project', url: 'https://www.twosixproject.com/', logo: 'https://images.squarespace-cdn.com/content/v1/6920b382e478d8416df3aecb/6171da3c-a01b-4e43-b517-8aa706bcc16d/two+six+logo.png?format=750w' }
    ],
    press: [
      { name: 'Cantor Fitzgerald Charity Day', url: 'https://www.cantorrelief.org/charity-day/' }
    ]
  },

  nxt: {
    eyebrow: 'Industry Access Program',
    title: 'WME NXT',
    desc: "Supported the evolution of WME NXT, a free industry access program broadening pathways into entertainment and fashion, along with the programs around it, from NYFW: NXT, the 2020 virtual training program with IMG that drew more than 1,600 registrants, through the summer series to the 2025 NXT Industry Sessions with Ryan Reynolds' Group Effort Initiative. The 2025 sessions ran from October 27 to November 21 as a free online course of video lectures, weekly readings and assignments, giving emerging talent direct perspective from agents, producers and managers. Since launching in 2020, WME NXT has reached more than 27,000 participants and led to 60 hires across WME and its affiliates, with further placements at Disney, HBO and MACRO.",
    hero: { type: 'image', src: 'images/events/logos/WME.webp', position: 'center', size: 'auto 34%', bg: '#fff' },
    stats: [
      { number: '27,000+', label: 'Participants since 2020' },
      { number: '60', label: 'Hires across WME and affiliates' }
    ],
    gallery: [],
    press: [
      { name: 'The Hollywood Reporter', url: 'https://www.hollywoodreporter.com/news/general-news/ryan-reynolds-group-effort-initiative-wme-nxt-sessions-2025-1236403308/' },
      { name: 'Variety — NYFW: NXT', url: 'https://variety.com/2020/digital/news/nyfw-nxt-virtual-training-program-1234784247/' }
    ]
  },

  joy: {
    eyebrow: 'Joy Reid × When We All Vote',
    title: 'Party at the Polls Coalition Call',
    desc: "Booked Joy Reid to headline the Party at the Polls coalition call for When We All Vote, the nonpartisan voting organization launched by Michelle Obama, rallying hosts, partners and volunteers from across the country ahead of early voting. Party at the Polls is When We All Vote's largest program to date, working to reach more than 20 million voters through over 5,000 nonpartisan community events at or near polling locations.",
    hero: { type: 'image', src: 'images/joy-reid.jpg', position: '45% 30%' },
    stats: [
      { number: '300+', label: 'Registered attendees' },
      { number: '20M+', label: 'Voters targeted' }
    ],
    gallery: [],
    partners: [
      { name: 'When We All Vote', url: 'https://whenweallvote.org/', logo: 'images/partners/when-we-all-vote.png' }
    ],
    press: []
  },

  william: {
    eyebrow: 'William Goodge × Stand Up To Cancer',
    title: 'Mission America',
    desc: 'William Goodge will attempt to complete 50 marathons across 50 states in 24 days in support of Stand Up To Cancer, with a $250,000 fundraising goal. The officially recognized Guinness World Records attempt starts October 9 in Honolulu and finishes with marathon 50 in New York City, run in memory of his mother, Amanda, who passed away from cancer in 2018. Powered by Goodwin as the first chapter of the Goodwin Endurance Series, with private aviation, commercial flights and an RV fleet moving William between states. Fans can take part through leaderboards for top donating states and individuals, Strava challenges to run every day for 24 days or 50 miles in 24 days, and personal fundraising pages. William previously ran from Los Angeles to New York in 55 days and across Australia in 35 days.',
    hero: { type: 'image', src: 'https://missionamerica50.org/wp-content/uploads/2026/08/mission-america-william-goodge-thumbnail-bg.jpg', position: '50% 82%', size: '180%' },
    stats: [
      { number: '50', label: 'Marathons' },
      { number: '50', label: 'States' },
      { number: '24', label: 'Days' },
      { number: '$250K', label: 'Fundraising goal' }
    ],
    gallery: [],
    partners: [
      { name: 'Stand Up To Cancer', url: 'https://standuptocancer.org/', logo: 'https://standuptocancer.org/wp-content/uploads/stand-up-to-cancer-logo.png' }
    ],
    platformPartners: [
      { name: 'GoFundMe', url: 'https://www.gofundme.com/', logo: 'images/partners/gofundme-logo.png' }
    ],
    press: [
      { name: 'Mission America', url: 'https://missionamerica50.org/' },
      { name: 'Goodwin x Goodge', url: 'https://www.goodwingoodge.com/' },
      { name: 'RUN247', url: 'https://run247.com/running-news/ultramarathon-news/william-goodge-mission-america-announcement-2026' },
      { name: 'The Rich Roll Podcast', url: 'https://richroll.com/podcast/william-goodge-1014/' }
    ]
  },


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
    partners: [
      { name: 'Foundation for Women\'s Health', url: 'https://www.foundationwomenshealth.org/', logo: 'https://images.squarespace-cdn.com/content/v1/655650f04a21be1e39e53e84/f70d65f6-635f-4bab-a422-19f296ef1dee/FHW+LOGO+.png' }
    ],
    platformPartners: [
      { name: 'GoFundMe', url: 'https://www.gofundme.com/', logo: 'images/partners/gofundme-logo.png' }
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
    partners: [
      { name: 'Undue Medical Debt', url: 'https://unduemedicaldebt.org/', logo: 'https://unduemedicaldebt.org/wp-content/uploads/2024/01/LOGO_WEB.png' }
    ],
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
    desc: "Launched The Pink House Foundation to support LGBTQIA+ organisations and spaces that allow Queer youth to find their sanctuary, discover community and let the walls they've built crumble until only their truest selves remain. For founder Sam Smith, the Pink House was their real home in the English countryside — a space of total warmth and love, and somewhere they felt safe enough to find their voice and discover who they were. The foundation supports and partners with organisations changing Queer lives every day across the UK and US, with grants supporting housing, mental health, and community building for LGBTQIA+ youth.",
    hero: { type: 'image', src: 'images/sam-smith.jpg', position: 'center top', overlay: 'rgba(210,80,120,0.25)', logoOverlay: 'https://thepinkhousefoundation.com/__l5e/assets-v1/4d693064-957b-4329-819b-0c73252ce376/ph-logo.png' },
    stats: [
      { number: '5', label: 'Partner charities supported' },
      { number: '2', label: 'Countries — UK and US' }
    ],
    gallery: [],
    partners: [
      { name: 'akt', url: 'https://www.akt.org.uk/', logo: 'https://www.informationnow.org.uk/wp-content/uploads/2023/04/AKT-logo.png' },
      { name: 'Ali Forney Center', url: 'https://www.aliforneycenter.org/', logo: 'https://static.wixstatic.com/media/8fd74d_a44df7e475014926b0e7873e59619c3a~mv2.png' },
      { name: 'Courage+', url: 'https://courageplus.org/', logo: 'images/partners/courage-plus.jpg' },
      { name: 'Manos Amigues', url: 'https://www.manosamigues.org/', logo: 'https://images.squarespace-cdn.com/content/v1/68b88fddfa555011b29954f7/669e96e8-4fb1-4d87-aa3f-f371ab89d6f6/MANOS+AMIGUES_Mesa+de+trabajo+1%281%29.png?format=750w' },
      { name: 'Stonewall Housing', url: 'https://stonewallhousing.org/', logo: 'https://stonewallhousing.org/wp-content/uploads/2022/06/logo3_red.png' }
    ],
    press: [
      { name: 'The Pink House Foundation', url: 'https://thepinkhousefoundation.com/' },
      { name: 'Donate', url: 'https://donate.supportedgiving.com/the-pink-house-foundation-social-media?qrCode=aisYtegl3Ova&visitor=c87260ea-2f4a-4121-ba5b-6efa053d0052&utm_source=ig&utm_medium=social&utm_content=link_in_bio' }
    ],
    accentColor: '#E8A0B0'
  },

  venus: {
    eyebrow: 'Venus Williams \xd7 Saving Mothers',
    title: 'Advancing Equity in Maternal Health',
    desc: "Teamed up with Saving Mothers and NYU Langone to advance the organization’s mission to reduce maternal mortality and improve health outcomes for underserved women. This partnership amplifies access to lifesaving care, education, and advocacy in fibroid diagnosis and treatment.",
    hero: { type: 'image', src: 'images/venus-williams/Venus Headshot_Credit to Laura Metzler Photography.jpg', position: 'center top' },
    stats: [],
    gallery: [],
    partners: [
      { name: 'Saving Mothers', url: 'https://www.savingmothers.org/', logo: 'images/partners/saving-mothers.png' }
    ],
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
    desc: 'An annual three-month program designed to expand access across creative and executive fashion careers. Built at the intersection of talent, community, and industry, the mission connects emerging leaders with top creatives and executives shaping the global landscape. 40 mentees have come through the program during its first two cycles, selected out of nearly 1,000 applicants. For its third cycle, WME Fashion has partnered with Milk Makeup — mentees will participate in a photoshoot at Milk headquarters in SoHo, executing hair, makeup, wardrobe styling, photography, and management around the shoot.',
    hero: { type: 'localvideo', src: 'images/Incubator-Sizzle-Website-23.mov' },
    stats: [
      { number: '40', label: 'Mentees across two cycles' },
      { number: '1,000+', label: 'Applications received' }
    ],
    gallery: [
      { src: 'images/incubator-milk-makeup.png', alt: 'WME Fashion Incubator x Milk Makeup partnership' },
      { src: 'images/p2-002.png', alt: 'WME Incubator editorial shoot' }
    ],
    press: [
      { name: 'WWD — Milk Makeup Partnership', url: 'https://wwd.com/fashion-news/fashion-scoops/wme-fashion-partners-milk-makeup-incubator-program-foster-next-gen-creative-talent-1239048569/' },
      { name: 'Blanc Magazine', url: 'https://blancmagazine.com/the-veil-wme-incubator/' },
      { name: 'WME Fashion', url: 'https://wmefashion.com/incubator-2026/' },
      { name: 'WWD', url: 'https://wwd.com/fashion-news/fashion-scoops/wme-fashion-incubator-program-how-to-apply-1236511627/' },
      { name: 'WWD', url: 'https://wwd.com/fashion-news/fashion-scoops/wme-fashion-application-second-cycle-incubator-program-creative-executive-careers-fashion-1237310925/' },
      { name: 'Dazed Digital', url: 'https://www.dazeddigital.com/fashion/article/60686/1/underrepresented-talent-shines-the-wall-group-fashion-incubator-2023' }
    ]
  },

  winnie: {
    eyebrow: 'Winnie Harlow \xd7 BBR Creator Summit',
    title: 'The CEO Club',
    desc: "Headlined Black Beauty Roster’s Creator Summit as keynote speaker, with her conversation filmed by Amazon for its docuseries The CEO Club. The appearance amplified diverse female leadership and entrepreneurship, reflecting her commitment to championing representation and empowering the next generation of founders.",
    hero: { type: 'image', src: 'images/winnie-harlow/Winnie Harlow BBR 2.jpeg copy.jpg', position: 'left 20% top 0%' },
    stats: [],
    gallery: [],
    partners: [
      { name: 'Black Beauty Roster', url: 'https://www.blackbeautyroster.com/', logo: 'images/partners/black-beauty-roster.jpg' }
    ],
    press: []
  },

  kids: {
    eyebrow: 'Paige Lorenze and Tommy Paul',
    title: 'Kids Outdoors Foundation',
    desc: 'Launched the Kids Outdoors Foundation, expanding access to high-barrier sports like tennis, skiing, and horseback riding. Rooted in their athletic backgrounds, the foundation will fund existing programs and host community-driven events, reflecting their shared belief that sport builds confidence, resilience, and opportunity for the next generation.',
    hero: { type: 'image', src: 'images/kids-outdoors/KidsOutdoors Announcement.jpg.avif', position: 'center top 5%' },
    stats: [
      { number: '1M+', label: 'Instagram views on the US Open reel' }
    ],
    gallery: [],
    partners: [
      { name: 'NYJTL', url: 'https://www.nyjtl.org/', logo: 'https://www.nyjtl.org/wp-content/uploads/logo-Full.jpg' }
    ],
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
    partners: [
      { name: 'Everytown for Gun Safety', url: 'https://www.everytown.org/', logo: 'https://www.everytown.org/wp-content/themes/everytownaction/static/img/everytown-logo.svg' },
      { name: 'MusiCares', url: 'https://www.musicares.org/', logo: 'https://media-musicares.grammy.net/uploads/2026/06/logo-musicares-1-150x35.avif' }
    ],
    press: []
  },

  pokimane: {
    eyebrow: 'Pokimane \xd7 UNICEF',
    title: 'Play For Every Child',
    desc: 'Attended the UNICEF gala and participated in Play For Every Child, a content series featuring celebrity reflections on the role of play in childhood and development, using her platform to amplify global advocacy for children.',
    hero: { type: 'image', src: 'images/pokimane/pokimane.avif', position: 'center top' },
    stats: [],
    gallery: [],
    partners: [
      { name: 'UNICEF USA', url: 'https://www.unicefusa.org/', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/United-nations-childrens-fund-unicef-logo.png' }
    ],
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
    partners: [
      { name: 'Save the Children', url: 'https://www.savethechildren.org/', logo: 'images/partners/save-the-children.png' }
    ],
    press: []
  },

  coco: {
    eyebrow: 'Coco Jones \xd7 Girls Inc.',
    title: 'Why Not More? Tour Partnership',
    desc: 'Partnered with Girls Inc. to create memorable experiences for young girls in select cities by donating VIP tickets, private meet-and-greets and transportation. With support from Lyft, the partnership ensured safe transportation and reflected her commitment to uplifting the next generation of young women.',
    hero: { type: 'image', src: 'images/coco-jones/coco-jones-Header.png.webp', position: 'center top' },
    stats: [],
    gallery: [],
    partners: [
      { name: 'Girls Inc.', url: 'https://girlsinc.org/', logo: 'images/partners/girls-inc.png' }
    ],
    press: []
  },

  annie: {
    eyebrow: 'Annie Elise \xd7 Child Rescue Coalition',
    title: 'SERIALously Partnership',
    desc: 'Launched a partnership with Child Rescue Coalition to amplify their mission of protecting children from exploitation on the internet. Through dedicated SERIALously podcast episodes, CrimeCon appearances, custom merchandise and newsletter features, using her platform to raise funds and drive awareness.',
    hero: { type: 'image', src: 'images/annie-elise/Annie Elise.jpg.webp', position: 'center top' },
    stats: [],
    gallery: [],
    partners: [
      { name: 'Child Rescue Coalition', url: 'https://childrescuecoalition.org/', logo: 'images/partners/child-rescue-coalition.png' }
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
    partners: [
      { name: 'Safar Global Foundation', url: 'https://www.safarglobalfoundation.org/', logo: 'https://images.squarespace-cdn.com/content/v1/670e870bb27d301f58651a38/60aded9f-3205-4243-8c84-f1770e4cdf3a/Safar_Jacko.png?format=750w' }
    ],
    press: []
  },

  joe: {
    eyebrow: 'Joe Santagato',
    title: 'The Happy Cry Fund',
    desc: 'Helped Joe Santagato launch The Happy Cry Fund, a new charitable arm of his business supporting hunger relief, mental health, and youth development. Joe is personally donating $100,000 to launch the fund and committing $1 from every ticket sold on his upcoming tour through a partnership with PLUS1. The fund builds on the community Joe has created through The Basement Yard and reflects his commitment to using his platform for social good.',
    hero: { type: 'image', src: 'images/joe-santagato.png', position: 'center top' },
    stats: [
      { number: '$100K', label: 'Personal launch donation' },
      { number: '$1', label: 'Per ticket sold on tour via PLUS1' },
      { number: '250K+', label: 'Meals provided via Sharing Excess' },
      { number: '650K+', label: 'Instagram views on the Sharing Excess reel' }
    ],
    gallery: [
      { src: 'images/joe-santagato-sharing-excess.png', alt: 'Joe Santagato x Sharing Excess — Happy Cry Fund volunteering day' }
    ],
    partners: [
      { name: 'Sharing Excess', url: 'https://www.sharingexcess.com/', logo: 'https://cdn.prod.website-files.com/67d1d2d9c708819c5185d49c/687a640339afb6f59498f646_open_graph.png' },
      { name: 'PLUS1', url: 'https://www.plus1.org/', logo: 'images/partners/plus1.png' }
    ],
    press: [
      { name: 'People', url: 'https://people.com' },
      { name: 'Instagram — 650K+ views', url: 'https://www.instagram.com/joesantagato/reel/DbEEa_fxMPU/' },
      { name: 'Happy Cry Fund', url: 'https://happycry.org' }
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

  // Apply accent color if defined (resets to orange on closeModal)
  const accentColor = data.accentColor || '#E8500A';
  document.documentElement.style.setProperty('--modal-accent', accentColor);

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
    hero.style.backgroundSize   = data.hero.size || 'cover';
    hero.style.backgroundRepeat = 'no-repeat';
    hero.style.backgroundColor  = data.hero.bg || '';

    if (data.hero.overlay) {
      const overlayDiv = document.createElement('div');
      overlayDiv.style.cssText = `position:absolute;inset:0;background:${data.hero.overlay};z-index:1;pointer-events:none;`;
      hero.appendChild(overlayDiv);
    }

    if (data.hero.badge) {
      const badge = document.createElement('img');
      badge.src = data.hero.badge;
      badge.alt = 'Partner logo';
      badge.className = 'hero-logo-badge';
      hero.appendChild(badge);
    }

    if (data.hero.logoOverlay) {
      const logoImg = document.createElement('img');
      logoImg.src = data.hero.logoOverlay;
      logoImg.alt = 'Foundation logo';
      logoImg.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100px;z-index:2;opacity:0.9;filter:brightness(0) invert(1);pointer-events:none;';
      hero.appendChild(logoImg);
    }
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

  // Partner sections: logo tile when a logo file is set, wordmark otherwise
  const renderPartners = (wrapId, listId, list) => {
    const wrap = document.getElementById(wrapId);
    const el   = document.getElementById(listId);
    if (!wrap || !el) return;
    el.innerHTML = '';
    if (!list || list.length === 0) { wrap.style.display = 'none'; return; }
    wrap.style.display = 'block';
    list.forEach(p => {
      const logo = p.logo
        ? `<img src="${p.logo.replace(/ /g, '%20')}" alt="${p.name} logo" class="modal-partner-logo" loading="lazy" onerror="this.parentElement.classList.add('no-logo'); this.remove();">`
        : '';
      el.innerHTML += `
        <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="modal-partner${p.logo ? '' : ' no-logo'}" aria-label="${p.name} (opens in a new tab)">
          ${logo}
          <span class="modal-partner-name">${p.name}</span>
          <span class="modal-partner-arrow" aria-hidden="true">↗</span>
        </a>`;
    });
  };
  // One partner section: 'Partners' when non-nonprofit partners are included, 'Nonprofit Partners' otherwise
  const allPartners = [...(data.partners || []), ...(data.platformPartners || [])];
  const partnersLabel = document.getElementById('modalPartnersLabel');
  if (partnersLabel) partnersLabel.textContent = (data.platformPartners && data.platformPartners.length) ? 'Partners' : 'Nonprofit Partners';
  renderPartners('modalPartnersWrap', 'modalPartners', allPartners);

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
        const dateStr = new Date(u.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
  document.documentElement.style.setProperty('--modal-accent', '#E8500A');

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
    workBtn.setAttribute('aria-expanded', workOpen ? 'true' : 'false');

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

  const sorted = [...recentUpdates]
    .filter(u => u.showInBanner !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
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

document.addEventListener('DOMContentLoaded', initUpdateBanner);

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

/* ─── KEYBOARD ACCESSIBILITY — case cards ─────────────────────── */
document.querySelectorAll('.case-card[onclick]').forEach(card => {
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
});


/**
 * Pre-render script — generates static HTML for every route at build time.
 * Google gets real content immediately instead of a blank JS shell.
 *
 * Run after vite build: node prerender.mjs
 * The deploy script calls this automatically via package.json "build" step.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { visibleBlogSlugs } from './src/data/blogMarkets.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

// Mirrors src/config.ts INDIA_ONLY — same env var, same default, so the
// prerendered surface (pages, sitemap) matches what the app actually shows.
const INDIA_ONLY = (process.env.VITE_INDIA_ONLY ?? 'true') !== 'false';

// All routes that should be pre-rendered
const STATIC_ROUTES = [
  '/',
  '/assets',
  '/pricing',
  '/blog',
  '/start',
  '/contact-sales',
  '/hospitals',
  '/frameworks',
  '/melamphic',
  '/veterinary',
  '/dental',
  '/general-practice',
  '/allied-health',
  '/physiotherapy',
  '/osteopathy',
  '/chiropractic',
  '/occupational-therapy',
  '/podiatry',
  '/speech-therapy',
  '/products/point-of-care-evidence',
  '/products/statutory-form-infrastructure',
  '/products/institutional-compliance-hub',
  '/privacy', '/terms', '/cookies', '/dpa', '/subprocessors',
  '/refund-policy', '/acceptable-use', '/security',
];

// Derived from src/data/blogMarkets.mjs — the same map the app filters on.
// While INDIA_ONLY, rest-of-world regulator posts are neither prerendered
// nor listed in the sitemap, so crawlers never see content users can't reach.
const BLOG_SLUGS = visibleBlogSlugs(INDIA_ONLY);

const ALL_ROUTES = [
  ...STATIC_ROUTES,
  ...BLOG_SLUGS.map(s => `/blog/${s}`),
];

// Meta map — what title/description to inject per route
// (react-helmet-async writes these client-side, but we bake them into
// the HTML shell so crawlers see them before JS executes)
const META = {
  '/': {
    title: 'Clinical Governance Automation | Salvia',
    desc: 'Salvia is an AI compliance suite for vet, dental and clinical practices. Voice note in — audit-ready records, controlled-drug logs and incident trails out.',
  },
  '/pricing': {
    title: 'AI Clinical Documentation & Compliance Pricing | Salvia',
    desc: 'Salvia pricing for vet, dental, GP and allied health — Practice plan from $229/mo. Compliance-grade documentation, controlled-drug logs and audit trails.',
  },
  '/assets': {
    title: 'Brand Assets | Salvia',
    desc: 'Official Salvia brand assets, logos, and illustrations available for press and partners.',
  },
  '/blog': {
    title: 'From the compliance desk | Salvia',
    desc: 'Clinical documentation, compliance law, and audit readiness — written for vets, dentists, and clinicians who\'ve been burned by bad records.',
  },
  '/start': {
    title: 'Start your free Salvia trial | Salvia',
    desc: 'Request early access to Salvia — AI clinical documentation and compliance for Indian clinics, hospitals, dental and veterinary practices. 21 days free, no card.',
  },
  '/contact-sales': {
    title: 'Book a demo | Salvia',
    desc: 'See Salvia in action — compliance and governance automation for vet, dental, and clinical practices.',
  },
  '/hospitals': {
    title: 'Evidence & Compliance Platform for Indian Hospitals | Salvia',
    desc: 'Your HMIS bills and schedules — it was never built to defend you. Salvia sits on top: every consult becomes a clinician-verified, sealed record you can produce when a complaint arrives.',
  },
  '/melamphic': {
    title: 'Melamphic AI Private Limited',
    desc: 'Melamphic is an applied-AI company for high-stakes, regulated work. Our mission: make trustworthy documentation effortless. Our first product is Salvia.',
  },
  '/veterinary': {
    title: 'Veterinary Compliance Software | Salvia',
    desc: 'Salvia keeps vet records audit-ready for RCVS, VCNZ, VPB and CMA — clinical records, controlled-drug logs, consent and audit trail from one voice note.',
  },
  '/dental': {
    title: 'Dental Compliance Software | Salvia',
    desc: 'Salvia keeps dental practice records audit-ready for CQC, GDC, and AHPRA. BPE, STE, radiograph justification, and treatment plans captured at every visit.',
  },
  '/general-practice': {
    title: 'General Practice Compliance Software | Salvia',
    desc: 'Salvia keeps GP and clinic records audit-ready for CQC, AHPRA and MCNZ — structured records, prescribing logs, referral trails and consent from a voice note.',
  },
  '/allied-health': {
    title: 'Allied Health Compliance Software | Salvia',
    desc: 'Salvia keeps allied-health records audit-ready for CORU, HCPC, AHPRA, PBNZ and more — voice note to SOAP record, outcome measures, treatment log and discharge.',
  },
  '/physiotherapy': {
    title: 'Physiotherapy Compliance Software | CORU, HCPC, AHPRA, PBNZ | Salvia',
    desc: 'Salvia keeps physiotherapy records audit-ready for CORU, HCPC, AHPRA and PBNZ — voice note to SOAP record, outcome measures, treatment log and discharge.',
  },
  '/osteopathy': {
    title: 'Osteopathy Practice Software | GOsC, AHPRA, OCNZ | Salvia',
    desc: 'Salvia generates osteopathy records aligned with GOsC Osteopathic Practice Standards, AHPRA Osteopathy Board, and OCNZ. Voice note → structured treatment record.',
  },
  '/chiropractic': {
    title: 'Chiropractic Practice Software | GCC, AHPRA, CBNZ | Salvia',
    desc: 'Salvia generates chiropractic records aligned with GCC, AHPRA and CBNZ — voice note to a structured adjustment record, imaging log, consent and audit trail.',
  },
  '/occupational-therapy': {
    title: 'Occupational Therapy Software | CORU, HCPC, AHPRA, OTBNZ | Salvia',
    desc: 'Salvia keeps OT records audit-ready for CORU, HCPC, AHPRA OT Board and OTBNZ. Voice note → functional assessment, goals, intervention, outcome review.',
  },
  '/podiatry': {
    title: 'Podiatry Practice Software | CORU, HCPC, AHPRA | Salvia',
    desc: 'Salvia keeps podiatry records audit-ready for CORU, HCPC, AHPRA and PBNZ — voice note to assessment, wound register, sharps log, consent and treatment record.',
  },
  '/speech-therapy': {
    title: 'Speech Therapy Software | CORU, HCPC, SPA, ASHA | Salvia',
    desc: 'Salvia keeps speech and language therapy records audit-ready for CORU, HCPC, SPA, NZSTA and ASHA. Voice note → assessment, goals, intervention, progress review.',
  },
  '/frameworks': {
    title: 'Regulatory Frameworks We Support | Salvia',
    desc: 'Salvia generates audit-ready clinical records against 40+ regulatory frameworks across vet, dental, GP and allied health — CORU, HCPC, AHPRA, RCVS, CQC and more.',
  },
  '/products/point-of-care-evidence': {
    title: 'Statutory Evidence Capture | Salvia',
    desc: 'Voice note after each consult — Salvia maps audio directly to compliance-grade clinical records, controlled drug logs, and audit trails.',
  },
  '/products/statutory-form-infrastructure': {
    title: 'Statutory Form Infrastructure | Salvia',
    desc: 'Salvia\'s form infrastructure turns clinical notes into immutable, versioned records — audit-ready for CQC, VMR, and GDC compliance.',
  },
  '/products/institutional-compliance-hub': {
    title: 'Institutional Compliance Hub | Salvia',
    desc: 'Turn static policy PDFs into active clinical governance. Salvia maps your internal rules to CQC, VMR, and GDC frameworks.',
  },
  '/privacy': {
    title: 'Privacy Policy | Salvia',
    desc: 'How Salvia collects, uses, stores and protects personal and health data under India\'s DPDP Act 2023 and equivalent laws in AU, NZ, UK and the EU.',
  },
  '/terms': {
    title: 'Terms of Service | Salvia',
    desc: 'The terms governing use of Salvia\'s clinical documentation and compliance services — your responsibilities, plans, and clinical-safety disclaimers.',
  },
  '/cookies': {
    title: 'Cookie Policy | Salvia',
    desc: 'The cookies and similar technologies Salvia uses for essential functionality and analytics (PostHog, Cloudflare), and how to control them.',
  },
  '/dpa': {
    title: 'Data Processing Agreement (DPA) | Salvia',
    desc: 'Salvia\'s DPA for clinics: roles, instructions, sub-processors, security, transfers and breach handling under DPDP, GDPR, AU and NZ law.',
  },
  '/subprocessors': {
    title: 'Sub-processors | Salvia',
    desc: 'The third-party sub-processors Salvia uses to deliver its services (Deepgram, Google Gemini, Cloudflare, PostHog), what they do, and where they process data.',
  },
  '/refund-policy': {
    title: 'Refund & Cancellation Policy | Salvia',
    desc: 'How cancellations and refunds work for Salvia subscriptions.',
  },
  '/acceptable-use': {
    title: 'Acceptable Use Policy | Salvia',
    desc: 'The rules for using Salvia responsibly and lawfully — consents, security, and clinician review of AI output.',
  },
  '/security': {
    title: 'Security Overview | Salvia',
    desc: 'How Salvia protects clinical data: encryption (TLS 1.2+, AES-256), least-privilege access, tamper-evident audit trails and 72-hour breach response.',
  },
};

// India-launch overrides — the client pages already render India copy via
// useIsIndia(); these keep the CRAWLER view (static META) in sync so Google
// India isn't served RCVS/CQC/"$229 per month" copy on an India-only site.
const INDIA_META = {
  '/': {
    title: 'The Evidence Layer for Indian Healthcare | Salvia',
    desc: 'Salvia turns what clinicians say — ambient or dictated, any Indian language — into verified, sealed clinical records. Files you can produce when a complaint arrives, context at every visit.',
  },
  '/pricing': {
    title: 'AI Clinical Documentation & Compliance Pricing | Salvia',
    desc: 'Salvia pricing for Indian clinics — Starter ₹1,000/mo, Clinic ₹3,000/mo, Group ₹6,000/mo. Per-clinic, not per-seat; AI notes, drug register and audit trails on every tier.',
  },
  '/veterinary': {
    title: 'Veterinary Compliance Software | Salvia',
    desc: 'Salvia keeps vet records audit-ready for VCI, the IVC Act 1984, Schedule H1 and state veterinary councils — records, drug logs, consent and audit trail from one voice note.',
  },
  '/dental': {
    title: 'Dental Compliance Software | Salvia',
    desc: 'Salvia keeps dental clinic records audit-ready for DCI, NABH and AERB. BPE, radiograph justification and treatment plans captured at every visit.',
  },
  '/general-practice': {
    title: 'General Practice Compliance Software | Salvia',
    desc: 'Salvia keeps clinic and GP records audit-ready for NMC, NABH and ABDM — structured records, prescribing logs, referral trails and consent from a voice note.',
  },
  '/allied-health': {
    title: 'Allied Health Compliance Software | Salvia',
    desc: 'Salvia keeps allied-health records structured and defensible — voice note to SOAP record, outcome measures, treatment log and discharge, built for Indian practices.',
  },
  '/frameworks': {
    title: 'Regulatory Frameworks We Support | Salvia',
    desc: 'Audit-ready records against 50+ frameworks — NABH, ABDM, NMC record rules, DPDP Act, Schedule H1, PC-PNDT and Consumer Protection Act 2019, plus international regulators.',
  },
  '/products/statutory-form-infrastructure': {
    title: 'Statutory Form Infrastructure | Salvia',
    desc: 'Salvia\'s form infrastructure turns clinical notes into immutable, versioned records — audit-ready for NABH assessments, NMC record rules and consumer-court scrutiny.',
  },
  '/products/institutional-compliance-hub': {
    title: 'Institutional Compliance Hub | Salvia',
    desc: 'Turn static policy PDFs into active clinical governance. Salvia maps your internal rules to NABH, ABDM and NMC frameworks — every record checked before sign-off.',
  },
};
if (INDIA_ONLY) {
  for (const [route, m] of Object.entries(INDIA_META)) META[route] = { ...META[route], ...m };
}

function injectMeta(html, title, desc, path, author = 'Salvia') {
  // Cloudflare serves directory URLs with a trailing slash (/pricing -> /pricing/),
  // so canonical + og:url must match to avoid "canonical points to a redirect".
  const canonical = `https://hellosalvia.com${path}${path === '/' ? '' : '/'}`;
  const ogImage = 'https://hellosalvia.com/og-image.png';
  // Strip the template's default <title>/<meta description> so each page emits
  // exactly one of each (no duplicate tags for crawlers to disagree over).
  html = html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta\s+name="description"[^>]*>/i, '');
  // escape for safe embedding in HTML attributes/elements (excerpts contain quotes)
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const t = esc(title), d = esc(desc), a = esc(author);
  const metaTags = `
    <title>${t}</title>
    <meta name="description" content="${d}" />
    <meta name="author" content="${a}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Salvia" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${ogImage}" />`;

  return html.replace('</head>', `${metaTags}\n  </head>`);
}

function writePage(route, html) {
  const filePath = route === '/'
    ? resolve(distDir, 'index.html')
    : resolve(distDir, route.slice(1), 'index.html');
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html, 'utf-8');
}

// Per-post title + description for key blog routes, so crawlers and AI engines
// see unique, keyword-rich meta (not one generic line repeated across posts).
const BLOG_META = {
  'ai-scribe-pricing-india': {
    title: 'AI Medical Scribe Pricing in India (2026) | Salvia',
    desc: 'AI medical scribes in India cost from free trials to ~₹1,500 per doctor/month; per-clinic compliance suites start around ₹1,000. The real 2026 pricing math.',
  },
  'consumer-court-records': {
    title: 'Thin Records & Consumer Court Cases in India | Salvia',
    desc: 'Under the Consumer Protection Act 2019, a thin file loses winnable cases. How the burden of proof shifts to the doctor, and what a defensible record needs.',
  },
  'patient-records-access-india': {
    title: 'Can Patients Demand Their Hospital File in India? | Salvia',
    desc: 'Yes — and the law gives you 72 hours. The NMC rule, the RTI route for government hospitals, and what a complete patient file must include.',
  },
  'nabh-small-clinic-worth-it': {
    title: 'Is NABH Entry-Level Worth It for a Small Clinic? | Salvia',
    desc: 'An honest take: the 10% PM-JAY incentive that decides it, the real cost, the SHCO and Entry-Level routes, and where software helps — and where it cannot.',
  },
  'abdm-mandatory-clinic': {
    title: 'Is ABDM / ABHA Mandatory for My Clinic in 2026? | Salvia',
    desc: 'Voluntary for patients, mandatory in practice for PM-JAY and insurance. HFR/HPR registration, what ABDM-compliant means, and why a QR code is not a record.',
  },
  'ai-scribe-indian-languages': {
    title: 'Do AI Scribes Really Work in Hindi or Malayalam? | Salvia',
    desc: 'Most demos are filmed in clean English; a real Indian OPD is code-mixed and noisy. Where English-first scribes break, and why a transcript still is not a record.',
  },
};

// --- JSON-LD schema, baked into static HTML so non-JS crawlers and AI engines
// (GPTBot, ClaudeBot, PerplexityBot) actually see it. react-helmet also emits
// these client-side, but those bots don't run JS — so the static copy is what
// earns the structured-data + E-E-A-T credit. -----------------------------------
const SITE = 'https://hellosalvia.com';
// Salvia is a GLOBAL product — India is one market, not the whole company.
const AREA_SERVED = ['Australia', 'New Zealand', 'United Kingdom', 'Ireland', 'United States', 'India']
  .map((name) => ({ '@type': 'Country', name }));
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Salvia',
  url: SITE,
  logo: `${SITE}/favicon.png`,
  description: 'AI clinical documentation and compliance suite for veterinary, dental, general-practice and allied-health clinics — a post-consult voice note in, an audit-ready, regulator-compliant record out. Serving Australia, New Zealand, the UK, the EU, the US and India.',
  areaServed: AREA_SERVED,
  sameAs: [],
};
const SOFTWARE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Salvia',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  url: SITE,
  description: ORG_SCHEMA.description,
  areaServed: AREA_SERVED,
  offers: { '@type': 'Offer', category: 'subscription' },
  publisher: { '@type': 'Organization', name: 'Salvia', url: SITE },
  featureList: [
    'AI clinical documentation from voice notes (multilingual)',
    'Regulator-mapped compliance checks — RCVS, CQC, GDC, AHPRA, VCNZ, NABH, ABDM and more',
    'Controlled-drug register', 'Consent and incident records', 'Audit-ready report export',
  ],
};
const BLOG_DATES = {
  'ai-scribe-pricing-india': '2026-06-14', 'consumer-court-records': '2026-06-13',
  'patient-records-access-india': '2026-06-13', 'nabh-small-clinic-worth-it': '2026-06-13',
  'abdm-mandatory-clinic': '2026-06-13', 'ai-scribe-indian-languages': '2026-06-13',
};
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

function injectSchema(html, route, title, desc) {
  // trailing-slash URL to match what Cloudflare serves + the canonical
  const u = route === '/' ? `${SITE}/` : `${SITE}${route}/`;
  const scripts = [ld(ORG_SCHEMA)];
  if (route === '/') scripts.push(ld(SOFTWARE_SCHEMA));
  if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '');
    scripts.push(ld({
      '@context': 'https://schema.org', '@type': 'Article',
      headline: (title || '').replace(/ \| Salvia$/, ''), description: desc,
      url: u,
      author: { '@type': 'Organization', name: 'Salvia Editorial', url: SITE },
      publisher: { '@type': 'Organization', name: 'Salvia', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/favicon.png` } },
      ...((BLOG_DATES[slug] ?? BLOG_REGISTRY_DATES[slug])
        ? { datePublished: BLOG_DATES[slug] ?? BLOG_REGISTRY_DATES[slug], dateModified: BLOG_DATES[slug] ?? BLOG_REGISTRY_DATES[slug] }
        : {}),
      mainEntityOfPage: { '@type': 'WebPage', '@id': u },
    }));
    scripts.push(ld({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
        { '@type': 'ListItem', position: 3, name: (title || '').replace(/ \| Salvia$/, ''), item: u },
      ],
    }));
  }
  return html.replace('</head>', `${scripts.join('\n    ')}\n  </head>`);
}

// Pull each post's real excerpt + date from the blog registry so EVERY post
// gets a unique, properly-sized meta description (not a repeated generic stub)
// and a real lastmod in the sitemap.
const BLOG_DATA = {};
const BLOG_REGISTRY_DATES = {};
try {
  const blogSrc = readFileSync(resolve(distDir, '../src/data/blogContent.tsx'), 'utf-8');
  const re = /'([a-z0-9-]+)':\s*\{[\s\S]*?excerpt:\s*"((?:[^"\\]|\\.)*)"[\s\S]*?date:\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(blogSrc))) {
    BLOG_DATA[m[1]] = m[2].replace(/\\"/g, '"');
    const d = new Date(m[3]);
    if (!Number.isNaN(d.getTime())) BLOG_REGISTRY_DATES[m[1]] = d.toISOString().slice(0, 10);
  }
} catch { /* fall back to generic description */ }
const titleCase = (slug) => slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
const clip = (s, n = 158) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[\s,;:.]+$/, '') + '…');

let count = 0;
for (const route of ALL_ROUTES) {
  const meta = META[route];
  let html = template;
  let title, desc;

  if (meta) {
    title = meta.title; desc = meta.desc;
    html = injectMeta(template, title, desc, route);
  } else if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '');
    const bm = BLOG_META[slug];
    title = bm ? bm.title : `${titleCase(slug)} | Salvia`;
    desc = bm ? bm.desc
      : BLOG_DATA[slug] ? clip(BLOG_DATA[slug])
      : 'Clinical documentation, compliance and governance insights from the Salvia team.';
    html = injectMeta(template, title, desc, route, 'Salvia Editorial');
  }

  html = injectSchema(html, route, title, desc);
  writePage(route, html);
  count++;
}

console.log(`✓ Pre-rendered ${count} pages`);

// --- sitemap.xml — generated from the SAME route list we just prerendered,
// so the sitemap can never advertise a page that doesn't exist (or, under
// INDIA_ONLY, a rest-of-world post the app hides). ---------------------------
const LEGAL_PRIORITY = { '/security': '0.5', '/dpa': '0.4', '/subprocessors': '0.4' };
const LEGAL_ROUTES = ['/privacy', '/terms', '/cookies', '/dpa', '/subprocessors', '/refund-policy', '/acceptable-use', '/security'];
const ALLIED_ROUTES = ['/physiotherapy', '/osteopathy', '/chiropractic', '/occupational-therapy', '/podiatry', '/speech-therapy'];

function sitemapEntry(route) {
  const loc = `${SITE}${route === '/' ? '/' : `${route}/`}`;
  let changefreq = 'monthly';
  let priority = '0.7';
  let lastmod;

  if (route === '/') { changefreq = 'weekly'; priority = '1.0'; }
  else if (route === '/blog') { changefreq = 'weekly'; priority = '0.8'; }
  else if (LEGAL_ROUTES.includes(route)) { changefreq = 'yearly'; priority = LEGAL_PRIORITY[route] ?? '0.3'; }
  else if (ALLIED_ROUTES.includes(route)) { priority = '0.85'; }
  else if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '');
    priority = BLOG_DATES[slug] ? '0.85' : '0.7'; // India cluster ranks first
    lastmod = BLOG_DATES[slug] ?? BLOG_REGISTRY_DATES[slug];
  }
  else { priority = '0.9'; } // pricing, verticals, products, frameworks

  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const SITEMAP_ROUTES = ALL_ROUTES.filter((r) => r !== '/contact-sales'); // redirect — not a page
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...SITEMAP_ROUTES.map(sitemapEntry),
  '</urlset>',
  '',
].join('\n');
writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap, 'utf-8');
console.log(`✓ Sitemap written — ${SITEMAP_ROUTES.length} URLs${INDIA_ONLY ? ' (India-only surface)' : ''}`);

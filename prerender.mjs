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
import { frameworkKeys } from './src/data/frameworkKeys.mjs';
import { createRequire } from 'node:module';
const require_ = createRequire(import.meta.url);
const FRAMEWORKS = require_('./src/data/frameworks-index.json');
const DEEP_META = {
  cqc:  ['CQC record keeping — what the inspection actually checks',
         'Regulation 17 quoted from the source, the findings that recur in published CQC reports, and the field in Salvia that answers each one.'],
  hiqa: ['HIQA record keeping — the regulations that actually fail',
         'Regulation 21, Regulation 5 and Regulation 23 quoted from S.I. 415/2013, with the failures that recur across published inspection reports.'],
  cms:  ['CMS documentation — F656, F641 and F842, and what satisfies them',
         'The documentation F-tags surveyors cite from Appendix PP, and how a record has to be shaped to answer them.'],
  nabh: ['NABH documentation — all 639 requirements, marked honestly',
         'What NABH Information Management System standards require, and how much of the 6th edition Salvia measures from data you already hold.'],
  jci:  ['JCI record keeping — all 171 standards, walked',
         'How a JCI tracer follows one patient through the record, and which measurable elements Salvia can evidence today.'],
};

// Keep in step with DEEP in src/data/deepFrameworks.ts and the routes in App.tsx.
const DEEP_FRAMEWORK_SLUGS = ['cqc', 'hiqa', 'cms', 'nabh', 'jci'];
const catalogueOnly = new Set(frameworkKeys.map(k => `/frameworks/${k}`));

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

// Mirrors src/config.ts INDIA_ONLY — same env var, same default, so the
// prerendered surface (pages, sitemap) matches what the app actually shows.
const INDIA_ONLY = (process.env.VITE_INDIA_ONLY ?? 'true') !== 'false';

// All routes that should be pre-rendered
const STATIC_ROUTES = [
  '/',
  '/frameworks',
  '/blog',
  '/start',
  '/privacy', '/terms', '/cookies', '/dpa', '/security',
];

// Derived from src/data/blogMarkets.mjs — the same map the app filters on.
// Every post is prerendered and listed — the blog spans the same five
// frameworks the site sells against.
const BLOG_SLUGS = visibleBlogSlugs();

const ALL_ROUTES = [
  ...STATIC_ROUTES,
  ...BLOG_SLUGS.map(s => `/blog/${s}`),
  // One page per regulator, generated from the product's framework catalogue.
  ...frameworkKeys.map(k => `/frameworks/${k}`),
  // The five that campaigns point at. Hand-built, indexed, and the only
  // framework pages in the sitemap — see DEEP_SITEMAP below.
  ...DEEP_FRAMEWORK_SLUGS.map(s => `/frameworks/${s}`),
];

// Meta map — what title/description to inject per route
// (react-helmet-async writes these client-side, but we bake them into
// the HTML shell so crawlers see them before JS executes)
const META = {
  '/': {
    title: 'Salvia — know where you stand against the standard',
    desc: 'Salvia holds your policies as enforceable rules, checks every record against them before it is filed, and maps what you hold onto the framework you are assessed against — CQC, HIQA, CMS, NABH and JCI.',
  },
  '/blog': {
    title: 'Writing — record keeping, and the rules that judge it',
    desc: 'What inspectors and courts actually look for in a clinical record, answered against the primary source with citations. CQC, HIQA, CMS, NABH.',
  },
  '/start': {
    title: 'Talk to us',
    desc: 'Tell us where the paperwork breaks in your practice. We set Salvia up with your own forms and the framework you are assessed against.',
  },
  '/frameworks': {
    title: 'Frameworks — every standard Salvia maps, by country and regulator',
    desc: '60 frameworks across 6 countries and 4 kinds of practice, with 302 record-keeping clauses mapped to the field that satisfies each one.',
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
  '/security': {
    title: 'Security Overview | Salvia',
    desc: 'How Salvia protects clinical data: encryption (TLS 1.2+, AES-256), least-privilege access, tamper-evident audit trails and 72-hour breach response.',
  },
};

// India-launch overrides — the client pages already render India copy via
// useIsIndia(); these keep the CRAWLER view (static META) in sync so Google
// India isn't served RCVS/CQC/"$229 per month" copy on an India-only site.
// INDIA_META used to override the home and frameworks meta with India-launch
// copy. The site now sells across five frameworks in four countries, so the
// override contradicted the pages it sat on top of. META is the only source.
const INDIA_META = {};
if (INDIA_ONLY) {
  for (const [route, m] of Object.entries(INDIA_META)) META[route] = { ...META[route], ...m };
}

function injectMeta(html, title, desc, path, author = 'Salvia', noindex = false) {
  // Use exact route path without appending trailing slashes to match internal links
  const canonical = `https://hellosalvia.com${path === '/' ? '/' : path}`;
  // Keep in step with DEFAULT_OG_IMAGE in src/components/SEO.tsx.
  const ogImage = 'https://hellosalvia.com/og-image.png?v=3';
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
    <meta name="twitter:image" content="${ogImage}" />${
      noindex ? '\n    <meta name="robots" content="noindex, follow" />' : ''}`;

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
// Salvia is a GLOBAL product, differentiated by FRAMEWORKS, not countries — the
// schema is worldwide and country-name-free (frameworks are the localization).
const AREA_SERVED = 'Worldwide';
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Salvia',
  url: SITE,
  logo: `${SITE}/favicon.png`,
  description: 'The compliance platform for clinical care. Salvia turns every clinical record into structured evidence, and an always-on agent continuously proves your compliance against any framework — NABH, JCI, NSQHS, CMS, HEDIS and more.',
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
    'Continuous clinical-compliance monitoring against any framework',
    'Always-on compliance agent — drafts, flags gaps, maps every record to your standards',
    'Policy engine that measures each policy on every note',
    'AI clinical documentation from voice notes (multilingual)',
    'Consent, prescription and incident records', 'Audit-ready evidence export',
  ],
};
const BLOG_DATES = {
  'ai-scribe-pricing-india': '2026-06-14', 'consumer-court-records': '2026-06-13',
  'patient-records-access-india': '2026-06-13', 'nabh-small-clinic-worth-it': '2026-06-13',
  'abdm-mandatory-clinic': '2026-06-13', 'ai-scribe-indian-languages': '2026-06-13',
};
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

function injectSchema(html, route, title, desc) {
  // Match canonical URL (no trailing slash except for root)
  const u = route === '/' ? `${SITE}/` : `${SITE}${route}`;
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
  } else if (route.startsWith('/frameworks/')) {
    const key = route.replace('/frameworks/', '');
    const deep = DEEP_META[key];
    if (deep) {
      [title, desc] = deep;
      html = injectMeta(template, title, desc, route);
    } else {
      const fw = FRAMEWORKS.find((f) => f.key === key);
      title = fw ? `${fw.body} — record-keeping requirements | Salvia` : `${titleCase(key)} | Salvia`;
      desc = fw ? clip(fw.summary) : 'Record-keeping requirements and what satisfies them.';
      // Catalogue pages are reachable and useful on a call, but not indexed:
      // sixty pages off one template is the shape a scaled-content policy targets.
      html = injectMeta(template, title, desc, route, 'Salvia', true);
    }
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
  const loc = `${SITE}${route === '/' ? '/' : route}`;
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

const SITEMAP_ROUTES = ALL_ROUTES.filter((r) =>
  r !== '/contact-sales' &&        // redirect — not a page
  !catalogueOnly.has(r)            // generated catalogue pages ship noindex
);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...SITEMAP_ROUTES.map(sitemapEntry),
  '</urlset>',
  '',
].join('\n');
writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap, 'utf-8');
console.log(`✓ Sitemap written — ${SITEMAP_ROUTES.length} URLs`);

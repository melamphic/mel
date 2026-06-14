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

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

// All routes that should be pre-rendered
const STATIC_ROUTES = [
  '/',
  '/pricing',
  '/blog',
  '/contact-sales',
  '/frameworks',
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
];

const BLOG_SLUGS = [
  // India
  'ai-scribe-pricing-india', 'consumer-court-records', 'patient-records-access-india',
  'nabh-small-clinic-worth-it', 'abdm-mandatory-clinic', 'ai-scribe-indian-languages',
  // General clinic
  'pajama-time', 'informed-refusal', 'ai-legal', 'stranger-rule',
  'audit-trail', 'difficult-patients', 'pediatric-records',
  // Veterinary — AU/NZ
  'vet-tpr', 'copy-paste-vet', 'emr-crash-vet', 'ai-vet-legal',
  'vet-audit-prep', 'retention-vet', 'logic-vet',
  // Veterinary — UK
  'cma-vet-deadline', 'rcvs-record-inspection',
  // Veterinary — AU
  'au-vet-board-records',
  // Veterinary — NZ
  'vcnz-records-standard',
  // Dental — AU/NZ/US
  'malpractice-dental', 'oral-photography', 'signed-edits-dental',
  'teledentistry-standards', 'manual-dental-risk', 'surgical-prep-dental',
  // Dental — UK
  'cqc-dental-2026',
  // Dental — AU
  'ahpra-dental-records',
];

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
    desc: 'Salvia is a compliance and governance suite for vet, dental, and clinical practices. Voice note after each consult — audit-ready records, controlled drug logs, and incident trails out the other side.',
  },
  '/pricing': {
    title: 'Pricing | Salvia',
    desc: 'Salvia pricing for veterinary, dental, general practice, and allied health (physio, osteo, chiro, OT, podiatry, speech). Practice plan from $229/mo — compliance-grade clinical documentation, controlled drug logs, audit trails.',
  },
  '/blog': {
    title: 'From the compliance desk | Salvia',
    desc: 'Clinical documentation, compliance law, and audit readiness — written for vets, dentists, and clinicians who\'ve been burned by bad records.',
  },
  '/contact-sales': {
    title: 'Book a demo | Salvia',
    desc: 'See Salvia in action — compliance and governance automation for vet, dental, and clinical practices.',
  },
  '/veterinary': {
    title: 'Veterinary Compliance Software | Salvia',
    desc: 'Salvia keeps vet practice records audit-ready for RCVS, VCNZ, VPB and CMA. Voice note after each consult — clinical records, controlled drug logs, consent, and audit trail out the other side.',
  },
  '/dental': {
    title: 'Dental Compliance Software | Salvia',
    desc: 'Salvia keeps dental practice records audit-ready for CQC, GDC, and AHPRA. BPE, STE, radiograph justification, and treatment plans captured at every visit.',
  },
  '/general-practice': {
    title: 'General Practice Compliance Software | Salvia',
    desc: 'Salvia keeps GP and general clinic records audit-ready for CQC, AHPRA, and MCNZ. Voice note after each consult — structured clinical records, prescribing logs, referral trails, and consent documentation.',
  },
  '/allied-health': {
    title: 'Allied Health Compliance Software | Salvia',
    desc: 'Salvia keeps allied health records audit-ready for CORU, HCPC, AHPRA, PBNZ, OTBNZ, GOsC, GCC and more. Voice note → SOAP record, outcome measures, treatment log, discharge summary. Physio, osteo, chiro, OT, podiatry, speech.',
  },
  '/physiotherapy': {
    title: 'Physiotherapy Compliance Software | CORU, HCPC, AHPRA, PBNZ | Salvia',
    desc: 'Salvia keeps physiotherapy records audit-ready for CORU, HCPC, AHPRA and PBNZ. Voice note → SOAP record, outcome measures (NPRS, ODI, NDI, LEFS), treatment log, discharge summary.',
  },
  '/osteopathy': {
    title: 'Osteopathy Practice Software | GOsC, AHPRA, OCNZ | Salvia',
    desc: 'Salvia generates osteopathy records aligned with GOsC Osteopathic Practice Standards, AHPRA Osteopathy Board, and OCNZ. Voice note → structured treatment record.',
  },
  '/chiropractic': {
    title: 'Chiropractic Practice Software | GCC, AHPRA, CBNZ | Salvia',
    desc: 'Salvia generates chiropractic records aligned with GCC, AHPRA Chiropractic Board, and CBNZ. Voice note → structured adjustment record, imaging log, consent, audit trail.',
  },
  '/occupational-therapy': {
    title: 'Occupational Therapy Software | CORU, HCPC, AHPRA, OTBNZ | Salvia',
    desc: 'Salvia keeps OT records audit-ready for CORU, HCPC, AHPRA OT Board and OTBNZ. Voice note → functional assessment, goals, intervention, outcome review.',
  },
  '/podiatry': {
    title: 'Podiatry Practice Software | CORU, HCPC, AHPRA | Salvia',
    desc: 'Salvia keeps podiatry records audit-ready for CORU, HCPC, AHPRA Podiatry Board and PBNZ. Voice note → assessment, wound register, sharps log, consent, treatment record.',
  },
  '/speech-therapy': {
    title: 'Speech Therapy Software | CORU, HCPC, SPA, ASHA | Salvia',
    desc: 'Salvia keeps speech and language therapy records audit-ready for CORU, HCPC, SPA, NZSTA and ASHA. Voice note → assessment, goals, intervention, progress review.',
  },
  '/frameworks': {
    title: 'Regulatory Frameworks We Support | Salvia',
    desc: 'Salvia generates audit-ready clinical records against 40+ regulatory frameworks across veterinary, dental, general practice and allied health — CORU, HCPC, AHPRA, RCVS, CQC, GDC, GOsC, GCC, AVA, VCNZ, MCNZ and more.',
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
};

function injectMeta(html, title, desc, path, author = 'Salvia') {
  const canonical = `https://hellosalvia.com${path}`;
  const ogImage = 'https://hellosalvia.com/og-image.png';
  // Strip the template's default <title>/<meta description> so each page emits
  // exactly one of each (no duplicate tags for crawlers to disagree over).
  html = html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta\s+name="description"[^>]*>/i, '');
  const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <meta name="author" content="${author}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Salvia" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
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
    desc: 'AI medical scribes in India cost from free trials to ~₹1,500 per doctor/month; per-clinic compliance suites start around ₹2,500. The real 2026 pricing math.',
  },
  'consumer-court-records': {
    title: 'Thin Records & Consumer Court Cases in India | Salvia',
    desc: 'Under the Consumer Protection Act 2019, a thin file loses cases good care should win — how the burden of proof shifts onto the doctor, and what a defensible record holds.',
  },
  'patient-records-access-india': {
    title: 'Can Patients Demand Their Hospital File in India? | Salvia',
    desc: 'Yes — and the law gives you 72 hours. The NMC rule, the RTI route for government hospitals, why stalling reads as concealment, and what a complete file includes.',
  },
  'nabh-small-clinic-worth-it': {
    title: 'Is NABH Entry-Level Worth It for a Small Clinic? | Salvia',
    desc: 'An honest 2026 take: the 10% PM-JAY incentive that decides it, the real total cost, the SHCO and Entry-Level routes, and where software helps and where it cannot.',
  },
  'abdm-mandatory-clinic': {
    title: 'Is ABDM / ABHA Mandatory for My Clinic in 2026? | Salvia',
    desc: 'Voluntary for patients, mandatory in practice for PM-JAY and insurance. HFR/HPR registration, what "ABDM compliant" really means, and why a QR code is not a record.',
  },
  'ai-scribe-indian-languages': {
    title: 'Do AI Scribes Really Work in Hindi or Malayalam? | Salvia',
    desc: 'Most demos are filmed in clean English; a real Indian OPD is code-mixed and noisy. Where English-first scribes break, and why a perfect transcript still is not a record.',
  },
};

// --- JSON-LD schema, baked into static HTML so non-JS crawlers and AI engines
// (GPTBot, ClaudeBot, PerplexityBot) actually see it. react-helmet also emits
// these client-side, but those bots don't run JS — so the static copy is what
// earns the structured-data + E-E-A-T credit. -----------------------------------
const SITE = 'https://hellosalvia.com';
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Salvia',
  url: SITE,
  logo: `${SITE}/favicon.png`,
  description: 'AI clinical documentation and compliance suite for Indian clinics, nursing homes and hospitals — voice notes in any Indian language in, audit-ready records out.',
  areaServed: { '@type': 'Country', name: 'India' },
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
  areaServed: { '@type': 'Country', name: 'India' },
  offers: { '@type': 'Offer', priceCurrency: 'INR', price: '2500', category: 'subscription' },
  publisher: { '@type': 'Organization', name: 'Salvia', url: SITE },
  featureList: [
    'AI clinical documentation from voice notes in Indian languages',
    'NABH, ABDM and DPDP compliance checks',
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
  const scripts = [ld(ORG_SCHEMA)];
  if (route === '/') scripts.push(ld(SOFTWARE_SCHEMA));
  if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '');
    scripts.push(ld({
      '@context': 'https://schema.org', '@type': 'Article',
      headline: (title || '').replace(/ \| Salvia$/, ''), description: desc,
      url: `${SITE}${route}`,
      author: { '@type': 'Organization', name: 'Salvia Editorial', url: SITE },
      publisher: { '@type': 'Organization', name: 'Salvia', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/favicon.png` } },
      ...(BLOG_DATES[slug] ? { datePublished: BLOG_DATES[slug], dateModified: BLOG_DATES[slug] } : {}),
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}${route}` },
    }));
    scripts.push(ld({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
        { '@type': 'ListItem', position: 3, name: (title || '').replace(/ \| Salvia$/, ''), item: `${SITE}${route}` },
      ],
    }));
  }
  return html.replace('</head>', `${scripts.join('\n    ')}\n  </head>`);
}

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
    title = bm ? bm.title : `${slug.replace(/-/g, ' ')} | Salvia`;
    desc = bm ? bm.desc : 'Clinical documentation, compliance and governance insights from the Salvia team.';
    html = injectMeta(template, title, desc, route, 'Salvia Editorial');
  }

  html = injectSchema(html, route, title, desc);
  writePage(route, html);
  count++;
}

console.log(`✓ Pre-rendered ${count} pages`);

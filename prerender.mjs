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

function injectMeta(html, title, desc, path) {
  const canonical = `https://hellosalvia.com${path}`;
  const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Salvia" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />`;

  return html.replace('</head>', `${metaTags}\n  </head>`);
}

function writePage(route, html) {
  const filePath = route === '/'
    ? resolve(distDir, 'index.html')
    : resolve(distDir, route.slice(1), 'index.html');
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html, 'utf-8');
}

let count = 0;
for (const route of ALL_ROUTES) {
  const meta = META[route];
  let html = template;

  if (meta) {
    html = injectMeta(template, meta.title, meta.desc, route);
  } else if (route.startsWith('/blog/')) {
    // Blog posts get a generic title baked in — react-helmet overwrites
    // with the full title client-side, but crawlers see this first.
    const slug = route.replace('/blog/', '');
    html = injectMeta(
      template,
      `${slug.replace(/-/g, ' ')} | Salvia`,
      'Clinical documentation, compliance and governance insights from the Salvia team.',
      route,
    );
  }

  writePage(route, html);
  count++;
}

console.log(`✓ Pre-rendered ${count} pages`);

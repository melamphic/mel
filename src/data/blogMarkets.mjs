// Single source of truth for which market each blog post belongs to.
// Imported by BOTH the app (src/data/blogContent.tsx) and the build
// pipeline (prerender.mjs), so visibility, prerendering and the sitemap
// can never drift apart.
//
//   'IN'     — India-specific content (NMC, NABH, ABDM, consumer courts…)
//   'GLOBAL' — jurisdiction-neutral clinical content, visible in every market
//   'ROW'    — rest-of-world regulator content (HIPAA, RCVS, CQC, AHPRA,
//              VCNZ, CMA, AVMA, CDT billing…). Hidden while INDIA_ONLY.

export const BLOG_MARKETS = {
  // --- India ---
  'ai-scribe-pricing-india': 'IN',
  'consumer-court-records': 'IN',
  'patient-records-access-india': 'IN',
  'nabh-small-clinic-worth-it': 'IN',
  'abdm-mandatory-clinic': 'IN',
  'ai-scribe-indian-languages': 'IN',

  // --- Jurisdiction-neutral ---
  'pajama-time': 'GLOBAL',
  'informed-refusal': 'GLOBAL',
  'stranger-rule': 'GLOBAL',
  'difficult-patients': 'GLOBAL',
  'pediatric-records': 'GLOBAL',
  'emr-crash-vet': 'GLOBAL',
  'vet-audit-prep': 'GLOBAL',
  'malpractice-dental': 'GLOBAL',
  'oral-photography': 'GLOBAL',
  'manual-dental-risk': 'GLOBAL',
  'surgical-prep-dental': 'GLOBAL',

  // --- Rest-of-world regulators ---
  'ai-legal': 'ROW',            // HIPAA / Cures Act
  'audit-trail': 'ROW',         // HIPAA / Cures Act
  'vet-tpr': 'ROW',             // VMR boards
  'copy-paste-vet': 'ROW',      // AVMA / VMR
  'ai-vet-legal': 'ROW',        // AU/NZ AI legal status
  'retention-vet': 'ROW',       // RCVS / VCNZ retention rules
  'logic-vet': 'ROW',           // VMR code
  'signed-edits-dental': 'ROW', // CDT billing codes (US)
  'teledentistry-standards': 'ROW', // GDC / US state boards
  'cma-vet-deadline': 'ROW',    // UK CMA
  'rcvs-record-inspection': 'ROW', // UK RCVS
  'cqc-dental-2026': 'ROW',     // UK CQC
  'au-vet-board-records': 'ROW', // AU vet boards
  'ahpra-dental-records': 'ROW', // AU AHPRA
  'vcnz-records-standard': 'ROW', // NZ VCNZ
};

/** Slugs visible for a given launch mode. */
export function visibleBlogSlugs(indiaOnly) {
  return Object.keys(BLOG_MARKETS).filter(
    (slug) => !indiaOnly || BLOG_MARKETS[slug] !== 'ROW'
  );
}

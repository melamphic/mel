// Single source of truth for which market each blog post belongs to.
// Imported by BOTH the app (src/data/blogContent.tsx) and the build pipeline
// (prerender.mjs), so visibility, prerendering and the sitemap can never drift.
//
// The list is deliberately short. Every post here maps onto a framework the
// site actually sells against — CQC, HIQA, CMS, NABH, JCI — or is clinical
// record-keeping that holds in any jurisdiction. Veterinary and the dental
// boards of countries we do not sell into were deleted rather than left to rot,
// and so were the two scribe-pricing posts, which argued the opposite of the
// product's own positioning.
//
//   'IN'     — India (NMC, NABH, ABDM, consumer courts)
//   'GB'     — England (CQC)
//   'US'     — United States (HIPAA, Cures Act, CMS)
//   'GLOBAL' — jurisdiction-neutral clinical record keeping

export const BLOG_MARKETS = {
  // --- India ---
  'consumer-court-records': 'IN',
  'patient-records-access-india': 'IN',
  'nabh-small-clinic-worth-it': 'IN',
  'abdm-mandatory-clinic': 'IN',

  // --- England ---
  'cqc-dental-2026': 'GB',

  // --- United States ---
  'ai-legal': 'US',
  'audit-trail': 'US',

  // --- Jurisdiction-neutral ---
  'pajama-time': 'GLOBAL',
  'informed-refusal': 'GLOBAL',
  'stranger-rule': 'GLOBAL',
  'difficult-patients': 'GLOBAL',
  'pediatric-records': 'GLOBAL',
};

/** India only, plus the jurisdiction-neutral posts.
 *
 *  The site sells one thing in one country now: evidence for cashless claims in
 *  India. A visitor who finds a CQC dental post in the writing has to work out
 *  what business we are actually in, and the answer they arrive at is the wrong
 *  one. The England and United States posts stay on disk — nothing is deleted —
 *  they are simply not part of the site's argument any more. */
const SHOWN_MARKETS = new Set(['IN', 'GLOBAL']);

export function visibleBlogSlugs() {
  return Object.keys(BLOG_MARKETS).filter((s) => SHOWN_MARKETS.has(BLOG_MARKETS[s]));
}

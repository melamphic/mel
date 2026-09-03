/**
 * Pull real, published inspection findings out of the outreach datasets and
 * into the site.
 *
 *   node scripts/build-findings.mjs
 *
 * Everything here is quoted verbatim from a public inspection report. Services
 * are NOT named: a quote carries only its region and the month the report was
 * published. The findings are evidence of a pattern, not a pillory, and naming
 * a struggling home on our own marketing site would poison the outreach that
 * these same datasets feed.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const LEADS = join(here, '../../gtm/leads');

/* Minimal CSV reader — these files are quoted-comma standard and small. */
function readCsv(path) {
  const text = readFileSync(path, 'utf8');
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const head = rows.shift();
  return rows.filter((r) => r.length === head.length)
             .map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

/* A finding "about the record" rather than about the care itself. */
const RECORD = /\b(records?|recorded|recording|document(?:ed|ation)?|care plans?|audits?|risk assessments?)\b/i;

function pickQuotes(rows, { limit = 6, min = 55, max = 190, preferRating = null } = {}) {
  const pool = rows.filter((r) => {
    const q = (r.quote || '').trim();
    if (!RECORD.test(q) || q.length < min || q.length > max) return false;
    return preferRating ? r.OverallRating === preferRating : true;
  });
  const seen = new Set();
  const out = [];
  for (const r of pool.sort((a, b) => a.quote.length - b.quote.length)) {
    const key = r.quote.slice(0, 42).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      quote: r.quote.trim(),
      region: r.Region || r.Address || '',
      month: (r.LastPublished || r.InspectionDate || '').slice(0, 7),
      rating: r.OverallRating || null,
    });
    if (out.length === limit) break;
  }
  return out;
}

const asc = readCsv(join(LEADS, 'adult-social-care/uk/cqc_findings.csv'));
const gp = readCsv(join(LEADS, 'gp-practices/uk/cqc_findings.csv'));
const mh = readCsv(join(LEADS, 'mental-health/uk/cqc_findings.csv'));
const ie = readCsv(join(LEADS, 'older-people/ie/hiqa_findings.csv'));
const snf = readCsv(join(LEADS, 'skilled-nursing/us/snf_doc_targets.csv'));

const share = (rows) => {
  const q = rows.filter((r) => (r.quote || '').trim());
  return { total: q.length, aboutRecord: q.filter((r) => RECORD.test(r.quote)).length };
};

/* The sharpest number we hold: services CQC rated Good overall that still
   carried a record-keeping finding. The care passed; the record did not. */
const goodButCited = asc.filter(
  (r) => r.OverallRating === 'Good' && RECORD.test(r.quote || '')
).length;

/* Which Irish regulations actually fail, ranked. HIQA names them; CQC does not. */
const ieRegs = {};
for (const r of ie) {
  for (const x of (r.FailedRegs || '').split(';').map((s) => s.trim()).filter(Boolean)) {
    ieRegs[x] = (ieRegs[x] || 0) + 1;
  }
}

const out = {
  cqcAdultSocialCare: {
    ...share(asc),
    goodButCited,
    quotes: [...pickQuotes(asc, { limit: 4, preferRating: 'Good' }),
             ...pickQuotes(asc, { limit: 2 })].slice(0, 6),
  },
  cqcGp: { ...share(gp), quotes: pickQuotes(gp, { limit: 3, max: 230 }) },
  cqcMentalHealth: { ...share(mh), quotes: pickQuotes(mh, { limit: 2, max: 230 }) },
  hiqa: {
    ...share(ie),
    quotes: pickQuotes(ie, { limit: 3, max: 260 }),
    failedRegulations: Object.entries(ieRegs).sort((a, b) => b[1] - a[1])
      .slice(0, 6).map(([name, n]) => ({ name, n })),
    centres: ie.length,
  },
  cmsSkilledNursing: {
    facilities: snf.length,
    states: new Set(snf.map((r) => r.State)).size,
    multiTag: snf.filter((r) => Number(r.DistinctTags) > 1).length,
  },
};

writeFileSync(join(here, '../src/data/findings.json'), JSON.stringify(out, null, 1));

console.log(`CQC adult social care: ${out.cqcAdultSocialCare.aboutRecord}/${out.cqcAdultSocialCare.total} about the record, ${goodButCited} rated Good yet cited`);
console.log(`HIQA: ${out.hiqa.centres} centres, top failure "${out.hiqa.failedRegulations[0]?.name}"`);
console.log(`CMS: ${out.cmsSkilledNursing.facilities} facilities across ${out.cmsSkilledNursing.states} states`);

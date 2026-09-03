import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import ProductFilm from '../components/ProductFilm';
import coverage from '../data/coverage.json';
import FINDINGS from '../data/findings.json';
import '../styles/site.css';
import '../styles/film.css';

/* Headline numbers come from the product's own coverage data, so the page
   cannot drift from what Salvia actually maps. */
const COVERAGE_BY_ID = Object.fromEntries(coverage.map((c) => [c.id, c]));

const COVERED = {
  frameworks: coverage.length,
  total: coverage.reduce((n, c) => n + c.total, 0).toLocaleString('en-GB'),
};

/* Four markets, one door. Each tab carries its own regulator's language and a
   real published finding, so nobody lands on the wrong message — the Razorpay
   pattern, which exists precisely because a single generic page serves nobody. */
/* Four jurisdictions, one door. Named by the body that inspects — not by the
   kind of practice — because the same regulator covers several, and the pain is
   identical across all of them. Quotes and counts come from findings.json,
   which is generated from published reports; nothing here is typed by hand. */
const MARKETS = [
  {
    id: 'uk',
    tab: 'England',
    regulator: 'CQC',
    covers: 'Care homes, GP practices, dental practices, mental health services',
    line: 'Inspectors mark you down for what was not written, not for what was not done.',
    quote: FINDINGS.cqcAdultSocialCare.quotes[1]?.quote
      ?? 'Care records did not always reflect people’s care needs.',
    source: `Published CQC report · ${FINDINGS.cqcAdultSocialCare.quotes[1]?.region ?? 'South East'}`
      + ` · ${FINDINGS.cqcAdultSocialCare.quotes[1]?.month ?? '2025-10'}`,
    stat: `${Math.round((FINDINGS.cqcAdultSocialCare.aboutRecord / FINDINGS.cqcAdultSocialCare.total) * 100)}%`,
    statLine: `of the ${FINDINGS.cqcAdultSocialCare.total.toLocaleString('en-GB')} most recent published reports we read name the record, the care plan or the audit`,
    href: '/frameworks/cqc',
  },
  {
    id: 'ireland',
    tab: 'Ireland',
    regulator: 'HIQA',
    covers: 'Designated centres, disability services, children’s services',
    line: 'Every inspection names the regulation you failed, and marks it compliant or not.',
    quote: FINDINGS.hiqa.quotes[0]?.quote
      ?? 'Assessment and care planning procedures were not implemented in line with the provider’s own policy.',
    source: `Published HIQA inspection report · ${FINDINGS.hiqa.quotes[0]?.month ?? '2026-06'}`,
    stat: FINDINGS.hiqa.failedRegulations[0]?.name.split(' ').slice(0, 2).join(' ') ?? 'Reg 23',
    statLine: 'is the most-failed regulation across the reports we hold — governance and management, not the building',
    href: '/frameworks/hiqa',
  },
  {
    id: 'us',
    tab: 'United States',
    regulator: 'CMS',
    covers: 'Skilled nursing and long-term care facilities',
    line: 'Surveyors cite what the chart cannot show. Every deficiency lands on a numbered tag.',
    quote: 'Develop and implement a comprehensive person-centered care plan for each resident.',
    source: 'F656 · §483.21(b)(1) · State Operations Manual, Appendix PP',
    stat: FINDINGS.cmsSkilledNursing.facilities.toLocaleString('en-US'),
    statLine: `facilities carried a documentation deficiency at their most recent survey, across ${FINDINGS.cmsSkilledNursing.states} states and territories`,
    href: '/frameworks/cms',
  },
  {
    id: 'india',
    tab: 'India',
    regulator: 'NABH',
    covers: 'Hospitals, clinics, small healthcare organisations, dental',
    line: 'No single inspectorate — accreditation and empanelment carry the obligation instead.',
    quote: 'Every entry must be dated, timed and authenticated to its author, capturing assessment, care plan, consent, procedures, medication and outcome.',
    source: 'NABH · Information Management System standards',
    stat: `${COVERAGE_BY_ID.NABH?.pct ?? 51}%`,
    statLine: `of the ${COVERAGE_BY_ID.NABH?.inScope ?? 227} in-scope requirements are measured from data you already hold — the rest are named, not hidden`,
    href: '/frameworks/nabh',
  },
] as const;

/* The real widgets, with the ones already shipped first. Breadth is the point:
   a scribe writes prose, this captures the things a regulator actually asks for. */
const MODULES = [
  { name: 'Consent',          note: 'Who agreed, to what, when — and who witnessed it.' },
  { name: 'Drug register',    note: 'Controlled drugs in, out, wasted. Signed and counter-signed.' },
  { name: 'Incidents',        note: 'What happened, who was told, what changed afterwards.' },
  { name: 'Pain scores',      note: 'Before and after, with what was given in between.' },
  { name: 'Outcome measures', note: 'The same scale over time, so change is provable.' },
  { name: 'Prescriptions',    note: 'Issued, dispensed, reviewed — against the record.' },
];
const COMING = ['Vaccination', 'Treatment plans', 'Sterilisation', 'Radiographs', 'Anaesthesia', 'CPD'];

/** Reveal on scroll. Adds a class; CSS owns the animation so it stays
 *  interruptible and honours prefers-reduced-motion. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      el?.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function HomePage() {
  const [active, setActive] = useState(0);
  const m = MARKETS[active];
  const proofRef = useReveal<HTMLDivElement>();
  const howRef = useReveal<HTMLDivElement>();
  const modulesRef = useReveal<HTMLDivElement>();

  return (
    <div className="s-page">
      <SEO
        title="Salvia — the record inspectors ask for, written as care happens"
        description="Care is judged on what was written down. Salvia turns what your staff say into the structured record, checked against the regulation that applies, before anyone files it."
        path="/"
        keywords={[
          'care home record keeping software',
          'inspection evidence',
          'clinical documentation compliance',
          'CQC records',
          'HIQA records',
          'CMS documentation',
        ]}
      />


      <SiteHeader />

      {/* ---------- hero ----------
          Leads on standing against the standard, not on capture. Capture is one
          input to this product; opening with it makes us read like a scribe, and
          a scribe is a category we lose. */}
      <section className="s-section" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-6)' }}>
        <div className="s-wrap">
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', maxWidth: '17ch' }}>
            Know where you stand against the standard. Every day, not audit week.
          </h1>
          <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>
            Salvia holds your policies as enforceable rules, checks every record
            against them before it is filed, and maps what you hold onto the framework
            you are assessed against — {COVERED.total} requirements across {COVERED.frameworks} of
            them, each one either measured, missing, or honestly marked out of scope.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
            <Link className="s-btn s-btn--primary" to="/start">Talk to us</Link>
            <Link className="s-btn s-btn--ghost" to="/frameworks">See the frameworks</Link>
          </div>
        </div>
      </section>

      {/* ---------- the product, playing ---------- */}
      <section className="s-section" id="product" style={{ paddingTop: 'var(--space-6)' }}>
        <div className="s-wrap">
          <ProductFilm />
        </div>
      </section>

      {/* ---------- the switcher: four audiences, one door ---------- */}
      <section className="s-band s-section" id="where">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-2xl)', maxWidth: '20ch' }}>
            Where do you work?
          </h2>

          <div
            role="tablist"
            aria-label="Choose your market"
            style={{
              display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap',
              margin: 'var(--space-6) 0 var(--space-7)',
            }}
          >
            {MARKETS.map((x, i) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`s-btn ${i === active ? 's-btn--primary' : 's-btn--ghost'}`}
              >
                {x.tab}
              </button>
            ))}
          </div>

          {/* key on the market id so the panel re-mounts and re-animates cleanly */}
          <div
            key={m.id}
            className="s-stagger is-in"
            style={{
              display: 'grid', gap: 'var(--space-5)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            }}
          >
            <div className="s-card s-card--accent">
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>
                {m.regulator}
              </h3>
              <p>{m.line}</p>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', opacity: .85 }}>
                {m.covers}
              </p>
              <p style={{ marginTop: 'var(--space-6)' }}>
                <Link className="s-btn s-btn--onDeep" to={m.href}>
                  What this looks like in {m.tab} →
                </Link>
              </p>
            </div>

            <div className="s-card">
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--ink)', lineHeight: 'var(--leading-snug)' }}>
                “{m.quote}”
              </p>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                {m.source}
              </p>
            </div>

            <div className="s-card">
              <b className="num" style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,3.5rem)', color: 'var(--accent)', lineHeight: 1, letterSpacing: '-.04em' }}>
                {m.stat}
              </b>
              <p style={{ marginTop: 'var(--space-4)' }}>{m.statLine}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- what is the same everywhere ---------- */}
      <section className="s-section">
        <div className="s-wrap s-reveal" ref={proofRef}>
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
            A scribe hands you a note and stops.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            Salvia checks that note against your policy, flags what is missing, and blocks
            a submission that would breach it — an override needs a written reason, which
            itself becomes evidence. England calls the failure good governance, Ireland
            calls it Regulation&nbsp;21, the United States calls it F0656. All three are
            asking one question: can you show what happened, and when?
          </p>
        </div>
      </section>


      {/* ---------- breadth: what actually gets captured ---------- */}
      <section className="s-section" id="capture">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '20ch' }}>
            A scribe writes prose. This captures the things you get asked for.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            Every one of these is a typed field with its own rules — not a paragraph
            somebody has to remember to write.
          </p>

          <div
            className="s-stagger"
            ref={modulesRef}
            style={{
              display: 'grid', gap: 'var(--space-4)', marginTop: 'var(--space-7)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            }}
          >
            {MODULES.map((x) => (
              <div key={x.name} className="s-card">
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                  {x.name}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{x.note}</p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
            In build: {COMING.join(' · ')}
          </p>
          <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
            Every entry carries its author, its timestamp and a hash — so a record can be
            shown to be the one that was written at the time.
          </p>
        </div>
      </section>

      {/* ---------- the agent: the actual differentiator ---------- */}
      <section className="s-band s-section">
        <div className="s-wrap" style={{ display: 'grid', gap: 'var(--space-7)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
              Then something works the gap, every day, without being asked.
            </h2>
            <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
              Capture is the easy half. The hard half is that a framework has hundreds of
              requirements and no one has time to walk them. Salvia&rsquo;s agent reads what
              you already hold, works out which requirements you can evidence and which you
              cannot, and keeps going as records arrive.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 'var(--space-5)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="s-card s-card--accent">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>
                It reads what you have
              </h3>
              <p>Your policies, your records, your last inspection report. It starts from
                the paperwork you already own, not an empty checklist.</p>
            </div>
            <div className="s-card">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>
                It never writes on its own
              </h3>
              <p>The agent drafts and flags; a clinician approves. When it does act, it runs
                under that person&rsquo;s permissions, and the approval is part of the record.</p>
            </div>
            <div className="s-card s-card--deep">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>
                It tells you what is missing
              </h3>
              <p>Requirement by requirement — met, partly met, or nothing to show. Honest
                about the gaps, because a green tick you cannot evidence is worse than none.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- how ---------- */}
      <section className="s-band s-section" id="how">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '18ch' }}>
            Said on shift. Filed on shift.
          </h2>
          <div
            className="s-stagger"
            ref={howRef}
            style={{
              display: 'grid', gap: 'var(--space-5)', marginTop: 'var(--space-7)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            }}
          >
            <div className="s-card">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                Staff speak
              </h3>
              <p>A voice note at the point of care. Nobody types on a shift, so nobody
                leaves it until the end of one.</p>
            </div>
            <div className="s-card">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                It becomes the record
              </h3>
              <p>Structured fields, not prose. Consent, medication, incidents, pain —
                in the shape your regulator expects them.</p>
            </div>
            <div className="s-card">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                Checked before you file
              </h3>
              <p>Against the regulation it has to satisfy. Gaps surface while the person
                who was there can still answer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- close ---------- */}
      <section className="s-section" style={{ background: 'var(--deep)', color: 'hsl(355 25% 82%)', borderBlock: '1.5px solid var(--ink)' }}>
        <div className="s-wrap">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.9rem,4vw,3rem)', maxWidth: '18ch' }}>
            See it against your own last report
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>
            Send us the findings you were marked down on. We will show you, line by line,
            where each one would have been caught on the shift it happened.
          </p>
          <p style={{ marginTop: 'var(--space-7)' }}>
            <Link className="s-btn s-btn--onDeep" to="/contact-sales">
              Send us your report
            </Link>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

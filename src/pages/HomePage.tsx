import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import ProductFilm from '../components/ProductFilm';
import coverage from '../data/coverage.json';
import '../styles/site.css';
import '../styles/film.css';

/* Headline numbers come from the product's own coverage data, so the page
   cannot drift from what Salvia actually maps. */
const COVERAGE_BY_ID = Object.fromEntries(coverage.map((c) => [c.id, c]));

/* The rules that decide where the money goes once the patient leaves. Quoted
   from the documents themselves, so a hospital can check every word against
   the agreement it already signed. The third is one insurer's live
   empanelment agreement — named clause, unnamed insurer, because it is one
   contract and not a regulation. */
const CLAUSES = [
  {
    quote: 'No enhancement of limit is possible after discharge of insured.',
    means: 'If the treatment grew and nobody raised the enhancement while the patient was still admitted, the difference is not deducted. It is gone.',
    src: 'Minimum Standard Clauses, IRDAI TPA Regulations 2016 · cl. 10',
  },
  {
    quote: 'AL is not an unconditional guarantee of payment… when the facts change the guarantee changes.',
    means: 'The pre-authorisation was approved on what the file said then. If the discharge summary tells a different story, the approval moves with it.',
    src: 'Minimum Standard Clauses, IRDAI TPA Regulations 2016 · cl. IV.5',
  },
  {
    quote: '…the amount not correlated would be deducted from the final bill and no further papers thereafter shall be entertained.',
    means: 'Seven days to produce a report that ties to a billed line, after the patient has gone home. Miss the window and the amount is lost for good.',
    src: 'An insurer’s hospital empanelment agreement · cl. 8.2',
  },
] as const;

/* Published figures only, each stated against its real denominator. The
   13.98% is measured at the insurer on what was claimed, not on hospital
   revenue — the card below says so before anyone else has to. Listed
   hospitals' "discounts and disallowances" lines are deliberately not here:
   they blend corporate and PSU discounts with insurer cuts, and a CFO who has
   read the note would be right to discount the whole page. */
const NUMBERS = {
  disallowed: {
    big: '13.98%',
    line: 'of the value of health claims presented to insurers in FY 2024-25 was disallowed on policy terms — ₹18,521 crore, counted separately from claims rejected outright.',
    src: 'IRDAI Annual Report 2024-25 · Table I.29',
  },
  days: {
    big: '55 → 86',
    line: 'days for Max Healthcare to collect on credit billing, in a single year. The money still arrives. It arrives a month later.',
    src: 'Max Healthcare, consolidated FY26 · receivables turnover 6.58× → 4.23×',
  },
} as const;

/* The arc, honestly staged. Two are live and three are not, and the page says
   which — a hospital tests the claims end in week one, so a promise here is a
   problem later. Order is the order the money moves: the first two happen on
   the ward and decide everything after them. */
const ARC = [
  {
    stage: 'Capture', live: true,
    line: 'A voice note at the point of care becomes typed clinical fields — consent, procedure, medication, the photograph — not a paragraph somebody has to remember to write.',
  },
  {
    stage: 'Check', live: true,
    line: 'Every note is checked against the evidence the payer requires while the patient is still admitted. What is missing surfaces with hours left to fix it, not weeks.',
  },
  {
    stage: 'Enhance', live: false,
    line: 'When the treatment outgrows the authorisation, the desk hears about it while the patient is still in the bed — because no enhancement is possible after discharge.',
  },
  {
    stage: 'Submit', live: false,
    line: 'The claim file, built from records that were already checked, with the original pages attached unchanged. Every submission is timestamped, so the hospital can prove when it filed.',
  },
  {
    stage: 'Settle', live: false,
    line: 'Queries arrive with their deadline already counting. The answer is drawn from the record that exists, the payment is matched to the claim, and every deduction sharpens the next check.',
  },
] as const;


/* What a payer actually asks to see, as typed fields rather than prose. Only
   what ships is listed as a card; the rest is named as in build. */
const MODULES = [
  { name: 'Consent',        note: 'Who agreed, to what, when — and who witnessed it. A consent that names a different procedure is caught on the ward.' },
  { name: 'Prescriptions',  note: 'Issued, dispensed, reviewed — against the record, so the drug on the bill has a reason on the chart.' },
  { name: 'Photographs',    note: 'Taken during the procedure and attached to the record they prove, with the time and the person who took them.' },
];
const COMING = ['Implant stickers and invoices', 'Evidence checklists per procedure, per payer', 'Pre-authorisation against discharge summary'];

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
  const proofRef = useReveal<HTMLDivElement>();
  const howRef = useReveal<HTMLDivElement>();
  const modulesRef = useReveal<HTMLDivElement>();

  return (
    <div className="s-page">
      <SEO
        title="Salvia — the evidence a claim needs, captured before discharge"
        description="Insurers pay on evidence, and evidence is written too late. Salvia captures what clinicians say on the ward, checks it against what the payer requires while the patient is still admitted, then carries the claim through to settlement."
        path="/"
        keywords={[
          'cashless claim documentation',
          'hospital insurance claim deductions',
          'TPA claim evidence',
          'cashless claim enhancement',
          'hospital revenue cycle India',
          'NABH records',
        ]}
      />


      <SiteHeader />

      {/* ---------- hero ----------
          Leads on the money and the timing, because that is the whole argument:
          the deduction is decided by what was written while the patient was
          still in the bed. Opening on capture makes us read like a scribe, and
          a scribe is a category we lose. */}
      <section className="s-section" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-6)' }}>
        <div className="s-wrap">
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', maxWidth: '24ch' }}>
            Every cashless claim is decided on the ward.
          </h1>
          <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>
            Insurers pay on evidence, and the evidence is written too late to change.
            Salvia turns what clinicians say on the ward — spoken, in any language — into
            structured records, checks them against what the payer requires while the
            patient is still admitted, then carries the claim through to settlement.
            The desk finds out what is missing in time to go and get it.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
            <Link className="s-btn s-btn--primary" to="/start">Talk to us</Link>
            <a className="s-btn s-btn--ghost" href="#product">See what gets checked</a>
          </div>
        </div>
      </section>

      {/* ---------- the product, playing ---------- */}
      <section className="s-section" id="product" style={{ paddingTop: 'var(--space-6)' }}>
        <div className="s-wrap">
          <ProductFilm />
        </div>
      </section>

      {/* ---------- the money ----------
          The clauses first, because they are the mechanism: a hospital does not
          lose a cashless claim at the desk, it loses it the day the patient
          leaves, and the rules it signed say so. The numbers follow, each against
          its real denominator. */}
      <section className="s-band s-section" id="cost">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
            A cashless approval is not a promise to pay.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            The rules every empanelled hospital works under say so in writing — and most
            of the doors close the day the patient goes home.
          </p>

          <div
            className="s-stagger is-in"
            style={{
              display: 'grid', gap: 'var(--space-4)', marginTop: 'var(--space-7)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            }}
          >
            {CLAUSES.map((c) => (
              <div key={c.src} className="s-card">
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--ink)', lineHeight: 'var(--leading-snug)' }}>
                  &ldquo;{c.quote}&rdquo;
                </p>
                <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>{c.means}</p>
                <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                  {c.src}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 'var(--space-5)', marginTop: 'var(--space-7)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="s-card s-card--accent">
              <b className="num" style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,3.5rem)', lineHeight: 1, letterSpacing: '-.04em' }}>
                {NUMBERS.disallowed.big}
              </b>
              <p style={{ marginTop: 'var(--space-4)' }}>{NUMBERS.disallowed.line}</p>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', letterSpacing: '.06em', textTransform: 'uppercase', opacity: .8 }}>
                {NUMBERS.disallowed.src}
              </p>
            </div>
            <div className="s-card">
              <b className="num" style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,3.5rem)', color: 'var(--accent)', lineHeight: 1, letterSpacing: '-.04em' }}>
                {NUMBERS.days.big}
              </b>
              <p style={{ marginTop: 'var(--space-4)' }}>{NUMBERS.days.line}</p>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                {NUMBERS.days.src}
              </p>
            </div>
            <div className="s-card s-card--deep">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>
                Not all of it is documentation
              </h3>
              <p>Co-pays, deductibles and non-payable items sit inside that 13.98%, and no
                record can change them. We only claim the part decided by evidence — a query
                that missed its window, an enhancement nobody raised, a report that did not
                tie to the bill. That part is decided on the ward.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- the arc ----------
          Two of these are live and three are not, and the page says which. A
          hospital tests the claims end in week one; a promise here is a problem
          later. Same pattern the modules section already uses. */}
      <section className="s-section" id="arc">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
            Five things have to happen. The first two decide the other three.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            By the time a file comes back deficient, the evidence that would have answered
            it either exists or it does not. So Salvia starts on the ward, while it can
            still be written, and carries the claim all the way to the money.
          </p>

          <div style={{ display: 'grid', gap: 'var(--space-4)', marginTop: 'var(--space-7)' }}>
            {ARC.map((a, n) => (
              <div
                key={a.stage}
                className={a.live ? 's-card s-card--accent' : 's-card'}
                style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'minmax(0,1fr)', alignItems: 'start' }}
              >
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 'var(--text-xs)', opacity: .7 }}>
                    0{n + 1}
                  </span>
                  <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>{a.stage}</h3>
                  <span style={{
                    fontSize: 'var(--text-xs)', letterSpacing: '.08em', textTransform: 'uppercase',
                    padding: '2px 8px', borderRadius: 4,
                    border: '1px solid currentColor', opacity: a.live ? .75 : .55,
                  }}>
                    {a.live ? 'Live today' : 'In build'}
                  </span>
                </div>
                <p style={{ margin: 0 }}>{a.line}</p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
            We will not tell you the last three are finished. They are being built with the
            hospitals whose desks we are sitting in.
          </p>
        </div>
      </section>

      {/* ---------- NABH ----------
          The second reason the same records earn their keep. Kept short: a
          hospital buys this to stop losing money, and accreditation is what
          makes the same capture worth paying for twice. */}
      <section className="s-band s-section" id="nabh">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-2xl)', maxWidth: '24ch' }}>
            The same records answer the accreditor.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
            Nothing extra gets captured for NABH. It reads what the ward already wrote.
          </p>

          <div
            className="s-stagger is-in"
            style={{
              display: 'grid', gap: 'var(--space-5)', marginTop: 'var(--space-7)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            }}
          >
            <div className="s-card s-card--accent">
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>NABH</h3>
              <p>Every entry dated, timed and authenticated to its author — assessment,
                care plan, consent, procedures, medication and outcome.</p>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', opacity: .85 }}>
                Hospitals, clinics, small healthcare organisations, dental
              </p>
              <p style={{ marginTop: 'var(--space-6)' }}>
                <Link className="s-btn s-btn--onDeep" to="/frameworks/nabh">
                  What this looks like against NABH →
                </Link>
              </p>
            </div>

            <div className="s-card">
              <b className="num" style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,3.5rem)', color: 'var(--accent)', lineHeight: 1, letterSpacing: '-.04em' }}>
                {COVERAGE_BY_ID.NABH?.pct ?? 51}%
              </b>
              <p style={{ marginTop: 'var(--space-4)' }}>
                of the {COVERAGE_BY_ID.NABH?.inScope ?? 227} in-scope requirements are
                measured from data you already hold. The rest are named, not hidden.
              </p>
            </div>

            <div className="s-card s-card--deep">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>
                Empanelment reads the same file
              </h3>
              <p>The evidence an insurer wants and the evidence an accreditor wants are
                mostly the same evidence, captured once. That is the only reason it is
                affordable to capture it properly at all.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- the category fight ----------
          Two neighbours, both wrong for the same reason. A scribe is judged on
          transcription and stops at the note. A claims desk starts after the
          patient has gone. We are judged on whether the record clears the thing
          that reads it next, and we start while it can still be written. */}
      <section className="s-section">
        <div className="s-wrap s-reveal" ref={proofRef}>
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
            A scribe hands you a note and stops.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            Salvia checks that note against the rules that will judge it, flags what is
            missing, and blocks a submission that would breach one — an override needs a
            written reason, which itself becomes evidence. A scribe is graded on how
            accurately it heard you. This is graded on whether the record survives the
            person who reads it next.
          </p>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            A claims desk starts too late from the other side. It sees the file after the
            patient has gone home — when the enhancement can no longer be raised, and the
            reason the drug was given is in nobody&rsquo;s notes. Salvia starts on the ward,
            where both can still be fixed, and the desk works from records that were checked
            while they could still change.
          </p>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            The rules are yours, held as clauses with a severity. High blocks a submission,
            medium warns. When a payer changes what it asks for, you change the clause —
            not the form, not the workflow, and not a line of code.
          </p>
        </div>
      </section>


      {/* ---------- what actually gets captured ---------- */}
      <section className="s-section" id="capture">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '20ch' }}>
            A scribe writes prose. A claim is refused over a field.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            Every one of these is a typed field with its own rules — the consent that was
            witnessed, the drug that was given, the photograph taken during the procedure.
            Not a paragraph somebody has to remember to write, and not something you can
            go back for once the patient has gone home.
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
              <p>Structured fields, not prose. Consent, medication, procedures — in the
                shape the payer expects to see them.</p>
            </div>
            <div className="s-card">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                Checked before you file
              </h3>
              <p>Against what the payer requires. Gaps surface while the person who was
                there can still answer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- close ---------- */}
      <section className="s-section" style={{ background: 'var(--deep)', color: 'hsl(355 25% 82%)', borderBlock: '1.5px solid var(--ink)' }}>
        <div className="s-wrap">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.9rem,4vw,3rem)', maxWidth: '20ch' }}>
            See it against claims you have already lost
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>
            Send us twenty deducted claims with the reasons the payer gave. We will show
            you, one by one, which were decided by something nobody wrote down while the
            patient was still in the bed — and which had nothing to do with the record at
            all. The second list matters as much as the first.
          </p>
          <p style={{ marginTop: 'var(--space-7)' }}>
            <Link className="s-btn s-btn--onDeep" to="/contact-sales">
              Send us your deductions
            </Link>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

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

/* The money, from published sources only. Every figure here is either a
   regulator's own annual report or a listed hospital's audited accounts, so a
   CFO can check it without asking us. Nothing modelled, nothing estimated. */
const CLAIMS = {
  disallowedPct: '14%',
  disallowedNote: 'of cashless claim value was disallowed on policy terms — the insurer paid, but not all of it',
  disallowedSrc: 'IRDAI Annual Report FY 2024-25',
  cashlessCount: '1.89 crore',
  cashlessNote: 'cashless claims settled in a single year, worth ₹62,533 crore',
  cashlessSrc: 'IRDAI Annual Report FY 2024-25',
};

/* Listed hospitals disclose this themselves under Ind AS 115 — revenue is
   booked net of what they expect not to collect. These are their own auditors'
   numbers, which is why they are the most persuasive line on the page. */
const WRITE_OFFS = [
  { who: 'Max Healthcare',  pct: '5.69%', what: 'of contract price, consolidated FY26', where: 'Note 27.2' },
  { who: 'KIMS Hospitals',  pct: '5.44%', what: 'of contract price, consolidated FY25', where: 'Note 2.31' },
  { who: 'Apollo Hospitals', pct: '4.76%', what: 'of contract price, standalone FY26',  where: 'Note 27(ii)' },
  { who: 'Aster DM',        pct: '4.62%', what: 'of contract price, consolidated FY25', where: 'Note 20(iii)' },
] as const;

/* The arc, honestly staged. Two of these are live and two are not, and the page
   says which — a hospital tests the claims end in week one, so a promise here
   is a problem later. Order is the order the money moves. */
const ARC = [
  {
    stage: 'Capture', live: true,
    line: 'A voice note at the point of care becomes typed clinical fields — consent, procedure, medication, the photograph — not a paragraph somebody has to remember to write.',
  },
  {
    stage: 'Check', live: true,
    line: 'Every note is checked against the evidence the payer requires, while the patient is still admitted. What is missing surfaces to the desk with hours left to fix it, not weeks.',
  },
  {
    stage: 'Assemble', live: false,
    line: 'The claim file built from records that were already checked, in the shape the payer expects to receive it.',
  },
  {
    stage: 'Answer', live: false,
    line: 'When a file comes back deficient, the answer is drafted from the record that already exists — and every outcome sharpens the next check.',
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
  const proofRef = useReveal<HTMLDivElement>();
  const howRef = useReveal<HTMLDivElement>();
  const modulesRef = useReveal<HTMLDivElement>();

  return (
    <div className="s-page">
      <SEO
        title="Salvia — the evidence a claim needs, captured before discharge"
        description="Insurers pay on evidence, and evidence is written too late. Salvia turns what clinicians say into structured clinical documentation, checks it against the payer's requirements while the patient is still admitted, and shows the desk what is missing."
        path="/"
        keywords={[
          'cashless claim documentation',
          'hospital insurance claim deductions',
          'TPA claim evidence',
          'clinical documentation AI',
          'NABH records',
          'hospital revenue cycle India',
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
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', maxWidth: '16ch' }}>
            Deductions are decided before discharge. So is the fix.
          </h1>
          <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>
            Insurers pay on evidence, and the evidence is written too late to change.
            Salvia turns what clinicians say on the ward — spoken, in any language — into
            structured clinical documentation, checks it against what the payer requires
            while the patient is still admitted, and tells the desk what is missing
            in time to go and get it.
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
          Published figures only — a regulator's own annual report and four sets
          of audited accounts. A CFO can check every number here without asking
          us, which is the point: we are not the ones claiming there is a hole. */}
      <section className="s-band s-section" id="cost">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
            The hole is already in your accounts. Your auditors put it there.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            Listed hospitals book revenue net of what they expect not to collect. That
            number is disclosed, every year, in the notes to their own accounts.
          </p>

          <div
            className="s-stagger is-in"
            style={{
              display: 'grid', gap: 'var(--space-4)', marginTop: 'var(--space-7)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            }}
          >
            {WRITE_OFFS.map((w) => (
              <div key={w.who} className="s-card">
                <b className="num" style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,2.75rem)', color: 'var(--accent)', lineHeight: 1, letterSpacing: '-.04em' }}>
                  {w.pct}
                </b>
                <h3 style={{ fontSize: 'var(--text-base)', margin: 'var(--space-3) 0 var(--space-2)' }}>{w.who}</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{w.what}</p>
                <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                  Ind AS 115 · {w.where}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 'var(--space-5)', marginTop: 'var(--space-7)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="s-card s-card--accent">
              <b className="num" style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,3.5rem)', lineHeight: 1, letterSpacing: '-.04em' }}>
                {CLAIMS.disallowedPct}
              </b>
              <p style={{ marginTop: 'var(--space-4)' }}>{CLAIMS.disallowedNote}</p>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', letterSpacing: '.06em', textTransform: 'uppercase', opacity: .8 }}>
                {CLAIMS.disallowedSrc}
              </p>
            </div>
            <div className="s-card">
              <b className="num" style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,3.5rem)', color: 'var(--accent)', lineHeight: 1, letterSpacing: '-.04em' }}>
                {CLAIMS.cashlessCount}
              </b>
              <p style={{ marginTop: 'var(--space-4)' }}>{CLAIMS.cashlessNote}</p>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                {CLAIMS.cashlessSrc}
              </p>
            </div>
            <div className="s-card s-card--deep">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>
                Not all of it is documentation
              </h3>
              <p>Co-pays, sub-limits and non-payable items sit inside that number and no
                record can change them. We only claim the part that turns on evidence —
                and that part is decided on the ward, not at the desk.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- the arc ----------
          Two of these are live and two are not, and the page says which. A
          hospital tests the claims end in week one; a promise here is a problem
          later. Same pattern the modules section already uses. */}
      <section className="s-section" id="arc">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '20ch' }}>
            Four things have to happen. The first two decide the other two.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            By the time a file comes back deficient, the evidence that would have answered
            it either exists or it does not. Everything downstream is decided upstream.
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
            We will not tell you the last two are finished. They are being built with the
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

      {/* ---------- what is the same everywhere ----------
          The scribe distinction. This is the category fight: a scribe is judged
          on transcription accuracy, we are judged on whether the record clears
          the thing that reads it next. */}
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
            The rules are yours, held as clauses with a severity. High blocks a submission,
            medium warns. When a payer changes what it asks for, you change the clause —
            not the form, not the workflow, and not a line of code.
          </p>
        </div>
      </section>


      {/* ---------- breadth: what actually gets captured ---------- */}
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

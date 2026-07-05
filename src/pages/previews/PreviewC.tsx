import { Link } from 'react-router-dom';

// PreviewC — "Editorial magazine" direction.
// The six-year negligence story told as investigative journalism, with the
// product presented as court exhibits. Light theme, single font (Archivo)
// with 500/900 weight contrast doing the serif-feel work. Hairline rules,
// asymmetric grids, CSS-column body copy, margin numerals, pull quotes.

const BUNDLE_SHA =
  '9f2c41d8a06be573c1e2af4409d8b17c6a3e05f2b9d4c781e6a0f3b52c9d84e1';

const POLICY_CLAUSES = [
  { ref: 'Cl. 3.1', text: "Presenting complaint recorded in the patient's words", ok: true },
  { ref: 'Cl. 4.2', text: 'Consent documented before the procedure', ok: true },
  { ref: 'Cl. 7.1', text: 'Prescribed dose within protocol range', ok: true },
  { ref: 'Cl. 3.6', text: 'Allergy history reviewed against new prescription', ok: false },
] as const;

const AUDIT_ITEMS = [
  'Sealed record, PDF',
  'Original audio',
  'Transcript',
  'Policy version in force',
  'Hash manifest',
] as const;

const css = `
.pc-root {
  --pc-ink: #16181D;
  --pc-teal: #0E5A4F;
  --pc-red: #B91C1C;
  --pc-hair: rgba(22, 24, 29, 0.16);
  --pc-hair-soft: rgba(22, 24, 29, 0.09);
  --pc-faint: rgba(22, 24, 29, 0.62);
  --pc-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  background: #fff;
  color: var(--pc-ink);
  font-family: 'Archivo', sans-serif;
  font-weight: 500;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}
.pc-root ::selection { background: var(--pc-teal); color: #fff; }
.pc-root a { color: inherit; }

/* ---------- Masthead ---------- */
.pc-masthead { padding-top: 1.1rem; }
.pc-mast-top {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: baseline;
  gap: 1rem;
  border-top: 3px solid var(--pc-ink);
  border-bottom: 1px solid var(--pc-ink);
  padding: 0.85rem 0;
}
.pc-mast-note {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pc-faint);
}
.pc-mast-note--right { text-align: right; }
.pc-mast-brand {
  font-weight: 900;
  font-size: 1.7rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  text-indent: 0.32em; /* optically re-centre the tracked wordmark */
  text-align: center;
}
.pc-mast-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.2rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--pc-hair);
  font-size: 0.78rem;
  letter-spacing: 0.05em;
}
.pc-mast-nav a { text-decoration: none; color: var(--pc-faint); }
.pc-mast-nav a:hover { color: var(--pc-ink); }
.pc-mast-start {
  font-weight: 900;
  color: var(--pc-teal) !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.72rem;
}

/* ---------- Front page ---------- */
.pc-front { padding: 4.5rem 0 0; }
.pc-front h1 {
  margin: 0;
  font-weight: 900;
  font-size: clamp(3rem, 8.5vw, 6.8rem);
  line-height: 0.98;
  letter-spacing: -0.035em;
  max-width: 12ch;
}
.pc-standfirst-row {
  display: grid;
  grid-template-columns: 7fr 4fr;
  gap: 3rem;
  margin-top: 2.4rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--pc-ink);
}
.pc-standfirst {
  margin: 0;
  font-size: 1.22rem;
  line-height: 1.6;
  max-width: 34em;
}
.pc-front-meta {
  border-left: 1px solid var(--pc-hair);
  padding-left: 1.5rem;
  font-size: 0.82rem;
  color: var(--pc-faint);
  line-height: 1.7;
}
.pc-front-meta strong { font-weight: 900; color: var(--pc-ink); }

/* ---------- Photography ---------- */
.pc-photo { margin: 3rem 0 0; }
.pc-photo img {
  display: block;
  width: 100%;
  max-width: 100%;
  border: 1px solid var(--pc-hair);
}
.pc-photo figcaption {
  padding-top: 0.6rem;
  font-size: 0.78rem;
  color: var(--pc-faint);
  border-bottom: 1px solid var(--pc-hair-soft);
  padding-bottom: 0.9rem;
}
.pc-photo figcaption b { font-weight: 900; color: var(--pc-ink); margin-right: 0.5em; }
.pc-photo--offset { width: 72%; margin-left: auto; margin-top: 3.5rem; }

/* ---------- Section heads ---------- */
.pc-section-head { padding: 4.5rem 0 2.2rem; }
.pc-kicker {
  display: inline-block;
  font-weight: 900;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--pc-teal);
  border-top: 3px solid var(--pc-teal);
  padding-top: 0.55rem;
  margin-bottom: 1.1rem;
}
.pc-section-head h2 {
  margin: 0;
  font-weight: 900;
  font-size: clamp(1.9rem, 4vw, 3.1rem);
  letter-spacing: -0.025em;
  line-height: 1.08;
  max-width: 22ch;
}

/* ---------- The story ---------- */
.pc-story-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3.5rem;
  align-items: start;
}
.pc-marginal-stick { position: sticky; top: 2rem; }
.pc-huge {
  font-weight: 900;
  font-size: clamp(5.5rem, 10vw, 8.5rem);
  line-height: 0.85;
  letter-spacing: -0.05em;
}
.pc-huge span { font-size: 0.45em; font-weight: 900; letter-spacing: -0.02em; }
.pc-marginal p {
  margin: 1rem 0 0;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--pc-faint);
  border-top: 1px solid var(--pc-ink);
  padding-top: 0.8rem;
}
.pc-copy {
  columns: 2;
  column-gap: 3rem;
  column-rule: 1px solid var(--pc-hair-soft);
  font-size: 0.98rem;
}
.pc-copy p { margin: 0 0 1.3rem; }
.pc-lede::first-letter {
  float: left;
  font-weight: 900;
  font-size: 4.1em;
  line-height: 0.8;
  padding: 0.06em 0.14em 0 0;
  color: var(--pc-teal);
}
.pc-pull {
  break-inside: avoid;
  margin: 1.8rem 0;
  padding: 1.2rem 0 1rem;
  border-top: 3px solid var(--pc-ink);
  border-bottom: 1px solid var(--pc-ink);
}
.pc-pull p {
  margin: 0 0 0.7rem;
  font-weight: 900;
  font-size: 1.45rem;
  line-height: 1.25;
  letter-spacing: -0.015em;
}
.pc-pull cite {
  font-style: normal;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pc-faint);
}

/* ---------- Stat strip ---------- */
.pc-statstrip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 3.5rem;
  border-top: 1px solid var(--pc-ink);
}
.pc-stat { padding: 1.4rem 1.6rem 0.4rem 0; }
.pc-stat + .pc-stat { border-left: 1px solid var(--pc-hair); padding-left: 1.6rem; }
.pc-stat b {
  display: block;
  font-weight: 900;
  font-size: clamp(1.7rem, 3.4vw, 2.6rem);
  letter-spacing: -0.03em;
  line-height: 1;
  white-space: nowrap;
}
.pc-stat span {
  display: block;
  margin-top: 0.55rem;
  font-size: 0.8rem;
  color: var(--pc-faint);
  line-height: 1.55;
}

/* ---------- Exhibits ---------- */
.pc-exhibits { display: grid; grid-template-columns: repeat(12, 1fr); gap: 2.5rem 3rem; }
.pc-exhibit { margin: 0; }
.pc-exhibit--a { grid-column: 1 / 8; }
.pc-exhibit--b { grid-column: 8 / 13; margin-top: 4.5rem; }
.pc-exhibit--c { grid-column: 2 / 13; }
.pc-exhibit-cap {
  padding-top: 0.7rem;
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--pc-faint);
}
.pc-exhibit-cap b {
  font-weight: 900;
  color: var(--pc-ink);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.72rem;
  margin-right: 0.5em;
}

.pc-card { border: 1px solid var(--pc-ink); background: #fff; }
.pc-card-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1.1rem;
  border-bottom: 1px solid var(--pc-ink);
  font-weight: 900;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.pc-chip {
  font-size: 0.66rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 0.2rem 0.55rem;
  border: 1px solid currentColor;
}
.pc-chip--fail { color: var(--pc-red); }
.pc-chip--seal { color: var(--pc-teal); }

.pc-clause {
  display: grid;
  grid-template-columns: 1.4rem 1fr auto;
  gap: 0.8rem;
  align-items: baseline;
  padding: 0.7rem 1.1rem;
  border-bottom: 1px solid var(--pc-hair-soft);
  font-size: 0.9rem;
}
.pc-clause i { font-style: normal; font-weight: 900; color: var(--pc-teal); }
.pc-clause em { font-style: normal; font-size: 0.72rem; color: var(--pc-faint); letter-spacing: 0.05em; }
.pc-clause--fail { border-left: 3px solid var(--pc-red); padding-left: calc(1.1rem - 3px); }
.pc-clause--fail i, .pc-clause--fail span, .pc-clause--fail em { color: var(--pc-red); }
.pc-clause-detail {
  padding: 0.55rem 1.1rem 0.8rem calc(1.1rem + 2.2rem - 3px);
  border-left: 3px solid var(--pc-red);
  border-bottom: 1px solid var(--pc-hair-soft);
  font-size: 0.8rem;
  color: var(--pc-faint);
}
.pc-override {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.85rem 1.1rem;
}
.pc-override-hint {
  flex: 1;
  border: 1px solid var(--pc-hair);
  padding: 0.55rem 0.8rem;
  font-size: 0.8rem;
  color: var(--pc-faint);
}
.pc-override-btn {
  font-weight: 900;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--pc-ink);
  white-space: nowrap;
}

.pc-meta-row {
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  gap: 1rem;
  padding: 0.55rem 1.1rem;
  border-bottom: 1px solid var(--pc-hair-soft);
  font-size: 0.84rem;
}
.pc-meta-row em {
  font-style: normal;
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pc-faint);
}
.pc-skeletons { padding: 1rem 1.1rem 1.2rem; }
.pc-skeletons i {
  display: block;
  height: 0.55rem;
  background: rgba(22, 24, 29, 0.08);
  margin-bottom: 0.55rem;
}
.pc-hashfoot {
  padding: 0.7rem 1.1rem 0.85rem;
  border-top: 1px solid var(--pc-ink);
  font-family: var(--pc-mono);
  font-size: 0.68rem;
  line-height: 1.6;
  word-break: break-all;
  color: var(--pc-faint);
}
.pc-hashfoot em {
  font-style: normal;
  font-family: 'Archivo', sans-serif;
  font-weight: 900;
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--pc-ink);
  margin-right: 0.6em;
}

.pc-pack {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.1rem;
}
.pc-pack-items { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pc-pack-items span {
  border: 1px solid var(--pc-hair);
  padding: 0.3rem 0.7rem;
  font-size: 0.76rem;
}
.pc-pack-note { font-size: 0.84rem; color: var(--pc-faint); max-width: 24em; text-align: right; }

/* ---------- Closing ---------- */
.pc-closing-grid {
  display: grid;
  grid-template-columns: 7fr 4fr;
  gap: 3.5rem;
  align-items: start;
}
.pc-closing-grid .pc-photo { margin-top: 0.4rem; }
.pc-closing p { max-width: 36em; font-size: 1.02rem; margin: 0 0 1.3rem; }
.pc-closing p.pc-small { font-size: 0.86rem; color: var(--pc-faint); }
.pc-cta-row { display: flex; align-items: center; gap: 1.3rem; flex-wrap: wrap; margin-top: 2rem; }
.pc-cta {
  display: inline-block;
  background: var(--pc-teal);
  color: #fff !important;
  text-decoration: none;
  font-weight: 900;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1.05rem 1.7rem;
}
.pc-cta:hover { background: #0b4a41; }
.pc-cta-note { font-size: 0.8rem; color: var(--pc-faint); }

/* ---------- Footer ---------- */
.pc-foot { margin-top: 5rem; border-top: 3px solid var(--pc-ink); padding: 1.4rem 0 2.5rem; }
.pc-foot-sources { font-size: 0.74rem; color: var(--pc-faint); line-height: 1.8; max-width: 62em; }
.pc-foot-sources a { color: var(--pc-teal); }
.pc-foot-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.4rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--pc-hair);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pc-faint);
}
.pc-foot-row a { color: var(--pc-teal); text-decoration: none; font-weight: 900; }

/* ---------- Responsive ---------- */
@media (max-width: 960px) {
  .pc-standfirst-row, .pc-closing-grid { grid-template-columns: 1fr; gap: 1.8rem; }
  .pc-front-meta { border-left: 0; border-top: 1px solid var(--pc-hair); padding: 1.2rem 0 0; }
  .pc-story-grid { grid-template-columns: 1fr; gap: 2rem; }
  .pc-marginal-stick { position: static; display: grid; grid-template-columns: auto 1fr; gap: 1.5rem; align-items: end; }
  .pc-marginal p { border-top: 0; border-left: 1px solid var(--pc-ink); padding: 0 0 0 1.2rem; margin: 0; }
  .pc-exhibit--a, .pc-exhibit--b, .pc-exhibit--c { grid-column: 1 / 13; margin-top: 0; }
  .pc-photo--offset { width: 100%; }
}
@media (max-width: 700px) {
  .pc-mast-top { grid-template-columns: 1fr; text-align: center; }
  .pc-mast-note, .pc-mast-note--right { text-align: center; }
  .pc-mast-nav { gap: 1.2rem; flex-wrap: wrap; }
  .pc-copy { columns: 1; }
  .pc-statstrip { grid-template-columns: 1fr; }
  .pc-stat + .pc-stat { border-left: 0; border-top: 1px solid var(--pc-hair); padding-left: 0; }
  .pc-pack { grid-template-columns: 1fr; }
  .pc-pack-note { text-align: left; }
  .pc-override { flex-direction: column; align-items: stretch; }
  .pc-override-btn { text-align: center; }
}
`;

const PreviewC = () => {
  return (
    <div className="pc-root">
      <style>{css}</style>

      {/* Masthead */}
      <header className="pc-masthead">
        <div className="g-container">
          <div className="pc-mast-top">
            <span className="pc-mast-note">The evidence layer for Indian healthcare</span>
            <span className="pc-mast-brand">Salvia</span>
            <span className="pc-mast-note pc-mast-note--right">A briefing &middot; 2026</span>
          </div>
          <nav className="pc-mast-nav">
            <a href="#story">The story</a>
            <a href="#exhibits">The exhibits</a>
            <a href="#closing">The closing argument</a>
            <Link to="/start" className="pc-mast-start">Start free</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Front page */}
        <section className="pc-front">
          <div className="g-container">
            <h1>Every consult, on&nbsp;the&nbsp;record.</h1>
            <div className="pc-standfirst-row">
              <p className="pc-standfirst">
                The doctor speaks for ninety seconds. Salvia&rsquo;s AI writes it into the
                clinic&rsquo;s own form, checks it against the clinic&rsquo;s own policy before
                anyone signs, and seals the result &mdash; original audio attached, policy version
                noted, a SHA-256 hash printed on every page. Years later, when someone asks what
                happened, you answer with evidence instead of memory.
              </p>
              <div className="pc-front-meta">
                <strong>In this briefing</strong> &mdash; a complaint six years in the making,
                a 22% finding from 253 judgments, three exhibits, and a closing argument.
              </div>
            </div>
            <figure className="pc-photo">
              <img
                src="/illustrations/hero_world.webp"
                alt="Miniature diorama of a small clinic"
              />
              <figcaption>
                <b>Fig. 1</b>
                Six p.m. at a small clinic. The day&rsquo;s most consequential documents have not
                been written yet.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* The story */}
        <section id="story">
          <div className="g-container">
            <div className="pc-section-head">
              <span className="pc-kicker">The story</span>
              <h2>Six years is a long time to remember a Tuesday.</h2>
            </div>

            <div className="pc-story-grid">
              <aside className="pc-marginal">
                <div className="pc-marginal-stick">
                  <div className="pc-huge">22<span>%</span></div>
                  <p>
                    of proven negligence cases before the National Consumer Disputes Redressal
                    Commission involved a failure to keep accurate records. Five-year review of
                    253 judgments, Indian Journal of Medical Ethics.
                  </p>
                </div>
              </aside>

              <div className="pc-copy">
                <p className="pc-lede">
                  A complaint from 2020 just arrived. The treating doctor left last year. The
                  consent form is a photocopy with page two missing, the nurse who witnessed it
                  moved to Dubai, and the case sheet &mdash; when someone finally finds the
                  register &mdash; has a gap where March should be. The hospital has six weeks
                  to reply.
                </p>
                <p>
                  Nothing about this is unusual. A medical negligence case before India&rsquo;s
                  consumer commissions runs about six years from complaint to judgment. Six years
                  is long enough for staff to scatter and memory to soften; paper fades faster
                  than grievance. By the time the matter is heard, the only witness still in the
                  building is the record. If there is one.
                </p>
                <p>
                  How often there isn&rsquo;t one is now measurable. A five-year review published
                  in the Indian Journal of Medical Ethics examined 253 judgments of the NCDRC and
                  found that in 22% of the cases where negligence was proven, a failure to keep
                  accurate records was part of the finding. Not a failing of medicine &mdash; a
                  failing of paperwork, priced like a failing of medicine.
                </p>
                <p>
                  The law is blunt about missing paper. When a hospital cannot produce records it
                  ought to hold, courts are entitled to draw an adverse inference &mdash; to
                  assume the missing page said what the complainant claims it said. The Indian
                  Journal of Urology put the operating principle plainly:
                </p>
                <blockquote className="pc-pull">
                  <p>&ldquo;Poor records mean poor defense. No records mean no defense.&rdquo;</p>
                  <cite>Indian Journal of Urology</cite>
                </blockquote>
                <p>
                  And the stakes have moved well past the clerical. Awards in recent proven cases
                  run from &#8377;75 lakh to &#8377;11 crore. At those numbers, an unsigned
                  consent form is not an administrative lapse; it is the most expensive blank
                  space in the building.
                </p>
                <p>
                  Which reframes the question a clinic should ask itself. Not &ldquo;did we treat
                  the patient well?&rdquo; &mdash; in most of these cases, they did. The question
                  is: if this consult is challenged in 2032, what will we be able to produce?
                  Salvia exists to make that answer boring &mdash; a record made at the moment of
                  care, in the clinic&rsquo;s own form, checked against the clinic&rsquo;s own
                  policy, sealed before anyone knew it would matter. The evidence follows, marked
                  as exhibits.
                </p>
              </div>
            </div>

            <div className="pc-statstrip">
              <div className="pc-stat">
                <b>&#8377;75L &ndash; &#8377;11Cr</b>
                <span>the range of awards in recent proven negligence cases before the NCDRC.</span>
              </div>
              <div className="pc-stat">
                <b>6 years</b>
                <span>the average life of a case, complaint to judgment &mdash; longer than most staff stay.</span>
              </div>
              <div className="pc-stat">
                <b>253</b>
                <span>NCDRC judgments examined in the IJME five-year retrospective review.</span>
              </div>
            </div>

            <figure className="pc-photo pc-photo--offset">
              <img
                src="/illustrations/story_policy.webp"
                alt="Illustrated scene of a clinic policy library"
              />
              <figcaption>
                <b>Fig. 2</b>
                The policy library. Protocols are versioned; every sealed record names the version
                that was in force on the day of care.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* The exhibits */}
        <section id="exhibits">
          <div className="g-container">
            <div className="pc-section-head">
              <span className="pc-kicker">The exhibits</span>
              <h2>What a defensible record looks like.</h2>
            </div>

            <div className="pc-exhibits">
              {/* Exhibit A — policy check */}
              <figure className="pc-exhibit pc-exhibit--a">
                <div className="pc-card">
                  <div className="pc-card-bar">
                    <span>Policy check &mdash; before signature</span>
                    <span className="pc-chip pc-chip--fail">1 clause failing</span>
                  </div>
                  {POLICY_CLAUSES.map((c) =>
                    c.ok ? (
                      <div className="pc-clause" key={c.ref}>
                        <i>&#10003;</i>
                        <span>{c.text}</span>
                        <em>{c.ref}</em>
                      </div>
                    ) : (
                      <div className="pc-clause pc-clause--fail" key={c.ref}>
                        <i>&#10005;</i>
                        <span>{c.text}</span>
                        <em>{c.ref}</em>
                      </div>
                    ),
                  )}
                  <div className="pc-clause-detail">
                    No allergy status is recorded for a patient receiving a new prescription.
                    Resolve the note, or override in writing.
                  </div>
                  <div className="pc-override">
                    <span className="pc-override-hint">
                      Clinical justification, in the doctor&rsquo;s own words&hellip;
                    </span>
                    <span className="pc-override-btn">Sign with override</span>
                  </div>
                </div>
                <figcaption className="pc-exhibit-cap">
                  <b>Exhibit A</b>
                  The check that runs before a doctor can sign. One clause is failing; the doctor
                  can fix the note or override it with a written justification. Either way, both
                  the failure and the reasoning become part of the record.
                </figcaption>
              </figure>

              {/* Exhibit B — sealed record */}
              <figure className="pc-exhibit pc-exhibit--b">
                <div className="pc-card">
                  <div className="pc-card-bar">
                    <span>Consultation record</span>
                    <span className="pc-chip pc-chip--seal">Sealed</span>
                  </div>
                  <div className="pc-meta-row"><em>Sealed</em><span>14 Mar 2026 &middot; 18:42 IST</span></div>
                  <div className="pc-meta-row"><em>Form</em><span>The clinic&rsquo;s own consult form</span></div>
                  <div className="pc-meta-row"><em>Policy</em><span>v3.2 &mdash; in force on the date of care</span></div>
                  <div className="pc-meta-row"><em>Audio</em><span>Original dictation attached &middot; 1:34</span></div>
                  <div className="pc-skeletons" aria-hidden="true">
                    <i style={{ width: '100%' }} />
                    <i style={{ width: '92%' }} />
                    <i style={{ width: '64%' }} />
                  </div>
                  <div className="pc-hashfoot">
                    <em>SHA-256 (bundle)</em>
                    {BUNDLE_SHA}
                  </div>
                </div>
                <figcaption className="pc-exhibit-cap">
                  <b>Exhibit B</b>
                  A sealed record. The hash is computed across the whole bundle &mdash; note,
                  audio, policy version &mdash; and printed in the footer of every PDF page.
                </figcaption>
              </figure>

              {/* Exhibit C — audit pack */}
              <figure className="pc-exhibit pc-exhibit--c">
                <div className="pc-card">
                  <div className="pc-card-bar">
                    <span>Audit pack &mdash; one click</span>
                  </div>
                  <div className="pc-pack">
                    <div className="pc-pack-items">
                      {AUDIT_ITEMS.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <p className="pc-pack-note">
                      The bundle a lawyer, insurer or court asks for &mdash; produced in one
                      click, verifiable by anyone.
                    </p>
                  </div>
                </div>
                <figcaption className="pc-exhibit-cap">
                  <b>Exhibit C</b>
                  Tampering with any byte invalidates the bundle hash printed in the footer of
                  every page.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Closing argument */}
        <section id="closing" className="pc-closing">
          <div className="g-container">
            <div className="pc-section-head">
              <span className="pc-kicker">The closing argument</span>
              <h2>You can&rsquo;t rewrite 2020. You can start the record today.</h2>
            </div>
            <div className="pc-closing-grid">
              <div>
                <p>
                  Every Salvia consult ends the same way: the doctor speaks, the AI fills the
                  clinic&rsquo;s form, the policy check runs, and the record seals with the audio
                  and the policy version inside. Nothing depends on who is still on staff in six
                  years, or on which register survived the move.
                </p>
                <p className="pc-small">
                  Courts draw adverse inference from records you cannot produce. The inverse holds
                  too: a contemporaneous, policy-checked, sealed record is the strongest witness a
                  clinic can call &mdash; and the only one that never forgets.
                </p>
                <div className="pc-cta-row">
                  <Link to="/start" className="pc-cta">Put your clinic on the record</Link>
                  <span className="pc-cta-note">Every consult after today, sealed.</span>
                </div>
              </div>
              <figure className="pc-photo">
                <img
                  src="/illustrations/ill_seal.webp"
                  alt="Illustration of a sealed clinical record"
                />
                <figcaption>
                  <b>Fig. 3</b>
                  The seal: timestamp, policy version, original audio, and a hash on every page.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pc-foot">
        <div className="g-container">
          <p className="pc-foot-sources">
            Sources &mdash; 1.&nbsp;
            <a
              href="https://ijme.in/articles/medical-negligence-in-cases-decided-by-the-national-consumer-disputes-redressal-commission-a-five-year-retrospective-review/"
              target="_blank"
              rel="noopener noreferrer"
            >
              &ldquo;Medical negligence in cases decided by the National Consumer Disputes
              Redressal Commission: a five-year retrospective review&rdquo;
            </a>
            , Indian Journal of Medical Ethics (253 judgments; 22% of proven cases involved
            record-keeping failure). 2.&nbsp;&ldquo;Medical records and issues in
            negligence&rdquo;, Indian Journal of Urology. 3.&nbsp;Award figures from published
            NCDRC judgments.
          </p>
          <div className="pc-foot-row">
            <span>&copy; 2026 Salvia &middot; hellosalvia.com</span>
            <span>The evidence layer for Indian healthcare</span>
            <Link to="/start">Start free</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewC;

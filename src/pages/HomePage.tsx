import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { DeskSequence } from '../components/DeskSequence';
import '../styles/site.css';
import '../styles/product.css';

/* ─────────────────────────────────────────────────────────────────────────
   Structure follows the narrative teardown of how technical-infrastructure
   pages are actually built, against this buyer: Problem-Aware and
   Solution-Unaware. A hospital MD knows discharge takes six hours; nobody
   knows a claim integrity layer is a thing you can buy. So the problem gets
   one paragraph and the rest of the page is the solution.

   Two rules hold it together:
   · The product is visible at 0px and re-shown every screen or two. 81% of
     viewing time is spent in the first three screenfuls; spending them on
     prose is spending them on nothing.
   · Every string inside a product frame is real: IP 2026/4471, Day 4,
     Implant sticker, Awaiting docs. For a company with no logos, being
     unmistakably inside the workflow is the most convincing signal there is.
   ───────────────────────────────────────────────────────────────────────── */

/* The rules that decide where the money goes once the patient leaves. Quoted
   from the documents themselves, so a hospital can check every word against
   the agreement it already signed. This is evidence rather than endorsement,
   which is how a company with no customer logos gets proof onto a page.
   The third is one insurer's live empanelment agreement — named clause,
   unnamed insurer, because it is one contract and not a regulation. */
const CLAUSES = [
  {
    quote: 'No enhancement of limit is possible after discharge of insured.',
    means: 'The treatment grew, nobody raised it in time. That difference is not deducted. It is gone.',
    src: 'IRDA Minimum Standard Clauses, 2016 · cl. 10',
    full: 'Minimum Standard Clauses issued by IRDA under Reg. 20(5), IRDAI (TPA – Health Services) Regulations 2016',
  },
  {
    quote: '…no further papers thereafter shall be entertained.',
    means: 'Seven days to produce a report that ties to a billed line, with the patient already home.',
    src: 'An insurer’s hospital empanelment agreement · cl. 8.2',
    full: 'Named clause, unnamed insurer: this is one contract, not a regulation.',
  },
  {
    quote: '…the additional amount shall be borne by the insurer from shareholder’s fund.',
    means: 'The regulator already treats a slow discharge as a failure, and prices it at three hours.',
    src: 'IRDAI Master Circular, 29 May 2024 · cl. 16(b)',
    full: 'IRDAI Master Circular on Health Insurance Business, IRDAI/HLT/CIR/PRO/84/5/2024',
  },
] as const;

/* Published, and each stated against its real denominator. The 13.98% is
   measured at the insurer on what was claimed, not on hospital revenue — the
   note below says so before anyone else has to. Listed hospitals' "discounts
   and disallowances" lines are deliberately absent: they blend corporate and
   PSU discounts with insurer cuts, and a CFO who has read the note would be
   right to discount the whole page. */
const NUMBERS = [
  {
    big: '13.98%',
    line: 'of health claims presented to insurers in FY 2024-25 was disallowed on policy terms. ₹18,521 crore, measured at the insurer on what was claimed.',
    src: 'IRDAI Annual Report 2024-25',
  },
  {
    big: '55 → 86',
    line: 'days for one listed hospital group to collect on credit billing, in a single year. The money still arrives. It arrives a month later.',
    src: 'Max Healthcare, consolidated FY26',
  },
] as const;

const NEVERS = [
  { head: 'upcode', body: 'No diagnosis and no procedure that did not happen, at any margin.' },
  { head: 'write the note', body: 'We show what is missing and ask the person who was there.' },
  { head: 'submit alone', body: 'Nothing leaves without someone on your team approving it.' },
  { head: 'take a cut', body: 'Our fee does not move with your billing, ever.' },
  { head: 'touch the ward', body: 'Your clinical staff work exactly as they do today.' },
  { head: 'say it is fine', body: 'If the theatre note never arrived, it says not received.' },
];


const FAQ = [
  {
    q: 'What about our HMS?',
    a: 'You do not wait for it. The desk works from the first admission, and the integration deepens what you see rather than switching it on. When it lands it stops your team retyping what the hospital already knows.',
  },
  {
    q: 'Who can see patient data?',
    a: 'Access is by role. The insurance desk sees the claim and the documents on it, and cannot read clinical rounds. Data is resident in India. No patient identifiers reach our logs, analytics or error reporting.',
  },
  {
    q: 'Does anyone on the ward have to learn something new?',
    a: 'No, and that is a design constraint rather than a nice to have. Every hospital we sat with said the same thing: change what the nurses do and the project dies.',
  },
  {
    q: 'Are you live on NHCX?',
    a: 'No. Our claim model follows NHCX’s own workflow vocabulary, so the transport is a swap rather than a rebuild, but we are not certified and we will not give you a date. Anyone who does is guessing.',
  },
  {
    q: 'Will you help us recover past deductions?',
    a: 'No. We work the claim while the patient is still admitted, because that is the only point at which missing evidence can still be created. A deduction that already landed is somebody else’s product.',
  },
  {
    q: 'What does it cost?',
    a: 'Not a percentage of your claim value. Pricing is against the desk work it replaces, and we would rather quote it after seeing a week of your files than before.',
  },
];

/** Pause buttons, counters and the chart. CSS owns every animation so the
 *  whole thing stays interruptible and honours prefers-reduced-motion. */
function usePageMotion() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onPause = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const movie = btn.closest('.movie');
      if (!movie) return;
      movie.classList.toggle('is-paused');
      btn.textContent = movie.classList.contains('is-paused') ? 'Play' : 'Pause';
    };
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.pz'));
    buttons.forEach((b) => b.addEventListener('click', onPause));

    /* Conway's Game of Life behind the hero card.
     *
     * Wrapped on a torus, so gliders leave one edge and come back in the other
     * and nothing dies against a wall. Random soup settles into still lifes
     * within a couple of hundred generations, which would leave a frozen
     * picture — so when the population stops changing the board takes a fresh
     * patch of soup. That is what makes it never-ending rather than merely
     * long. */
    const grid = document.getElementById('sv-grid');
    let gridTimer: ReturnType<typeof setInterval> | undefined;
    let cells: HTMLElement[] = [];
    let cur = new Uint8Array(0);
    let nxt = new Uint8Array(0);
    let cols = 0;
    let rows = 0;
    let lastPop = -1;
    let stale = 0;

    const CELL = 26;
    const soup = (from = 0) => {
      for (let n = from; n < cur.length; n += 1) cur[n] = Math.random() < 0.18 ? 1 : 0;
    };
    const build = () => {
      if (!grid) return;
      const w = grid.clientWidth;
      const h = grid.clientHeight;
      if (!w || !h) return;
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      grid.style.gridAutoRows = `${CELL}px`;
      grid.textContent = '';
      cells = [];
      const frag = document.createDocumentFragment();
      for (let n = 0; n < cols * rows; n += 1) {
        const cell = document.createElement('i');
        frag.appendChild(cell);
        cells.push(cell);
      }
      grid.appendChild(frag);
      cur = new Uint8Array(cols * rows);
      nxt = new Uint8Array(cols * rows);
      soup();
      paint();
    };
    const paint = () => {
      let pop = 0;
      for (let n = 0; n < cur.length; n += 1) {
        const on = cur[n] === 1;
        pop += cur[n];
        if (on !== cells[n].classList.contains('on')) cells[n].classList.toggle('on', on);
      }
      return pop;
    };
    const generation = () => {
      for (let y = 0; y < rows; y += 1) {
        const up = ((y - 1 + rows) % rows) * cols;
        const mid = y * cols;
        const dn = ((y + 1) % rows) * cols;
        for (let x = 0; x < cols; x += 1) {
          const l = (x - 1 + cols) % cols;
          const r = (x + 1) % cols;
          const n = cur[up + l] + cur[up + x] + cur[up + r]
            + cur[mid + l] + cur[mid + r]
            + cur[dn + l] + cur[dn + x] + cur[dn + r];
          const i2 = mid + x;
          nxt[i2] = cur[i2] ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
        }
      }
      cur.set(nxt);
      const pop = paint();
      /* Still lifes and short oscillators hold the population steady. Give it
         a few generations of grace, then drop new soup into a third of the
         board rather than restarting the whole thing, so it never blinks. */
      if (Math.abs(pop - lastPop) <= 2) stale += 1; else stale = 0;
      lastPop = pop;
      if (stale > 8 || pop < cur.length * 0.02) {
        const from = Math.floor(Math.random() * (cur.length * 0.66));
        for (let n = from; n < from + cur.length * 0.34 && n < cur.length; n += 1) {
          cur[n] = Math.random() < 0.28 ? 1 : 0;
        }
        stale = 0;
      }
    };

    let onResize: (() => void) | undefined;
    if (grid) {
      build();
      if (!reduce) gridTimer = setInterval(generation, 620);
      let rt: ReturnType<typeof setTimeout>;
      onResize = () => { clearTimeout(rt); rt = setTimeout(build, 200); };
      window.addEventListener('resize', onResize);
    }
    const gridBtn = document.querySelector<HTMLButtonElement>('.pz[data-grid]');
    const onGridPause = () => {
      if (gridTimer) { clearInterval(gridTimer); gridTimer = undefined; }
      else if (!reduce) gridTimer = setInterval(generation, 620);
    };
    gridBtn?.addEventListener('click', onGridPause);

    /* On a phone the two lanes are a long vertical list, so each step reveals
       as it arrives rather than all seven racing on a timer the moment the
       section mounts — which is what left a blank slot where a step had been
       delayed past the point anyone was looking at it. */
    let stepIo: IntersectionObserver | undefined;
    if (!reduce && window.matchMedia('(max-width: 860px)').matches) {
      stepIo = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          stepIo?.unobserve(e.target);
        }),
        { threshold: 0.4, rootMargin: '0px 0px -6% 0px' },
      );
      document.querySelectorAll('.rstep').forEach((el) => stepIo?.observe(el));
    }

    /* counters, once, and only when the section is actually on screen */
    const glance = document.getElementById('sv-glance');
    let io: IntersectionObserver | undefined;
    if (glance) {
      const counters = Array.from(glance.querySelectorAll<HTMLElement>('[data-count]'));
      if (reduce) {
        counters.forEach((el) => { el.textContent = el.dataset.count ?? ''; });
      } else {
        let ran = false;
        io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || ran) return;
            ran = true;
            counters.forEach((el) => {
              const to = Number(el.dataset.count);
              const start = performance.now();
              const step = (now: number) => {
                const p = Math.min((now - start) / 900, 1);
                el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
                if (p < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            });
          });
        }, { threshold: 0.35 });
        io.observe(glance);
      }
    }

    return () => {
      buttons.forEach((b) => b.removeEventListener('click', onPause));
      gridBtn?.removeEventListener('click', onGridPause);
      if (onResize) window.removeEventListener('resize', onResize);
      if (gridTimer) clearInterval(gridTimer);
      stepIo?.disconnect();
      io?.disconnect();
    };
  }, []);
}

export default function HomePage() {
  usePageMotion();

  return (
    <div className="s-page">
      <SEO
        title="Salvia — the claim integrity layer for Indian hospitals"
        description="Your insurance work stops being a pile of paper assembled after discharge and becomes a live file that is already complete when the patient is ready to go. Every admission and every document, live to the insurance desk."
        path="/"
        keywords={[
          'cashless claim India',
          'hospital insurance desk software',
          'claim integrity',
          'cashless claim enhancement',
          'TPA claim evidence',
          'hospital revenue cycle India',
        ]}
      />

      <SiteHeader />

      {/* ── §1 hero ────────────────────────────────────────────────────────
          A card held in the middle of a ward that is quietly filling in behind
          it. The grid is not decoration: a cell lights when evidence lands, so
          the background is the product's resting state. */}
      <section className="sv-hero">
        <div className="sv-stage movie">
          <div id="sv-grid" aria-hidden="true" />
          <div className="sv-herocard">
            <span className="c tl">+</span><span className="c tr">+</span>
            <span className="c bl">+</span><span className="c br">+</span>
            <h1 style={{ fontSize: 'clamp(2.25rem, 4.6vw, 3.6rem)' }}>
              Insurance, finished before the patient leaves.
            </h1>
            <p className="s-lede" style={{ margin: 'var(--space-5) auto 0' }}>
              Salvia is the claim integrity layer for Indian hospitals. Every admission and
              every document reaches the insurance desk live, so the file is complete while
              the evidence can still be created rather than chased after the patient has
              gone home.
            </p>
            <div className="sv-herocta">
              <Link className="s-btn s-btn--primary" to="/start">Book a demo</Link>
              <a className="s-btn s-btn--ghost" href="#how">See how it works</a>
            </div>
          </div>
          <button className="pz" type="button" data-grid>Pause</button>
        </div>
      </section>

      {/* ── §2 credentials. Verified only ─────────────────────────────────── */}
      <div className="s-wrap">
        <div className="sv-cred">
          <div>
            <img src="/logos/ksum.svg" alt="" width={110} height={63} className="sv-plogo" />
            <div><b>Kerala Startup Mission</b><span>Registered startup</span></div>
          </div>
          <div>
            <img src="/logos/startup-india.png" alt="" width={104} height={27} className="sv-plogo sv-plogo--si" />
            <div><b>Startup India</b><span>DPIIT recognised</span></div>
          </div>
          <div>
            <img src="/logos/hospex-award.png" alt="" width={47} height={80} className="sv-plogo sv-plogo--award" />
            <div><b>Healthcare Startup of the Year 2026</b><span>HOSPEX Healthcare Expo, Kochi</span></div>
          </div>
        </div>
      </div>

      {/* ── §3 how it works. Three fragments, each playing ─────────────────── */}
      <section className="s-section" id="how">
        <div className="s-wrap">
          <div className="s-split">
            <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
              Evidence arrives. The file checks itself. One place to send it.
            </h2>
            <p className="s-lede">
              The whole loop runs while the patient is still admitted, so a gap is something
              you fix rather than something you argue about later.
            </p>
          </div>

          <div className="three" style={{ marginTop: 'var(--space-7)' }}>
            <div>
              <h3>Evidence lands as it is made</h3>
              <p>Whatever the ward produces reaches the file on its own. Nobody on the ward
                does anything different.</p>
              <div className="frag movie hl">
                <div className="panel">
                  <div className="panel-h">
                    <span className="t-h2">Ward 3B</span><span className="t-meta">6 patients</span>
                  </div>
                  <div>
                    {[
                      ['3B', '207', 'Vitals chart', '11:02'],
                      ['3B', '211', 'Theatre note', '14:26'],
                      ['3B', '214', 'Implant sticker', '14:31'],
                      ['3B', '219', 'Progress note', '18:00'],
                    ].map(([w, b, doc, t], i) => (
                      <div className="ev" key={b} style={{ ['--i' as string]: i }}>
                        <span className="bed sm"><span className="w">{w}</span><span className="b">{b}</span></span>
                        <span className="nm" style={{ fontWeight: 500 }}>{doc}</span>
                        <span className="t-meta">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="pz" type="button">Pause</button>
              </div>
            </div>

            <div>
              <h3>The file checks itself</h3>
              <p>Against what this payer needs for this admission. What is missing is named,
                and named to a person who can still produce it.</p>
              <div className="frag movie hl">
                <div className="panel">
                  <div className="panel-h">
                    <span className="t-h2">Pre-authorisation</span><span className="tag">Star Health</span>
                  </div>
                  {['Admission note', 'Investigation reports'].map((n, i) => (
                    <div className="ck plain" key={n} style={{ ['--i' as string]: i }}>
                      <span>{n}</span>
                      <span className="flip"><span className="b st ok"><i />Received</span></span>
                    </div>
                  ))}
                  <div className="ck">
                    <span>Implant sticker</span>
                    <span className="flip">
                      <span className="a st wn"><i />Not received</span>
                      <span className="b st ok"><i />Received</span>
                    </span>
                  </div>
                  <div className="ck plain" style={{ ['--i' as string]: 3 }}>
                    <span>Consultant notes</span>
                    <span className="flip"><span className="b st ok"><i />Received</span></span>
                  </div>
                  <div className="qfoot">
                    <span className="a">Query raised to theatre</span>
                    <span className="b">Answered in 6 minutes</span>
                  </div>
                </div>
                <button className="pz" type="button">Pause</button>
              </div>
            </div>

            <div>
              <h3>One place to send everything</h3>
              <p>Pre-auth, enhancement, query response and the final claim all leave from the
                same screen, and the money is matched back to the claim.</p>
              <div className="frag movie hl">
                <div className="sendwrap">
                  <div className="ccard">
                    <span className="tag">Star Health · Medi Assist</span>
                    <div className="t-bodymed" style={{ marginTop: 9, color: 'var(--i2)' }}>IP 2026/4471</div>
                    <div className="t-display" style={{ marginTop: 2 }}>₹1,84,200</div>
                    <div className="divi">
                      <span className="swap">
                        <span className="s1 cs pending">Awaiting docs</span>
                        <span className="s2 cs submitted">Submitted</span>
                        <span className="s3 cs queried">Queried</span>
                        <span className="s4 cs settled">Settled</span>
                      </span>
                      <span className="clk2">
                        <span className="k1">2d 06h</span><span className="k2">5h 48m left</span>
                        <span className="k3">overdue 3h 20m</span><span className="k4">Paid 10 Sep</span>
                      </span>
                    </div>
                  </div>
                  <div className="panel sendlist">
                    <div className="panel-h"><span className="t-h2">Sent from here</span></div>
                    {[
                      ['Pre-authorisation', 'ok', 'Approved'],
                      ['Enhancement', 'ok', 'Approved'],
                      ['Query response', 'ok', 'Sent'],
                      ['Final claim', 'nu', 'Ready'],
                    ].map(([n, tone, label], i) => (
                      <div className="sd" key={n} style={{ ['--i' as string]: i }}>
                        <span>{n}</span><span className={`st ${tone}`}><i />{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="pz" type="button">Pause</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── §4 the problem. One paragraph, carrying the reframe ───────────── */}
      <section className="s-section">
        <div className="s-wrap">
          <div className="s-split">
            <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '20ch' }}>
              Three teams touch one admission. None of them can see each other.
            </h2>
            <p className="s-lede">
              The ward writes the notes, the counselling desk handles the patient, and the
              insurance department receives a finished pile of paper to scan and upload. The
              evidence was available for six days. Nobody went looking for it until day
              seven, and by then it can no longer be created. The bed waits on the file, and
              the file waits on people.
            </p>
          </div>
        </div>
      </section>

      {/* ── §4 the desk, walked end to end ────────────────────────────────
          The one pinned thing on the page. Everything else scrolls normally:
          a site where every section grabs the scroll is a site nobody can
          read. Mobile drops the pinning entirely. */}
      <section className="s-section" id="desk">
        <div className="s-wrap">
          <div className="s-split">
            <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
              One admission, from the bed to the money.
            </h2>
            <p className="s-lede">
              The same claim at eight moments. The screen does not move, only what is on it
              changes, which is the whole of what Salvia does.
            </p>
          </div>
        </div>
        <div className="s-wrap"><DeskSequence /></div>
        <div className="s-wrap">
          <div className="sv-midcta">
            <p>See it against one week of files you have already closed. We will show you
              what was missing, and when it could still have been produced.</p>
            <Link className="s-btn s-btn--primary" to="/start">Book a demo</Link>
          </div>
        </div>
      </section>

      {/* ── §5 the structural promise ──────────────────────────────────────
          Two lanes, and the thing to see is the colour changing: today the
          file bounces between two departments with a wait at every handover.
          On Salvia the colour never changes, because the desk never does. */}
      <section className="s-band s-section" id="shift">
        <div className="s-wrap">
          <div className="s-split">
            <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '20ch' }}>
              Two departments become one desk.
            </h2>
            <p className="s-lede">
              The team that handles inpatients and the team that handles insurance are doing
              one job in two places. Every handover between them is a wait, and every wait
              is a day the evidence gets harder to produce.
            </p>
          </div>

          <div className="race hl">
            <div className="lane">
              <div className="lanehead">
                <span className="t-h2">One admission, today</span>
                <span className="racechip warn">4 handovers · 3 waits · finishes after discharge</span>
              </div>
              <ol className="rtrack">
                {[
                  ['ip', 'Admitted', 'Admission slip typed at the counter', 0],
                  ['wait', 'Waiting', 'Papers sit in a tray until someone walks them over', 1],
                  ['ins', 'Handed over', 'Insurance scans what it was given', 2.4],
                  ['wait', 'Waiting', 'A query comes back, nobody on the desk was in theatre', 3.4],
                  ['ip', 'Back to the ward', 'Someone goes looking for the document', 4.8],
                  ['wait', 'Waiting', 'The patient is discharged before it is found', 5.8],
                  ['ins', 'Submitted', 'Assembled from whatever could still be gathered', 7.2],
                ].map(([team, label, sub, d], n) => (
                  <li
                    key={n}
                    className={`rstep${team === 'wait' ? ' is-wait' : ''}`}
                    style={{ ['--d' as string]: d }}
                  >
                    <span className={`rteam rteam--${team}`}>
                      {team === 'ip' ? 'Inpatient desk' : team === 'ins' ? 'Insurance' : 'Nobody'}
                    </span>
                    <b>{label as string}</b>
                    <span className="rsub">{sub as string}</span>
                  </li>
                ))}
              </ol>
              <div className="rfoot warn">
                <span className="st wn"><i />The file is finished after the patient has gone home</span>
              </div>
            </div>

            <div className="lane on">
              <div className="lanehead">
                <span className="t-h2">One admission, on Salvia</span>
                <span className="racechip ok">No handover · no wait · finishes before discharge</span>
              </div>
              <ol className="rtrack">
                {[
                  ['one', 'Admitted', 'The desk sees it as the ward opens it', 0],
                  ['one', 'Evidence lands', 'Rounds, reports and photographs, as they are made', 0.9],
                  ['one', 'Checked', 'Against what this payer needs, on arrival', 1.8],
                  ['one', 'Submitted', 'From the same screen that watched it fill', 2.7],
                ].map(([team, label, sub, d], n) => (
                  <li key={n} className="rstep" style={{ ['--d' as string]: d }}>
                    <span className={`rteam rteam--${team}`}>One desk</span>
                    <b>{label as string}</b>
                    <span className="rsub">{sub as string}</span>
                  </li>
                ))}
                <li className="rspacer" aria-hidden="true" />
              </ol>
              <div className="rfoot ok">
                <span className="st ok"><i />Done while the patient is still in the bed</span>
              </div>
            </div>
          </div>

          <div className="notes3">
            <div><h3>One team, not two</h3><p>The people who admit the patient and the people who work the claim are looking at the same record at the same time.</p></div>
            <div><h3>Queries go to whoever can answer</h3><p>Not into a pile that comes back two days later with the patient already gone.</p></div>
            <div><h3>Fewer people to manage</h3><p>Hospitals told us this was the appeal. Not a bigger desk, a smaller one that does not lose things.</p></div>
          </div>
        </div>
      </section>

      {/* ── §6 the floor at a glance ──────────────────────────────────────── */}
      <section className="s-band s-section">
        <div className="s-wrap">
          <div className="s-split">
            <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '18ch' }}>
              The whole floor, on one screen.
            </h2>
            <p className="s-lede">
              Every admission, every open query and every rupee still with a payer. Your
              insurance head stops asking people for status and starts reading it.
            </p>
          </div>

          <div className="glance movie hl" id="sv-glance" style={{ marginTop: 'var(--space-7)' }}>
            <div className="stats">
              <div><div className="n"><span className="cur">₹</span><span data-count="426">0</span><span className="cur">L</span></div><div className="l">With payers, unsettled</div></div>
              <div><div className="n" data-count="14">0</div><div className="l">In the hospital</div></div>
              <div><div className="n" data-count="3">0</div><div className="l">Queries open, oldest 2 days</div></div>
              <div><div className="n" data-count="9">0</div><div className="l">Files ready to submit</div></div>
            </div>
            <div className="gbody">
              <div className="gpane">
                <div className="t-h2">Money with payers</div>
                <div className="t-meta">By how long it has been there</div>
                <div className="aged">
                  {[
                    ['0 to 7 days', 18.2, 6, 100, false],
                    ['8 to 15 days', 12.4, 4, 68, false],
                    ['16 to 30 days', 7.9, 3, 43, false],
                    ['Over 30 days', 4.1, 2, 23, true],
                  ].map(([label, amt, files, pct, late], n) => (
                    <div className={`age${late ? ' is-late' : ''}`} key={label as string} style={{ ['--i' as string]: n }}>
                      <span className="age-l">{label as string}</span>
                      <span className="age-bar"><i style={{ ['--w' as string]: `${pct}%` }} /></span>
                      <span className="age-v">₹{amt as number}L</span>
                      <span className="age-n">{files as number} files</span>
                    </div>
                  ))}
                </div>
                <p className="age-note">
                  Everything over thirty days was queried at least once. That is the column
                  the desk is trying to empty.
                </p>
              </div>
              <div className="gpane">
                <div className="t-h2">Needs you now</div>
                <div className="t-meta">Oldest first</div>
                <ul className="wlist">
                  {[
                    ['3B-207', 'IP 2026/4471 · Day 4', 'wn', '1 missing'],
                    ['2A-114', 'IP 2026/4468 · Day 2', 'wn', 'Queried'],
                    ['4C-309', 'IP 2026/4455 · Day 6', 'ok', 'Ready'],
                    ['2A-102', 'IP 2026/4473 · Day 1', 'ok', 'Ready'],
                    ['3B-221', 'IP 2026/4462 · Day 3', 'ok', 'Ready'],
                  ].map(([bed, who, tone, label]) => (
                    <li key={bed}>
                      <span className="bd2">{bed}</span>
                      <span className="who">{who}</span>
                      <span className={`st ${tone}`}><i />{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="pz" type="button">Pause</button>
          </div>
        </div>
      </section>

      {/* ── §9 evidence, not endorsement ──────────────────────────────────── */}
      <section className="s-section" id="cost">
        <div className="s-wrap">
          <div className="s-split">
            <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
              A cashless approval is not a promise to pay.
            </h2>
            <p className="s-lede">
              No customer logos yet. What we have is the paperwork you already signed, and
              it says most of the doors close the day the patient goes home.
            </p>
          </div>

          <div className="cites" style={{ marginTop: 'var(--space-7)' }}>
            {CLAUSES.map((c) => (
              <div className="cite" key={c.src}>
                <div>
                  <blockquote>&ldquo;{c.quote}&rdquo;</blockquote>
                  <p className="src" title={c.full}>{c.src}</p>
                </div>
                <p className="means">{c.means}</p>
              </div>
            ))}
          </div>

          <div style={{
            display: 'grid', gap: 'var(--space-5)', marginTop: 'var(--space-7)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}>
            {NUMBERS.map((n) => (
              <div className="s-card" key={n.src}>
                <b style={{
                  display: 'block', fontSize: 'clamp(2.25rem,4.5vw,3rem)', lineHeight: 1,
                  letterSpacing: '-.04em', fontWeight: 700, color: 'var(--accent)',
                }}>{n.big}</b>
                <p style={{ marginTop: 'var(--space-4)' }}>{n.line}</p>
                <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>{n.src}</p>
              </div>
            ))}
            <div className="s-card">
              <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>
                Not all of it is documentation
              </h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Co-pays, sub-limits and non-payable items sit inside that 13.98% and no
                record can change them. Nobody publishes the split by reason, so anyone
                quoting you a documentation percentage is guessing. We claim only the part
                decided by evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── §8 straight answers ────────────────────────────────────────────
          The commitments and the questions were two sections doing one job,
          and the commitments were a ruled list of six long sentences — which
          is the shape of a terms page, not of a position. They are six short
          statements now, and the questions sit under them. */}
      <section className="s-band s-section" id="trust">
        <div className="s-wrap">
          <div className="s-split">
            <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '18ch' }}>
              Straight answers.
            </h2>
            <p className="s-lede">
              What we will not do, and the questions you were going to ask on the call.
              Both are here because every other vendor in this market makes you ask.
            </p>
          </div>

          <div className="nevers">
            {NEVERS.map((n) => (
              <div className="never" key={n.head}>
                <span className="never-k">We never</span>
                <b>{n.head}</b>
                <span>{n.body}</span>
              </div>
            ))}
          </div>

          <div className="faq" style={{ marginTop: 'var(--space-8)' }}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="ans"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── §12 the offer ─────────────────────────────────────────────────── */}
      <section className="s-section sv-closer">
        <div className="s-wrap">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.9rem,4vw,3rem)', maxWidth: '20ch' }}>
            Show us one week of discharged files.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>
            We will sit with your insurance desk for a day, take the last week of files you
            have already closed, and show you what was missing and the exact moment it could
            still have been produced. No slides.
          </p>
          <p style={{ marginTop: 'var(--space-7)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Link className="s-btn s-btn--onDeep" to="/start">Book a demo</Link>
            <Link className="s-btn s-btn--ghostOnDeep" to="/contact-sales">Talk to the founders</Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

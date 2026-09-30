/**
 * One admission, walked end to end. It plays.
 *
 * Deliberately not scroll-driven. Tying the steps to scroll position makes the
 * reader operate the thing rather than watch it, and it hijacks the one
 * interaction a page owes them. This runs on its own clock, pauses when it is
 * off screen, and stops on hover so nothing moves out from under a cursor.
 * The rail underneath is clickable, so anyone who wants to drive can.
 *
 * The frame never moves. Only the data inside it changes, which is the whole
 * argument of the product rendered as a picture rather than a paragraph.
 *
 * No patient name, no age, no sex anywhere. A real screenshot of a claims desk
 * would never carry them, and the desk works by IP number regardless, so the
 * neutral version is also the accurate one.
 */
import { useEffect, useRef, useState } from 'react';

type Ev = { n: string; t: string; state: 'ok' | 'miss' | 'just' };

interface Step {
  step: string;
  title: string;
  line: string;
  /** Evidence rows present at this step, in order. */
  ev: Ev[];
  /** Payer rules panel, once the file has been opened against a policy. */
  rules?: { label: string; state: 'ok' | 'wait' | 'miss' }[];
  notice?: { tone: 'warn' | 'ok' | 'info'; head: string; body: string; btn?: string };
  claim: { state: string; cls: string; clock: string; urgent?: boolean };
  day: string;
  /** How long this beat holds. The two that carry the argument hold longer. */
  hold?: number;
}

const R = (n: string, t: string): Ev => ({ n, t, state: 'ok' });

const STEPS: Step[] = [
  {
    step: 'Step 01',
    title: 'The admission opens',
    line: 'The desk sees the patient the moment the ward does, not when somebody remembers to walk a form down the corridor.',
    day: 'Day 1',
    ev: [R('Admission note', '09:14')],
    claim: { state: 'Awaiting docs', cls: 'pending', clock: 'Pre-auth due in 1h' },
  },
  {
    step: 'Step 02',
    title: 'A file opens against the policy',
    line: 'The payer and the plan are known on day one, so what this claim will need is known on day one too.',
    day: 'Day 1',
    ev: [R('Admission note', '09:14'), R('Pre-authorisation', '09:41')],
    rules: [
      { label: 'Room category within limit', state: 'ok' },
      { label: 'Pre-authorisation inside 1 hour', state: 'ok' },
      { label: 'Implant invoice and sticker', state: 'wait' },
    ],
    claim: { state: 'Submitted', cls: 'submitted', clock: 'Authorised 09:58' },
  },
  {
    step: 'Step 03',
    title: 'Every document is checked as it lands',
    line: 'Not a batch at the end. Each page is measured against what this payer requires for this procedure, the moment it arrives.',
    day: 'Day 2',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41'),
      R('Investigation reports', '11:02'),
    ],
    rules: [
      { label: 'Room category within limit', state: 'ok' },
      { label: 'Pre-authorisation inside 1 hour', state: 'ok' },
      { label: 'Investigations tie to the diagnosis', state: 'ok' },
      { label: 'Implant invoice and sticker', state: 'wait' },
    ],
    claim: { state: 'Submitted', cls: 'submitted', clock: 'Enhancement open' },
  },
  {
    step: 'Step 04',
    title: 'The gap is caught while it can still be filled',
    hold: 4600,
    line: 'The theatre note arrives without its implant sticker. The claim cannot be paid without it, and the patient is still in the bed.',
    day: 'Day 4',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41'),
      R('Investigation reports', '11:02'), R('Operation theatre note', '14:26'),
      { n: 'Implant sticker', t: 'Not received', state: 'miss' },
    ],
    rules: [
      { label: 'Room category within limit', state: 'ok' },
      { label: 'Investigations tie to the diagnosis', state: 'ok' },
      { label: 'Implant invoice and sticker', state: 'miss' },
    ],
    notice: {
      tone: 'warn', head: 'One item missing',
      body: 'The implant sticker is not on the file. Theatre can still send it.',
      btn: 'Ask theatre',
    },
    claim: { state: 'Queried', cls: 'queried', clock: '4h 12m left', urgent: true },
  },
  {
    step: 'Step 05',
    title: 'The question goes to the person who can answer it',
    line: 'Straight to the theatre staff who were in the room, on the phone already in their pocket. Not into a pile that comes back on Friday.',
    day: 'Day 4',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41'),
      R('Investigation reports', '11:02'), R('Operation theatre note', '14:26'),
      { n: 'Implant sticker', t: 'Asked 14:31', state: 'miss' },
    ],
    rules: [
      { label: 'Implant invoice and sticker', state: 'miss' },
    ],
    notice: {
      tone: 'info', head: 'Query sent to theatre',
      body: 'Awaiting a reply. The desk is not holding anything else up while it waits.',
    },
    claim: { state: 'Queried', cls: 'queried', clock: '4h 05m left', urgent: true },
  },
  {
    step: 'Step 06',
    title: 'The ward answers, and the file closes itself',
    hold: 4400,
    line: 'Six minutes. Nobody walked anywhere, nobody scanned anything twice, and nothing on the ward was done differently.',
    day: 'Day 4',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41'),
      R('Investigation reports', '11:02'), R('Operation theatre note', '14:26'),
      { n: 'Implant sticker', t: '14:37', state: 'just' },
    ],
    rules: [
      { label: 'Room category within limit', state: 'ok' },
      { label: 'Investigations tie to the diagnosis', state: 'ok' },
      { label: 'Implant invoice and sticker', state: 'ok' },
    ],
    notice: {
      tone: 'ok', head: 'Answered in 6 minutes',
      body: 'The sticker is on the file, tied to the line it pays for.',
    },
    claim: { state: 'Submitted', cls: 'submitted', clock: 'Cleared 14:37' },
  },
  {
    step: 'Step 07',
    title: 'Complete before the discharge is written',
    line: 'Everything the payer asked for is already on the file. Nothing is being chased, because nothing is missing.',
    day: 'Day 5',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41'),
      R('Investigation reports', '11:02'), R('Operation theatre note', '14:26'),
      R('Implant sticker', '14:37'), R('Daily progress notes', '18:00'),
      R('Discharge summary', '07:50'), R('Final bill', '08:05'),
    ],
    rules: [
      { label: 'Every required document present', state: 'ok' },
      { label: 'Bill lines tie to the record', state: 'ok' },
      { label: 'Nothing on the non-payable list', state: 'ok' },
    ],
    notice: {
      tone: 'ok', head: 'Ready to submit',
      body: 'Eight of eight. The bed can take the next admission.',
      btn: 'Submit claim',
    },
    claim: { state: 'Ready to submit', cls: 'ready', clock: 'Discharge cleared' },
  },
  {
    step: 'Step 08',
    title: 'One screen, one submission',
    hold: 4200,
    line: 'Pre-authorisation, enhancement, the query response and the final claim all left from here. The settlement comes back to the same row.',
    day: 'Closed',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41'),
      R('Investigation reports', '11:02'), R('Operation theatre note', '14:26'),
      R('Implant sticker', '14:37'), R('Daily progress notes', '18:00'),
      R('Discharge summary', '07:50'), R('Final bill', '08:05'),
    ],
    claim: { state: 'Settled', cls: 'settled', clock: 'Paid 10 Sep' },
  },
];

export function DeskSequence() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  /* Only play while it is actually on screen. A loop running in a section
     nobody is looking at is just battery.
     Threshold 0, not 0.3: this block is taller than some viewports, and asking
     for 30% of it to be visible meant it never counted as on screen at all. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (paused || !visible) return;
    const id = setTimeout(
      () => setI((n) => (n + 1) % STEPS.length),
      STEPS[i].hold ?? 3400,
    );
    return () => clearTimeout(id);
  }, [i, paused, visible]);

  const s = STEPS[Math.min(i, STEPS.length - 1)];

  return (
    <div className="sv-movie" ref={wrapRef}>
      <div className="sv-play">
        <div className="sv-frame">
          <div className="appshot hl">
            <div className="side">
              <div className="wm">Salvia</div>
              <a><span className="ic" />Home</a>
              <a className="cur"><span className="ic" />Admissions</a>
              <a><span className="ic" />Patients</a>
              <a><span className="ic" />Outpatients</a>
              <a><span className="ic" />Organisation</a>
            </div>
            <div className="appmain">
              <div className="band">
                <span className="bed sm"><span className="w">Ward 3B</span><span className="b">207</span></span>
                <div style={{ minWidth: 0 }}>
                  <div className="eyebrow">Admissions</div>
                  <div className="t-title">IP 2026/4471</div>
                  <div className="detail">
                    {s.day} · Total knee replacement · Star Health via Medi Assist
                  </div>
                </div>
              </div>
              <div className="appbody">
                <div className="panel">
                  <div className="panel-h">
                    <span className="t-h2">Evidence on this claim</span>
                    <span className="t-meta">{s.ev.length} of 8</span>
                  </div>
                  <div>
                    {s.ev.map((e) => (
                      <div key={e.n} className={`sq${e.state === 'miss' ? ' miss' : e.state === 'just' ? ' just' : ''}`}>
                        <span className="t-bodymed" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.n}</span>
                        <span className="t-meta">{e.state === 'miss' ? '' : e.t}</span>
                        <span className={`st ${e.state === 'miss' ? 'wn' : 'ok'}`}>
                          <i />{e.state === 'miss' ? e.t : 'Received'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 12 }}>
                  {s.notice && (
                    <div className={`sq-note ${s.notice.tone}`}>
                      <div
                        className="t-bodystrong"
                        style={{ color: s.notice.tone === 'warn' ? 'var(--wn)' : s.notice.tone === 'ok' ? 'var(--ok)' : 'var(--ac)' }}
                      >
                        {s.notice.head}
                      </div>
                      <div
                        className="t-meta"
                        style={{ marginTop: 2, color: s.notice.tone === 'warn' ? 'var(--wn)' : s.notice.tone === 'ok' ? 'var(--ok)' : 'var(--ac)' }}
                      >
                        {s.notice.body}
                      </div>
                      {s.notice.btn && <button className="abtn" type="button" style={{ marginTop: 10 }}>{s.notice.btn}</button>}
                    </div>
                  )}

                  {s.rules && (
                    <div className="panel">
                      <div className="panel-h">
                        <span className="t-h2">Payer rules</span>
                        <span className="tag">Star Health</span>
                      </div>
                      {s.rules.map((r) => (
                        <div className="sq-rule" key={r.label}>
                          <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</span>
                          <span className={`st ${r.state === 'ok' ? 'ok' : r.state === 'miss' ? 'wn' : 'nu'}`}>
                            <i />{r.state === 'ok' ? 'Met' : r.state === 'miss' ? 'Not met' : 'Waiting'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="panel">
                    <div className="panel-h"><span className="t-h2">Claim</span></div>
                    <div style={{ padding: '12px 14px' }}>
                      <div className="t-label">Claimed</div>
                      <div className="t-display" style={{ marginTop: 1 }}>₹1,84,200</div>
                      <div style={{
                        marginTop: 11, paddingTop: 10, borderTop: '1px solid var(--ln)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                      }}>
                        <span className={`cs ${s.claim.cls}`}>{s.claim.state}</span>
                        <span className="t-meta" style={s.claim.urgent ? { color: 'var(--bd)', fontWeight: 600 } : undefined}>
                          {s.claim.clock}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sv-below">
          <div className="sv-caps">
            {STEPS.map((st, n) => (
              <div key={st.step} className={`sv-cap${n === i ? ' is-on' : ''}`}>
                <h3>{st.title}</h3>
                <p>{st.line}</p>
              </div>
            ))}
          </div>
          <div className="sv-transport">
            <div
              className="sv-rail"
              role="tablist"
              aria-label="Steps"
              style={{ ['--hold' as string]: paused ? '0ms' : `${STEPS[i].hold ?? 3400}ms` }}
            >
              {STEPS.map((st, n) => (
                <button
                  key={st.step}
                  type="button"
                  role="tab"
                  aria-selected={n === i}
                  aria-label={st.title}
                  className={n === i ? 'now' : n < i ? 'done' : ''}
                  onClick={() => { setI(n); setPaused(true); }}
                >
                  <i />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="sv-playpause"
              aria-pressed={paused}
              onClick={() => setPaused((v) => !v)}
            >
              {paused ? 'Play' : 'Pause'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

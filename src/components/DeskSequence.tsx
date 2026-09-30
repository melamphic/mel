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

type Kind = 'audio' | 'image' | 'pdf' | 'note';
type Ev = { n: string; t: string; state: 'ok' | 'miss' | 'just'; kind: Kind };

/** What a document actually is, at 13px. The desk deals in four things: a
 *  spoken round, a photograph, a report and a typed note — and which one it
 *  is changes how it got there, so the row says so. */
function TypeIcon({ kind }: { kind: Kind }) {
  if (kind === 'audio') {
    return (
      <svg className="ty" viewBox="0 0 14 14" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M2 6v2M5 4v6M8 2.5v9M11 5v4" />
        </g>
      </svg>
    );
  }
  if (kind === 'image') {
    return (
      <svg className="ty" viewBox="0 0 14 14" aria-hidden="true">
        <rect x="1.2" y="2.4" width="11.6" height="9.2" rx="1.4"
          fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="5" cy="6" r="1.1" fill="currentColor" />
        <path d="M2.4 10.4l3-2.8 2.4 2 2-1.6 1.8 2.4" fill="none"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === 'pdf') {
    return (
      <svg className="ty" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M3 1.4h5.2L11.4 4.6v8H3z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M8 1.6v3.2h3.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 8h4M5 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="ty" viewBox="0 0 14 14" aria-hidden="true">
      <rect x="2.2" y="1.8" width="9.6" height="10.4" rx="1.3" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.6 5h4.8M4.6 7.4h4.8M4.6 9.8h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** The thing that just landed, shown as what it is. */
function Artefact({ ev }: { ev: Ev }) {
  return (
    <div className="arte">
      <div className={`arte-vis arte-vis--${ev.kind}`}>
        {ev.kind === 'audio' && (
          <span className="wave">{Array.from({ length: 26 }, (_, n) => <i key={n} style={{ ['--h' as string]: `${18 + ((n * 37) % 70)}%` }} />)}</span>
        )}
        {ev.kind === 'image' && <span className="shot" />}
        {ev.kind === 'pdf' && <span className="page"><i /><i /><i /><i /></span>}
        {ev.kind === 'note' && <span className="page"><i /><i /><i /></span>}
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="t-bodystrong" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.n}</div>
        <div className="t-meta">
          {ev.kind === 'audio' ? 'Spoken at the bedside · 1m 12s'
            : ev.kind === 'image' ? 'Photographed in theatre · 2.1 MB'
            : ev.kind === 'pdf' ? 'Report · 3 pages'
            : 'Typed on the ward'}
        </div>
      </div>
      <span className="st ok"><i />Attached</span>
    </div>
  );
}

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
  /** Which panel this beat is about. Everything else recedes. */
  focus?: 'band' | 'evidence' | 'rules' | 'notice' | 'claim';
  /** What the pointer points at, as a selector inside the frame. Measured
   *  from the live DOM rather than guessed in percentages, so it tracks the
   *  panel it names even as the layout changes between beats.
   *  `click` fires the press ripple, and is only set where a person would
   *  genuinely press something. */
  cursor?: { at: string; label: string; click?: boolean };
}

const R = (n: string, t: string, kind: Kind = 'note'): Ev => ({ n, t, state: 'ok', kind });

const STEPS: Step[] = [
  {
    step: 'Step 01',
    title: 'The admission opens',
    focus: 'band',
    cursor: { at: '.zone--band .t-title', label: 'New admission' },
    line: 'The desk sees the patient the moment the ward does, not when somebody remembers to walk a form down the corridor.',
    day: 'Day 1',
    ev: [R('Admission note', '09:14')],
    claim: { state: 'Awaiting docs', cls: 'pending', clock: 'Pre-auth due in 1h' },
  },
  {
    step: 'Step 02',
    title: 'A file opens against the policy',
    focus: 'rules',
    cursor: { at: '.zone--rules .panel-h', label: 'Policy loaded' },
    line: 'The payer and the plan are known on day one, so what this claim will need is known on day one too.',
    day: 'Day 1',
    ev: [R('Admission note', '09:14'), R('Pre-authorisation', '09:41', 'pdf')],
    rules: [
      { label: 'Room category within limit', state: 'ok' },
      { label: 'Pre-authorisation inside 1 hour', state: 'ok' },
      { label: 'Implant invoice and sticker', state: 'wait' },
    ],
    claim: { state: 'Submitted', cls: 'submitted', clock: 'Authorised 09:58' },
  },
  {
    step: 'Step 04',
    title: 'The gap is caught while it can still be filled',
    focus: 'evidence',
    cursor: { at: '.zone--evidence .sq.miss', label: 'Implant sticker missing' },
    hold: 4600,
    line: 'The theatre note arrives without its implant sticker. The claim cannot be paid without it, and the patient is still in the bed.',
    day: 'Day 4',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41', 'pdf'),
      R('Investigation reports', '11:02', 'pdf'), R('Operation theatre note', '14:26', 'audio'),
      { n: 'Implant sticker', t: 'Not received', state: 'miss', kind: 'image' },
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
    focus: 'notice',
    cursor: { at: '.zone--notice .abtn', label: 'Ask theatre', click: true },
    line: 'Straight to the theatre staff who were in the room, on the phone already in their pocket. Not into a pile that comes back on Friday.',
    day: 'Day 4',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41', 'pdf'),
      R('Investigation reports', '11:02', 'pdf'), R('Operation theatre note', '14:26', 'audio'),
      { n: 'Implant sticker', t: 'Asked 14:31', state: 'miss', kind: 'image' },
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
    focus: 'evidence',
    cursor: { at: '.zone--evidence .sq.just', label: 'Answered in 6 min' },
    hold: 4400,
    line: 'Six minutes. Nobody walked anywhere, nobody scanned anything twice, and nothing on the ward was done differently.',
    day: 'Day 4',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41', 'pdf'),
      R('Investigation reports', '11:02', 'pdf'), R('Operation theatre note', '14:26', 'audio'),
      { n: 'Implant sticker', t: '14:37', state: 'just', kind: 'image' },
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
    title: 'The payer asks. The answer is already on the file.',
    focus: 'notice',
    cursor: { at: '.zone--notice .abtn', label: 'Review and send', click: true },
    hold: 4800,
    line: 'A query lands from the TPA. Salvia finds the two documents on the file that answer it and drafts the reply. It does not press send. A person does.',
    day: 'Day 5',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41', 'pdf'),
      R('Investigation reports', '11:02', 'pdf'), R('Operation theatre note', '14:26', 'audio'),
      R('Implant sticker', '14:37', 'image'), R('Daily progress notes', '18:00', 'audio'),
    ],
    rules: [
      { label: 'Implant invoice on file', state: 'ok' },
      { label: 'Theatre note names the implant', state: 'ok' },
    ],
    notice: {
      tone: 'info', head: 'Query from the TPA',
      body: 'Correlate the implant to the procedure. Two documents already on this file answer it.',
      btn: 'Review and send',
    },
    claim: { state: 'Queried', cls: 'queried', clock: 'Reply drafted' },
  },
  {
    step: 'Step 08',
    title: 'Complete before the discharge is written',
    focus: 'notice',
    cursor: { at: '.zone--notice .abtn', label: 'Submit claim', click: true },
    line: 'Everything the payer asked for is already on the file. Nothing is being chased, because nothing is missing.',
    day: 'Day 5',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41', 'pdf'),
      R('Investigation reports', '11:02', 'pdf'), R('Operation theatre note', '14:26', 'audio'),
      R('Implant sticker', '14:37', 'image'), R('Daily progress notes', '18:00', 'audio'),
      R('Discharge summary', '07:50', 'pdf'), R('Final bill', '08:05', 'pdf'),
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
    step: 'Step 09',
    title: 'One screen, one submission',
    focus: 'claim',
    cursor: { at: '.zone--claim .cs', label: 'Settled' },
    hold: 4200,
    line: 'Pre-authorisation, enhancement, the query response and the final claim all left from here. The settlement comes back to the same row.',
    day: 'Closed',
    ev: [
      R('Admission note', '09:14'), R('Pre-authorisation', '09:41', 'pdf'),
      R('Investigation reports', '11:02', 'pdf'), R('Operation theatre note', '14:26', 'audio'),
      R('Implant sticker', '14:37', 'image'), R('Daily progress notes', '18:00', 'audio'),
      R('Discharge summary', '07:50', 'pdf'), R('Final bill', '08:05', 'pdf'),
    ],
    claim: { state: 'Settled', cls: 'settled', clock: 'Paid 10 Sep' },
  },
];

export function DeskSequence() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  /* Lazy initial value rather than a setState in the effect: with no
     IntersectionObserver (and on the server) it simply starts playing. */
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  /* Only play while it is actually on screen. A loop running in a section
     nobody is looking at is just battery.
     Threshold 0, not 0.3: this block is taller than some viewports, and asking
     for 30% of it to be visible meant it never counted as on screen at all. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
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

  const frameRef = useRef<HTMLDivElement | null>(null);
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null);
  const s = STEPS[Math.min(i, STEPS.length - 1)];
  /* The newest thing on the file, shown as what it actually is. */
  const latest = [...s.ev].reverse().find((e) => e.state !== 'miss');

  /* The frame is fixed, so the list scrolls. Keep the newest row in view —
     the bottom of the list is where the beat is. */
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
    return () => cancelAnimationFrame(id);
  }, [i]);

  /* Find the element this beat is about and sit the pointer on it. Measured
     after a frame so the rows that animate in have their final geometry. */
  useEffect(() => {
    const frame = frameRef.current;
    const want = s.cursor?.at;
    let raf = 0;
    const place = () => {
      if (!frame || !want) { setPt(null); return; }
      const target = frame.querySelector(want);
      if (!target) { setPt(null); return; }
      const f = frame.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      setPt({
        x: t.left - f.left + Math.min(t.width * 0.5, 90),
        y: t.top - f.top + t.height * 0.62,
      });
    };
    raf = requestAnimationFrame(() => { raf = requestAnimationFrame(place); });
    window.addEventListener('resize', place);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', place); };
  }, [i, s.cursor?.at]);

  return (
    <div className="sv-movie" ref={wrapRef}>
      <div className="sv-play">
        <div className="sv-frame" ref={frameRef}>
          <div className="sv-web appshot hl" data-focus={s.focus ?? ''}>
            <div className="side">
              <div className="wm">Salvia</div>
              <a><span className="ic" />Home</a>
              <a className="cur"><span className="ic" />Admissions</a>
              <a><span className="ic" />Patients</a>
              <a><span className="ic" />Outpatients</a>
              <a><span className="ic" />Organisation</a>
            </div>
            <div className="appmain">
              <div className="band zone zone--band">
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
                <div className="panel zone zone--evidence">
                  <div className="panel-h">
                    <span className="t-h2">Evidence on this claim</span>
                    <span className="t-meta">{s.ev.length} of 8</span>
                  </div>
                  {latest && <Artefact ev={latest} key={latest.n} />}
                  <div className="ev-list" ref={listRef}>
                    {s.ev.map((e) => (
                      <div key={e.n} className={`sq${e.state === 'miss' ? ' miss' : e.state === 'just' ? ' just' : ''}`}>
                        <span className="t-bodymed evn"><TypeIcon kind={e.kind} />{e.n}</span>
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
                    <div className={`sq-note zone zone--notice ${s.notice.tone}`}>
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
                    <div className="panel zone zone--rules">
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

                  <div className="panel zone zone--claim">
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

          {s.cursor && pt && (
            <div
              className={`sv-cursor${s.cursor.click ? ' is-click' : ''}`}
              style={{ ['--x' as string]: `${pt.x}px`, ['--y' as string]: `${pt.y}px` }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 12 18" width="15" height="22">
                <path d="M1 1l9.5 8.2-4.3.6 2.5 5.4-2 .9-2.5-5.4-3.2 2.9z"
                  fill="#fff" stroke="#131820" strokeWidth="1.1" strokeLinejoin="round" />
              </svg>
              <span className="sv-bubble">{s.cursor.label}</span>
            </div>
          )}

          <PhoneShot s={s} />
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

/** The same beat as a phone.
 *
 *  Not the desktop screen scaled down. The app's own shell below 900dp is a
 *  short tinted title band, a single column and a bottom tab bar — so a phone
 *  visitor sees the product they would actually hold, not a web layout with
 *  its sidebar switched off. */
function PhoneShot({ s }: { s: Step }) {
  return (
    <div className="sv-phone hl" aria-hidden="true">
      <div className="ph-device">
        <div className="ph-notch" />
        <div className="ph-band">
          <div className="eyebrow">Admissions</div>
          <div className="ph-title">
            <span className="bed sm"><span className="w">3B</span><span className="b">207</span></span>
            <div style={{ minWidth: 0 }}>
              <div className="t-bodystrong">IP 2026/4471</div>
              <div className="t-meta">{s.day} · Star Health</div>
            </div>
          </div>
        </div>

        <div className="ph-body">
          {s.notice && (
            <div className={`sq-note ${s.notice.tone}`} style={{ marginBottom: 10 }}>
              <div
                className="t-bodystrong"
                style={{ color: s.notice.tone === 'warn' ? 'var(--wn)' : s.notice.tone === 'ok' ? 'var(--ok)' : 'var(--ac)' }}
              >
                {s.notice.head}
              </div>
              {s.notice.btn && <button className="abtn" type="button" style={{ marginTop: 8 }}>{s.notice.btn}</button>}
            </div>
          )}

          <div className="panel">
            <div className="panel-h">
              <span className="t-h2">Evidence</span>
              <span className="t-meta">{s.ev.length} of 8</span>
            </div>
            <div>
              {s.ev.slice(-3).map((e) => (
                <div key={e.n} className={`sq ph-sq${e.state === 'miss' ? ' miss' : e.state === 'just' ? ' just' : ''}`}>
                  <span className="t-bodymed evn"><TypeIcon kind={e.kind} />{e.n}</span>
                  <span className={`st ${e.state === 'miss' ? 'wn' : 'ok'}`}>
                    <i />{e.state === 'miss' ? e.t : 'Received'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ marginTop: 10 }}>
            <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span className={`cs ${s.claim.cls}`}>{s.claim.state}</span>
              <span className="t-meta" style={s.claim.urgent ? { color: 'var(--bd)', fontWeight: 600 } : undefined}>
                {s.claim.clock}
              </span>
            </div>
          </div>
        </div>

        <div className="ph-tabs">
          <span>Home</span><span className="on">Admissions</span><span>Patients</span><span>More</span>
        </div>
      </div>
    </div>
  );
}

/**
 * The product, playing.
 *
 * One inpatient claim, followed from the ward to the money: what the payer will
 * ask for, what the surgeon said after theatre, the admission it lands on, what
 * is still missing before discharge, the enhancement, and the file that gets
 * settled. Rebuilt as DOM in the site's own tokens rather than pasted in as
 * screenshots — so it stays sharp, matches the page, and can move.
 *
 * Scenes flagged `soon` show screens that are being built, and say so on the
 * frame itself. The site promises two live stages and three in build; the film
 * keeps the same promise.
 *
 * It plays on a loop and does not stop — no pause on hover, because a film that
 * halts whenever the cursor drifts over it reads as broken. The only thing that
 * stops it is `prefers-reduced-motion`, where the chapters become plain tabs.
 */
import { useEffect, useRef, useState } from 'react';

/* ---- chrome ----------------------------------------------------------- */

const ICONS: Record<string, string> = {
  home: 'M3 7l5-4 5 4v6H3z',
  forms: 'M4 2h8v12H4z M6 5h4 M6 8h4 M6 11h2',
  subjects: 'M8 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M3 14c0-2.5 2.2-4 5-4s5 1.5 5 4',
  notes: 'M8 2v7 M5.5 9a2.5 2.5 0 005 0V4.5a2.5 2.5 0 00-5 0z M3.5 8.5a4.5 4.5 0 009 0',
  compliance: 'M8 2l5 2v4c0 3-2 5-5 6-3-1-5-3-5-6V4z M6 8l1.5 1.5L10.5 6.5',
  policies: 'M3 4h10 M3 8h10 M3 12h6 M11.5 11.5l1.5 1.5',
  incidents: 'M8 2l6 11H2z M8 6.5v3 M8 11h.01',
  reports: 'M3 13V7 M6.5 13V3 M10 13V9 M13.5 13v-4',
  approvals: 'M8 2l5 2v4c0 3-2 5-5 6-3-1-5-3-5-6V4z',
  settings: 'M8 10a2 2 0 100-4 2 2 0 000 4z M8 1.5v1.6 M8 12.9v1.6 M1.5 8h1.6 M12.9 8h1.6',
};

function Ico({ k }: { k: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
         style={{ width: 13, height: 13, flex: 'none' }}>
      {ICONS[k].split(' M').map((d, i) => <path key={i} d={i ? 'M' + d : d} />)}
    </svg>
  );
}

const NAV: Array<[string, string] | string> = [
  ['home', 'Home'],
  'Ward',
  ['subjects', 'Patients'], ['notes', 'Notes'], ['forms', 'Forms'],
  'Claims',
  ['compliance', 'Readiness'], ['policies', 'Policies'], ['reports', 'Claim files'],
  ['approvals', 'Approvals'],
];

const TABS = ['Home', 'Claim readiness', 'Cashless Claim Evidence', 'Ravi Kumar · B-207',
              'OT note — TKR', 'Enhancement · B-207', 'Claim file · B-207'];

function Chrome({ nav, tab, children }: { nav: string; tab: string; children: React.ReactNode }) {
  return (
    <div className="pf-canvas">
      <aside className="pf-side">
        <div className="pf-brand">
          <span className="pf-mark">S</span>
          <span><b>Salvia</b><span>Pensbury Hospital</span></span>
        </div>
        {NAV.map((n, i) =>
          typeof n === 'string'
            ? <div className="pf-group" key={i}>{n}</div>
            : <div className={'pf-nav' + (n[1] === nav ? ' is-on' : '')} key={i}>
                <Ico k={n[0]} />{n[1]}
              </div>
        )}
        <div className="pf-side-foot">
          <div className="pf-nav"><Ico k="settings" />Settings</div>
        </div>
      </aside>

      <div className="pf-main">
        <div className="pf-tabs">
          {TABS.map(t => (
            <div className={'pf-tab' + (t === tab ? ' is-on' : '')} key={t}>
              {t}<span className="pf-x">×</span>
            </div>
          ))}
        </div>
        <div className="pf-body">{children}</div>
      </div>
    </div>
  );
}

/* Small shared pieces, so every scene says "who, what role, when" the same way. */
function Who({ i, who }: { i: string; who: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9.5, color: 'var(--muted)' }}>
      <span style={{
        width: 13, height: 13, borderRadius: '50%', background: 'var(--accent)',
        color: '#fff', display: 'grid', placeItems: 'center', fontSize: 8, fontWeight: 700,
      }}>{i}</span>
      {who}
    </div>
  );
}

/* ---- scene 1 — the payer's rules --------------------------------------- */

/* A payer's evidence requirements, written as clauses. Deliberately the
   obvious ones — anything a billing desk could recite from memory. The mapping
   from a specific insurer and package to a specific clause set is the part
   that does not go on a marketing site. */
const CLAUSES: Array<[string, string, string]> = [
  ['Admission note, timed and authored',
   'You must record the presenting complaint, provisional diagnosis and admitting consultant, with the date and time of admission, authenticated to its author.', 'must'],
  ['Consent naming the procedure performed',
   'You must hold signed informed consent that names the procedure actually performed, dated before the procedure and witnessed.', 'must'],
  ['Intra-procedure photograph',
   'You must capture and attach an intra-procedure image for every package that requires photographic evidence of the procedure being performed.', 'must'],
  ['Implant and high-value drug record',
   'You must record every implant and high-value drug administered, with its batch number and the sticker where one is issued.', 'must'],
  ['Discharge summary with final diagnosis',
   'You should issue a discharge summary carrying the final diagnosis, the procedure performed and the treating consultant, before the patient leaves.', 'should'],
];

function SceneClauses() {
  return (
    <div className="pf-policy">
      <div className="pf-pad" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div>
            <div className="pf-h" style={{ fontSize: 17 }}>Clauses</div>
            <div className="pf-sub">Each clause is one enforceable rule. Parity controls how strictly the check enforces it.</div>
          </div>
          <span className="pf-btn pf-btn--go" style={{ marginLeft: 'auto' }}>+ Add clause</span>
        </div>

        <div className="pf-in">
          {CLAUSES.map(([t, d], i) => (
            <div className="pf-clause" key={t}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span className="n">{i + 1}</span><span className="t">{t}</span>
              </div>
              <div className="d">{d}</div>
              <div style={{ display: 'flex', gap: 5 }} data-tip="Parity decides what the check does. High · must blocks a submission that breaches the clause; medium · should warns; low · try is advisory.">
                <span className="pf-chip pf-chip--stop">High · must</span>
                <span className="pf-chip pf-chip--out">Medium · should</span>
                <span className="pf-chip pf-chip--out">Low · try</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pf-doc" data-tip="The same clauses, rendered as the document the billing desk and the payer read. One source, two outputs — so what the desk believes and what the check enforces can never drift apart.">
        <div style={{ fontSize: 9.5, letterSpacing: '.12em', color: 'var(--muted)', fontWeight: 600 }}>POLICY</div>
        <div className="pf-h" style={{ fontSize: 18, marginTop: 4 }}>
          Cashless Claim Evidence — Network Insurer
        </div>
        <div className="pf-sub">v1.0 · Effective 02 Sep 2026</div>
        <div style={{
          borderLeft: '2px solid var(--accent)', paddingLeft: 9, margin: '10px 0 14px',
          fontSize: 10.5, fontStyle: 'italic', color: 'var(--muted)',
        }}>
          The evidence this insurer requires before it will settle a cashless claim in
          full — checked on the ward while the patient is still admitted, not at the
          desk after the file comes back.
        </div>
        <div className="pf-in">
          {CLAUSES.map(([t, d, p], i) => (
            <div key={t} style={{ display: 'flex', gap: 9, marginBottom: 10 }}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span style={{ fontSize: 8.5, letterSpacing: '.12em', color: 'var(--muted)', fontWeight: 700 }}>
                  {p.toUpperCase()}
                </span>
                <b style={{ display: 'block', fontSize: 11.5, color: 'var(--ink)' }}>{t}</b>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>{d}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- scene 2 — said on the ward ---------------------------------------- */
/* The surgeon's OT note, dictated after theatre. Transcript on the left, what it
   became on the right, so the two are visibly the same act. TRANSCRIPT is
   shared with the phone film: one dictation, one truth.

   The implant is mentioned but its sticker is not attached — that is the gap
   the check catches in the next scenes, so the story has one thread. */
const TRANSCRIPT: Array<[string, string, string?]> = [
  ['Right total knee replacement under spinal, uneventful.', 'Procedure performed'],
  ['Consent was taken yesterday for the right knee, witnessed by Sister Anu.', 'Consent', 'record'],
  ['Tricompartmental osteoarthritis, no intra-operative complications.', 'Findings'],
  ['Cemented posterior-stabilised implant — the sticker is with the theatre nurse.', 'Implant sticker', 'photo'],
  ['Enoxaparin forty once daily for five days, for DVT prophylaxis.', 'Prescription · indication', 'record'],
  ['Mobilise day one, expected discharge day five.', 'Plan'],
];

function SceneCapture() {
  return (
    <div className="pf-cap">
      <div className="pf-pad" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
          <div>
            <div className="pf-h" style={{ fontSize: 17 }}>OT note — Total knee replacement</div>
            <div className="pf-sub">Ravi Kumar · 64 yrs · B-207 · 01:58</div>
          </div>
          <span className="pf-chip pf-chip--stop" style={{ marginLeft: 'auto' }}>Recording</span>
        </div>

        <div className="pf-wave" style={{ height: 34, margin: '0 0 6px' }}>
          {Array.from({ length: 46 }).map((_, i) => (
            <i key={i} style={{ animationDelay: `${(i % 9) * 90}ms` }} />
          ))}
        </div>

        <ol className="pf-tr pf-tr--wide">
          {TRANSCRIPT.map(([line, field, kind], i) => (
            <li key={field} style={{ animationDelay: `${700 + i * 1150}ms` }}>
              <b>{line}</b>
              <em className={kind ? 'is-system' : undefined}>
                → {field}{kind ? <i>{kind}</i> : null}
              </em>
            </li>
          ))}
          <li style={{ animationDelay: `${700 + TRANSCRIPT.length * 1150}ms` }}>
            <span className="pf-caret" />
          </li>
        </ol>
      </div>

      <div className="pf-doc" style={{ padding: '16px 18px' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '.12em', color: 'var(--muted)', fontWeight: 600 }}>
          WHAT IT BECAME
        </div>

        <div style={{ marginTop: 10 }}>
          {[['Procedure performed', 'Right total knee replacement · spinal'],
            ['Findings', 'Tricompartmental OA · no complications'],
            ['Plan', 'Mobilise day 1 · discharge day 5']].map(([k, v]) => (
            <div className="pf-m-field" key={k}><em>{k}</em><b>{v}</b></div>
          ))}
        </div>

        <div style={{ marginTop: 12, display: 'grid', gap: 7 }}>
          <div className="pf-ledger pf-late" data-tip="A consent record, not a sentence — it names the procedure, who took it and who witnessed it, which is what a payer checks it against.">
            <span className="pf-chip pf-chip--ok">Consent</span>
            <b>Right total knee replacement · written</b>
            <em>Dr Menon · witnessed by Sister Anu · 11 Sep</em>
          </div>
          <div className="pf-ledger pf-late2" data-tip="The reason is recorded against the drug, so the drug on the bill has a reason on the chart — the relatedness question a payer asks.">
            <span className="pf-chip pf-chip--ok">Prescription</span>
            <b>Enoxaparin 40 mg · once daily · 5 days</b>
            <em>Indication: DVT prophylaxis after joint replacement</em>
          </div>
          <div className="pf-ledger pf-late3" data-tip="Said, but not yet evidenced. The note mentions the implant; the check will hold it until the sticker's photograph is attached.">
            <span className="pf-chip pf-chip--warn">Implant sticker</span>
            <b>Not attached yet</b>
            <em>Clause 04 needs it · theatre nurse to photograph</em>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- scene 3 — the admission ------------------------------------------- */

function SceneAdmission() {
  return (
    <div className="pf-subject">
      <div className="pf-pad" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <span className="pf-avatar">R</span>
          <span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <b className="pf-h">Ravi Kumar</b>
              <span className="pf-chip pf-chip--ok">ADMITTED</span>
            </span>
            <span className="pf-sub">Male · 64 yrs · B-207 · Surgical ward · day 4 of 5</span>
          </span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <span className="pf-btn">Edit</span>
            <span className="pf-btn pf-btn--go">New note</span>
          </span>
        </div>

        <div className="pf-card" data-tip="Capture straight onto the admission. A consent or a photograph does not need a note to exist first." style={{ display: 'flex', gap: 7, padding: 8, margin: '12px 0' }}>
          {['Note', 'Consent', 'Photo'].map(b => <span className="pf-btn" key={b}>{b}</span>)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 190px', gap: 12 }}>
          <div className="pf-in">
            <div className="pf-card" data-tip="What the insurer agreed to pay, and when. Every later document is read against it — a discharge summary that tells a different story is how an approval moves." style={{ padding: '9px 11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
                <b style={{ color: 'var(--ink)' }}>Pre-authorisation</b>
                <span className="pf-chip pf-chip--ok">APPROVED</span>
              </div>
              {[['Package', 'Total knee replacement, right'],
                ['Authorised', '₹1,20,000 · Network insurer via TPA'],
                ['Approved', '11 Sep · 10:42']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: 8, fontSize: 10.5, marginTop: 6 }}>
                  <span style={{ color: 'var(--muted)', width: 64, flex: 'none' }}>{k}</span>
                  <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{v}</b>
                </div>
              ))}
            </div>

            <div className="pf-card" style={{ padding: '9px 11px', marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 7 }}>
                <b style={{ color: 'var(--ink)' }}>Notes</b>
                <span style={{ color: 'var(--muted)' }}>5</span>
              </div>
              {[['Ward round — day 4', '2026-09-14 · 09:05'],
                ['Ward round — day 3', '2026-09-13 · 09:10'],
                ['OT note — Total knee replacement', '2026-09-12 · 14:02'],
                ['Pre-operative assessment', '2026-09-11 · 17:40'],
                ['Admission note', '2026-09-11 · 08:15']].map(([n, d], i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8, fontSize: 10.5,
                  padding: '5px 0', borderTop: i ? '1px solid var(--line-soft)' : 0,
                }}>
                  <span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>{n}</b>
                    <span style={{ display: 'block', color: 'var(--muted)', fontSize: 10 }}>{d}</span>
                  </span>
                  <span className="pf-chip pf-chip--ok" style={{ marginLeft: 'auto' }}>SUBMITTED</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pf-in">
            <div className="pf-card" style={{ padding: '9px 11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <b style={{ fontSize: 11, color: 'var(--ink)' }}>Consents</b>
                <span className="pf-btn pf-btn--go">+ Capture</span>
              </div>
              <div style={{ display: 'flex', gap: 7, alignItems: 'baseline' }}>
                <b style={{ fontSize: 10.5, color: 'var(--ink)' }}>Right knee replacement</b>
                <span className="pf-chip pf-chip--ok">ACTIVE</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>
                Written · witnessed by Sister Anu · 11 Sep
              </div>
            </div>

            <div className="pf-card" data-tip="Evidence a payer asks for by package, held as photographs on the record they prove — with who took them and when." style={{ padding: '9px 11px', marginTop: 8 }}>
              <b style={{ fontSize: 11, color: 'var(--ink)', display: 'block', marginBottom: 7 }}>Photographs</b>
              {[['Intra-procedure image', 'Attached', 'ok'],
                ['Implant sticker', 'Missing', 'warn']].map(([n, st, k]) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, padding: '4px 0' }}>
                  <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{n}</b>
                  <span className={'pf-chip pf-chip--' + k} style={{ marginLeft: 'auto' }}>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pf-timeline" data-tip="The audit trail. Every entry stamped with who filed it, in what role and at what time — the thing a payer asks you to produce when it disputes the file.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <span style={{ fontSize: 9, letterSpacing: '.1em', color: 'var(--muted)', fontWeight: 600 }}>
            RECENT ACTIVITY
          </span>
          <span className="pf-chip pf-chip--ok">Drafts · 1</span>
        </div>
        <div className="pf-in">
          {[['OT note submitted', 'Sep 12, 2026', true, 'M', 'Dr Menon · Surgeon'],
            ['Consent captured', 'Sep 11, 2026', false, 'M', 'Dr Menon · Surgeon'],
            ['Pre-auth approved · ₹1,20,000', 'Sep 11, 2026', false, 'D', 'Desk · Insurance'],
            ['Admitted · B-207', 'Sep 11, 2026', false, 'D', 'Desk · Insurance']].map(([t, d, isNew, i, who], n) => (
            <div className={'pf-tl' + (isNew ? ' is-new' : '')} key={n}>
              <div style={{ fontSize: 9.5, color: 'var(--muted)' }}>{d as string}</div>
              <b style={{ fontSize: 11, color: 'var(--ink)', display: 'block', margin: '1px 0 4px' }}>
                {t as string}
              </b>
              <Who i={i as string} who={who as string} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- scene 4 — what is still missing ----------------------------------- */

/* The desk view: who is admitted right now, and what the payer will ask for
   that is not in the file yet. Ward and bed rather than names — this is the
   screen a billing desk works down before discharge rounds. */
const REQS: Array<[string, string, number, string]> = [
  ['SURGICAL', 'Surgical ward · 6 admitted', 78, 'top'],
  ['B-204', 'Laparoscopic appendicectomy · day 2', 100, ''],
  ['B-207', 'Total knee replacement · day 4', 60, 'open'],
  ['B-211', 'Laparoscopic cholecystectomy · day 1', 80, ''],
  ['B-216', 'Hernia repair, unilateral · day 3', 100, ''],
  ['MEDICAL', 'Medical ward · 9 admitted', 100, 'top'],
  ['C-102', 'Acute gastroenteritis · day 2', 100, ''],
];

function SceneCoverage() {
  return (
    <div className="pf-pad" style={{ height: '100%', overflow: 'hidden' }}>
      <div className="pf-h">Claim readiness</div>
      <div className="pf-sub">
        Every admitted patient, and what the payer will ask for that is not in the file yet.
      </div>

      <div style={{ display: 'flex', gap: 6, margin: '12px 0 10px' }}>
        {['Overview', 'Activity', 'Queries'].map(t => (
          <span className="pf-chip pf-chip--bare" key={t}>{t}</span>
        ))}
        <span className="pf-chip pf-chip--bare" style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}>
          Admitted
        </span>
        <span className="pf-btn" style={{ marginLeft: 12 }}>All payers ▾</span>
        <span className="pf-chip pf-chip--bare">Discharge rounds · 11:00</span>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }} data-tip="Four states, not a pass mark. Not required means this payer's package does not ask for it — it is shown, and never counted against the file.">
        <span className="pf-chip pf-chip--ok">Evidence held</span>
        <span className="pf-chip pf-chip--warn">Missing</span>
        <span className="pf-chip pf-chip--soon">Awaiting result</span>
        <span className="pf-chip pf-chip--out">Not required</span>
      </div>

      <div className="pf-in" data-tip="Held divided by required. Leaving out what this package does not ask for is why a file can actually reach 100%." style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
        {[['87%', 'Held of required', 'var(--accent)'],
          ['13', 'Ready to file', ''], ['2', 'Missing', ''],
          ['1', 'Awaiting result', ''], ['9', 'Not required', '']].map(([n, l, c], i) => (
          <div className="pf-stat" key={i}>
            <b style={{ color: (c as string) || 'var(--ink)' }}>{n}</b>
            <span style={{ textTransform: 'none', letterSpacing: 0, marginTop: 3, marginBottom: 0 }}>{l}</span>
          </div>
        ))}
      </div>

      <div className="pf-meter" style={{ margin: '10px 0 5px', height: 7 }}>
        <i style={{ width: '52%' }} />
        <i className="w" style={{ width: '8%' }} />
        <i style={{ width: '4%', background: 'hsl(210 50% 52%)' }} />
        <i style={{ width: '36%', background: 'var(--line)' }} />
      </div>
      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 10 }}>
        Readiness = evidence held ÷ (everything this package requires − what it does not
        ask for). Two patients are still on the ward, so both gaps are still fixable.
      </div>

      <div className="pf-card" style={{ overflow: 'hidden' }}>
        {REQS.map(([code, text, pct, kind]) => (
          <div key={code}>
            <div className={'pf-req' + (kind === 'top' ? ' pf-req--top' : '')}>
              <code>{kind === 'top' ? '▾ ' : '› '}{code}</code>
              <span style={{ color: kind === 'top' ? 'var(--ink)' : 'var(--body)' }}>{text}</span>
              <span className="pf-meter"><i style={{ width: pct + '%' }} /></span>
              <span className="pct">{pct}%</span>
            </div>
            {kind === 'open' && (
              <div className="pf-late">
                <div style={{ display: 'flex', gap: 7, alignItems: 'baseline', padding: '6px 10px 0 72px' }}>
                  <span className="pf-chip pf-chip--warn">Missing</span>
                  <b style={{ fontSize: 10.5, color: 'var(--ink)' }}>Implant sticker</b>
                  <span style={{ fontSize: 10.5, color: 'var(--muted)' }}>
                    Batch number and sticker for every implant used in the procedure.
                  </span>
                </div>
                <div className="pf-backing" data-tip="Open a gap and it names the exact field the check reads, who can still fill it, and how long is left before discharge closes the window.">
                  <div><b>Reads:</b> OT note → Implant sticker (photograph)</div>
                  <div style={{ margin: '4px 0' }}>Required by: <kbd>package</kbd> <kbd>payer clause 04</kbd>
                    {' '}· Fillable by theatre staff on the ward</div>
                  <div>Patient is on day 4 of an expected 5-day stay — roughly 26 hours
                    before discharge closes this.</div>
                </div>
                <div style={{ display: 'flex', gap: 7, alignItems: 'baseline', padding: '0 10px 6px 72px' }}>
                  <span className="pf-chip pf-chip--ok">Evidence held</span>
                  <b style={{ fontSize: 10.5, color: 'var(--ink)' }}>Intra-procedure image</b>
                  <span style={{ fontSize: 10.5, color: 'var(--muted)' }}>
                    Captured in theatre, attached to the note, authored and timestamped.
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- scene 5 — the enhancement (in build) ------------------------------ */
/* The bill has outgrown the authorisation and the patient goes home tomorrow.
   Every rupee of the request points at a record that already exists — Salvia
   gathers the reasons, it does not write them. */
const GREW: Array<[string, string, string]> = [
  ['ICU · 1 day', 'Post-operative hypotension — ward round, 13 Sep, Dr Menon', '₹28,000'],
  ['Enoxaparin 40 mg × 5', 'DVT prophylaxis — OT note, 12 Sep', '₹6,900'],
  ['Physiotherapy × 4', 'Mobilisation plan — ward round, 13 Sep', '₹7,500'],
];

function SceneEnhance() {
  return (
    <div className="pf-cap">
      <div className="pf-pad" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
          <div>
            <div className="pf-h" style={{ fontSize: 17 }}>Enhancement · B-207</div>
            <div className="pf-sub">Ravi Kumar · Total knee replacement, right · Network insurer via TPA</div>
          </div>
          <span className="pf-chip pf-chip--warn" style={{ marginLeft: 'auto' }}>Due before discharge</span>
        </div>

        <div className="pf-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[['₹1,20,000', 'Authorised', ''],
            ['₹1,62,400', 'Bill so far', ''],
            ['₹42,400', 'To raise', 'var(--warn)']].map(([n, l, c]) => (
            <div className="pf-stat" key={l}>
              <b style={{ color: c || 'var(--ink)' }}>{n}</b>
              <span style={{ textTransform: 'none', letterSpacing: 0, marginTop: 3, marginBottom: 0 }}>{l}</span>
            </div>
          ))}
        </div>

        <div className="pf-meter" style={{ margin: '10px 0 5px', height: 7 }}>
          <i style={{ width: '74%' }} />
          <i className="w" style={{ width: '26%' }} />
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--body)', marginBottom: 12 }}>
          Discharge is planned for tomorrow at 11:00. <b style={{ color: 'var(--ink)' }}>No
          enhancement is possible after discharge</b> — raised later, this gap is simply unpaid.
        </div>

        <div className="pf-card pf-late" data-tip="Each line points at the record that already justifies it. Salvia gathers them; it does not write the reasons." style={{ padding: '9px 11px' }}>
          <b style={{ fontSize: 11, color: 'var(--ink)', display: 'block', marginBottom: 6 }}>
            Why the bill grew — from the record
          </b>
          {GREW.map(([what, why, amt], i) => (
            <div key={what} style={{
              display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 10.5,
              padding: '5px 0', borderTop: i ? '1px solid var(--line-soft)' : 0,
            }}>
              <span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>{what}</b>
                <span style={{ display: 'block', color: 'var(--muted)', fontSize: 10 }}>{why}</span>
              </span>
              <b className="num" style={{ marginLeft: 'auto', color: 'var(--ink)', fontWeight: 600 }}>{amt}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="pf-doc" style={{ padding: '16px 18px' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '.12em', color: 'var(--muted)', fontWeight: 600 }}>
          WHAT GOES TO THE INSURER
        </div>

        <div style={{ marginTop: 10 }}>
          {[['Request', 'Enhancement · ₹42,400'],
            ['Against', 'Pre-auth approved 11 Sep · ₹1,20,000'],
            ['Attached', 'Ward round 13 Sep · OT note 12 Sep · interim bill']].map(([k, v]) => (
            <div className="pf-m-field" key={k}><em>{k}</em><b>{v}</b></div>
          ))}
        </div>

        <div style={{ marginTop: 12, display: 'grid', gap: 7 }}>
          <div className="pf-ledger pf-late2" data-tip="Timestamped the moment it leaves. If the insurer is slow, the hospital can prove when it asked.">
            <span className="pf-chip pf-chip--soon">Waiting</span>
            <b>Sent to TPA · 14 Sep · 16:32</b>
            <em>A reply is due within 24 hours — silence counts as a denial</em>
          </div>
        </div>

        <div className="pf-m-acts pf-late3" style={{ marginTop: 12 }}>
          <span className="pf-btn">Edit</span>
          <span className="pf-btn pf-btn--go">Send to TPA</span>
        </div>
      </div>
    </div>
  );
}

/* ---- scene 6 — file and settle (in build) ------------------------------ */

const FILE_DOCS: Array<[string, string]> = [
  ['Pre-auth request and approval', '2 pages · original'],
  ['Enhancement approval · ₹42,400', '1 page'],
  ['Consent — right knee replacement', '1 page · original, signed'],
  ['OT note', '2 pages'],
  ['Implant sticker', 'photograph · attached 14 Sep, 16:10'],
  ['Intra-procedure image', 'photograph'],
  ['Discharge summary', '2 pages'],
  ['Final bill · ₹1,62,400', '3 pages'],
];

function SceneClaim() {
  return (
    <div className="pf-cap">
      <div className="pf-pad" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
          <div>
            <div className="pf-h" style={{ fontSize: 17 }}>Claim file · B-207</div>
            <div className="pf-sub">Ravi Kumar · discharged 15 Sep · Network insurer via TPA</div>
          </div>
          <span className="pf-chip pf-chip--ok" style={{ marginLeft: 'auto' }}>Submitted</span>
        </div>

        <div className="pf-card pf-in" data-tip="Built from records that were checked on the ward. The original pages go as they are — never retyped, so nothing in the file can disagree with the record." style={{ padding: '6px 11px' }}>
          {FILE_DOCS.map(([d, m], i) => (
            <div key={d} style={{
              display: 'flex', gap: 8, alignItems: 'center', fontSize: 10.5,
              padding: '5px 0', borderTop: i ? '1px solid var(--line-soft)' : 0,
            }}>
              <span className="pf-chip pf-chip--ok">✓</span>
              <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{d}</b>
              <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: 10 }}>{m}</span>
            </div>
          ))}
        </div>

        <div data-tip="The timestamp is the hospital's proof of when it filed — against the insurer's own deadlines." style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 10 }}>
          Submitted <b style={{ color: 'var(--ink)' }}>15 Sep · 12:04</b> via the TPA portal ·
          14 pages, originals unchanged
        </div>
      </div>

      <div className="pf-doc" style={{ padding: '16px 18px' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '.12em', color: 'var(--muted)', fontWeight: 600 }}>
          AFTER IT LEFT
        </div>

        <div className="pf-card pf-late" style={{ padding: '9px 11px', marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
            <span className="pf-chip pf-chip--warn">Query · 18 Sep</span>
            <b style={{ fontSize: 11, color: 'var(--ink)' }}>Justify ICU stay on 13 Sep</b>
          </div>
          <div className="pf-meter" style={{ margin: '8px 0 4px', height: 6 }}>
            <i className="w" style={{ width: '43%' }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--muted)' }}>4 of 7 working days left to answer</div>
          <div className="pf-m-field" data-tip="The answer is the note written at the time, not a justification written afterwards." style={{ marginTop: 8 }}>
            <em>Answer · ward round, 13 Sep</em>
            <b>BP 86/50 after spinal · moved to ICU for monitoring · Dr Menon</b>
          </div>
        </div>

        <div style={{ marginTop: 10, display: 'grid', gap: 7 }}>
          <div className="pf-ledger pf-late2" data-tip="Every deduction is kept with its reason and fed back into the check, so the next file does not lose the same way.">
            <span className="pf-chip pf-chip--ok">Settled</span>
            <b>₹1,58,900 paid · 26 Sep</b>
            <em>₹3,500 deducted — non-payable consumables (List I) · fed into the next check</em>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   The phone.

   Below the desktop breakpoint the workspace is the wrong thing to show. Salvia
   has two real surfaces — a desktop workspace at 900dp and up, and a mobile
   shell below it — and the mobile one exists to CAPTURE: its bottom bar is
   Home · Notes · mic · Patients · Inbox, with the microphone in the middle.
   Shrinking a five-column admin screen onto a phone would show an interface
   nobody uses, so this shows the one they do.
   ========================================================================== */

const PHONE_TABS: Array<[string, string]> = [
  ['home', 'Home'],
  ['notes', 'Notes'],
  ['subjects', 'Patients'],
  ['incidents', 'Inbox'],
];

function Phone({ title, tab, children }: { title: string; tab: string; children: React.ReactNode }) {
  return (
    <div className="pf-phone">
      <div className="pf-phone-bar">
        <span className="pf-mark" style={{ width: 15, height: 15, fontSize: 9 }}>S</span>
        <b>{title}</b>
        <span className="pf-phone-clinic">Pensbury</span>
      </div>

      <div className="pf-phone-body">{children}</div>

      <div className="pf-phone-nav">
        {PHONE_TABS.slice(0, 2).map(([k, l]) => (
          <span className={'pf-phone-tab' + (l === tab ? ' is-on' : '')} key={l}>
            <Ico k={k} />{l}
          </span>
        ))}
        <span className="pf-phone-mic" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 1.8a2 2 0 0 0-2 2v4a2 2 0 0 0 4 0v-4a2 2 0 0 0-2-2z" />
            <path d="M3.6 7.2a4.4 4.4 0 0 0 8.8 0M8 11.6V14" />
          </svg>
        </span>
        {PHONE_TABS.slice(2).map(([k, l]) => (
          <span className={'pf-phone-tab' + (l === tab ? ' is-on' : '')} key={l}>
            <Ico k={k} />{l}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --- 1. pick a form ----------------------------------------------------- */
function MPickForm() {
  return (
    <div className="pf-m">
      <div className="pf-m-h">New note</div>
      <div className="pf-m-sub">Pick a form to start.</div>
      <div className="pf-m-search">Search forms</div>
      <div className="pf-in" style={{ marginTop: 8 }}>
        {[['OT note', 'v3.0 · 12 fields'],
          ['Ward round — surgical', 'v2.0 · 9 fields'],
          ['Consent — procedure', 'v2.0 · system'],
          ['Pre-operative assessment', 'v1.0 · 10 fields'],
          ['Discharge summary', 'v2.0 · 11 fields'],
          ['Nursing handover', 'v1.0 · 7 fields']].map(([n, m], i) => (
          <div className={'pf-m-row' + (i === 0 ? ' is-on' : '')} key={n}>
            <span><b>{n}</b><em>{m}</em></span>
            <span className="pf-m-chev">›</span>
          </div>
        ))}
      </div>
      <div className="pf-m-foot">Linked to Ravi Kumar · B-207</div>
    </div>
  );
}

/* --- 2. recording ------------------------------------------------------- */
function MRecording() {
  return (
    <div className="pf-m">
      <div className="pf-m-h" style={{ textAlign: 'center' }}>OT note — right TKR</div>
      <div className="pf-m-sub" style={{ textAlign: 'center' }}>Ravi Kumar · B-207</div>

      <div className="pf-rec">
        <div className="pf-wave">
          {Array.from({ length: 22 }).map((_, i) => (
            <i key={i} style={{ animationDelay: `${(i % 9) * 90}ms` }} />
          ))}
        </div>
        <div>
          <div className="pf-m-timer num">01:58</div>
          <div className="pf-m-state"><span className="pf-dot" />Recording</div>
        </div>
      </div>

      {/* The transcript lands as it is spoken, and each line names the field it
          fills — which is the whole difference between a scribe and this. */}
      <ol className="pf-tr">
        {TRANSCRIPT.map(([line, field, kind], i) => (
          <li key={field} style={{ animationDelay: `${800 + i * 1150}ms` }}>
            <b>{line}</b>
            <em className={kind ? 'is-system' : undefined}>
              → {field}{kind ? <i>{kind}</i> : null}
            </em>
          </li>
        ))}
        <li style={{ animationDelay: `${800 + TRANSCRIPT.length * 1150}ms` }}>
          <span className="pf-caret" />
        </li>
      </ol>

      <div className="pf-m-acts">
        <span className="pf-btn">Pause</span>
        <span className="pf-btn pf-btn--go">Review take</span>
      </div>
    </div>
  );
}

/* --- 3. checked before it can be filed ---------------------------------- */
function MChecked() {
  return (
    <div className="pf-m">
      <div className="pf-m-h">Review note</div>
      <div className="pf-m-sub">OT note · 01:58 · draft</div>

      <div className="pf-in" style={{ marginTop: 10 }}>
        {[['Procedure performed', 'Right TKR · spinal'],
          ['Consent', 'Right knee · witnessed'],
          ['Prescriptions', 'Enoxaparin 40 mg · 5 days · DVT prophylaxis']].map(([k, v]) => (
          <div className="pf-m-field" key={k}><em>{k}</em><b>{v}</b></div>
        ))}
      </div>

      <div className="pf-m-check pf-late">
        <div className="pf-m-check-h">
          <span className="pf-chip pf-chip--stop">1 must</span>
          Checked against Cashless Claim Evidence
        </div>
        <div className="pf-m-clause">
          <b>Clause 04 · Implant sticker</b>
          <em>Every implant needs its batch sticker. The note mentions one, but no photograph is attached.</em>
        </div>
      </div>

      <div className="pf-m-acts pf-late2">
        <span className="pf-btn pf-btn--blocked">Submit blocked</span>
        <span className="pf-btn">Attach photo</span>
      </div>
      <div className="pf-m-foot">Or override with a written reason — and the reason becomes evidence.</div>
    </div>
  );
}

/* --- 4. it lands on the admission --------------------------------------- */
function MFiled() {
  return (
    <div className="pf-m">
      <div className="pf-m-h">Ravi Kumar</div>
      <div className="pf-m-sub">Male · 64 yrs · B-207 · day 4 of 5</div>

      <div className="pf-in" style={{ marginTop: 12 }}>
        {[['Implant sticker attached · photograph', 'just now', true, 'A', 'Anu · Nurse · 16:10'],
          ['OT note submitted · right TKR', 'Sep 12', false, 'M', 'Dr Menon · Surgeon · 14:02'],
          ['Consent captured · right knee', 'Sep 11', false, 'M', 'Dr Menon · Surgeon · 18:30']].map(([t, w, isNew, i, who]) => (
          <div className={'pf-tl' + (isNew ? ' is-new' : '')} key={t as string} style={{ paddingLeft: 14 }}>
            <div style={{ fontSize: 9.5, color: 'var(--muted)' }}>{w as string}</div>
            <b style={{ fontSize: 11.5, color: 'var(--ink)', display: 'block', margin: '1px 0 4px' }}>
              {t as string}
            </b>
            <Who i={i as string} who={who as string} />
          </div>
        ))}
      </div>

      <div className="pf-m-foot pf-late">
        Author, role and time on every entry — the thing a payer asks for when it disputes the file.
      </div>
    </div>
  );
}

/* --- 5. what is still missing on the ward -------------------------------- */
function MCoverage() {
  return (
    <div className="pf-m">
      <div className="pf-m-sub" style={{ marginTop: 0 }}>Admitted now · 15 patients · 4 payers</div>

      <div className="pf-m-score pf-late">
        <b className="num">87%</b>
        <span>evidence held of required</span>
      </div>

      <div className="pf-meter" style={{ height: 7, marginTop: 10 }}>
        <i style={{ width: '52%' }} />
        <i className="w" style={{ width: '8%' }} />
        <i style={{ width: '4%', background: 'hsl(210 50% 52%)' }} />
        <i style={{ width: '36%', background: 'var(--line)' }} />
      </div>

      <div className="pf-m-states">
        {[['Ready to file', '13', 'ok'], ['Missing', '2', 'warn'],
          ['Awaiting result', '1', 'soon'], ['Not required', '9', 'out']].map(([l, n, k]) => (
          <div key={l as string}>
            <span className={'pf-chip pf-chip--' + k}>{l as string}</span>
            <b className="num">{n as string}</b>
          </div>
        ))}
      </div>

      <div className="pf-in" style={{ marginTop: 12 }}>
        {[['B-211', 'Consent names a different procedure', 80],
          ['B-216', 'Intra-procedure image not attached', 70],
          ['C-102', 'Discharge summary not issued', 90]].map(([c, t, pct]) => (
          <div className="pf-m-req" key={c as string}>
            <code>{c as string}</code>
            <span>{t as string}</span>
            <span className="pf-meter"><i style={{ width: pct + '%' }} /></span>
          </div>
        ))}
      </div>

      <div className="pf-m-foot">All three are still on the ward. All three are still fixable.</div>
    </div>
  );
}

/* --- 6. the enhancement, on the phone (in build) ------------------------- */
function MEnhance() {
  return (
    <div className="pf-m">
      <div className="pf-m-h">B-207 · enhancement due</div>
      <div className="pf-m-sub">Ravi Kumar · Total knee replacement</div>

      <div className="pf-in" style={{ marginTop: 10 }}>
        {[['Authorised', '₹1,20,000'],
          ['Bill so far', '₹1,62,400'],
          ['To raise', '₹42,400']].map(([k, v]) => (
          <div className="pf-m-field" key={k}><em>{k}</em><b>{v}</b></div>
        ))}
      </div>

      <div className="pf-m-check pf-late">
        <div className="pf-m-check-h">
          <span className="pf-chip pf-chip--warn">Discharge tomorrow 11:00</span>
        </div>
        <div className="pf-m-clause">
          <b>No enhancement is possible after discharge</b>
          <em>ICU day · post-op hypotension (ward round, 13 Sep) · enoxaparin × 5 (OT note) · physio × 4</em>
        </div>
      </div>

      <div className="pf-m-acts pf-late2">
        <span className="pf-btn">Later</span>
        <span className="pf-btn pf-btn--go">Send to desk</span>
      </div>
      <div className="pf-m-foot">Raised with the patient still in the bed — not found at the desk a week later.</div>
    </div>
  );
}


const PHONE_SCENES = [
  {
    chapter: 'Pick a form', blurb: 'Your paperwork, on the ward',
    title: 'Notes', tab: 'Notes', dur: 8000,
    render: () => <MPickForm />,
    caption: <>It starts on the phone, because that is where care happens. The form is
      <b> your form</b> — the OT note, the ward round, the consent — already linked to the
      patient in the bed.</>,
  },
  {
    chapter: 'Speak', blurb: 'Any language, typed records',
    title: 'Notes', tab: 'Notes', dur: 12000,
    render: () => <MRecording />,
    caption: <>The surgeon speaks after theatre, the way they would to a colleague. Each
      line lands against the field it belongs in — and <b>the consent and the prescription
      become records of their own</b>, with the reason for the drug written on it.</>,
  },
  {
    chapter: 'Checked', blurb: 'Before it can be filed',
    title: 'Notes', tab: 'Notes', dur: 10000,
    render: () => <MChecked />,
    caption: <>Before it files, the note is checked against what the payer will ask for.
      The implant was mentioned but its sticker is not attached, so <b>the submission is
      blocked</b> — while the patient is still here and the nurse can still photograph it.</>,
  },
  {
    chapter: 'Filed', blurb: 'Attributed and timestamped',
    title: 'Patients', tab: 'Patients', dur: 9000,
    render: () => <MFiled />,
    caption: <>The sticker goes on, and it lands on the admission with everything else.
      <b> Author, role and time on every entry</b> — the thing a payer asks you to produce
      when it disputes the file.</>,
  },
  {
    chapter: 'Readiness', blurb: 'What is still missing',
    title: 'Readiness', tab: 'Home', dur: 10000,
    render: () => <MCoverage />,
    caption: <>Every admitted patient, on the same phone. <b>What is missing is named while
      it can still be fixed</b> — not found by the desk a week after discharge.</>,
  },
  {
    chapter: 'Enhance', blurb: 'In build — before discharge', soon: true,
    title: 'Enhancement', tab: 'Inbox', dur: 10000,
    render: () => <MEnhance />,
    caption: <>When the bill outgrows the authorisation, the desk hears about it with the
      patient still admitted — <b>because no enhancement is possible after
      discharge</b>.</>,
  },
];

/* ---- the film ---------------------------------------------------------- */

/* The order is the story, and the story is one admission in the order the money
   moves: what the payer will ask for, what was said on the ward, the admission
   it lands on, what is still missing before discharge, the enhancement, and
   the file that gets settled. The last two are in build and say so. */
const DESKTOP_SCENES = [
  {
    chapter: 'The payer’s rules', hint: 'Hover a clause, a parity chip, or the rendered document.', blurb: 'What this insurer will ask for',
    nav: 'Policies', tab: 'Cashless Claim Evidence', dur: 10000,
    render: () => <SceneClauses />,
    caption: <>It starts with what the payer will ask for, written as clauses — the consent
      that names the procedure, the photograph, the implant sticker. <b>High · must blocks a
      note that breaches one</b>; medium · should warns. When a payer changes what it asks
      for, you change the clause, not the workflow.</>,
  },
  {
    chapter: 'Said on the ward', hint: 'Hover the transcript, or what it became on the right.',
    blurb: 'One dictation, typed records',
    nav: 'Notes', tab: 'OT note — TKR', dur: 13000,
    render: () => <SceneCapture />,
    caption: <>The surgeon dictates the OT note after theatre. Each line lands against the
      field it belongs in — <b>the consent and the prescription become records of their
      own</b>, and the drug carries its reason. The implant was mentioned, but its sticker
      is not attached yet.</>,
  },
  {
    chapter: 'The admission', hint: 'Hover the pre-authorisation, the photographs, or the timeline.', blurb: 'One patient, one file',
    nav: 'Patients', tab: 'Ravi Kumar · B-207', dur: 11000,
    render: () => <SceneAdmission />,
    caption: <>Everything lands on the admission, next to what the insurer authorised.
      <b> Every entry carries who filed it, in what role, at what time</b> — which is exactly
      what gets asked for when a payer disputes the file.</>,
  },
  {
    chapter: 'What is still missing', hint: 'Hover the four states, the score, or an open gap.', blurb: 'The desk view, before discharge',
    nav: 'Readiness', tab: 'Claim readiness', dur: 11500,
    render: () => <SceneCoverage />,
    caption: <>Every admitted patient, and what their payer&rsquo;s package will ask for
      that is not in the file yet. Open B-207 and it names the missing implant sticker,
      <b> who on the ward can still attach it, and how long is left before
      discharge</b>.</>,
  },
  {
    chapter: 'Raise the enhancement', hint: 'Hover the reasons, or what goes to the insurer.', blurb: 'In build — before discharge', soon: true,
    nav: 'Claim files', tab: 'Enhancement · B-207', dur: 11000,
    render: () => <SceneEnhance />,
    caption: <>The bill has outgrown the authorisation, and the patient goes home tomorrow.
      <b> No enhancement is possible after discharge</b>, so it is raised now — with every
      rupee pointed at the record that already justifies it.</>,
  },
  {
    chapter: 'File and settle', hint: 'Hover the documents, the query, or the settlement.', blurb: 'In build — to the money', soon: true,
    nav: 'Claim files', tab: 'Claim file · B-207', dur: 12000,
    render: () => <SceneClaim />,
    caption: <>The file is built from records that were checked on the ward, with the
      original pages attached unchanged. A query arrives with its deadline counting,
      <b> and the answer is the note written at the time</b>. Every deduction feeds the
      next check.</>,
  },
];

/** Which surface to show. Not a CSS decision: the two films have different
 *  scenes, different counts and different captions. */
function usePhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 899px)');
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return phone;
}

export default function ProductFilm() {
  const phone = usePhone();
  const SCENES = phone ? PHONE_SCENES : DESKTOP_SCENES;
  const [i, setI] = useState(0);
  const [hot, setHot] = useState(false);
  const [tip, setTip] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const s = SCENES[i];

  /* CSS cannot derive a unitless scale from a container width, so the frame
     measures itself. One observer, one custom property, no re-render. */
  useEffect(() => { setI(0); }, [phone]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      el.style.setProperty('--pf-scale', String(entry.contentRect.width / 1000));
    });
    if (phone) return () => ro.disconnect();
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* The film runs on a timer rather than on the progress bar's `animationend`:
     a bar scrolled off-screen or sitting in a background tab can be throttled,
     and the one thing this must do is keep playing. Clicking a chapter restarts
     the clock, because `i` moves. */
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setI((p) => (p + 1) % SCENES.length), s.dur);
    return () => clearTimeout(t);
  }, [i, s.dur, paused]);

  /* Hotspots are read by delegation on pointerover, which fires only when the
     target actually changes — no per-move work, no layout reads. */
  const onOver = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = (e.target as Element).closest?.('[data-tip]');
    setTip(el?.getAttribute('data-tip') ?? null);
  };

  return (
    <div className={'pf' + (phone ? ' is-phone' : '')} style={{ '--pf-dur': s.dur + 'ms' } as React.CSSProperties}>
      <div
        ref={stage}
        className={'pf-stage' + (hot ? ' is-hot' : '')}
        onPointerEnter={() => setHot(true)}
        onPointerLeave={() => { setHot(false); setTip(null); }}
        onPointerOver={onOver}
      >
        {phone
          ? <Phone key={i} title={(s as typeof PHONE_SCENES[number]).title} tab={s.tab}>{s.render()}</Phone>
          : <Chrome key={i} nav={(s as typeof DESKTOP_SCENES[number]).nav} tab={s.tab}>{s.render()}</Chrome>}

        {/* A screen that is not shipped says so on the screen, not only in the
            caption — the same promise the arc section makes. */}
        {s.soon ? (
          <span className="pf-chip pf-chip--soon pf-soon">In build</span>
        ) : null}

        {/* Glass control bar. Docked rather than cursor-following, so the pause
            control is something you can actually hit. */}
        <div className="pf-glass">
          <button
            type="button"
            className="pf-play"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? 'Play' : 'Pause'}
          >
            {paused
              ? <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7-4.5z" /></svg>
              : <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.2 1.5h2v9h-2z M6.8 1.5h2v9h-2z" /></svg>}
          </button>
          <p key={tip ?? s.chapter}>{tip ?? ('hint' in s ? s.hint : s.blurb)}</p>
          <span className="pf-count">{i + 1}/{SCENES.length}</span>
        </div>
      </div>

      <p className="pf-caption" key={i}>{s.caption}</p>

      <div className="pf-chapters">
        {SCENES.map((c, n) => (
          <button
            key={c.chapter}
            type="button"
            className={'pf-chapter' + (paused ? ' is-held' : '')}
            aria-current={n === i}
            onClick={() => setI(n)}
          >
            <span className="pf-step">{n + 1}</span>
            <b>{c.chapter}</b>
            <em>{c.blurb}</em>
          </button>
        ))}
      </div>
    </div>
  );
}

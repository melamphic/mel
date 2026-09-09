/**
 * The product, playing.
 *
 * Five real screens from Salvia, rebuilt as DOM in the site's own tokens
 * rather than pasted in as screenshots — so they stay sharp, match the page,
 * and can move. Every label here is verbatim from the app.
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
  copilot: 'M8 2l1.6 3.9L13.5 7 9.6 8.6 8 12.5 6.4 8.6 2.5 7l3.9-1.1z',
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
  'Care',
  ['forms', 'Forms'], ['subjects', 'Subjects'], ['notes', 'Notes'],
  'Claims',
  ['compliance', 'Claims'], ['copilot', 'Copilot'], ['policies', 'Policies'],
  ['incidents', 'Incidents'], ['reports', 'Reports'], ['approvals', 'Approvals'],
];

const TABS = ['Home', 'Claim readiness', 'Team', 'All policies', 'Copilot', 'Incidents',
              'Reports', 'Patients', 'All forms', 'General OPD Consultation',
              'Cashless Claim Evidence'];

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

/* ---- scene 1 — the form ------------------------------------------------ */

const PALETTE: Array<[string, string]> = [
  ['TEXT', ''], ['', 'Short text'], ['', 'Paragraph'],
  ['CHOICE', ''], ['', 'Single choice'], ['', 'Multiple choice'], ['', 'Button group'],
  ['', 'Radio'], ['', 'Yes / No'],
  ['NUMBERS', ''], ['', 'Number'], ['', 'Decimal'], ['', 'Slider'], ['', 'Percentage'],
  ['OTHER', ''], ['', 'Date picker'], ['', 'Signature'],
  ['SYSTEM', ''], ['✦', 'Consent'], ['✦', 'Prescription'], ['✦', 'Incident'], ['✦', 'Pain score'],
  ['LAYOUT', ''], ['', 'Section heading'], ['', 'Divider'],
];

const FIELDS: Array<[string, string, boolean | null]> = [
  ['Clinical Assessment', '', null],
  ['Presenting complaint', 'Paragraph', true],
  ['History of presenting illness', 'Paragraph', true],
  ['Vitals', '', null],
  ['Temperature (C)', 'Decimal', false],
  ['Heart Rate (bpm)', 'Number', false],
  ['Blood Pressure (mmHg)', 'Short text', false],
  ['Examination & Assessment', '', null],
  ['Examination findings', 'Paragraph', true],
  ['Diagnosis', 'Paragraph', true],
  ['Management Plan', '', null],
  ['Prescriptions', 'Prescription', true],
  ['Follow-up interval', 'Single choice', false],
  ['Consent to treatment', 'Consent', true],
];

function SceneForm() {
  return (
    <div className="pf-form">
      <div className="pf-palette" data-tip="Every field type the builder offers. The four under SYSTEM aren't text — they write a consent, a prescription, an incident or a pain score into the record.">
        {PALETTE.map(([g, t], i) =>
          t
            ? <div className="pf-ptype" key={i}><b>{g || '·'}</b>{t}</div>
            : <div className="pf-group" key={i} style={{ padding: '9px 4px 3px' }}>{g}</div>
        )}
      </div>

      <div className="pf-fields">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span className="pf-chip pf-chip--bare">v1.0</span>
          <span className="pf-chip pf-chip--ok">Basics</span>
          <span style={{ color: 'var(--faint)' }}>—</span>
          <span className="pf-chip pf-chip--bare" style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}>2 Fields</span>
          <span style={{ color: 'var(--faint)' }}>—</span>
          <span className="pf-chip pf-chip--bare">3 Review &amp; Publish</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--accent)' }}>✓ Saved</span>
        </div>

        <div className="pf-card" data-tip="The model drafts the form; a person reviews and publishes it. Nothing goes live unread." style={{
          background: 'var(--accent-soft)', borderColor: 'var(--accent-line)',
          padding: '7px 10px', marginBottom: 10,
        }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--accent)' }}>
            ✦ AI drafted — review before publishing
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>
            Drafted with gemini-3.1-flash-lite · 1 auto-correction
          </div>
        </div>

        <div className="pf-in">
          {FIELDS.map(([name, type, req]) => req === null ? (
            <div className="pf-frow pf-frow--head" key={name}>{name}</div>
          ) : (
            <div className="pf-frow" key={name} data-tip={type === 'Prescription' || type === 'Consent' ? `A system field. This one writes a real ${type.toLowerCase()} record, which is what a payer's clause can actually be checked against.` : `A ${type.toLowerCase()} field${req ? ', required before the note can be submitted' : ''}.`}>
              <span className="pf-grab">⠿</span>
              {name}
              <span className="pf-type">{type} · Required</span>
              <span className={'pf-toggle' + (req ? ' is-on' : '')} />
            </div>
          ))}
        </div>
      </div>

      <div className="pf-preview" data-tip="The PDF that actually gets filed, rendering as you build. Header, footer and watermark come from the hospital's own document theme.">
        <div className="pf-paper">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <b style={{ color: 'var(--ink)' }}>Pensbury Hospital</b>
            <span style={{ color: 'var(--muted)' }}>General OPD Consultation</span>
          </div>
          <div style={{ borderTop: '1px solid var(--line)', margin: '7px 0' }} />
          <div style={{ display: 'flex', gap: 8, color: 'var(--muted)' }}>
            <b style={{ color: 'var(--ink)' }}>Sample Patient</b><span>23 yrs · Female</span>
          </div>
          <div className="pf-late">
            <div className="band">CLINICAL ASSESSMENT</div>
            <div className="r" /><div className="r" style={{ width: '80%' }} />
            <div className="r" /><div className="r" style={{ width: '62%' }} />
          </div>
          <div className="pf-late2">
            <div className="band">VITALS</div>
            <div className="r" style={{ width: '55%' }} /><div className="r" style={{ width: '48%' }} />
          </div>
          <div className="pf-late3">
            <div className="band">MANAGEMENT PLAN</div>
            <div className="r" /><div className="r" style={{ width: '70%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- scene 2 — the policy ---------------------------------------------- */

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

/* ---- scene: capture ----------------------------------------------------- */
/* The desktop has capture too — it opens as a tab, not a modal. Transcript on
   the left, what it became on the right, so the two are visibly the same act.
   TRANSCRIPT is shared with the phone film: one dictation, one truth. */
function SceneCapture() {
  return (
    <div className="pf-cap">
      <div className="pf-pad" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
          <div>
            <div className="pf-h" style={{ fontSize: 17 }}>General OPD Consultation</div>
            <div className="pf-sub">John · 23 yrs · 02:41</div>
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
          {[['Presenting complaint', 'Fever, cold, cough · 3 days'],
            ['History', 'No family affected · temp 99'],
            ['Examination findings', 'Chest clear, breath sounds normal']].map(([k, v]) => (
            <div className="pf-m-field" key={k}><em>{k}</em><b>{v}</b></div>
          ))}
        </div>

        <div style={{ marginTop: 12, display: 'grid', gap: 7 }}>
          <div className="pf-ledger pf-late" data-tip="A consent record, not a sentence — it carries the scope, who took it, and when it expires.">
            <span className="pf-chip pf-chip--ok">Consent</span>
            <b>Audio recording · verbal, on the ward</b>
            <em>Ram · Staff · expires 03 Sep 2027</em>
          </div>
          <div className="pf-ledger pf-late2" data-tip="An incident opened from the same dictation, with its own number, its own workflow and its own approval.">
            <span className="pf-chip pf-chip--warn">Incident</span>
            <b>Fall in corridor · no injury · family informed</b>
            <em>INC-0412 · awaiting approval</em>
          </div>
          <div className="pf-ledger pf-late3" data-tip="A prescription the drug register can count, rather than free text inside a paragraph.">
            <span className="pf-chip pf-chip--ok">Prescription</span>
            <b>Dolo 650 mg · 0-0-1 · 4 days</b>
            <em>Viral fever</em>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- scene 3 — the subject --------------------------------------------- */

function SceneSubject() {
  return (
    <div className="pf-subject">
      <div className="pf-pad" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <span className="pf-avatar">J</span>
          <span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <b className="pf-h">John</b>
              <span className="pf-chip pf-chip--ok">ACTIVE</span>
            </span>
            <span className="pf-sub">Male · 23 yrs 3 mos · Born May 20, 2003</span>
          </span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <span className="pf-btn">Edit</span>
            <span className="pf-btn pf-btn--go">New note</span>
          </span>
        </div>

        <div className="pf-card" data-tip="Capture straight onto the patient. A consent or an incident does not need a consultation to exist first." style={{ display: 'flex', gap: 7, padding: 8, margin: '12px 0' }}>
          {['Note', 'Incident', 'Consent', 'Pain'].map(b => <span className="pf-btn" key={b}>{b}</span>)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 190px', gap: 12 }}>
          <div className="pf-in">
            <div className="pf-card" style={{ padding: '9px 11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <b style={{ color: 'var(--ink)' }}>Last note</b>
                <span style={{ color: 'var(--muted)' }}>Aug 23 · 6:10 PM</span>
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--muted)', margin: '6px 0 7px' }}>
                Fever, cold, chest pain, and cough. Symptoms present for two to three days.
                No other family members affected. Temperature 99 degrees. Viral fever.
                Dolo 650 mg (Tablet): 0-0-1 · 4 days
              </div>
              <span className="pf-chip pf-chip--ok">SUBMITTED</span>
              <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 7 }}>By staff · tap to open</span>
            </div>

            <div className="pf-card" style={{ padding: '9px 11px', marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 7 }}>
                <b style={{ color: 'var(--ink)' }}>All notes</b>
                <span style={{ color: 'var(--muted)' }}>20</span>
              </div>
              {[['General OPD Consultation v1.0', '2026-08-23 · 18:10'],
                ['General OPD Consultation v1.0', '2026-08-23 · 18:07'],
                ['General OPD Consultation v4.0', '2026-08-10 · 18:19'],
                ['General OPD Consultation v4.0', '2026-08-10 · 18:17'],
                ['General OPD Consultation v3.0', '2026-08-10 · 18:11'],
                ['General OPD Consultation v3.0', '2026-08-10 · 18:04'],
                ['General OPD Consultation v3.0', '2026-07-29 · 11:52']].map(([n, d], i) => (
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
            <div className="pf-card" data-tip="Pain is a typed widget, not a sentence — so it trends over thirty days instead of being re-read one note at a time." style={{ padding: '9px 11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <b style={{ fontSize: 11, color: 'var(--ink)' }}>Pain</b>
                <span className="pf-btn pf-btn--go">+ Score</span>
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <div className="pf-stat"><span>Latest</span><b>3<s> / 10</s></b></div>
                <div className="pf-stat"><span>Avg · 30d</span><b>3.0<s> / 10</s></b></div>
              </div>
              <div style={{ marginTop: 8 }}>
                {[['3', 'FLACC · Manual', '2026-08-04 · 21:06'],
                  ['4', 'FLACC · Manual', '2026-07-17 · 13:49']].map(([s, k, d], i) => (
                  <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'center', padding: '4px 0', fontSize: 10 }}>
                    <span style={{
                      width: 16, height: 16, borderRadius: 4, flex: 'none',
                      background: i ? 'var(--warn)' : 'var(--accent)', color: '#fff',
                      display: 'grid', placeItems: 'center', fontWeight: 700,
                    }}>{s}</span>
                    <span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>{k}</b>
                      <span style={{ display: 'block', color: 'var(--muted)' }}>{d}</span></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pf-card" style={{ padding: '9px 11px', marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <b style={{ fontSize: 11, color: 'var(--ink)' }}>Consents</b>
                <span className="pf-btn pf-btn--go">+ Capture</span>
              </div>
              <div style={{ display: 'flex', gap: 7, alignItems: 'baseline' }}>
                <b style={{ fontSize: 10.5, color: 'var(--ink)' }}>Audio recording</b>
                <span className="pf-chip pf-chip--ok">ACTIVE</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>
                Verbal — on the ward · exp Aug 10, 2027
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pf-timeline" data-tip="The audit trail. Every entry stamped with who filed it, in what role and at what time — the thing a payer asks you to produce when it disputes the file.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <span style={{ fontSize: 9, letterSpacing: '.1em', color: 'var(--muted)', fontWeight: 600 }}>
            RECENT ACTIVITY
          </span>
          <span className="pf-chip pf-chip--ok">Drafts · 2</span>
        </div>
        <div className="pf-in">
          {[['Consent captured', 'Aug 10, 2026', true],
            ['Pain recorded · 3 / 10 · FLACC', 'Aug 4, 2026', false],
            ['Note submitted · General OPD', 'Aug 4, 2026', false],
            ['Consent captured', 'Jul 24, 2026', false]].map(([t, d, isNew], i) => (
            <div className={'pf-tl' + (isNew ? ' is-new' : '')} key={i}>
              <div style={{ fontSize: 9.5, color: 'var(--muted)' }}>{d as string}</div>
              <b style={{ fontSize: 11, color: 'var(--ink)', display: 'block', margin: '1px 0 4px' }}>
                {t as string}
              </b>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9.5, color: 'var(--muted)' }}>
                <span style={{
                  width: 13, height: 13, borderRadius: '50%', background: 'var(--accent)',
                  color: '#fff', display: 'grid', placeItems: 'center', fontSize: 8, fontWeight: 700,
                }}>R</span>
                Ram · Staff
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- scene 4 — coverage ------------------------------------------------ */

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

      <div className="pf-in" data-tip="Held divided by required. Excluding what this package does not ask for is why a file can actually reach 100% rather than chasing a number it can never hit." style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
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
                  <div><b>Reads:</b> system.implant / system.drug_op</div>
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

/* ---- scene 5 — the copilot --------------------------------------------- */

function SceneCopilot() {
  return (
    <div className="pf-copilot">
      <div className="pf-chats">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9 }}>
          <b style={{ fontSize: 11.5, color: 'var(--ink)' }}>Chats</b>
          <span style={{ fontSize: 10.5, color: 'var(--accent)', fontWeight: 600 }}>+ New</span>
        </div>
        {[['which deductions last quarter were about something we never wr…', 'just now'],
          ['What is Star asking for that we do not capture?', '17h ago']].map(([t, d], i) => (
          <div key={i} style={{ marginBottom: 9 }}>
            <div style={{ fontSize: 10.5, color: 'var(--ink)', lineHeight: 1.4 }}>{t}</div>
            <div style={{ fontSize: 9.5, color: 'var(--faint)' }}>{d}</div>
          </div>
        ))}
      </div>

      <div className="pf-thread" style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span className="pf-mark" style={{ width: 19, height: 19 }}>✦</span>
            <span>
              <b style={{ fontSize: 12.5, color: 'var(--ink)' }}>Claims Copilot</b>
              <span style={{ display: 'block', fontSize: 10, color: 'var(--muted)' }}>
                Grounded only in your data · you confirm every change
              </span>
            </span>
          </div>
        </div>

        <div className="pf-in" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="pf-said">what are we missing most often ?</div>
          <div className="pf-tool" data-tip="The copilot's actual tool calls, shown as it makes them. It reads what you hold; it has no other source."><b>✓</b> Read <kbd>list_policies</kbd></div>
          <div className="pf-tool" data-tip="The copilot's actual tool calls, shown as it makes them. It reads what you hold; it has no other source."><b>✓</b> Read <kbd>list_deductions</kbd></div>
          <div style={{ fontSize: 11, color: 'var(--body)' }}>
            Across the deductions you have loaded, the same gap comes back more than any
            other: the implant batch record. Your evidence policy asks for it, but no form
            captures it as a field, so it is being written into free text where the check
            cannot read it — and the payer cannot either.
          </div>
          <div className="pf-card" style={{ padding: '8px 10px' }}>
            <b style={{ fontSize: 11, color: 'var(--ink)' }}>• Gap found</b>
            <div style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 3 }}>
              Clause 04 of Cashless Claim Evidence has no field backing it on the theatre
              form. Nothing can satisfy it as things stand.
            </div>
          </div>
          <div className="pf-said">Add the field</div>
        </div>

        <div className="pf-late2">
          <div className="pf-tool" style={{ marginBottom: 6 }}>
            <b>✦</b> Prepared <kbd>propose_add_field</kbd>
          </div>
          <div className="pf-card pf-approve" data-tip="Nothing is written until you approve. When you do, it runs under your permissions and the change carries your name." style={{ padding: '9px 11px', borderColor: 'var(--accent-line)' }}>
            <b style={{ fontSize: 11.5, color: 'var(--ink)' }}>
              ✦ Add "Implant batch and sticker" to the theatre form (as a draft)
            </b>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontStyle: 'italic', margin: '4px 0 8px' }}>
              The copilot never writes a record — approving runs this under your permissions.
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="pf-btn pf-btn--go">Approve</span>
              <span className="pf-btn">Edit</span>
              <span className="pf-btn">Cancel</span>
            </div>
          </div>
        </div>

        <div className="pf-late3" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Backfill the open admissions', 'Link it to clause 04', 'Show the next most-missed gap']
            .map(c => <span className="pf-chip pf-chip--ok pf-chip--bare" key={c}>{c}</span>)}
        </div>
      </div>

      <div className="pf-panel" data-tip="What you tell it once about your hospital, read into every chat — so you are not re-explaining who you are each time.">
        <b style={{ fontSize: 10.5, color: 'var(--ink)', display: 'block', marginBottom: 5 }}>Goals</b>
        <div style={{ color: 'var(--muted)' }}>
          No goals yet. Ask the copilot for a plan and it can track the steps here.
        </div>
        <div style={{ borderTop: '1px solid var(--line)', margin: '12px 0' }} />
        <b style={{ fontSize: 10.5, color: 'var(--ink)', display: 'block', marginBottom: 5 }}>About this hospital</b>
        <div style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
          Tell the copilot about your hospital — your departments, your payers, the packages
          you do most. It reads this in every chat.
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
        {[['General OPD Consultation', 'v4.0 · 14 fields'],
          ['Consent — procedure', 'v2.0 · system'],
          ['Incident report', 'v1.0 · system'],
          ['Wound review', 'v1.0 · 8 fields'],
          ['Pain score', 'v1.0 · system'],
          ['Discharge summary', 'v2.0 · 11 fields'],
          ['Follow-up review', 'v1.0 · 6 fields']].map(([n, m], i) => (
          <div className={'pf-m-row' + (i === 0 ? ' is-on' : '')} key={n}>
            <span><b>{n}</b><em>{m}</em></span>
            <span className="pf-m-chev">›</span>
          </div>
        ))}
      </div>
      <div className="pf-m-foot">Link a patient · optional</div>
    </div>
  );
}

/* --- 2. recording ------------------------------------------------------- */
/* One dictation, six landings — and two of them are not text at all. A consent
   and an incident become records in their own right, which is the whole reason
   these are system field types rather than paragraphs. */
const TRANSCRIPT: Array<[string, string, string?]> = [
  ['Fever, cold and cough for the last three days.', 'Presenting complaint'],
  ['Patient agreed to the consultation being recorded.', 'Consent', 'ledger'],
  ['No other family members affected. Temperature ninety-nine.', 'History'],
  ['He had a fall in the corridor on the way in — no injury, family told.', 'Incident', 'ledger'],
  ['Chest clear on auscultation, breath sounds normal.', 'Examination findings'],
  ['Viral fever. Dolo 650, one at night, four days.', 'Diagnosis · Prescription', 'ledger'],
];

function MRecording() {
  return (
    <div className="pf-m">
      <div className="pf-m-h" style={{ textAlign: 'center' }}>General OPD Consultation</div>
      <div className="pf-m-sub" style={{ textAlign: 'center' }}>John · 23 yrs</div>

      <div className="pf-rec">
        <div className="pf-wave">
          {Array.from({ length: 22 }).map((_, i) => (
            <i key={i} style={{ animationDelay: `${(i % 9) * 90}ms` }} />
          ))}
        </div>
        <div>
          <div className="pf-m-timer num">02:41</div>
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
      <div className="pf-m-sub">Captured · 02:41 · draft</div>

      <div className="pf-in" style={{ marginTop: 10 }}>
        {[['Presenting complaint', 'Fever, cough, 3 days'],
          ['Diagnosis', 'Viral fever'],
          ['Prescriptions', 'Dolo 650 mg · 0-0-1 · 4 days']].map(([k, v]) => (
          <div className="pf-m-field" key={k}><em>{k}</em><b>{v}</b></div>
        ))}
      </div>

      <div className="pf-m-check pf-late">
        <div className="pf-m-check-h">
          <span className="pf-chip pf-chip--stop">1 must</span>
          Checked against Cashless Claim Evidence
        </div>
        <div className="pf-m-clause">
          <b>Perform hand hygiene</b>
          <em>Required before and after every patient contact. Not evidenced in this note.</em>
        </div>
      </div>

      <div className="pf-m-acts pf-late2">
        <span className="pf-btn pf-btn--blocked">Submit blocked</span>
        <span className="pf-btn">Add reason</span>
      </div>
      <div className="pf-m-foot">An override needs a written reason, and that becomes evidence.</div>
    </div>
  );
}

/* --- 4. it lands on the patient ----------------------------------------- */
function MFiled() {
  return (
    <div className="pf-m">
      <div className="pf-m-h">John</div>
      <div className="pf-m-sub">Male · 23 yrs · Pensbury Hospital</div>

      <div className="pf-in" style={{ marginTop: 12 }}>
        {[['Note submitted · General OPD', 'just now', true],
          ['Consent captured · audio recording', 'Aug 10', false],
          ['Pain recorded · 3 / 10 · FLACC', 'Aug 4', false]].map(([t, w, isNew]) => (
          <div className={'pf-tl' + (isNew ? ' is-new' : '')} key={t as string} style={{ paddingLeft: 14 }}>
            <div style={{ fontSize: 9.5, color: 'var(--muted)' }}>{w as string}</div>
            <b style={{ fontSize: 11.5, color: 'var(--ink)', display: 'block', margin: '1px 0 4px' }}>
              {t as string}
            </b>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9.5, color: 'var(--muted)' }}>
              <span style={{
                width: 13, height: 13, borderRadius: '50%', background: 'var(--accent)',
                color: '#fff', display: 'grid', placeItems: 'center', fontSize: 8, fontWeight: 700,
              }}>R</span>
              Ram · Staff · 14:02
            </div>
          </div>
        ))}
      </div>

      <div className="pf-m-foot pf-late">
        Author, role and time on every entry — the thing a payer asks for when it disputes the file.
      </div>
    </div>
  );
}

/* --- 5. the queue ------------------------------------------------------- */
function MTracked() {
  return (
    <div className="pf-m">
      <div className="pf-m-tabs" style={{ marginTop: 0 }}>
        <span className="is-on">To approve</span>
        <span>Submitted by you</span>
      </div>

      <div className="pf-in" style={{ marginTop: 10 }}>
        {[['General OPD Consultation', 'Ram · Staff · 14:02', 'Override — reason given', true],
          ['Drug register — morphine 10mg', 'Anu · Nurse · 13:40', 'Needs counter-signature', false],
          ['Consent — procedure', 'Ram · Staff · 11:18', 'Awaiting approval', false],
          ['Incident report — fall, bay 3', 'Sara · Nurse · 09:55', 'Awaiting approval', false]].map(
          ([t, who, note, flag]) => (
          <div className="pf-m-queue" key={t as string}>
            <span>
              <b>{t as string}</b>
              <em>{who as string}</em>
            </span>
            <span className={'pf-chip ' + (flag ? 'pf-chip--warn' : 'pf-chip--bare')}>
              {note as string}
            </span>
          </div>
        ))}
      </div>

      <div className="pf-m-foot">Nothing files itself. Someone signs, and the signature is the record.</div>
    </div>
  );
}

/* --- 6. what is still missing on the ward -------------------------------- */
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
        {[['B-207', 'Implant sticker · day 4 of 5', 60],
          ['B-211', 'Consent names a different procedure', 80],
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

/* --- 7. the agent ------------------------------------------------------- */
function MCopilot() {
  return (
    <div className="pf-m">
      <div className="pf-m-sub" style={{ marginTop: 0 }}>
        Grounded only in your data · you confirm every change
      </div>

      <div className="pf-in" style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="pf-said" style={{ fontSize: 11.5 }}>What are we missing most often?</div>
        <div className="pf-tool"><b>✓</b> Read <kbd>list_policies</kbd></div>
        <div className="pf-tool"><b>✓</b> Read <kbd>list_deductions</kbd></div>
        <div style={{ fontSize: 11.5, color: 'var(--body)' }}>
          The implant batch record. Your evidence policy asks for it, but no form captures
          it as a field — so it lands in free text, where the check cannot read it.
        </div>
      </div>

      <div className="pf-m-check pf-late2" style={{
        borderColor: 'var(--accent-line)', background: 'var(--accent-soft)',
      }}>
        <div className="pf-m-check-h" style={{ color: 'var(--accent)', fontWeight: 600 }}>
          ✦ Add “Implant batch and sticker” to the theatre form
        </div>
        <div style={{ fontSize: 10, color: 'var(--muted)', fontStyle: 'italic', marginTop: 4 }}>
          The copilot never writes a record — approving runs this under your permissions.
        </div>
        <div className="pf-m-acts" style={{ marginTop: 10 }}>
          <span className="pf-btn pf-btn--go pf-approve">Approve</span>
          <span className="pf-btn">Edit</span>
        </div>
      </div>

      <div className="pf-m-foot">It proposes. You approve. Your name goes on the change.</div>
    </div>
  );
}

const PHONE_SCENES = [
  {
    chapter: 'Pick a form', blurb: 'Your paperwork, on the ward',
    title: 'Notes', tab: 'Notes', dur: 8000,
    render: () => <MPickForm />,
    caption: <>It starts on the phone, because that is where care happens. The form is
      <b> your form</b> — the same typed fields the desktop builder published.</>,
  },
  {
    chapter: 'Speak', blurb: 'Any language, one record',
    title: 'Notes', tab: 'Notes', dur: 12000,
    render: () => <MRecording />,
    caption: <>Speak the way you would to a colleague. Each line lands against the field
      it belongs in — and <b>the consent and the fall become records of their own</b>, not
      sentences buried in a note. That is the difference a standard can measure.</>,
  },
  {
    chapter: 'Checked', blurb: 'Before it can be filed',
    title: 'Notes', tab: 'Notes', dur: 10000,
    render: () => <MChecked />,
    caption: <>Before it files, the note is checked against the clauses that will judge it
      — yours, and the payer&rsquo;s. <b>A High · must breach blocks the submission</b>, and
      an override needs a written reason that itself becomes evidence. The patient is still
      in the bed, so the missing thing can still be got.</>,
  },
  {
    chapter: 'Filed', blurb: 'Attributed and timestamped',
    title: 'Patients', tab: 'Patients', dur: 9000,
    render: () => <MFiled />,
    caption: <>It lands on the patient with everything else. <b>Author, role and time on
      every entry</b> — the thing a payer asks you to produce when it disputes the file.</>,
  },
  {
    chapter: 'Approve', blurb: 'Nothing files itself',
    title: 'Inbox', tab: 'Inbox', dur: 9000,
    render: () => <MTracked />,
    caption: <>Anything needing a second pair of eyes waits in the inbox — a counter-signature
      on the drug register, or the note that was submitted with an override.
      <b> The reason given is attached to it</b>, so the approver is deciding with the
      evidence in front of them.</>,
  },
  {
    chapter: 'Readiness', blurb: 'What is still missing',
    title: 'Claims', tab: 'Home', dur: 10000,
    render: () => <MCoverage />,
    caption: <>Every admitted patient, in one of four honest states, on the
      same phone. <b>Out of scope is shown but never counted against you</b> — which is why
      the number can actually reach 100 rather than being a score nobody trusts.</>,
  },
  {
    chapter: 'Copilot', blurb: 'It proposes, you approve',
    title: 'Copilot', tab: 'Home', dur: 10000,
    render: () => <MCopilot />,
    caption: <>The copilot reads what you already hold and proposes the next change — here,
      the policy that fourteen requirements are waiting on. <b>It never writes a record on
      its own.</b> Approving runs it under your permissions, with your name on it.</>,
  },
];

/* ---- the film ---------------------------------------------------------- */

/* The order is the story, and the story is the order a practice actually does
   this in: build the paperwork, write the rules, see a patient, let the agent
   work on what is now there, and read where you stand. Ending on coverage
   matters — it is the only scene that answers "so what". */
const DESKTOP_SCENES = [
  {
    chapter: 'Build the form', hint: 'Hover any part of the screen to see what it does.', blurb: 'Your paperwork, as fields',
    nav: 'Forms', tab: 'General OPD Consultation', dur: 10000,
    render: () => <SceneForm />,
    caption: <>It starts with your own consultation form, built as typed fields rather than
      a blank page. <b>Consent, prescription, incident and pain score are system field
      types</b> — they write to the record, not just into a paragraph. The PDF that gets
      filed is on the right, updating as you build.</>,
  },
  {
    chapter: 'Write the rules', hint: 'Hover a clause, a parity chip, or the rendered document.', blurb: 'Clauses with a severity',
    nav: 'Policies', tab: 'Cashless Claim Evidence', dur: 10000,
    render: () => <SceneClauses />,
    caption: <>Then the rules that form has to satisfy — your own protocols, and what the
      payer requires before it will pay. Each clause is one enforceable rule with a
      severity: <b>High · must blocks a submission that breaches it</b>, medium · should
      warns. When a payer changes what it asks for, you change the clause, not the
      workflow.</>,
  },
  {
    chapter: 'Capture it', hint: 'Hover the transcript, or what it became on the right.',
    blurb: 'One dictation, six records',
    nav: 'Notes', tab: 'General OPD Consultation', dur: 13000,
    render: () => <SceneCapture />,
    caption: <>Then the encounter itself. Each line of the dictation lands against the
      field it belongs in — and <b>the consent, the fall and the prescription become
      records of their own</b>, with their own numbers and their own approvals, rather
      than sentences buried in a note.</>,
  },
  {
    chapter: 'See a patient', hint: 'Hover the capture row, the pain panel, or the timeline on the right.', blurb: 'The record, as it happens',
    nav: 'Subjects', tab: 'Patients', dur: 11000,
    render: () => <SceneSubject />,
    caption: <>Now a patient. The note is checked against those clauses before it can be
      filed, and it lands here with the consents, pain scores and incidents already
      attached. <b>Every entry carries who filed it, in what role, at what time</b> — which
      is exactly what gets asked for when a payer disputes it months later.</>,
  },
  {
    chapter: 'Let the agent work', hint: 'Hover the tool calls or the proposal card.', blurb: 'It proposes, you approve',
    nav: 'Copilot', tab: 'Copilot', dur: 11500,
    render: () => <SceneCopilot />,
    caption: <>With real forms, policies and records in place, the copilot has something to
      read. It proposes the next change — the policy you are missing, the form that would
      evidence it. <b>It never writes a record on its own.</b> When you approve, it runs
      under your permissions and the change is signed with your name.</>,
  },
  {
    chapter: 'Know what is missing', hint: 'Hover the four states, the score, or an open gap.', blurb: 'The desk view, before discharge',
    nav: 'Claims', tab: 'Claim readiness', dur: 11500,
    render: () => <SceneCoverage />,
    caption: <>And this is what all of it adds up to: every requirement, in one of four
      honest states, updating as records arrive. <b>Out of scope is shown but never counted
      against you</b>, so the number means something. Open one and it names the exact field
      it reads, and what is still missing — before anyone is waiting on it.</>,
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

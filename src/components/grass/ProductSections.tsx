import React from 'react';

import { Rv, CountUp } from './Rv';

// Sections drawn from the REAL product — labels, widget names, clause parities,
// template names and PDF anatomy all come from the actual Salvia codebase.

/* ── Form builder ─────────────────────────────────────────────── */

export const FormBuilderSection: React.FC = () => (
  <section className="g-section" id="form-builder">
    <div className="g-container">
      <div className="g-split">
        <div>
          <Rv as="h2" className="g-h2">
            Build the exact form <span className="g-hl">your clinic uses.</span>
          </Rv>
          <Rv as="p" className="g-sub" delay={1}>
            Click a field type to add it. Drag to reorder. Alongside plain text and choice
            fields there are <b>typed compliance widgets</b> — a drug operation logs to the
            controlled-drug ledger, an incident is auto-classified, a consent carries its own
            audit trail. Publish, and the form is versioned like software.
          </Rv>
          <Rv as="p" className="g-small" delay={2} style={{ marginTop: 20 }}>
            Real field types from the builder: Consent · Drug op · Incident · Pain score ·
            Outcome measure · Vaccination · Radiograph log · Sterilisation cycle ·
            Anaesthesia record.
          </Rv>
        </div>
        <Rv className="g-panel-scene" delay={1}>
          <img className="g-scene-img g-scene-img--bl" src="/illustrations/story_form.webp" alt="" aria-hidden="true" />
          <div className="g-ui g-ui--panel" aria-hidden="true">
          <div className="g-ui-bar">
            <span className="g-ui-bar-title">Form builder — Vaccination Encounter</span>
            <div className="g-ui-steps" style={{ marginLeft: 'auto' }}>
              Basics <i /> <b>Fields</b> <i /> Review &amp; Publish
            </div>
            <span className="g-ui-bar-pill">Draft</span>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="g-ui-palette">
              <div className="g-ui-pal-group">TEXT</div>
              <div className="g-ui-pal-item"><i />Short text</div>
              <div className="g-ui-pal-item"><i />Paragraph</div>
              <div className="g-ui-pal-group">CHOICE</div>
              <div className="g-ui-pal-item"><i />Yes / No</div>
              <div className="g-ui-pal-item"><i />Button group</div>
              <div className="g-ui-pal-group">SYSTEM</div>
              <div className="g-ui-pal-item g-ui-pal-item--sys"><i />Consent</div>
              <div className="g-ui-pal-item g-ui-pal-item--sys"><i />Drug op</div>
              <div className="g-ui-pal-item g-ui-pal-item--sys"><i />Incident</div>
              <div className="g-ui-pal-item g-ui-pal-item--sys"><i />Pain score</div>
              <div className="g-ui-pal-item g-ui-pal-item--sys"><i />Vaccination</div>
            </div>
            <div className="g-ui-canvas">
              <div className="g-ui-canvas-hint">Click a type to add. Drag to reorder.</div>
              <div className="g-ui-fieldcard"><span className="g-drag">⋮⋮</span><span className="g-fc-label">Presenting complaint</span><span className="g-fc-type">Paragraph</span></div>
              <div className="g-ui-fieldcard g-ui-fieldcard--sys g-ui-fieldcard--open">
                <div className="g-fc-head"><span className="g-drag">⋮⋮</span><span className="g-fc-label">Vaccine administered</span><span className="g-fc-type">system.vaccination</span></div>
                <div className="g-fc-config">
                  <small>AUTO-CAPTURE</small>
                  <div className="g-fc-prompt">"Which vaccine, batch and site were administered?"</div>
                  <div className="g-fc-toggles"><span><b>●</b> Required</span><span>○ Skippable</span><span>○ Allow inference</span></div>
                </div>
              </div>
              <div className="g-ui-fieldcard g-ui-fieldcard--sys"><span className="g-drag">⋮⋮</span><span className="g-fc-label">Informed consent</span><span className="g-fc-type">system.consent</span></div>
              <div className="g-ui-fieldcard"><span className="g-drag">⋮⋮</span><span className="g-fc-label">Next dose due</span><span className="g-fc-type">Date picker</span></div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <span className="g-ui-tag g-ui-tag--ink">Add field</span>
                <span className="g-ui-tag g-ui-tag--ink">Add row</span>
                <span className="g-ui-tag" style={{ marginLeft: 'auto' }}>Publish Form</span>
              </div>
            </div>
          </div>
          </div>
        </Rv>
      </div>
    </div>
  </section>
);

/* ── Policy engine ────────────────────────────────────────────── */

export const PolicyEngineSection: React.FC = () => (
  <section className="g-section g-section--muted" id="policy-engine">
    <div className="g-container">
      <div className="g-split">
        <Rv className="g-panel-scene" delay={1} style={{ order: 0 }}>
          <img className="g-scene-img g-scene-img--br" src="/illustrations/story_policy.webp" alt="" aria-hidden="true" />
          <div className="g-ui g-ui--panel" aria-hidden="true">
          <div className="g-ui-bar">
            <span className="g-ui-bar-title">Policy check — OPD consult</span>
            <span className="g-ui-tag" style={{ marginLeft: 'auto' }}>3 of 4 clauses pass</span>
          </div>
          <div style={{ padding: '12px 14px' }}>
            <div className="g-clause">
              <div className="g-clause-head">
                <span className="g-clause-title">Verify allergies before NSAIDs</span>
                <span className="g-parity g-parity--high">High · must</span>
              </div>
              <div className="g-clause-body">Allergy status must be recorded in the note before any NSAID is prescribed.</div>
            </div>
            <div className="g-check-row g-check-row--pass"><span className="g-ck-ic" /><span><b>Dosage within adult limits</b><span className="g-ck-note">Paracetamol 650 mg TDS — within range.</span></span></div>
            <div className="g-check-row g-check-row--pass"><span className="g-ck-ic" /><span><b>Follow-up documented</b><span className="g-ck-note">Monday review recorded.</span></span></div>
            <div className="g-check-row g-check-row--fail"><span className="g-ck-ic" /><span><b>Verify allergies before NSAIDs</b><span className="g-ck-note">No allergy status found in this note.</span></span></div>
            <div className="g-override-bar">1 clause blocks submit — provide a justification to override<span>Override and submit</span></div>
          </div>
          </div>
        </Rv>
        <div style={{ order: 1 }}>
          <Rv as="h2" className="g-h2">
            Write the rule once. <span className="g-hl">Every note obeys it.</span>
          </Rv>
          <Rv as="p" className="g-sub" delay={1}>
            Each clause is one enforceable rule, with a strictness level — <b>must, should, or
            try</b>. Link policies to a form and every note is checked before it's signed. A
            blocking violation can't be quietly ignored: overriding needs a written
            justification, <b>recorded in the audit log.</b>
          </Rv>
          <Rv as="p" className="g-small" delay={2} style={{ marginTop: 20 }}>
            Ships with 58 ready policies — from Controlled Drugs Management to Cold Chain,
            Open Disclosure, and Radiation Safety — each clause citing its regulation.
          </Rv>
        </div>
      </div>
    </div>
  </section>
);

/* ── Template library ─────────────────────────────────────────── */

const TEMPLATES: { name: string; vert: string; extra: string }[] = [
  { name: 'Standard SOAP Consultation Record', vert: 'All clinics', extra: '7 fields' },
  { name: 'Controlled Drug Register Entry', vert: 'Veterinary', extra: 'system.drug_op' },
  { name: 'Comprehensive Dental Charting', vert: 'Dental', extra: 'Charting' },
  { name: 'Vaccination Encounter', vert: 'General practice', extra: 'system.vaccination' },
  { name: 'General Anaesthesia & Surgical Consent', vert: 'Veterinary', extra: 'system.consent' },
  { name: 'Sharps & Needlestick Injury Report', vert: 'Dental', extra: 'system.incident' },
  { name: 'Work Capacity Medical Certificate', vert: 'General practice', extra: 'PDF export' },
  { name: 'Medication Administration Record (MAR)', vert: 'Aged care', extra: 'eMAR' },
  { name: 'Pain Assessment in Advanced Dementia', vert: 'Aged care', extra: 'PainAD scale' },
  { name: 'Allied Health Initial Assessment', vert: 'Allied health', extra: 'Outcome measures' },
  { name: 'Specialist Referral', vert: 'General practice', extra: 'Letterhead' },
  { name: 'Resident Fall Incident Report', vert: 'Aged care', extra: 'system.incident' },
];

const TPL_ICONS = ['/illustrations/form.webp', '/illustrations/policy.webp', '/illustrations/stetho.webp', '/illustrations/mic.webp', '/illustrations/vault.webp', '/illustrations/shield.webp'];

export const TemplateLibrary: React.FC = () => (
  <section className="g-section g-center" id="templates">
    <div className="g-container">
      <Rv as="h2" className="g-h2">
        Don't start from a blank page. <span className="g-hl"><CountUp value={107} /> templates ship inside.</span>
      </Rv>
      <Rv as="p" className="g-sub" delay={1}>
        49 forms and 58 policies, written for real clinical work and badged{' '}
        <b>Made by Salvia</b> — your clinic gets its discipline's set on day one, then edits
        anything in the builder.
      </Rv>
      <div className="g-tpl-grid" style={{ textAlign: 'left' }}>
        {TEMPLATES.map((t, i) => (
          <Rv className="g-tpl" key={t.name} delay={(Math.min((i % 4) + 1, 4)) as 1 | 2 | 3 | 4}>
            <img className="g-tpl-ic" src={TPL_ICONS[i % TPL_ICONS.length]} alt="" loading="lazy" />
            <div className="g-tpl-name">{t.name}</div>
            <div className="g-tpl-meta">
              <span className="g-tpl-vert">{t.vert}</span>
              <span>{t.extra}</span>
            </div>
          </Rv>
        ))}
      </div>
      <Rv as="p" className="g-tpl-count" delay={2}>
        …and 95 more across veterinary, dental, general practice, allied health and aged care.
      </Rv>
    </div>
  </section>
);

/* ── The document itself ──────────────────────────────────────── */

export const PdfSection: React.FC = () => (
  <section className="g-section" id="the-document">
    <div className="g-container">
      <div className="g-split">
        <div>
          <Rv as="h2" className="g-h2">
            The PDF that answers <span className="g-hl">for you.</span>
          </Rv>
          <Rv as="p" className="g-sub" delay={1}>
            Every signed note renders on your clinic's own letterhead — your logo, colours and
            footer. Drug operations, consents and incidents print as dedicated register cards
            with their witness status. And every page carries a <b>SHA-256 content hash</b>:
          </Rv>
          <Rv as="blockquote" delay={2} style={{ margin: '22px 0 0', borderLeft: '3px solid var(--g-green)', paddingLeft: 16 }}>
            <p style={{ fontFamily: 'var(--g-font)', fontSize: 16, fontWeight: 600, color: 'var(--g-ink)', lineHeight: 1.6 }}>
              "Tampering with any byte invalidates the bundle hash printed in the footer of
              every page."
            </p>
            <p className="g-small" style={{ marginTop: 6 }}>— from the Audit Pack every note can produce</p>
          </Rv>
          <Rv as="p" className="g-small" delay={3} style={{ marginTop: 22 }}>
            Theme presets per discipline, per-document overrides for regulator submissions,
            and a one-file Audit Pack an assessor can verify.
          </Rv>
        </div>
        <Rv className="g-split-art" delay={1}>
          <div className="g-pdf" aria-hidden="true">
            <div className="g-pdf-head">
              <span className="g-pdf-logo">GC</span>
              <div>
                <div className="g-pdf-clinic">Greenfield Clinic</div>
                <div className="g-pdf-contact">12 MG Road, Kochi · +91 484 220 1140</div>
              </div>
              <div className="g-pdf-eyebrow">
                <small>Signed Clinical Note</small>
                <b>OPD Consult · v1.2</b>
              </div>
            </div>
            <div className="g-pdf-body">
              <div className="g-pdf-idcard">
                <span className="g-ui-avatar">RS</span>
                <div>
                  <div className="g-pdf-id-name">Ravi Sharma</div>
                  <div className="g-pdf-id-meta">46 / M · Patient ID 0412 · No known allergies</div>
                </div>
              </div>
              <div className="g-pdf-row"><span>Chief complaint</span><b>Fever × 3 days</b></div>
              <div className="g-pdf-row"><span>Vitals</span><b>BP 130/85 · Temp 99.8°F</b></div>
              <div className="g-pdf-row"><span>Plan</span><b>Paracetamol 650 mg · review Monday</b></div>
              <div className="g-pdf-syscard">
                <small>Controlled drug ledger</small>
                <div className="g-pdf-sys-line">℞ Paracetamol 650 mg · administered <span className="g-ui-tag">Witness signed</span></div>
              </div>
              <div className="g-pdf-sig">
                <div className="g-pdf-sig-line">Submitted by<b>Dr. Nair</b></div>
                <div className="g-pdf-sig-line" style={{ textAlign: 'right' }}>Note 7e3b1c4a<b>4 Jul 2026 · 6:42 pm</b></div>
              </div>
            </div>
            <div className="g-pdf-foot">
              <span>Greenfield Clinic · OPD Consult</span>
              <code>SHA-256 · 7e3b1c4a9d22f0e8…</code>
              <span>Page 1 of 2</span>
            </div>
          </div>
        </Rv>
      </div>
    </div>
  </section>
);

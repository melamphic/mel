// Per-discipline data for the Allied Health vertical pages. Six
// disciplines share one [AlliedDisciplineTemplate] component; each
// page differs only in the data below.
//
// Regulators are listed accurately per discipline / country. The
// pitch is "Salvia generates documentation against your specific
// framework" — so the regulator list is the value prop, not flavour
// text. Verify any framework change against the registering body's
// current standards before editing.

/// Regulators are referenced by ISO 3166-1 alpha-2 country code (or
/// a synthetic code like 'EU') — independent of the pricing
/// [Market] enum, which is a coarser pricing-region concept. CORU is
/// always Irish; the user's pricing region might be 'EU' generally.
export interface DisciplineRegulator {
  countryCode: string;
  country: string;
  body: string;
  bodyFull: string;
  color: string;
  note?: string;
}

export interface DisciplineFAQ {
  q: string;
  a: string;
}

export type IconSlug =
  | 'voice'
  | 'outcome'
  | 'consent'
  | 'discharge'
  | 'treatment'
  | 'audit'
  | 'team'
  | 'framework'
  | 'incident'
  | 'wound';

export interface DisciplineFeature {
  icon: IconSlug;
  title: string;
  desc: string;
}

export interface DisciplineBlogPost {
  slug: string;
  title: string;
  tag: string;
}

export interface AlliedDiscipline {
  slug: string;
  key: 'physio' | 'osteo' | 'chiro' | 'ot' | 'podiatry' | 'speech';
  name: string;
  shortName: string;
  pluralLowercase: string;
  accent: string;
  accentSoft: string;
  heroBadge: string;
  heroHeadline: [string, string];
  heroSubtitle: string;
  regulators: DisciplineRegulator[];
  features: DisciplineFeature[];
  faqs: DisciplineFAQ[];
  recentPosts: DisciplineBlogPost[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

const COMMON_FEATURES = (label: string, pluralLowercase: string): DisciplineFeature[] => [
  {
    icon: 'voice',
    title: 'Voice → structured record',
    desc: `Speak the encounter — Salvia maps it to subjective, objective, assessment, plan. Contemporaneous timestamp, no typing, no template-bashing.`,
  },
  {
    icon: 'outcome',
    title: 'Outcome measures, captured',
    desc: `Validated ${label} outcome scales are first-class fields. Score baseline at intake, repeat at review, plot progress over the episode of care.`,
  },
  {
    icon: 'treatment',
    title: 'Treatment record, every session',
    desc: `Each session lands in a structured treatment record — what was done, response, plan for next visit. Progress notes write themselves.`,
  },
  {
    icon: 'consent',
    title: 'Consent & cost estimate, signed',
    desc: `Procedure-specific consent templates. Cost estimate captured and signed before treatment starts, with the e-signature attached to the record.`,
  },
  {
    icon: 'discharge',
    title: 'Discharge summary on demand',
    desc: `Episode-of-care summary auto-drafted from session notes: presenting condition, intervention, outcomes, recommendations. One review and sign.`,
  },
  {
    icon: 'audit',
    title: 'Framework-aware audit trail',
    desc: `Every record version, edit, and signature timestamped and locked. Produce a complete file for any complaint or inspection in seconds.`,
  },
  {
    icon: 'team',
    title: `Multi-${pluralLowercase} practice support`,
    desc: `Role-based access for principals, associates, and admin. Each clinician signs their own records with their registration number — clean attribution for any audit.`,
  },
];

export const ALLIED_DISCIPLINES: AlliedDiscipline[] = [
  // ── Physiotherapy ────────────────────────────────────────────────
  {
    slug: 'physiotherapy',
    key: 'physio',
    name: 'Physiotherapy',
    shortName: 'Physio',
    pluralLowercase: 'physiotherapists',
    accent: '#0891B2',
    accentSoft: 'rgba(8,145,178,0.07)',
    heroBadge: 'Allied Health · Physiotherapy',
    heroHeadline: ['Records that hold up,', 'session after session.'],
    heroSubtitle:
      'CORU. HCPC. AHPRA. PBNZ. One voice note per session — Salvia handles the SOAP record, outcome scales, treatment log, discharge summary, and audit trail.',
    regulators: [
      { countryCode: 'IE', country: 'Ireland',        body: 'CORU',  bodyFull: 'Physiotherapists Registration Board',        color: '#0891B2' },
      { countryCode: 'UK', country: 'United Kingdom', body: 'HCPC',  bodyFull: 'Health & Care Professions Council',          color: '#FF4E00' },
      { countryCode: 'AU', country: 'Australia',      body: 'AHPRA', bodyFull: 'Physiotherapy Board of Australia',           color: '#F59E0B' },
      { countryCode: 'NZ', country: 'New Zealand',    body: 'PBNZ',  bodyFull: 'Physiotherapy Board of New Zealand',         color: '#10B981' },
      { countryCode: 'US', country: 'United States',  body: 'FSBPT', bodyFull: 'State physical therapy boards',              color: '#6366F1' },
    ],
    features: [
      ...COMMON_FEATURES('physiotherapy', 'clinician'),
      {
        icon: 'framework',
        title: 'NPRS, ODI, NDI, LEFS — built in',
        desc: 'Numeric pain rating, Oswestry, Neck Disability Index, Lower Extremity Functional Scale — capture, total, and trend automatically.',
      },
    ],
    faqs: [
      {
        q: 'Is Salvia CORU-aware for Irish physios?',
        a: 'Yes. The Physiotherapists Registration Board (CORU) Code of Professional Conduct & Ethics requires contemporaneous, legible, attributable records. Salvia’s structured records, immutable timestamps, and per-clinician sign-off cover those requirements out of the box.',
      },
      {
        q: 'Does it cover HCPC standards for UK physios?',
        a: 'Yes. HCPC Standards of Conduct, Performance and Ethics (Standard 10 — record keeping) maps directly to Salvia’s structured records and audit trail. Every session note carries the clinician’s registration and a locked timestamp.',
      },
      {
        q: 'How do outcome measures work?',
        a: 'The common physiotherapy scales (NPRS, ODI, NDI, LEFS, PSFS, DASH) are first-class field types. Score at intake, repeat at review, and Salvia plots the trend. Episode-level outcome change appears on the discharge summary automatically.',
      },
      {
        q: 'Does it handle MSK private-practice billing notes?',
        a: 'Salvia produces the clinical record — what was assessed, what was done, response, plan. It does not bill insurers directly; it generates the documentation that insurers and ACC (NZ) audits actually look for.',
      },
      {
        q: 'What about MDT clinics with sports doctors and physios?',
        a: 'Role-based access. Sports doctor sees the medical layer, physios see the physio layer, admin sees scheduling. Records are attributed to whoever signed them — registration number on every entry.',
      },
    ],
    recentPosts: [
      { slug: 'coru-physio-records', title: 'What CORU’s Code of Professional Conduct says about physio records — and how to evidence it', tag: 'CORU' },
      { slug: 'hcpc-record-keeping', title: 'HCPC Standard 10 in practice: what your physio notes actually need to show', tag: 'HCPC' },
    ],
    metaTitle: 'Physiotherapy Compliance Software — CORU, HCPC, AHPRA, PBNZ',
    metaDescription:
      'Salvia keeps physiotherapy records audit-ready for CORU, HCPC, AHPRA and PBNZ. Voice note after each session — SOAP record, outcome measures, treatment log, discharge summary out the other side.',
    metaKeywords: [
      'physiotherapy compliance software', 'physio records software Ireland', 'CORU physiotherapy records',
      'HCPC physio records', 'physiotherapy SOAP notes', 'physio outcome measures software',
      'AHPRA physiotherapy', 'PBNZ records', 'physiotherapy audit trail',
    ],
  },

  // ── Osteopathy ──────────────────────────────────────────────────
  {
    slug: 'osteopathy',
    key: 'osteo',
    name: 'Osteopathy',
    shortName: 'Osteo',
    pluralLowercase: 'osteopaths',
    accent: '#8B5CF6',
    accentSoft: 'rgba(139,92,246,0.07)',
    heroBadge: 'Allied Health · Osteopathy',
    heroHeadline: ['Treatment records that', 'satisfy the standards.'],
    heroSubtitle:
      'GOsC. AHPRA Osteopathy Board. Osteopathic Council of NZ. Salvia captures the case history, examination, treatment, and outcome — all under your regulator’s record-keeping requirements.',
    regulators: [
      { countryCode: 'UK', country: 'United Kingdom', body: 'GOsC',  bodyFull: 'General Osteopathic Council',         color: '#8B5CF6' },
      { countryCode: 'AU', country: 'Australia',      body: 'AHPRA', bodyFull: 'Osteopathy Board of Australia',       color: '#F59E0B' },
      { countryCode: 'NZ', country: 'New Zealand',    body: 'OCNZ',  bodyFull: 'Osteopathic Council of New Zealand',  color: '#10B981' },
      { countryCode: 'IE', country: 'Ireland',        body: 'ICO',   bodyFull: 'Irish College of Osteopaths (voluntary register)', color: '#0891B2',
        note: 'Statutory CORU registration anticipated; ICO standards followed in the interim.' },
      { countryCode: 'US', country: 'United States',  body: 'AOA',   bodyFull: 'State osteopathic medical boards',    color: '#6366F1' },
    ],
    features: [
      ...COMMON_FEATURES('osteopathic', 'clinician'),
      {
        icon: 'framework',
        title: 'GOsC OPS-aligned record format',
        desc: 'Case history, examination findings, working diagnosis, treatment, response — the record format the GOsC Osteopathic Practice Standards expect.',
      },
    ],
    faqs: [
      {
        q: 'Does Salvia satisfy the GOsC Osteopathic Practice Standards?',
        a: 'Yes. OPS Standard D (communication and patient partnership) and Standard D6 (record keeping) require structured, contemporaneous, identifiable records. Salvia’s case-history → examination → diagnosis → treatment record format and immutable audit trail are designed for it.',
      },
      {
        q: 'What about AHPRA Osteopathy Board record-keeping guidelines?',
        a: 'Yes. The Code of Conduct for Osteopaths (Mar 2022) sections 8.4 (medical records) and 5.2 (informed consent) map to Salvia’s consent + treatment record + audit trail. Records remain accessible for the minimum 7-year retention.',
      },
      {
        q: 'How is treatment captured — manual technique narrative?',
        a: 'Voice-note the session. Salvia maps the audio to a structured treatment record: areas treated, techniques used, response, plan for next visit. Free-text where it matters; structured where the record demands it.',
      },
      {
        q: 'Is statutory regulation in Ireland a concern?',
        a: 'Statutory CORU registration for osteopaths is anticipated. Until it arrives, Salvia follows the Irish College of Osteopaths standards. The audit trail and structured records will transfer cleanly to whatever CORU mandates.',
      },
      {
        q: 'Cranial, structural, visceral — can the record reflect approach?',
        a: 'Yes. The treatment record captures the approach used per session. Useful both for clinical continuity and for satisfying inspection questions about your scope of practice.',
      },
    ],
    recentPosts: [
      { slug: 'gosc-record-keeping', title: 'OPS Standard D6: what a GOsC-aligned osteopathy record actually contains', tag: 'GOsC' },
      { slug: 'ahpra-osteo-conduct', title: 'AHPRA Osteopathy Code of Conduct: the record-keeping clauses that matter', tag: 'AHPRA' },
    ],
    metaTitle: 'Osteopathy Practice Software — GOsC, AHPRA, OCNZ Compliant',
    metaDescription:
      'Salvia generates osteopathy records aligned with GOsC Osteopathic Practice Standards, AHPRA Osteopathy Board, and OCNZ requirements. Voice note → structured treatment record.',
    metaKeywords: [
      'osteopathy software', 'GOsC compliance', 'osteopathy records UK',
      'AHPRA osteopath', 'OCNZ osteopathy', 'osteopathy practice management',
      'manual therapy notes', 'osteopath audit trail',
    ],
  },

  // ── Chiropractic ────────────────────────────────────────────────
  {
    slug: 'chiropractic',
    key: 'chiro',
    name: 'Chiropractic',
    shortName: 'Chiro',
    pluralLowercase: 'chiropractors',
    accent: '#F97316',
    accentSoft: 'rgba(249,115,22,0.07)',
    heroBadge: 'Allied Health · Chiropractic',
    heroHeadline: ['Adjustment records,', 'audit-grade.'],
    heroSubtitle:
      'GCC. AHPRA Chiropractic Board. CBNZ. Salvia structures the case history, exam, imaging review, plan, and visit notes — under the record-keeping standards every chiropractic regulator expects.',
    regulators: [
      { countryCode: 'UK', country: 'United Kingdom', body: 'GCC',   bodyFull: 'General Chiropractic Council',          color: '#F97316' },
      { countryCode: 'AU', country: 'Australia',      body: 'AHPRA', bodyFull: 'Chiropractic Board of Australia',       color: '#F59E0B' },
      { countryCode: 'NZ', country: 'New Zealand',    body: 'CBNZ',  bodyFull: 'Chiropractic Board of New Zealand',     color: '#10B981' },
      { countryCode: 'US', country: 'United States',  body: 'NBCE',  bodyFull: 'State chiropractic boards',             color: '#6366F1' },
      { countryCode: 'IE', country: 'Ireland',        body: 'CAI',   bodyFull: 'Chiropractic Association of Ireland (voluntary)', color: '#0891B2',
        note: 'Statutory regulation pending; CAI standards followed in the interim.' },
    ],
    features: [
      ...COMMON_FEATURES('chiropractic', 'clinician'),
      {
        icon: 'framework',
        title: 'Imaging review + treatment plan log',
        desc: 'X-ray request, report, and treatment-plan rationale captured together — the GCC Code C3 record-keeping standard out of the box.',
      },
    ],
    faqs: [
      {
        q: 'Does Salvia meet GCC record-keeping requirements?',
        a: 'Yes. The GCC Code (C3 — record keeping) requires legible, accurate, contemporaneous records covering history, examination, diagnosis, plan, and visit notes. Salvia’s structured record format and immutable audit trail cover the standard.',
      },
      {
        q: 'How is informed consent for adjustments captured?',
        a: 'Procedure-specific consent templates with risk disclosure and patient signature, locked to the visit record. Re-consent prompts for material change in treatment plan.',
      },
      {
        q: 'Can imaging requests be tracked?',
        a: 'Yes. Imaging request, indication, report received, and treatment-plan change captured in one log per patient. Useful for both clinical continuity and for GCC C3 record requirements.',
      },
      {
        q: 'AHPRA Chiropractic Board guidance on advertising and records?',
        a: 'Salvia handles the record-keeping side: structured visit notes, consent, treatment plan rationale. Advertising compliance is your obligation; Salvia stays out of marketing claims.',
      },
      {
        q: 'Multi-chiropractor practice with locums?',
        a: 'Role-based access. Each chiropractor signs their own records with their registration number. Locum visits are clearly attributed for any audit.',
      },
    ],
    recentPosts: [
      { slug: 'gcc-record-keeping', title: 'GCC Code C3: what your chiropractic records have to show', tag: 'GCC' },
      { slug: 'ahpra-chiro-conduct', title: 'AHPRA Chiropractic Code of Conduct — the documentation clauses', tag: 'AHPRA' },
    ],
    metaTitle: 'Chiropractic Practice Software — GCC, AHPRA, CBNZ Records',
    metaDescription:
      'Salvia generates chiropractic records aligned with GCC, AHPRA Chiropractic Board, and CBNZ. Voice note → structured adjustment record, imaging log, consent, audit trail.',
    metaKeywords: [
      'chiropractic software', 'GCC compliance chiropractic', 'chiropractic records UK',
      'AHPRA chiropractor', 'CBNZ chiropractic', 'chiropractic SOAP notes',
      'adjustment record software',
    ],
  },

  // ── Occupational Therapy ────────────────────────────────────────
  {
    slug: 'occupational-therapy',
    key: 'ot',
    name: 'Occupational Therapy',
    shortName: 'OT',
    pluralLowercase: 'occupational therapists',
    accent: '#EC4899',
    accentSoft: 'rgba(236,72,153,0.07)',
    heroBadge: 'Allied Health · Occupational Therapy',
    heroHeadline: ['Functional records,', 'every visit.'],
    heroSubtitle:
      'CORU. HCPC. AHPRA OT Board. OTBNZ. Salvia handles intake, functional assessment, goal-setting, intervention, and outcome review — under your regulator’s standards.',
    regulators: [
      { countryCode: 'IE', country: 'Ireland',        body: 'CORU',  bodyFull: 'Occupational Therapists Registration Board', color: '#0891B2' },
      { countryCode: 'UK', country: 'United Kingdom', body: 'HCPC',  bodyFull: 'Health & Care Professions Council',          color: '#FF4E00' },
      { countryCode: 'AU', country: 'Australia',      body: 'AHPRA', bodyFull: 'Occupational Therapy Board of Australia',    color: '#F59E0B' },
      { countryCode: 'NZ', country: 'New Zealand',    body: 'OTBNZ', bodyFull: 'Occupational Therapy Board of New Zealand',  color: '#10B981' },
      { countryCode: 'US', country: 'United States',  body: 'NBCOT', bodyFull: 'National Board for Certification in OT + state boards', color: '#6366F1' },
    ],
    features: [
      ...COMMON_FEATURES('occupational therapy', 'clinician'),
      {
        icon: 'framework',
        title: 'Goal-setting + ADL tracking',
        desc: 'Client-centred goals captured at intake. Activities of Daily Living progress tracked per visit. Outcome change visible on the discharge summary.',
      },
    ],
    faqs: [
      {
        q: 'Is Salvia CORU-aligned for Irish OTs?',
        a: 'Yes. The Occupational Therapists Registration Board (CORU) Code of Professional Conduct & Ethics requires contemporaneous, attributable records. Salvia’s structured assessment → goal → intervention → review format covers the requirement.',
      },
      {
        q: 'HCPC Standards of Proficiency for OT?',
        a: 'Yes. HCPC SoP for Occupational Therapists (Standard 9 — record keeping) maps to Salvia’s record format. Clinician registration appears on every record; immutable audit trail evidences contemporaneity.',
      },
      {
        q: 'How are functional assessments handled?',
        a: 'Validated OT outcome measures (COPM, AMPS, FIM, A-ONE) are first-class fields. Score at baseline, repeat at review, and Salvia tracks change over the episode of care.',
      },
      {
        q: 'School-based or paediatric OT — does it fit?',
        a: 'Yes. Care plans with school-style goal frameworks (long-term + short-term goals, intervention strategies, review cadence) are supported. Parental consent and information-sharing notices are template-driven.',
      },
      {
        q: 'NDIS support documentation in Australia?',
        a: 'Salvia generates the clinical record — what was assessed, intervention, progress against goals, recommendation. NDIS-aligned reports can be exported from the structured record without separate templates.',
      },
    ],
    recentPosts: [
      { slug: 'coru-ot-records', title: 'CORU OT Code: the record-keeping clauses you have to evidence', tag: 'CORU' },
      { slug: 'hcpc-ot-record-keeping', title: 'HCPC SoP Standard 9: what an OT inspection actually checks', tag: 'HCPC' },
    ],
    metaTitle: 'Occupational Therapy Software — CORU, HCPC, AHPRA, OTBNZ',
    metaDescription:
      'Salvia keeps OT records audit-ready for CORU, HCPC, AHPRA OT Board and OTBNZ. Voice note → functional assessment, goals, intervention, outcome review.',
    metaKeywords: [
      'occupational therapy software', 'OT records software', 'CORU OT records',
      'HCPC occupational therapy', 'AHPRA OT', 'OTBNZ records',
      'COPM software', 'functional assessment software',
    ],
  },

  // ── Podiatry ────────────────────────────────────────────────────
  {
    slug: 'podiatry',
    key: 'podiatry',
    name: 'Podiatry',
    shortName: 'Podiatry',
    pluralLowercase: 'podiatrists',
    accent: '#06B6D4',
    accentSoft: 'rgba(6,182,212,0.07)',
    heroBadge: 'Allied Health · Podiatry',
    heroHeadline: ['Foot care records that', 'never miss the wound log.'],
    heroSubtitle:
      'CORU. HCPC. AHPRA Podiatry Board. PBNZ. Salvia handles assessment, wound register, nail care, sharps log, treatment record, and audit trail — under your regulator.',
    regulators: [
      { countryCode: 'IE', country: 'Ireland',        body: 'CORU',  bodyFull: 'Podiatrists Registration Board',         color: '#0891B2' },
      { countryCode: 'UK', country: 'United Kingdom', body: 'HCPC',  bodyFull: 'Health & Care Professions Council',     color: '#FF4E00' },
      { countryCode: 'AU', country: 'Australia',      body: 'AHPRA', bodyFull: 'Podiatry Board of Australia',           color: '#F59E0B' },
      { countryCode: 'NZ', country: 'New Zealand',    body: 'PBNZ',  bodyFull: 'Podiatrists Board of New Zealand',      color: '#10B981' },
      { countryCode: 'US', country: 'United States',  body: 'APMA',  bodyFull: 'State podiatric medical boards',        color: '#6366F1' },
    ],
    features: [
      ...COMMON_FEATURES('podiatry', 'clinician'),
      {
        icon: 'wound',
        title: 'Wound + nail-care register',
        desc: 'Every wound assessment, dressing change, and nail-care procedure logged with photo support. Diabetic foot pathway gets the structured tracking it needs.',
      },
      {
        icon: 'incident',
        title: 'Sharps + autoclave log',
        desc: 'Sharps disposal, autoclave cycle, and instrument traceability captured per visit. Infection-control inspection becomes a one-export task.',
      },
    ],
    faqs: [
      {
        q: 'Does Salvia cover CORU podiatry standards?',
        a: 'Yes. The Podiatrists Registration Board (CORU) Code of Professional Conduct & Ethics requires structured records covering assessment, treatment, and outcome. Salvia’s podiatric assessment template and wound register cover the requirement.',
      },
      {
        q: 'How is the diabetic foot pathway handled?',
        a: 'Vascular + neurological assessment, risk stratification, wound register with photo support, and review-cadence prompts. The pathway record is what diabetes-foot audit programmes look for.',
      },
      {
        q: 'Infection control + sharps record?',
        a: 'Sharps disposal logged per visit. Autoclave cycle ID linked to procedures performed. Instrument traceability evidenced for any HCPC, AHPRA, or HSE inspection.',
      },
      {
        q: 'Can it handle nail surgery with consent + post-op?',
        a: 'Yes. Procedure-specific consent (PNA, TNA, matricectomy), intra-op record, post-op review with infection check, and discharge summary — all locked to the patient record.',
      },
      {
        q: 'Multi-site mobile podiatry?',
        a: 'Yes. Records are clinician + location tagged. Mobile clinicians work offline; sync on reconnect. The audit trail captures every visit regardless of location.',
      },
    ],
    recentPosts: [
      { slug: 'coru-podiatry-records', title: 'CORU Podiatry Code: assessment, treatment, outcome — what to evidence', tag: 'CORU' },
      { slug: 'diabetic-foot-pathway', title: 'The diabetic foot pathway: what your records have to show', tag: 'Clinical' },
    ],
    metaTitle: 'Podiatry Practice Software — CORU, HCPC, AHPRA Records',
    metaDescription:
      'Salvia keeps podiatry records audit-ready for CORU, HCPC, AHPRA Podiatry Board and PBNZ. Voice note → assessment, wound register, sharps log, consent, treatment record.',
    metaKeywords: [
      'podiatry software', 'podiatrist records software', 'CORU podiatry',
      'HCPC podiatry records', 'AHPRA podiatrist', 'podiatry wound register',
      'diabetic foot software', 'podiatry sharps log',
    ],
  },

  // ── Speech & Language Therapy ───────────────────────────────────
  {
    slug: 'speech-therapy',
    key: 'speech',
    name: 'Speech & Language Therapy',
    shortName: 'Speech',
    pluralLowercase: 'therapists',
    accent: '#6366F1',
    accentSoft: 'rgba(99,102,241,0.07)',
    heroBadge: 'Allied Health · Speech & Language Therapy',
    heroHeadline: ['Therapy records,', 'goal-by-goal.'],
    heroSubtitle:
      'CORU. HCPC. SPA. ASHA. Salvia structures the assessment, goals, intervention, and progress review — under the framework your regulator or association expects.',
    regulators: [
      { countryCode: 'IE', country: 'Ireland',        body: 'CORU', bodyFull: 'Speech & Language Therapists Registration Board', color: '#0891B2' },
      { countryCode: 'UK', country: 'United Kingdom', body: 'HCPC', bodyFull: 'Health & Care Professions Council',               color: '#FF4E00' },
      { countryCode: 'AU', country: 'Australia',      body: 'SPA',  bodyFull: 'Speech Pathology Australia (self-regulated)',     color: '#F59E0B' },
      { countryCode: 'NZ', country: 'New Zealand',    body: 'NZSTA',bodyFull: 'New Zealand Speech-language Therapists’ Association', color: '#10B981' },
      { countryCode: 'US', country: 'United States',  body: 'ASHA', bodyFull: 'American Speech-Language-Hearing Association + state licensure', color: '#6366F1' },
    ],
    features: [
      ...COMMON_FEATURES('speech therapy', 'clinician'),
      {
        icon: 'framework',
        title: 'Goal-bank + progress tracking',
        desc: 'Goal templates per condition (articulation, fluency, AAC, swallowing). Progress measured per session, tracked across episode of care.',
      },
    ],
    faqs: [
      {
        q: 'Does Salvia satisfy CORU speech and language therapy records?',
        a: 'Yes. The Speech & Language Therapists Registration Board (CORU) Code of Professional Conduct & Ethics requires structured, contemporaneous records. Salvia’s assessment → goal → intervention → review format covers the requirement.',
      },
      {
        q: 'HCPC Standards for SLTs?',
        a: 'Yes. HCPC Standards of Proficiency for SLTs Standard 9 (record keeping) maps to Salvia’s record format. Each entry attributed to the registered clinician; audit trail evidences contemporaneity.',
      },
      {
        q: 'Can it capture AAC assessments and voice samples?',
        a: 'Voice samples can be uploaded and linked to the session record. AAC assessment templates (device trials, communication partner training, evaluation) are structured first-class fields.',
      },
      {
        q: 'School-based caseload?',
        a: 'Yes. Caseload management by school + classroom. Long-term goals + short-term objectives, parent and teacher communications, IEP review notes — all linked to the student record.',
      },
      {
        q: 'NDIS reports in Australia?',
        a: 'Salvia generates the clinical record. NDIS-aligned reports can be exported from the structured record — assessment summary, goals, progress evidence, recommendations.',
      },
    ],
    recentPosts: [
      { slug: 'coru-slt-records', title: 'CORU SLT Code: the record-keeping clauses', tag: 'CORU' },
      { slug: 'hcpc-slt-sop', title: 'HCPC SoP for SLTs: Standard 9 in practice', tag: 'HCPC' },
    ],
    metaTitle: 'Speech Therapy Software — CORU, HCPC, SPA, ASHA',
    metaDescription:
      'Salvia keeps speech and language therapy records audit-ready for CORU, HCPC, SPA, NZSTA and ASHA. Voice note → assessment, goals, intervention, progress review.',
    metaKeywords: [
      'speech therapy software', 'SLT records software', 'CORU speech therapy',
      'HCPC SLT records', 'SPA speech pathology', 'speech pathology Australia software',
      'AAC assessment software', 'speech therapy goals software',
    ],
  },
];

export function getDisciplineBySlug(slug: string): AlliedDiscipline | undefined {
  return ALLIED_DISCIPLINES.find((d) => d.slug === slug);
}

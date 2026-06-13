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
      'NCAHP. RCI. ABDM. DPDP Act. One voice note per session — Salvia handles the SOAP record, outcome scales, treatment log, discharge summary, and audit trail.',
    regulators: [
      { countryCode: 'IN', country: 'India', body: 'NCAHP',  bodyFull: 'National Commission for Allied & Healthcare Professions',  color: '#0891B2' },
      { countryCode: 'IN', country: 'India', body: 'Physio Council', bodyFull: 'Physiotherapy Professional Council (under NCAHP)',  color: '#FF4E00' },
      { countryCode: 'IN', country: 'India', body: 'RCI',    bodyFull: 'Rehabilitation Council of India',                        color: '#F59E0B' },
      { countryCode: 'IN', country: 'India', body: 'NABH',   bodyFull: 'National Accreditation Board for Hospitals & Healthcare',  color: '#10B981' },
      { countryCode: 'IN', country: 'India', body: 'ABDM',   bodyFull: 'Ayushman Bharat Digital Mission',                        color: '#6366F1' },
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
        q: 'Is Salvia NCAHP-aware for Indian physios?',
        a: 'Yes. The National Commission for Allied & Healthcare Professions (NCAHP) Act and its profession-specific councils expect contemporaneous, legible, attributable records. Salvia’s structured records, immutable timestamps, and per-clinician sign-off cover those expectations out of the box.',
      },
      {
        q: 'Does it cover Clinical Establishments Act record-keeping?',
        a: 'Yes. The Clinical Establishments Act and ABDM record-keeping expectations map directly to Salvia’s structured records and audit trail. Every session note carries the clinician’s registration and a locked timestamp.',
      },
      {
        q: 'How do outcome measures work?',
        a: 'The common physiotherapy scales (NPRS, ODI, NDI, LEFS, PSFS, DASH) are first-class field types. Score at intake, repeat at review, and Salvia plots the trend. Episode-level outcome change appears on the discharge summary automatically.',
      },
      {
        q: 'Does it handle MSK private-practice billing notes?',
        a: 'Salvia produces the clinical record — what was assessed, what was done, response, plan. It does not bill insurers directly; it generates the documentation that insurers and cashless-claim (₹) audits actually look for.',
      },
      {
        q: 'What about MDT clinics with sports doctors and physios?',
        a: 'Role-based access. Sports doctor sees the medical layer, physios see the physio layer, admin sees scheduling. Records are attributed to whoever signed them — registration number on every entry.',
      },
    ],
    recentPosts: [],
    metaTitle: 'Physiotherapy Compliance Software — NCAHP, RCI, ABDM, NABH',
    metaDescription:
      'Salvia keeps physiotherapy records audit-ready for NCAHP, RCI, ABDM and the Clinical Establishments Act. Voice note after each session — SOAP record, outcome measures, treatment log, discharge summary out the other side.',
    metaKeywords: [
      'physiotherapy compliance software', 'physio records software India', 'NCAHP physiotherapy records',
      'physiotherapy council records', 'physiotherapy SOAP notes', 'physio outcome measures software',
      'RCI physiotherapy', 'ABDM records', 'physiotherapy audit trail',
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
      'NCAHP. NABH. Clinical Establishments Act. Salvia captures the case history, examination, treatment, and outcome — all under your regulator’s record-keeping requirements.',
    regulators: [
      { countryCode: 'IN', country: 'India', body: 'NCAHP',  bodyFull: 'National Commission for Allied & Healthcare Professions', color: '#8B5CF6' },
      { countryCode: 'IN', country: 'India', body: 'NABH',   bodyFull: 'National Accreditation Board for Hospitals & Healthcare', color: '#F59E0B' },
      { countryCode: 'IN', country: 'India', body: 'ABDM',   bodyFull: 'Ayushman Bharat Digital Mission',                       color: '#10B981' },
      { countryCode: 'IN', country: 'India', body: 'CEA',    bodyFull: 'Clinical Establishments (Registration & Regulation) Act', color: '#0891B2',
        note: 'Osteopathy is not yet a statutorily licensed profession in India; manual-therapy practice standards followed in the interim.' },
      { countryCode: 'IN', country: 'India', body: 'DPDP',   bodyFull: 'Digital Personal Data Protection Act',                  color: '#6366F1' },
    ],
    features: [
      ...COMMON_FEATURES('osteopathic', 'clinician'),
      {
        icon: 'framework',
        title: 'Practice-standard-aligned record format',
        desc: 'Case history, examination findings, working diagnosis, treatment, response — the structured record format manual-therapy practice standards and Clinical Establishments Act expect.',
      },
    ],
    faqs: [
      {
        q: 'Does Salvia satisfy manual-therapy practice-standard record-keeping?',
        a: 'Yes. Practice standards on patient partnership and record keeping require structured, contemporaneous, identifiable records. Salvia’s case-history → examination → diagnosis → treatment record format and immutable audit trail are designed for it.',
      },
      {
        q: 'What about Clinical Establishments Act record-keeping guidelines?',
        a: 'Yes. The Clinical Establishments Act record and informed-consent requirements map to Salvia’s consent + treatment record + audit trail. Records remain accessible for the retention period your state mandates.',
      },
      {
        q: 'How is treatment captured — manual technique narrative?',
        a: 'Voice-note the session. Salvia maps the audio to a structured treatment record: areas treated, techniques used, response, plan for next visit. Free-text where it matters; structured where the record demands it.',
      },
      {
        q: 'Is the evolving statutory landscape in India a concern?',
        a: 'Osteopathy is not yet a separately licensed allied-health profession in India. Until council recognition arrives, Salvia follows accepted manual-therapy practice standards. The audit trail and structured records will transfer cleanly to whatever the NCAHP eventually mandates.',
      },
      {
        q: 'Cranial, structural, visceral — can the record reflect approach?',
        a: 'Yes. The treatment record captures the approach used per session. Useful both for clinical continuity and for satisfying inspection questions about your scope of practice.',
      },
    ],
    recentPosts: [],
    metaTitle: 'Osteopathy Practice Software — NCAHP, NABH, ABDM Aligned',
    metaDescription:
      'Salvia generates osteopathy records aligned with manual-therapy practice standards, the Clinical Establishments Act, and ABDM requirements. Voice note → structured treatment record.',
    metaKeywords: [
      'osteopathy software', 'osteopathy compliance', 'osteopathy records India',
      'manual therapy India', 'clinical establishments act osteopathy', 'osteopathy practice management',
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
      'NCAHP. NABH. Clinical Establishments Act. Salvia structures the case history, exam, imaging review, plan, and visit notes — under the record-keeping standards Indian regulators expect.',
    regulators: [
      { countryCode: 'IN', country: 'India', body: 'NCAHP',  bodyFull: 'National Commission for Allied & Healthcare Professions', color: '#F97316' },
      { countryCode: 'IN', country: 'India', body: 'NABH',   bodyFull: 'National Accreditation Board for Hospitals & Healthcare', color: '#F59E0B' },
      { countryCode: 'IN', country: 'India', body: 'ABDM',   bodyFull: 'Ayushman Bharat Digital Mission',                       color: '#10B981' },
      { countryCode: 'IN', country: 'India', body: 'DPDP',   bodyFull: 'Digital Personal Data Protection Act',                  color: '#6366F1' },
      { countryCode: 'IN', country: 'India', body: 'CEA',    bodyFull: 'Clinical Establishments (Registration & Regulation) Act', color: '#0891B2',
        note: 'Chiropractic is not yet a separately licensed council profession in India; accepted practice standards followed in the interim.' },
    ],
    features: [
      ...COMMON_FEATURES('chiropractic', 'clinician'),
      {
        icon: 'framework',
        title: 'Imaging review + treatment plan log',
        desc: 'X-ray request, report, and treatment-plan rationale captured together — the structured record-keeping the Clinical Establishments Act expects out of the box.',
      },
    ],
    faqs: [
      {
        q: 'Does Salvia meet Clinical Establishments Act record-keeping requirements?',
        a: 'Yes. The Clinical Establishments Act and accepted practice standards require legible, accurate, contemporaneous records covering history, examination, diagnosis, plan, and visit notes. Salvia’s structured record format and immutable audit trail cover the standard.',
      },
      {
        q: 'How is informed consent for adjustments captured?',
        a: 'Procedure-specific consent templates with risk disclosure and patient signature, locked to the visit record. Re-consent prompts for material change in treatment plan.',
      },
      {
        q: 'Can imaging requests be tracked?',
        a: 'Yes. Imaging request, indication, report received, and treatment-plan change captured in one log per patient. Useful for both clinical continuity and for Clinical Establishments Act record requirements.',
      },
      {
        q: 'Guidance on advertising and records under Indian rules?',
        a: 'Salvia handles the record-keeping side: structured visit notes, consent, treatment plan rationale. Advertising compliance is your obligation; Salvia stays out of marketing claims.',
      },
      {
        q: 'Multi-chiropractor practice with locums?',
        a: 'Role-based access. Each chiropractor signs their own records with their registration number. Locum visits are clearly attributed for any audit.',
      },
    ],
    recentPosts: [],
    metaTitle: 'Chiropractic Practice Software — NCAHP, NABH, ABDM Records',
    metaDescription:
      'Salvia generates chiropractic records aligned with NCAHP, the Clinical Establishments Act, and ABDM. Voice note → structured adjustment record, imaging log, consent, audit trail.',
    metaKeywords: [
      'chiropractic software', 'chiropractic compliance India', 'chiropractic records India',
      'NCAHP chiropractor', 'clinical establishments act chiropractic', 'chiropractic SOAP notes',
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
      'NCAHP. RCI. NABH. ABDM. Salvia handles intake, functional assessment, goal-setting, intervention, and outcome review — under your regulator’s standards.',
    regulators: [
      { countryCode: 'IN', country: 'India', body: 'NCAHP',  bodyFull: 'National Commission for Allied & Healthcare Professions', color: '#0891B2' },
      { countryCode: 'IN', country: 'India', body: 'OT Council', bodyFull: 'Occupational Therapy Professional Council (under NCAHP)', color: '#FF4E00' },
      { countryCode: 'IN', country: 'India', body: 'RCI',    bodyFull: 'Rehabilitation Council of India',                      color: '#F59E0B' },
      { countryCode: 'IN', country: 'India', body: 'NABH',   bodyFull: 'National Accreditation Board for Hospitals & Healthcare', color: '#10B981' },
      { countryCode: 'IN', country: 'India', body: 'ABDM',   bodyFull: 'Ayushman Bharat Digital Mission',                       color: '#6366F1' },
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
        q: 'Is Salvia NCAHP-aligned for Indian OTs?',
        a: 'Yes. The NCAHP and its Occupational Therapy Professional Council expect contemporaneous, attributable records. Salvia’s structured assessment → goal → intervention → review format covers the requirement.',
      },
      {
        q: 'Clinical Establishments Act record-keeping for OT?',
        a: 'Yes. Clinical Establishments Act and RCI rehabilitation record-keeping expectations map to Salvia’s record format. Clinician registration appears on every record; immutable audit trail evidences contemporaneity.',
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
        q: 'Disability and rehabilitation scheme documentation in India?',
        a: 'Salvia generates the clinical record — what was assessed, intervention, progress against goals, recommendation. RCI- and scheme-aligned reports can be exported from the structured record without separate templates.',
      },
    ],
    recentPosts: [],
    metaTitle: 'Occupational Therapy Software — NCAHP, RCI, NABH, ABDM',
    metaDescription:
      'Salvia keeps OT records audit-ready for NCAHP, RCI, NABH and ABDM. Voice note → functional assessment, goals, intervention, outcome review.',
    metaKeywords: [
      'occupational therapy software', 'OT records software', 'NCAHP OT records',
      'RCI occupational therapy', 'OT council India', 'ABDM records',
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
      'NCAHP. NABH. ABDM. Clinical Establishments Act. Salvia handles assessment, wound register, nail care, sharps log, treatment record, and audit trail — under your regulator.',
    regulators: [
      { countryCode: 'IN', country: 'India', body: 'NCAHP',  bodyFull: 'National Commission for Allied & Healthcare Professions', color: '#0891B2' },
      { countryCode: 'IN', country: 'India', body: 'Podiatry Council', bodyFull: 'Podiatry Professional Council (under NCAHP)', color: '#FF4E00' },
      { countryCode: 'IN', country: 'India', body: 'NABH',   bodyFull: 'National Accreditation Board for Hospitals & Healthcare', color: '#F59E0B' },
      { countryCode: 'IN', country: 'India', body: 'ABDM',   bodyFull: 'Ayushman Bharat Digital Mission',                       color: '#10B981' },
      { countryCode: 'IN', country: 'India', body: 'CEA',    bodyFull: 'Clinical Establishments (Registration & Regulation) Act', color: '#6366F1' },
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
        q: 'Does Salvia cover NCAHP podiatry standards?',
        a: 'Yes. The NCAHP and its Podiatry Professional Council expect structured records covering assessment, treatment, and outcome. Salvia’s podiatric assessment template and wound register cover the requirement.',
      },
      {
        q: 'How is the diabetic foot pathway handled?',
        a: 'Vascular + neurological assessment, risk stratification, wound register with photo support, and review-cadence prompts. The pathway record is what diabetes-foot audit programmes look for.',
      },
      {
        q: 'Infection control + sharps record?',
        a: 'Sharps disposal logged per visit. Autoclave cycle ID linked to procedures performed. Instrument traceability evidenced for any NABH, Clinical Establishments Act, or Bio-Medical Waste inspection.',
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
    recentPosts: [],
    metaTitle: 'Podiatry Practice Software — NCAHP, NABH, ABDM Records',
    metaDescription:
      'Salvia keeps podiatry records audit-ready for NCAHP, NABH, ABDM and the Clinical Establishments Act. Voice note → assessment, wound register, sharps log, consent, treatment record.',
    metaKeywords: [
      'podiatry software', 'podiatrist records software', 'NCAHP podiatry',
      'podiatry records India', 'podiatry council India', 'podiatry wound register',
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
      'NCAHP. RCI. NABH. ABDM. Salvia structures the assessment, goals, intervention, and progress review — under the framework your regulator or council expects.',
    regulators: [
      { countryCode: 'IN', country: 'India', body: 'NCAHP', bodyFull: 'National Commission for Allied & Healthcare Professions', color: '#0891B2' },
      { countryCode: 'IN', country: 'India', body: 'SLP Council', bodyFull: 'Speech-Language Pathology Professional Council (under NCAHP)', color: '#FF4E00' },
      { countryCode: 'IN', country: 'India', body: 'RCI',   bodyFull: 'Rehabilitation Council of India',                       color: '#F59E0B' },
      { countryCode: 'IN', country: 'India', body: 'NABH',  bodyFull: 'National Accreditation Board for Hospitals & Healthcare', color: '#10B981' },
      { countryCode: 'IN', country: 'India', body: 'ABDM',  bodyFull: 'Ayushman Bharat Digital Mission',                       color: '#6366F1' },
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
        q: 'Does Salvia satisfy NCAHP speech and language therapy records?',
        a: 'Yes. The NCAHP and its Speech-Language Pathology Professional Council expect structured, contemporaneous records. Salvia’s assessment → goal → intervention → review format covers the requirement.',
      },
      {
        q: 'RCI and Clinical Establishments Act standards for SLPs?',
        a: 'Yes. RCI rehabilitation record-keeping and Clinical Establishments Act expectations map to Salvia’s record format. Each entry attributed to the registered clinician; audit trail evidences contemporaneity.',
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
        q: 'Disability and rehabilitation scheme reports in India?',
        a: 'Salvia generates the clinical record. RCI- and scheme-aligned reports can be exported from the structured record — assessment summary, goals, progress evidence, recommendations.',
      },
    ],
    recentPosts: [],
    metaTitle: 'Speech Therapy Software — NCAHP, RCI, NABH, ABDM',
    metaDescription:
      'Salvia keeps speech and language therapy records audit-ready for NCAHP, RCI, NABH and ABDM. Voice note → assessment, goals, intervention, progress review.',
    metaKeywords: [
      'speech therapy software', 'SLP records software', 'NCAHP speech therapy',
      'RCI speech therapy', 'speech-language pathology India', 'SLP council India',
      'AAC assessment software', 'speech therapy goals software',
    ],
  },
];

export function getDisciplineBySlug(slug: string): AlliedDiscipline | undefined {
  return ALLIED_DISCIPLINES.find((d) => d.slug === slug);
}

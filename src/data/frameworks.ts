// Public catalog of every regulatory framework Salvia generates
// records against. Surfaces on /frameworks for SEO + trust; the
// same shape is mirrored by the in-app `cmd/build-framework-catalog`
// CLI when we Vertex-AI-generate richer clause data.
//
// Each entry is hand-curated for now. Long-term plan: AI-generated
// drafts reviewed quarterly. currency_date marks when the entry was
// last verified against the regulator's published standards.

export type FrameworkCountry = 'IE' | 'GB' | 'AU' | 'NZ' | 'US' | 'EU' | 'Global';
export type FrameworkVertical = 'vet' | 'dental' | 'gp' | 'allied';
export type FrameworkDiscipline =
  | 'physio'
  | 'osteo'
  | 'chiro'
  | 'ot'
  | 'podiatry'
  | 'speech';

export type FrameworkCategory =
  | 'professional-conduct'
  | 'records'
  | 'inspection'
  | 'billing'
  | 'safety'
  | 'consent'
  | 'data-protection';

export interface Framework {
  code: string;
  fullName: string;
  country: FrameworkCountry;
  verticals: FrameworkVertical[];
  disciplines?: FrameworkDiscipline[];
  category: FrameworkCategory;
  summary: string;
  sourceUrl?: string;
  currencyDate: string; // ISO date
}

export const COUNTRY_META: Record<FrameworkCountry, { label: string; accent: string; flag: string }> = {
  IE:     { label: 'Ireland',          accent: '#0891B2', flag: '🇮🇪' },
  GB:     { label: 'United Kingdom',   accent: '#FF4E00', flag: '🇬🇧' },
  AU:     { label: 'Australia',        accent: '#F59E0B', flag: '🇦🇺' },
  NZ:     { label: 'New Zealand',      accent: '#10B981', flag: '🇳🇿' },
  US:     { label: 'United States',    accent: '#6366F1', flag: '🇺🇸' },
  EU:     { label: 'European Union',   accent: '#8B5CF6', flag: '🇪🇺' },
  Global: { label: 'Global',           accent: '#64748B', flag: '🌐' },
};

export const VERTICAL_META: Record<FrameworkVertical, { label: string; accent: string; slug: string }> = {
  vet:     { label: 'Veterinary',       accent: '#FF4E00', slug: '/veterinary' },
  dental:  { label: 'Dental',           accent: '#10B981', slug: '/dental' },
  gp:      { label: 'General Practice', accent: '#D97706', slug: '/general-practice' },
  allied:  { label: 'Allied Health',    accent: '#0891B2', slug: '/allied-health' },
};

export const DISCIPLINE_META: Record<FrameworkDiscipline, { label: string; slug: string; accent: string }> = {
  physio:   { label: 'Physiotherapy',          slug: '/physiotherapy',         accent: '#0891B2' },
  osteo:    { label: 'Osteopathy',             slug: '/osteopathy',            accent: '#8B5CF6' },
  chiro:    { label: 'Chiropractic',           slug: '/chiropractic',          accent: '#F97316' },
  ot:       { label: 'Occupational Therapy',   slug: '/occupational-therapy',  accent: '#EC4899' },
  podiatry: { label: 'Podiatry',               slug: '/podiatry',              accent: '#06B6D4' },
  speech:   { label: 'Speech & Language',      slug: '/speech-therapy',        accent: '#6366F1' },
};

export const FRAMEWORKS: Framework[] = [
  // ── Veterinary ─────────────────────────────────────────────────
  {
    code: 'RCVS PSS',
    fullName: 'RCVS Practice Standards Scheme',
    country: 'GB', verticals: ['vet'],
    category: 'inspection',
    summary: 'Royal College of Veterinary Surgeons Practice Standards — clinical records, drug control, consent, premises, professional behaviour. Assessor visits validate compliance.',
    sourceUrl: 'https://www.rcvs.org.uk/setting-standards/practice-standards-scheme/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'CMA Remedies',
    fullName: 'UK Competition and Markets Authority — Veterinary Sector Final Report 2026',
    country: 'GB', verticals: ['vet'],
    category: 'billing',
    summary: 'Twenty-one CMA remedies binding from 23 September 2026. Records-implicated: itemised billing, written treatment estimates, controlled drug dispensing transparency, complaint audit trails.',
    sourceUrl: 'https://www.gov.uk/cma-cases/veterinary-services',
    currencyDate: '2026-04-15',
  },
  {
    code: 'VMR',
    fullName: 'Veterinary Medicines Regulations (UK)',
    country: 'GB', verticals: ['vet'],
    category: 'safety',
    summary: 'Prescribing and dispensing requirements for veterinary medicines including Schedule 2 and 3 controlled drugs. Register, witness, balance, retention.',
    currencyDate: '2026-04-15',
  },
  {
    code: 'VCNZ Code',
    fullName: 'Veterinary Council of New Zealand Code of Professional Conduct (2024)',
    country: 'NZ', verticals: ['vet'],
    category: 'professional-conduct',
    summary: 'Contemporaneous, attributable, structured records. Drug administration, consent, fee transparency. NZ pilot beachhead market.',
    sourceUrl: 'https://www.vetcouncil.org.nz/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'AVA',
    fullName: 'Australian Veterinary Association Code of Professional Conduct',
    country: 'AU', verticals: ['vet'],
    category: 'professional-conduct',
    summary: 'Record-keeping, consent, drug control standards for AU vet practices. Supplements state Veterinary Practitioners Boards (VPB).',
    currencyDate: '2026-04-15',
  },
  {
    code: 'VPB',
    fullName: 'Veterinary Practitioners Boards — Victoria, NSW, Queensland',
    country: 'AU', verticals: ['vet'],
    category: 'inspection',
    summary: 'State-level vet practitioner registration and records inspection. Complaints handling, documentation standards.',
    currencyDate: '2026-04-15',
  },
  {
    code: 'VCI',
    fullName: 'Veterinary Council of Ireland Code of Professional Conduct',
    country: 'IE', verticals: ['vet'],
    category: 'professional-conduct',
    summary: 'Statutory regulator for Irish vets under the Veterinary Practice Act 2005. Contemporaneous records, informed consent, controlled drug register (5-year retention), and GDPR-compliant data practices. 7-year record retention.',
    sourceUrl: 'https://www.vci.ie/',
    currencyDate: '2026-05-27',
  },
  {
    code: 'AVMA',
    fullName: 'American Veterinary Medical Association Standards',
    country: 'US', verticals: ['vet'],
    category: 'professional-conduct',
    summary: 'AVMA medical records guidelines + AVMA PLIT insurance standards. State practice acts layer additional requirements.',
    currencyDate: '2026-04-15',
  },
  {
    code: 'AAHA',
    fullName: 'American Animal Hospital Association',
    country: 'US', verticals: ['vet'],
    category: 'inspection',
    summary: 'Voluntary accreditation standard widely adopted by US small-animal practices. Records, anaesthesia, surgery, dental, pharmacy.',
    currencyDate: '2026-04-15',
  },

  // ── Dental ────────────────────────────────────────────────────
  {
    code: 'CQC Reg 17',
    fullName: 'Care Quality Commission Regulation 17 (UK Dental)',
    country: 'GB', verticals: ['dental', 'gp'],
    category: 'records',
    summary: 'Good governance — accurate, complete, contemporaneous records securely kept. Inspector checks for BPE scoring at every check-up, soft-tissue examination, radiograph justification.',
    sourceUrl: 'https://www.cqc.org.uk/guidance-providers/regulations/regulation-17-good-governance',
    currencyDate: '2026-04-15',
  },
  {
    code: 'GDC',
    fullName: 'General Dental Council Standards (UK)',
    country: 'GB', verticals: ['dental'],
    category: 'professional-conduct',
    summary: 'Standards 4 (good record-keeping with cost estimate), 1 (consent), 2 (communication). Statutory regulator for UK dental professionals.',
    sourceUrl: 'https://www.gdc-uk.org/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'AHPRA Dental',
    fullName: 'Dental Board of Australia (AHPRA)',
    country: 'AU', verticals: ['dental'],
    category: 'professional-conduct',
    summary: 'Code of Conduct for dental practitioners. Contemporaneous notes, medical history reviewed every visit, written treatment plans with costs before treatment.',
    sourceUrl: 'https://www.dentalboard.gov.au/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'ARPANSA',
    fullName: 'Australian Radiation Protection and Nuclear Safety Agency',
    country: 'AU', verticals: ['dental'],
    category: 'safety',
    summary: 'Radiograph justification, dose recording, exposure log. Every radiograph requires documented clinical indication at time of exposure.',
    sourceUrl: 'https://www.arpansa.gov.au/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'NZDA',
    fullName: 'New Zealand Dental Council',
    country: 'NZ', verticals: ['dental'],
    category: 'professional-conduct',
    summary: 'Standards Framework for dental practitioners — record-keeping, informed consent, radiography justification, infection control.',
    currencyDate: '2026-04-15',
  },
  {
    code: 'DCI',
    fullName: 'Dental Council of Ireland — Standards Guidance for Dental Practitioners',
    country: 'IE', verticals: ['dental'],
    category: 'professional-conduct',
    summary: 'Statutory regulator under the Dentists Act 1985. Contemporaneous records, radiograph justification, BPE score at every adult check-up, written consent for irreversible procedures, and GDPR compliance. 10-year retention for minor patients.',
    sourceUrl: 'https://www.dentalcouncil.ie/',
    currencyDate: '2026-05-27',
  },
  {
    code: 'ADA CDT',
    fullName: 'American Dental Association Current Dental Terminology',
    country: 'US', verticals: ['dental'],
    category: 'billing',
    summary: 'Procedure-code standard for billing and clinical records. Mandatory for insurance claims; integrates with treatment-plan documentation.',
    currencyDate: '2026-04-15',
  },

  // ── General Practice ─────────────────────────────────────────
  {
    code: 'AHPRA Medical',
    fullName: 'Medical Board of Australia (AHPRA)',
    country: 'AU', verticals: ['gp'],
    category: 'professional-conduct',
    summary: 'Good Medical Practice code — record-keeping (Section 8.4), consent, prescribing, locum attribution. Statutory regulator for AU doctors.',
    sourceUrl: 'https://www.medicalboard.gov.au/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'MCNZ',
    fullName: 'Medical Council of New Zealand Code of Professional Conduct',
    country: 'NZ', verticals: ['gp'],
    category: 'professional-conduct',
    summary: 'Contemporaneous record requirements. Doctors registered under the HPCA Act 2003 must keep records of the standard expected by their peers.',
    sourceUrl: 'https://www.mcnz.org.nz/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'RACGP',
    fullName: 'Royal Australian College of General Practitioners Standards (5th edition)',
    country: 'AU', verticals: ['gp'],
    category: 'inspection',
    summary: 'Standards for general practices used in accreditation. Health record content, sharing, security, retention.',
    sourceUrl: 'https://www.racgp.org.au/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'BESTPRACTICE',
    fullName: 'BestPractice Decision Support (NZ)',
    country: 'NZ', verticals: ['gp'],
    category: 'safety',
    summary: 'Clinical decision support and audit framework integrated with NZ GP records. Documentation standards align with MCNZ and HDC requirements.',
    currencyDate: '2026-04-15',
  },
  {
    code: 'MCI',
    fullName: 'Medical Council of Ireland — Guide to Professional Conduct and Ethics',
    country: 'IE', verticals: ['gp'],
    category: 'professional-conduct',
    summary: 'Statutory regulator under the Medical Practitioners Act 2007. Contemporaneous, attributable records; documented informed consent for material-risk treatments; prescribing rationale including off-label use; referral documentation; GDPR compliance. 8-year retention.',
    sourceUrl: 'https://www.medicalcouncil.ie/',
    currencyDate: '2026-05-27',
  },
  {
    code: 'HIPAA',
    fullName: 'Health Insurance Portability and Accountability Act (US)',
    country: 'US', verticals: ['gp', 'dental', 'allied'],
    category: 'data-protection',
    summary: 'Privacy + Security Rules for Protected Health Information. Applies to covered entities and business associates. AI-generated notes are PHI.',
    sourceUrl: 'https://www.hhs.gov/hipaa/',
    currencyDate: '2026-04-15',
  },

  // ── Allied — Multi-discipline regulators ────────────────────
  {
    code: 'CORU',
    fullName: 'Health and Social Care Professionals Council (Ireland)',
    country: 'IE', verticals: ['allied'],
    disciplines: ['physio', 'ot', 'podiatry', 'speech'],
    category: 'professional-conduct',
    summary: 'Statutory regulator for Irish allied health professionals. Registration boards for physiotherapists, occupational therapists, podiatrists, speech & language therapists. Codes of Professional Conduct & Ethics specify record-keeping clauses.',
    sourceUrl: 'https://www.coru.ie/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'HCPC',
    fullName: 'Health & Care Professions Council (UK)',
    country: 'GB', verticals: ['allied'],
    disciplines: ['physio', 'ot', 'podiatry', 'speech'],
    category: 'professional-conduct',
    summary: 'UK regulator for 15 allied health professions. Standards of Conduct, Performance and Ethics (Standard 10 — record keeping) and discipline-specific Standards of Proficiency.',
    sourceUrl: 'https://www.hcpc-uk.org/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'AHPRA Physio',
    fullName: 'Physiotherapy Board of Australia (AHPRA)',
    country: 'AU', verticals: ['allied'],
    disciplines: ['physio'],
    category: 'professional-conduct',
    summary: 'Code of Conduct for Registered Physiotherapists. Records, consent, scope of practice, advertising.',
    sourceUrl: 'https://www.physiotherapyboard.gov.au/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'AHPRA OT',
    fullName: 'Occupational Therapy Board of Australia (AHPRA)',
    country: 'AU', verticals: ['allied'],
    disciplines: ['ot'],
    category: 'professional-conduct',
    summary: 'Code of Conduct + Continuing Professional Development standards for Australian OTs.',
    sourceUrl: 'https://www.occupationaltherapyboard.gov.au/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'AHPRA Osteo',
    fullName: 'Osteopathy Board of Australia (AHPRA)',
    country: 'AU', verticals: ['allied'],
    disciplines: ['osteo'],
    category: 'professional-conduct',
    summary: 'Code of Conduct for Osteopaths (March 2022) — section 8.4 medical records, section 5.2 informed consent.',
    sourceUrl: 'https://www.osteopathyboard.gov.au/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'AHPRA Chiro',
    fullName: 'Chiropractic Board of Australia (AHPRA)',
    country: 'AU', verticals: ['allied'],
    disciplines: ['chiro'],
    category: 'professional-conduct',
    summary: 'Code of Conduct + advertising guidelines for chiropractors. Records, consent for adjustments, treatment plan rationale.',
    sourceUrl: 'https://www.chiropracticboard.gov.au/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'AHPRA Podiatry',
    fullName: 'Podiatry Board of Australia (AHPRA)',
    country: 'AU', verticals: ['allied'],
    disciplines: ['podiatry'],
    category: 'professional-conduct',
    summary: 'Code of Conduct for podiatrists. Records, wound care, infection control, scope including podiatric surgeons.',
    sourceUrl: 'https://www.podiatryboard.gov.au/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'PBNZ',
    fullName: 'Physiotherapy Board of New Zealand',
    country: 'NZ', verticals: ['allied'],
    disciplines: ['physio'],
    category: 'professional-conduct',
    summary: 'Profession-specific board under the Health Practitioners Competence Assurance Act 2003. Standards of clinical and professional behaviour.',
    sourceUrl: 'https://www.physioboard.org.nz/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'OTBNZ',
    fullName: 'Occupational Therapy Board of New Zealand',
    country: 'NZ', verticals: ['allied'],
    disciplines: ['ot'],
    category: 'professional-conduct',
    summary: 'HPCA-Act board — OT scope of practice, code of ethics, recertification.',
    sourceUrl: 'https://www.otboard.org.nz/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'OCNZ',
    fullName: 'Osteopathic Council of New Zealand',
    country: 'NZ', verticals: ['allied'],
    disciplines: ['osteo'],
    category: 'professional-conduct',
    summary: 'HPCA-Act board for NZ osteopaths. Code of Ethics, Standards, CPD framework.',
    sourceUrl: 'https://www.osteopathiccouncil.org.nz/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'CBNZ',
    fullName: 'Chiropractic Board of New Zealand',
    country: 'NZ', verticals: ['allied'],
    disciplines: ['chiro'],
    category: 'professional-conduct',
    summary: 'HPCA-Act board for NZ chiropractors. Standards of Ethical and Professional Conduct.',
    sourceUrl: 'https://www.chiropracticboard.org.nz/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'PBNZ Pod',
    fullName: 'Podiatrists Board of New Zealand',
    country: 'NZ', verticals: ['allied'],
    disciplines: ['podiatry'],
    category: 'professional-conduct',
    summary: 'HPCA-Act board for NZ podiatrists. Standards of competence, scope including diabetic foot care.',
    sourceUrl: 'https://www.podiatristsboard.org.nz/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'GOsC',
    fullName: 'General Osteopathic Council (UK)',
    country: 'GB', verticals: ['allied'],
    disciplines: ['osteo'],
    category: 'professional-conduct',
    summary: 'Statutory UK regulator for osteopaths. Osteopathic Practice Standards — Standard D6 (records), B1 (consent), A2 (clinical assessment).',
    sourceUrl: 'https://www.osteopathy.org.uk/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'GCC',
    fullName: 'General Chiropractic Council (UK)',
    country: 'GB', verticals: ['allied'],
    disciplines: ['chiro'],
    category: 'professional-conduct',
    summary: 'Statutory UK regulator for chiropractors. Code (C3 — record keeping, C1 — patient autonomy) and standards of education.',
    sourceUrl: 'https://www.gcc-uk.org/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'SPA',
    fullName: 'Speech Pathology Australia',
    country: 'AU', verticals: ['allied'],
    disciplines: ['speech'],
    category: 'professional-conduct',
    summary: 'Self-regulating peak body for AU speech pathologists. Code of Ethics + Professional Standards. Speech pathology is not under AHPRA.',
    sourceUrl: 'https://www.speechpathologyaustralia.org.au/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'NZSTA',
    fullName: 'New Zealand Speech-language Therapists’ Association',
    country: 'NZ', verticals: ['allied'],
    disciplines: ['speech'],
    category: 'professional-conduct',
    summary: 'Professional association for NZ SLTs. Members commit to Code of Ethics and CPD standards. Statutory HPCA register pending for SLTs.',
    sourceUrl: 'https://www.speechtherapy.org.nz/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'FSBPT',
    fullName: 'Federation of State Boards of Physical Therapy (US)',
    country: 'US', verticals: ['allied'],
    disciplines: ['physio'],
    category: 'professional-conduct',
    summary: 'US national federation of state PT boards. Practice Acts vary by state but share record-keeping and supervision standards.',
    sourceUrl: 'https://www.fsbpt.org/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'NBCOT',
    fullName: 'National Board for Certification in Occupational Therapy (US)',
    country: 'US', verticals: ['allied'],
    disciplines: ['ot'],
    category: 'professional-conduct',
    summary: 'US certification body for OTRs. Code of Conduct and state licensure standards govern records and scope.',
    sourceUrl: 'https://www.nbcot.org/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'NBCE',
    fullName: 'National Board of Chiropractic Examiners (US)',
    country: 'US', verticals: ['allied'],
    disciplines: ['chiro'],
    category: 'professional-conduct',
    summary: 'US licensure exam body for chiropractors. State chiropractic boards layer scope and record-keeping standards.',
    sourceUrl: 'https://www.nbce.org/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'APMA',
    fullName: 'American Podiatric Medical Association',
    country: 'US', verticals: ['allied'],
    disciplines: ['podiatry'],
    category: 'professional-conduct',
    summary: 'Professional body for US podiatric medicine; state podiatry boards layer record-keeping, surgery scope, and infection control standards.',
    sourceUrl: 'https://www.apma.org/',
    currencyDate: '2026-04-15',
  },
  {
    code: 'ASHA',
    fullName: 'American Speech-Language-Hearing Association',
    country: 'US', verticals: ['allied'],
    disciplines: ['speech'],
    category: 'professional-conduct',
    summary: 'US national association for SLTs/audiologists. Certificate of Clinical Competence (CCC-SLP) + state licensure standards govern documentation.',
    sourceUrl: 'https://www.asha.org/',
    currencyDate: '2026-04-15',
  },

];

export const FRAMEWORK_CATEGORY_LABEL: Record<FrameworkCategory, string> = {
  'professional-conduct': 'Professional Conduct',
  'records':              'Records',
  'inspection':           'Inspection',
  'billing':              'Billing & Pricing',
  'safety':               'Clinical Safety',
  'consent':              'Consent',
  'data-protection':      'Data Protection',
};

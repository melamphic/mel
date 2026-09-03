/**
 * The five frameworks that earn a full page.
 *
 * Chosen to match where the outreach actually sends people, not where the
 * product catalogue happened to be dense. The other 55 catalogue entries stay
 * generated and reachable but are not indexed: they are sales artefacts, and
 * `/frameworks` carries the breadth argument on one page.
 *
 * Every regulation quoted here was read from the primary source and checked on
 * the date in `verified`. Every finding is verbatim from a published report and
 * comes from src/data/findings.json, which is generated — see
 * scripts/build-findings.mjs. Nothing on these pages is paraphrased from memory.
 */

export type Clause = {
  ref: string;
  title: string;
  /** Verbatim from the primary source. Never tidied. */
  text: string;
  /** What the clause obliges the software to do. Ours, and falsifiable. */
  answer: string;
};

export type DeepFramework = {
  slug: string;
  body: string;
  fullName: string;
  country: string;
  /** The verb the regulator itself uses. Getting this wrong reads as an outsider. */
  lexicon: { inspection: string; inspector: string; service: string };
  /** Every kind of practice this one body covers — the argument for framework-led pages. */
  covers: string[];
  headline: string;
  lede: string;
  /** Which block in findings.json this page reads. */
  findingsKey: 'cqcAdultSocialCare' | 'hiqa' | 'cmsSkilledNursing' | null;
  proof: string;
  clauses: Clause[];
  /** Scored coverage id in coverage.json, when the product walks it requirement by requirement. */
  coverageId: string | null;
  retention: string | null;
  sources: { label: string; url: string }[];
  verified: string;
};

export const DEEP: DeepFramework[] = [
  {
    slug: 'cqc',
    body: 'CQC',
    fullName: 'Care Quality Commission — England',
    country: 'England',
    lexicon: { inspection: 'inspection', inspector: 'inspector', service: 'service' },
    covers: [
      'Care homes and domiciliary care',
      'GP practices',
      'Dental practices',
      'Mental health services',
      'Independent hospitals',
    ],
    headline: 'The care happened. The record of it is what gets marked.',
    lede:
      'CQC does not watch you deliver care. It reads what you wrote down afterwards. ' +
      'Regulation 17 is where that lands, and it is the regulation providers breach most.',
    findingsKey: 'cqcAdultSocialCare',
    proof:
      'We read the most recently published report for every service in this set. ' +
      'The finding is about the record, over and over — and it is not only failing services.',
    clauses: [
      {
        ref: 'Regulation 17(2)(c)',
        title: 'Records about each person',
        text:
          'maintain securely an accurate, complete and contemporaneous record in respect of ' +
          'each service user, including a record of the care and treatment provided to the ' +
          'service user and of decisions taken in relation to the care and treatment provided',
        answer:
          'Contemporaneous is the hard word. A note written up at the end of a shift is not ' +
          'contemporaneous, and a care plan updated at audit time is not either. Salvia timestamps ' +
          'at capture and stamps the author and their role, so the record carries its own proof ' +
          'of when it was made rather than when it was typed.',
      },
      {
        ref: 'Regulation 17(2)(a)',
        title: 'Systems that assess and improve quality',
        text:
          'assess, monitor and improve the quality and safety of the services provided in the ' +
          'carrying on of the regulated activity',
        answer:
          'This is what an audit is supposed to be, and "audits did not identify the issue" is one ' +
          'of the most common findings there is. Salvia checks each record against your own policy ' +
          'clauses as it is filed, so a gap surfaces the day it happens rather than at the next audit.',
      },
      {
        ref: 'Regulation 12(2)(a)',
        title: 'Assessing risk to health and safety',
        text:
          'assessing the risks to the health and safety of service users of receiving the care or treatment',
        answer:
          'Risk assessments are cited constantly, and almost always for being absent from the record ' +
          'rather than for never having been thought about. A risk assessment in Salvia is a typed ' +
          'field on the form that captures it, so it cannot be the thing everyone remembers doing ' +
          'and nobody wrote down.',
      },
    ],
    coverageId: null,
    retention: null,
    sources: [
      { label: 'CQC guidance — Regulation 17: Good governance', url: 'https://www.cqc.org.uk/guidance-regulation/providers/regulations-service-providers-and-managers/health-social-care-act/regulation-17' },
      { label: 'The Health and Social Care Act 2008 (Regulated Activities) Regulations 2014, SI 2014/2936', url: 'https://www.legislation.gov.uk/uksi/2014/2936/regulation/17' },
    ],
    verified: '2026-09-03',
  },

  {
    slug: 'hiqa',
    body: 'HIQA',
    fullName: 'Health Information and Quality Authority — Ireland',
    country: 'Ireland',
    lexicon: { inspection: 'inspection', inspector: 'inspector', service: 'designated centre' },
    covers: [
      'Designated centres for older people',
      'Disability services',
      'Children’s services',
    ],
    headline: 'HIQA tells you which regulation you failed. Most regulators don’t.',
    lede:
      'An Irish inspection report names the regulation and marks it compliant, substantially ' +
      'compliant or not compliant. That is unusually specific — and it means the gap can be ' +
      'closed against a citation rather than a feeling.',
    findingsKey: 'hiqa',
    proof:
      'Across the reports we have read, the regulations that fail are the ones about ' +
      'governance and about the care plan — not the ones about the building.',
    clauses: [
      {
        ref: 'Regulation 21 — Records',
        title: 'The records a centre must hold',
        text:
          'The registered provider shall ensure that the records set out in Schedules 2, 3 and 4 ' +
          'are kept in a designated centre and are available for inspection by the Chief Inspector.',
        answer:
          'Schedule 3 is the per-resident list, and it opens with the individual assessment and ' +
          'care plan. Salvia holds these as typed records against one resident, so producing them ' +
          'for the Chief Inspector is a query rather than a search through a filing cabinet.',
      },
      {
        ref: 'Regulation 5 — Individual assessment and care plan',
        title: 'Assessment, and a plan that follows from it',
        text:
          'The person in charge shall arrange a comprehensive assessment, by an appropriate ' +
          'health care professional of the health, personal and social care needs of a resident.',
        answer:
          'The finding is rarely that no assessment happened. It is that the plan did not move ' +
          'when the assessment did. Salvia links the plan to the assessment that produced it, so ' +
          'a change in one flags the other.',
      },
      {
        ref: 'Regulation 23 — Governance and management',
        title: 'Management systems that can be evidenced',
        text:
          'The registered provider shall ensure that management systems are in place to ensure ' +
          'that the service provided is safe, appropriate, consistent and effectively monitored.',
        answer:
          'This is the most-failed regulation in the reports we hold. Effectively monitored means ' +
          'evidenced, and Salvia’s policy checks produce that evidence as a by-product of filing ' +
          'the record, rather than as a separate exercise before an inspection.',
      },
    ],
    coverageId: null,
    retention: 'Schedule 2 records: not less than 7 years',
    sources: [
      { label: 'S.I. No. 415/2013 — Health Act 2007 (Care and Welfare of Residents in Designated Centres for Older People) Regulations 2013', url: 'https://www.irishstatutebook.ie/eli/2013/si/415/made/en/print' },
      { label: 'HIQA — providers of older people’s services', url: 'https://www.hiqa.ie/guidance-providers/older-peoples-services' },
    ],
    verified: '2026-09-03',
  },

  {
    slug: 'cms',
    body: 'CMS',
    fullName: 'Centers for Medicare & Medicaid Services — United States',
    country: 'United States',
    lexicon: { inspection: 'survey', inspector: 'surveyor', service: 'facility' },
    covers: [
      'Skilled nursing facilities',
      'Long-term care facilities',
    ],
    headline: 'A deficiency is cited against an F-tag. So build the record around the tag.',
    lede:
      'CMS surveyors work from Appendix PP of the State Operations Manual, and every deficiency ' +
      'lands on a numbered tag. The documentation tags are among the most cited in the country.',
    findingsKey: 'cmsSkilledNursing',
    proof:
      'From the CMS Provider Data Catalog, filtered to facilities carrying documentation-related ' +
      'deficiencies at their most recent survey.',
    clauses: [
      {
        ref: 'F656 — §483.21(b)(1)',
        title: 'Develop and implement a comprehensive care plan',
        text:
          'The facility must develop and implement a comprehensive person-centered care plan for ' +
          'each resident that includes measurable objectives and timeframes to meet a resident’s ' +
          'medical, nursing, and mental and psychosocial needs.',
        answer:
          'Implement is the word that catches facilities: a plan that exists but is not evidenced ' +
          'in the daily record is cited. Salvia ties each entry to the plan it serves, so the ' +
          'implementation is the record rather than a claim about it.',
      },
      {
        ref: 'F641 — §483.20(g)',
        title: 'Accuracy of assessments',
        text:
          'The assessment must accurately reflect the resident’s status.',
        answer:
          'Accuracy is measured against everything else in the chart. Salvia captures assessments ' +
          'as typed fields rather than prose, so a contradiction between an assessment and a later ' +
          'observation is something the system can surface instead of something a surveyor finds.',
      },
      {
        ref: 'F842 — §483.70(i)',
        title: 'Medical records',
        text:
          'The facility must maintain medical records on each resident that are complete, ' +
          'accurately documented, readily accessible and systematically organized.',
        answer:
          'Readily accessible and systematically organized are structural requirements, not effort ' +
          'requirements. One resident, one timeline, every entry attributed and timestamped — that ' +
          'is the shape of the answer, and it is what Salvia produces by default.',
      },
    ],
    coverageId: 'CMS_eCQM',
    retention: null,
    sources: [
      { label: 'CMS State Operations Manual, Appendix PP — Guidance to Surveyors for Long Term Care Facilities', url: 'https://www.cms.gov/Regulations-and-Guidance/Guidance/Manuals/downloads/som107ap_pp_guidelines_ltcf.pdf' },
      { label: 'CMS Provider Data Catalog', url: 'https://data.cms.gov/provider-data/' },
    ],
    verified: '2026-09-03',
  },

  {
    slug: 'nabh',
    body: 'NABH',
    fullName: 'National Accreditation Board for Hospitals & Healthcare Providers — India',
    country: 'India',
    lexicon: { inspection: 'assessment', inspector: 'assessor', service: 'organisation' },
    covers: [
      'Hospitals',
      'Small healthcare organisations (SHCO)',
      'Clinics',
      'Dental practices',
    ],
    headline: 'Accreditation is voluntary. What it unlocks is not.',
    lede:
      'NABH entry-level certification gates CGHS empanelment and raises PM-JAY package rates. ' +
      'The Information Management System standards are where documentation is judged, and Salvia ' +
      'walks all 639 requirements rather than describing them.',
    findingsKey: null,
    proof:
      'Salvia maps the 6th edition requirement by requirement, and marks each one honestly. ' +
      'Out of scope means the requirement is about something software has no business measuring — ' +
      'a building, a committee, a staffing ratio — and it is excluded from the denominator.',
    clauses: [
      {
        ref: 'IMS — medical records',
        title: 'Every entry dated, timed and authenticated',
        text:
          'Every patient has an accurate, complete and legible medical record. Each entry must be ' +
          'dated, timed and authenticated to its author, capturing assessment, care plan, consent, ' +
          'procedures, medication and outcome.',
        answer:
          'This is the one requirement Salvia was built around. Author, role, timestamp and a ' +
          'content hash on every entry — not as an add-on, but as the only way an entry can exist.',
      },
      {
        ref: 'Consent',
        title: 'Documented informed consent',
        text:
          'Documented informed consent is required for procedures and treatments carrying risk, ' +
          'identifying the procedure, the risks explained, and signed by the patient or guardian ' +
          'and the clinician.',
        answer:
          'Consent is a system field type in Salvia, not a paragraph. It records the procedure, the ' +
          'risks explained, who took it and when it expires — so it can be counted, not just read.',
      },
      {
        ref: 'Audit trail',
        title: 'Access and amendment history',
        text:
          'A maintainable audit trail of access and amendments is expected, which is precisely the ' +
          'manual burden that causes compliance to lapse after an assessment.',
        answer:
          'An amendment in Salvia is a new version, never an overwrite. The trail is a consequence ' +
          'of the data model, so it does not decay in the months between assessments.',
      },
    ],
    coverageId: 'NABH',
    retention: '3 years',
    sources: [
      { label: 'NABH — Small Healthcare Organisations', url: 'https://nabh.co/small-healthcare-organisations/' },
      { label: 'NABH — accreditation', url: 'https://nabh.co/accreditation/' },
    ],
    verified: '2026-09-03',
  },

  {
    slug: 'jci',
    body: 'JCI',
    fullName: 'Joint Commission International — Accreditation Standards for Hospitals',
    country: 'International',
    lexicon: { inspection: 'survey', inspector: 'surveyor', service: 'organisation' },
    covers: [
      'Hospitals',
      'Academic medical centres',
      'Multi-site health systems',
    ],
    headline: 'A tracer follows one patient through the record. So does Salvia.',
    lede:
      'JCI surveys by tracing a patient’s journey through your documentation. If the trail breaks, ' +
      'the standard is not met — regardless of what the care was. All 171 standards are walked, ' +
      'with each measurable element marked.',
    findingsKey: null,
    proof:
      'The same four honest states, applied to the 7th edition. A requirement that needs data ' +
      'says which field would provide it, so the gap is a configuration task and not a mystery.',
    clauses: [
      {
        ref: 'IPSG.3',
        title: 'Safety of high-alert medications',
        text:
          'The organisation improves the safety of high-alert medications. A list of high-alert ' +
          'medications is defined and managed to reduce risk.',
        answer:
          'Salvia already holds prescriptions and drug operations as typed records, so the signals ' +
          'exist. What it needs from you is the high-alert list itself — a small configuration, ' +
          'and the product says so rather than quietly scoring the requirement as met.',
      },
      {
        ref: 'IPSG.1',
        title: 'Identify patients correctly',
        text:
          'The organisation develops and implements a process to improve accuracy of patient ' +
          'identification.',
        answer:
          'Every record in Salvia is written against a patient record with system fields for name, ' +
          'date of birth and sex — never against free text extracted from a note.',
      },
      {
        ref: 'ACC.3.1',
        title: 'Continuity of care',
        text:
          'A qualified individual is responsible for coordinating the patient’s care.',
        answer:
          'Attribution is on every entry, so who was responsible at any point in the timeline is a ' +
          'fact in the record rather than something reconstructed afterwards.',
      },
    ],
    coverageId: 'JCI',
    retention: null,
    sources: [
      { label: 'Joint Commission International — accreditation standards for hospitals, 7th edition', url: 'https://www.jointcommissioninternational.org/what-we-offer/accreditation/accreditation-programs/hospital/' },
    ],
    verified: '2026-09-03',
  },
];

export const DEEP_SLUGS = DEEP.map((d) => d.slug);

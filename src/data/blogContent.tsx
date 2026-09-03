import React from 'react';

// Specialized Domain Content Imports
import { content as pajamaTime } from '../content/blog/pajama-time';
import { content as informedRefusal } from '../content/blog/informed-refusal';
import { content as aiLegal } from '../content/blog/ai-legal';
import { content as strangerRule } from '../content/blog/stranger-rule';
import { content as auditTrail } from '../content/blog/audit-trail';
import { content as difficultPatients } from '../content/blog/difficult-patients';
import { content as pediatricRecords } from '../content/blog/pediatric-records';
import { content as cqcDental2026 } from '../content/blog/cqc-dental-2026';
// India
import { content as consumerCourtRecords } from '../content/blog/consumer-court-records';
import { content as patientRecordsAccessIndia } from '../content/blog/patient-records-access-india';
import { content as nabhSmallClinicWorthIt } from '../content/blog/nabh-small-clinic-worth-it';
import { content as abdmMandatoryClinic } from '../content/blog/abdm-mandatory-clinic';

export type Domain = 'GENERAL' | 'VETERINARY' | 'DENTAL';

export interface BlogPost {
  tag: string;
  domain: Domain;
  q: string;
  excerpt: string;
  readTime: string;
  author: string;
  date: string;
  keywords: string[];
  content: React.ReactNode;
  /** Primary sources cited in the post — rendered as a Sources block by
      ArticlePage. Prefer regulators / gazettes / case law over news. */
  sources?: { label: string; url: string }[];
}

export const BLOG_CONTENT: Record<string, BlogPost> = {
  // --- INDIA ---
  'consumer-court-records': {
    tag: 'Medico-Legal',
    domain: 'GENERAL',
    q: "Will I lose the consumer case if my records aren't there?",
    excerpt: "Under the Consumer Protection Act 2019, a thin file loses cases that good care should win. How the burden of proof works, when it shifts onto the doctor, and what a defensible Indian medical record actually contains.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'June 13, 2026',
    keywords: ['Consumer Protection Act', 'medical negligence India', 'medical records'],
    content: consumerCourtRecords,
    sources: [
      { label: 'Medicos Legal Action Group v. Union of India (Bombay HC, 2021) — healthcare is a "service" under CPA 2019', url: 'https://indiankanoon.org/doc/93468691/' },
      { label: 'Savita Garg v. National Heart Institute (2004) 8 SCC 56 — burden shift and adverse inference for missing records', url: 'https://indiankanoon.org/doc/150881/' },
      { label: 'Supreme Court declines to reconsider doctors under the Consumer Protection Act (LiveLaw, Nov 2024)', url: 'https://www.livelaw.in/top-stories/supreme-court-doctors-consumer-protection-act-review-petition-against-order-refusing-reconsideration-of-vp-shantha-judgment-dismissed-284299' },
    ],
  },
  'patient-records-access-india': {
    tag: 'Medico-Legal',
    domain: 'GENERAL',
    q: "Can a patient demand their full hospital file in India?",
    excerpt: "Yes, and the law gives you 72 hours. The NMC regulation, the RTI route for government hospitals, why stalling reads as concealment, and what a complete file actually includes.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'June 13, 2026',
    keywords: ['patient records access', 'NMC regulations', 'medical records India'],
    content: patientRecordsAccessIndia,
    sources: [
      { label: 'IMC (Professional Conduct, Etiquette and Ethics) Regulations 2002 — Reg 1.3.1 / 1.3.2 (NMC)', url: 'https://www.nmc.org.in/rules-regulations/code-of-medical-ethics-regulations-2002/' },
      { label: 'Full text of the 2002 Regulations (Indian Kanoon)', url: 'https://indiankanoon.org/doc/100527417/' },
      { label: 'NMC — Registered Medical Practitioner (Professional Conduct) Regulations 2023 (kept in abeyance)', url: 'https://www.nmc.org.in/rules-regulations/national-medical-commission-registered-medical-practitioner-professional-conduct-regulations-2023-reg/' },
    ],
  },
  'nabh-small-clinic-worth-it': {
    tag: 'NABH',
    domain: 'GENERAL',
    q: "Is NABH Entry-Level worth it for a small clinic, or just a sticker?",
    excerpt: "An honest look, without the brochure language. The 10% PM-JAY incentive that decides it, the real total cost, the SHCO and Entry-Level routes, and exactly where software helps and where it cannot.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'June 13, 2026',
    keywords: ['NABH Entry-Level', 'NABH small clinic', 'PM-JAY incentive'],
    content: nabhSmallClinicWorthIt,
    sources: [
      { label: 'NABH — AB-PMJAY empanelment and quality-incentive tiers (Bronze/Silver/Gold)', url: 'https://nabh.co/programmes/ab-pmjay-empanelment-programme/' },
      { label: 'NABH — Entry-Level (SHCO) certification programme', url: 'https://nabh.co/programmes/entry-level-small-healthcare-organisation-shco-certification-programme/' },
      { label: 'NABH — revised fee structure (PDF)', url: 'https://portal.nabh.co/Images/PDF/RevisedFeeStructure_NABH.pdf' },
    ],
  },
  'abdm-mandatory-clinic': {
    tag: 'ABDM',
    domain: 'GENERAL',
    q: "Is ABDM / ABHA actually mandatory for my clinic in 2026?",
    excerpt: "Voluntary for patients, but mandatory in practice for PM-JAY empanelment and insurance. HFR and HPR registration, what 'ABDM compliant' really means, and why a QR code is not a structured record.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'June 13, 2026',
    keywords: ['ABDM compliance', 'ABHA', 'HFR HPR registration'],
    content: abdmMandatoryClinic,
    sources: [
      { label: 'ABDM — Digital Health Incentive Scheme, Corrigendum 7 (incentive window Apr–Sep 2026)', url: 'https://abdm.gov.in/strapicms/uploads/Corrigendum_7_f456cb207a.pdf' },
      { label: 'National Health Claims Exchange (NHCX) — ABDM', url: 'https://abdm.gov.in/nhcx' },
      { label: 'NRCeS — India FHIR implementation guide (NDHM)', url: 'https://nrces.in/ndhm' },
    ],
  },

  // --- GENERAL CLINIC ---
  'pajama-time': {
    tag: 'Burnout',
    domain: 'GENERAL',
    q: "I finish charts at 11pm every night and my family's had enough — what now?",
    excerpt: "Late charting isn't just exhausting — the metadata timestamps are doing more legal damage than most clinicians realise. A look at memory decay, deposition patterns, and the workflow changes that actually stick.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'April 17, 2026',
    keywords: ['documentation debt', 'EMR audit trail', 'burnout'],
    content: pajamaTime,
  },
  'informed-refusal': {
    tag: 'Malpractice',
    domain: 'GENERAL',
    q: "Patient refused an X-ray and later sued me — how should I have documented it?",
    excerpt: "\"Patient refused\" is not a defence. We break down the four pillars juries actually look for when a refusal becomes a lawsuit — and what a bulletproof refusal note looks like.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'April 18, 2026',
    keywords: ['refusal', 'liability', 'defence'],
    content: informedRefusal,
    sources: [
      { label: 'Truman v. Thomas, 611 P.2d 902 (Cal. 1980) — the canonical informed-refusal case', url: 'https://biotech.law.lsu.edu/cases/consent/Truman_v_Thomas.htm' },
      { label: 'Samira Kohli v. Dr. Prabha Manchanda (2008) 2 SCC 1 — consent must be specific and informed', url: 'https://indiankanoon.org/doc/438423/' },
    ],
  },
  'ai-legal': {
    tag: 'AI & Scribes',
    domain: 'GENERAL',
    q: "Is my AI scribe legally part of the medical record?",
    excerpt: "Short answer: yes — and the audio itself may be discoverable in litigation. Here's what HIPAA, the Cures Act, and your state board actually say about AI-generated notes.",
    readTime: '8 min read',
    author: 'Salvia Editorial',
    date: 'April 22, 2026',
    keywords: ['AI scribes', 'HIPAA', 'discovery'],
    content: aiLegal,
  },
  'stranger-rule': {
    tag: 'Handoff',
    domain: 'GENERAL',
    q: "Another clinician covered my patient and couldn't make sense of my notes",
    excerpt: "If a colleague who's never met the patient can't pick up the chart and know exactly what to do next, the note fails the 'stranger rule'. A practical rewrite guide.",
    readTime: '5 min read',
    author: 'Salvia Editorial',
    date: 'April 23, 2026',
    keywords: ['handoff', 'clarity', 'standards'],
    content: strangerRule,
  },
  'audit-trail': {
    tag: 'Patient Rights',
    domain: 'GENERAL',
    q: "A patient asked to see every change made to their chart. Do I have to show them?",
    excerpt: "Under the Cures Act and Open Notes, the answer is more expansive than most practices assume. Here's what patients can demand — and what a clean versioned audit trail should look like.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'April 24, 2026',
    keywords: ['Cures Act', 'Open Notes', 'metadata'],
    content: auditTrail,
  },
  'difficult-patients': {
    tag: 'Ethics',
    domain: 'GENERAL',
    q: "How do I document a patient who cursed me out — without opening myself up to a lawsuit?",
    excerpt: "Emotion-loaded charting is one of the top reasons clinicians lose defamation and bias cases. A framework for documenting difficult interactions in strictly observational language.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'May 3, 2026',
    keywords: ['conflict', 'objectivity', 'documentation'],
    content: difficultPatients,
  },
  'pediatric-records': {
    tag: 'Pediatrics',
    domain: 'GENERAL',
    q: "My 15-year-old patient asked me not to tell her parents — what do I write in the chart?",
    excerpt: "Minor-consent laws vary wildly by state and specialty, and your EMR's 'parent portal' toggle may not protect you. A plain-English map of who gets to see what.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'May 5, 2026',
    keywords: ['minors', 'consent', 'confidentiality'],
    content: pediatricRecords,
  },

  // --- VETERINARY ---

  // --- DENTAL ---

  // --- UK VETERINARY ---

  // --- UK DENTAL ---
  'cqc-dental-2026': {
    tag: 'CQC Inspection',
    domain: 'DENTAL',
    q: "CQC dental inspection 2026 — what Regulation 17 actually requires in your clinical notes",
    excerpt: "The Assurance framework model changed what inspectors look for. A breakdown of the specific record elements that generate 'requires improvement' findings in dental practices — BPE, STE, radiology justification, and written treatment plans.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'May 12, 2026',
    keywords: ['CQC dental', 'Regulation 17', 'CQC inspection dental', 'GDC records', 'dental compliance UK'],
    content: cqcDental2026,
  },

  // --- AU VETERINARY ---

  // --- AU DENTAL ---

  // --- NZ VETERINARY ---
};

/** Every post is visible. The site sells across five frameworks, so gating the
 *  writing to one country would hide the very posts its framework pages link to. */
export const VISIBLE_BLOG_CONTENT: Record<string, BlogPost> = BLOG_CONTENT;

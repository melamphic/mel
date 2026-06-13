import React from 'react';

// Specialized Domain Content Imports
import { content as pajamaTime } from '../content/blog/pajama-time';
import { content as informedRefusal } from '../content/blog/informed-refusal';
import { content as copyPaste } from '../content/blog/copy-paste';
import { content as vetTpr } from '../content/blog/vet-tpr';
import { content as malpracticeDental } from '../content/blog/malpractice-dental';
import { content as aiLegal } from '../content/blog/ai-legal';
import { content as strangerRule } from '../content/blog/stranger-rule';
import { content as auditTrail } from '../content/blog/audit-trail';
import { content as emrCrash } from '../content/blog/emr-crash';
import { content as oralPhotos } from '../content/blog/wound-photos';
import { content as aiLegalStatus } from '../content/blog/ai-legal-status';
import { content as clinicalGuidelines } from '../content/blog/clinical-guidelines';
import { content as signedEdits } from '../content/blog/signed-edits';
import { content as telehealthStandards } from '../content/blog/telehealth-standards';
import { content as retentionPolicy } from '../content/blog/retention-policy';
import { content as manualChartingLiability } from '../content/blog/manual-charting-liability';
import { content as difficultPatients } from '../content/blog/difficult-patients';
import { content as institutionalEthics } from '../content/blog/institutional-ethics';
import { content as pediatricRecords } from '../content/blog/pediatric-records';
import { content as dentalSurgical } from '../content/blog/surgical-notes';
import { content as cmaVetDeadline } from '../content/blog/cma-vet-deadline';
import { content as rcvsRecordInspection } from '../content/blog/rcvs-record-inspection';
import { content as cqcDental2026 } from '../content/blog/cqc-dental-2026';
import { content as avmaAuRecords } from '../content/blog/avma-au-records';
import { content as ahpraDentalAu } from '../content/blog/ahpra-dental-au';
import { content as vcnzRecordsNz } from '../content/blog/vcnz-records-nz';
// India
import { content as consumerCourtRecords } from '../content/blog/consumer-court-records';
import { content as patientRecordsAccessIndia } from '../content/blog/patient-records-access-india';
import { content as nabhSmallClinicWorthIt } from '../content/blog/nabh-small-clinic-worth-it';
import { content as abdmMandatoryClinic } from '../content/blog/abdm-mandatory-clinic';
import { content as aiScribeIndianLanguages } from '../content/blog/ai-scribe-indian-languages';

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
  },
  'ai-scribe-indian-languages': {
    tag: 'AI & Scribes',
    domain: 'GENERAL',
    q: "Do AI scribes actually work in Hindi or Malayalam?",
    excerpt: "Most demos are filmed in clean English. A real Indian OPD is code-mixed and noisy. Where English-first scribes break, how to test one on your worst Tuesday, and why a perfect transcript still is not a record.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'June 13, 2026',
    keywords: ['AI medical scribe India', 'multilingual clinical documentation', 'code-mixed speech'],
    content: aiScribeIndianLanguages,
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
  'vet-tpr': {
    tag: 'Board Citation',
    domain: 'VETERINARY',
    q: "Board cited me for a 'missing TPR' — what does a minimum SOAP note actually need?",
    excerpt: "Veterinary boards reject SOAP notes for surprisingly consistent reasons. A checklist of what AVMA and VMR inspectors look for in the first 10 seconds of reviewing a chart.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'April 20, 2026',
    keywords: ['TPR', 'AVMA', 'SOAP'],
    content: vetTpr,
  },
  'copy-paste-vet': {
    tag: 'Templates',
    domain: 'VETERINARY',
    q: "Vet board flagged me for 'cloned exam notes' — is copy-pasting normal exams really illegal?",
    excerpt: "Cloning a normal exam template is legal. Cloning it *identically*, *repeatedly*, and *without edits* is how you end up in front of the board. What the line actually is.",
    readTime: '5 min read',
    author: 'Salvia Editorial',
    date: 'April 19, 2026',
    keywords: ['templates', 'fraud', 'cloning'],
    content: copyPaste,
  },
  'emr-crash-vet': {
    tag: 'Downtime',
    domain: 'VETERINARY',
    q: "Our EMR crashed mid-surgery — how are we supposed to chart that?",
    excerpt: "When your practice management software goes down, paper is your friend — but only if you bridge it back into the record with the right timestamps and addenda.",
    readTime: '5 min read',
    author: 'Salvia Editorial',
    date: 'April 25, 2026',
    keywords: ['downtime', 'backup', 'addendum'],
    content: emrCrash,
  },
  'ai-vet-legal': {
    tag: 'AI & Scribes',
    domain: 'VETERINARY',
    q: "Can I legally use an AI scribe for veterinary records in AU/NZ?",
    excerpt: "AVA, VCNZ and state boards all have positions — most of them written for human scribes, none of them explicitly banning AI. Here's how to stay ahead of the regulation that's coming.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'April 27, 2026',
    keywords: ['AI law', 'AVA', 'AI-assisted'],
    content: aiLegalStatus,
  },
  'vet-audit-prep': {
    tag: 'Board Audit',
    domain: 'VETERINARY',
    q: "The VMR board is auditing us next month — what do they actually check?",
    excerpt: "A former VMR inspector walked us through the first five records she pulls in every audit. Spoiler: your S/O/A/P structure is the least of her concerns.",
    readTime: '8 min read',
    author: 'Salvia Editorial',
    date: 'April 28, 2026',
    keywords: ['audit readiness', 'VMR', 'inspection'],
    content: clinicalGuidelines,
  },
  'retention-vet': {
    tag: 'Records Retention',
    domain: 'VETERINARY',
    q: "Dog passed away 3 years ago — can I delete the records yet?",
    excerpt: "Probably not. Retention rules for deceased patients differ by state, by species, and by whether any controlled drugs were dispensed. A one-page guide.",
    readTime: '4 min read',
    author: 'Salvia Editorial',
    date: 'May 1, 2026',
    keywords: ['retention', 'archiving', 'statutory'],
    content: retentionPolicy,
  },
  'logic-vet': {
    tag: 'Standards',
    domain: 'VETERINARY',
    q: "How do I know my vet notes actually meet VMR standards?",
    excerpt: "Reading the VMR code is a two-hour job, followed by a hope-and-pray. Running your notes through a live policy checker is better — and perfectly auditable.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'May 4, 2026',
    keywords: ['VMR', 'standards', 'policy'],
    content: institutionalEthics,
  },

  // --- DENTAL ---
  'malpractice-dental': {
    tag: 'Malpractice',
    domain: 'DENTAL',
    q: "Missed a perio pocket two years ago — patient now has bone loss. How do I defend my charting?",
    excerpt: "Perio-charting suits almost always turn on whether pocket depths were recorded at every hygiene visit. What a defensible periodontal record looks like in practice.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'April 21, 2026',
    keywords: ['periodontal', 'probing', 'malpractice'],
    content: malpracticeDental,
  },
  'oral-photography': {
    tag: 'Insurance',
    domain: 'DENTAL',
    q: "Insurance keeps denying my crown claims 'for lack of documentation' — what do they want?",
    excerpt: "Delta, Cigna and the big insurers have quietly raised the photographic evidence bar for restorative claims. A shot-list that stops 90% of denials.",
    readTime: '5 min read',
    author: 'Salvia Editorial',
    date: 'April 26, 2026',
    keywords: ['photography', 'intraoral', 'claims'],
    content: oralPhotos,
  },
  'signed-edits-dental': {
    tag: 'Corrections',
    domain: 'DENTAL',
    q: "Billed the wrong CDT code on a signed note — how do I fix it without looking dodgy?",
    excerpt: "Overwriting a signed note is the fastest way to turn a billing mistake into an insurance-fraud investigation. The right way to addendum — with the versioning to prove it.",
    readTime: '5 min read',
    author: 'Salvia Editorial',
    date: 'April 29, 2026',
    keywords: ['addendum', 'CDT', 'billing'],
    content: signedEdits,
  },
  'teledentistry-standards': {
    tag: 'Telehealth',
    domain: 'DENTAL',
    q: "First time doing a tele-dental consult — what's the charting standard?",
    excerpt: "Tele-dentistry rules are still patchwork across the DCA, GDC and state boards. A short guide to what every remote consult note must contain, regardless of jurisdiction.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'April 30, 2026',
    keywords: ['teledentistry', 'remote', 'charting'],
    content: telehealthStandards,
  },
  'manual-dental-risk': {
    tag: 'Risk',
    domain: 'DENTAL',
    q: "We're still on paper charts — is this a malpractice suit waiting to happen?",
    excerpt: "Paper is legal. What isn't legal is illegible paper, missing paper, and paper that can't be cross-referenced with your imaging. The real exposure of a paper practice.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'May 2, 2026',
    keywords: ['paper charts', 'liability', 'digitisation'],
    content: manualChartingLiability,
  },
  'surgical-prep-dental': {
    tag: 'Surgery',
    domain: 'DENTAL',
    q: "Hospital rejected my oral surgery report — what format do they expect?",
    excerpt: "Hospital-linked oral surgery has a stricter documentation standard than office practice — and most GPs and oral surgeons learn this the hard way. A template that passes review.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'May 6, 2026',
    keywords: ['oral surgery', 'hospital', 'report'],
    content: dentalSurgical,
  },

  // --- UK VETERINARY ---
  'cma-vet-deadline': {
    tag: 'CMA Compliance',
    domain: 'VETERINARY',
    q: "September 23 2026: which of the 21 CMA remedies does your vet practice actually need to act on?",
    excerpt: "Most practices have ticked the price list box and stopped there. The four CMA remedies with direct clinical records implications — itemised billing, written estimates, controlled drug transparency, complaint trail — are the ones that will catch practices off guard.",
    readTime: '8 min read',
    author: 'Salvia Editorial',
    date: 'May 8, 2026',
    keywords: ['CMA compliance', 'CMA veterinary', 'vet records UK', 'CMA remedies 2026', 'Competition and Markets Authority vets'],
    content: cmaVetDeadline,
  },
  'rcvs-record-inspection': {
    tag: 'RCVS Standards',
    domain: 'VETERINARY',
    q: "What do RCVS Practice Standards assessors actually check in your clinical records?",
    excerpt: "PSS assessors aren't primarily looking at your facilities — they're looking at your records. A look at the specific record elements that trigger findings, and the three structural gaps most UK practices have.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'May 10, 2026',
    keywords: ['RCVS records', 'Practice Standards Scheme', 'RCVS compliance', 'UK vet records', 'veterinary board UK'],
    content: rcvsRecordInspection,
  },

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
  'au-vet-board-records': {
    tag: 'VPB Compliance',
    domain: 'VETERINARY',
    q: "What do Australian vet boards actually cite in complaints? A look at VIC, NSW and QLD records findings",
    excerpt: "State board fitness-to-practise decisions are published, and the records failures they cite are consistent. Controlled drug register discrepancies, generic consent, late timestamps, and weight-based dose gaps — a pattern worth knowing before it applies to you.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'May 14, 2026',
    keywords: ['Australian vet board', 'VPB records', 'veterinary compliance Australia', 'controlled drug register AU', 'AVA records'],
    content: avmaAuRecords,
  },

  // --- AU DENTAL ---
  'ahpra-dental-records': {
    tag: 'AHPRA',
    domain: 'DENTAL',
    q: "AHPRA dental complaints are records-first — is your charting defensible?",
    excerpt: "Australia's Dental Board doesn't do routine inspections, but a single complaint triggers a records audit that moves fast. The three categories of records failure that feature in almost every substantiated AHPRA dental complaint.",
    readTime: '6 min read',
    author: 'Salvia Editorial',
    date: 'May 15, 2026',
    keywords: ['AHPRA dental', 'Dental Board Australia', 'AHPRA records', 'dental compliance Australia', 'AHPRA complaint records'],
    content: ahpraDentalAu,
  },

  // --- NZ VETERINARY ---
  'vcnz-records-standard': {
    tag: 'VCNZ Code',
    domain: 'VETERINARY',
    q: "VCNZ's 2024 Code of Professional Conduct — what changed for clinical records?",
    excerpt: "The updated VCNZ Code is the most operationally demanding it's ever been. A breakdown of the new explicit requirements for vitals, drug dose tracing, consent, and the controlled drug register — and how fast the complaints process moves if these aren't met.",
    readTime: '7 min read',
    author: 'Salvia Editorial',
    date: 'May 16, 2026',
    keywords: ['VCNZ records', 'VCNZ 2024 code', 'New Zealand vet records', 'veterinary compliance NZ', 'controlled drugs NZ vets'],
    content: vcnzRecordsNz,
  },
};

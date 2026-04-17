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
import { content as oralPhotos } from '../content/blog/wound-photos'; // Map to Dental
import { content as aiLegalStatus } from '../content/blog/ai-legal-status';
import { content as clinicalGuidelines } from '../content/blog/clinical-guidelines';
import { content as signedEdits } from '../content/blog/signed-edits';
import { content as telehealthStandards } from '../content/blog/telehealth-standards';
import { content as retentionPolicy } from '../content/blog/retention-policy';
import { content as manualChartingLiability } from '../content/blog/manual-charting-liability';
import { content as difficultPatients } from '../content/blog/difficult-patients';
import { content as institutionalEthics } from '../content/blog/institutional-ethics';
import { content as pediatricRecords } from '../content/blog/pediatric-records';
import { content as dentalSurgical } from '../content/blog/surgical-notes'; // Map to Dental

export type Domain = 'GENERAL' | 'VETERINARY' | 'DENTAL';

export interface BlogPost {
  tag: string;
  domain: Domain;
  q: string;
  author: string;
  date: string;
  keywords: string[];
  content: React.ReactNode;
}

export const BLOG_CONTENT: Record<string, BlogPost> = {
  // --- GENERAL CLINIC ---
  'pajama-time': {
    tag: 'LEGAL RISK', domain: 'GENERAL',
    q: "Is it okay to finish clinical notes at home after my shift?",
    author: "Compliance Lab Editorial", date: "April 17, 2026",
    keywords: ['documentation debt', 'EMR audit trail', 'metadata'],
    content: pajamaTime
  },
  'informed-refusal': {
    tag: 'MALPRACTICE', domain: 'GENERAL',
    q: "How can I prove a patient refused a diagnostic test?",
    author: "Compliance Lab Editorial", date: "April 18, 2026",
    keywords: ['refusal', 'liability', 'defense'],
    content: informedRefusal
  },
  'ai-legal': {
    tag: 'TECHNOLOGY', domain: 'GENERAL',
    q: "Is a voice-to-text scribe considered a legal medical record?",
    author: "Compliance Lab Editorial", date: "April 22, 2026",
    keywords: ['AI scribes', 'HIPAA', 'fidelity'],
    content: aiLegal
  },
  'stranger-rule': {
    tag: 'QUALITY', domain: 'GENERAL',
    q: "What is the 'Stranger Rule' in clinical documentation?",
    author: "Compliance Lab Editorial", date: "April 23, 2026",
    keywords: ['handoff', 'clarity', 'standards'],
    content: strangerRule
  },
  'audit-trail': {
    tag: 'DATA PRIVACY', domain: 'GENERAL',
    q: "Can patients see the audit trail of their medical records?",
    author: "Compliance Lab Editorial", date: "April 24, 2026",
    keywords: ['Cures Act', 'metadata', 'Open Notes'],
    content: auditTrail
  },
  'difficult-patients': {
    tag: 'ETHICS', domain: 'GENERAL',
    q: "How to document a difficult patient interaction safely?",
    author: "Compliance Lab Editorial", date: "May 3, 2026",
    keywords: ['conflict', 'objectivity', 'non-compliance'],
    content: difficultPatients
  },
  'pediatric-records': {
    tag: 'LEGAL', domain: 'GENERAL',
    q: "What are the rules for documenting minor consent?",
    author: "Compliance Lab Editorial", date: "May 5, 2026",
    keywords: ['minors', 'consent', 'emancipation'],
    content: pediatricRecords
  },

  // --- VETERINARY ---
  'vet-tpr': {
    tag: 'VITALS', domain: 'VETERINARY',
    q: "What are the minimum requirements for a veterinary SOAP note?",
    author: "Compliance Lab Editorial", date: "April 20, 2026",
    keywords: ['TPR', 'AVMA', 'vitals'],
    content: vetTpr
  },
  'copy-paste-vet': {
    tag: 'COMPLIANCE', domain: 'VETERINARY',
    q: "Why do vet boards flag cloned 'normal' exam findings?",
    author: "Compliance Lab Editorial", date: "April 19, 2026",
    keywords: ['templates', 'fraud', 'cloning'],
    content: copyPaste
  },
  'emr-crash-vet': {
    tag: 'INFRASTRUCTURE', domain: 'VETERINARY',
    q: "What if the practice EMR crashes during a major surgery?",
    author: "Compliance Lab Editorial", date: "April 25, 2026",
    keywords: ['backup', 'recovery', 'downtime'],
    content: emrCrash
  },
  'ai-vet-legal': {
    tag: 'REGULATORY', domain: 'VETERINARY',
    q: "Is it legal for a robot to write my veterinary notes?",
    author: "Compliance Lab Editorial", date: "April 27, 2026",
    keywords: ['AI law', 'AI-assisted', 'regulations'],
    content: aiLegalStatus
  },
  'vet-audit-prep': {
    tag: 'COMPLIANCE', domain: 'VETERINARY',
    q: "How to survive an VMR board audit of your clinical records?",
    author: "Compliance Lab Editorial", date: "April 28, 2026",
    keywords: ['audit readiness', 'standards', 'logic'],
    content: clinicalGuidelines
  },
  'retention-vet': {
    tag: 'GOVERNANCE', domain: 'VETERINARY',
    q: "How long must I keep records for pets that have passed away?",
    author: "Compliance Lab Editorial", date: "May 1, 2026",
    keywords: ['retention', 'archiving', 'statutory'],
    content: retentionPolicy
  },
  'logic-vet': {
    tag: 'GOVERNANCE', domain: 'VETERINARY',
    q: "Does my vet documentation meet standard VMR institutional policy?",
    author: "Compliance Lab Editorial", date: "May 4, 2026",
    keywords: ['VMR', 'institutional', 'ethics'],
    content: institutionalEthics
  },

  // --- DENTAL ---
  'malpractice-dental': {
    tag: 'CHARTING', domain: 'DENTAL',
    q: "How to prevent periodontal charting gaps in my dental practice?",
    author: "Compliance Lab Editorial", date: "April 21, 2026",
    keywords: ['periodontal', 'probing', 'defense'],
    content: malpracticeDental
  },
  'oral-photography': {
    tag: 'EVIDENCE', domain: 'DENTAL',
    q: "Are intraoral photos required for dental insurance claims?",
    author: "Compliance Lab Editorial", date: "April 26, 2026",
    keywords: ['photography', 'intraoral', 'proof'],
    content: oralPhotos
  },
  'signed-edits-dental': {
    tag: 'LEGAL', domain: 'DENTAL',
    q: "Can I correct a billing mistake on a signed dental note?",
    author: "Compliance Lab Editorial", date: "April 29, 2026",
    keywords: ['addendum', 'billing', 'integrity'],
    content: signedEdits
  },
  'teledentistry-standards': {
    tag: 'REGULATORY', domain: 'DENTAL',
    q: "What are the documentation rules for teledentistry consults?",
    author: "Compliance Lab Editorial", date: "April 30, 2026",
    keywords: ['remote', 'virtual', 'charting'],
    content: telehealthStandards
  },
  'manual-dental-risk': {
    tag: 'RISK', domain: 'DENTAL',
    q: "Why is manual dental charting a liability for patient safety?",
    author: "Compliance Lab Editorial", date: "May 2, 2026",
    keywords: ['human error', 'manual', 'accuracy'],
    content: manualChartingLiability
  },
  'surgical-prep-dental': {
    tag: 'EVIDENCE', domain: 'DENTAL',
    q: "How to ensure oral surgery reports meet hospital standards?",
    author: "Compliance Lab Editorial", date: "May 6, 2026",
    keywords: ['surgical', 'post-op', 'report'],
    content: dentalSurgical
  }
};

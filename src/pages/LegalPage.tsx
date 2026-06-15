import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// ⚠️ These are DRAFTS generated to give Salvia a complete starting point. Because
// Salvia processes health data across India (DPDP Act 2023), Australia (Privacy
// Act 1988 / APPs), New Zealand (HIPC 2020) and the UK/EU (UK GDPR / GDPR), every
// document MUST be reviewed by a qualified lawyer before it is relied on.
// [PLACEHOLDER] markers flag company-specific details to confirm.

const ENTITY = '[LEGAL ENTITY NAME]';
const ADDRESS = '[REGISTERED ADDRESS]';
const PRIVACY_EMAIL = 'privacy@hellosalvia.com';
const GRIEVANCE = '[GRIEVANCE OFFICER NAME], grievance@hellosalvia.com';
const UPDATED = '[DATE]';

type Doc = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDesc: string;
  body: React.ReactNode;
};

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--salvia-primary)', margin: '2.2rem 0 0.8rem', letterSpacing: '-0.02em' }}>{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--salvia-text-muted)', margin: '0 0 1rem' }}>{children}</p>
);
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul style={{ margin: '0 0 1rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</ul>
);
const LI = ({ children }: { children: React.ReactNode }) => (
  <li style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--salvia-text-muted)', listStyle: 'disc' }}>{children}</li>
);

const SUBPROCESSORS = [
  ['Deepgram, Inc.', 'Speech-to-text (transcription of consult audio — Nova Medical / nova-3)', 'United States'],
  ['Google LLC — Gemini / Google Cloud', 'AI structuring of the transcript into clinical fields (India workloads run on Gemini)', 'India / United States'],
  ['Cloudflare, Inc.', 'Website + application hosting, CDN, edge security, analytics', 'Global edge (India PoPs)'],
  ['PostHog', 'Product analytics (page views, funnel events) — EU Cloud', 'European Union'],
  ['[OBJECT STORAGE PROVIDER]', 'Encrypted storage of audio and generated records', '[REGION]'],
  ['[EMAIL PROVIDER]', 'Transactional + account email', '[REGION]'],
];

const DOCS: Doc[] = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    seoTitle: 'Privacy Policy | Salvia',
    seoDesc: 'How Salvia collects, uses, stores and protects personal and health data under India’s DPDP Act 2023 and equivalent laws in AU, NZ, UK and the EU.',
    body: (
      <>
        <P>This Privacy Policy explains how {ENTITY} (“Salvia”, “we”) handles personal data when you use our website (hellosalvia.com), our application, and our clinical documentation and compliance services (the “Services”).</P>
        <P><strong>Our role.</strong> For data about visitors and account holders, Salvia is the data controller / Data Fiduciary. For patient/clinical data that a clinic puts into the Services, the <strong>clinic is the controller / Data Fiduciary and Salvia is the processor / Data Processor</strong> acting on the clinic’s instructions — see our <Link to="/dpa/">Data Processing Agreement</Link>.</P>
        <H>1. Data we process</H>
        <UL>
          <LI><strong>Account &amp; billing data:</strong> name, email, phone, clinic, role, plan.</LI>
          <LI><strong>Clinical data (on behalf of clinics):</strong> consult audio, transcripts, structured clinical records, drug-register entries, consent and incident records.</LI>
          <LI><strong>Usage data:</strong> device, browser, country, pages and feature events (via PostHog and Cloudflare).</LI>
        </UL>
        <H>2. How we use it</H>
        <P>To provide and secure the Services: transcribe audio, generate structured records, run policy/compliance checks, support you, and meet legal obligations. <strong>We do not sell personal data, and we do not use clinical data to train our own or third-party AI models.</strong> [PLACEHOLDER: confirm model-training stance with each AI sub-processor.]</P>
        <H>3. AI sub-processing &amp; the data flow</H>
        <P>Consult audio is transcribed by <strong>Deepgram</strong> and the transcript is structured by <strong>Google Gemini</strong> (India workloads run on Gemini). These providers process the data only to return a result to Salvia and are bound by contract. See the full <Link to="/subprocessors/">list of sub-processors</Link>.</P>
        <H>4. Where data is stored &amp; transfers</H>
        <P>[PLACEHOLDER: state primary data-residency region — e.g., India for Indian clinics.] Where data is transferred across borders (e.g., to a US sub-processor), we rely on appropriate safeguards (standard contractual clauses or equivalent) as required by the DPDP Act 2023, GDPR, the Australian Privacy Act 1988 and NZ HIPC 2020.</P>
        <H>5. Retention</H>
        <P>Account data is kept while your account is active. Clinical data is retained per the clinic’s instructions and applicable medical-record retention law. [PLACEHOLDER: confirm audio-retention default — e.g., audio deleted N days after the record is generated.]</P>
        <H>6. Security</H>
        <P>Encryption in transit (TLS 1.2+) and at rest (AES-256), least-privilege access control, audit logging, and breach notification within 72 hours where required. See our <Link to="/security/">Security overview</Link>.</P>
        <H>7. Your rights</H>
        <P>Subject to applicable law, you can access, correct, or erase your data, withdraw consent, and lodge a complaint. To exercise these, contact us below. For clinical data held on a clinic’s behalf, we will refer your request to the clinic.</P>
        <H>8. Grievance / contact</H>
        <P>Grievance Officer (DPDP Act 2023): {GRIEVANCE}. General privacy queries: {PRIVACY_EMAIL}. Registered office: {ADDRESS}. We respond within the timelines required by law (no more than 90 days under the DPDP Rules).</P>
      </>
    ),
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    seoTitle: 'Terms of Service | Salvia',
    seoDesc: 'The terms governing use of Salvia’s clinical documentation and compliance Services, including your responsibilities, acceptable use, and clinical-safety disclaimers.',
    body: (
      <>
        <P>These Terms govern your access to and use of Salvia’s Services. By using the Services you agree to them. If you use the Services for a clinic, you confirm you are authorised to bind that clinic.</P>
        <H>1. The Services</H>
        <P>Salvia turns spoken consult notes into structured, policy-checked clinical records. Salvia is a documentation and compliance tool — <strong>it is not a medical device and does not provide medical advice or diagnosis.</strong> A qualified clinician remains responsible for reviewing and signing every record.</P>
        <H>2. Your responsibilities</H>
        <UL>
          <LI>Obtain all patient consents required before recording or processing audio.</LI>
          <LI>Review AI-generated output before relying on or signing it.</LI>
          <LI>Keep credentials secure and use the Services lawfully (see <Link to="/acceptable-use/">Acceptable Use</Link>).</LI>
        </UL>
        <H>3. Plans &amp; payment</H>
        <P>Paid plans are billed as described at sign-up. [PLACEHOLDER: confirm billing cycle, taxes/GST, auto-renewal.] See <Link to="/refund-policy/">Refund &amp; Cancellation</Link>.</P>
        <H>4. Intellectual property &amp; your data</H>
        <P>Salvia and its software remain our property. Your data remains yours; you grant us a limited licence to process it solely to provide the Services. We claim no ownership of clinical records.</P>
        <H>5. Disclaimers &amp; liability</H>
        <P>The Services are provided “as is”. To the maximum extent permitted by law, Salvia is not liable for indirect or consequential loss, and total liability is limited to [PLACEHOLDER: fees paid in the prior 12 months]. Nothing limits liability that cannot be limited by law.</P>
        <H>6. Termination &amp; governing law</H>
        <P>Either party may terminate per the plan terms; on termination you may export your data for [PLACEHOLDER: N days] before deletion. These Terms are governed by the laws of [PLACEHOLDER: jurisdiction].</P>
        <H>7. Contact</H>
        <P>{PRIVACY_EMAIL} · {ADDRESS}.</P>
      </>
    ),
  },
  {
    slug: 'cookies',
    title: 'Cookie Policy',
    seoTitle: 'Cookie Policy | Salvia',
    seoDesc: 'What cookies and similar technologies Salvia uses for essential functionality and analytics (PostHog, Cloudflare), and how to control them.',
    body: (
      <>
        <P>This policy explains the cookies and similar technologies Salvia uses on hellosalvia.com and in the app.</P>
        <H>Types we use</H>
        <UL>
          <LI><strong>Essential:</strong> sign-in, security, and saving your preferences (e.g., pricing market). These cannot be turned off.</LI>
          <LI><strong>Analytics:</strong> PostHog (EU Cloud) and Cloudflare measure page views, devices and funnel events to improve the product. [PLACEHOLDER: confirm whether analytics is consent-gated for EU/UK visitors.]</LI>
        </UL>
        <H>Managing cookies</H>
        <P>You can control cookies in your browser settings. Blocking essential cookies may break sign-in. [PLACEHOLDER: add a consent banner / preference centre for GDPR/UK visitors.]</P>
        <P>Questions: {PRIVACY_EMAIL}.</P>
      </>
    ),
  },
  {
    slug: 'dpa',
    title: 'Data Processing Agreement',
    seoTitle: 'Data Processing Agreement (DPA) | Salvia',
    seoDesc: 'Salvia’s DPA for clinics and hospitals: roles, instructions, sub-processors, security, transfers and breach handling under DPDP, GDPR, AU and NZ law.',
    body: (
      <>
        <P>This DPA forms part of the agreement between the customer (clinic/hospital — the “Controller” / Data Fiduciary) and {ENTITY} (the “Processor” / Data Processor) when Salvia processes personal and health data on the customer’s behalf.</P>
        <H>1. Roles &amp; scope</H>
        <P>The customer determines the purposes of processing; Salvia processes only on the customer’s documented instructions to deliver the Services (transcription, structuring, compliance checks, storage).</P>
        <H>2. Salvia’s obligations</H>
        <UL>
          <LI>Process only on instructions; keep personnel under confidentiality.</LI>
          <LI>Implement the security measures in our <Link to="/security/">Security overview</Link>.</LI>
          <LI>Not use clinical data for our own purposes or to train AI models. [PLACEHOLDER: confirm contractually with sub-processors.]</LI>
          <LI>Assist with data-subject requests, DPIAs and breach notification (within 72 hours of becoming aware).</LI>
          <LI>Delete or return data on termination.</LI>
        </UL>
        <H>3. Sub-processors</H>
        <P>The customer authorises the sub-processors listed at <Link to="/subprocessors/">/subprocessors</Link>. We give notice before adding a new one so the customer can object.</P>
        <H>4. International transfers</H>
        <P>Where processing occurs outside the customer’s country, we apply appropriate safeguards (SCCs or equivalent) consistent with the DPDP Act 2023, GDPR, AU APPs and NZ HIPC 2020. [PLACEHOLDER: confirm data-localisation commitments for India.]</P>
        <H>5. Audit &amp; term</H>
        <P>We make available information needed to demonstrate compliance and allow audits on reasonable notice. This DPA runs for the duration of processing. To request a signed copy: {PRIVACY_EMAIL}.</P>
      </>
    ),
  },
  {
    slug: 'subprocessors',
    title: 'Sub-processors',
    seoTitle: 'Sub-processors | Salvia',
    seoDesc: 'The third-party sub-processors Salvia uses to deliver its clinical documentation and compliance Services, what they do, and where they process data.',
    body: (
      <>
        <P>Salvia uses the sub-processors below to deliver the Services. Each is bound by a data-processing agreement and may process personal data only to provide its service to Salvia. We notify customers before adding a new sub-processor.</P>
        <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid rgba(15,23,42,0.1)' }}>
                <th style={{ padding: '0.6rem 0.5rem', color: 'var(--salvia-primary)' }}>Sub-processor</th>
                <th style={{ padding: '0.6rem 0.5rem', color: 'var(--salvia-primary)' }}>Purpose</th>
                <th style={{ padding: '0.6rem 0.5rem', color: 'var(--salvia-primary)' }}>Region</th>
              </tr>
            </thead>
            <tbody>
              {SUBPROCESSORS.map((row) => (
                <tr key={row[0]} style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                  <td style={{ padding: '0.6rem 0.5rem', color: 'var(--salvia-primary)', fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ padding: '0.6rem 0.5rem', color: 'var(--salvia-text-muted)' }}>{row[1]}</td>
                  <td style={{ padding: '0.6rem 0.5rem', color: 'var(--salvia-text-muted)' }}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>[PLACEHOLDER: confirm exact legal entities, regions, and add any analytics/support/payment providers once live.] Questions: {PRIVACY_EMAIL}.</P>
      </>
    ),
  },
  {
    slug: 'refund-policy',
    title: 'Refund & Cancellation Policy',
    seoTitle: 'Refund & Cancellation Policy | Salvia',
    seoDesc: 'How cancellations and refunds work for Salvia subscriptions.',
    body: (
      <>
        <P>This policy covers cancellations and refunds for Salvia subscriptions. [PLACEHOLDER: Salvia is currently sales-led with no self-serve checkout; update this before enabling online payments — Razorpay/Stripe require a published policy.]</P>
        <H>Cancellation</H>
        <P>You can cancel at any time; access continues until the end of the current billing period. [PLACEHOLDER: confirm notice period for annual plans.]</P>
        <H>Refunds</H>
        <P>[PLACEHOLDER: state your refund window — e.g., pro-rata / 14-day / no refunds on monthly plans.] To request a cancellation or refund: {PRIVACY_EMAIL}.</P>
      </>
    ),
  },
  {
    slug: 'acceptable-use',
    title: 'Acceptable Use Policy',
    seoTitle: 'Acceptable Use Policy | Salvia',
    seoDesc: 'The rules for using Salvia responsibly and lawfully.',
    body: (
      <>
        <P>You agree not to use the Services to:</P>
        <UL>
          <LI>Process data without the consents and legal basis required (including patient consent for recording).</LI>
          <LI>Upload unlawful, infringing or malicious content, or attempt to breach security.</LI>
          <LI>Reverse-engineer the Services, resell access, or exceed plan limits abusively.</LI>
          <LI>Rely on AI output as a substitute for clinician review and sign-off.</LI>
        </UL>
        <P>We may suspend accounts that violate this policy. Report abuse: {PRIVACY_EMAIL}.</P>
      </>
    ),
  },
  {
    slug: 'security',
    title: 'Security Overview',
    seoTitle: 'Security | Salvia',
    seoDesc: 'How Salvia protects clinical data: encryption, access control, hosting, audit trails and breach response.',
    body: (
      <>
        <P>Security is core to a compliance product. This overview summarises our technical and organisational measures. [PLACEHOLDER: confirm each item with engineering before publishing.]</P>
        <H>Encryption</H>
        <P>Data is encrypted in transit (TLS 1.2+) and at rest (AES-256).</P>
        <H>Access control</H>
        <P>Least-privilege, role-based access; access to clinical data is logged.</P>
        <H>Hosting &amp; isolation</H>
        <P>Hosted on Cloudflare with the Sal backend; [PLACEHOLDER: confirm primary region and tenant isolation].</P>
        <H>Audit trail</H>
        <P>Records are versioned and hash-stamped so changes are tamper-evident.</P>
        <H>Breach response</H>
        <P>We notify affected customers and regulators within 72 hours where required. Report a vulnerability: security@hellosalvia.com.</P>
      </>
    ),
  },
];

export const LEGAL_DOCS = DOCS;

export const LegalPage: React.FC<{ slug: string }> = ({ slug }) => {
  const doc = DOCS.find((d) => d.slug === slug) ?? DOCS[0];
  return (
    <>
      <SEO title={doc.seoTitle.replace(' | Salvia', '')} description={doc.seoDesc} path={`/${doc.slug}`} />
      <Header />
      <main style={{ flex: 1, zIndex: 10, position: 'relative' }}>
        <section style={{ padding: 'clamp(7rem, 12vw, 9rem) 0 5rem' }}>
          <div className="container" style={{ maxWidth: '780px' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--salvia-primary)', margin: '0 0 0.5rem' }}>{doc.title}</h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--salvia-text-muted)', margin: '0 0 1.5rem' }}>Last updated: {UPDATED}</p>
            <div style={{ background: 'rgba(255,78,0,0.06)', border: '1px solid rgba(255,78,0,0.2)', borderRadius: 12, padding: '0.9rem 1.1rem', margin: '0 0 2rem', fontSize: '0.88rem', color: 'var(--salvia-text-muted)' }}>
              <strong style={{ color: 'var(--salvia-accent)' }}>Draft — pending legal review.</strong> This document is a working draft and not yet legal advice. It will be finalised with counsel before it takes effect.
            </div>
            {doc.body}
            <p style={{ marginTop: '3rem', fontSize: '0.95rem' }}>
              <Link to="/privacy/" style={{ color: 'var(--salvia-accent)', fontWeight: 600 }}>Privacy</Link>{' · '}
              <Link to="/terms/" style={{ color: 'var(--salvia-accent)', fontWeight: 600 }}>Terms</Link>{' · '}
              <Link to="/dpa/" style={{ color: 'var(--salvia-accent)', fontWeight: 600 }}>DPA</Link>{' · '}
              <Link to="/subprocessors/" style={{ color: 'var(--salvia-accent)', fontWeight: 600 }}>Sub-processors</Link>{' · '}
              <Link to="/security/" style={{ color: 'var(--salvia-accent)', fontWeight: 600 }}>Security</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

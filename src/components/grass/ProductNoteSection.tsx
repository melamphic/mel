import { Rv } from './Rv';

// "See what it produces" — a real generated Salvia note as product proof.
// Reused on the landing page and /melamphic.
export function ProductNoteSection() {
  return (
    <section className="g-section">
      <div className="g-container">
        <div className="g-split">
          <div>
            <Rv as="h2" className="g-h2">
              See what it <span className="g-hl">produces.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              A clinician speaks; Salvia returns a signed, compliance-grade record —
              patient header, clinical assessment, vitals, prescription, pain and consent —
              sealed and audit-ready. A real note, straight from the product.
            </Rv>
            <Rv delay={2} style={{ marginTop: 30 }}>
              <a className="g-btn g-btn--green" href="https://app.hellosalvia.com" target="_blank" rel="noreferrer">
                Open the app
              </a>
            </Rv>
          </div>
          <Rv className="g-split-art" delay={1}>
            <img
              src="/product/sal-note.png"
              alt="A signed Salvia clinical note — outpatient consultation with vitals, pain score, prescription and management plan"
              loading="lazy"
              style={{ width: '100%', maxWidth: 430, borderRadius: 14, boxShadow: '0 14px 44px rgba(20,40,25,0.14)', border: '1px solid #e6ece6' }}
            />
          </Rv>
        </div>
        <Rv delay={2} style={{ marginTop: 56 }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e6ece6', boxShadow: '0 18px 50px rgba(20,40,25,0.12)' }}>
            <img
              src="/product/patient-profile.png"
              alt="The Salvia clinician workspace — a patient profile with notes, pain scores, consents and a compliance queue"
              loading="lazy"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <p className="g-small" style={{ marginTop: 14, color: '#6a736a', textAlign: 'center' }}>
            Inside the workspace — notes, pain scores, consents and registers in one patient view.
          </p>
        </Rv>
      </div>
    </section>
  );
}

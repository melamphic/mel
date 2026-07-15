import React from 'react';

// Hero: copy first, then the consult-to-sealed-record scenario as one wide
// illustration — the doctor speaks, the voice becomes checked documents,
// the documents file into the vault. Static image, no WebGL.
export const HeroGrass: React.FC = () => {
  return (
    <header className="g-h3d-hero">
      <div className="g-stage-copy">
        <h1 className="g-h1">
          Every consult,
          <br />
          <span className="g-hl">on the record.</span>
        </h1>
        <p className="g-sub" style={{ margin: '22px auto 32px', maxWidth: 660 }}>
          Salvia listens — <b>ambient in the OPD</b> or a short <b>voice note</b> after the
          consult — and turns the audio into complete clinical documentation, checked
          against your policies. The clinician verifies. The record is sealed.{' '}
          <b>You can prove what happened.</b>
        </p>
      </div>

      {/* the real product: the clinician workspace, a patient profile */}
      <div className="g-h3d-stage">
        <img
          src="/product/patient-profile.png"
          alt="The Salvia clinician workspace — a patient profile with notes, pain scores, consents and a compliance queue"
          style={{ width: '100%', maxWidth: 1040, height: 'auto', display: 'block', margin: '0 auto', borderRadius: 16, border: '1px solid #e6ece6', boxShadow: '0 24px 60px rgba(20,40,25,0.16)' }}
        />
      </div>
    </header>
  );
};

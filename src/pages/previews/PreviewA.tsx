import { Link } from 'react-router-dom';

const css = `
.pa-root {
  background: #ffffff;
  color: #101413;
  font-family: 'Archivo', sans-serif;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.pa-root ::selection { background: #0E5A4F; color: #ffffff; }
.pa-root a { text-decoration: none; color: inherit; }

/* ---- nav ---- */
.pa-nav { padding: 30px 0; }
.pa-nav-inner { display: flex; align-items: baseline; justify-content: space-between; }
.pa-wordmark { font-size: 21px; font-weight: 800; letter-spacing: -0.03em; }
.pa-nav-link {
  font-size: 15px; font-weight: 600; letter-spacing: -0.01em;
  border-bottom: 1px solid rgba(16, 20, 19, 0.25);
  padding-bottom: 2px;
  transition: color 0.18s ease, border-color 0.18s ease;
}
.pa-nav-link:hover { color: #0E5A4F; border-color: #0E5A4F; }

/* ---- hero ---- */
.pa-hero { padding: clamp(110px, 20vh, 210px) 0 clamp(110px, 17vh, 190px); }
.pa-kicker {
  font-size: 12px; font-weight: 600; letter-spacing: 0.16em;
  text-transform: uppercase; color: #5c6461;
}
.pa-hero h1 {
  margin: 34px 0 0;
  font-size: clamp(54px, 10.5vw, 120px);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 0.98;
}
.pa-accent { color: #0E5A4F; }
.pa-sub {
  margin: 44px 0 0;
  max-width: 34em;
  font-size: clamp(17px, 1.6vw, 20px);
  line-height: 1.55;
  color: #4a524e;
}
.pa-ctas { margin-top: 52px; display: flex; flex-wrap: wrap; gap: 20px 44px; align-items: baseline; }
.pa-cta {
  font-size: 17px; font-weight: 700; letter-spacing: -0.01em;
  border-bottom: 2px solid #101413; padding-bottom: 3px;
  transition: color 0.18s ease, border-color 0.18s ease;
}
.pa-cta:hover { color: #0E5A4F; border-color: #0E5A4F; }
.pa-cta-quiet {
  font-size: 17px; font-weight: 500; color: #5c6461;
  border-bottom: 1px solid rgba(16, 20, 19, 0.18); padding-bottom: 3px;
  transition: color 0.18s ease, border-color 0.18s ease;
}
.pa-cta-quiet:hover { color: #0E5A4F; border-color: #0E5A4F; }

/* load reveal */
.pa-rise { opacity: 0; transform: translateY(14px); animation: pa-rise 0.7s cubic-bezier(0.2, 0.6, 0.2, 1) forwards; }
.pa-d1 { animation-delay: 0.05s; }
.pa-d2 { animation-delay: 0.15s; }
.pa-d3 { animation-delay: 0.3s; }
.pa-d4 { animation-delay: 0.42s; }
@keyframes pa-rise { to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .pa-rise { animation: none; opacity: 1; transform: none; }
}

/* ---- statement band ---- */
.pa-band {
  border-top: 1px solid rgba(16, 20, 19, 0.12);
  border-bottom: 1px solid rgba(16, 20, 19, 0.12);
  padding: clamp(80px, 13vh, 150px) 0;
}
.pa-band-grid { display: flex; gap: clamp(36px, 6vw, 88px); align-items: flex-start; flex-wrap: wrap; }
.pa-stat {
  font-size: clamp(110px, 17vw, 220px);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.85;
}
.pa-band-copy { max-width: 21em; padding-top: clamp(4px, 1vw, 18px); }
.pa-band-copy p {
  margin: 0;
  font-size: clamp(23px, 2.8vw, 33px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.28;
}
.pa-source { margin-top: 30px; font-size: 13px; color: #5c6461; letter-spacing: 0.01em; }

/* ---- sealed record ---- */
.pa-record { padding: clamp(120px, 18vh, 200px) 0; }
.pa-card {
  margin-top: 52px;
  max-width: 880px;
  border: 1px solid rgba(16, 20, 19, 0.16);
  padding: clamp(30px, 5vw, 60px);
}
.pa-card-head { display: flex; gap: clamp(20px, 3vw, 32px); align-items: flex-start; }
.pa-card-head img { width: 56px; height: auto; flex: none; margin-top: 2px; }
.pa-card-title { margin: 0; font-size: clamp(21px, 2.4vw, 27px); font-weight: 700; letter-spacing: -0.02em; }
.pa-card-meta { margin: 8px 0 0; font-size: 14px; color: #5c6461; }
.pa-card-rows { margin-top: clamp(30px, 4vw, 44px); border-top: 1px solid rgba(16, 20, 19, 0.1); }
.pa-row {
  display: flex; gap: 24px; align-items: baseline;
  padding: 15px 0;
  border-bottom: 1px solid rgba(16, 20, 19, 0.1);
}
.pa-row dt {
  flex: none; width: 92px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
  text-transform: uppercase; color: #5c6461;
}
.pa-row dd { margin: 0; font-size: 16px; font-weight: 500; letter-spacing: -0.005em; }
.pa-pass { color: #0E5A4F; font-weight: 600; }
.pa-hash {
  margin-top: clamp(28px, 4vw, 40px);
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #101413;
  display: flex; align-items: center; gap: 12px;
}
.pa-hash::before {
  content: '';
  width: 8px; height: 8px; flex: none;
  background: #0E5A4F; border-radius: 50%;
}
.pa-card-note {
  margin: 30px 0 0;
  max-width: 34em;
  font-size: 15px;
  line-height: 1.55;
  color: #4a524e;
  border-left: 2px solid #0E5A4F;
  padding-left: 20px;
}

/* ---- final ---- */
.pa-final {
  border-top: 1px solid rgba(16, 20, 19, 0.12);
  padding: clamp(130px, 20vh, 210px) 0;
}
.pa-final h2 {
  margin: 0;
  font-size: clamp(38px, 6vw, 72px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.02;
}
.pa-final .pa-cta { display: inline-block; margin-top: 44px; }
.pa-foot {
  border-top: 1px solid rgba(16, 20, 19, 0.12);
  padding: 38px 0 60px;
  font-size: 13px;
  color: #5c6461;
}

@media (max-width: 640px) {
  .pa-band-grid { flex-direction: column; }
  .pa-row { flex-direction: column; gap: 6px; }
  .pa-row dt { width: auto; }
  .pa-card-head { flex-direction: column; }
}
`;

export default function PreviewA() {
  return (
    <div className="pa-root">
      <style>{css}</style>

      <header className="pa-nav">
        <div className="g-container pa-nav-inner">
          <span className="pa-wordmark">Salvia</span>
          <Link to="/start" className="pa-nav-link">Get started</Link>
        </div>
      </header>

      <section className="pa-hero">
        <div className="g-container">
          <p className="pa-kicker pa-rise pa-d1">Clinical records infrastructure · India</p>
          <h1 className="pa-rise pa-d2">
            Every consult,
            <br />
            <span className="pa-accent">on the record.</span>
          </h1>
          <p className="pa-sub pa-rise pa-d3">
            The doctor speaks; Salvia's AI turns the audio into complete clinical
            documentation on your hospital's own forms, checks it for compliance
            against your policies, and seals it before anyone signs.
          </p>
          <div className="pa-ctas pa-rise pa-d4">
            <Link to="/start" className="pa-cta">Get started</Link>
            <a href="#record" className="pa-cta-quiet">See a sealed record</a>
          </div>
        </div>
      </section>

      <section className="pa-band">
        <div className="g-container pa-band-grid">
          <div className="pa-stat">22%</div>
          <div className="pa-band-copy">
            <p>
              of proven negligence cases at India's national consumer court
              involved a failure to keep accurate records.
            </p>
            <p className="pa-source">IJME five-year review of 253 NCDRC judgments</p>
          </div>
        </div>
      </section>

      <section className="pa-record" id="record">
        <div className="g-container">
          <p className="pa-kicker">What a sealed record looks like</p>
          <article className="pa-card">
            <div className="pa-card-head">
              <img src="/illustrations/ill_seal.webp" alt="Sealed document with verification badge" />
              <div>
                <h3 className="pa-card-title">OPD Consult — verified &amp; signed</h3>
                <p className="pa-card-meta">Dr. Nair · 4 Jul 2026 · 6:42 pm</p>
              </div>
            </div>
            <dl className="pa-card-rows">
              <div className="pa-row">
                <dt>Audio</dt>
                <dd>Voice note attached · 02:47 · Malayalam / English</dd>
              </div>
              <div className="pa-row">
                <dt>Form</dt>
                <dd>OPD Consultation Note · clinic version 12</dd>
              </div>
              <div className="pa-row">
                <dt>Policy</dt>
                <dd>Outpatient documentation policy v4 · <span className="pa-pass">all checks passed</span></dd>
              </div>
            </dl>
            <p className="pa-hash">SHA-256 · 7e3b1c4a9d22f0e8…</p>
            <p className="pa-card-note">
              Tampering with any byte invalidates the bundle hash printed in the
              footer of every page.
            </p>
          </article>
        </div>
      </section>

      <section className="pa-final">
        <div className="g-container">
          <h2>The record you'll be glad exists.</h2>
          <Link to="/start" className="pa-cta">Get started</Link>
        </div>
      </section>

      <footer className="pa-foot">
        <div className="g-container">
          © 2026 Melamphic AI Private Limited · Made in India
        </div>
      </footer>
    </div>
  );
}

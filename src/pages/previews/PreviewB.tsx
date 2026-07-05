import { Link } from 'react-router-dom'

/* ============================================================
   PreviewB — "LOUD COLOR-BLOCK" direction (super.money energy).
   White canvas, giant teal headline, then every section is a
   big saturated rounded color block with a white product card
   rising from its bottom edge. One font: Archivo. Scoped: .pb-*
   ============================================================ */

const TEMPLATES = [
  { name: 'Standard SOAP Consultation Record', tag: 'Consultation', lines: 4 },
  { name: 'Controlled Drug Register Entry', tag: 'Register', lines: 3 },
  { name: 'Vaccination Encounter', tag: 'Encounter', lines: 3 },
  { name: 'Medication Administration Record (MAR)', tag: 'Nursing', lines: 4 },
  { name: 'Pain Assessment in Advanced Dementia', tag: 'Assessment', lines: 3 },
]

const PLANS = [
  { name: 'Starter', price: '₹1,000', per: '/mo', notes: '400 notes', blurb: 'For small clinics building the habit.', popular: false },
  { name: 'Clinic', price: '₹3,000', per: '/mo', notes: '1,500 notes', blurb: 'For busy OPDs. Most clinics land here.', popular: true },
  { name: 'Group', price: '₹6,000', per: '/mo', notes: '3,000 notes', blurb: 'Multi-branch clinics and groups.', popular: false },
  { name: 'Hospitals', price: 'Custom', per: '', notes: 'Committed minimum', blurb: 'Per-note pricing at hospital volume.', popular: false },
]

const WAVE_HEIGHTS = [12, 22, 30, 18, 34, 26, 14, 32, 20, 36, 24, 12, 28, 16]

export default function PreviewB() {
  return (
    <div className="pb-page">
      <style>{`
        .pb-page {
          --pb-teal: #0E5A4F;
          --pb-lime: #C9F27D;
          --pb-marigold: #F7C45E;
          --pb-coral: #FF7A59;
          --pb-navy: #171C2B;
          --pb-ink: #171C2B;
          --pb-red: #D92D20;
          --pb-r: 34px;
          font-family: 'Archivo', sans-serif;
          background: #FFFFFF;
          color: var(--pb-ink);
          font-weight: 600;
          -webkit-font-smoothing: antialiased;
          overflow-x: clip;
        }
        .pb-page * { box-sizing: border-box; margin: 0; }

        /* ---------- nav ---------- */
        .pb-nav { border-bottom: 1px solid #EDEDED; background: #fff; position: sticky; top: 0; z-index: 40; }
        .pb-nav-in { display: flex; align-items: center; gap: 28px; height: 62px; }
        .pb-logo { font-weight: 900; font-size: 21px; letter-spacing: -0.03em; color: var(--pb-teal); text-decoration: none; display: flex; align-items: center; gap: 8px; }
        .pb-logo i { width: 10px; height: 10px; border-radius: 3px; background: var(--pb-lime); border: 2px solid var(--pb-teal); display: inline-block; }
        .pb-nav-links { display: flex; gap: 22px; margin-left: auto; }
        .pb-nav-links a { color: var(--pb-ink); text-decoration: none; font-size: 14.5px; font-weight: 600; opacity: .78; }
        .pb-nav-links a:hover { opacity: 1; }
        .pb-pill { display: inline-flex; align-items: center; gap: 9px; background: var(--pb-teal); color: #fff; text-decoration: none; font-weight: 800; border-radius: 999px; padding: 11px 22px; font-size: 15px; letter-spacing: -0.01em; transition: transform .15s ease, box-shadow .15s ease; }
        .pb-pill b { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--pb-lime); }
        .pb-pill:hover { transform: translateY(-2px); box-shadow: 0 10px 24px -10px rgba(14,90,79,.55); }
        .pb-pill--nav { padding: 9px 18px; font-size: 14px; }

        /* ---------- hero ---------- */
        .pb-hero { padding: 96px 0 72px; text-align: center; }
        .pb-kicker { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--pb-teal); background: #EAF6EC; border-radius: 999px; padding: 8px 16px; margin-bottom: 26px; }
        .pb-h1 { font-size: clamp(52px, 9.2vw, 124px); font-weight: 900; letter-spacing: -0.045em; line-height: .96; color: var(--pb-teal); margin: 0 auto; max-width: 11ch; }
        .pb-hero-sub { font-size: clamp(16px, 1.9vw, 20px); font-weight: 600; color: #46504B; max-width: 56ch; margin: 26px auto 0; line-height: 1.55; }
        .pb-hero-cta { display: flex; align-items: center; justify-content: center; gap: 22px; margin-top: 36px; flex-wrap: wrap; }
        .pb-pill--big { padding: 16px 32px; font-size: 17px; }
        .pb-ghost { color: var(--pb-ink); font-weight: 700; text-decoration: none; font-size: 15.5px; border-bottom: 2px solid var(--pb-marigold); padding-bottom: 2px; }
        .pb-hero-chips { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 42px; }
        .pb-hero-chips span { font-size: 13px; font-weight: 700; border: 1.5px solid #E3E3E3; border-radius: 999px; padding: 7px 14px; color: #3A423E; }

        /* ---------- blocks ---------- */
        .pb-stack { display: flex; flex-direction: column; gap: 18px; padding-bottom: 18px; }
        .pb-block { border-radius: var(--pb-r); padding: 44px 44px 0; overflow: hidden; position: relative; display: flex; flex-direction: column; }
        .pb-eyebrow { font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; opacity: .72; margin-bottom: 14px; }
        .pb-block-h { font-size: clamp(30px, 3.6vw, 46px); font-weight: 900; letter-spacing: -0.035em; line-height: 1.02; }
        .pb-block-p { font-size: 15.5px; line-height: 1.55; margin-top: 14px; max-width: 44ch; opacity: .85; }
        .pb-riser { background: #fff; border-radius: 20px 20px 0 0; margin-top: auto; box-shadow: 0 -14px 44px -18px rgba(10,14,20,.35); color: var(--pb-ink); }

        /* trio */
        .pb-trio { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .pb-trio .pb-block { min-height: 520px; }
        .pb-step { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 900; letter-spacing: .15em; border-radius: 999px; padding: 6px 13px; margin-bottom: 18px; width: fit-content; }
        .pb-block--teal { background: var(--pb-teal); color: #fff; }
        .pb-block--teal .pb-step { background: rgba(255,255,255,.14); color: var(--pb-lime); }
        .pb-block--lime { background: var(--pb-lime); color: var(--pb-ink); }
        .pb-block--lime .pb-step { background: rgba(14,90,79,.12); color: var(--pb-teal); }
        .pb-block--marigold { background: var(--pb-marigold); color: var(--pb-ink); }
        .pb-block--marigold .pb-step { background: rgba(23,28,43,.1); color: var(--pb-ink); }
        .pb-accent-img { position: absolute; top: 26px; right: 26px; width: 96px; height: auto; transform: rotate(8deg); filter: drop-shadow(0 10px 18px rgba(10,14,20,.25)); pointer-events: none; }
        .pb-trio .pb-riser { padding: 20px 22px 26px; margin-top: 28px; }
        .pb-trio .pb-block-h { font-size: clamp(30px, 3vw, 40px); }

        /* speak card */
        .pb-rec { display: flex; align-items: center; gap: 9px; font-size: 12.5px; font-weight: 800; letter-spacing: .06em; color: var(--pb-red); text-transform: uppercase; }
        .pb-rec i { width: 9px; height: 9px; border-radius: 50%; background: var(--pb-red); animation: pb-pulse 1.4s ease-in-out infinite; }
        .pb-wave { display: flex; align-items: center; gap: 4px; height: 44px; margin: 16px 0 14px; }
        .pb-wave span { width: 5px; border-radius: 3px; background: var(--pb-teal); transform-origin: 50% 50%; animation: pb-wave 1.1s ease-in-out infinite; }
        .pb-quote { font-size: 14px; line-height: 1.5; color: #46504B; border-left: 3px solid var(--pb-lime); padding-left: 12px; font-weight: 600; }
        .pb-quote b { color: var(--pb-ink); }

        /* check card */
        .pb-check-row { display: flex; align-items: flex-start; gap: 11px; padding: 11px 0; border-bottom: 1px solid #F0F0F0; font-size: 13.5px; font-weight: 700; line-height: 1.35; }
        .pb-check-row:last-child { border-bottom: 0; padding-bottom: 0; }
        .pb-tick { flex: none; width: 21px; height: 21px; border-radius: 50%; display: grid; place-items: center; font-size: 11px; font-weight: 900; background: #E4F3E6; color: var(--pb-teal); margin-top: 1px; }
        .pb-check-row--fail { color: var(--pb-red); }
        .pb-check-row--fail .pb-tick { background: #FDE8E6; color: var(--pb-red); }
        .pb-fail-tag { display: inline-block; margin-top: 5px; font-size: 11px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; background: var(--pb-red); color: #fff; border-radius: 6px; padding: 3px 8px; }
        .pb-check-note { font-size: 12px; color: #6B7570; font-weight: 600; margin-top: 12px; line-height: 1.45; }

        /* seal card */
        .pb-seal-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .pb-seal-title { font-size: 14.5px; font-weight: 800; letter-spacing: -0.01em; }
        .pb-sealed { font-size: 11px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; background: var(--pb-teal); color: var(--pb-lime); border-radius: 999px; padding: 5px 11px; flex: none; }
        .pb-seal-chips { display: flex; gap: 7px; flex-wrap: wrap; margin: 13px 0; }
        .pb-seal-chips span { font-size: 11.5px; font-weight: 700; background: #F4F1E8; border-radius: 999px; padding: 5px 11px; color: #57503A; }
        .pb-hash { font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 11.5px; background: var(--pb-navy); color: var(--pb-lime); border-radius: 10px; padding: 10px 12px; letter-spacing: .02em; overflow-wrap: anywhere; }
        .pb-hash small { display: block; color: #8E96A8; font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 4px; }

        /* navy — the six-year test */
        .pb-block--navy { background: var(--pb-navy); color: #fff; padding-top: 64px; }
        .pb-navy-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 44px; align-items: center; }
        .pb-block--navy .pb-eyebrow { color: var(--pb-marigold); opacity: 1; }
        .pb-block--navy .pb-block-h { font-size: clamp(34px, 4.4vw, 58px); max-width: 15ch; }
        .pb-block--navy .pb-block-p { font-size: 17px; max-width: 46ch; opacity: .8; }
        .pb-stat { text-align: right; }
        .pb-stat-num { font-size: clamp(110px, 15vw, 200px); font-weight: 900; letter-spacing: -0.05em; line-height: .82; color: var(--pb-marigold); }
        .pb-stat-cap { font-size: 14.5px; line-height: 1.5; opacity: .78; max-width: 34ch; margin: 18px 0 0 auto; }
        .pb-navy-riser { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 52px; padding: 26px 30px 30px; }
        .pb-year { padding: 0 22px; border-left: 1px solid #ECECEC; }
        .pb-year:first-child { border-left: 0; padding-left: 0; }
        .pb-year b { display: block; font-size: 22px; font-weight: 900; letter-spacing: -0.02em; color: var(--pb-teal); margin-bottom: 6px; }
        .pb-year p { font-size: 13.5px; line-height: 1.45; color: #46504B; font-weight: 600; }
        .pb-globe { position: absolute; right: -28px; top: 40px; width: 170px; opacity: .3; transform: rotate(-8deg); pointer-events: none; }

        /* coral — templates */
        .pb-block--coral { background: var(--pb-coral); color: var(--pb-navy); padding-top: 56px; }
        .pb-tpl-row { display: flex; align-items: flex-end; gap: 14px; margin-top: 44px; }
        .pb-tpl { flex: 1; background: #fff; border-radius: 18px 18px 0 0; padding: 18px 18px 22px; box-shadow: 0 -14px 44px -18px rgba(10,14,20,.35); transition: transform .18s ease; }
        .pb-tpl:hover { transform: translateY(-8px); }
        .pb-tpl:nth-child(odd) { padding-top: 30px; }
        .pb-tpl-tag { display: inline-block; font-size: 10.5px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; background: #FFEDE7; color: #C2431F; border-radius: 6px; padding: 4px 9px; margin-bottom: 11px; }
        .pb-tpl-name { font-size: 14px; font-weight: 800; letter-spacing: -0.015em; line-height: 1.3; min-height: 3.9em; }
        .pb-tpl-lines { display: flex; flex-direction: column; gap: 6px; margin-top: 13px; }
        .pb-tpl-lines i { height: 6px; border-radius: 3px; background: #EFEFEA; }
        .pb-tpl-lines i:nth-child(2) { width: 82%; }
        .pb-tpl-lines i:nth-child(3) { width: 64%; background: #DEF0C8; }
        .pb-tpl-lines i:nth-child(4) { width: 90%; }

        /* lime — pricing */
        .pb-block--lime-price { background: var(--pb-lime); color: var(--pb-ink); padding-top: 56px; }
        .pb-price-note { font-size: 14px; font-weight: 700; margin-top: 14px; color: rgba(23,28,43,.72); }
        .pb-price-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; align-items: end; margin-top: 44px; }
        .pb-plan { background: #fff; border-radius: 20px 20px 0 0; padding: 24px 22px 28px; box-shadow: 0 -14px 44px -18px rgba(10,14,20,.3); position: relative; }
        .pb-plan--popular { padding-top: 34px; padding-bottom: 44px; outline: 3px solid var(--pb-teal); outline-offset: -3px; }
        .pb-popular-tag { position: absolute; top: 14px; right: 14px; font-size: 10.5px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; background: var(--pb-marigold); border-radius: 999px; padding: 5px 11px; }
        .pb-plan-name { font-size: 13px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: var(--pb-teal); }
        .pb-plan-price { font-size: clamp(30px, 2.6vw, 38px); font-weight: 900; letter-spacing: -0.03em; margin-top: 8px; }
        .pb-plan-price small { font-size: 15px; font-weight: 700; color: #7A827D; letter-spacing: 0; }
        .pb-plan-notes { font-size: 14px; font-weight: 800; margin-top: 4px; }
        .pb-plan-notes em { font-style: normal; color: #7A827D; font-weight: 600; }
        .pb-plan-blurb { font-size: 13px; font-weight: 600; color: #5B635E; line-height: 1.45; margin-top: 10px; }

        /* final CTA + footer */
        .pb-final { text-align: center; padding: 104px 0 64px; }
        .pb-final-h { font-size: clamp(36px, 5.4vw, 68px); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--pb-teal); max-width: 16ch; margin: 0 auto; }
        .pb-final .pb-pill--big { margin-top: 34px; }
        .pb-footer { border-top: 1px solid #EDEDED; padding: 26px 0 34px; }
        .pb-footer-in { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-size: 13px; font-weight: 600; color: #7A827D; }
        .pb-footer-in a { color: var(--pb-teal); text-decoration: none; font-weight: 700; }

        @keyframes pb-wave { 0%, 100% { transform: scaleY(.3); } 50% { transform: scaleY(1); } }
        @keyframes pb-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
        @media (prefers-reduced-motion: reduce) {
          .pb-wave span, .pb-rec i { animation: none; }
          .pb-pill, .pb-tpl { transition: none; }
        }

        @media (max-width: 1020px) {
          .pb-trio { grid-template-columns: 1fr; }
          .pb-trio .pb-block { min-height: 0; }
          .pb-navy-grid { grid-template-columns: 1fr; gap: 30px; }
          .pb-stat, .pb-stat-cap { text-align: left; margin-left: 0; }
          .pb-tpl-row { flex-wrap: wrap; }
          .pb-tpl { flex: 1 1 44%; border-radius: 18px; }
          .pb-tpl:nth-child(odd) { padding-top: 18px; }
          .pb-block--coral { padding-bottom: 44px; }
          .pb-price-row { grid-template-columns: 1fr 1fr; }
          .pb-plan { border-radius: 20px; }
          .pb-plan--popular { padding-bottom: 28px; }
          .pb-block--lime-price { padding-bottom: 44px; }
        }
        @media (max-width: 680px) {
          .pb-nav-links { display: none; }
          .pb-hero { padding: 64px 0 52px; }
          .pb-block { padding: 30px 24px 0; }
          .pb-block--coral, .pb-block--lime-price { padding-bottom: 30px; }
          .pb-navy-riser { grid-template-columns: 1fr; gap: 18px; }
          .pb-year { border-left: 0; padding: 0; }
          .pb-price-row { grid-template-columns: 1fr; }
          .pb-tpl { flex: 1 1 100%; }
          .pb-accent-img { width: 70px; top: 18px; right: 18px; }
          .pb-globe { display: none; }
        }
      `}</style>

      {/* ---------- nav ---------- */}
      <nav className="pb-nav">
        <div className="g-container pb-nav-in">
          <Link to="/" className="pb-logo"><i />Salvia</Link>
          <div className="pb-nav-links">
            <a href="#pb-how">How it works</a>
            <a href="#pb-templates">Templates</a>
            <a href="#pb-pricing">Pricing</a>
          </div>
          <Link to="/start" className="pb-pill pb-pill--nav"><b />Start free</Link>
        </div>
      </nav>

      {/* ---------- hero ---------- */}
      <header className="pb-hero">
        <div className="g-container">
          <span className="pb-kicker">AI clinical documentation &amp; compliance</span>
          <h1 className="pb-h1">Every consult, on the record.</h1>
          <p className="pb-hero-sub">
            You speak — ambient in the OPD or a quick voice note, Hinglish welcome.
            Salvia fills your clinic&rsquo;s exact form, checks policy before you sign,
            and seals the record with the audio attached.
          </p>
          <div className="pb-hero-cta">
            <Link to="/start" className="pb-pill pb-pill--big"><b />Start free</Link>
            <a href="#pb-pricing" className="pb-ghost">See pricing</a>
          </div>
          <div className="pb-hero-chips">
            <span>Ambient OPD listening</span>
            <span>Hinglish understood</span>
            <span>Policy check before signing</span>
            <span>SHA-256 on every printed page</span>
          </div>
        </div>
      </header>

      {/* ---------- trio: speak / check / seal ---------- */}
      <section id="pb-how" className="g-container pb-stack">
        <div className="pb-trio">
          {/* SPEAK — teal */}
          <div className="pb-block pb-block--teal">
            <img className="pb-accent-img" src="/illustrations/mic.webp" alt="" aria-hidden="true" />
            <span className="pb-step">01 · SPEAK</span>
            <h2 className="pb-block-h">Talk like you already talk.</h2>
            <p className="pb-block-p">
              No dictation grammar, no keyboards mid-consult. Salvia listens to the
              encounter — or a voice note after — and drafts the note itself.
            </p>
            <div className="pb-riser">
              <div className="pb-rec"><i />Recording · OPD 3</div>
              <div className="pb-wave" aria-hidden="true">
                {WAVE_HEIGHTS.map((h, i) => (
                  <span key={i} style={{ height: h, animationDelay: `${i * 0.08}s` }} />
                ))}
              </div>
              <p className="pb-quote">
                &ldquo;Bukhaar teen din se, dry cough bhi hai&hellip;
                <b> paracetamol 650 TDS</b>, review after five days.&rdquo;
              </p>
            </div>
          </div>

          {/* CHECK — lime */}
          <div className="pb-block pb-block--lime">
            <img className="pb-accent-img" src="/illustrations/policy.webp" alt="" aria-hidden="true" />
            <span className="pb-step">02 · CHECK</span>
            <h2 className="pb-block-h">Policy runs before the pen.</h2>
            <p className="pb-block-p">
              Your clinic&rsquo;s rules check every note before it can be signed.
              A blocking violation needs a written justification — recorded in the audit log.
            </p>
            <div className="pb-riser">
              <div className="pb-check-row">
                <span className="pb-tick">✓</span>
                <span>Allergy history recorded before prescription</span>
              </div>
              <div className="pb-check-row">
                <span className="pb-tick">✓</span>
                <span>Dosage within adult reference range</span>
              </div>
              <div className="pb-check-row pb-check-row--fail">
                <span className="pb-tick">✕</span>
                <span>
                  Schedule H1 drug — justification missing
                  <br />
                  <span className="pb-fail-tag">Blocks signing</span>
                </span>
              </div>
              <p className="pb-check-note">
                Overrides are never silent: the reason you type is sealed into the audit log.
              </p>
            </div>
          </div>

          {/* SEAL — marigold */}
          <div className="pb-block pb-block--marigold">
            <img className="pb-accent-img" src="/illustrations/ill_seal.webp" alt="" aria-hidden="true" />
            <span className="pb-step">03 · SEAL</span>
            <h2 className="pb-block-h">Signed once. Sealed for good.</h2>
            <p className="pb-block-p">
              On signing, the record is sealed with the audio and the exact policy
              version that checked it. Every printed page carries its hash.
            </p>
            <div className="pb-riser" style={{ padding: '20px 22px 26px' }}>
              <div className="pb-seal-head">
                <span className="pb-seal-title">Standard SOAP Consultation Record</span>
                <span className="pb-sealed">Sealed</span>
              </div>
              <div className="pb-seal-chips">
                <span>Audio attached</span>
                <span>Policy v2.3</span>
                <span>Form v7</span>
              </div>
              <div className="pb-hash">
                <small>SHA-256 · printed on every page</small>
                9f4c 71ae 02d8 b6f3 &hellip; 4e0d 88c1 55f2 b21a
              </div>
            </div>
          </div>
        </div>

        {/* ---------- navy: the six-year test ---------- */}
        <div className="pb-block pb-block--navy">
          <img className="pb-globe" src="/illustrations/ill_globe_india.webp" alt="" aria-hidden="true" />
          <div className="pb-navy-grid">
            <div>
              <span className="pb-eyebrow">The six-year test</span>
              <h2 className="pb-block-h">A complaint from 2020 just arrived. The treating doctor left last year.</h2>
              <p className="pb-block-p">
                When it reaches a consumer forum, nobody remembers the consult.
                The record defends you — or it doesn&rsquo;t.
              </p>
            </div>
            <div className="pb-stat">
              <div className="pb-stat-num">22%</div>
              <p className="pb-stat-cap">
                of proven medical negligence cases before the NCDRC involved a failure
                of records — not a failure of medicine.
              </p>
            </div>
          </div>
          <div className="pb-riser pb-navy-riser">
            <div className="pb-year">
              <b>2020</b>
              <p>Consult sealed on the day it happened — audio, form version, policy decision, hash.</p>
            </div>
            <div className="pb-year">
              <b>2025</b>
              <p>The treating doctor moves on. The sealed record stays exactly as signed.</p>
            </div>
            <div className="pb-year">
              <b>2026</b>
              <p>The complaint arrives. The record answers for itself — no memory required.</p>
            </div>
          </div>
        </div>

        {/* ---------- coral: template library ---------- */}
        <div id="pb-templates" className="pb-block pb-block--coral">
          <span className="pb-eyebrow">Template library</span>
          <h2 className="pb-block-h">Your forms. Filled by voice.</h2>
          <p className="pb-block-p">
            Start from real clinical templates — or bring your clinic&rsquo;s own.
            The AI fills the exact fields your registers and auditors expect.
          </p>
          <div className="pb-tpl-row">
            {TEMPLATES.map((t) => (
              <div className="pb-tpl" key={t.name}>
                <span className="pb-tpl-tag">{t.tag}</span>
                <div className="pb-tpl-name">{t.name}</div>
                <div className="pb-tpl-lines" aria-hidden="true">
                  {Array.from({ length: t.lines }, (_, i) => <i key={i} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- lime: pricing ---------- */}
        <div id="pb-pricing" className="pb-block pb-block--lime pb-block--lime-price">
          <span className="pb-eyebrow">Pricing</span>
          <h2 className="pb-block-h">Pay for notes, not seats.</h2>
          <p className="pb-price-note">
            Every plan includes AI documentation, policy checks, and sealed records. Add anyone on your team.
          </p>
          <div className="pb-price-row">
            {PLANS.map((p) => (
              <div className={p.popular ? 'pb-plan pb-plan--popular' : 'pb-plan'} key={p.name}>
                {p.popular && <span className="pb-popular-tag">Most popular</span>}
                <div className="pb-plan-name">{p.name}</div>
                <div className="pb-plan-price">{p.price}{p.per && <small>{p.per}</small>}</div>
                <div className="pb-plan-notes">{p.notes}{p.per && <em> / month</em>}</div>
                <p className="pb-plan-blurb">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- final CTA ---------- */}
      <section className="pb-final">
        <div className="g-container">
          <h2 className="pb-final-h">Put every consult on the record.</h2>
          <Link to="/start" className="pb-pill pb-pill--big"><b />Start free</Link>
        </div>
      </section>

      <footer className="pb-footer">
        <div className="g-container pb-footer-in">
          <span>© 2026 Salvia — AI clinical documentation &amp; compliance for Indian healthcare.</span>
          <Link to="/start">Start free →</Link>
        </div>
      </footer>
    </div>
  )
}

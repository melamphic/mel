import { useEffect, useRef, type ReactElement, type PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';

/* ============================================================
   PreviewD — "3D DEPTH"
   Pure-CSS 3D: perspective stages, mouse-tilt parallax, layered
   translateZ objects with real drop shadows. No 3D libraries.
   Light theme · ink #16181D · teal #0E5A4F · marigold #F2A93B
   ONE font: Archivo. All classes prefixed pd-.
   ============================================================ */

function motionOK(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/* Shared per-card tilt: stateless, operates on e.currentTarget,
   rAF-throttled per element. */
const pdTiltFrames = new WeakMap<HTMLElement, number>();

function pdTiltMove(e: ReactPointerEvent<HTMLElement>): void {
  if (!motionOK()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1 .. 1
  const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  const prev = pdTiltFrames.get(el);
  if (prev !== undefined) cancelAnimationFrame(prev);
  pdTiltFrames.set(
    el,
    requestAnimationFrame(() => {
      el.style.setProperty('--pd-cx', x.toFixed(3));
      el.style.setProperty('--pd-cy', y.toFixed(3));
    })
  );
}

function pdTiltLeave(e: ReactPointerEvent<HTMLElement>): void {
  const el = e.currentTarget;
  const prev = pdTiltFrames.get(el);
  if (prev !== undefined) cancelAnimationFrame(prev);
  el.style.setProperty('--pd-cx', '0');
  el.style.setProperty('--pd-cy', '0');
}

const PD_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap');

.pd-page {
  --pd-ink: #16181D;
  --pd-teal: #0E5A4F;
  --pd-teal-soft: rgba(14, 90, 79, 0.08);
  --pd-gold: #F2A93B;
  --pd-paper: #FFFFFF;
  --pd-mist: #F4F7F6;
  --pd-line: rgba(22, 24, 29, 0.10);
  font-family: 'Archivo', sans-serif;
  color: var(--pd-ink);
  background: var(--pd-paper);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}
.pd-page *, .pd-page *::before, .pd-page *::after { box-sizing: border-box; }
.pd-page img { max-width: 100%; height: auto; user-select: none; -webkit-user-drag: none; }
.pd-page a { text-decoration: none; color: inherit; }

/* ---------- Nav ---------- */
.pd-nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--pd-line);
}
.pd-nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 60px;
}
.pd-logo {
  font-weight: 900; font-size: 1.25rem; letter-spacing: -0.02em;
  color: var(--pd-ink); display: inline-flex; align-items: baseline; gap: 2px;
}
.pd-logo::after {
  content: ''; width: 7px; height: 7px; border-radius: 50%;
  background: var(--pd-gold); display: inline-block; transform: translateY(-1px);
}
.pd-nav-links { display: flex; align-items: center; gap: 28px; }
.pd-nav-links a {
  font-size: 0.88rem; font-weight: 600; color: rgba(22, 24, 29, 0.72);
  transition: color 0.18s ease;
}
.pd-nav-links a:hover { color: var(--pd-teal); }
.pd-nav-cta {
  background: var(--pd-teal); color: #fff !important;
  padding: 8px 18px; border-radius: 10px; font-weight: 700 !important;
  box-shadow: 0 2px 0 rgba(14, 90, 79, 0.25), 0 8px 20px -8px rgba(14, 90, 79, 0.5);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.pd-nav-cta:hover { transform: translateY(-2px); box-shadow: 0 4px 0 rgba(14,90,79,0.25), 0 14px 28px -10px rgba(14,90,79,0.55); }
@media (max-width: 720px) { .pd-nav-links a:not(.pd-nav-cta) { display: none; } }

/* ---------- Hero ---------- */
.pd-hero {
  position: relative;
  padding: 84px 0 40px;
  background:
    radial-gradient(1100px 560px at 50% 108%, rgba(14, 90, 79, 0.09), transparent 62%),
    radial-gradient(680px 360px at 84% 4%, rgba(242, 169, 59, 0.12), transparent 60%);
}
.pd-hero-copy { text-align: center; max-width: 780px; margin: 0 auto; position: relative; z-index: 2; }
.pd-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--pd-teal);
  background: var(--pd-teal-soft);
  border: 1px solid rgba(14, 90, 79, 0.18);
  padding: 7px 16px; border-radius: 999px; margin-bottom: 26px;
}
.pd-eyebrow::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--pd-gold); }
.pd-h1 {
  font-size: clamp(2.7rem, 6.4vw, 4.6rem);
  font-weight: 900; line-height: 1.02; letter-spacing: -0.035em;
  margin: 0 0 22px;
}
.pd-h1-mark {
  color: var(--pd-teal);
  background: linear-gradient(transparent 64%, rgba(242, 169, 59, 0.42) 64%, rgba(242, 169, 59, 0.42) 92%, transparent 92%);
}
.pd-sub {
  font-size: 1.08rem; font-weight: 500; color: rgba(22, 24, 29, 0.66);
  max-width: 620px; margin: 0 auto 32px; line-height: 1.65;
}
.pd-cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.pd-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.98rem; font-weight: 700; padding: 14px 28px; border-radius: 12px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.pd-btn-primary {
  background: var(--pd-teal); color: #fff;
  box-shadow: 0 3px 0 rgba(9, 62, 54, 0.9), 0 16px 32px -12px rgba(14, 90, 79, 0.55);
}
.pd-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 6px 0 rgba(9,62,54,0.9), 0 24px 44px -14px rgba(14,90,79,0.6); }
.pd-btn-ghost {
  background: #fff; color: var(--pd-ink); border: 1px solid var(--pd-line);
  box-shadow: 0 2px 0 rgba(22, 24, 29, 0.08), 0 10px 24px -12px rgba(22, 24, 29, 0.25);
}
.pd-btn-ghost:hover { transform: translateY(-3px); border-color: rgba(14, 90, 79, 0.35); color: var(--pd-teal); }
.pd-hero-note {
  margin-top: 20px; font-size: 0.8rem; font-weight: 600; color: rgba(22, 24, 29, 0.45);
  letter-spacing: 0.02em;
}
.pd-hero-note strong { color: var(--pd-teal); font-weight: 700; }

/* ---------- Hero 3D stage ---------- */
.pd-stage-wrap {
  perspective: 1300px;
  perspective-origin: 50% 30%;
  margin-top: 44px;
  position: relative; z-index: 1;
}
.pd-stage {
  --pd-mx: 0; --pd-my: 0;
  position: relative;
  max-width: 880px; margin: 0 auto;
  transform-style: preserve-3d;
  transform: rotateX(calc(var(--pd-my) * -5deg)) rotateY(calc(var(--pd-mx) * 7deg));
  will-change: transform;
}
.pd-world {
  display: block; width: min(720px, 88%); margin: 0 auto;
  transform: translateZ(30px);
  filter: drop-shadow(0 44px 56px rgba(14, 90, 79, 0.26)) drop-shadow(0 14px 22px rgba(22, 24, 29, 0.14));
  animation: pd-bob 7s ease-in-out infinite alternate;
}
.pd-stage-ground {
  position: absolute; left: 50%; bottom: -46px;
  width: 68%; height: 90px; transform: translateX(-50%) translateZ(-60px);
  background: radial-gradient(ellipse at center, rgba(22, 24, 29, 0.16), transparent 68%);
  pointer-events: none;
}
.pd-float {
  position: absolute; pointer-events: none;
  transform: translate3d(
    calc(var(--pd-mx) * var(--pd-par) * 1px),
    calc(var(--pd-my) * var(--pd-par) * 0.72px),
    calc(var(--pd-z) * 1px)
  );
  will-change: transform;
}
.pd-float img {
  display: block;
  filter: drop-shadow(0 18px 22px rgba(22, 24, 29, 0.22));
  animation: pd-bob var(--pd-dur, 5s) ease-in-out var(--pd-delay, 0s) infinite alternate;
}
.pd-float-stetho { --pd-z: 120; --pd-par: 36; --pd-dur: 5.4s; --pd-delay: -1.2s; top: -3%;  left: 3%;  width: clamp(70px, 11vw, 118px); }
.pd-float-shield { --pd-z: 80;  --pd-par: 26; --pd-dur: 6.2s; --pd-delay: -3s;   top: 6%;   right: 4%; width: clamp(64px, 10vw, 108px); }
.pd-float-policy { --pd-z: 55;  --pd-par: 17; --pd-dur: 6.8s; --pd-delay: -2s;   bottom: 12%; left: -1%; width: clamp(66px, 10vw, 112px); }
.pd-float-wave   { --pd-z: 150; --pd-par: 46; --pd-dur: 4.8s; --pd-delay: -0.6s; bottom: 4%;  right: 1%; width: clamp(78px, 12vw, 132px); }
@media (max-width: 720px) { .pd-float { display: none; } .pd-world { width: 100%; } }

@keyframes pd-bob {
  from { translate: 0 0; }
  to   { translate: 0 -12px; }
}

/* ---------- How it works ---------- */
.pd-how { padding: 120px 0 100px; }
.pd-kicker {
  font-size: 0.78rem; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--pd-gold); margin-bottom: 12px;
}
.pd-h2 {
  font-size: clamp(1.9rem, 3.8vw, 2.8rem); font-weight: 900; letter-spacing: -0.03em;
  line-height: 1.1; margin: 0 0 14px;
}
.pd-section-sub { font-size: 1rem; font-weight: 500; color: rgba(22, 24, 29, 0.6); max-width: 560px; margin: 0 0 52px; }
.pd-how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
@media (max-width: 900px) { .pd-how-grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; } }
.pd-tilt-wrap { perspective: 900px; }
.pd-how-card {
  --pd-cx: 0; --pd-cy: 0;
  height: 100%;
  background: #fff; border: 1px solid var(--pd-line); border-radius: 22px;
  padding: 26px 26px 30px;
  transform-style: preserve-3d;
  transform: rotateX(calc(var(--pd-cy) * -7deg)) rotateY(calc(var(--pd-cx) * 9deg));
  transition: transform 0.25s ease, box-shadow 0.3s ease;
  box-shadow: 0 1px 2px rgba(22, 24, 29, 0.05), 0 14px 34px -18px rgba(22, 24, 29, 0.25);
  will-change: transform;
}
.pd-how-card:hover {
  box-shadow: 0 2px 4px rgba(22, 24, 29, 0.06), 0 30px 60px -24px rgba(14, 90, 79, 0.35);
}
.pd-how-fig {
  display: grid; place-items: center; height: 190px; margin-bottom: 22px;
  background: radial-gradient(120% 130% at 50% 118%, var(--pd-teal-soft), rgba(244, 247, 246, 0.5) 58%, transparent);
  border-radius: 16px;
  transform-style: preserve-3d;
}
.pd-how-fig img {
  width: 132px;
  transform: translateZ(0);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), filter 0.35s ease;
  filter: drop-shadow(0 10px 14px rgba(22, 24, 29, 0.18));
}
.pd-how-card:hover .pd-how-fig img {
  transform: translateZ(40px);
  filter: drop-shadow(0 26px 30px rgba(22, 24, 29, 0.28));
}
.pd-step-num {
  display: inline-block; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em;
  color: var(--pd-teal); background: var(--pd-teal-soft);
  padding: 4px 10px; border-radius: 999px; margin-bottom: 12px;
}
.pd-how-card h3 { font-size: 1.28rem; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 8px; }
.pd-how-card p { font-size: 0.92rem; font-weight: 500; color: rgba(22, 24, 29, 0.62); line-height: 1.6; margin: 0; }

/* ---------- Stats band ---------- */
.pd-stats {
  background:
    radial-gradient(900px 420px at 12% -20%, rgba(242, 169, 59, 0.16), transparent 55%),
    var(--pd-teal);
  padding: 96px 0; color: #fff;
}
.pd-stats .pd-kicker { color: var(--pd-gold); }
.pd-stats .pd-h2 { color: #fff; }
.pd-stats .pd-section-sub { color: rgba(255, 255, 255, 0.72); }
.pd-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
@media (max-width: 900px) { .pd-stats-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; } }
.pd-stat-card {
  background: #fff; color: var(--pd-ink);
  border-radius: 20px; padding: 30px 28px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.4) inset,
    0 12px 28px -14px rgba(8, 40, 35, 0.7),
    0 34px 64px -28px rgba(8, 40, 35, 0.8);
  transition: transform 0.25s ease, box-shadow 0.3s ease;
}
.pd-stat-card:nth-child(2) { transform: translateY(-14px); }
.pd-stat-card:hover { transform: translateY(-8px); }
.pd-stat-card:nth-child(2):hover { transform: translateY(-22px); }
.pd-stat-num {
  font-size: clamp(2.2rem, 4.4vw, 3.1rem); font-weight: 900; letter-spacing: -0.03em;
  color: var(--pd-teal); line-height: 1; margin-bottom: 12px;
}
.pd-stat-card:nth-child(2) .pd-stat-num { color: var(--pd-gold); }
.pd-stat-label { font-size: 0.92rem; font-weight: 600; color: rgba(22, 24, 29, 0.66); line-height: 1.55; }
.pd-stat-src { display: block; margin-top: 14px; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(22, 24, 29, 0.38); }

/* ---------- Pricing ---------- */
.pd-pricing { padding: 120px 0; background: var(--pd-mist); }
.pd-pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; perspective: 1400px; }
@media (max-width: 1020px) { .pd-pricing-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .pd-pricing-grid { grid-template-columns: 1fr; } }
.pd-price-card {
  background: #fff; border: 1px solid var(--pd-line); border-radius: 20px;
  padding: 28px 24px; display: flex; flex-direction: column;
  box-shadow: 0 1px 2px rgba(22, 24, 29, 0.04), 0 12px 28px -18px rgba(22, 24, 29, 0.22);
  transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.25s ease;
  transform-style: preserve-3d;
}
.pd-price-card:hover {
  transform: translateY(-10px) rotateX(3.5deg);
  border-color: rgba(14, 90, 79, 0.3);
  box-shadow: 0 2px 4px rgba(22, 24, 29, 0.05), 0 36px 60px -26px rgba(14, 90, 79, 0.4);
}
.pd-price-card--hot { border: 2px solid var(--pd-gold); position: relative; }
.pd-hot-tag {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: var(--pd-gold); color: var(--pd-ink);
  font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 999px; white-space: nowrap;
  box-shadow: 0 6px 14px -6px rgba(242, 169, 59, 0.8);
}
.pd-price-name { font-size: 0.82rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--pd-teal); margin-bottom: 12px; }
.pd-price-amt { font-size: 2.1rem; font-weight: 900; letter-spacing: -0.03em; line-height: 1; }
.pd-price-per { font-size: 0.78rem; font-weight: 600; color: rgba(22, 24, 29, 0.45); margin: 6px 0 14px; }
.pd-price-desc { font-size: 0.88rem; font-weight: 500; color: rgba(22, 24, 29, 0.62); line-height: 1.55; margin-bottom: 20px; flex: 1; }
.pd-price-cta {
  display: block; text-align: center; font-size: 0.88rem; font-weight: 700;
  padding: 11px 0; border-radius: 10px;
  border: 1px solid rgba(14, 90, 79, 0.3); color: var(--pd-teal);
  transition: background 0.2s ease, color 0.2s ease, transform 0.18s ease;
}
.pd-price-cta:hover { background: var(--pd-teal); color: #fff; transform: translateY(-2px); }
.pd-price-card--hot .pd-price-cta { background: var(--pd-teal); color: #fff; border-color: var(--pd-teal); }
.pd-price-card--hot .pd-price-cta:hover { background: #0a463d; }
.pd-pricing-foot { text-align: center; margin-top: 30px; font-size: 0.82rem; font-weight: 600; color: rgba(22, 24, 29, 0.45); }

/* ---------- Final CTA ---------- */
.pd-final { padding: 130px 0 110px; text-align: center; position: relative;
  background: radial-gradient(800px 420px at 50% 0%, rgba(14, 90, 79, 0.07), transparent 62%);
}
.pd-globe-stage { position: relative; width: 250px; margin: 0 auto 20px; }
.pd-globe {
  display: block; width: 100%;
  filter: drop-shadow(0 26px 34px rgba(14, 90, 79, 0.3));
  animation: pd-globe-bob 5.5s ease-in-out infinite;
  will-change: transform;
}
.pd-globe-shadow {
  width: 150px; height: 26px; margin: 6px auto 0;
  background: radial-gradient(ellipse at center, rgba(22, 24, 29, 0.24), transparent 70%);
  border-radius: 50%;
  animation: pd-globe-shadow 5.5s ease-in-out infinite;
  will-change: transform, opacity;
}
@keyframes pd-globe-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-16px); }
}
@keyframes pd-globe-shadow {
  0%, 100% { transform: scaleX(1); opacity: 1; }
  50%      { transform: scaleX(0.78); opacity: 0.55; }
}
.pd-final .pd-h2 { max-width: 640px; margin: 0 auto 14px; }
.pd-final .pd-section-sub { margin: 0 auto 34px; text-align: center; }

/* ---------- Footer ---------- */
.pd-footer { border-top: 1px solid var(--pd-line); padding: 26px 0; }
.pd-footer-inner {
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  font-size: 0.78rem; font-weight: 600; color: rgba(22, 24, 29, 0.45);
}
.pd-footer-inner a:hover { color: var(--pd-teal); }

/* ---------- Reduced motion: kill everything ---------- */
@media (prefers-reduced-motion: reduce) {
  .pd-page *, .pd-page *::before, .pd-page *::after {
    animation: none !important;
    transition: none !important;
  }
  .pd-stage, .pd-float, .pd-how-card, .pd-how-fig img,
  .pd-price-card, .pd-stat-card, .pd-globe, .pd-globe-shadow,
  .pd-btn, .pd-nav-cta, .pd-price-cta {
    transform: none !important;
  }
}
`;

export default function PreviewD(): ReactElement {
  const heroRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  /* Hero stage: pointer target -> lerped CSS vars via one rAF loop. */
  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage || !motionOK()) return;

    let raf = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e: PointerEvent): void => {
      const r = hero.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const onLeave = (): void => {
      tx = 0;
      ty = 0;
    };
    const tick = (): void => {
      cx += (tx - cx) * 0.075;
      cy += (ty - cy) * 0.075;
      stage.style.setProperty('--pd-mx', cx.toFixed(4));
      stage.style.setProperty('--pd-my', cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pd-page">
      <style>{PD_CSS}</style>

      {/* ---------- Nav ---------- */}
      <nav className="pd-nav">
        <div className="g-container pd-nav-inner">
          <Link to="/" className="pd-logo">Salvia</Link>
          <div className="pd-nav-links">
            <a href="#pd-how">How it works</a>
            <a href="#pd-proof">Proof</a>
            <a href="#pd-pricing">Pricing</a>
            <Link to="/start" className="pd-nav-cta">Get started</Link>
          </div>
        </div>
      </nav>

      {/* ---------- Hero ---------- */}
      <header className="pd-hero" ref={heroRef}>
        <div className="g-container">
          <div className="pd-hero-copy">
            <span className="pd-eyebrow">AI clinical documentation &amp; compliance</span>
            <h1 className="pd-h1">
              Every consult, <span className="pd-h1-mark">on the record.</span>
            </h1>
            <p className="pd-sub">
              Speak the consult — ambient OPD or a voice note. Salvia&rsquo;s AI fills your
              clinic&rsquo;s exact form, runs the policy check before you sign, and seals the
              record with the audio and policy version attached.
            </p>
            <div className="pd-cta-row">
              <Link to="/start" className="pd-btn pd-btn-primary">Start recording consults</Link>
              <a href="#pd-how" className="pd-btn pd-btn-ghost">See how it works</a>
            </div>
            <p className="pd-hero-note">
              <strong>SHA-256</strong> printed on every page of every PDF &middot; audio + policy version sealed in
            </p>
          </div>

          {/* 3D stage: diorama tilts toward the mouse, icons float at depth */}
          <div className="pd-stage-wrap" aria-hidden="false">
            <div className="pd-stage" ref={stageRef}>
              <div className="pd-stage-ground" aria-hidden="true" />
              <img
                className="pd-world"
                src="/illustrations/hero_world.webp"
                alt="Miniature cut-open clinic diorama showing a consult being documented by Salvia"
              />
              <span className="pd-float pd-float-stetho" aria-hidden="true">
                <img src="/illustrations/stetho.webp" alt="" loading="lazy" />
              </span>
              <span className="pd-float pd-float-shield" aria-hidden="true">
                <img src="/illustrations/shield.webp" alt="" loading="lazy" />
              </span>
              <span className="pd-float pd-float-policy" aria-hidden="true">
                <img src="/illustrations/policy.webp" alt="" loading="lazy" />
              </span>
              <span className="pd-float pd-float-wave" aria-hidden="true">
                <img src="/illustrations/sp_wave.webp" alt="" loading="lazy" />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- How it works ---------- */}
      <section className="pd-how" id="pd-how">
        <div className="g-container">
          <div className="pd-kicker">How it works</div>
          <h2 className="pd-h2">Three steps. Zero typing.</h2>
          <p className="pd-section-sub">
            Documentation happens after the consult, in your own words — the AI does the
            paperwork, the policy engine does the checking.
          </p>
          <div className="pd-how-grid">
            <div className="pd-tilt-wrap">
              <div
                className="pd-how-card"
                onPointerMove={pdTiltMove}
                onPointerLeave={pdTiltLeave}
              >
                <div className="pd-how-fig">
                  <img src="/illustrations/mic.webp" alt="Microphone" loading="lazy" />
                </div>
                <span className="pd-step-num">STEP 01</span>
                <h3>Speak</h3>
                <p>
                  Finish the consult, then speak — ambient OPD capture or a quick voice note.
                  The audio itself becomes part of the record.
                </p>
              </div>
            </div>
            <div className="pd-tilt-wrap">
              <div
                className="pd-how-card"
                onPointerMove={pdTiltMove}
                onPointerLeave={pdTiltLeave}
              >
                <div className="pd-how-fig">
                  <img src="/illustrations/ill_verify.webp" alt="Form under a magnifier being verified" loading="lazy" />
                </div>
                <span className="pd-step-num">STEP 02</span>
                <h3>Verify</h3>
                <p>
                  The AI fills your clinic&rsquo;s exact form — your fields, your format — and
                  runs the policy check before anything gets signed.
                </p>
              </div>
            </div>
            <div className="pd-tilt-wrap">
              <div
                className="pd-how-card"
                onPointerMove={pdTiltMove}
                onPointerLeave={pdTiltLeave}
              >
                <div className="pd-how-fig">
                  <img src="/illustrations/ill_seal.webp" alt="Sealed record with wax stamp" loading="lazy" />
                </div>
                <span className="pd-step-num">STEP 03</span>
                <h3>Seal</h3>
                <p>
                  One tap seals the record with the audio and policy version attached. Every
                  PDF page prints its SHA-256 — provable, page by page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats band ---------- */}
      <section className="pd-stats" id="pd-proof">
        <div className="g-container">
          <div className="pd-kicker">Why it matters</div>
          <h2 className="pd-h2">Records decide cases.</h2>
          <p className="pd-section-sub">
            When a complaint reaches the consumer courts, the file speaks before the doctor does.
          </p>
          <div className="pd-stats-grid">
            <div className="pd-stat-card">
              <div className="pd-stat-num">22%</div>
              <div className="pd-stat-label">
                of proven negligence cases at the NCDRC come down to records failure — missing,
                altered, or unsigned documentation.
              </div>
              <span className="pd-stat-src">NCDRC judgments</span>
            </div>
            <div className="pd-stat-card">
              <div className="pd-stat-num">&#8377;75L&ndash;&#8377;11Cr</div>
              <div className="pd-stat-label">
                the range of recent awards where the record — not the medicine — decided the outcome.
              </div>
              <span className="pd-stat-src">Award range</span>
            </div>
            <div className="pd-stat-card">
              <div className="pd-stat-num">6 yrs</div>
              <div className="pd-stat-label">
                how long a case can run before judgment. Memory fades; a sealed record with the
                original audio doesn&rsquo;t.
              </div>
              <span className="pd-stat-src">Typical case duration</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="pd-pricing" id="pd-pricing">
        <div className="g-container">
          <div className="pd-kicker">Pricing</div>
          <h2 className="pd-h2">AI on every tier.</h2>
          <p className="pd-section-sub">
            Prepaid note pools that fit your OPD volume — no per-seat pricing, no surprises.
          </p>
          <div className="pd-pricing-grid">
            <div className="pd-price-card">
              <div className="pd-price-name">Base</div>
              <div className="pd-price-amt">&#8377;1,000</div>
              <div className="pd-price-per">per month</div>
              <p className="pd-price-desc">
                For small clinics starting out. Full AI documentation, policy checks, and sealed PDFs.
              </p>
              <Link to="/start" className="pd-price-cta">Choose Base</Link>
            </div>
            <div className="pd-price-card pd-price-card--hot">
              <span className="pd-hot-tag">Most popular</span>
              <div className="pd-price-name">Growth</div>
              <div className="pd-price-amt">&#8377;3,000</div>
              <div className="pd-price-per">per month</div>
              <p className="pd-price-desc">
                For busier OPDs. A bigger note pool with everything in Base, priority support included.
              </p>
              <Link to="/start" className="pd-price-cta">Choose Growth</Link>
            </div>
            <div className="pd-price-card">
              <div className="pd-price-name">Clinic+</div>
              <div className="pd-price-amt">&#8377;6,000</div>
              <div className="pd-price-per">per month</div>
              <p className="pd-price-desc">
                For multi-doctor clinics. The largest prepaid pool, shared across your whole team.
              </p>
              <Link to="/start" className="pd-price-cta">Choose Clinic+</Link>
            </div>
            <div className="pd-price-card">
              <div className="pd-price-name">Hospitals</div>
              <div className="pd-price-amt">Custom</div>
              <div className="pd-price-per">committed volume</div>
              <p className="pd-price-desc">
                Committed per-note pricing, department rollout, and onboarding for hospital teams.
              </p>
              <Link to="/start" className="pd-price-cta">Talk to us</Link>
            </div>
          </div>
          <p className="pd-pricing-foot">Every tier includes AI notes, policy checks, and SHA-256 sealed PDFs.</p>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="pd-final">
        <div className="g-container">
          <div className="pd-globe-stage">
            <img
              className="pd-globe"
              src="/illustrations/ill_globe_india.webp"
              alt="Globe centred on India"
              loading="lazy"
            />
            <div className="pd-globe-shadow" aria-hidden="true" />
          </div>
          <h2 className="pd-h2">Built for Indian healthcare.</h2>
          <p className="pd-section-sub">
            Your forms, your policies, your language of practice — documented the moment you
            finish speaking, and provable years later.
          </p>
          <div className="pd-cta-row">
            <Link to="/start" className="pd-btn pd-btn-primary">
              Get started &mdash; &#8377;1,000/mo
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="pd-footer">
        <div className="g-container pd-footer-inner">
          <span>&copy; 2026 Salvia &middot; AI clinical documentation &amp; compliance</span>
          <span>
            <Link to="/start">Get started</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}

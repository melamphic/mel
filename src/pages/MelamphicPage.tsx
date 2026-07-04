import { useEffect } from 'react';

/**
 * Melamphic AI Private Limited — the parent-company page.
 *
 * Concept: the page is a water column. You land at the sunlit surface and
 * scroll DOWN through the ocean — sunlight fades, the mission sits where the
 * light thins, the vision lives in the midnight zone, and the footer rests on
 * the seafloor. The hero renders the surface as a perspective-tilted 3D water
 * plane (real CSS 3D transform) with gridlines swelling toward the viewer;
 * marine snow drifts through the deep.
 *
 * Fully self-contained: no 3D libraries, no images — gradients, SVG and CSS
 * animation only. Opaque background sits above the site's ambient canvas.
 * SSR-safe: window access only inside effects; all particle positions are
 * deterministic (no Math.random) so hydration matches.
 */

// Deterministic drifting particles ("marine snow").
const SNOW = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 47) % 100,
  top: 5 + ((i * 13) % 90),
  size: 2 + (i % 3),
  dur: 9 + ((i * 7) % 13),
  delay: -((i * 5) % 12),
  opacity: 0.12 + ((i * 11) % 26) / 100,
}));

export function MelamphicPage() {
  useEffect(() => {
    document.title = 'Melamphic AI Private Limited';
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className="mel-sea" id="surface">
      <style>{css}</style>

      {/* Shafts of sunlight, fading with depth */}
      <div className="mel-sea__rays" aria-hidden="true">
        <i style={{ left: '12%', width: 90, animationDelay: '0s' }} />
        <i style={{ left: '30%', width: 140, animationDelay: '-3s' }} />
        <i style={{ left: '52%', width: 70, animationDelay: '-6s' }} />
        <i style={{ left: '68%', width: 120, animationDelay: '-1.5s' }} />
        <i style={{ left: '86%', width: 80, animationDelay: '-4.5s' }} />
      </div>

      {/* Marine snow */}
      <div className="mel-sea__snow" aria-hidden="true">
        {SNOW.map((p, i) => (
          <i
            key={i}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── 0 m · Surface ─────────────────────────────────────────────── */}
      <header className="mel-sea__sec mel-sea__hero">
        {/* The surface itself: a perspective-tilted water plane stretching to
            the horizon, gridlines swelling toward the viewer. */}
        <div className="mel-sea__plane" aria-hidden="true">
          <div className="mel-sea__plane-tilt">
            <div className="mel-sea__plane-grid" />
            <div className="mel-sea__plane-sheen" />
          </div>
        </div>
        <div className="mel-sea__col">
          <div className="mel-sea__toprow">
            <span className="mel-sea__mono">0 m &middot; surface</span>
            <a className="mel-sea__mono mel-sea__link--ink" href="https://hellosalvia.com">
              hellosalvia.com&nbsp;&rarr;
            </a>
          </div>
          <h1 className="mel-sea__word">Melamphic</h1>
          <p className="mel-sea__stamp">AI Private Limited &middot; India</p>
          <p className="mel-sea__tag">We build AI for work under pressure.</p>
          <span className="mel-sea__cue">descend&nbsp;&darr;</span>
        </div>
      </header>

      {/* ── 200 m · Mission ───────────────────────────────────────────── */}
      <section className="mel-sea__sec mel-sea__mission">
        <div className="mel-sea__col">
          <p className="mel-sea__mono mel-sea__label">
            01 &middot; Mission &mdash; 200 m &middot; where sunlight fades
          </p>
          <p className="mel-sea__say">
            Make trustworthy documentation effortless &mdash; so people can give
            their attention to the work, and the record takes care of itself.
          </p>
        </div>
      </section>

      {/* ── 1,000 m · Vision ──────────────────────────────────────────── */}
      <section className="mel-sea__sec mel-sea__vision">
        <div className="mel-sea__col">
          <p className="mel-sea__mono mel-sea__label">
            02 &middot; Vision &mdash; 1,000 m &middot; the midnight zone
          </p>
          <p className="mel-sea__say mel-sea__say--vision">
            A world where doing the right thing and proving it are the same act.
          </p>
          <p className="mel-sea__mono mel-sea__glowline">
            In the deep, we make our own light.
          </p>
        </div>
      </section>

      {/* ── 3,688 m · Seafloor ────────────────────────────────────────── */}
      <footer className="mel-sea__sec mel-sea__floor">
        <div className="mel-sea__col">
          <p className="mel-sea__mono mel-sea__label mel-sea__label--floor">
            3,688 m &middot; seafloor &mdash; the average depth of the ocean
          </p>
          <div className="mel-sea__footrow">
            <a href="mailto:hello@hellosalvia.com">hello@hellosalvia.com</a>
            <span className="mel-sea__foot-dim">&copy; {year} Melamphic AI Private Limited</span>
            <a href="#surface">return to surface&nbsp;&uarr;</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=IBM+Plex+Mono:wght@400;500&display=swap');

.mel-sea {
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: clip;
  font-family: 'Newsreader', Georgia, 'Times New Roman', serif;
  -webkit-font-smoothing: antialiased;
  /* The water column: surface light -> midnight -> abyss. */
  background: linear-gradient(
    180deg,
    #D9EFF2 0%,
    #AEDCE6 6%,
    #6FBCD2 14%,
    #3B93B4 24%,
    #1F6E96 34%,
    #10527A 46%,
    #093A5E 58%,
    #052845 70%,
    #031A30 82%,
    #020F1E 92%,
    #010A15 100%
  );
  scroll-behavior: smooth;
}
.mel-sea ::selection { background: rgba(127,247,233,0.35); }

/* ── The surface: a 3D water plane ────────────────────────────────────── */
.mel-sea__plane {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  perspective: 560px;
}
.mel-sea__plane-tilt {
  position: absolute;
  left: 50%;
  top: 6%;
  width: 260vw;
  height: 120vh;
  transform: translateX(-50%) rotateX(74deg);
  transform-origin: top center;
  animation: mel-sea-swell 7s ease-in-out infinite alternate;
}
.mel-sea__plane-grid {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0 2px, transparent 2px 56px),
    repeating-linear-gradient(to right, rgba(255,255,255,0.22) 0 2px, transparent 2px 72px);
  animation: mel-sea-flow 5.5s linear infinite;
  -webkit-mask-image: linear-gradient(to bottom, transparent 2%, black 22%, black 72%, transparent 96%);
  mask-image: linear-gradient(to bottom, transparent 2%, black 22%, black 72%, transparent 96%);
}
.mel-sea__plane-sheen {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(42% 30% at 34% 30%, rgba(255,255,255,0.35), transparent 70%),
    radial-gradient(36% 26% at 72% 56%, rgba(255,255,255,0.22), transparent 70%);
  animation: mel-sea-ray 8s ease-in-out infinite alternate;
  -webkit-mask-image: linear-gradient(to bottom, transparent 4%, black 30%, transparent 92%);
  mask-image: linear-gradient(to bottom, transparent 4%, black 30%, transparent 92%);
}
@keyframes mel-sea-flow {
  from { background-position: 0 0, 0 0; }
  to { background-position: 0 56px, 36px 0; }
}
@keyframes mel-sea-swell {
  from { transform: translateX(-50%) rotateX(74deg) translateY(0); }
  to { transform: translateX(-50%) rotateX(71deg) translateY(-16px); }
}

/* ── Sun rays ─────────────────────────────────────────────────────────── */
.mel-sea__rays {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 140vh;
  overflow: hidden;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(black 30%, transparent 95%);
  mask-image: linear-gradient(black 30%, transparent 95%);
}
.mel-sea__rays i {
  position: absolute;
  top: -8%;
  height: 116%;
  background: linear-gradient(rgba(255,255,255,0.34), transparent 72%);
  transform: skewX(-13deg);
  filter: blur(7px);
  animation: mel-sea-ray 9s ease-in-out infinite alternate;
}
@keyframes mel-sea-ray {
  from { opacity: 0.35; }
  to { opacity: 0.85; }
}

/* ── Marine snow ──────────────────────────────────────────────────────── */
.mel-sea__snow { position: absolute; inset: 0; pointer-events: none; }
.mel-sea__snow i {
  position: absolute;
  border-radius: 50%;
  background: #EAF6F4;
  animation: mel-sea-snow ease-in-out infinite alternate;
}
@keyframes mel-sea-snow {
  from { transform: translate(0, -26px); }
  to { transform: translate(10px, 26px); }
}

/* ── Layout ───────────────────────────────────────────────────────────── */
.mel-sea__sec {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.mel-sea__col {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 0 clamp(24px, 6vw, 72px);
  box-sizing: border-box;
}
.mel-sea__mono {
  font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* Hero — 0 m */
.mel-sea__hero { min-height: 100svh; padding: 26px 0 10vh; }
.mel-sea__toprow {
  position: absolute;
  top: 24px; left: 0; right: 0;
  max-width: 980px;
  margin: 0 auto;
  padding: 0 clamp(24px, 6vw, 72px);
  display: flex;
  justify-content: space-between;
  color: #14425B;
  box-sizing: border-box;
}
.mel-sea__link--ink { color: #14425B; text-decoration: none; }
.mel-sea__link--ink:hover { color: #0A2A3D; }
.mel-sea__word {
  font-weight: 300;
  font-size: clamp(58px, 12vw, 160px);
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: #0A2A3D;
  margin: 0 0 18px;
}
.mel-sea__stamp {
  font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #2C6076;
  margin: 0 0 30px;
}
.mel-sea__tag {
  font-size: clamp(19px, 2.4vw, 26px);
  font-style: italic;
  color: #123B52;
  margin: 0;
}
.mel-sea__cue {
  position: absolute;
  bottom: 30px;
  left: clamp(24px, 6vw, 72px);
  font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #1D546E;
  animation: mel-sea-bob 2.6s ease-in-out infinite;
}
@keyframes mel-sea-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(7px); }
}

/* Mission — 200 m */
.mel-sea__mission { min-height: 95svh; }
.mel-sea__label { color: rgba(234,246,244,0.62); margin: 0 0 26px; }
.mel-sea__say {
  font-weight: 300;
  font-size: clamp(29px, 4.8vw, 54px);
  line-height: 1.14;
  letter-spacing: -0.012em;
  color: #F2FAF9;
  margin: 0;
  max-width: 20ch;
  text-wrap: balance;
}

/* Vision — 1,000 m */
.mel-sea__vision { min-height: 110svh; }
.mel-sea__say--vision { font-style: italic; max-width: 18ch; }
.mel-sea__glowline {
  margin: 34px 0 0;
  color: #7FF7E9;
  text-shadow: 0 0 18px rgba(127,247,233,0.45);
}

/* Seafloor — 3,688 m */
.mel-sea__floor { min-height: 62svh; align-items: flex-end; padding-bottom: 52px; }
.mel-sea__label--floor { color: rgba(234,246,244,0.42); }
.mel-sea__footrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 24px;
  font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
}
.mel-sea__footrow a {
  color: rgba(234,246,244,0.78);
  text-decoration: none;
  transition: color .2s ease, text-shadow .2s ease;
}
.mel-sea__footrow a:hover {
  color: #7FF7E9;
  text-shadow: 0 0 14px rgba(127,247,233,0.5);
}
.mel-sea__foot-dim { color: rgba(234,246,244,0.4); }

@media (max-width: 640px) {
  .mel-sea__say { max-width: none; }
  .mel-sea__plane { perspective: 420px; }
}
@media (prefers-reduced-motion: reduce) {
  .mel-sea *, .mel-sea *::before, .mel-sea *::after {
    animation: none !important;
    transition: none !important;
  }
}
`;

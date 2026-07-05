import React, { useEffect, useRef } from 'react';

import { Rv } from './Rv';

// Hero: copy first, then the miniature clinic world in a 3D stage that
// tilts toward the pointer, with icon objects parallaxing at depth.
export const HeroGrass: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
        const ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
        el.style.setProperty('--tx', tx.toFixed(3));
        el.style.setProperty('--ty', ty.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty('--tx', '0');
      el.style.setProperty('--ty', '0');
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
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

        {/* the world of the product, in 3D */}
        <div className="g-h3d-stage" ref={stageRef} aria-hidden="true">
          <div className="g-h3d-world">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/illustrations/hero_world.webp"
              style={{
                width: '100%',
                maxWidth: 760,
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                mixBlendMode: 'multiply',
                WebkitMaskImage: 'radial-gradient(70% 70% at 50% 50%, #000 60%, transparent 97%)',
                maskImage: 'radial-gradient(70% 70% at 50% 50%, #000 60%, transparent 97%)',
              }}
            >
              <source src="/illustrations/hero_world.mp4" type="video/mp4" />
              <img src="/illustrations/hero_world.webp" alt="" />
            </video>
          </div>
          <div className="g-h3d-obj g-h3d-obj--1"><img src="/illustrations/mic.webp" alt="" /></div>
          <div className="g-h3d-obj g-h3d-obj--2"><img src="/illustrations/form.webp" alt="" /></div>
          <div className="g-h3d-obj g-h3d-obj--3"><img src="/illustrations/shield.webp" alt="" /></div>
          <div className="g-h3d-obj g-h3d-obj--4"><img src="/illustrations/policy.webp" alt="" /></div>
        </div>
      </header>

      {/* Demo film slot — replaced with the real film when it's ready */}
      <div className="g-film-wrap" id="demo" style={{ marginTop: 26 }}>
        <Rv className="g-film">
          <button className="g-play" aria-label="Play the Salvia demo film" />
          <span className="g-film-caption">
            From spoken word to sealed, policy-checked record — in one take.
          </span>
        </Rv>
      </div>
    </>
  );
};

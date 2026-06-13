import React, { useEffect, useRef } from 'react';

// Point-cloud sphere rendered on canvas: ~1500 points on a fibonacci sphere,
// rotating around Y with a slight tilt, depth-shaded. Warm (brand) top glow +
// cool bottom glow behind it. Pure aesthetic centrepiece for the compliance core.

const N = 1500;

// precompute unit-sphere points (fibonacci distribution)
const PTS: Array<[number, number, number]> = [];
{
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2; // 1 -> -1
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    PTS.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }
}

export const ParticleSphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let ay = 0;
    const tiltX = -0.32; // fixed forward tilt so we look slightly down into it
    const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.42;
      const cosY = Math.cos(ay), sinY = Math.sin(ay);

      // project all, keep depth for painter's order
      const proj: Array<[number, number, number, number]> = []; // x, y, z(depth), screenR
      for (let i = 0; i < N; i++) {
        const [px, py, pz] = PTS[i];
        // rotate Y
        let x = px * cosY - pz * sinY;
        let z = px * sinY + pz * cosY;
        let y = py;
        // tilt X
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y2; z = z2;
        const persp = 1 / (2.2 - z); // far points smaller
        proj.push([cx + x * R, cy + y * R, z, persp]);
      }
      proj.sort((a, b) => a[2] - b[2]); // back to front

      for (const [sx, sy, z, persp] of proj) {
        const depth = (z + 1) / 2; // 0 back .. 1 front
        const size = (0.5 + persp * 1.7) * (0.6 + depth * 0.8);
        // color: warm near the top, cool near the bottom; fade with depth
        const t = (sy - (cy - R)) / (2 * R); // 0 top .. 1 bottom
        let cr: number, cg: number, cb: number;
        if (t < 0.5) { // top: white -> warm orange
          const k = t / 0.5;
          cr = 255; cg = 255 - k * 70; cb = 255 - k * 150;
        } else { // bottom: white -> brand blue
          const k = (t - 0.5) / 0.5;
          cr = 255 - k * 120; cg = 255 - k * 90; cb = 255;
        }
        const alpha = (0.15 + depth * 0.75) * 0.9;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha})`;
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) ay += 0.0025;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: 560, margin: '0 auto' }}>
      {/* glow backdrops */}
      <div style={{ position: 'absolute', inset: '6%', borderRadius: '50%', background: 'radial-gradient(circle at 38% 30%, rgba(255,78,0,0.22), transparent 55%), radial-gradient(circle at 60% 78%, rgba(79,108,255,0.30), transparent 60%)', filter: 'blur(8px)' }} />
      <canvas ref={canvasRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

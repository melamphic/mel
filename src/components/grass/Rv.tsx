import React, { useEffect, useRef, useState, type JSX } from 'react';

// Shared IntersectionObserver for scroll reveals. CSS hides .g-rv only under
// html.js (added in main.tsx), so prerendered HTML stays fully visible for
// crawlers and no-JS visitors.

let observer: IntersectionObserver | null = null;
function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('g-in');
            observer?.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
  }
  return observer;
}

interface RvProps {
  as?: keyof JSX.IntrinsicElements;
  delay?: 1 | 2 | 3 | 4;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

/** Scroll-reveal wrapper: fades/slides children in when scrolled into view. */
export const Rv: React.FC<RvProps> = ({ as: Tag = 'div', delay, className = '', children, ...rest }) => {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el || !io) return;
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  const cls = ['g-rv', delay ? `g-d${delay}` : '', className].filter(Boolean).join(' ');
  return React.createElement(Tag, { ref, className: cls, ...rest }, children);
};

/**
 * Scroll-driven progress for cinematic scenes. Sets `--g-p` (0..1) on the
 * element every frame and, if `stages` thresholds are given, a `data-stage`
 * attribute (1-based). mode 'pin' measures progress across a tall wrapper
 * with a sticky child; mode 'view' measures the element's travel through
 * the viewport (for draw-on-scroll effects in normal flow).
 */
export function useScrollFx(
  ref: React.RefObject<HTMLElement | null>,
  opts: { mode: 'pin' | 'view'; stages?: number[] } = { mode: 'pin' },
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (opts.mode === 'pin') {
        const total = el.offsetHeight - vh;
        p = total > 0 ? -rect.top / total : 1;
      } else {
        p = (vh - rect.top) / (vh + rect.height);
      }
      p = Math.max(0, Math.min(1, p));
      el.style.setProperty('--g-p', String(p));
      if (opts.stages) {
        let stage = 1;
        for (let i = 0; i < opts.stages.length; i++) if (p >= opts.stages[i]) stage = i + 1;
        if (el.dataset.stage !== String(stage)) el.dataset.stage = String(stage);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Count-up number: prerenders the final value, animates 0→value on scroll. */
export const CountUp: React.FC<{ value: number; suffix?: string; durationMs?: number }> = ({
  value,
  suffix = '',
  durationMs = 1300,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number>(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        let t0: number | null = null;
        const tick = (ts: number) => {
          if (t0 === null) t0 = ts;
          const p = Math.min((ts - t0) / durationMs, 1);
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

// Page-wide ambient background: a slow "breathing" gradient on a clean white
// base. Fixed behind all content, pointer-events:none. Complementary brand
// tones drift through — warm amber/sand, a fire-orange glow, and sage green
// (the Salvia leaf) — bold enough to read on white, soft enough to stay behind
// content. Honours prefers-reduced-motion. CSS only.

export const BackgroundField = () => {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      <style>{`
        @keyframes bf-drift-a {
          0%, 100% { transform: translate(-8%, -6%) scale(1); }
          50%      { transform: translate(8%, 10%) scale(1.22); }
        }
        @keyframes bf-drift-b {
          0%, 100% { transform: translate(8%, 4%) scale(1.12); }
          50%      { transform: translate(-8%, -10%) scale(0.9); }
        }
        @keyframes bf-drift-c {
          0%, 100% { transform: translate(5%, -5%) scale(1); }
          50%      { transform: translate(-10%, 8%) scale(1.25); }
        }
        .bf-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(64px);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .bf-blob { animation: none !important; }
        }
      `}</style>

      {/* warm amber/sand — top left, the dominant brand warmth */}
      <div
        className="bf-blob"
        style={{
          top: '-18%', left: '-12%', width: '62vw', height: '62vw',
          background: 'radial-gradient(circle, rgba(247,221,182,0.85) 0%, rgba(247,221,182,0) 70%)',
          animation: 'bf-drift-a 22s ease-in-out infinite',
        }}
      />
      {/* fire-orange glow — right side */}
      <div
        className="bf-blob"
        style={{
          top: '2%', right: '-16%', width: '54vw', height: '54vw',
          background: 'radial-gradient(circle, rgba(255,90,20,0.16) 0%, rgba(255,90,20,0) 68%)',
          animation: 'bf-drift-b 28s ease-in-out infinite',
        }}
      />
      {/* sage green — the Salvia leaf, complement, lower centre */}
      <div
        className="bf-blob"
        style={{
          bottom: '-22%', left: '18%', width: '64vw', height: '64vw',
          background: 'radial-gradient(circle, rgba(126,168,114,0.38) 0%, rgba(126,168,114,0) 68%)',
          animation: 'bf-drift-c 26s ease-in-out infinite',
        }}
      />
      {/* sage green accent — upper right, balances the leaf tone across the page */}
      <div
        className="bf-blob"
        style={{
          top: '-12%', right: '8%', width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, rgba(138,178,126,0.22) 0%, rgba(138,178,126,0) 70%)',
          animation: 'bf-drift-a 30s ease-in-out infinite',
        }}
      />
      {/* warm sand counterweight — bottom right */}
      <div
        className="bf-blob"
        style={{
          bottom: '-16%', right: '-12%', width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(248,226,196,0.8) 0%, rgba(248,226,196,0) 70%)',
          animation: 'bf-drift-b 24s ease-in-out infinite',
        }}
      />
    </div>
  );
};

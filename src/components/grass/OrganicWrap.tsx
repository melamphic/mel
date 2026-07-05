import React, { useRef } from 'react';

import { useScrollFx } from './Rv';

// The thread of sound — one golden ribbon winding down the page, connecting
// every section, drawn by scroll. The audio is the thread through the product;
// here it is literally the thread through the page.
export const OrganicWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFx(ref, { mode: 'view' });

  return (
    <div className="g-organic" ref={ref}>
      <div className="g-thread" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g-thread-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F2A93B" />
              <stop offset="0.5" stopColor="#0E5A4F" />
              <stop offset="1" stopColor="#F2A93B" />
            </linearGradient>
          </defs>
          <path
            pathLength={1}
            d="M 50 0
               C 50 4, 16 6, 15 11
               S 84 16, 85 22
               S 16 28, 15 34
               S 84 40, 85 46
               S 16 52, 15 58
               S 84 64, 85 70
               S 16 76, 15 82
               S 84 88, 85 93
               S 52 97, 50 100"
          />
        </svg>
      </div>
      <img className="g-sprite--amb g-sprite--amb1" src="/illustrations/sp_doc.webp" alt="" aria-hidden="true" />
      <img className="g-sprite--amb g-sprite--amb2" src="/illustrations/sp_doc.webp" alt="" aria-hidden="true" />
      <img className="g-sprite--amb g-sprite--amb3" src="/illustrations/sp_doc.webp" alt="" aria-hidden="true" />
      {children}
    </div>
  );
};

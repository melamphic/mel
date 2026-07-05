import React from 'react';

// Organic zone — soft auras and ambient drift behind the product sections.
export const OrganicWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="g-organic">
      {children}
    </div>
  );
};

import React from 'react';

export const Steps: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="my-6 pl-4 border-l-2 border-brand-500/30 space-y-6">
      {children}
    </div>
  );
};

import React from "react";

interface TechnicalLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const TechnicalLabel: React.FC<TechnicalLabelProps> = ({ children, className = "" }) => (
  <div className={`technical-label ${className}`}>
    {children}
  </div>
);

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, className = "", light = false }) => (
  <div className={`mb-16 ${className}`}>
    <h2 className={`text-4xl md:text-6xl font-medium tracking-tighter mb-6 uppercase tracking-tighter-extra ${light ? 'text-white' : 'text-black'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-xl ${light ? 'text-white/60' : 'text-black/60'} max-w-2xl`}>
        {subtitle}
      </p>
    )}
  </div>
);

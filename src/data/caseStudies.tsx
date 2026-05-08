import React from 'react';

export interface CaseStudy {
  title: string;
  link: string;
  isInternal: boolean;
  visual: React.ReactNode;
}

/**
 * Dynamic Discovery Pattern for Case Studies
 */
const modules = import.meta.glob('../features/*/data/metadata.tsx', { 
  eager: true,
  import: 'default'
});

export const CASE_STUDIES_DATA: CaseStudy[] = Object.values(modules)
  .filter((m: any) => m && m.link && m.link.startsWith('/casestudies')) as CaseStudy[];

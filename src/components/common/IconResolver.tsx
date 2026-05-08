import React from 'react';
import { LayoutAnalyzerIcon, GeometryToTextIcon } from './ProductIcons';

interface IconResolverProps {
  iconId: string;
}

const IconResolver = ({ iconId }: IconResolverProps) => {
  switch (iconId) {
    case 'layout-analyzer':
      return <LayoutAnalyzerIcon />;
    case 'geometry-to-text':
      return <GeometryToTextIcon />;
    default:
      return (
        <div className="w-full h-32 bg-gray-100 rounded-2xl mb-6 flex items-center justify-center border border-dashed border-gray-300">
          <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">No Icon Found</span>
        </div>
      );
  }
};

export default IconResolver;

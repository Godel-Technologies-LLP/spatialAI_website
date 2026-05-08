import React, { useRef, useEffect, useMemo } from 'react';

interface DynamicSVGViewerProps {
  svgString: string;
  className?: string;
}

/**
 * DynamicSVGViewer
 * Refactored to avoid dangerouslySetInnerHTML and minimize React re-render penalties.
 * Uses a shadow-DOM-like approach by managing the SVG root directly via Ref.
 */
const DynamicSVGViewer = ({ svgString, className }: DynamicSVGViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize the SVG content to avoid re-parsing on every component render 
  // unless the actual data string changes.
  useEffect(() => {
    if (!containerRef.current) return;

    // Create a temporary template to parse the string
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    if (svgElement) {
      // Ensure SVG is responsive
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');
      svgElement.style.display = 'block';

      // Clear previous content and append new managed node
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(svgElement);
    }
  }, [svgString]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full flex items-center justify-center overflow-hidden ${className || ''}`}
      role="img"
      aria-label="Document Preview"
    />
  );
};

export default React.memo(DynamicSVGViewer);

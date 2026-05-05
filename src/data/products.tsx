import { motion } from 'motion/react';
import { Database } from 'lucide-react';
import React from 'react';

export const LayoutAnalyzerIcon = () => (
  <div className="w-full h-32 bg-gray-50/50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-black/5 group-hover:bg-white transition-colors duration-500">
     <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px]" />
     <motion.div 
        animate={{ y: [-60, 60, -60] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-[#FF4A22] shadow-[0_0:15px_#FF4A22] z-20"
     />
     <div className="w-20 h-24 border border-black/10 rounded-md relative bg-white shadow-sm flex flex-col gap-1.5 p-1.5">
        <div className="w-full h-2.5 bg-black/5 rounded-sm" />
        <div className="flex gap-1.5 h-8">
           <div className="w-1/2 h-full bg-black/5 rounded-sm" />
           <div className="w-1/2 h-full bg-black/5 rounded-sm" />
        </div>
        <div className="w-3/4 h-2.5 bg-black/5 rounded-sm" />
        
        <motion.div animate={{ opacity: [0,1,0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute top-4 left-1.5 w-8 h-8 border border-[#FF4A22]/50 bg-[#FF4A22]/10 rounded-sm" />
        <motion.div animate={{ opacity: [0,1,0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} className="absolute bottom-1.5 right-1.5 w-10 h-5 border border-blue-500/50 bg-blue-500/10 rounded-sm" />
     </div>
  </div>
);

export const GeometryToTextIcon = () => (
  <div className="w-full h-32 bg-gray-50/50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-black/5 group-hover:bg-white transition-colors duration-500">
     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
     <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="w-24 h-24 border border-black/5 rounded-full absolute" />
     <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border border-black/10 rounded-full absolute flex items-center justify-center" />
     <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center z-10 shadow-lg group-hover:scale-110 transition-transform duration-500">
        <Database className="w-5 h-5 text-white" />
     </div>
  </div>
);

export interface Product {
  id: string;
  path: string;
  category: string;
  categoryStyles: string;
  name: string;
  visual: React.ReactNode;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: "layout-analyzer",
    path: "/products/layout-analyzer",
    category: "Pre-Processing Tool",
    categoryStyles: "bg-[#FF4A22]/10 text-[#FF4A22]",
    name: "Document Layout Analyzer",
    visual: <LayoutAnalyzerIcon />
  },
  {
    id: "geom-to-text",
    path: "/products/geometry-to-text",
    category: "Core Enterprise Engine",
    categoryStyles: "bg-black/5 text-black",
    name: "Geometry to Text Engine",
    visual: <GeometryToTextIcon />
  }
];

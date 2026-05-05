import { motion } from 'motion/react';
import { Box, Map, MessageSquare } from 'lucide-react';
import React from 'react';

export const AssetCreationIcon = () => (
  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105 bg-gray-50">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1px)] [background-size:20px_20px]" />
    <motion.div 
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="relative w-32 h-32"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 border border-black/5" />
      <div className="absolute inset-0 border border-black/10 rotate-45" />
      <div className="absolute inset-0 border border-black/15 -rotate-45" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Box className="w-8 h-8 text-black opacity-40" />
      </div>
    </motion.div>
  </div>
);

export const FarmlandsIcon = () => (
  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105 bg-gray-50">
    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:40px_40px] transform rotate-12 scale-150" />
    <motion.div 
      animate={{ x: ["-100%", "200%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-black/5 to-transparent skew-x-[-20deg]"
    />
    <div className="relative z-10 w-24 h-24 border border-black/10 rounded-full flex items-center justify-center bg-white shadow-sm">
      <Map className="w-8 h-8 text-black opacity-60" />
    </div>
  </div>
);

export const ConversationalAIIcon = () => (
  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105 bg-gray-50">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
    
    <div className="relative w-40 h-32 border border-black/10 rounded-lg p-3 flex flex-col gap-3 bg-white/50">
      <div className="flex justify-between w-full h-8">
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} className="w-1/3 h-full border border-black/10 rounded-sm bg-black/5" />
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="w-1/2 h-full border border-black/10 rounded-sm bg-black/5" />
      </div>
      <div className="flex gap-3 h-12">
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="w-2/3 h-full border border-black/10 rounded-sm bg-black/5" />
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} className="w-1/3 h-full border border-black/10 rounded-sm bg-black/5" />
      </div>
    </div>

    <motion.div 
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-black rounded-2xl shadow-xl rounded-br-none"
    >
      <MessageSquare className="w-6 h-6 text-white" />
    </motion.div>
  </div>
);

export interface CaseStudy {
  title: string;
  link: string;
  isInternal: boolean;
  visual: React.ReactNode;
}

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    title: "Optimising 3D Asset Creation: A Case Study in Automating Photogrammetry Workflows",
    link: "/casestudies/asset-creation",
    isInternal: true,
    visual: <AssetCreationIcon />
  },
  {
    title: "Digitising Farmlands: Building a Unified Geo-spatial Repository for Policy-Driven Agriculture",
    link: "/casestudies/digitising-farmlands",
    isInternal: true,
    visual: <FarmlandsIcon />
  },
  {
    title: "Conversational AI for Floor Plan Customisation",
    link: "/casestudies/conversational-ai",
    isInternal: true,
    visual: <ConversationalAIIcon />
  }
];

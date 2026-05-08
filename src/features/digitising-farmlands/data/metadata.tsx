import { motion } from 'motion/react';
import { Map } from 'lucide-react';
import React from 'react';

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

const DIGITISING_FARMLANDS_METADATA = {
  title: "Digitising Farmlands: Building a Unified Geo-spatial Repository for Policy-Driven Agriculture",
  link: "/casestudies/digitising-farmlands",
  isInternal: true,
  visual: <FarmlandsIcon />
};

export default DIGITISING_FARMLANDS_METADATA;

import { motion } from 'motion/react';
import { Box } from 'lucide-react';
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

const ASSET_CREATION_METADATA = {
  title: "Optimising 3D Asset Creation: A Case Study in Automating Photogrammetry Workflows",
  link: "/casestudies/asset-creation",
  isInternal: true,
  visual: <AssetCreationIcon />
};

export default ASSET_CREATION_METADATA;

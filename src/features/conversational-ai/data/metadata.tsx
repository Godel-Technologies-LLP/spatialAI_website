import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import React from 'react';

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

const CONVERSATIONAL_AI_METADATA = {
  title: "Conversational AI for Floor Plan Customisation",
  link: "/casestudies/conversational-ai",
  isInternal: true,
  visual: <ConversationalAIIcon />
};

export default CONVERSATIONAL_AI_METADATA;

import React from 'react';
import { ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';

export const ObjectivesContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>The project was initiated to overhaul the existing pipeline with the following goals:</p>
    <ul className="list-none space-y-4 mt-6 mb-12 pl-6 font-sans text-base">
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Significantly reduce the compute time required for generating 3D assets.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Minimise the need for manual operator intervention and reduce human error.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Create a flexible and modular framework that allows for greater control and experimentation.
      </li>
    </ul>

    <div className="flex flex-col items-center py-16 bg-gray-50 border border-gray-200 rounded-2xl font-sans">
      <div className="grid grid-cols-2 gap-x-16 gap-y-12 relative max-w-[500px] w-full px-8">
        <div className="absolute top-[35px] left-[180px] right-[180px] h-0.5 bg-gray-300" />
        <div className="absolute bottom-[35px] left-[180px] right-[180px] h-0.5 bg-gray-300" />
        <div className="absolute right-[80px] top-[70px] bottom-[70px] w-0.5 bg-gray-300" />
        <div className="absolute left-[80px] top-[70px] bottom-[70px] w-0.5 bg-gray-300" />
        
        <ArrowRight className="absolute top-[25px] left-1/2 -translate-x-1/2 w-6 h-6 text-gray-400" />
        <ArrowDown className="absolute right-[68px] top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        <ArrowRight className="absolute bottom-[25px] left-1/2 -translate-x-1/2 w-6 h-6 text-gray-400 rotate-180" />
        <ArrowUp className="absolute left-[68px] top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />

        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50">
          Data Ingest
        </div>
        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50">
          Point Cloud<br/>Alignment
        </div>
        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50 row-start-2">
          Optimization
        </div>
        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50 row-start-2 col-start-2">
          Model<br/>Generation
        </div>
      </div>
      <p className="mt-16 text-xs italic text-center text-gray-500 max-w-sm font-sans">
        The new Object-Oriented framework breaks the monolithic process into independent, manageable stages.
      </p>
    </div>
  </div>
);

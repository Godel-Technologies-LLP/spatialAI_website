import React from 'react';
import { Clock, Activity, Users } from 'lucide-react';

export const ChallengeContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      The client's automated pipeline was built on a single, monolithic script. While functional, it was rigid and inefficient. The primary challenges were:
    </p>
    <ul className="list-none space-y-6 my-8 pl-6 font-sans text-base">
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Frequent Failures:</strong> Processing runs often failed or produced low-accuracy models due to suboptimal input parameters or poor video quality.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Wasted Compute Time:</strong> When a run failed, the entire process had to be restarted from the beginning, consuming significant compute resources.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Manual Intervention:</strong> In the headless processing mode, designers had to manually sift through dense log files to diagnose issues, tweak parameters, and relaunch the job.
      </li>
    </ul>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-2xl text-center">
        <Clock className="w-10 h-10 text-[#4A90E2] mb-4 stroke-[1.5]" />
        <span className="font-bold text-xs font-label tracking-widest text-[#4A90E2] uppercase">Reduce Time</span>
      </div>
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-2xl text-center">
        <Activity className="w-10 h-10 text-[#4A90E2] mb-4 stroke-[1.5]" />
        <span className="font-bold text-xs font-label tracking-widest text-[#4A90E2] uppercase">Improve Accuracy</span>
      </div>
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-2xl text-center">
        <Users className="w-10 h-10 text-[#4A90E2] mb-4 stroke-[1.5]" />
        <span className="font-bold text-xs font-label tracking-widest text-[#4A90E2] uppercase leading-tight">Increase Operator Efficiency</span>
      </div>
    </div>
  </div>
);

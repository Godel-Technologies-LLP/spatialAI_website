import React from 'react';

export const SolutionContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      The monolithic script was re-architected into a modular, Object-Oriented Programming (OOP) framework. This new system dismantled the single, linear process into a series of independent, interoperable stages.
    </p>
    <p className="mt-8 mb-6 font-sans font-medium text-black">The key features of the solution include:</p>
    <div className="space-y-6 mt-6 font-sans text-base">
      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h4 className="text-black font-bold mb-3 uppercase font-label tracking-widest text-xs">Modular Process Control</h4>
        <p className="text-gray-600">
          The new framework allows operators to start, stop, and resume the workflow from any individual step.
        </p>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h4 className="text-black font-bold mb-3 uppercase font-label tracking-widest text-xs">Parallel Experimentation</h4>
        <p className="text-gray-600">
          The solution enables a <strong className="text-black">Design of Experiments (DoE)</strong> approach. Operators can run multiple versions of a single stage in parallel.
        </p>
      </div>
    </div>
  </div>
);

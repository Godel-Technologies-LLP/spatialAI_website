import React from 'react';

export const ConclusionContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p className="leading-loose mb-16">
      By transforming a rigid, inefficient script into a modular framework, we delivered immediate value.
    </p>

    <div className="pt-12 mt-16 border-t border-gray-200 font-sans">
      <h2 className="text-2xl md:text-3xl font-headline font-black uppercase text-black mb-2 tracking-tighter">Appendix</h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/40">Pipeline Step</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/40">Time %</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/40">Intensity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { step: 'Feature Detection', time: '10-15%', intensity: 'Medium' },
              { step: 'Dense Reconstruction', time: '25-35%', intensity: 'Very High' },
            ].map((row, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-sm font-bold text-black">{row.step}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{row.time}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    row.intensity === 'Very High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {row.intensity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

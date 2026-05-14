import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { supabase } from './lib/supabase';

const AdminLeads = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: dbData, error } = await supabase
        .from('document_analytics')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && dbData) {
        setData(dbData);
      }
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  const clearData = async () => {
    if (window.confirm("Are you sure you want to clear all lead data? This cannot be undone.")) {
      const { error } = await supabase
        .from('document_analytics')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Deletes all rows safely
      
      if (!error) {
        setData([]);
      }
    }
  };

  return (
    <Layout>
      <div className="pt-32 pb-24 min-h-screen">
        <div className="wrap">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="font-headline font-bold text-4xl uppercase tracking-tight mb-2">Admin Dashboard</h1>
              <p className="text-black/50">View uploaded leads and document analytics directly from Supabase.</p>
            </div>
            <button 
              onClick={clearData}
              className="px-4 py-2 bg-red-50 text-red-600 rounded text-sm font-bold border border-red-200 hover:bg-red-100 transition-colors"
            >
              Clear Data
            </button>
          </div>

          <div className="bg-white border border-black/10 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-black/5 border-b border-black/10 font-mono text-[10px] uppercase tracking-widest text-black/60">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Document</th>
                    <th className="px-6 py-4">Verdict</th>
                    <th className="px-6 py-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-black/40">
                        Loading data from Supabase...
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-black/40">
                        No lead data found. Upload a document in the Layout Analyzer first.
                      </td>
                    </tr>
                  ) : (
                    data.map((row, idx) => (
                      <tr key={row.id || idx} className="hover:bg-black/[0.02]">
                        <td className="px-6 py-4 text-black/60">
                          {new Date(row.created_at).toLocaleDateString()} {new Date(row.created_at).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 font-bold">{row.name || 'N/A'}</td>
                        <td className="px-6 py-4">{row.email || 'N/A'}</td>
                        <td className="px-6 py-4 text-black/60">{row.company || '-'}</td>
                        <td className="px-6 py-4">{row.document_name}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.verdict === 'good' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {row.verdict || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <details className="cursor-pointer group">
                            <summary className="text-blue-600 hover:text-blue-800 text-xs font-bold outline-none">View JSON</summary>
                            <div className="absolute right-10 mt-2 p-4 bg-white border border-black/10 shadow-xl rounded-lg z-10 w-96 max-w-sm whitespace-pre-wrap text-[10px] font-mono text-black/70 overflow-auto max-h-64">
                              {JSON.stringify(row.raw_metrics, null, 2)}
                            </div>
                          </details>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-emerald-800 bg-emerald-50 p-4 rounded text-center border border-emerald-100">
            <b>Live Production Database:</b> This data is securely fetched from your Supabase backend.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLeads;

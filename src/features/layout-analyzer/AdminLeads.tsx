import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { supabase } from './lib/supabase';
import { Lock, ShieldAlert, User } from 'lucide-react';

const ADMIN_EMAILS = ['info@godeltech.in', 'vishwa@godeltech.in', 'jannu@godeltech.in'];

const AdminLeads = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setAuthLoading(false);
      
      if (session?.user && ADMIN_EMAILS.includes(session.user.email || '')) {
        fetchData();
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user && ADMIN_EMAILS.includes(session.user.email || '')) {
        fetchData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: dbData, error } = await supabase
      .from('document_analytics')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && dbData) {
      setData(dbData);
    }
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!ADMIN_EMAILS.includes(loginEmail.trim().toLowerCase())) {
      setErrorMsg('Unauthorized: This email does not have admin privileges.');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: loginEmail,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setOtpStep(true);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const { data: { session }, error } = await supabase.auth.verifyOtp({
      email: loginEmail,
      token: otpCode,
      type: 'email'
    });

    if (error) {
      setErrorMsg(error.message);
    } else if (session) {
      setUser(session.user);
    }
  };

  const clearData = async () => {
    if (window.confirm("Are you sure you want to clear all lead data? This cannot be undone.")) {
      const { error } = await supabase
        .from('document_analytics')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (!error) {
        setData([]);
      }
    }
  };

  if (authLoading) {
    return <Layout><div className="pt-64 text-center font-mono text-xs uppercase tracking-widest opacity-40">Verifying Authority...</div></Layout>;
  }

  // Auth Guard: If not logged in or not an admin email
  if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
    return (
      <Layout>
        <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md p-10 bg-white border border-black/10 rounded-[32px] shadow-xl text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8">
              <Lock size={24} />
            </div>
            <h1 className="font-headline font-bold text-3xl uppercase tracking-tight mb-2">Admin Access</h1>
            <p className="text-black/50 text-sm mb-10 leading-relaxed">
              This area is restricted to authorized personnel. Please verify your identity to continue.
            </p>

            {!otpStep ? (
              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-black/60 mb-1.5">Admin Email</label>
                  <input 
                    required 
                    type="email" 
                    value={loginEmail} 
                    onChange={e => setLoginEmail(e.target.value)} 
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors" 
                    placeholder="admin@godeltech.in" 
                  />
                </div>
                {errorMsg && <div className="text-red-600 text-xs font-bold bg-red-50 p-3 rounded border border-red-100">{errorMsg}</div>}
                <button type="submit" className="w-full h-12 bg-black text-white rounded-lg font-bold hover:bg-black/80 transition-colors mt-6">
                  Send Access Key
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-black/60 mb-1.5">Verification Code</label>
                  <input 
                    required 
                    type="text" 
                    maxLength={6}
                    value={otpCode} 
                    onChange={e => setOtpCode(e.target.value)} 
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors text-center font-mono tracking-[0.5em] text-lg" 
                    placeholder="••••••" 
                  />
                </div>
                {errorMsg && <div className="text-red-600 text-xs font-bold bg-red-50 p-3 rounded border border-red-100">{errorMsg}</div>}
                <button type="submit" className="w-full h-12 bg-black text-white rounded-lg font-bold hover:bg-black/80 transition-colors mt-6">
                  Verify & Unlock
                </button>
                <button type="button" onClick={() => setOtpStep(false)} className="w-full text-xs text-black/40 hover:text-black transition-colors text-center mt-2">
                  ← Back to login
                </button>
              </form>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-32 pb-24 min-h-screen">
        <div className="wrap">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-black text-white text-[8px] font-bold uppercase tracking-widest rounded">Admin Only</span>
                <h1 className="font-headline font-bold text-4xl uppercase tracking-tight">Analysis Dashboard</h1>
              </div>
              <p className="text-black/50">Authenticated as: <b className="text-black">{user.email}</b></p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => supabase.auth.signOut()}
                className="px-4 py-2 bg-white text-black border border-black/10 rounded text-sm font-bold hover:bg-black/5 transition-colors"
              >
                Logout
              </button>
              <button 
                onClick={clearData}
                className="px-4 py-2 bg-red-50 text-red-600 rounded text-sm font-bold border border-red-200 hover:bg-red-100 transition-colors"
              >
                Clear Data
              </button>
            </div>
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
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          Fetching fresh data...
                        </div>
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-black/40">
                        No analysis data found. Upload a document in the Layout Analyzer first.
                      </td>
                    </tr>
                  ) : (
                    data.map((row, idx) => (
                      <tr key={row.id || idx} className="hover:bg-black/[0.02] transition-colors">
                        <td className="px-6 py-4 text-black/60">
                          {new Date(row.created_at).toLocaleDateString()} {new Date(row.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
          
          <div className="mt-8 flex items-center justify-between">
            <div className="text-xs text-black/40 font-mono">
              Total Analyses: <b className="text-black">{data.length}</b>
            </div>
            <div className="text-[10px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Authenticated Connection to Supabase
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLeads;

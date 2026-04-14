import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { SectionHeading } from '../components/ui/Typography';

const Solutions = () => {
  const [activeDomain, setActiveDomain] = useState('Architecture');

  const domains = [
    { name: 'Architecture', icon: 'architecture' },
    { name: 'Agritech', icon: 'agriculture' },
    { name: 'Manufacturing', icon: 'factory' }
  ];

  return (
    <Layout>
      <div className="pt-24 min-h-screen">
        {/* Sticky Mobile Sub-Nav */}
        <div className="sticky top-[72px] bg-white/80 backdrop-blur-md z-[90] border-b border-gray-100 md:hidden overflow-x-auto whitespace-nowrap px-6 py-4 hide-scrollbar">
          <div className="flex gap-8">
            {domains.map((domain) => (
              <button
                key={domain.name}
                onClick={() => setActiveDomain(domain.name)}
                className={`text-[10px] font-medium uppercase tracking-widest transition-all duration-300 pb-1 border-b-2 ${
                  activeDomain === domain.name ? 'text-black border-black' : 'text-black/30 border-transparent'
                }`}
              >
                {domain.name}
              </button>
            ))}
          </div>
        </div>

        {/* SideNavBar - Desktop only */}
        <aside className="fixed left-0 top-24 h-[calc(100vh-96px)] flex flex-col p-8 bg-white w-80 z-40 hidden lg:flex border-r border-gray-100">
          <div className="mb-12">
            <h3 className="font-label uppercase tracking-widest text-[10px] text-black/40 mb-1 font-semibold">SOLUTIONS</h3>
            <p className="font-label uppercase tracking-widest text-[9px] text-black/20 font-semibold">Technical Domains</p>
          </div>
          <nav className="flex-1 space-y-2">
            {domains.map((domain) => (
              <button
                key={domain.name}
                onClick={() => setActiveDomain(domain.name)}
                className={`flex items-center gap-4 p-4 w-full text-left transition-all duration-300 rounded-xl font-label uppercase tracking-widest text-[10px] border ${
                  activeDomain === domain.name 
                    ? 'text-black font-medium bg-black/5 border-black/5' 
                    : 'text-black/40 hover:bg-black/5 hover:text-black border-transparent'
                }`}
              >
                <span className="material-symbols-outlined">{domain.icon}</span>
                {domain.name}
              </button>
            ))}
          </nav>
          <div className="mt-auto space-y-4 pt-8 border-t border-gray-100">
            <a className="flex items-center gap-4 text-black/40 hover:text-black transition-all font-label uppercase tracking-widest text-[9px]" href="#">
              <span className="material-symbols-outlined text-sm">menu_book</span>
              Documentation
            </a>
            <a className="flex items-center gap-4 text-black/40 hover:text-black transition-all font-label uppercase tracking-widest text-[9px]" href="#">
              <span className="material-symbols-outlined text-sm">contact_support</span>
              Support
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:pl-80 pt-12">
          <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
            <span className="material-symbols-outlined text-6xl text-black/10 mb-8">
              {domains.find(d => d.name === activeDomain)?.icon}
            </span>
            <h2 className="text-4xl md:text-6xl font-headline font-medium text-black tracking-tighter mb-4">
              {activeDomain} <br className="md:hidden" /> Solutions
            </h2>
            <p className="text-black/40 font-label uppercase tracking-[0.3em] text-xs font-medium">
              To be updated
            </p>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default Solutions;

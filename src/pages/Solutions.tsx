import { useState } from 'react';
import Header from '../components/Header';
import logo from "../assets/logo.png";

const Solutions = () => {
  const [activeDomain, setActiveDomain] = useState('Architecture');

  const domains = [
    { name: 'Architecture', icon: 'architecture' },
    { name: 'Agritech', icon: 'agriculture' },
    { name: 'Manufacturing', icon: 'factory' }
  ];

  return (
    <div className="bg-white selection:bg-black selection:text-white font-body text-black min-h-screen">
      <Header />

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

      {/* SideNavBar - Desktop only (Large screens) */}
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
      <main className="lg:pl-80 pt-12 md:pt-24 min-h-screen">
        {activeDomain === 'Architecture' ? (
          <>
            {/* Hero Section */}
            <section className="relative min-h-[500px] md:h-[600px] w-full overflow-hidden flex items-end p-6 md:p-12">
              <div className="absolute inset-0 z-0">
                <img 
                  alt="" 
                  className="w-full h-full object-cover opacity-10 grayscale" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsqFPpDQYQiLKU8TvLx1NGhf-lx9KbLztLc3ZkLwV_tKCS0i0ecO-bnu0SzmzoPXH74p8W8c4N9o_Eg8lwsELqtOqos_MYKxp8qmrSom4nIF5tHUmpgzxqhIraGk2HxNDJRhZZSsJl2L7UBDA6QPG2ZkjxwIu09y7ClI7auo_KkD4oObPJ_1cz8qKR6Zq0C5F9mCytRFsYhqQk-qWww2MRH65FHsGluO9UjVRtzrbY4m6Zj-wW7AunOwHRovgDu0YXjf9Mejp_GeEh"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>
              <div className="relative z-10 max-w-4xl">
                <span className="font-label uppercase tracking-[0.3em] text-[10px] text-black/40 font-medium mb-4 md:mb-6 block">Foundational Architecture</span>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-headline font-medium text-black tracking-tighter leading-[0.9] mb-8 uppercase tracking-tighter-extra">Engineering the Future of Spatial Design</h1>
                <p className="text-lg md:text-xl text-black/60 max-w-2xl font-medium leading-relaxed">GODEL redefines the intersection of computation and physical form, delivering surgical precision in every spatial operation.</p>
              </div>
            </section>

            {/* Category A: Generative Design */}
            <section className="py-16 md:py-24 px-6 md:px-12 bg-white" id="generative">
              <div className="flex flex-col lg:flex-row justify-between items-start mb-16 md:mb-24 gap-8 md:gap-12">
                <div className="max-w-xl">
                  <span className="font-label text-black/40 tracking-widest text-xs uppercase mb-4 block font-medium">Section 01</span>
                  <h2 className="text-4xl md:text-5xl font-headline font-medium text-black tracking-tight uppercase tracking-tighter-extra">Generative Design</h2>
                </div>
                <div className="max-w-md text-black/60">
                  <p className="font-body text-base leading-relaxed">Leveraging neural-symbolic architectures to synthesize complex spatial forms that balance aesthetic intent with structural constraints.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Project 1 */}
                <div className="group bg-gray-50 rounded-[32px] p-2 transition-all duration-500 hover:shadow-xl hover:shadow-black/5">
                  <div className="aspect-[16/9] overflow-hidden mb-6 md:mb-8 relative bg-gray-200 rounded-[24px]">
                    <img 
                      alt="" 
                      className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700 opacity-80" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd8_muzLfU9yocUUgVgDfUoF7-MOuhr0FbGqHMLZgTlBXUPPiVAJL2Z6KSwf_k2X0ZoHp8ZzZEVPmHfQ2624prueZ45aOfDS7UoEcU_twNfp6tOvuZM0BaehI9CmYYg9ZT1idloljo13_iWlD2VAbzAin8QPbyhmaA25bdWY_rro1YR3NMBJgQiUv9TF7yWLlFFed8VgcxN2735-r0PYBIiDhhYFH8hPZbBaF_Lf6jmMzu8lBuyYzaCfExnXeXsSQl-h3JFpoL_feY"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 font-label text-[10px] tracking-tighter font-medium uppercase rounded-full scale-75 md:scale-100">Active Engine</div>
                  </div>
                  <div className="px-4 md:px-8 pb-8 md:pb-12">
                    <h3 className="text-xl md:text-2xl font-headline font-medium text-black mb-4 tracking-tight">Aesthetic Style Transfer Engine</h3>
                    <p className="text-black/60 font-body text-sm leading-relaxed mb-6 md:mb-8 max-w-md">Projecting historical architectural motifs onto modern parametric shells while maintaining core structural logic and material efficiency.</p>
                    <button className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-black font-medium hover:translate-x-2 transition-transform">
                      View Spec Sheet <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                    </button>
                  </div>
                </div>
                {/* Project 2 */}
                <div className="group bg-gray-50 rounded-[32px] p-2 transition-all duration-500 hover:shadow-xl hover:shadow-black/5">
                  <div className="aspect-[16/9] overflow-hidden mb-6 md:mb-8 relative bg-gray-200 rounded-[24px]">
                    <img 
                      alt="" 
                      className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700 opacity-80" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQtI9qpBUpovbSHWJ22OyVyRWyCtkggy8oSAXEuvObDsYwzNybHcr7-RUu1qVZ_nP9-Z3RIi3ZFXXauGURuWyL1ZUrc_AcZ9wpHXgXr0WOunnsruoX_NS263LkJ1cckX-9-N8AIqe4IRB_Z5Nhp3EmYbHvEz91CleYgVYfQkJFwAiJptjCsXJGu-lDpMcT_nuzVlD8ukL1ACsJsJRGtsc4mNneo0_z5GA13cpS6uKRnpPVXo9Ap4OOaLB0sDwaw_JQaxe5Yctab_Jz"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md text-black border border-black/5 px-3 py-1 font-label text-[10px] tracking-tighter font-medium uppercase rounded-full scale-75 md:scale-100">Modeler V2.4</div>
                  </div>
                  <div className="px-4 md:px-8 pb-8 md:pb-12">
                    <h3 className="text-xl md:text-2xl font-headline font-medium text-black mb-4 tracking-tight">Sketch-to-Parametric Modeler</h3>
                    <p className="text-black/60 font-body text-sm leading-relaxed mb-6 md:mb-8 max-w-md">Instantly converting gestural input into high-fidelity parametric models with real-time solar analysis and volume optimization.</p>
                    <button className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-black font-medium hover:translate-x-2 transition-transform">
                      View Spec Sheet <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Category B: Spatial Intelligence */}
            <section className="py-16 md:py-24 px-6 md:px-12 bg-gray-50" id="spatial">
              <div className="flex flex-col lg:flex-row justify-between items-start mb-16 md:mb-24 gap-8 md:gap-12">
                <div className="max-w-xl">
                  <span className="font-label text-black/40 tracking-widest text-xs uppercase mb-4 block font-medium">Section 02</span>
                  <h2 className="text-4xl md:text-5xl font-headline font-medium text-black tracking-tight uppercase tracking-tighter-extra">Spatial Intelligence</h2>
                </div>
                <div className="max-w-md text-black/60">
                  <p className="font-body text-base leading-relaxed">Cognitive spatial mapping and behavioral analysis systems designed to optimize human-environment interaction patterns.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="group relative bg-white p-6 md:p-10 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:shadow-black/5 transition-all">
                  <div className="mb-8 md:mb-12">
                    <span className="material-symbols-outlined text-black text-3xl md:text-4xl mb-6">floor_lamp</span>
                    <h3 className="text-2xl md:text-3xl font-headline font-medium text-black mb-4">FloorPlan AI Assistant</h3>
                    <p className="text-black/60 font-body text-sm md:text-base leading-relaxed">Automated interior layout generation that prioritizes occupant wellness, circulation efficiency, and programmatic adjacencies.</p>
                  </div>
                  <div className="w-full aspect-video bg-gray-100 rounded-3xl overflow-hidden">
                    <img 
                      alt="" 
                      className="w-full h-full object-cover opacity-60 grayscale" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZF-5b7dHeeXywjNNZpnNvzeK1qYkQQonI6Lr1gVJl8K4EMHekDNkSwEomlBdgyvaSM_lJoOP16BPSeer3wlMKcLj6cHtnF2WW2ovgFcCPg9OAWf3H96Lpa4P0hAwlAJ1QWKMKdz2Tmckt_4PlBKpeEdZMMCHVRv4m03tBonAF1FM8TJ37NVWp3OvCwMMTj5lReIT568ZGNDmRYqboUD0l0KS51D2g_qddlTYVK-11NrysGvNjPdN3CHbhSRQ8Wqu8E98FoTE8dXpM"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="group relative bg-white p-6 md:p-10 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:shadow-black/5 transition-all">
                  <div className="mb-8 md:mb-12">
                    <span className="material-symbols-outlined text-black text-3xl md:text-4xl mb-6">domain</span>
                    <h3 className="text-2xl md:text-3xl font-headline font-medium text-black mb-4">Site Context Intelligence</h3>
                    <p className="text-black/60 font-body text-sm md:text-base leading-relaxed">Deep environmental analysis integrating terrain, local microclimates, and urban density data to inform massing strategy.</p>
                  </div>
                  <div className="w-full aspect-video bg-gray-100 rounded-3xl overflow-hidden">
                    <img 
                      alt="" 
                      className="w-full h-full object-cover opacity-60 grayscale" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9rv_o8H34pOnvCIOYo0iCHBOLMIko7zK1P1OpuqsMJbUN_b1vsSJB0QvcJrkUaSJueKysvyIqm3132Co5DMhhTleB8Qilf3SENuXU6s6Y84U2CL490U8mUT09G8wpNq84bkLibmijC46dGJ8Mj19rq_8mHEIaZaW1qjzuhhIyVUjBD381baPSgKveuohFeynPxChs9rafr7Mplo1dmkjl49AuEEOobzza6nqo92PxUemwU9WCMK6Rl8m6SmFI6Y5IYf1VXSN0951J"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Category C: Transformative Automation */}
            <section className="py-16 md:py-24 px-6 md:px-12 bg-white" id="automation">
              <div className="flex flex-col lg:flex-row justify-between items-start mb-16 md:mb-24 gap-8 md:gap-12">
                <div className="max-w-xl">
                  <span className="font-label text-black/40 tracking-widest text-xs uppercase mb-4 block font-medium">Section 03</span>
                  <h2 className="text-4xl md:text-5xl font-headline font-medium text-black tracking-tight uppercase tracking-tighter-extra">Transformative Automation</h2>
                </div>
                <div className="max-w-md text-black/60">
                  <p className="font-body text-base leading-relaxed">Streamlining the conversion from physical reality to digital precision through proprietary computer vision algorithms.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-gray-50 p-8 md:p-12 rounded-[48px] hover:bg-black hover:text-white transition-all duration-700 group cursor-pointer">
                  <div className="h-48 md:h-64 mb-8 md:mb-12 bg-gray-200 rounded-3xl flex items-center justify-center overflow-hidden border border-black/5">
                    <img 
                      alt="" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 grayscale" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3GuOEACVDufVhC5J_6132eX-hk0LT9WnF0NgqHRhwqbmrFmFKCl_NmV8DxPT9p5bNN4SEWQouA7umD4uxTLfbQLXJAO6hd95fz3-NG54PMs3dYkEkMfFAuP7T1LY0377MMxP8EpoKuXT78QST1j-jntEeMan88mkIOj4oPi9eooggg5qz9ByflVvmPzRmCWSI9pk5mSt1gQbqO9qCp89z_5dWQif-DJpxkBEq_MIBTrkfJWeeWSPTVGq_-Hiv2F0t2Sr9MbLnJrHe"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-headline font-medium mb-6 tracking-tight">Scan-to-CAD Digital Twin</h3>
                  <p className="text-black/60 group-hover:text-white/60 font-body text-sm leading-relaxed mb-8">High-fidelity reconstruction of physical spaces into editable BIM components with 0.5mm accuracy thresholds.</p>
                  <div className="flex gap-2 md:gap-4 flex-wrap">
                    <div className="px-3 py-1 bg-black/5 group-hover:bg-white/10 font-label text-[9px] uppercase tracking-widest font-semibold">LIDAR-READY</div>
                    <div className="px-3 py-1 bg-black/5 group-hover:bg-white/10 font-label text-[9px] uppercase tracking-widest font-semibold">CAD-EXPORT</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-8 md:p-12 rounded-[48px] hover:bg-black hover:text-white transition-all duration-700 group cursor-pointer">
                  <div className="h-48 md:h-64 mb-8 md:mb-12 bg-gray-200 rounded-3xl flex items-center justify-center overflow-hidden border border-black/5">
                    <img 
                      alt="" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 grayscale" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvyr0-X8LGH7xaZHAyzAoS1tSe9ci1RvrlyfnnIBTFFtz3Y31Yk5alJN1FKqIS_i1dmW0P9hvmBERCTYLiDqbv4QnYuJ-d-Ds3Zpgp5r-tcxhM4wMsSXdAvXFbuTDC8cko54epo0xwv5GjYwBYTHUog6kKvKlSImszmRN2nAs8Wh_174FJPmahKs1Ed2C84lJ5pmrbS41KSHtJCQFI9DGQIDXW-Z0DRg--4IraBZSF2VIIQAFdCjc8HwaV9VkZmJezPQRJyxQ3gykp"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-headline font-medium mb-6 tracking-tight">Intelligent DWG Processor</h3>
                  <p className="text-black/60 group-hover:text-white/60 font-body text-sm leading-relaxed mb-8">Automated layer auditing, cleanup, and vectorization for legacy architectural archives using neural object detection.</p>
                  <div className="flex gap-2 md:gap-4 flex-wrap">
                    <div className="px-3 py-1 bg-black/5 group-hover:bg-white/10 font-label text-[9px] uppercase tracking-widest font-semibold">BATCH-PROC</div>
                    <div className="px-3 py-1 bg-black/5 group-hover:bg-white/10 font-label text-[9px] uppercase tracking-widest font-semibold">NEURAL-TAG</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
            <span className="material-symbols-outlined text-6xl text-black/10 mb-8">
              {domains.find(d => d.name === activeDomain)?.icon}
            </span>
            <h2 className="text-4xl md:text-6xl font-headline font-medium text-black tracking-tighter mb-4">
              {activeDomain} <br className="md:hidden" /> Solutions
            </h2>
            <p className="text-black/40 font-label uppercase tracking-[0.3em] text-xs font-medium">
              Yet to be updated
            </p>
          </section>
        )}

        {/* Footer */}
        <footer className="w-full py-16 md:py-20 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center bg-white border-t border-gray-100 gap-8">
          <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-50">
            <img src={logo} alt="Godel Technologies Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-medium text-black tracking-tighter uppercase tracking-tighter-extra">Godel Technologies</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <a className="font-label text-[10px] tracking-widest text-black/40 hover:text-black transition-colors uppercase font-medium" href="#">Privacy Policy</a>
            <a className="font-label text-[10px] tracking-widest text-black/40 hover:text-black transition-colors uppercase font-medium" href="#">Terms of Service</a>
            <a className="font-label text-[10px] tracking-widest text-black/40 hover:text-black transition-colors uppercase font-medium" href="#">Security</a>
          </div>
          <div className="font-label text-[10px] tracking-widest text-black/20 uppercase text-center md:text-right font-medium w-full md:w-auto">
            © 2024 GODEL TECH. ALL RIGHTS RESERVED.
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Solutions;


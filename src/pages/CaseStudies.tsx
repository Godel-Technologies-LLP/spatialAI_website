import Header from '../components/Header';
import logo from "../assets/logo.png";

const CaseStudies = () => {
  return (
    <div className="bg-white selection:bg-black selection:text-white font-body text-black overflow-x-hidden min-h-screen">
      <Header />

      <div className="flex pt-16 md:pt-24">
        {/* Main Content Area */}
        <main className="w-full p-6 md:p-12 min-h-screen bg-white">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-7xl font-headline font-medium text-black tracking-tighter leading-[0.9] uppercase tracking-tighter-extra">
                Our Case Studies
              </h1>
            </div>
          </header>


          {/* Case Studies Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-24">
            {/* Case Study 1 */}
            <a 
              href="https://www.godeltech.in/post/optimising-3d-asset-creation-a-case-study-in-automating-photogrammetry-workflows" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6 md:mb-8 bg-gray-50 border border-gray-100">
                <img 
                  alt="3D Asset Creation" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-80" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh9PHaMDge7QwP5URI3-chrfmSKImijOv_ximRyOvy4S4jFAnhqdJEcSWzWBpxV6sMCFRrjAFkvG3E5OxOMPv-63mr5curtUgJ9njn9L_eWrh0VdrQxAiem2GDdiiC5vZZevtTlh89nEgmLxiN6j6fuJ9FAlsNXKvFky1Ma4ZKrr2Ozna-VefdxgucTKMBju16j-P6us2uOHr34pMihmm0YjBZfq7qWPOCZbzhtCOfEt7ml_rBcDC4w7JrCRRYWMtFD2fVggiOM_JO"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end min-h-[50%]">
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="font-label text-white/60 text-[10px] uppercase tracking-widest font-medium">Admin Godel</span>
                    <span className="font-label text-white/40 text-[9px] uppercase tracking-widest font-medium">Jul 29, 2025 • 4 min read</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-headline font-medium text-white tracking-tighter leading-tight mb-0">
                    Optimising 3D Asset Creation: A Case Study in Automating...
                  </h3>
                </div>
              </div>
            </a>

            {/* Case Study 2 */}
            <a 
              href="https://www.godeltech.in/post/digitising-farmlands-building-a-unified-geo-spatial-repository-for-policy-driven-agriculture" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6 md:mb-8 bg-gray-50 border border-gray-100">
                <img 
                  alt="Digitising Farmlands" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-80" 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end min-h-[50%]">
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="font-label text-white/60 text-[10px] uppercase tracking-widest font-medium">Admin Godel</span>
                    <span className="font-label text-white/40 text-[9px] uppercase tracking-widest font-medium">Jul 29, 2025 • 3 min read</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-headline font-medium text-white tracking-tighter leading-tight mb-0">
                    Digitising Farmlands: Building a Unified Geo-spatial Repository for...
                  </h3>
                </div>
              </div>
            </a>

            {/* Case Study 3 */}
            <a 
              href="https://www.godeltech.in/post/conversational-ai-for-floor-plan-customisation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6 md:mb-8 bg-gray-50 border border-gray-100">
                <img 
                  alt="Conversational AI" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-80" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9rv_o8H34pOnvCIOYo0iCHBOLMIko7zK1P1OpuqsMJbUN_b1vsSJB0QvcJrkUaSJueKysvyIqm3132Co5DMhhTleB8Qilf3SENuXU6s6Y84U2CL490U8mUT09G8wpNq84bkLibmijC46dGJ8Mj19rq_8mHEIaZaW1qjzuhhIyVUjBD381baPSgKveuohFeynPxChs9rafr7Mplo1dmkjl49AuEEOobzza6nqo92PxUemwU9WCMK6Rl8m6SmFI6Y5IYf1VXSN0951J"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end min-h-[50%]">
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="font-label text-white/60 text-[10px] uppercase tracking-widest font-medium">Admin Godel</span>
                    <span className="font-label text-white/40 text-[9px] uppercase tracking-widest font-medium">Apr 21, 2025 • 4 min read</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-headline font-medium text-white tracking-tighter leading-tight mb-0">
                    Conversational AI for Floor Plan Customisation
                  </h3>
                </div>
              </div>
            </a>
          </section>

          {/* Bottom Brand Bar */}
          <div className="mt-12 md:mt-24 pt-8 md:pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] md:text-[10px] font-label tracking-widest text-black/20 font-semibold uppercase">
            <div className="flex items-center gap-4 group bg-white px-3 py-1.5 rounded-xl transition-all border border-gray-100/50 shadow-sm">
              <img src={logo} alt="Godel Technologies Logo" className="w-6 h-6 object-contain" />
              <span className="text-[10px] font-medium tracking-tight text-black whitespace-nowrap">Godel Technologies</span>
              <div className="ml-2">© 2024 ALL RIGHTS RESERVED.</div>
            </div>
            <div className="flex gap-8 md:gap-12">
              <a className="hover:text-black transition-colors" href="#">TERMS</a>
              <a className="hover:text-black transition-colors" href="#">PRIVACY</a>
              <a className="hover:text-black transition-colors" href="#">SECURITY</a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CaseStudies;

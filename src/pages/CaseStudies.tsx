import Layout from '../components/layout/Layout';
import { CASE_STUDY_LINKS } from '../constants/links';
import { Link } from 'react-router-dom';




const CaseStudies = () => {
  const cases = [
    {
      title: "Optimising 3D Asset Creation: A Case Study in Automating Photogrammetry Workflows",
      link: "/casestudies/asset-creation",
      isInternal: true,
      date: "Jul 29, 2025 • 4 min read",
      author: "Admin Godel",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh9PHaMDge7QwP5URI3-chrfmSKImijOv_ximRyOvy4S4jFAnhqdJEcSWzWBpxV6sMCFRrjAFkvG3E5OxOMPv-63mr5curtUgJ9njn9L_eWrh0VdrQxAiem2GDdiiC5vZZevtTlh89nEgmLxiN6j6fuJ9FAlsNXKvFky1Ma4ZKrr2Ozna-VefdxgucTKMBju16j-P6us2uOHr34pMihmm0YjBZfq7qWPOCZbzhtCOfEt7ml_rBcDC4w7JrCRRYWMtFD2fVggiOM_JO"
    },
    {
      title: "Digitising Farmlands: Building a Unified Geo-spatial Repository for Policy-Driven Agriculture",
      link: "/casestudies/digitising-farmlands",
      isInternal: true,
      date: "Jul 29, 2025 • 3 min read",
      author: "Admin Godel",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
    },
    {
      title: "Conversational AI for Floor Plan Customisation",
      link: "/casestudies/conversational-ai",
      isInternal: true,
      date: "Apr 21, 2025 • 4 min read",
      author: "Admin Godel",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9rv_o8H34pOnvCIOYo0iCHBOLMIko7zK1P1OpuqsMJbUN_b1vsSJB0QvcJrkUaSJueKysvyIqm3132Co5DMhhTleB8Qilf3SENuXU6s6Y84U2CL490U8mUT09G8wpNq84bkLibmijC46dGJ8Mj19rq_8mHEIaZaW1qjzuhhIyVUjBD381baPSgKveuohFeynPxChs9rafr7Mplo1dmkjl49AuEEOobzza6nqo92PxUemwU9WCMK6Rl8m6SmFI6Y5IYf1VXSN0951J"
    }
  ];

  const CardContent = ({ c }: { c: any }) => (
    <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6 md:mb-8 bg-gray-50 border border-gray-100">
      <img 
        alt={c.title} 
        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-80" 
        src={c.image}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end min-h-[50%]">
        <div className="flex flex-col gap-2 mb-6">
          <span className="font-label text-white/60 text-[10px] uppercase tracking-widest font-medium">Admin Godel</span>
          <span className="font-label text-white/40 text-[9px] uppercase tracking-widest font-medium">{c.date}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-headline font-medium text-white tracking-tighter leading-tight mb-0 line-clamp-2">
          {c.title}
        </h3>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="pt-32 min-h-screen bg-white">
        <main className="w-full max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-headline font-medium text-black tracking-tighter leading-[0.9] uppercase">
                Our Case Studies
              </h1>
            </div>
          </header>



          {/* Case Studies Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-24">
            {cases.map((c, i) => (
              c.isInternal ? (
                <Link 
                  key={i} 
                  to={c.link} 
                  className="group cursor-pointer block"
                >
                  <CardContent c={c} />
                </Link>
              ) : (
                <a 
                  key={i}
                  href={c.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group cursor-pointer block"
                >
                  <CardContent c={c} />
                </a>
              )
            ))}
          </section>

        </main>
      </div>
    </Layout>
  );
};

export default CaseStudies;

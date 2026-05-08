import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { PRODUCTS_DATA } from "../../data/products";
import IconResolver from "../../components/common/IconResolver";

const Products = () => {
  return (
    <Layout>
      <main className="bg-white min-h-screen pt-24 pb-24">

        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase leading-[0.9] mb-6">
              Intelligence for <br /> <span className="text-black/40 font-light">Complex Documents</span>
            </h1>
            <p className="text-base md:text-lg text-black/60 font-medium max-w-xl">
              Explore our growing suite of spatial data extraction and analysis tools. Click a product to view specifications.
            </p>
          </motion.header>
        </section>

        {/* Scalable Products Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {PRODUCTS_DATA.map((product) => (
              <Link
                key={product.id}
                to={product.path}
                className="flex flex-col justify-between border border-black/10 rounded-[24px] p-6 transition-all duration-500 hover:border-black/30 hover:shadow-xl bg-gray-50/30 hover:bg-white group"
              >
                <div>
                  <IconResolver iconId={product.iconId} />
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest mb-3 ${product.categoryStyles}`}>
                    {product.category}
                  </div>
                  <h3 className="text-xl font-medium tracking-tighter uppercase mb-2 leading-tight">{product.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-black group-hover:text-white group-hover:border-black self-start mt-4">
                  <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-45" />
                </div>
              </Link>
            ))}
          </div>
        </section>


      </main>
    </Layout>
  );
};

export default Products;

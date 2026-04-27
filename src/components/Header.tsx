import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SOCIAL_LINKS } from "../constants/links";
import logo from "../assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "Case Studies", href: "/casestudies" },
    { name: "Our Story", href: "/ourstory" },
    { name: "FAQ", href: "/faq" },
  ];

  const isActive = (path: string) => {
    if (path.startsWith("/#")) {
      return location.pathname === "/" && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 md:px-12 py-4 bg-white ${
        isScrolled ? "py-3 shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105 bg-white rounded-xl px-3 py-1.5 shadow-sm border border-gray-100/50">
            <img src={logo} alt="Godel Technologies Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-medium tracking-tighter text-black whitespace-nowrap">Godel Technologies</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isInternal = link.href.startsWith("/#");
            return isInternal ? (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-black" : "text-black/60 hover:text-black"
                }`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-black border-b-2 border-black pb-1" : "text-black/60 hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <a 
            href={SOCIAL_LINKS.CALENDLY}            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 transition-all active:scale-95 shadow-lg shadow-black/10"
          >
            Partner with Us
          </a>
        </nav>

        <button 
          className="md:hidden p-2 text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden shadow-2xl z-50"
          >
            {navLinks.map((link) => {
               const isInternal = link.href.startsWith("/#");
               return isInternal ? (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-lg font-bold ${isActive(link.href) ? "text-black" : "text-black/60"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-lg font-medium ${isActive(link.href) ? "text-black" : "text-black/60"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <a 
              href={SOCIAL_LINKS.CALENDLY} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-3 rounded-xl text-center font-medium shadow-lg shadow-black/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partner with Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

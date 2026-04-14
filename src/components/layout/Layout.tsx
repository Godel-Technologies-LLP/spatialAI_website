import React from "react";
import Header from "../Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  showDotGrid?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showDotGrid = true }) => {
  return (
    <div className={`min-h-screen bg-white selection:bg-black selection:text-white font-body text-black overflow-x-hidden ${showDotGrid ? 'dot-bg' : ''}`}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import CaseStudies from "./pages/CaseStudies";
import OurStory from "./pages/OurStory";

// ScrollToTop component to ensure pages start at the top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/casestudies" element={<CaseStudies />} />
        <Route path="/ourstory" element={<OurStory />} />
      </Routes>
    </Router>
  );
}

export default App;

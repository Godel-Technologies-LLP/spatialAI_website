import { SOCIAL_LINKS, CONTACT_METADATA } from "../../constants/links";

const Footer = () => (
  <footer className="px-6 md:px-12 py-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex gap-8 text-sm font-medium text-black/40">
        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
        <a href={`mailto:${CONTACT_METADATA.EMAIL}`} className="hover:text-black transition-colors">
          {CONTACT_METADATA.EMAIL}
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

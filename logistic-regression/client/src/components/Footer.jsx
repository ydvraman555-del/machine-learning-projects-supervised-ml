import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Globe, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Globe, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Predictions', href: '/predict' },
        { label: 'Features', href: '#features' },
        { label: 'API', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Research', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Privacy', href: '#' },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/5">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-purple flex items-center justify-center"
              >
                <Zap className="w-5 h-5 text-white" fill="currentColor" />
              </motion.div>
              <span className="text-xl font-bold text-white">
                Eco<span className="text-gradient">Predict</span>
              </span>
            </Link>
            <p className="text-white/50 mb-6 max-w-sm">
              Advanced machine learning platform for predicting clean energy 
              dominance across nations. Powered by LightGBM and FastAPI.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-cyan hover:border-cyan/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-1 text-white/50 hover:text-cyan transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight 
                        size={14} 
                        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" 
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              {currentYear} EcoPredict. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="#" className="text-white/40 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-white/40 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-white/40 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-6 bottom-6 w-12 h-12 rounded-full glass flex items-center justify-center text-cyan hover:bg-cyan/10 transition-colors"
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </motion.svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;

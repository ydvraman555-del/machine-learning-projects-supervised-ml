import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/predict', label: 'Predict' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center glow-amber">
              <Zap className="w-5 h-5 text-black" fill="currentColor" />
            </div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-xl border-2 border-dashed border-amber-400/30"
            />
          </motion.div>
          <span className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">
            Eco<span className="text-gradient">Predict</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative group"
            >
              <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive(link.path) ? 'text-amber-400' : 'text-white/70 hover:text-white'
              }`}>
                {link.label}
              </span>
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>

        {/* CTA Button / Status */}
        <div className="hidden md:flex items-center gap-4">
          <div className="group relative">
            <button className="px-5 py-2 glass rounded-xl text-amber-400 text-xs font-bold border-white/10 hover:border-amber-400/30 transition-all flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM ONLINE
            </button>
            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-3 w-64 glass-strong p-4 rounded-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none transition-all duration-300 border-amber-400/20">
              <h4 className="text-amber-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <Zap size={14} fill="currentColor" /> Model Intelligence
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-white/50 uppercase">
                  <span>Engine:</span>
                  <span className="text-white">LightGBM v1.2</span>
                </div>
                <div className="flex justify-between text-[10px] text-white/50 uppercase">
                  <span>Accuracy:</span>
                  <span className="text-emerald-400">96.9%</span>
                </div>
                <div className="flex justify-between text-[10px] text-white/50 uppercase pt-2 border-t border-white/5">
                  <span>Core Aim:</span>
                  <span className="text-amber-400">Logistic Reg.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden glass-strong"
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-medium ${
                isActive(link.path) ? 'text-amber-400' : 'text-white/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/predict" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="w-full mt-4 px-6 py-4 bg-amber-500 text-black font-bold rounded-xl flex items-center justify-center gap-2">
              <Zap size={18} fill="currentColor" />
              Analyze Energy Trends
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;

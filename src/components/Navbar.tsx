import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2, Calendar, Mail } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  // Smooth scroll listener with requestAnimationFrame and hysteresis
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled((prev) => {
            if (!prev && scrollY > 45) return true;
            if (prev && scrollY < 20) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Our Team', to: '/team' },
    { label: 'Projects', to: '/projects' },
    { label: 'Services', to: '/services' },
    { label: 'Investment', to: '/investment' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-3 sm:px-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {/* Morphing Fluid Navigation Bar */}
      <div
        className={`pointer-events-auto w-full flex items-center justify-between rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'max-w-[1240px] mt-2 sm:mt-3 px-4 sm:px-8 py-2 sm:py-2.5 bg-white/95 backdrop-blur-md text-slate-900 rounded-full shadow-[0_14px_35px_rgba(0,0,0,0.12)] border border-slate-200/80'
            : 'max-w-[1360px] mt-0 px-2 sm:px-4 py-2 sm:py-3.5 bg-transparent text-white border border-transparent shadow-none'
        }`}
      >
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          {!logoError ? (
            <div
              className={`relative aspect-[600/278] shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'h-9 sm:h-11 md:h-12' : 'h-11 sm:h-14 md:h-[68px]'
              }`}
            >
              {/* Light Logo (Transparent navbar / top of page) */}
              <img
                alt="SISMN LLC Logo"
                className={`absolute inset-0 h-full w-full object-contain transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                }`}
                src="/images/branding/sismn-logo-light.png"
                onError={() => setLogoError(true)}
              />
              {/* Dark Logo (Scrolled capsule navbar) */}
              <img
                alt="SISMN LLC Logo"
                className={`absolute inset-0 h-full w-full object-contain transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
                src="/images/branding/sismn-logo.png"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <div
              className={`rounded-full flex items-center justify-center transition-all duration-500 ${
                isScrolled
                  ? 'w-10 h-10 sm:w-11 sm:h-11 bg-[#0f172a] text-amber-500'
                  : 'w-14 h-14 sm:w-16 sm:h-16 bg-white/10 text-amber-400'
              }`}
            >
              <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => {
                const base =
                  'text-xs font-label-caps font-bold uppercase tracking-wider transition-all duration-300 pb-1 border-b-2';
                if (isScrolled) {
                  return `${base} ${
                    isActive
                      ? 'border-[#0b1c30] text-[#0b1c30]'
                      : 'border-transparent text-slate-700 hover:text-[#0b1c30] hover:border-slate-400'
                  }`;
                }
                return `${base} ${
                  isActive
                    ? 'border-white text-white'
                    : 'border-transparent text-white/80 hover:text-white hover:border-white/50'
                }`;
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Suite (Pill Button with Calendar & Mail icons) */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/contact"
            className={`hidden sm:inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full font-label-caps text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-md ${
              isScrolled
                ? 'bg-[#0b1c30] text-white hover:bg-[#112240]'
                : 'bg-white text-[#0b1c30] hover:bg-amber-400 hover:text-[#0b1c30]'
            }`}
          >
            <span>CONSULTATION</span>
            <Calendar
              className={`w-3.5 h-3.5 transition-colors duration-300 ${
                isScrolled ? 'text-slate-300' : 'text-slate-800'
              }`}
            />
            <span
              className={`w-px h-3.5 transition-colors duration-300 ${
                isScrolled ? 'bg-white/30' : 'bg-slate-300'
              }`}
            />
            <Mail
              className={`w-3.5 h-3.5 transition-colors duration-300 ${
                isScrolled ? 'text-slate-300' : 'text-slate-800'
              }`}
            />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`xl:hidden p-2 rounded-full transition-colors duration-300 ${
              isScrolled
                ? 'text-slate-900 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Works globally across all pages) */}
      {isOpen && (
        <div
          className={`pointer-events-auto w-full max-w-[1240px] mt-2 p-4 sm:p-5 rounded-2xl shadow-2xl border flex flex-col gap-1.5 sm:gap-2 max-h-[calc(100vh-5.5rem)] overflow-y-auto transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
            isScrolled
              ? 'bg-white text-slate-900 border-slate-200/90'
              : 'bg-slate-950/95 backdrop-blur-lg text-white border-slate-800'
          }`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg text-body-md transition-colors flex items-center justify-between ${
                  isActive
                    ? isScrolled
                      ? 'bg-slate-100 text-slate-950 font-bold'
                      : 'bg-white/10 text-white font-bold'
                    : isScrolled
                    ? 'text-slate-700 hover:bg-slate-50'
                    : 'text-white/80 hover:bg-white/5'
                }`
              }
            >
              <span>{item.label}</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </NavLink>
          ))}
          <div
            className={`pt-3 border-t mt-2 flex flex-col gap-2.5 ${
              isScrolled ? 'border-slate-100' : 'border-slate-800'
            }`}
          >
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#0b1c30] text-white py-3 rounded-full font-label-caps text-xs uppercase tracking-wider font-bold hover:bg-[#112240] transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

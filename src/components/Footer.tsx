import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-surface-dark text-inverse-on-surface pt-section-stack-sm pb-12">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg pb-12 border-b border-slate-card-dark">
          {/* Col 1: Firm Overview & Registration */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-headline-md text-headline-md tracking-tight uppercase text-on-primary">
                SISMN LLC
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-outline-variant leading-relaxed">
              Premier institutional architecture, multi-disciplinary structural engineering, and master land development. Grounded in surgical structural craft and Texas development discipline.
            </p>
            <div className="pt-2 flex flex-col gap-1">
              <span className="font-spec-code text-spec-code text-amber-highlight">TBPE Firm Reg. #F-10492</span>
              <span className="font-spec-code text-spec-code text-outline-variant">TBAE Architectural Reg. #BR-4902</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-label-caps uppercase text-amber-highlight tracking-widest">
              Quick Links
            </span>
            <nav className="flex flex-col gap-2.5 font-body-sm text-body-sm text-outline-variant">
             
              <Link to="/about" className="hover:text-on-primary transition-colors">
                About the Firm
              </Link>
              <Link to="/team" className="hover:text-on-primary transition-colors">
                Leadership &amp; Engineers
              </Link>
              <Link to="/projects" className="hover:text-on-primary transition-colors">
                Featured Portfolio
              </Link>
              <Link to="/services" className="hover:text-on-primary transition-colors">
                Disciplines &amp; Services
              </Link>
              <Link to="/investment" className="hover:text-on-primary transition-colors">
                Investor Portal
              </Link>
              <Link to="/contact" className="hover:text-on-primary transition-colors">
                Consultation Request
              </Link>
              <Link to="/faq" className="hover:text-on-primary transition-colors">
                Frequently Asked Questions (FAQ)
              </Link>
            </nav>
          </div>

          {/* Col 3: Core Services */}
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-label-caps uppercase text-amber-highlight tracking-widest">
              Core Services
            </span>
            <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-outline-variant">
              <li>Commercial Architecture &amp; Plazas</li>
              <li>Luxury Residential Engineering</li>
              <li>Master Land Development &amp; Zoning</li>
              <li>Structural Diagnostics &amp; BIM</li>
              <li>Civil Site &amp; Stormwater Infrastructure</li>
              <li>General Contracting &amp; QA</li>
            </ul>
          </div>

          {/* Col 4: Dallas Office HQ */}
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-label-caps uppercase text-amber-highlight tracking-widest">
              Dallas Office HQ
            </span>
            <div className="flex flex-col gap-3 font-body-sm text-body-sm text-outline-variant">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-amber-highlight shrink-0 mt-0.5">apartment</span>
                <span>13151 Emily Rd. #100<br />Dallas, TX 75240</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-amber-highlight shrink-0">call</span>
                <a href="tel:2144539999" className="hover:text-on-primary transition-colors">(214) 453-9999</a>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-amber-highlight shrink-0">mail</span>
                <a href="mailto:info@sismnllc.com" className="hover:text-on-primary transition-colors">info@sismnllc.com</a>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-amber-highlight shrink-0">access_time</span>
                <span>Mon - Fri 09:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Disclosures */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-outline">
          <p>© 2026 SISMN LLC. All rights reserved. Architectural &amp; Engineering Services.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-label-caps text-[11px] uppercase tracking-wider text-outline">
            <Link to="/privacy-policy" className="hover:text-amber-highlight transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-amber-highlight transition-colors">Terms of Service</Link>
            <Link to="/license-disclosures" className="hover:text-amber-highlight transition-colors">License Disclosures</Link>
            <button
              onClick={scrollToTop}
              className="text-amber-highlight hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};


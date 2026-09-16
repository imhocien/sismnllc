import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { InvestmentPage } from './pages/InvestmentPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { LicenseDisclosuresPage } from './pages/LicenseDisclosuresPage';
import { FAQPage } from './pages/FAQPage';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    (window as any).__lenis = lenis;

    return () => {
      gsap.ticker.remove(updateRaf);
      (window as any).__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-surface font-body-md text-on-surface selection:bg-amber-highlight selection:text-slate-surface-dark flex flex-col justify-between relative overflow-x-hidden">
        {/* Cinematic Fixed Navigation */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="w-full bg-surface min-h-screen flex-grow relative z-10 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Legal & Statutory Disclosures */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/license-disclosures" element={<LicenseDisclosuresPage />} />
            <Route path="/licenses" element={<LicenseDisclosuresPage />} />
            {/* Knowledge Base & FAQs */}
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/faqs" element={<FAQPage />} />
            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Global Architectural Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ServicesSection } from '../components/ServicesSection';
import { WorkflowsSection } from '../components/WorkflowsSection';
import { SEOHead } from '../components/SEOHead';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SEOHead
        title="Engineering, Architecture & Construction Services"
        description="Comprehensive architectural design, stamped structural engineering, civil stormwater infrastructure, real estate acquisition consulting, and construction management."
        keywords="architecture services Dallas, structural engineering services, civil site development, MEP engineering Texas, zoning consulting, construction management"
        breadcrumbs={[{ name: 'Services', item: '/services' }]}
      />
      {/* Header */}
      <PageHeader
        title="Our Services &amp; Methodologies"
        subtitle="From initial zoning and land acquisition to civil engineering, architectural design, and turnkey general contracting across Texas."
        breadcrumbs={[{ label: 'Services' }]}
        bgImage="/images/heroes/hero-slide-3.jpg"
      />

      {/* Disciplines Section */}
      <ServicesSection />

      {/* Design & Construction Sequence Methodologies */}
      <WorkflowsSection />

      {/* RFP / Proposal CTA */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface border-t border-steel-border text-on-surface">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-8 bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm text-on-surface">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-amber-highlight text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[18px]">description</span>
              <span className="font-label-caps text-label-caps">Request a Technical Proposal (RFP)</span>
            </div>
            <h3 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg uppercase text-on-surface mb-3 break-words">
              Need Engineering or Architectural Plans Sealed?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Our licensed Professional Engineers (Civil, Structural, MEP) and master architects can provide sealed
              construction drawings and facilitate municipal permit approval.
            </p>
          </div>
          <Link
            to="/contact"
            className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 bg-amber-highlight hover:bg-secondary-container text-slate-surface-dark font-label-caps text-label-caps uppercase tracking-wider font-bold px-7 py-4 rounded-full shadow-md transition-all shrink-0"
          >
            <span>Submit Your RFP</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};


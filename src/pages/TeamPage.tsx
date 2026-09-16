import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { TeamSection } from '../components/TeamSection';
import { SEOHead } from '../components/SEOHead';
import { Link } from 'react-router-dom';

export const TeamPage: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SEOHead
        title="Leadership & Engineering Professionals"
        description="Meet the multidisciplinary leadership team, licensed Professional Engineers (PE), AIA Architects, and project directors at SISMN LLC."
        keywords="SISMN LLC leadership, Imran Pirzada, licensed engineers Texas, master architects Dallas, professional engineer team"
        breadcrumbs={[{ name: 'Our Team', item: '/team' }]}
      />
      {/* Header */}
      <PageHeader
        title="Our Team of Professionals"
        subtitle="A multidisciplinary talent pool of licensed Professional Engineers (PE), certified Master Architects, veteran project directors, and seasoned real estate consultants."
        breadcrumbs={[{ label: 'Our Team' }]}
        bgImage="/images/heroes/hero-slide-3.jpg"
      />

      {/* Main Team Directory */}
      <TeamSection />

      {/* Partner with SISMN CTA */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface border-t border-steel-border text-on-surface">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-8 bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm text-on-surface">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-amber-highlight text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[18px]">handshake</span>
              <span className="font-label-caps text-label-caps">Join Our Network</span>
            </div>
            <h3 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg uppercase text-on-surface mb-3 break-words">
              Are You a Licensed Engineer, Architect or Subcontractor?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We are continually expanding our network of qualified trade partners, surveyors, civil draftsmen, and
              project superintendents across Texas.
            </p>
          </div>
          <Link
            to="/contact"
            className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 bg-[#0b1c30] hover:bg-[#112240] text-on-primary font-label-caps text-label-caps uppercase tracking-wider font-bold px-8 py-4 rounded-full shadow-lg shadow-[#0b1c30]/20 transition-all shrink-0"
          >
            <span>Connect With Management</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};


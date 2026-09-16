import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { StatsCounter } from '../components/StatsCounter';
import { AboutSection } from '../components/AboutSection';
import { SEOHead } from '../components/SEOHead';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SEOHead
        title="About the Firm & 25+ Year Legacy"
        description="Learn about SISMN LLC, our 25+ years of multidisciplinary leadership under Founder Imran Pirzada, licensed Texas engineering accreditations, and proven development track record."
        keywords="About SISMN LLC, Imran Pirzada, Texas architecture history, licensed structural engineer Dallas, TBPELS firm, TBAE architecture registration"
        breadcrumbs={[{ name: 'About Us', item: '/about' }]}
      />
      {/* Page Header */}
      <PageHeader
        title="About SISMN LLC"
        subtitle="For over 25 years, providing premier real estate acquisition consulting, project management, architecture, and engineering services across Texas and nationwide."
        breadcrumbs={[{ label: 'About Us' }]}
        bgImage="/images/heroes/hero-slide-2.jpg"
      />

      {/* Main About Story, Mission, Vision, Pillars */}
      <AboutSection />

      {/* Stats Breakdown */}
      <StatsCounter />

      {/* Meet Team & Contact CTA */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface border-t border-steel-border">
        <div className="max-w-[1360px] mx-auto grid md:grid-cols-2 gap-gutter-md">
          <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center mb-6 shadow-md">
                <span className="material-symbols-outlined text-[24px]">groups</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3 uppercase">
                Our Multidisciplinary Team
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                Meet our licensed Professional Engineers (PE), certified Master Architects, project managers, and real
                estate consultants who bring your projects from concept to completion.
              </p>
            </div>
            <div>
              <Link
                to="/team"
                className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 bg-[#0b1c30] hover:bg-[#112240] text-on-primary font-label-caps text-label-caps uppercase tracking-wider font-bold px-7 py-3.5 rounded-full transition-all shadow-md"
              >
                <span>View Full Team Directory</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center mb-6 shadow-md">
                <span className="material-symbols-outlined text-[24px]">call</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3 uppercase">
                Have Questions or Need a Consultation?
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                Our Dallas corporate headquarters is available for site feasibility analysis, engineering proposals, and
                real estate development inquiries.
              </p>
            </div>
            <div>
              <Link
                to="/contact"
                className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 bg-amber-highlight hover:bg-secondary-container text-slate-surface-dark font-label-caps text-label-caps uppercase tracking-wider font-bold px-7 py-3.5 rounded-full transition-all shadow-md"
              >
                <span>Schedule Consultation</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


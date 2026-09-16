import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { InvestmentSection } from '../components/InvestmentSection';
import { SEOHead } from '../components/SEOHead';
import { Link } from 'react-router-dom';

export const InvestmentPage: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SEOHead
        title="Real Estate Investment & Capital Syndication"
        description="High-yield real estate investment opportunities in Texas master-planned communities, retail developments, and land entitlement syndications with SISMN LLC."
        keywords="Texas real estate investment, commercial syndication Dallas, land entitlement investment, high yield real estate Texas, accredited investor real estate"
        breadcrumbs={[{ name: 'Investment', item: '/investment' }]}
      />
      {/* Header */}
      <PageHeader
        title="Real Estate Investment Opportunities"
        subtitle="Safe, high-yield investment opportunities in high-growth Texas residential subdivisions, commercial centers, and land entitlement syndications."
        breadcrumbs={[{ label: 'Investment' }]}
        bgImage="/images/heroes/hero-slide-4.jpg"
      />

      {/* Main Investment Calculator & Principles */}
      <InvestmentSection />

      {/* Investor FAQs & Protections */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface border-t border-steel-border">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-card-dark px-3.5 py-1 rounded text-amber-highlight font-label-caps text-label-caps uppercase tracking-wider mb-4">
              Institutional Framework
            </div>
            <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface mb-4">
              How SISMN LLC Protects &amp; Grows Investor Capital
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We eliminate speculative risks by controlling every aspect of the development life cycle from raw land
              acquisition to civil platting and vertical construction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-gutter-md">
            <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-8 hover:shadow-xl transition-all shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[24px]">lock</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface">
                1. Asset-Backed Collateral
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                All investment vehicles are directly backed by verified physical real estate deeds, recorded liens, and
                tangible improvements in the booming Dallas-Fort Worth metroplex.
              </p>
            </div>

            <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-8 hover:shadow-xl transition-all shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[24px]">trending_up</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface">
                2. Entitlement Value Creation
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                By purchasing raw acreage and handling municipal rezoning, tree surveys, environmental SWPPP, and
                platting in-house, we capture substantial equity before construction even begins.
              </p>
            </div>

            <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-8 hover:shadow-xl transition-all shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface">
                3. Direct Builder Margins
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                With our own licensed PEs, master architects, and construction management teams, we eliminate developer
                markups, reducing project costs by up to 20-30%.
              </p>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0b1c30] hover:bg-[#112240] text-on-primary font-label-caps text-label-caps uppercase tracking-wider font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-[#0b1c30]/20"
            >
              <span>Schedule a Confidential Investor Call</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const InvestmentSection: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [durationYears, setDurationYears] = useState<number>(3);
  const [projectedRate, setProjectedRate] = useState<number>(14);

  // Simple interest projection calculation for visualization
  const estimatedReturn = investmentAmount * (1 + (projectedRate / 100) * durationYears);
  const estimatedProfit = estimatedReturn - investmentAmount;

  return (
    <section id="investment" className="py-20 lg:py-28 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-0.5 bg-amber-highlight" />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                Investor Opportunities
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface">
              Safe, High-Yield Real Estate Investment
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              SISMN LLC provides private and institutional investors with secure, asset-backed opportunities in Texas
              residential developments, commercial centers, and land entitlement syndications.
            </p>
          </div>
          <div className="bg-surface-container px-4 py-2.5 rounded font-spec-code text-spec-code text-on-surface font-semibold border border-steel-border">
            ACCREDITED &amp; INSTITUTIONAL
          </div>
        </div>

        {/* 2-Column: Pillars & Interactive Estimator */}
        <div className="grid lg:grid-cols-12 gap-gutter-lg items-center">
          {/* Left Column: Why Invest With SISMN LLC */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 className="font-headline-lg text-2xl sm:text-3xl uppercase text-on-surface leading-tight">
              Institutional-Grade Due Diligence with High Equity Growth
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              With 25+ years of market presence in Dallas-Fort Worth and Texas, we identify off-market land acquisitions,
              navigate municipal zoning approvals to create massive immediate equity, and manage engineering and
              construction internally to eliminate middleman margins.
            </p>

            <div className="flex flex-col gap-3.5 mt-2">
              {[
                {
                  title: 'Direct Tangible Real Estate Backing',
                  desc: 'Capital is secured against prime Texas real estate deeds and physical building assets.',
                },
                {
                  title: 'Entitlement & Platting Value Creation',
                  desc: 'We generate significant upside through civil engineering approvals and municipal rezoning.',
                },
                {
                  title: 'Integrated Construction Control',
                  desc: 'In-house PE engineers and architects reduce construction delays, cost overruns, and overhead.',
                },
                {
                  title: 'Transparent Reporting & Milestone Tracking',
                  desc: 'Regular audited reporting on construction progress, leasing, and project disbursements.',
                },
              ].map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 bg-surface-container-lowest border border-steel-border rounded p-4.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-amber-highlight text-[22px] shrink-0 mt-0.5">
                    verified_user
                  </span>
                  <div>
                    <h4 className="font-headline-sm text-sm font-bold text-on-surface uppercase mb-0.5">
                      {point.title}
                    </h4>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Real Estate Yield Estimator */}
          <div className="lg:col-span-6 bg-surface-container-lowest border border-steel-border rounded-xl p-6 sm:p-8 shadow-md">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-steel-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-surface-dark text-amber-highlight flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">calculate</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-base uppercase text-on-surface">Yield Estimator</h4>
                  <p className="font-body-sm text-xs text-outline">Illustrative Development Return Scenario</p>
                </div>
              </div>
              <span className="font-spec-code text-[11px] text-amber-highlight bg-slate-card-dark px-2.5 py-1 rounded font-bold uppercase">
                Texas DFW Market
              </span>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              {/* Amount Slider */}
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                  <span className="text-on-surface">Capital Commitment:</span>
                  <span className="font-spec-code text-amber-highlight font-bold">
                    ${investmentAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="1000000"
                  step="25000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-amber-highlight"
                />
                <div className="flex justify-between font-spec-code text-[10px] text-outline mt-1">
                  <span>$25,000</span>
                  <span>$500,000</span>
                  <span>$1,000,000+</span>
                </div>
              </div>

              {/* Duration Slider */}
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                  <span className="text-on-surface">Project Horizon:</span>
                  <span className="font-spec-code text-amber-highlight font-bold">{durationYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={durationYears}
                  onChange={(e) => setDurationYears(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-amber-highlight"
                />
                <div className="flex justify-between font-spec-code text-[10px] text-outline mt-1">
                  <span>1 Year (Short)</span>
                  <span>3 Years (Standard)</span>
                  <span>5 Years (Master Planned)</span>
                </div>
              </div>

              {/* Rate Slider */}
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                  <span className="text-on-surface">Target Projected Annual Yield (IRR):</span>
                  <span className="font-spec-code text-amber-highlight font-bold">{projectedRate}% / yr</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="20"
                  step="1"
                  value={projectedRate}
                  onChange={(e) => setProjectedRate(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-amber-highlight"
                />
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="mt-8 bg-surface-container-low border border-steel-border rounded p-6 text-center shadow-inner">
              <div className="font-label-caps text-xs uppercase tracking-wider text-outline mb-1 font-semibold">
                Estimated Total Value at Exit
              </div>
              <div className="font-metric-stat text-3xl sm:text-4xl text-on-surface mb-1 font-bold">
                ${Math.round(estimatedReturn).toLocaleString()}
              </div>
              <div className="font-spec-code text-xs text-amber-highlight font-bold uppercase">
                +${Math.round(estimatedProfit).toLocaleString()} Projected Net Growth
              </div>
            </div>

            {/* Direct CTA */}
            <div className="mt-6">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 bg-slate-surface-dark hover:bg-secondary text-on-primary font-label-caps text-label-caps uppercase tracking-wider font-bold py-4 rounded-full shadow-md transition-all"
              >
                <span>Request Investor Prospectus</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <p className="font-body-sm text-[11px] text-center text-outline mt-3">
                *Projections are illustrative based on historical Texas development metrics. Contact our team for formal
                offering memorandums.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


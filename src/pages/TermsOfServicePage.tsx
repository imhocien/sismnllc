import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { Link } from 'react-router-dom';

export const TermsOfServicePage: React.FC = () => {
  const lastUpdated = 'September 2026';

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      icon: 'gavel',
      content: [
        'By accessing, browsing, or utilizing the web platform of SISMN LLC ("Company", "we", "us", or "our"), including requesting technical proposals, scheduling consultations, or reviewing portfolio assets, you agree to be legally bound by these Terms of Service.',
        'If you do not agree with any portion of these terms, you must discontinue the use of this website immediately.',
      ],
    },
    {
      id: 'scope-of-website-content',
      title: '2. Informational Scope & Sealed Deliverables',
      icon: 'architecture',
      content: [
        'All renderings, schematic floor plans, aerial project visualizations, and project descriptions published on this website are provided for illustrative and informational purposes only.',
        'No Stamped Engineering Advice: Content on this site does not constitute formal stamped engineering calculations, sealed architectural construction drawings, or municipal permitting submittals. Official engineering and architectural opinions are rendered exclusively through signed, written professional service contracts bearing the official seal of a Texas licensed Professional Engineer (PE) or Registered Architect (AIA).',
        'Preliminary Feasibility: Any preliminary cost metrics, investment projections, or square footage estimates displayed on this platform or generated via interactive calculators represent illustrative benchmarks and require formal site-specific due diligence.',
      ],
    },
    {
      id: 'intellectual-property',
      title: '3. Intellectual Property Rights',
      icon: 'copyright',
      content: [
        'All architectural drawings, CAD files, structural schematics, photographic portfolio assets, branding marks, and technical copywriting featured on this website are the proprietary intellectual property of SISMN LLC, protected under United States and international copyright laws.',
        'Users may not reproduce, distribute, modify, republish, reverse engineer, or extract technical drawings or project imagery for commercial use without prior written consent from SISMN LLC.',
      ],
    },
    {
      id: 'client-inquiries-proposals',
      title: '4. Inquiries, RFPs & Confidentiality',
      icon: 'handshake',
      content: [
        'Submitting a technical consultation request or RFP through our online portal does not establish an attorney-client, fiduciary, or binding contractor-client relationship until a formal Professional Services Agreement (PSA) is countersigned by an authorized officer of SISMN LLC.',
        'Proprietary Project Data: Project parameters, parcel IDs, and technical specifications submitted through our portal are treated with the highest degree of corporate confidentiality in accordance with our Privacy Policy.',
      ],
    },
    {
      id: 'regulatory-compliance',
      title: '5. Regulatory Accreditations & Statutory Compliance',
      icon: 'verified',
      content: [
        'SISMN LLC operates in full compliance with the Texas Engineering Practice Act (Texas Occupations Code Chapter 1001) under Texas Board of Professional Engineers and Land Surveyors (TBPELS) Firm Registration #F-10492.',
        'Architectural services are conducted in compliance with the Texas Architects’ Registration Law (Texas Occupations Code Chapter 1051) under Texas Board of Architectural Examiners (TBAE) Registration #BR-4902.',
      ],
    },
    {
      id: 'limitation-of-liability',
      title: '6. Limitation of Liability',
      icon: 'shield',
      content: [
        'To the fullest extent permitted by Texas law, SISMN LLC, its officers, partners, licensed engineers, architects, and affiliates shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the informational materials on this website.',
        'Liability associated with actual construction, engineering, or project management services is strictly governed by the specific limitation of liability clauses outlined in executed client contracts.',
      ],
    },
    {
      id: 'governing-law',
      title: '7. Governing Law & Jurisdiction',
      icon: 'account_balance',
      content: [
        'These Terms of Service shall be governed by and construed in accordance with the substantive laws of the State of Texas, without giving effect to any principles of conflicts of law.',
        'Any legal action, suit, or proceeding arising out of or relating to these terms or your use of this website shall be instituted exclusively in the federal or state courts located in Dallas County, Texas.',
      ],
    },
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SEOHead
        title="Terms of Service & Agreement"
        description="Official Terms of Service for SISMN LLC. Standards governing architectural intellectual property, preliminary advice vs. sealed engineering deliverables, and Texas jurisdiction."
        keywords="SISMN LLC terms of service, architectural terms Texas, engineering agreement standards, PE disclaimer"
        breadcrumbs={[{ name: 'Terms of Service', item: '/terms-of-service' }]}
      />
      {/* Header */}
      <PageHeader
        title="Terms of Service"
        subtitle="The operational terms, regulatory boundaries, and professional standards governing the use of the SISMN LLC platform and technical services."
        breadcrumbs={[{ label: 'Terms of Service' }]}
        bgImage="/images/heroes/hero-slide-3.jpg"
        badge="SISMN LLC LEGAL DISCLOSURE"
      />

      {/* Main Content Area */}
      <section className="py-16 sm:py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
          {/* Metadata Card */}
          <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface">
                  Professional Services Agreement Terms
                </h2>
                <span className="font-spec-code text-xs text-outline">
                  Effective Date &amp; Last Updated: {lastUpdated}
                </span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-surface-container px-3.5 py-1.5 rounded-full font-spec-code text-[11px] text-on-surface-variant font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Dallas County, TX Jurisdiction</span>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="flex flex-col gap-8">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-8 sm:p-10 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 border-b border-steel-border/50 pb-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container text-amber-highlight flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{section.icon}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight">
                    {section.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legal Office Card */}
          <div className="bg-[#0b1c30] text-on-primary rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-amber-highlight">
                Corporate &amp; Legal Affairs
              </span>
              <h3 className="font-headline-md text-headline-md uppercase text-white">
                Contractual or Retainer Inquiries?
              </h3>
              <p className="font-body-sm text-body-sm text-slate-300 leading-relaxed">
                To request formal master services agreements (MSA), joint venture protocols, or certified insurance
                certificates (COI), contact our corporate counsel.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-amber-highlight hover:bg-secondary-container text-slate-surface-dark font-label-caps text-label-caps uppercase tracking-wider font-bold px-7 py-3.5 rounded-full transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Consult Corporate Office</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

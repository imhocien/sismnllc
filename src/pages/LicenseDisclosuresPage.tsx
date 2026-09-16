import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { Link } from 'react-router-dom';

export const LicenseDisclosuresPage: React.FC = () => {
  const regulatoryBodies = [
    {
      name: 'Texas Board of Professional Engineers and Land Surveyors (TBPELS)',
      regNumber: 'Firm Reg. #F-10492',
      authority: 'State of Texas Statutory Engineering Authority',
      disciplines: ['Civil Site Engineering', 'Structural Analysis & Design', 'Mechanical, Electrical & Plumbing (MEP)', 'Foundation Engineering'],
      icon: 'engineering',
    },
    {
      name: 'Texas Board of Architectural Examiners (TBAE)',
      regNumber: 'Architectural Firm Reg. #BR-4902',
      authority: 'State of Texas Architectural Licensing Authority',
      disciplines: ['Commercial Architecture', 'Master-Planned Communities', 'Space Planning & Life Safety', 'Texas Accessibility Standards (TAS)'],
      icon: 'apartment',
    },
  ];

  const standards = [
    {
      title: 'Sealed Engineering Calculations & Plans',
      icon: 'verified',
      description:
        'All structural calculation packages, drainage and stormwater detention plans, and foundation layouts delivered for construction are reviewed, approved, and officially stamped with the seal and signature of a licensed Texas Professional Engineer (PE).',
    },
    {
      title: 'Architectural Seal & Plan Review',
      icon: 'draw',
      description:
        'Commercial and residential construction documents comply with the Texas Architects’ Registration Law (Texas Occupations Code Chapter 1051) and receive certified architectural seals for municipal permitting submittals across all 254 Texas counties.',
    },
    {
      title: 'Code Compliance & Permitting Jurisdictions',
      icon: 'rule',
      description:
        'Our designs are engineered in rigorous accordance with current International Building Codes (IBC), International Residential Codes (IRC), National Electrical Code (NEC), ASHRAE 90.1 energy standards, and specific municipal ordinances across the Dallas-Fort Worth metroplex and nationwide.',
    },
    {
      title: 'Professional Liability & Insurance Coverage',
      icon: 'security',
      description:
        'SISMN LLC maintains comprehensive commercial liability insurance, commercial auto liability, and statutory workers’ compensation coverage alongside robust Professional Liability (Errors & Omissions) protection. Certificates of Insurance (COI) listing clients as additional insured are provided upon contract execution.',
    },
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SEOHead
        title="Official License Disclosures & Board Registrations"
        description="Verify the professional credentials of SISMN LLC: Texas Board of Professional Engineers (TBPELS #F-10492) and Texas Board of Architectural Examiners (TBAE #BR-4902)."
        keywords="TBPELS F-10492, TBAE BR-4902, Texas board certified engineer, architectural registration Texas, sealed drawings verification"
        breadcrumbs={[{ name: 'License Disclosures', item: '/license-disclosures' }]}
      />
      {/* Header */}
      <PageHeader
        title="License Disclosures & Board Registrations"
        subtitle="Official regulatory credentials, board certifications, and statutory engineering accreditations governing SISMN LLC in the State of Texas."
        breadcrumbs={[{ label: 'License Disclosures' }]}
        bgImage="/images/heroes/hero-slide-4.jpg"
        badge="OFFICIAL TEXAS REGULATORY DISCLOSURES"
      />

      {/* Main Content */}
      <section className="py-16 sm:py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
          {/* Statutory Registration Badges Banner */}
          <div className="grid md:grid-cols-2 gap-6">
            {regulatoryBodies.map((body, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-highlight/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[26px]">{body.icon}</span>
                    </div>
                    <span className="bg-amber-highlight/10 text-amber-highlight border border-amber-highlight/30 px-3 py-1 rounded-full font-spec-code text-xs font-bold uppercase">
                      ACTIVE &amp; VERIFIED
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mt-2">
                    {body.name}
                  </h3>
                  <div className="font-spec-code text-sm font-bold text-amber-highlight">
                    {body.regNumber}
                  </div>
                  <p className="font-body-sm text-xs text-outline">
                    {body.authority}
                  </p>
                </div>

                <div className="pt-4 border-t border-steel-border/60">
                  <span className="font-label-caps text-[11px] uppercase tracking-wider text-on-surface-variant block mb-2 font-semibold">
                    Certified Practice Disciplines
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {body.disciplines.map((d, dIdx) => (
                      <span
                        key={dIdx}
                        className="bg-surface-container px-2.5 py-1 rounded-full font-spec-code text-[11px] text-on-surface font-medium"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Standards & Practices Section */}
          <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm flex flex-col gap-8">
            <div className="flex flex-col gap-2 border-b border-steel-border/60 pb-6">
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-amber-highlight">
                Compliance Standards
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg uppercase text-on-surface break-words">
                Engineering &amp; Architectural Practice Protocols
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                As a Texas-registered multidisciplinary firm, SISMN LLC adheres strictly to the statutory codes of
                ethics, continuing education requirements, and public welfare obligations set forth by the State of
                Texas.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {standards.map((std, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-surface-container-low border border-steel-border/70 rounded-xl p-6 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2.5 text-on-surface">
                    <span className="material-symbols-outlined text-amber-highlight text-[22px]">
                      {std.icon}
                    </span>
                    <h4 className="font-headline-sm text-sm uppercase font-bold text-on-surface">
                      {std.title}
                    </h4>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {std.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Official Verification CTA */}
          <div className="bg-[#0b1c30] text-on-primary rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-amber-highlight">
                Credential Verification
              </span>
              <h3 className="font-headline-md text-headline-md uppercase text-white">
                Request Sealed Verification Package
              </h3>
              <p className="font-body-sm text-body-sm text-slate-300 leading-relaxed">
                Need official state license certificates, Certificate of Insurance (COI), or letters of good standing
                for municipal bidding or institutional lending? Contact our operations office.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-amber-highlight hover:bg-secondary-container text-slate-surface-dark font-label-caps text-label-caps uppercase tracking-wider font-bold px-7 py-3.5 rounded-full transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Request Credentials</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

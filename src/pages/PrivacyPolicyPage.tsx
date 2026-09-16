import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = 'September 2026';

  const sections = [
    {
      id: 'information-collection',
      title: '1. Information We Collect',
      icon: 'database',
      content: [
        'SISMN LLC ("Company", "we", "us", or "our") collects information necessary to deliver professional architectural, civil and structural engineering, real estate acquisition, and construction management services.',
        'Personal Data: When you submit technical inquiries, request RFPs, or schedule consultations, we collect your full name, corporate email address, direct telephone number, company or organizational name, project site address or legal parcel ID, and technical scope specifications.',
        'Technical Files & Blueprints: Information uploaded or transmitted to us including CAD drawings (.dwg, .dxf), BIM models (.rvt, .ifc), geotechnical reports, topographic surveys, and zoning documentation is stored securely in project-specific repositories.',
        'Automated Logs: Our web servers automatically log IP addresses, browser agents, operating systems, and page interaction timestamps to preserve infrastructure security and mitigate denial-of-service or automated crawler activity.',
      ],
    },
    {
      id: 'how-we-use-information',
      title: '2. How We Use Your Information',
      icon: 'engineering',
      content: [
        'To prepare and issue formal engineering proposals, architectural feasibility assessments, and professional services agreements.',
        'To prepare, seal, and submit regulatory documentation to municipal authorities, city planning commissions, county clerk offices, and the Texas Board of Professional Engineers and Land Surveyors (TBPELS) / Texas Board of Architectural Examiners (TBAE) as authorized by our client contracts.',
        'To communicate critical project milestone updates, request for information (RFI) responses, and structural inspection reports.',
        'To maintain our internal quality assurance, client confidentiality compliance, and professional liability audit trails.',
      ],
    },
    {
      id: 'data-sharing-disclosure',
      title: '3. Data Sharing & Third-Party Disclosures',
      icon: 'shield_locked',
      content: [
        'Zero Third-Party Marketing Sales: SISMN LLC does not sell, rent, monetize, or lease your personal information, contact records, or project data to third-party advertisers or data brokers under any circumstance.',
        'Authorized Project Collaborators: With your authorization, project data may be shared with licensed MEP engineering partners, geotechnical testing laboratories, land surveyors, general contractors, or structural fabricators strictly for project execution.',
        'Regulatory & Legal Requirements: We disclose information when required by Texas state law, municipal court order, or regulatory bodies governing licensed engineering and architectural practice in Texas.',
      ],
    },
    {
      id: 'data-protection-security',
      title: '4. Information Security & Storage',
      icon: 'lock',
      content: [
        'All online inquiry dispatches are secured using industry-standard TLS 1.3 encryption in transit.',
        'Our online inquiry channels utilize automated anti-spam filtering, time-gated verification, and client rate-limiting to prevent unauthorized server flooding.',
        'CAD, BIM, and client financial feasibility models are preserved in restricted-access encrypted environments with multi-factor authentication (MFA) protocols.',
      ],
    },
    {
      id: 'client-rights',
      title: '5. Client Rights & Records Retention',
      icon: 'verified_user',
      content: [
        'Under Texas professional practice standards, sealed engineering calculations, stamped construction drawings, and regulatory permit submissions must be retained for professional liability and statutory limitation periods.',
        'You maintain the right to inspect, update, or request the deletion of non-statutory personal contact information by contacting our privacy compliance department in writing.',
      ],
    },
    {
      id: 'cookies-tracking',
      title: '6. Cookies & Client Preferences',
      icon: 'cookie',
      content: [
        'We utilize essential, privacy-preserving session cookies and local storage tokens strictly to maintain smooth interface navigation and protect against automated form submission bots.',
        'We do not engage in cross-site behavioral tracking or intrusive invasive analytics.',
      ],
    },
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SEOHead
        title="Privacy Policy & Data Protection"
        description="Review the official privacy policy of SISMN LLC. Standards for safeguarding technical CAD files, blueprints, client confidentiality, and project data."
        keywords="SISMN LLC privacy policy, architectural confidentiality, engineering data protection, client NDA Texas"
        breadcrumbs={[{ name: 'Privacy Policy', item: '/privacy-policy' }]}
      />
      {/* Header */}
      <PageHeader
        title="Privacy Policy"
        subtitle="Our operational standards for safeguarding client project data, architectural files, technical specifications, and personal information."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
        bgImage="/images/heroes/hero-slide-1.jpg"
        badge="SISMN LLC LEGAL DISCLOSURE"
      />

      {/* Main Content Area */}
      <section className="py-16 sm:py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
          {/* Metadata Card */}
          <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[24px]">policy</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface">
                  SISMN LLC Privacy Commitment
                </h2>
                <span className="font-spec-code text-xs text-outline">
                  Effective Date &amp; Last Updated: {lastUpdated}
                </span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-surface-container px-3.5 py-1.5 rounded-full font-spec-code text-[11px] text-on-surface-variant font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>TBPE #F-10492 / TBAE #BR-4902</span>
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

          {/* Contact Officer Card */}
          <div className="bg-[#0b1c30] text-on-primary rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-amber-highlight">
                Privacy &amp; Compliance Office
              </span>
              <h3 className="font-headline-md text-headline-md uppercase text-white">
                Questions Regarding Your Data?
              </h3>
              <p className="font-body-sm text-body-sm text-slate-300 leading-relaxed">
                For questions regarding this policy, non-disclosure agreements (NDAs), or project data handling, contact
                our corporate office in Dallas, Texas.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-amber-highlight hover:bg-secondary-container text-slate-surface-dark font-label-caps text-label-caps uppercase tracking-wider font-bold px-7 py-3.5 rounded-full transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Contact Compliance</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

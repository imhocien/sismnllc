import React, { useState, useMemo, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: string;
  category: 'licensing' | 'engineering' | 'process' | 'investment';
  categoryLabel: string;
  question: string;
  directAnswer: string;
  context: string;
}

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'licensing-stamped-plans': true,
    'combined-ae-services': true,
  });

  const faqs: FAQItem[] = [
    {
      id: 'licensing-stamped-plans',
      category: 'licensing',
      categoryLabel: 'Licensing & Compliance',
      question: "Are SISMN LLC's engineering drawings stamped and licensed for municipal building permits in Texas?",
      directAnswer: 'Yes, all structural calculations, civil engineering designs, and architectural drawings are officially sealed and signed by licensed Texas Professional Engineers and Registered Architects.',
      context: 'SISMN LLC is registered with the Texas Board of Professional Engineers and Land Surveyors (TBPELS Firm Reg. #F-10492) and the Texas Board of Architectural Examiners (TBAE Reg. #BR-4902). Our sealed plan packages satisfy municipal permit requirements across all 254 Texas counties and municipalities.',
    },
    {
      id: 'combined-ae-services',
      category: 'engineering',
      categoryLabel: 'Architecture & Engineering',
      question: 'Does SISMN LLC handle both architectural design and structural engineering under one unified seal?',
      directAnswer: 'Yes, SISMN LLC provides fully integrated architectural and multi-disciplinary engineering services under one roof.',
      context: 'By consolidating master planning, architectural floor plans, BIM Level-3 modeling, structural calculations, civil site grading, and MEP engineering under single-source leadership, we eliminate costly change orders and communication gaps between separate designers and outside engineers.',
    },
    {
      id: 'municipal-permits-zoning',
      category: 'process',
      categoryLabel: 'Process & Permitting',
      question: 'Can SISMN LLC represent developers in municipal zoning hearings, replatting, and city approvals?',
      directAnswer: 'Yes, our team actively represents landowners and developers before planning commissions, city councils, and municipal boards to secure entitlements and recorded subdivision plats.',
      context: 'We manage the entire municipal development approval pipeline—from initial zoning verification, variance applications, and TXDOT access permitting to stormwater detention design and environmental compliance across the Dallas-Fort Worth metroplex and surrounding cities.',
    },
    {
      id: 'project-types-handled',
      category: 'engineering',
      categoryLabel: 'Architecture & Engineering',
      question: 'What types of development projects does SISMN LLC engineer and design?',
      directAnswer: 'SISMN LLC designs and manages master-planned residential communities, commercial retail plazas, healthcare medical facilities, and multi-family townhomes.',
      context: 'Flagship examples include The Vineyards (120+ acre master-planned community in Cedar Hill, TX), Savana Avenue (mixed-use commercial center with 30 residential condominiums in Carrollton, TX), and Clarksville General Hospital (acute healthcare facility with specialized surgical suites).',
    },
    {
      id: 'rfp-proposal-timeline',
      category: 'process',
      categoryLabel: 'Process & Permitting',
      question: 'How do I submit an RFP or request a formal engineering proposal from SISMN LLC?',
      directAnswer: 'You can submit technical project parameters through our online RFP portal, email info@sismnllc.com, or call our Dallas office directly at (214) 453-9999.',
      context: 'Please provide the project address or legal parcel ID, estimated square footage, current zoning classification, and target milestone dates. Our engineering team will review site feasibility and issue a formal scope of work proposal within 3 to 5 business days.',
    },
    {
      id: 'preliminary-feasibility-timeline',
      category: 'process',
      categoryLabel: 'Process & Permitting',
      question: 'How long does a preliminary land feasibility and zoning assessment take?',
      directAnswer: 'Preliminary site reviews and initial technical feasibility assessments typically take 3 to 5 business days upon receiving parcel data.',
      context: 'For full comprehensive due diligence—including geotechnical soil boring reviews, topographic boundary surveys, utility capacity calculations, and municipal pre-application meetings—the timeline is generally 2 to 3 weeks depending on the municipal jurisdiction.',
    },
    {
      id: 'construction-owner-representation',
      category: 'engineering',
      categoryLabel: 'Architecture & Engineering',
      question: 'Does SISMN LLC provide owner representation and general contracting during construction?',
      directAnswer: 'Yes, our construction management division provides full turn-key general contracting and owner representation from groundbreaking to Certificate of Occupancy.',
      context: 'Our certified construction managers oversee subcontractor bidding, schedule-of-values auditing, onsite QA/QC structural inspections, concrete break test verifications, and safety compliance, ensuring projects finish on schedule and within budget.',
    },
    {
      id: 'investor-syndication-partnerships',
      category: 'investment',
      categoryLabel: 'Real Estate Investment',
      question: 'Can private or accredited investors partner with SISMN LLC on Texas real estate developments?',
      directAnswer: 'Yes, SISMN LLC structures secure joint ventures and co-investment syndications for accredited investors across residential subdivisions and commercial centers.',
      context: 'We focus on conservative debt-to-equity ratios, high-growth North Texas land corridors, and strict transparency with regular progress reporting. Interested partners can request our investor prospectus and financial models through our investment portal.',
    },
    {
      id: 'tas-ada-compliance',
      category: 'licensing',
      categoryLabel: 'Licensing & Compliance',
      question: 'Do SISMN LLC plans comply with Texas Accessibility Standards (TAS) and the Americans with Disabilities Act (ADA)?',
      directAnswer: 'Yes, every commercial and public facility designed by SISMN LLC undergoes mandatory Texas Accessibility Standards (TAS) review and TDLR plan registration.',
      context: 'Our certified architects ensure path-of-travel accessibility, parking space allocations, compliant ingress/egress ramps, ADA restroom clearances, and life-safety compliance required for municipal Certificate of Occupancy issuance.',
    },
    {
      id: 'insurance-liability-coverage',
      category: 'licensing',
      categoryLabel: 'Licensing & Compliance',
      question: 'What professional liability and commercial insurance does SISMN LLC maintain?',
      directAnswer: 'SISMN LLC maintains comprehensive Professional Liability (Errors & Omissions) insurance alongside Commercial General Liability and statutory Workers’ Compensation.',
      context: 'Certificates of Insurance (COI) naming project sponsors, institutional lenders, and property owners as additional insured parties are issued upon execution of our professional services contracts.',
    },
    {
      id: 'leadership-background',
      category: 'engineering',
      categoryLabel: 'Architecture & Engineering',
      question: 'Who leads SISMN LLC and what is the leadership’s track record?',
      directAnswer: 'SISMN LLC is founded and led by President Imran Pirzada, bringing over 25 years of Texas architectural, civil engineering, and construction management leadership.',
      context: 'Under Imran Pirzada’s stewardship, the firm has delivered projects across more than 250 cities, completed over 2,000 real estate appraisals and valuations, and maintains an active development pipeline exceeding $300M in project valuation.',
    },
    {
      id: 'corporate-office-location',
      category: 'process',
      categoryLabel: 'Process & Permitting',
      question: 'Where is SISMN LLC’s corporate headquarters and what are the operating hours?',
      directAnswer: 'Our corporate headquarters is located at 13151 Emily Rd. #100, Dallas, TX 75240, open Monday through Friday from 9:00 AM to 6:00 PM CST.',
      context: 'We welcome scheduled visits for client design conferences, plan reviews, and investment briefings. Direct telephone lines are (214) 453-9999 and (214) 715-1010.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'licensing', label: 'Licensing & Compliance' },
    { id: 'engineering', label: 'Architecture & Engineering' },
    { id: 'process', label: 'Process & Permitting' },
    { id: 'investment', label: 'Real Estate Investment' },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.directAnswer.toLowerCase().includes(query) ||
        faq.context.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery, faqs]);

  // Inject authoritative FAQPage JSON-LD schema dynamically on this page only
  useEffect(() => {
    const scriptId = 'canonical-faq-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const faqSchemaData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://sismnllc.com/faq#faq',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${faq.directAnswer} ${faq.context}`,
        },
      })),
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(faqSchemaData);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [faqs]);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | Engineering & Architecture"
        description="Get direct answers to common questions regarding SISMN LLC's Texas-licensed engineering stamped drawings (TBPE #F-10492), architectural services (TBAE #BR-4902), municipal permitting, and real estate development."
        keywords="SISMN LLC FAQ, Texas stamped engineering questions, architecture permits Dallas, TBPE firm F-10492, how to get commercial building permit Texas, civil site engineering FAQ"
        breadcrumbs={[{ name: 'FAQ', item: '/faq' }]}
      />

      {/* Page Header */}
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Direct, transparent answers regarding our Texas engineering licenses, stamped architectural plans, municipal permitting workflows, and real estate development services."
        breadcrumbs={[{ label: 'FAQs' }]}
        bgImage="/images/heroes/hero-slide-3.jpg"
        badge="FREQUENTLY ASKED QUESTIONS &amp; REGULATORY KNOWLEDGE"
      />

      {/* Main Content Area */}
      <section className="py-16 sm:py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
          {/* Top Search & Filter Bar */}
          <div className="flex flex-col gap-6 bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="font-headline-md text-headline-md uppercase text-on-surface">
                  Client &amp; Partner Knowledge Base
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Answers to actual questions from developers, investors, landowners, and municipal planning staff.
                </p>
              </div>

              {/* Live Search Input */}
              <div className="relative w-full sm:w-72 shrink-0">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container pl-10 pr-4 py-2.5 rounded-full font-body-sm text-sm border border-steel-border focus:outline-none focus:ring-2 focus:ring-amber-highlight/30 text-on-surface"
                />
              </div>
            </div>

            {/* Category Filter Pills (Single Line on Desktop, Horizontal Scroll on Mobile) */}
            <div className="w-full overflow-x-auto no-scrollbar pt-1">
              <div className="flex items-center gap-2 flex-nowrap w-max">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 px-4 sm:px-5 py-2 rounded-full font-label-caps text-label-caps uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'bg-slate-surface-dark text-on-primary shadow-md font-bold'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="flex flex-col gap-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = !!openItems[faq.id];
                return (
                  <div
                    key={faq.id}
                    id={faq.id}
                    className="bg-surface-container-lowest border border-steel-border rounded-2xl overflow-hidden shadow-sm transition-all hover:border-amber-highlight/40"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-amber-highlight mt-2 shrink-0" />
                        <div className="flex flex-col gap-1">
                          <span className="font-spec-code text-[11px] text-amber-highlight uppercase font-bold tracking-wider">
                            {faq.categoryLabel}
                          </span>
                          <h3 className="font-headline-sm text-base sm:text-lg text-on-surface uppercase font-bold leading-snug">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[24px] text-outline transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180 text-amber-highlight' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 border-t border-steel-border/40 text-on-surface-variant flex flex-col gap-3 animate-in fade-in-50 duration-200">
                        {/* Direct Answer First (Best Practice for search snippets & LLM retrieval) */}
                        <div className="p-4 bg-surface-container-low rounded-xl border border-steel-border/60">
                          <p className="font-body-md text-body-md font-semibold text-on-surface leading-relaxed">
                            {faq.directAnswer}
                          </p>
                        </div>
                        {/* Context & Technical Background */}
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed pl-1">
                          {faq.context}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-outline text-[40px]">search_off</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase">
                  No Matching Questions Found
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                  We couldn't find any questions matching &ldquo;{searchQuery}&rdquo;. Clear your search or contact our
                  Dallas headquarters directly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-2 px-6 py-2.5 rounded-full bg-slate-surface-dark text-on-primary font-label-caps text-label-caps uppercase font-bold shadow-md cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Have a Specific Question? Contact Suite Card */}
          <div className="bg-[#0b1c30] text-on-primary rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl border border-white/10 mt-4">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-amber-highlight">
                Technical Consultation Desk
              </span>
              <h3 className="font-headline-md text-headline-md uppercase text-white">
                Have a Specific Engineering or Land Question?
              </h3>
              <p className="font-body-sm text-body-sm text-slate-300 leading-relaxed">
                Our licensed Professional Engineers and architectural master planners are available for direct project
                discussions and formal RFP reviews.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-amber-highlight hover:bg-secondary-container text-slate-surface-dark font-label-caps text-label-caps uppercase tracking-wider font-bold px-7 py-3.5 rounded-full transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Schedule Consultation</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

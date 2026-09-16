import React, { useState, useRef } from 'react';
import { ProjectModal } from '../components/ProjectModal';
import { SEOHead } from '../components/SEOHead';
import { InteractiveScrollHero } from '../components/InteractiveScrollHero';
import { Project } from '../types';
import { submitContactInquiry, ContactSubmissionResult } from '../services/contactService';

interface FeaturedProjectItem extends Project {
  typeTag: string;
  statusTag: string;
  metricLabel: string;
  filterGroup: 'commercial' | 'residential';
}

const FEATURED_PROJECTS: FeaturedProjectItem[] = [
  {
    id: 'the-vineyards',
    title: 'THE VINEYARDS',
    category: 'Residential',
    filterGroup: 'residential',
    typeTag: 'Masterplanned Community',
    statusTag: 'A&E COMPLETED',
    metricLabel: '120+ ACRES',
    location: '1807 Bear Creek Rd, Cedar Hill, TX 75104',
    description:
      'Premier luxury residential development featuring custom geotechnical foundations, municipal drainage corridors, and unified architectural guidelines.',
    status: 'Completed',
    unitsOrSize: '120+ Acres Masterplanned',
    image: '/images/projects/the-vineyards.jpg',
    features: [
      'Custom luxury lots',
      'Geotechnical soil stabilization',
      'Municipal drainage corridors',
      'Unified architectural guidelines',
      'BIM Level-3 Verified',
    ],
  },
  {
    id: 'the-mya-heights',
    title: 'THE MYA HEIGHTS',
    category: 'Commercial',
    filterGroup: 'commercial',
    typeTag: 'Mixed-Use / Multi-Family',
    statusTag: 'UNDER CONSTRUCTION',
    metricLabel: '185 UNITS',
    location: '7106 Liberty Grove Rd, Rowlett, TX 75089',
    description:
      'High-density mixed-use development combining ground-level experiential retail with luxury multi-family apartments and covered parking infrastructure.',
    status: 'Under Development',
    unitsOrSize: '185 Multi-Family Units & Retail',
    image: '/images/projects/the-mya-heights.jpg',
    features: [
      'Ground-level experiential retail',
      'Luxury multi-family living units',
      'Covered parking structure',
      'Lake Ray Hubbard corridor proximity',
      'Sealed MEP & Structural engineering',
    ],
  },
  {
    id: 'shahla-homes',
    title: 'SHAHLA HOMES',
    category: 'Residential',
    filterGroup: 'residential',
    typeTag: 'Bespoke Residential',
    statusTag: 'PERMITTED',
    metricLabel: 'CUSTOM PARCELS',
    location: '966 North Blue Grove Rd, Lancaster, TX 75146',
    description:
      'Custom architectural enclave designed with tailored structural framing, energy-efficient building envelopes, and private utility tie-ins.',
    status: 'Under Development',
    unitsOrSize: 'Custom Residential Parcels',
    image: '/images/projects/shahla-homes.jpg',
    features: [
      'Tailored structural framing',
      'High-performance building envelope',
      'Dedicated private utility tie-ins',
      'Modern open-concept floorplans',
      'City of Lancaster approved plans',
    ],
  },
  {
    id: 'savana-avenue',
    title: 'SAVANA AVENUE',
    category: 'Commercial',
    filterGroup: 'commercial',
    typeTag: 'Commercial & Retail Center',
    statusTag: 'TENANT FITOUT',
    metricLabel: '45,000 SQ. FT.',
    location: '1375 MacArthur Dr, Carrollton, TX 75007',
    description:
      'Turnkey commercial development encompassing civil site drainage, heavy vehicular paving specifications, and multi-tenant structural envelopes.',
    status: 'Under Development',
    unitsOrSize: '45,000 SQ. FT. Commercial',
    image: '/images/projects/savana-avenue.jpg',
    features: [
      'Double-height glass curtain walls',
      'Civil site stormwater detention',
      'Heavy vehicular paving specifications',
      'Multi-tenant flexible envelopes',
      'ADA & Texas Accessibility Compliant',
    ],
  },
  {
    id: 'silver-saddle-court',
    title: 'SILVER SADDLE COURT',
    category: 'Residential',
    filterGroup: 'residential',
    typeTag: 'Residential Development',
    statusTag: 'DELIVERED',
    metricLabel: '24 RESIDENCES',
    location: '413 Silver Saddle Ct, Grand Prairie, TX 75050',
    description:
      'Master planned cul-de-sac enclave designed with custom grading designs, retaining wall engineering, and modern single-family architectural vernacular.',
    status: 'Completed',
    unitsOrSize: '24 Residential Units',
    image: '/images/projects/silver-saddle-court.jpg',
    features: [
      'Engineered retaining wall systems',
      'Precision cul-de-sac grading',
      'Modern single-family vernacular',
      'Turnkey civil infrastructure',
      'Full Certificate of Occupancy',
    ],
  },
  {
    id: 'clarksville-hospital',
    title: 'CLARKSVILLE GENERAL',
    category: 'Healthcare',
    filterGroup: 'commercial',
    typeTag: 'Healthcare & Institutional',
    statusTag: 'EXPANSION PHASE',
    metricLabel: 'CRITICAL FACILITY',
    location: 'Clarksville, TX, USA',
    description:
      'Rigorous structural rehabilitation and MEP life-safety engineering for critical hospital infrastructure to ensure 24/7 uninterrupted operation.',
    status: 'Under Development',
    unitsOrSize: 'Acute Care & Hospital Facility',
    image: '/images/projects/clarksville-hospital.jpg',
    features: [
      'Critical life-safety MEP engineering',
      'Ambulance port-cochere design',
      'Advanced HVAC cooling & filtration',
      'Structural stress validation',
      'Emergency trauma facility upgrades',
    ],
  },
];

export const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'commercial' | 'residential'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [rfpForm, setRfpForm] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    service: 'Commercial Architecture & Engineering',
    message: '',
    botcheck: '',
  });
  const rfpMountedAt = useRef<number>(Date.now());
  const [isSubmittingRfp, setIsSubmittingRfp] = useState(false);
  const [rfpResult, setRfpResult] = useState<ContactSubmissionResult | null>(null);

  // Filter projects dynamically
  const filteredProjects = FEATURED_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.filterGroup === activeFilter;
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfpForm.name || !rfpForm.email || !rfpForm.phone) {
      alert('Please fill out all required fields (Name, Phone, Email).');
      return;
    }

    setIsSubmittingRfp(true);
    setRfpResult(null);

    const result = await submitContactInquiry({
      name: rfpForm.name,
      organization: rfpForm.organization,
      phone: rfpForm.phone,
      email: rfpForm.email,
      service: rfpForm.service,
      message: rfpForm.message || 'Consultation & Evaluation Request from Homepage',
      botcheck: rfpForm.botcheck,
      mountedAt: rfpMountedAt.current,
    });

    setIsSubmittingRfp(false);
    setRfpResult(result);

    if (result.success) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      <SEOHead
        title="Architecture, Engineering & Real Estate Development"
        description="SISMN LLC is a Dallas, Texas-based licensed and board-certified firm providing architectural design, civil & structural engineering, commercial construction, and real estate development across 250+ cities."
        keywords="SISMN LLC, architecture firm Dallas, structural engineering Texas, commercial real estate development, PE stamped plans, TBAE registered architects, TBPE firm F-10492, civil site engineering, construction management Texas, Imran Pirzada"
      />
      {/* 1. INTERACTIVE THREE.JS + GSAP + CANVAS HERO SECTION */}
      <InteractiveScrollHero
        onScheduleConsultation={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. NATIONAL REACH METRIC STAT BAR (HIGH IMPACT) */}
      <section id="key-stats" className="w-full bg-surface-container-low py-12">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-gutter-md">
            {/* Stat 1 */}
            <div className="flex flex-col gap-2 p-5 sm:p-6 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-steel-border/40">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
                  Nationwide Scope
                </span>
                <span className="material-symbols-outlined text-amber-highlight text-[20px]">map</span>
              </div>
              <div className="font-metric-stat text-3xl sm:text-4xl lg:text-metric-stat text-on-surface tracking-tight">
                250<span className="text-amber-highlight">+</span>
              </div>
              <div className="w-8 h-0.5 bg-amber-highlight" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Metropolitan cities served across the United States
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-2 p-5 sm:p-6 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-steel-border/40">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
                  Network
                </span>
                <span className="material-symbols-outlined text-amber-highlight text-[20px]">groups</span>
              </div>
              <div className="font-metric-stat text-3xl sm:text-4xl lg:text-metric-stat text-on-surface tracking-tight">
                1,500<span className="text-amber-highlight">+</span>
              </div>
              <div className="w-8 h-0.5 bg-amber-highlight" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Institutional, industry &amp; community members
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col gap-2 p-5 sm:p-6 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-steel-border/40">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
                  Appraisal Volume
                </span>
                <span className="material-symbols-outlined text-amber-highlight text-[20px]">domain</span>
              </div>
              <div className="font-metric-stat text-3xl sm:text-4xl lg:text-metric-stat text-on-surface tracking-tight">
                2,000<span className="text-amber-highlight">+</span>
              </div>
              <div className="w-8 h-0.5 bg-amber-highlight" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Properties evaluated with 70+ high-profile assets listed
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col gap-2 p-5 sm:p-6 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-steel-border/40">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
                  Executed Value
                </span>
                <span className="material-symbols-outlined text-amber-highlight text-[20px]">monetization_on</span>
              </div>
              <div className="font-metric-stat text-3xl sm:text-4xl lg:text-metric-stat text-on-surface tracking-tight">
                $300M<span className="text-amber-highlight">+</span>
              </div>
              <div className="w-8 h-0.5 bg-amber-highlight" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Total cumulative project pipeline &amp; development portfolio
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SISMN LLC & LEADERSHIP PILLARS */}
      <section className="w-full py-20 md:py-section-stack-sm bg-surface">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            {/* Left Side: Editorial Storytelling */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-0.5 bg-amber-highlight" />
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                  About SISMN LLC
                </span>
              </div>

              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-on-surface tracking-tight break-words">
                Institutional Rigor • Master-Planned Vision
              </h2>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                SISMN LLC is a premier Dallas-based company licensed, registered, and board-certified in the State of
                Texas. For over 25 years of combined leadership, our principals have provided high-precision real estate
                acquisition consulting, comprehensive architectural design, multidisciplinary engineering, and
                construction management.
              </p>

              <p className="font-body-md text-body-md text-outline leading-relaxed">
                We proudly serve municipal authorities, institutional investors, commercial developers, and luxury
                homebuilders. Our integrated structure eliminates the friction between architects, structural engineers,
                and site contractors, ensuring projects finish within tight tolerances, on schedule, and on budget.
              </p>

              {/* The 3 Core Tenets Micro-Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4">
                <div className="p-4 bg-surface-container rounded-xl flex flex-col gap-1 border border-steel-border/30">
                  <span className="font-spec-code text-[11px] text-amber-highlight uppercase font-bold">Standard 01</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">Leadership</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">Decisive field authority</span>
                </div>
                <div className="p-4 bg-surface-container rounded-xl flex flex-col gap-1 border border-steel-border/30">
                  <span className="font-spec-code text-[11px] text-amber-highlight uppercase font-bold">Standard 02</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">Partnerships</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">Long-term alliance</span>
                </div>
                <div className="p-4 bg-surface-container rounded-xl flex flex-col gap-1 border border-steel-border/30">
                  <span className="font-spec-code text-[11px] text-amber-highlight uppercase font-bold">Standard 03</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">Performance</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">Exceeding ROI models</span>
                </div>
              </div>
            </div>

            {/* Right Side: 4 Core Pillars Mosaic */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-gutter-md">
              {/* Pillar Card 1 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 border border-steel-border/50">
                <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Reputation for Excellence</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Consistently recognized by Texas municipal review boards and commercial entities for impeccable
                  construction standards and zero-compromise engineering integrity.
                </p>
              </div>

              {/* Pillar Card 2 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 sm:translate-y-4 border border-steel-border/50">
                <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[24px]">handshake</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Enduring Partnerships</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  We align directly with equity partners, landowners, and municipal planners to generate mutual value
                  across multi-phase, decadal master developments.
                </p>
              </div>

              {/* Pillar Card 3 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 border border-steel-border/50">
                <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[24px]">health_and_safety</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Commitment &amp; Safety</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Stringent OSHA compliance protocols, rigorous geotechnical soil stabilization reviews, and structural
                  stress validation before ground breaking.
                </p>
              </div>

              {/* Pillar Card 4 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 sm:translate-y-4 border border-steel-border/50">
                <div className="w-12 h-12 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[24px]">engineering</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Elite Board-Certified Team</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  In-house Professional Engineers (PE), Registered Architects (AIA), certified master planners, and
                  estimators handling your project under one unified seal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SHOWCASE */}
      <section className="w-full py-20 md:py-section-stack-sm bg-canvas-clean" id="projects">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-12">
          {/* Section Header with Technical Context */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-0.5 bg-amber-highlight" />
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                  Signature Commissions
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight uppercase">
                Featured Projects
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Navigating the labyrinth of contractors, negotiations, budgets, schedules, and general bureaucracy
                involved in real estate and construction projects. Our team handles your entire portfolio from initial land
                entitlement to final certificates of occupancy.
              </p>
            </div>

            {/* Filter Buttons - Responsive Scrollable Capsule Row on Mobile */}
            <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pb-1">
              <div className="flex items-center gap-2 sm:gap-3 flex-nowrap w-max">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-caps text-label-caps uppercase transition-all whitespace-nowrap ${
                    activeFilter === 'all'
                      ? 'bg-slate-surface-dark text-on-primary shadow-md'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  All Projects ({FEATURED_PROJECTS.length})
                </button>
                <button
                  onClick={() => setActiveFilter('commercial')}
                  className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-caps text-label-caps uppercase transition-all whitespace-nowrap ${
                    activeFilter === 'commercial'
                      ? 'bg-slate-surface-dark text-on-primary shadow-md'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Commercial
                </button>
                <button
                  onClick={() => setActiveFilter('residential')}
                  className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-caps text-label-caps uppercase transition-all whitespace-nowrap ${
                    activeFilter === 'residential'
                      ? 'bg-slate-surface-dark text-on-primary shadow-md'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Residential
                </button>
              </div>
            </div>
          </div>

          {/* 6 Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-md">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer border border-steel-border/50"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Header with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-card-dark">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={project.title}
                    src={project.image}
                  />
                  <div className="absolute top-3 left-3 bg-slate-surface-dark/90 text-on-primary px-3 py-1 rounded-full font-spec-code text-[11px] uppercase tracking-wider backdrop-blur-sm border border-white/10">
                    {project.typeTag}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-amber-highlight text-slate-surface-dark font-spec-code text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {project.statusTag}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-outline text-body-sm font-body-sm">
                      <span className="material-symbols-outlined text-[16px] text-amber-highlight">location_on</span>
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-secondary transition-colors uppercase">
                      {project.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-steel-border/50">
                    <span className="font-spec-code text-spec-code text-on-surface font-semibold">
                      {project.metricLabel}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 font-label-caps text-label-caps uppercase text-on-surface font-bold group-hover:text-secondary"
                    >
                      <span>View Spec Sheet</span>
                      <span className="material-symbols-outlined text-[16px]">north_east</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Projects Section Footer CTA */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between p-6 bg-surface-container rounded-2xl gap-4 border border-steel-border/40">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-highlight text-[28px]">folder_special</span>
              <div>
                <span className="font-headline-sm text-headline-sm text-on-surface block">
                  Need full architectural plan sets or feasibility reports?
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Request digital portfolio access or archived municipal submittals.
                </span>
              </div>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-slate-surface-dark text-on-primary hover:bg-secondary transition-colors rounded-full font-label-caps text-label-caps uppercase tracking-wider shrink-0 font-bold shadow-sm cursor-pointer"
            >
              Request Complete Portfolio PDF
            </a>
          </div>
        </div>
      </section>

      {/* 5. CORE SPECIALIZATIONS / WHAT WE DO */}
      <section id="services" className="w-full py-20 md:py-section-stack-sm bg-slate-surface-dark text-inverse-on-surface">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-12">
          {/* Section Title Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-0.5 bg-amber-highlight" />
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-amber-highlight">
                  Disciplines &amp; Capabilities
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-primary">What We Do</h2>
              <p className="font-body-md text-body-md text-outline-variant leading-relaxed">
                Our multi-disciplinary practice operates across every stage of the built environment lifecycle. We
                seamlessly bridge the technical gap between preliminary conceptual renderings and concrete construction
                sequencing.
              </p>
            </div>
            <div className="bg-slate-card-dark px-4 py-2.5 rounded-full flex items-center gap-3 text-on-primary border border-white/10">
              <span className="material-symbols-outlined text-amber-highlight">architecture</span>
              <span className="font-spec-code text-spec-code">TEXAS PE &amp; AIA REGISTERED FIRM</span>
            </div>
          </div>

          {/* 6 Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-md">
            {/* Service 1: Commercial */}
            <div className="bg-slate-card-dark p-8 rounded-2xl border border-white/5 hover:border-amber-highlight/30 hover:bg-slate-card-dark/80 transition-all duration-300 flex flex-col justify-between gap-6 group shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-spec-code text-spec-code text-amber-highlight">01 / COMMERCIAL</span>
                  <span className="material-symbols-outlined text-[24px] text-outline-variant group-hover:text-amber-highlight transition-colors">
                    store
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-primary">Commercial Plazas &amp; Offices</h3>
                <p className="font-body-md text-body-md text-outline-variant leading-relaxed">
                  Design and engineering of modern retail centers, multi-story office headquarters, mixed-use complexes, and
                  light industrial park campuses tailored for institutional tenants.
                </p>
              </div>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-outline-variant pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Storefront
                  Glass &amp; Structural Steel
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> ADA &amp;
                  Texas Accessibility Standards
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Turnkey
                  Tenant Fit-Out Documentation
                </li>
              </ul>
            </div>

            {/* Service 2: Residential */}
            <div className="bg-slate-card-dark p-8 rounded-2xl border border-white/5 hover:border-amber-highlight/30 hover:bg-slate-card-dark/80 transition-all duration-300 flex flex-col justify-between gap-6 group shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-spec-code text-spec-code text-amber-highlight">02 / RESIDENTIAL</span>
                  <span className="material-symbols-outlined text-[24px] text-outline-variant group-hover:text-amber-highlight transition-colors">
                    villa
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-primary">Luxury Estates &amp; Multi-Family</h3>
                <p className="font-body-md text-body-md text-outline-variant leading-relaxed">
                  Architectural styling and precision structural framing for high-end custom homes, townhome enclaves, and
                  scalable master-planned single-family sub-divisions.
                </p>
              </div>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-outline-variant pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Custom
                  Foundation &amp; Post-Tension Slabs
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> High-Wind
                  &amp; Storm Load Compliance
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Energy Star
                  / Title 24 Thermal Modeling
                </li>
              </ul>
            </div>

            {/* Service 3: Engineering & Architecture */}
            <div className="bg-slate-card-dark p-8 rounded-2xl border border-white/5 hover:border-amber-highlight/30 hover:bg-slate-card-dark/80 transition-all duration-300 flex flex-col justify-between gap-6 group shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-spec-code text-spec-code text-amber-highlight">03 / MULTI-DISCIPLINARY</span>
                  <span className="material-symbols-outlined text-[24px] text-outline-variant group-hover:text-amber-highlight transition-colors">
                    precision_manufacturing
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-primary">Engineering &amp; Architecture</h3>
                <p className="font-body-md text-body-md text-outline-variant leading-relaxed">
                  Board-certified structural, mechanical, electrical, and plumbing (MEP) engineering coupled with licensed
                  architectural design and permit processing.
                </p>
              </div>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-outline-variant pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Sealed
                  Structural Calculation Packages
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Civil Site
                  Stormwater Management
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> MEP Load
                  Calculations &amp; Distribution
                </li>
              </ul>
            </div>

            {/* Service 4: Land Development */}
            <div className="bg-slate-card-dark p-8 rounded-2xl border border-white/5 hover:border-amber-highlight/30 hover:bg-slate-card-dark/80 transition-all duration-300 flex flex-col justify-between gap-6 group shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-spec-code text-spec-code text-amber-highlight">04 / LAND DEVELOPMENT</span>
                  <span className="material-symbols-outlined text-[24px] text-outline-variant group-hover:text-amber-highlight transition-colors">
                    terrain
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-primary">Zoning, Entitlement &amp; Master Planning</h3>
                <p className="font-body-md text-body-md text-outline-variant leading-relaxed">
                  Raw parcel feasibility, environmental impact reviews, city zoning changes, preliminary platting, utility
                  easement design, and road network layout.
                </p>
              </div>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-outline-variant pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> City Council
                  Representation &amp; Variances
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Cut/Fill
                  Earthwork Balance Optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Utility Main
                  Extensions &amp; Lift Stations
                </li>
              </ul>
            </div>

            {/* Service 5: Construction Sequence */}
            <div className="bg-slate-card-dark p-8 rounded-2xl border border-white/5 hover:border-amber-highlight/30 hover:bg-slate-card-dark/80 transition-all duration-300 flex flex-col justify-between gap-6 group shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-spec-code text-spec-code text-amber-highlight">05 / CONSTRUCTION SEQUENCE</span>
                  <span className="material-symbols-outlined text-[24px] text-outline-variant group-hover:text-amber-highlight transition-colors">
                    construction
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-primary">Construction Management &amp; QA</h3>
                <p className="font-body-md text-body-md text-outline-variant leading-relaxed">
                  On-site general contracting, subcontractor vetting, material procurement, concrete slump and compaction
                  testing, and critical path scheduling.
                </p>
              </div>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-outline-variant pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Rigorous
                  Field Inspection Reports
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Change-Order
                  Minimization Protocol
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Turnkey
                  Handover with As-Built Sets
                </li>
              </ul>
            </div>

            {/* Service 6: Design Sequence */}
            <div className="bg-slate-card-dark p-8 rounded-2xl border border-white/5 hover:border-amber-highlight/30 hover:bg-slate-card-dark/80 transition-all duration-300 flex flex-col justify-between gap-6 group shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-spec-code text-spec-code text-amber-highlight">06 / DESIGN SEQUENCE</span>
                  <span className="material-symbols-outlined text-[24px] text-outline-variant group-hover:text-amber-highlight transition-colors">
                    draw
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-primary">BIM &amp; Construction Documents</h3>
                <p className="font-body-md text-body-md text-outline-variant leading-relaxed">
                  From schematic hand-drawn ideation through multi-layered Revit/CAD construction documentation ready for
                  immediate municipal approval and bid generation.
                </p>
              </div>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-outline-variant pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> High-Definition
                  3D Photorealistic Renderings
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Clash
                  Detection in Complex BIM Envelopes
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span> Complete
                  Specification Books (CSI MasterFormat)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INVESTOR & CLIENT CONSULTATION SECTION (HIGH CONVERSION) */}
      <section className="w-full py-20 md:py-section-stack-sm bg-surface" id="contact">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-surface-container-low rounded-3xl p-8 md:p-14 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center border border-steel-border/50">
            {/* Left Column: Direct Call & Pitch */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-0.5 bg-amber-highlight" />
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                  Investor &amp; Public Consultation
                </span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight uppercase">
                Safe, High-Yield Opportunities in Real Estate &amp; Construction
              </h2>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                SISMN LLC provides vetted, institutional-grade access to high-growth development projects across the
                Dallas-Fort Worth Metroplex and greater Texas. Partner with our registered engineers and development
                principals to build with absolute confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                      Direct Dallas Line
                    </span>
                    <a
                      className="font-headline-sm text-headline-sm text-on-surface hover:text-secondary font-bold"
                      href="tel:2144539999"
                    >
                      (214) 453-9999
                    </a>
                    <span className="font-body-sm text-[12px] text-outline">Mon - Fri: 09:00 - 18:00 CT</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#0b1c30] text-amber-highlight flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                      Executive Office
                    </span>
                    <span className="font-headline-sm text-[16px] text-on-surface leading-tight">
                      13151 Emily Rd. #100
                    </span>
                    <span className="font-body-sm text-[12px] text-outline">Dallas, TX 75240</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Request Card */}
            <div className="lg:col-span-6 bg-surface-container-lowest p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col gap-6 border border-steel-border/70">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface tracking-wider">
                  Request Project Evaluation
                </h3>
                <span className="font-spec-code text-[11px] text-on-surface-variant bg-surface-container px-3 py-1 rounded-full uppercase font-semibold">
                  Confidential NDA
                </span>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded-lg bg-surface-container flex flex-col items-center text-center gap-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#0b1c30] text-amber-highlight flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-[28px]">verified</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">Consultation Request Transmitted</h4>
                  <p className="font-body-md text-on-surface-variant max-w-sm">
                    Thank you, <strong className="text-on-surface">{rfpForm.name}</strong>. Your project specifications have been securely routed to{' '}
                    <span className="text-on-surface font-semibold underline decoration-amber-highlight/50">info@sismnllc.com</span>. A senior partner will contact you within 24 hours.
                  </p>
                  {rfpResult?.mailtoFallback && (
                    <a
                      href={rfpResult.mailtoFallback}
                      className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-amber-highlight transition-colors mt-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">mail</span>
                      <span>Send a backup copy directly via your email client</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setRfpForm({
                        name: '',
                        organization: '',
                        phone: '',
                        email: '',
                        service: 'Commercial Architecture & Engineering',
                        message: '',
                        botcheck: '',
                      });
                      rfpMountedAt.current = Date.now();
                    }}
                    className="mt-3 text-xs font-label-caps text-amber-highlight hover:underline uppercase tracking-wider font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                  {/* Anti-Spam Honeypot Trap - Invisible to humans, catches automated crawlers */}
                  <div className="opacity-0 absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <label htmlFor="hp_rfp_botcheck">Leave this field blank</label>
                    <input
                      id="hp_rfp_botcheck"
                      type="text"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      value={rfpForm.botcheck}
                      onChange={(e) => setRfpForm({ ...rfpForm, botcheck: e.target.value })}
                    />
                  </div>

                  {/* Anti-Spam / Rate-Limit Warning Banner */}
                  {rfpResult && !rfpResult.success && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-sm flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[18px] text-red-500 shrink-0 mt-0.5">warning</span>
                        <span>{rfpResult.message}</span>
                      </div>
                      {rfpResult.mailtoFallback && (
                        <div className="pl-6">
                          <a
                            href={rfpResult.mailtoFallback}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold underline hover:text-red-600"
                          >
                            <span>Click here to open email directly</span>
                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body-sm text-body-sm font-semibold text-on-surface">Full Name *</label>
                      <input
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all border border-steel-border/50 shadow-sm"
                        placeholder="e.g. Marcus Vance"
                        required
                        type="text"
                        value={rfpForm.name}
                        onChange={(e) => setRfpForm({ ...rfpForm, name: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body-sm text-body-sm font-semibold text-on-surface">
                        Organization / Investor
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all border border-steel-border/50 shadow-sm"
                        placeholder="e.g. Vance Capital Group"
                        type="text"
                        value={rfpForm.organization}
                        onChange={(e) => setRfpForm({ ...rfpForm, organization: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body-sm text-body-sm font-semibold text-on-surface">Direct Phone *</label>
                      <input
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all border border-steel-border/50 shadow-sm"
                        placeholder="(214) 000-0000"
                        required
                        type="tel"
                        value={rfpForm.phone}
                        onChange={(e) => setRfpForm({ ...rfpForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body-sm text-body-sm font-semibold text-on-surface">Email Address *</label>
                      <input
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all border border-steel-border/50 shadow-sm"
                        placeholder="mvance@capital.com"
                        required
                        type="email"
                        value={rfpForm.email}
                        onChange={(e) => setRfpForm({ ...rfpForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-body-sm text-body-sm font-semibold text-on-surface">Service Required</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all border border-steel-border/50 shadow-sm"
                      value={rfpForm.service}
                      onChange={(e) => setRfpForm({ ...rfpForm, service: e.target.value })}
                    >
                      <option>Commercial Architecture &amp; Engineering</option>
                      <option>Master Land Development &amp; Zoning</option>
                      <option>Luxury Residential Design &amp; Build</option>
                      <option>Real Estate Investment Portfolio Inquiry</option>
                      <option>General Contracting &amp; Project Management</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-body-sm text-body-sm font-semibold text-on-surface">
                      Project Scope or Location Notes
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all resize-none border border-steel-border/50 shadow-sm"
                      placeholder="Provide property address, acreage, estimated timeline or investment targets..."
                      rows={3}
                      value={rfpForm.message}
                      onChange={(e) => setRfpForm({ ...rfpForm, message: e.target.value })}
                    />
                  </div>

                  <button
                    className="w-full py-4 bg-[#0b1c30] hover:bg-[#112240] disabled:opacity-60 disabled:cursor-not-allowed text-on-primary transition-all rounded-full font-label-caps text-label-caps uppercase tracking-wider font-bold shadow-lg shadow-[#0b1c30]/20 flex items-center justify-center gap-2 cursor-pointer"
                    type="submit"
                    disabled={isSubmittingRfp}
                  >
                    {isSubmittingRfp ? (
                      <>
                        <span className="w-4 h-4 border-2 border-amber-highlight border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Consultation Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE CLIENT TESTIMONIAL & TRUST QUOTE */}
      <section className="w-full py-16 bg-surface-container-low">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10 bg-surface-container-lowest rounded-2xl shadow-sm border border-steel-border/50">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-highlight flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[32px]">format_quote</span>
              </div>
              <div className="flex flex-col gap-1 max-w-2xl">
                <p className="font-headline-sm text-headline-sm text-on-surface italic">
                  “SISMN LLC orchestrated our multi-parcel zoning review and structural permits 4 months ahead of schedule.
                  Their dual mastery in architecture and structural engineering is unmatched in North Texas.”
                </p>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                  — Regional Land Development Group, Dallas-Fort Worth
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-end">
                <span className="font-spec-code text-spec-code font-bold text-on-surface">100% REGULATORY APPROVAL</span>
                <span className="font-label-caps text-[11px] text-outline uppercase tracking-wider">
                  State of Texas Municipal Filings
                </span>
              </div>
              <span className="material-symbols-outlined text-amber-highlight text-[36px]">verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Building2,
  Home,
  Factory,
  Compass,
  Hammer,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const ServicesShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 'commercial',
      title: 'Commercial Construction',
      subtitle: 'Retail Plazas, Office Complexes & Mixed-Use Hubs',
      desc: 'Full-cycle commercial general contracting from steel framing and exterior curtain wall glazing to interior tenant fit-outs and TXDOT highway access approvals.',
      icon: <Building2 className="w-6 h-6 text-amber-600" />,
      deliverables: [
        'Multi-story commercial office centers',
        'High-density shopping centers & plazas',
        'Acute care medical imaging clinics',
        'High-capacity fuel stations & travel centers',
      ],
    },
    {
      id: 'residential',
      title: 'Residential Construction',
      subtitle: 'Luxury Communities, Duplexes & Townhomes',
      desc: 'Master-planned luxury residential subdivisions, custom contemporary estates, high-density duplex communities, and multi-story townhouses engineered for longevity.',
      icon: <Home className="w-6 h-6 text-amber-600" />,
      deliverables: [
        'Master-planned residential neighborhoods',
        'Custom contemporary single-family estates',
        'Multi-unit duplex and townhouse clusters',
        'Sustainable MEP & smart-home infrastructure',
      ],
    },
    {
      id: 'industrial',
      title: 'Industrial Construction',
      subtitle: 'Logistics Warehouses & Advanced Facilities',
      desc: 'Heavy-duty industrial infrastructure with reinforced post-tension slab foundations, high-bay clearance, automated MEP utility trunking, and intermodal transport docks.',
      icon: <Factory className="w-6 h-6 text-amber-600" />,
      deliverables: [
        'Distribution & fulfillment centers',
        'Heavy manufacturing plant foundations',
        'Temperature-controlled cold storage facilities',
        'High-voltage industrial substation integration',
      ],
    },
    {
      id: 'civil',
      title: 'Civil Engineering',
      subtitle: 'Site Entitlements, Stormwater & Grading',
      desc: 'Texas licensed PE civil engineering covering topographical grading, municipal stormwater detention (SWPPP), water/wastewater mains, and zoning variances.',
      icon: <Compass className="w-6 h-6 text-amber-600" />,
      deliverables: [
        'City preliminary & final plat approvals',
        'Stormwater management & detention basins',
        'Traffic impact analyses (TIA) & TXDOT permits',
        'Environmental phase I/II feasibility studies',
      ],
    },
    {
      id: 'renovation',
      title: 'Renovation and Restoration',
      subtitle: 'Adaptive Reuse & Structural Modernization',
      desc: 'Transforming legacy buildings and aging commercial assets into modern high-value real estate through seismic retrofitting, MEP overhaul, and contemporary facade upgrades.',
      icon: <Hammer className="w-6 h-6 text-amber-600" />,
      deliverables: [
        'Commercial facade modernization',
        'Structural steel reinforcement & seismic retrofit',
        'Complete MEP mechanical modernization',
        'Historic preservation & adaptive reuse',
      ],
    },
    {
      id: 'management',
      title: 'Project Management',
      subtitle: 'BIM LOD 400, Budgeting & Scheduling',
      desc: 'Turnkey owner representation, cost estimation, critical-path scheduling (CPM), municipal permit expediting, and strict quality control throughout construction.',
      icon: <ClipboardCheck className="w-6 h-6 text-amber-600" />,
      deliverables: [
        '3D BIM clash detection & coordination',
        'Earned Value Analysis & budget control',
        'On-site daily superintendent inspections',
        'Final Certificate of Occupancy turnover',
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Disciplines &amp; Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              End-to-End <span className="text-amber-600">Engineering &amp; Construction</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold text-sm transition-colors group"
          >
            <span>View All Detailed Specifications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              onClick={() => setActiveTab(idx)}
              className={`border rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1.5 ${
                activeTab === idx
                  ? 'border-amber-500 shadow-xl shadow-amber-500/10 bg-white ring-2 ring-amber-500/20'
                  : 'bg-slate-50/80 border-slate-200 hover:border-amber-400 hover:bg-white hover:shadow-md'
              }`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-100 transition-all">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">
                  {service.title}
                </h3>
                <div className="text-xs font-mono text-amber-700 mb-4 uppercase tracking-wider font-semibold">
                  {service.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {service.desc}
                </p>

                <div className="space-y-2 mb-6">
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 pt-4 border-t border-slate-200 group-hover:text-amber-800"
              >
                <span>Request Proposal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PencilRuler, Compass, HardHat, ShieldCheck, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ConstructionProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate progress line on scroll
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 0.8,
          },
        }
      );

      // Stagger reveal process cards
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
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

  const steps = [
    {
      number: '01',
      title: 'Planning & Site Feasibility',
      desc: 'Topographical land survey, zoning code audit, environmental assessment, municipal variance analysis, and economic yield modeling.',
      icon: <PencilRuler className="w-5 h-5 text-amber-600" />,
      tag: 'Phase 01 // Discovery',
    },
    {
      number: '02',
      title: 'Engineering & BIM Modeling',
      desc: 'PE civil grading, structural foundation calculations, 3D BIM clash resolution, and municipal permit drawing packages.',
      icon: <Compass className="w-5 h-5 text-amber-600" />,
      tag: 'Phase 02 // Precision Design',
    },
    {
      number: '03',
      title: 'Construction & Execution',
      desc: 'Excavation, post-tension concrete slabs, structural steel erection, facade glazing, and high-performance MEP installation.',
      icon: <HardHat className="w-5 h-5 text-amber-600" />,
      tag: 'Phase 03 // Superstructure',
    },
    {
      number: '04',
      title: 'Quality Control & Testing',
      desc: 'Third-party concrete compression testing, envelope thermal scanning, MEP pressure checks, and municipal life-safety inspections.',
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
      tag: 'Phase 04 // Validation',
    },
    {
      number: '05',
      title: 'Completion & Commissioning',
      desc: 'Final Certificate of Occupancy issuance, building automation system balancing, punch-list sign-off, and turnkey owner turnover.',
      icon: <CheckCircle2 className="w-5 h-5 text-amber-600" />,
      tag: 'Phase 05 // Delivery',
    },
  ];

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 px-4 sm:px-8 lg:px-16 bg-slate-50 text-slate-900 relative border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Methodology
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 mb-6">
            Our 5-Stage <span className="text-amber-600">Execution Process</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            A systematic, transparent process engineered to eliminate surprises, control budgets, and deliver uncompromised architectural excellence.
          </p>

          {/* Animated Connecting Laser Track */}
          <div className="relative w-full h-1 bg-slate-200 rounded-full mt-10 overflow-hidden hidden lg:block">
            <div
              ref={progressBarRef}
              className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 shadow-[0_0_12px_rgba(217,119,6,0.3)]"
            />
          </div>
        </div>

        {/* 5 Step Timeline Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-mono font-extrabold text-amber-600 group-hover:scale-110 transition-transform">
                    {step.number}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center group-hover:bg-amber-100/60 transition-colors">
                    {step.icon}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                  {step.tag}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>MILESTONE {step.number}</span>
                <span className="text-amber-600 font-bold group-hover:text-amber-700">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

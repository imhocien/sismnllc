import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Building2, Globe, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const KeyStatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      value: '25+',
      label: 'Years Experience',
      desc: 'Proven engineering excellence since 1999',
      icon: <Award className="w-6 h-6 text-amber-600" />,
    },
    {
      value: '180+',
      label: 'Completed Projects',
      desc: 'Master planned & commercial developments',
      icon: <Building2 className="w-6 h-6 text-amber-600" />,
    },
    {
      value: '12',
      label: 'Regional Markets',
      desc: 'Texas metropolitan & national footprint',
      icon: <Globe className="w-6 h-6 text-amber-600" />,
    },
    {
      value: '98%',
      label: 'Client Satisfaction',
      desc: 'Multi-decade repeat institutional partners',
      icon: <HeartHandshake className="w-6 h-6 text-amber-600" />,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-8 lg:px-16 bg-slate-50 border-y border-slate-200 text-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-100 transition-all">
                {stat.icon}
              </div>

              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight mb-2 group-hover:text-amber-600 transition-colors font-mono">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500">
                  {stat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

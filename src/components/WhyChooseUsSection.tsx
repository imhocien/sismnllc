import React from 'react';
import {
  Compass,
  ShieldCheck,
  Award,
  Clock,
  Leaf,
  Users,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const pillars = [
    {
      title: 'Engineering Expertise',
      desc: 'In-house licensed Professional Engineers (PE) across civil, structural, and MEP disciplines eliminate design conflicts before ground is broken.',
      icon: <Compass className="w-6 h-6 text-amber-600" />,
    },
    {
      title: 'Uncompromising Safety',
      desc: 'OSHA compliance, comprehensive site safety protocols, and rigorous daily risk inspections protecting every tradesperson on site.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
    },
    {
      title: 'Quality Craftsmanship',
      desc: 'BIM LOD 400 precision, strict material sourcing, post-tension concrete lab testing, and structural integrity built to last generations.',
      icon: <Award className="w-6 h-6 text-amber-600" />,
    },
    {
      title: 'On-Time Delivery',
      desc: 'Critical path scheduling (CPM) and direct material procurement reduce supply chain bottlenecks and guarantee milestone completion.',
      icon: <Clock className="w-6 h-6 text-amber-600" />,
    },
    {
      title: 'Sustainable Construction',
      desc: 'Energy-efficient MEP systems, LEED gold targeting, stormwater SWPPP recycling, and environmentally conscious construction methodologies.',
      icon: <Leaf className="w-6 h-6 text-amber-600" />,
    },
    {
      title: 'Experienced Leadership',
      desc: 'Over 25 years of continuous Texas real estate development, navigating municipal bureaucracy and delivering hundreds of millions in asset value.',
      icon: <Users className="w-6 h-6 text-amber-600" />,
    },
  ];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Institutional Standards
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 mb-6">
            Why Visionaries Choose <span className="text-amber-600">SISMN LLC</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            We deliver the certainty of a premier engineering firm combined with the speed and fiscal responsibility of a trusted builder.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 border border-slate-200 rounded-3xl p-8 hover:border-amber-400 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center gap-2 text-xs font-mono text-amber-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Metric Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

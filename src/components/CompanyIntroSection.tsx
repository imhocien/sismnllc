import React from 'react';
import { ShieldCheck, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompanyIntroSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 bg-white text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visionary Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Architectural Rigor &amp; Engineering Mastery</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-tight mb-8">
              We Bridge Vision, Safety &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">Execution.</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              SISMN LLC is a Texas board-certified design, engineering, and construction enterprise with more than 25 years of institutional track record. We don’t just construct buildings; we engineer lasting urban landmarks with full in-house PE structural, civil, and MEP accountability.
            </p>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-10 font-normal">
              By controlling every facet internally—from initial raw land acquisition and municipal zoning entitlement to comprehensive BIM coordination and general contracting—we eliminate friction, safeguard investor capital, and deliver architectural perfection on schedule.
            </p>

            {/* Core Capability Checklist */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                'State of Texas Board Certified & Licensed',
                'Full In-House PE Structural & Civil Teams',
                'End-to-End Turnkey Municipal Entitlements',
                'BIM LOD 400 Construction Documentation',
                'Institutional Capital & Syndication Advisory',
                'Comprehensive General Contracting Execution',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-md hover:scale-105"
              >
                <span>Read Full Company Profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-7 py-3.5 rounded-xl text-sm border border-slate-300 transition-colors"
              >
                <span>Meet Multi-Discipline Leadership</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Visual & Certification Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <img
                src="/images/heroes/hero-slide-2.jpg"
                alt="Modern Architecture Tower Facade"
                className="w-full h-[480px] object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Floating Certification Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 border border-slate-200/90 rounded-2xl p-6 backdrop-blur-md shadow-xl text-slate-900">
                <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Licensed &amp; Registered in Texas</span>
                </div>
                <div className="text-xl font-bold text-slate-950 mb-1">
                  Exceeding Several Hundred Million Dollars
                </div>
                <p className="text-xs text-slate-600">
                  Over 180+ completed developments spanning commercial retail centers, acute healthcare hospitals, and luxury residential communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

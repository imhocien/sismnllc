import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Handshake,
  ShieldCheck,
  Users,
  TrendingUp,
  Target,
  Eye,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/sismnData';

export const AboutSection: React.FC = () => {
  const valueIcons: Record<string, React.ReactNode> = {
    Award: <Award className="w-6 h-6 text-amber-600" />,
    Handshake: <Handshake className="w-6 h-6 text-amber-600" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-600" />,
    Users: <Users className="w-6 h-6 text-amber-600" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-amber-600" />,
  };

  return (
    <section id="about" className="py-20 lg:py-28 px-4 sm:px-8 lg:px-16 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            About SISMN LLC
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            We Understand Your Needs in <span className="text-amber-600">Construction & Real Estate</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            A Dallas-based company licensed, registered, and board-certified in the State of Texas. For over 25 years, we’ve been providing end-to-end real estate acquisition consulting, project management, architecture, engineering, and marketing services.
          </p>
        </div>

        {/* 2-Column Story & Credentials */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column: Image Collage & Founder Quote */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/images/heroes/hero-slide-3.jpg"
                alt="SISMN LLC Construction Site"
                loading="lazy"
                decoding="async"
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              {/* Floating Experience Badge */}
              <div className="absolute top-6 left-6 bg-white/95 border border-slate-200/80 rounded-2xl p-4 shadow-xl backdrop-blur-md">
                <div className="text-2xl font-extrabold text-amber-600">25+ Years</div>
                <div className="text-xs font-medium text-slate-600">Of Proven Excellence</div>
              </div>

              {/* Bottom Quote Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 border border-slate-200/90 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-slate-900">
                <p className="text-sm italic text-slate-700 mb-2">
                  "Our primary focus is how we can best serve our clients and community through innovative, quality architecture and safe investments."
                </p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/images/team/imran-pirzada.jpg"
                      alt="Imran Pirzada"
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover object-top border-2 border-amber-highlight shadow-md shrink-0"
                    />
                    <div>
                      <span className="font-bold text-slate-950 block text-sm">Imran Pirzada</span>
                      <span className="text-amber-800 text-[11px] font-spec-code font-bold uppercase tracking-wider">President &amp; Founder</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative & Highlights */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-6 leading-tight">
              A Legacy of Trust Exceeding Several Hundred Million Dollars in Value
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              SISMN LLC was established to bridge the gap between architectural vision, structural safety, and financial return. We felt the need for a multidisciplinary firm dedicated to building quality homes, commercial complexes, and healthcare facilities with featured designs consumers truly desire.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Navigating the labyrinth of municipal zoning, contractor negotiations, budgets, schedules, and general bureaucracy is what ensures success. Our in-house team handles every single phase from initial raw land acquisition to final Certificate of Occupancy.
            </p>

            {/* Checklist */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                'State of Texas Board Certified',
                'In-house PE Civil & Structural',
                'Turnkey Municipal Permitting',
                'Comprehensive MEP Design',
                'Commercial & Residential Mastery',
                'Safe Real Estate Investment Portals'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Partner With SISMN LLC</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 hover:border-amber-500/40 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              Our Mission
            </h4>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {COMPANY_INFO.mission}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 hover:border-amber-500/40 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              Our Vision
            </h4>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {COMPANY_INFO.vision}
            </p>
          </div>
        </div>

        {/* 5 Core Values Grid */}
        <div className="mt-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Guided by Core Pillars of Excellence
            </h3>
            <p className="text-slate-500 text-sm">
              The foundational principles steering every development and engineering engagement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.coreValues.map((value, idx) => (
              <div
                key={idx}
                className={`bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-amber-500/50 hover:bg-white hover:shadow-md transition-all ${
                  idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4 border border-amber-200/60">
                  {valueIcons[value.icon] || <Award className="w-5 h-5 text-amber-600" />}
                </div>
                <h5 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h5>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

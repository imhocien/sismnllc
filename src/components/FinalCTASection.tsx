import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, ShieldCheck, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/sismnData';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-28 lg:py-36 px-4 sm:px-8 lg:px-16 bg-white text-slate-900 relative border-t border-slate-200 overflow-hidden">
      {/* Subtle Background Radial Aura */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Texas Licensed &amp; Board Certified Partner</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-950 uppercase leading-tight mb-8">
          READY TO BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
            THE FUTURE?
          </span>
        </h2>

        <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          Whether developing a high-density commercial center, a master-planned community, or seeking PE engineering and architecture consultation—our team is ready to execute.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
          <Link
            to="/contact"
            className="flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-9 py-4 rounded-2xl text-base shadow-xl transition-all hover:scale-105"
          >
            <span>Start a Project Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href={`tel:${COMPANY_INFO.contact.phone.replace(/[^0-9]/g, '')}`}
            className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold px-9 py-4 rounded-2xl text-base border border-slate-300 transition-all shadow-sm"
          >
            <PhoneCall className="w-5 h-5 text-amber-600" />
            <span>Call {COMPANY_INFO.contact.phone}</span>
          </a>
        </div>

        {/* Quick Contact Bar */}
        <div className="pt-10 border-t border-slate-200 flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-600" />
            <span>{COMPANY_INFO.contact.email}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
          <div>
            <span>Corporate HQ: {COMPANY_INFO.contact.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

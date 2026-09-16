import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DESIGN_SEQUENCE, CONSTRUCTION_SEQUENCE } from '../data/sismnData';

export const WorkflowsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'design' | 'construction'>('design');

  const steps = activeTab === 'design' ? DESIGN_SEQUENCE : CONSTRUCTION_SEQUENCE;

  return (
    <section id="process" className="py-20 lg:py-28 px-margin-mobile md:px-margin-desktop bg-canvas-clean text-on-surface relative border-t border-steel-border">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-0.5 bg-amber-highlight" />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                Structured Execution Methodologies
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface">
              Our Proven Project Sequences
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Every project at SISMN LLC follows our structured 10-step milestones ensuring compliance with Texas municipal
              ordinances, structural integrity, and timeline precision.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded bg-surface-container border border-steel-border">
            <button
              onClick={() => setActiveTab('design')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded font-label-caps text-label-caps uppercase transition-all cursor-pointer ${
                activeTab === 'design'
                  ? 'bg-slate-surface-dark text-on-primary shadow-sm font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-amber-highlight">draw</span>
              <span>Design Sequence (10 Steps)</span>
            </button>
            <button
              onClick={() => setActiveTab('construction')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded font-label-caps text-label-caps uppercase transition-all cursor-pointer ${
                activeTab === 'construction'
                  ? 'bg-slate-surface-dark text-on-primary shadow-sm font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-amber-highlight">construction</span>
              <span>Construction Sequence (10 Steps)</span>
            </button>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-surface-container-lowest border border-steel-border rounded p-5 hover:border-amber-highlight/60 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded bg-slate-surface-dark text-amber-highlight font-spec-code text-[12px] font-bold flex items-center justify-center">
                    {String(item.step).padStart(2, '0')}
                  </span>
                  {item.tag && (
                    <span className="font-spec-code text-[11px] text-outline bg-surface-container-low px-2 py-0.5 rounded border border-steel-border/50 uppercase">
                      {item.tag}
                    </span>
                  )}
                </div>

                <h3 className="font-headline-sm text-[15px] font-bold text-on-surface mb-2 group-hover:text-secondary transition-colors leading-snug uppercase">
                  {item.title}
                </h3>
              </div>

              <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed mt-3 pt-3 border-t border-steel-border/50">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 sm:p-8 bg-surface-container rounded flex flex-col sm:flex-row items-center justify-between gap-6 border border-steel-border">
          <div className="max-w-xl">
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Have a piece of land or an upcoming development?
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Our engineering team can perform an initial site feasibility study and guide you through municipal zoning
              and platting.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-slate-surface-dark hover:bg-secondary text-on-primary font-label-caps text-label-caps uppercase tracking-wider font-bold px-7 py-3.5 rounded-full transition-all shadow-md shrink-0"
          >
            <span>Schedule A Pre-Development Consultation</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};


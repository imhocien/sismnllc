import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_LIST } from '../data/sismnData';

export const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState(SERVICES_LIST[0].id);

  const getServiceIconName = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return 'store';
      case 'Home':
        return 'villa';
      case 'Compass':
        return 'precision_manufacturing';
      case 'Landmark':
        return 'terrain';
      default:
        return 'architecture';
    }
  };

  const currentService = SERVICES_LIST.find((s) => s.id === activeService) || SERVICES_LIST[0];

  return (
    <section id="services" className="py-20 lg:py-28 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface relative">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-0.5 bg-amber-highlight" />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                Disciplines &amp; Capabilities
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface">
              Comprehensive Design, Engineering &amp; Building
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              From initial zoning entitlement and civil infrastructure to architectural construction documentation and
              turn-key general contracting.
            </p>
          </div>
          <div className="bg-surface-container px-4 py-2.5 rounded font-spec-code text-spec-code text-on-surface font-semibold border border-steel-border">
            TEXAS LICENSED A&amp;E PRACTICE
          </div>
        </div>

        {/* Service Category Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-gutter-md">
          {SERVICES_LIST.map((service, idx) => {
            const isSelected = service.id === activeService;
            return (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex flex-col items-start p-5 sm:p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-surface-dark text-on-primary border-slate-card-dark shadow-lg ring-2 ring-amber-highlight/50'
                    : 'bg-surface-container-lowest border-steel-border hover:border-amber-highlight/50 text-on-surface'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span
                    className={`font-spec-code text-[11px] font-bold ${
                      isSelected ? 'text-amber-highlight' : 'text-outline'
                    }`}
                  >
                    0{idx + 1} / SCOPE
                  </span>
                  <span
                    className={`material-symbols-outlined text-[24px] ${
                      isSelected ? 'text-amber-highlight' : 'text-outline'
                    }`}
                  >
                    {getServiceIconName(service.iconName)}
                  </span>
                </div>
                <h3 className="font-headline-sm text-sm sm:text-headline-sm mb-1 uppercase font-bold break-words">
                  {service.title}
                </h3>
                <p
                  className={`font-body-sm text-[12px] line-clamp-2 ${
                    isSelected ? 'text-outline-variant' : 'text-on-surface-variant'
                  }`}
                >
                  {service.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed Display Panel */}
        <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-gutter-lg items-start">
            {/* Left Info */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-0.5 bg-amber-highlight" />
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-amber-highlight">
                  Specialized Discipline
                </span>
              </div>
              <h3 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-on-surface uppercase break-words">
                {currentService.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {currentService.description}
              </p>

              {currentService.subcategories && (
                <div className="bg-surface-container-low border border-steel-border rounded p-5">
                  <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface mb-3">
                    {currentService.subcategories[0].title}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {currentService.subcategories[0].items.map((subItem, idx) => (
                      <div key={idx} className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-highlight" />
                        <span>{subItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-slate-surface-dark hover:bg-secondary text-on-primary font-label-caps text-label-caps uppercase tracking-wider font-bold px-7 py-3.5 rounded-full transition-all shadow-md"
                >
                  <span>Request Proposal for {currentService.title}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Scope Checklist */}
            <div className="lg:col-span-7 bg-surface-container-low border border-steel-border rounded-xl p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-steel-border">
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface">
                  Scope of Deliverables &amp; Sealed Submittals
                </span>
                <span className="font-spec-code text-[11px] text-amber-highlight bg-slate-card-dark px-2.5 py-0.5 rounded font-bold uppercase">
                  PE Certified &amp; Sealed
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {currentService.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-surface-container-lowest border border-steel-border rounded p-3.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-amber-highlight text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


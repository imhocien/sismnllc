import React from 'react';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      label: 'Nationwide Scope',
      value: '250+',
      icon: 'map',
      sub: 'Metropolitan cities served across the United States',
    },
    {
      label: 'Network',
      value: '1,500+',
      icon: 'groups',
      sub: 'Institutional, industry & community members',
    },
    {
      label: 'Appraisal Volume',
      value: '2,000+',
      icon: 'domain',
      sub: 'Properties evaluated with 70+ high-profile assets listed',
    },
    {
      label: 'Executed Value',
      value: '$300M+',
      icon: 'monetization_on',
      sub: 'Total cumulative project pipeline & development portfolio',
    },
  ];

  return (
    <section className="w-full bg-surface-container-low py-12 border-y border-steel-border">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-gutter-md">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 p-5 sm:p-6 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-steel-border/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
                  {stat.label}
                </span>
                <span className="material-symbols-outlined text-amber-highlight text-[20px]">{stat.icon}</span>
              </div>
              <div className="font-metric-stat text-3xl sm:text-4xl lg:text-metric-stat text-on-surface tracking-tight">
                {stat.value.replace('+', '')}
                <span className="text-amber-highlight">+</span>
              </div>
              <div className="w-8 h-0.5 bg-amber-highlight" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


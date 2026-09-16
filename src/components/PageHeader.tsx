import React from 'react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href?: string }[];
  bgImage?: string;
  badge?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  bgImage = '/images/heroes/hero-slide-2.jpg',
  badge = 'TEXAS LICENSED & BOARD CERTIFIED ARCHITECTURE + ENGINEERING',
}) => {
  return (
    <div className="relative bg-slate-surface-dark text-inverse-on-surface pt-32 pb-14 sm:pt-36 md:pt-40 sm:pb-20 px-margin-mobile md:px-margin-desktop border-b border-slate-card-dark overflow-hidden">
      {/* Architectural Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
        }}
      />

      {/* Ambient Lighting Glow */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-highlight/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Background Photo Blend visible through transparent header */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
        <img src={bgImage} alt={title} className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-surface-dark via-slate-surface-dark/75 to-slate-950/60" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto flex flex-col items-start justify-center gap-4">
        {/* Technical Badge & Breadcrumb */}
        <div className="flex flex-wrap items-center gap-3 w-full">
          <div className="inline-flex items-center gap-2 bg-slate-card-dark px-3.5 py-1.5 rounded-full text-amber-highlight font-label-caps text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase max-w-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-amber-highlight animate-ping shrink-0" />
            <span className="leading-snug break-words">{badge}</span>
          </div>

          <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-spec-code text-[11px] sm:text-spec-code text-outline-variant">
            <Link to="/" className="hover:text-amber-highlight transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">home</span>
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span>/</span>
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-amber-highlight transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-on-primary font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Title */}
        <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-on-primary uppercase tracking-tight break-words leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="font-body-md text-sm sm:text-body-md md:text-body-lg text-outline-variant max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};


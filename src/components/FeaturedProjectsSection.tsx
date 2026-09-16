import React from 'react';
import { MapPin, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS_LIST } from '../data/sismnData';

export const FeaturedProjectsSection: React.FC = () => {
  const featured = PROJECTS_LIST.slice(0, 6);

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Portfolio &amp; Landmarks
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Featured <span className="text-amber-600">Developments</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold text-sm transition-colors"
          >
            <span>Explore Complete Archive ({PROJECTS_LIST.length} Projects)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project) => (
            <Link
              key={project.id}
              to="/projects"
              className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:border-amber-400 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Container with Subtle Zoom */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-amber-800 border border-amber-200 text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {project.category}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-md text-slate-700 border border-slate-200 text-[11px] font-medium px-2.5 py-0.5 rounded-full shadow-sm">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors mb-2 leading-snug">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5 font-mono">
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>{project.unitsOrSize || 'Full Turnkey'}</span>
                  </span>
                  <span className="text-amber-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

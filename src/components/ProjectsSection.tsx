import React, { useState } from 'react';
import { PROJECTS_LIST } from '../data/sismnData';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Featured', 'Residential', 'Commercial', 'Healthcare', 'Hospitality', 'Engineering'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 lg:py-28 px-margin-mobile md:px-margin-desktop bg-canvas-clean text-on-surface relative">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-0.5 bg-amber-highlight" />
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
              Signature Portfolio
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight uppercase">
            Featured &amp; Completed Developments
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Navigating the labyrinth of contractors, negotiations, budgets, schedules, and general bureaucracy
            involved in real estate and construction projects. Our team handles your entire project from concept to
            completion.
          </p>
        </div>

        {/* Filter Categories Bar - Single Horizontal Line with Smooth Drag on Mobile */}
        <div className="w-full overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-caps text-label-caps uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-slate-surface-dark text-on-primary shadow-md font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>


        {/* Projects Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-gutter-md">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer border border-steel-border/60"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-card-dark">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-slate-surface-dark/90 text-on-primary px-3 py-1 rounded-full font-spec-code text-[11px] uppercase tracking-wider backdrop-blur-sm border border-white/10">
                  {project.category}
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-3 right-3 bg-amber-highlight text-slate-surface-dark font-spec-code text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {project.status.toUpperCase()}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-outline text-body-sm font-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-amber-highlight">location_on</span>
                    <span className="truncate">{project.location}</span>
                  </div>

                  <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-secondary transition-colors uppercase">
                    {project.title}
                  </h3>

                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="pt-4 border-t border-steel-border/50 flex items-center justify-between">
                  <span className="font-spec-code text-spec-code text-on-surface font-semibold">
                    {project.unitsOrSize || 'Full Turnkey'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 font-label-caps text-label-caps uppercase text-on-surface font-bold group-hover:text-secondary"
                  >
                    <span>View Spec Sheet</span>
                    <span className="material-symbols-outlined text-[16px]">north_east</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Popup */}
        <ProjectModal project={activeModalProject} onClose={() => setActiveModalProject(null)} />
      </div>
    </section>
  );
};


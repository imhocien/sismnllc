import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TEAM_MEMBERS } from '../data/sismnData';

export const TeamSection: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = ['All', 'Management', 'Project Management', 'Engineers', 'Architects', 'Administration'];

  const filteredMembers =
    selectedDept === 'All'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.department === selectedDept);

  return (
    <section id="team" className="py-20 lg:py-28 px-margin-mobile md:px-margin-desktop bg-canvas-clean text-on-surface relative">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        {/* Header */}
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-0.5 bg-amber-highlight" />
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
              Multidisciplinary Leadership
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface">
            Meet Our Team of Professionals
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Our firm brings together licensed Professional Engineers (PE), certified Master Architects, veteran project
            directors, and seasoned real estate consultants under one roof.
          </p>
        </div>

        {/* Department Filters - Single Horizontal Line with Smooth Drag on Mobile */}
        <div className="w-full overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap w-max">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-caps text-label-caps uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedDept === dept
                    ? 'bg-slate-surface-dark text-on-primary shadow-md font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>


        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter-md">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-surface-container-lowest border border-steel-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group p-5"
            >
              <div>
                {/* Portrait Container with proper 4:5 executive portrait aspect ratio */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-surface-container-low border border-steel-border/70 shadow-inner">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.avatar-fallback');
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Fallback Monogram */}
                  <div
                    className="avatar-fallback w-full h-full bg-slate-surface-dark text-amber-highlight flex items-center justify-center font-metric-stat text-2xl font-bold"
                    style={{ display: member.image ? 'none' : 'flex' }}
                  >
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                </div>

                {/* Department Tag & Reference */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-spec-code text-[10px] text-amber-highlight bg-slate-surface-dark px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-white/10">
                    {member.department}
                  </span>
                  <span className="font-spec-code text-[10px] text-outline font-medium">
                    #TM-{member.id.slice(0, 4).toUpperCase()}
                  </span>
                </div>

                <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface group-hover:text-amber-highlight transition-colors mb-1 leading-snug">
                  {member.name}
                </h3>

                <div className="font-spec-code text-spec-code text-on-surface-variant mb-2 uppercase tracking-wide font-semibold">
                  {member.role}
                </div>

                {member.bio && (
                  <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-steel-border/50 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-spec-code text-[11px] text-outline">
                  <span className="material-symbols-outlined text-[15px] text-amber-highlight">verified</span>
                  <span>SISMN Professional</span>
                </span>
                <Link
                  to="/contact"
                  className="font-label-caps text-label-caps uppercase text-on-surface font-bold hover:text-secondary transition-colors flex items-center gap-1"
                >
                  <span>Connect</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


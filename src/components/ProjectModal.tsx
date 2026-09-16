import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const navigate = useNavigate();
  if (!project) return null;

  const handleInquire = () => {
    onClose();
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/contact');
      }
    }, 100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-surface-dark/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-surface-container-lowest border border-steel-border rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 text-on-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0b1c30]/80 hover:bg-[#0b1c30] text-on-primary flex items-center justify-center border border-slate-card-dark transition-all hover:scale-105 cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          {/* Image */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-card-dark">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-surface-dark via-slate-surface-dark/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block bg-amber-highlight text-slate-surface-dark font-spec-code text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-2">
                {project.category} • {project.status}
              </span>
              <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold uppercase text-on-primary">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            {/* Meta Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-6 border-b border-steel-border font-body-sm text-body-sm">
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-amber-highlight text-[18px] shrink-0">location_on</span>
                <span className="truncate">{project.location}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-amber-highlight text-[18px] shrink-0">verified</span>
                <span>{project.status}</span>
              </div>
              {project.unitsOrSize && (
                <div className="flex items-center gap-2 text-on-surface col-span-2 sm:col-span-1">
                  <span className="material-symbols-outlined text-amber-highlight text-[18px] shrink-0">domain</span>
                  <span className="font-spec-code text-spec-code font-bold">{project.unitsOrSize}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-amber-highlight mb-2">
                Engineering &amp; Architecture Scope
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface mb-3">
                  Key Technical Deliverables &amp; Sealed Submittals
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 bg-surface-container-low border border-steel-border rounded-xl px-3.5 py-2.5 text-body-sm text-on-surface shadow-xs"
                    >
                      <span className="material-symbols-outlined text-amber-highlight text-[16px] shrink-0">
                        check_circle
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-steel-border">
              <button
                type="button"
                onClick={handleInquire}
                className="inline-flex items-center gap-2 bg-amber-highlight text-slate-surface-dark font-label-caps text-label-caps uppercase font-bold px-7 py-3.5 rounded-full shadow-lg shadow-amber-highlight/20 hover:bg-secondary-container transition-all tracking-wider cursor-pointer"
              >
                <span>Inquire About Similar Developments</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3.5 rounded-full font-label-caps text-label-caps uppercase text-outline hover:text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Layers,
  Sparkles,
  PhoneCall,
  Sliders,
  Maximize2,
  Play,
  X
} from 'lucide-react';
import { COMPANY_INFO, PROJECTS_LIST } from '../data/sismnData';

export const ArchitecturalHero: React.FC = () => {
  const [viewMode, setViewMode] = useState<'split' | 'completed' | 'construction'>('split');
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  const featuredProjects = PROJECTS_LIST.slice(0, 4);

  const handleSliderMove = (clientX: number) => {
    if (!splitContainerRef.current) return;
    const rect = splitContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(clampedPercent);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleSliderMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleSliderMove(e.touches[0].clientX);
  };

  return (
    <section className="relative w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 lg:px-16 overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>CINEMATIC ARCHITECTURAL FILM // 1080P MASTER</span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video
                src="/videos/construction_transformation.mp4"
                controls
                autoPlay
                loop
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between flex-1 gap-12 relative z-10">
        {/* Top Bar: Editorial Brand Hook & State Certification */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EST. 1999 // TEXAS LICENSED &amp; PE CERTIFIED</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Play Film Trigger Button */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all hover:scale-105 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Transformation Video</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.contact.phone.replace(/[^0-9]/g, '')}`}
              className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-700 hover:text-amber-700 transition-colors bg-white border border-slate-200 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>DIRECT: {COMPANY_INFO.contact.phone}</span>
            </a>
          </div>
        </div>

        {/* Center Main Stage: Editorial Headline + Interactive Architectural Viewport */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (5 Cols): Editorial Typography & Conversion */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.05] uppercase mb-6 font-sans">
              SHAPING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-amber-600">
                TOMORROW
              </span> <br />
              WITH MASTERY.
            </h1>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg font-normal leading-relaxed mb-8">
              A premier Dallas-based design, engineering, and general contracting firm. We manage every phase from raw land acquisition to full structural PE seal and turnkey delivery.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                to="/contact"
                className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
              >
                <span>Start Project Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-7 py-4 rounded-xl text-sm border border-slate-300 backdrop-blur-md transition-all hover:border-amber-500/50 shadow-sm"
              >
                <Play className="w-4 h-4 fill-current text-amber-600" />
                <span>Play Film (1080p)</span>
              </button>
            </div>

            {/* Core Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Texas Board Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>$500M+ Asset Value</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Interactive Architectural X-Ray Stage */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
              {/* Top View Mode Switcher Header */}
              <div className="px-6 py-4 bg-slate-50/95 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md z-20">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-900 uppercase">
                    FLAGSHIP: {featuredProjects[activeProjectIdx]?.title.toUpperCase() || 'SISMN METROPOLIS TOWER'}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl border border-slate-300 text-xs font-mono">
                  <button
                    onClick={() => setViewMode('split')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                      viewMode === 'split' ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    <Sliders className="w-3 h-3" />
                    <span>X-Ray Split</span>
                  </button>
                  <button
                    onClick={() => setViewMode('completed')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                      viewMode === 'completed' ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    <Building2 className="w-3 h-3" />
                    <span>Completed</span>
                  </button>
                  <button
                    onClick={() => setViewMode('construction')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                      viewMode === 'construction' ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>Active Site</span>
                  </button>
                </div>
              </div>

              {/* Main Interactive Stage Container */}
              <div
                ref={splitContainerRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={onMouseMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onTouchMove={onTouchMove}
                className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] bg-slate-950 cursor-ew-resize overflow-hidden"
              >
                <img
                  src="/images/construction_hero.jpg"
                  alt="Construction Site Active Phase"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    width: viewMode === 'completed' ? '100%' : viewMode === 'construction' ? '0%' : `${sliderPosition}%`,
                    transition: isDragging ? 'none' : 'width 0.3s ease-out',
                  }}
                >
                  <img
                    src={featuredProjects[activeProjectIdx]?.image || '/images/completed_hero.jpg'}
                    alt={featuredProjects[activeProjectIdx]?.title || 'Completed Architectural Landmark'}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{
                      width: splitContainerRef.current ? `${splitContainerRef.current.clientWidth}px` : '100%',
                      height: '100%',
                    }}
                  />
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-amber-300 text-amber-800 text-[10px] font-mono px-2.5 py-1 rounded-md uppercase font-bold tracking-wider shadow-sm">
                    COMPLETED // {featuredProjects[activeProjectIdx]?.category.toUpperCase() || 'LANDMARK'}
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-slate-300 text-slate-800 text-[10px] font-mono px-2.5 py-1 rounded-md uppercase font-bold tracking-wider shadow-sm">
                  ACTIVE CONSTRUCTION // STRUCTURAL
                </div>

                {viewMode === 'split' && (
                  <div
                    className="absolute top-0 bottom-0 z-30 pointer-events-none"
                    style={{
                      left: `${sliderPosition}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="w-[2px] h-full bg-gradient-to-b from-amber-400 via-white to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]" />

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl border-2 border-white pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4 rotate-45" />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Interactive Project Switcher Footer */}
              <div className="px-6 py-4 bg-slate-50/95 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono backdrop-blur-md">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="text-amber-700 font-bold">DRAG SLIDER:</span>
                  <span className="hidden sm:inline">Compare Raw Engineering vs Completed Architecture</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Full 1080p Video</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick-Switch Flagship Developments Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
              {featuredProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeProjectIdx === idx
                      ? 'bg-white border-amber-500 shadow-md text-slate-950 ring-1 ring-amber-400'
                      : 'bg-slate-100/90 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <div className="text-[10px] font-mono text-amber-700 font-bold mb-0.5">
                    0{idx + 1} // {p.category}
                  </div>
                  <div className="text-xs font-bold truncate text-slate-900">
                    {p.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-slate-200">
          {COMPANY_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-amber-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-mono mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-800 mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

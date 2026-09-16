import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageSequenceCanvas, ImageSequenceCanvasHandle } from './ImageSequenceCanvas';
import { FloatingSmokeClouds } from './FloatingSmokeClouds';
import { ArrowRight, ChevronDown, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/sismnData';

gsap.registerPlugin(ScrollTrigger);

interface InteractiveScrollHeroProps {
  onScheduleConsultation?: () => void;
}

export const InteractiveScrollHero: React.FC<InteractiveScrollHeroProps> = ({
  onScheduleConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<ImageSequenceCanvasHandle>(null);
  
  // States
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Chapter Refs
  const ch1Ref = useRef<HTMLDivElement>(null);
  const ch1BtnsRef = useRef<HTMLDivElement>(null);
  const ch2Ref = useRef<HTMLDivElement>(null);
  const ch3Ref = useRef<HTMLDivElement>(null);
  const ch3TextRef = useRef<HTMLDivElement>(null);
  const ch3BtnsRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Check accessibility
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Ensure experience unlocks promptly
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleFrameLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleLoadProgress = useCallback((percent: number) => {
    setLoadPercent(percent);
  }, []);

  // Refresh ScrollTrigger once loaded (and again when webfonts settle to avoid any pinned-height offset)
  useEffect(() => {
    if (isLoaded) {
      ScrollTrigger.refresh();
      document.fonts?.ready?.then(() => ScrollTrigger.refresh());

      // Luxury entrance animation for Slide 1 CTA buttons
      if (!prefersReducedMotion && ch1BtnsRef.current) {
        gsap.fromTo(
          ch1BtnsRef.current,
          { opacity: 0, y: 24, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, delay: 0.2, ease: 'back.out(1.2)' }
        );
      }
    }
  }, [isLoaded, prefersReducedMotion]);

  // ─────────────────────────────────────────────────────────────────────────
  // APPLE-STYLE CONTINUOUS SCROLL-DRIVEN SEQUENCE (GSAP + LENIS)
  // Continuous frame scrubbing directly coupled to user scroll inertia.
  // Zero scroll hijacking, zero input lag, pure 60fps/120fps fluid scrollytelling.
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const totalFrames = 120;

    const ctx = gsap.context(() => {
      // Set initial layout states
      gsap.set(ch1Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto' });
      gsap.set(ch1BtnsRef.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set(ch2Ref.current, { opacity: 0, x: 45, filter: 'blur(8px)', pointerEvents: 'none' });
      gsap.set(ch3Ref.current, { opacity: 1, pointerEvents: 'none' });
      gsap.set(ch3TextRef.current, { opacity: 0, y: 35, filter: 'blur(8px)' });
      gsap.set(ch3BtnsRef.current, { opacity: 0, y: 25, scale: 0.95, pointerEvents: 'none' });

      // Master Pinned Continuous Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'hero-scroll-trigger',
          trigger: container,
          start: 'top top',
          end: '+=380%', // 380vh deliberate luxury pacing
          pin: true,
          pinSpacing: true,
          scrub: 0.8, // Silk-smooth weighted inertia matching Lenis
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            const targetFrame = p * (totalFrames - 1);
            canvasRef.current?.renderSubFrame(targetFrame);

            // Responsive chapter indicator
            if (p < 0.32) {
              setCurrentChapter(1);
            } else if (p < 0.68) {
              setCurrentChapter(2);
            } else {
              setCurrentChapter(3);
            }
          },
        },
      });

      // Chapter 1 (0.00 to 0.28): Genesis & Vision
      // Action buttons dissolve gracefully as scroll begins
      tl.to(
        ch1BtnsRef.current,
        {
          opacity: 0,
          y: -20,
          scale: 0.96,
          pointerEvents: 'none',
          duration: 0.08,
          ease: 'power1.in',
        },
        0.13
      );
      // Main text dissolves with upward drift & soft blur
      tl.to(
        ch1Ref.current,
        {
          opacity: 0,
          y: -40,
          filter: 'blur(6px)',
          pointerEvents: 'none',
          duration: 0.10,
          ease: 'power1.in',
        },
        0.18
      );

      // Chapter 2 (0.28 to 0.68): Transformation & Precision Modernity
      // Glides in smoothly from right, holds comfortably, then exits to left
      tl.fromTo(
        ch2Ref.current,
        { opacity: 0, x: 50, filter: 'blur(6px)', pointerEvents: 'none' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          pointerEvents: 'auto',
          duration: 0.10,
          ease: 'power2.out',
        },
        0.28
      );
      tl.to(
        ch2Ref.current,
        {
          opacity: 0,
          x: -40,
          filter: 'blur(6px)',
          pointerEvents: 'none',
          duration: 0.10,
          ease: 'power1.in',
        },
        0.58
      );

      // Chapter 3: TEXT FIRST (0.62 to 0.73)
      // Headline, badge, and description reveal first with crisp clarity
      tl.fromTo(
        ch3TextRef.current,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.11,
          ease: 'power2.out',
        },
        0.62
      );

      // Chapter 3: BUTTONS SECOND (0.74 to 0.85)
      // Action buttons glide up smoothly AFTER the text is established
      tl.fromTo(
        ch3BtnsRef.current,
        { opacity: 0, y: 25, scale: 0.95, pointerEvents: 'none' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: 'auto',
          duration: 0.10,
          ease: 'back.out(1.2)',
        },
        0.74
      );
    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.getById('hero-scroll-trigger')?.kill();
    };
  }, [prefersReducedMotion, isLoaded]);

  const handleChapterClick = (chapterNum: number) => {
    const st = ScrollTrigger.getById('hero-scroll-trigger');
    if (!st) return;

    const totalDistance = st.end - st.start;
    let targetProgress = 0;
    if (chapterNum === 1) targetProgress = 0;
    else if (chapterNum === 2) targetProgress = 0.44;
    else if (chapterNum === 3) targetProgress = 0.80;

    const targetY = st.start + totalDistance * targetProgress;
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(targetY, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handleSkipIntro = () => {
    const st = ScrollTrigger.getById('hero-scroll-trigger');
    if (st) {
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(st.end + 20, { duration: 0.8 });
      } else {
        window.scrollTo({ top: st.end + 20, behavior: 'smooth' });
      }
    } else {
      const target = document.getElementById('key-stats') || document.getElementById('projects');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight * 2.2, behavior: 'smooth' });
      }
    }
  };

  const handleConsultationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onScheduleConsultation) {
      onScheduleConsultation();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#071322] text-[#F3F4F6] overflow-hidden select-none z-20"
    >
      {/* 1. Video Frame Sequence HTML5 Canvas (Hardware accelerated) */}
      <div className="absolute inset-0 z-0">
        <ImageSequenceCanvas
          ref={canvasRef}
          totalFrames={120}
          framePrefix="/frames/frame_"
          frameExtension=".webp"
          onLoadProgress={handleLoadProgress}
          onLoaded={handleFrameLoaded}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Seamless Cinematic Vignette (100% unobstructed view of building) */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: 'linear-gradient(to bottom, rgba(7, 19, 34, 0.65) 0%, transparent 20%, transparent 75%, #071322 100%)',
        }}
      />

      {/* 3. Floating Smokey Clouds & Atmospheric Fog (Active on 1st screen, evaporates on scroll) */}
      <FloatingSmokeClouds
        scrollProgress={scrollProgress}
        className="z-[3]"
      />

      {/* 5. Preloader & Buffering HUD */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-[#071322] flex flex-col items-center justify-center gap-6 px-4 transition-opacity duration-500">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-[#F59E0B] animate-spin" />
            <span className="absolute font-mono text-xs font-bold text-[#F59E0B] tracking-wider">
              {loadPercent}%
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="font-mono text-xs text-[#9CA3AF] tracking-[0.25em] uppercase">
              Initializing Cinematic Experience
            </span>
            <span className="text-sm font-semibold text-white/90">
              SISMN LLC Architectural &amp; Engineering
            </span>
          </div>
        </div>
      )}

      {/* 6. Pinned Overlay Content Container */}
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 pointer-events-none">
        
        {/* Center Stage: 3 Choreographed Story Chapters */}
        <div className="relative w-full my-auto">

          {/* ─────────────────────────────────────────────────────────────
              CHAPTER 1: STRUCTURAL GENESIS & VISION (0% - 28%)
          ───────────────────────────────────────────────────────────── */}
          <div className="w-full pointer-events-none">
            {/* Left Content - Pure Floating Text with Zero Obstructive Boxes */}
            <div
              ref={ch1Ref}
              className="w-full max-w-2xl lg:max-w-3xl flex flex-col gap-4 sm:gap-6 text-left pointer-events-auto"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="inline-flex items-center gap-2.5 bg-[#071322]/90 px-3.5 py-1.5 rounded-full border border-white/20 w-fit shadow-xl transform-gpu [backface-visibility:hidden]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#F59E0B] font-bold">
                  Integrated Development &amp; Engineering
                </span>
              </div>

              <h1 className="font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                Design &amp; Build <br />
                <span className="text-[#F59E0B]">
                  Excellence
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-normal">
                From subterranean geotechnical foundations to iconic commercial envelopes, SISMN LLC provides comprehensive
                Architectural &amp; Structural Engineering, Real Estate Development, and Construction Management
                across Texas and 250+ cities nationwide.
              </p>

              {/* Action Buttons with load entrance & scroll choreography */}
              <div
                ref={ch1BtnsRef}
                className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4 pointer-events-auto"
                style={{ willChange: 'transform, opacity' }}
              >
                <a
                  href="#projects"
                  className="inline-flex items-center gap-3 bg-[#F59E0B] text-[#071322] hover:bg-[#d97706] transition-all px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-black/60 hover:-translate-y-0.5 group cursor-pointer active:translate-y-0"
                >
                  <span>Explore Our Projects</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#contact"
                  onClick={handleConsultationClick}
                  className="inline-flex items-center gap-3 bg-[#0B1C30] hover:bg-[#132840] text-white transition-all px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/30 hover:border-white/60 hover:-translate-y-0.5 shadow-2xl shadow-black/60 group cursor-pointer active:translate-y-0"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B] transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CHAPTER 2: TRANSFORMATION & PRECISION MODERNITY (28% - 68%)
          ───────────────────────────────────────────────────────────── */}
          <div className="absolute inset-0 w-full flex items-center justify-end pointer-events-none">
            {/* Editorial Narrative (Right Side) - Unobstructed Floating Text */}
            <div
              ref={ch2Ref}
              className="w-full max-w-2xl lg:max-w-2xl flex flex-col gap-4 sm:gap-5 text-left pointer-events-none ml-auto"
              style={{ willChange: 'transform, opacity', opacity: 0 }}
            >
              <div className="inline-flex items-center gap-2.5 bg-[#071322]/90 px-3.5 py-1.5 rounded-full border border-white/20 w-fit shadow-xl transform-gpu [backface-visibility:hidden]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#F59E0B] font-bold">
                  From Conception to Occupancy
                </span>
              </div>

              <h2 className="font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                Precision In <br />
                <span className="text-[#F59E0B]">
                  Every Detail
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-normal">
                As physical form takes shape, our cross-disciplinary architects and licensed professional engineers
                synchronize structural framing, mechanical life-safety, and interior finishes without handover friction.
              </p>

              <div className="pt-2 sm:pt-4 pointer-events-auto">
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2.5 bg-[#071322]/90 hover:bg-[#071322] px-5 py-2.5 rounded-full border border-white/25 text-[#F59E0B] hover:text-white font-mono text-xs sm:text-sm uppercase tracking-wider transition-all group shadow-xl cursor-pointer"
                >
                  <span>Explore Engineering Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CHAPTER 3: SISMN LLC BRAND CULMINATION (68% - 100%)
          ───────────────────────────────────────────────────────────── */}
          <div className="absolute inset-0 w-full flex items-center pointer-events-none">
            {/* Brand Authority Container */}
            <div
              ref={ch3Ref}
              className="w-full max-w-2xl lg:max-w-3xl flex flex-col gap-4 sm:gap-5 text-left pointer-events-none"
            >
              {/* Text Group (Badge, Headline, Paragraph) - Appears FIRST */}
              <div
                ref={ch3TextRef}
                className="flex flex-col gap-4 sm:gap-5 pointer-events-none"
                style={{ willChange: 'transform, opacity', opacity: 0 }}
              >
                <div className="inline-flex items-center gap-2.5 bg-[#071322]/90 px-3.5 py-1.5 rounded-full border border-white/20 w-fit shadow-xl transform-gpu [backface-visibility:hidden]">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
                  <span className="font-mono text-[11px] sm:text-sm uppercase tracking-widest text-[#F59E0B] font-bold">
                    The SISMN Standard
                  </span>
                </div>

                <h2 className="font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,1)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Shaping Tomorrow’s <br />
                  <span className="text-[#F59E0B]">
                    Skyline Today
                  </span>
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-gray-100 max-w-xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,1)] font-normal">
                  Partner with an accredited firm that bridges visionary architecture with rock-solid structural execution across Texas and nationwide.
                </p>
              </div>

              {/* Action Buttons Group - Appears SECOND after text is established */}
              <div
                ref={ch3BtnsRef}
                className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4 pointer-events-auto"
                style={{ willChange: 'transform, opacity', opacity: 0 }}
              >
                <a
                  href="#contact"
                  onClick={handleConsultationClick}
                  className="inline-flex items-center gap-2.5 bg-[#F59E0B] text-[#071322] hover:bg-[#d97706] transition-all px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-black/60 hover:-translate-y-0.5 cursor-pointer group active:translate-y-0"
                >
                  <span>Initiate Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href={`tel:${COMPANY_INFO.contact.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-2.5 bg-[#0B1C30] hover:bg-[#132840] text-white transition-all px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-mono text-xs sm:text-sm uppercase tracking-wider border border-white/30 hover:border-white/60 hover:-translate-y-0.5 group active:translate-y-0 shadow-2xl shadow-black/60 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#F59E0B] transition-transform duration-300 group-hover:scale-110" />
                  <span>{COMPANY_INFO.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Interactive HUD Bar & Scrub Indicator */}
        <div className="w-full flex flex-col gap-2.5 pointer-events-auto border-white/10 pt-3 sm:pt-4">
          {/* Subtle Ambient Timeline Progress Bar */}
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-[#F59E0B] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(245,158,11,0.5)]"
              style={{ width: `${Math.min(100, Math.max(0, Math.round(scrollProgress * 100)))}%` }}
            />
          </div>

          <div className="w-full flex items-center justify-between gap-4">
            {/* Chapter Indicator */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="font-mono text-[11px] sm:text-xs text-[#F59E0B] font-bold tracking-widest uppercase">
                ACT 0{currentChapter} <span className="text-gray-500 font-normal">/ 03</span>
              </span>
              <div className="hidden sm:flex items-center gap-1.5">
                {[1, 2, 3].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => handleChapterClick(step)}
                    aria-label={`Go to Act ${step}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentChapter === step
                        ? 'w-6 bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Center Scroll Prompt */}
            <div className="flex items-center gap-2 text-gray-300 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
              <span>{scrollProgress > 0.92 ? 'Continue Scrolling' : 'Scroll to Explore Sequence'}</span>
              <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#F59E0B] animate-bounce" />
            </div>

            {/* Skip Intro Button */}
            <button
              type="button"
              onClick={handleSkipIntro}
              className="text-[11px] sm:text-xs font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded hover:bg-white/5 cursor-pointer"
            >
              Skip Intro
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

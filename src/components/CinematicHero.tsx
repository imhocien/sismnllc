import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageSequenceCanvas, ImageSequenceCanvasHandle } from './ImageSequenceCanvas';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<ImageSequenceCanvasHandle>(null);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // 7 Story Chapter DOM Refs
  const ch1Ref = useRef<HTMLDivElement>(null);
  const ch2Ref = useRef<HTMLDivElement>(null);
  const ch3Ref = useRef<HTMLDivElement>(null);
  const ch4Ref = useRef<HTMLDivElement>(null);
  const ch5Ref = useRef<HTMLDivElement>(null);
  const ch6Ref = useRef<HTMLDivElement>(null);
  const ch7Ref = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Safety fallback: ensure experience unlocks within 1.8s even on slow connections
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      ScrollTrigger.refresh();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const totalFrames = 120;
    const ctx = gsap.context(() => {
      const frameObj = { frame: 0 };

      // Master 800vh Pinned Scrub Timeline (Apple-Style Long Scroll Storytelling)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=800%', // 800vh long scroll distance for cinematic pacing
          pin: true,
          scrub: 1.0, // Smooth weighted scrub
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const targetFrame = p * (totalFrames - 1);
            if (canvasRef.current) {
              canvasRef.current.renderSubFrame(targetFrame);
            }
          },
        },
      });

      // 1. Frame progression across entire 800vh timeline
      tl.to(frameObj, {
        frame: totalFrames - 1,
        ease: 'none',
        duration: 10,
      }, 0);

      // ==========================================
      // CHAPTER 1 — INTRODUCTION (0% to 12%)
      // Text: "WE BUILD WHAT COMES NEXT."
      // ==========================================
      tl.fromTo(ch1Ref.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
        0.02
      );
      tl.to(ch1Ref.current,
        { opacity: 0, y: -30, filter: 'blur(6px)', duration: 0.4, ease: 'power2.in' },
        0.09
      );

      // ==========================================
      // CHAPTER 2 — FOUNDATION (12% to 25%)
      // Text: "EVERYTHING STARTS WITH A STRONG FOUNDATION."
      // ==========================================
      tl.fromTo(ch2Ref.current,
        { opacity: 0, x: -50, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
        0.13
      );
      tl.to(ch2Ref.current,
        { opacity: 0, x: -30, filter: 'blur(6px)', duration: 0.4, ease: 'power2.in' },
        0.22
      );

      // ==========================================
      // CHAPTER 3 — STRUCTURE (25% to 45%)
      // Text: "ENGINEERED FOR STRENGTH."
      // ==========================================
      tl.fromTo(ch3Ref.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
        0.26
      );
      tl.to(ch3Ref.current,
        { opacity: 0, y: -40, filter: 'blur(6px)', duration: 0.6, ease: 'power2.in' },
        0.41
      );

      // ==========================================
      // CHAPTER 4 — ARCHITECTURE (45% to 65%)
      // Text: "WHERE ENGINEERING BECOMES ARCHITECTURE."
      // ==========================================
      tl.fromTo(ch4Ref.current,
        { opacity: 0, x: 50, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
        0.46
      );
      tl.to(ch4Ref.current,
        { opacity: 0, x: 30, filter: 'blur(6px)', duration: 0.6, ease: 'power2.in' },
        0.61
      );

      // ==========================================
      // CHAPTER 5 — DETAIL (65% to 80%)
      // Text: "PRECISION IN EVERY DETAIL."
      // ==========================================
      tl.fromTo(ch5Ref.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
        0.66
      );
      tl.to(ch5Ref.current,
        { opacity: 0, y: -30, filter: 'blur(6px)', duration: 0.5, ease: 'power2.in' },
        0.77
      );

      // ==========================================
      // CHAPTER 6 — COMPLETION (80% to 94%)
      // Text: "BUILT TO LAST."
      // ==========================================
      tl.fromTo(ch6Ref.current,
        { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
        0.81
      );
      tl.to(ch6Ref.current,
        { opacity: 0, scale: 1.04, filter: 'blur(6px)', duration: 0.4, ease: 'power2.in' },
        0.91
      );

      // ==========================================
      // CHAPTER 7 — FINAL REVEAL (94% to 100%)
      // Text: "BUILDING TOMORROW." + CTA
      // ==========================================
      tl.fromTo(ch7Ref.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' },
        0.94
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion, isLoaded]);

  return (
    <div className="relative w-full bg-slate-50 text-slate-900">
      {/* 1. Apple-Style Luxury Loader */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900 select-none transition-opacity duration-1000">
          <div className="max-w-xs w-full flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6 backdrop-blur-xl">
              <Sparkles className="w-6 h-6 text-amber-600 animate-pulse" />
            </div>

            <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-mono mb-2">
              PREPARING THE BUILD
            </div>

            <div className="text-xl font-bold tracking-tight text-slate-950 mb-6">
              SISMN <span className="font-light text-amber-600">ENGINEERING</span>
            </div>

            {/* Minimal Progress Bar */}
            <div className="w-full h-[2px] bg-slate-200 rounded-full overflow-hidden mb-3 relative">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300 ease-out"
                style={{ width: `${loadPercent}%` }}
              />
            </div>

            <div className="text-[10px] font-mono text-slate-500 tracking-wider mb-4">
              LOADING EXPERIENCE {loadPercent}%
            </div>

            <button
              onClick={() => setIsLoaded(true)}
              className="text-[11px] font-mono uppercase tracking-widest text-amber-700 hover:text-amber-800 py-1.5 px-4 rounded-full border border-amber-300 bg-amber-50 transition-all pointer-events-auto cursor-pointer"
            >
              Enter Site &rarr;
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Pinned 100vw x 100vh Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center select-none"
      >
        {/* Responsive Canvas Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <ImageSequenceCanvas
            ref={canvasRef}
            totalFrames={120}
            framePrefix="/frames/frame_"
            frameExtension=".webp"
            onLoadProgress={(p) => setLoadPercent(p)}
            onLoaded={() => setIsLoaded(true)}
            className="w-full h-full"
          />
        </div>

        {/* Subtle Atmospheric Vignette (Edges Only) */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10 opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-10" />

        {/* 3. Editorial Storytelling Chapters (Positioned to Let Building Shine) */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between py-24 pointer-events-none">
          {/* CHAPTER 1: INTRODUCTION (0% - 12%) - Centered Architectural Frosted Card */}
          <div
            ref={ch1Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 py-8 sm:py-12 px-6 sm:px-14 rounded-3xl shadow-2xl max-w-4xl mx-auto flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.35em] text-amber-700 font-mono mb-4 font-bold">
                AEC INNOVATION &amp; INFRASTRUCTURE
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-none uppercase">
                WE BUILD WHAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
                  COMES NEXT.
                </span>
              </h1>
            </div>
          </div>

          {/* CHAPTER 2: FOUNDATION (12% - 25%) - Lower-Left Flank */}
          <div
            ref={ch2Ref}
            className="absolute bottom-24 left-6 sm:left-12 lg:left-16 max-w-md text-left opacity-0"
          >
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-2xl">
              <span className="text-[11px] font-mono text-amber-700 uppercase tracking-widest block mb-2 font-bold">
                01 // FOUNDATION
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight uppercase leading-snug">
                EVERYTHING STARTS WITH A STRONG FOUNDATION.
              </h2>
            </div>
          </div>

          {/* CHAPTER 3: STRUCTURE (25% - 45%) - Upper-Right Flank */}
          <div
            ref={ch3Ref}
            className="absolute top-28 right-6 sm:right-12 lg:right-16 max-w-md text-right opacity-0"
          >
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-2xl">
              <span className="text-[11px] font-mono text-amber-700 uppercase tracking-widest block mb-2 font-bold">
                02 // SUPERSTRUCTURE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight uppercase leading-snug">
                ENGINEERED FOR STRENGTH.
              </h2>
            </div>
          </div>

          {/* CHAPTER 4: ARCHITECTURE (45% - 65%) - Mid-Left Flank */}
          <div
            ref={ch4Ref}
            className="absolute top-1/3 left-6 sm:left-12 lg:left-16 max-w-lg text-left opacity-0"
          >
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-2xl">
              <span className="text-[11px] font-mono text-amber-700 uppercase tracking-widest block mb-2 font-bold">
                03 // ENCLOSURE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight uppercase leading-snug">
                WHERE ENGINEERING BECOMES ARCHITECTURE.
              </h2>
            </div>
          </div>

          {/* CHAPTER 5: DETAIL (65% - 80%) - Lower-Right Flank (Visual Pause) */}
          <div
            ref={ch5Ref}
            className="absolute bottom-24 right-6 sm:right-12 lg:right-16 max-w-md text-right opacity-0"
          >
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-2xl">
              <span className="text-[11px] font-mono text-amber-700 uppercase tracking-widest block mb-2 font-bold">
                04 // CRAFTSMANSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight uppercase leading-snug mb-2">
                PRECISION IN EVERY DETAIL.
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-normal">
                Designed with zero tolerance for compromise.
              </p>
            </div>
          </div>

          {/* CHAPTER 6: COMPLETION (80% - 94%) - Centered Grand Statement */}
          <div
            ref={ch6Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 px-4"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 py-8 sm:py-12 px-6 sm:px-14 rounded-3xl shadow-2xl max-w-3xl mx-auto flex flex-col items-center">
              <span className="text-xs font-mono text-emerald-700 tracking-[0.3em] uppercase mb-4 font-bold">
                TURNOVER &amp; COMMISSIONING
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight uppercase">
                BUILT TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">LAST.</span>
              </h2>
            </div>
          </div>

          {/* CHAPTER 7: FINAL REVEAL & CTA (94% - 100%) */}
          <div
            ref={ch7Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 px-4 pointer-events-auto"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 py-8 sm:py-12 px-6 sm:px-14 rounded-3xl shadow-2xl max-w-3xl mx-auto flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-mono mb-4 font-bold">
                TURNKEY ARCHITECTURE &amp; CONSTRUCTION
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight uppercase mb-8">
                BUILDING <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">TOMORROW.</span>
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md shadow-amber-500/20 hover:scale-105"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects"
                  className="flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-4 rounded-xl text-sm border border-slate-300 shadow-sm transition-all hover:border-slate-400"
                >
                  <span>EXPLORE DEVELOPMENTS</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Gentle Scroll Indicator */}
          <div className="flex items-center justify-center w-full pb-4 mt-auto">
            <div className="flex items-center gap-2 text-slate-700 text-[11px] font-mono tracking-widest font-semibold bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/90 shadow-md">
              <span>SCROLL TO EXPLORE TRANSFORMATION</span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

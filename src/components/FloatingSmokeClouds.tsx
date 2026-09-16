import React, { useEffect, useRef } from 'react';

interface FloatingSmokeCloudsProps {
  scrollProgress: number; // 0 to 1
  className?: string;
}

interface CloudInstance {
  imgIndex: number;
  x: number;
  y: number;
  baseY: number;
  width: number;
  height: number;
  speedX: number;
  vyAmp: number;
  vyFreq: number;
  scaleFreq: number;
  phase: number;
  baseAlpha: number;
  rotation: number;
  rotSpeed: number;
  tint: 'cool' | 'warm' | 'white';
}

export const FloatingSmokeClouds: React.FC<FloatingSmokeCloudsProps> = ({
  scrollProgress,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const cloudsRef = useRef<CloudInstance[]>([]);
  const isVisibleRef = useRef<boolean>(true);

  // Dissipation calculation: visible at 0, evaporated by 0.15
  const dissipationThreshold = 0.15;
  const progressRatio = Math.min(1, Math.max(0, scrollProgress / dissipationThreshold));
  const masterAlpha = Math.max(0, 1 - Math.pow(progressRatio, 1.25));
  const translateY = -progressRatio * 90; // Upward thermal dissipation
  const scale = 1 + progressRatio * 0.12; // Expansion as mist diffuses
  const blurAmount = progressRatio * 14;

  const isHidden = masterAlpha <= 0.005;
  isVisibleRef.current = !isHidden;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Preload cloud sprite images
    const cloudImgs: HTMLImageElement[] = [];
    const srcList = ['/images/clouds/cloud1.png', '/images/clouds/cloud2.png'];
    let loadedCount = 0;

    srcList.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
      };
      img.src = src;
      cloudImgs.push(img);
    });

    // Generate 7-10 majestic, volumetric cloud layers
    const count = width < 768 ? 6 : 9;
    const clouds: CloudInstance[] = [];

    for (let i = 0; i < count; i++) {
      const imgIndex = i % 2;
      const isWide = imgIndex === 1;
      // Dimensions: big, billowing, cinematic
      const baseW = isWide
        ? (width < 768 ? 550 : 850) + Math.random() * (width < 768 ? 200 : 350)
        : (width < 768 ? 420 : 650) + Math.random() * (width < 768 ? 180 : 280);
      const aspect = isWide ? 16 / 9 : 1;
      const baseH = baseW / aspect;

      // Position: focused on lower-middle horizon and foundation mist
      const yNorm = 0.32 + (i / count) * 0.48;
      const baseY = yNorm * height - baseH * 0.4;
      const x = -150 + ((i + Math.random() * 0.5) / count) * (width + 300);

      // Speed: slow majestic drift
      const speedX = (Math.random() * 0.28 + 0.1) * (i % 3 === 0 ? -0.7 : 1);

      // Tint: warm amber near worklights, cool blue-white across the rest
      let tint: CloudInstance['tint'] = 'white';
      if (i % 4 === 1) tint = 'warm';
      else if (i % 3 === 0) tint = 'cool';

      clouds.push({
        imgIndex,
        x,
        y: baseY,
        baseY,
        width: baseW,
        height: baseH,
        speedX,
        vyAmp: 8 + Math.random() * 14,
        vyFreq: 0.0005 + Math.random() * 0.0005,
        scaleFreq: 0.0005 + Math.random() * 0.0005,
        phase: Math.random() * Math.PI * 2,
        baseAlpha: tint === 'warm' ? 0.20 + Math.random() * 0.14 : 0.22 + Math.random() * 0.16,
        rotation: (Math.random() - 0.5) * 0.08,
        rotSpeed: (Math.random() - 0.5) * 0.0002,
        tint,
      });
    }

    cloudsRef.current = clouds;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();

    const render = (time: number) => {
      // Pause drawing when scrolled away to save 100% CPU/GPU
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min(40, time - lastTime);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Only draw if images are ready
      if (loadedCount >= 1) {
        for (let i = 0; i < clouds.length; i++) {
          const c = clouds[i];
          const img = cloudImgs[c.imgIndex];
          if (!img || !img.complete || img.naturalWidth === 0) continue;

          // Horizontal drift with wrapping
          c.x += c.speedX * (dt / 16.67);
          if (c.x > width + c.width * 0.5) c.x = -c.width * 0.5;
          if (c.x < -c.width * 0.5) c.x = width + c.width * 0.5;

          // Vertical undulating thermal motion
          c.y = c.baseY + Math.sin(time * c.vyFreq + c.phase) * c.vyAmp;

          // Gentle breathing pulsation
          const breath = 1 + 0.06 * Math.sin(time * c.scaleFreq + c.phase);
          const drawW = c.width * breath;
          const drawH = c.height * breath;

          c.rotation += c.rotSpeed;

          ctx.save();
          ctx.translate(c.x + drawW * 0.5, c.y + drawH * 0.5);
          ctx.rotate(c.rotation);

          if (c.tint === 'warm') {
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = c.baseAlpha * 0.7;
          } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = c.baseAlpha;
          }

          ctx.drawImage(img, -drawW * 0.5, -drawH * 0.5, drawW, drawH);

          // If warm tint, add a subtle golden overlay pass
          if (c.tint === 'warm') {
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
            ctx.beginPath();
            ctx.arc(0, 0, drawW * 0.35, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-all duration-300 ease-out ${className}`}
      style={{
        opacity: masterAlpha,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : 'none',
        visibility: isHidden ? 'hidden' : 'visible',
        willChange: 'opacity, transform, filter',
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
};

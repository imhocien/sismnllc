import { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';

export interface ImageSequenceCanvasHandle {
  renderFrame: (index: number) => void;
  renderSubFrame: (frameProgress: number) => void;
  getCurrentIndex: () => number;
  getTotalFrames: () => number;
}

interface ImageSequenceCanvasProps {
  totalFrames: number;
  framePrefix?: string;
  frameExtension?: string;
  onLoadProgress?: (percentage: number) => void;
  onLoaded?: () => void;
  className?: string;
}

export const ImageSequenceCanvas = forwardRef<ImageSequenceCanvasHandle, ImageSequenceCanvasProps>(({
  totalFrames = 120,
  framePrefix = '/frames/frame_',
  frameExtension = '.webp',
  onLoadProgress,
  onLoaded,
  className = '',
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const getFramePath = useCallback((index: number) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `${framePrefix}${frameNum}${frameExtension}`;
  }, [framePrefix, frameExtension]);

  // Dual-buffer sub-frame interpolation for buttery 120Hz smooth scrubbing
  const drawInterpolatedFrame = useCallback((frameProgress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const clampedProgress = Math.max(0, Math.min(totalFrames - 1, frameProgress));
    const baseIndex = Math.floor(clampedProgress);
    const nextIndex = Math.min(totalFrames - 1, baseIndex + 1);
    const subAlpha = clampedProgress - baseIndex;

    const img1 = imagesRef.current[baseIndex] || imagesRef.current[Math.round(clampedProgress)];
    const img2 = imagesRef.current[nextIndex];

    if (!img1 || !img1.complete) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calculate aspect ratio cover
    const canvasRatio = displayWidth / displayHeight;
    const imgRatio = (img1.naturalWidth || 1920) / (img1.naturalHeight || 1080);

    let drawWidth = displayWidth;
    let drawHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = displayWidth / imgRatio;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw primary base frame at full opacity
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img1, offsetX, offsetY, drawWidth, drawHeight);

    // Sub-frame crossfade for ultra-smooth 120Hz scrubbing between frames
    if (subAlpha > 0.01 && img2 && img2.complete && nextIndex !== baseIndex) {
      ctx.globalAlpha = subAlpha;
      ctx.drawImage(img2, offsetX, offsetY, drawWidth, drawHeight);
    }

    ctx.restore();
  }, [totalFrames]);

  const rafIdRef = useRef<number | null>(null);
  const pendingFrameRef = useRef<number>(0);

  // Imperative handle for GSAP ScrollTrigger
  useImperativeHandle(ref, () => ({
    renderFrame: (index: number) => {
      pendingFrameRef.current = index;
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          drawInterpolatedFrame(pendingFrameRef.current);
        });
      }
    },
    renderSubFrame: (frameProgress: number) => {
      pendingFrameRef.current = frameProgress;
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          drawInterpolatedFrame(pendingFrameRef.current);
        });
      }
    },
    getCurrentIndex: () => Math.round(pendingFrameRef.current),
    getTotalFrames: () => totalFrames,
  }), [totalFrames, drawInterpolatedFrame]);

  const onLoadProgressRef = useRef(onLoadProgress);
  const onLoadedRef = useRef(onLoaded);
  const isLoadedNotifiedRef = useRef(false);

  useEffect(() => {
    onLoadProgressRef.current = onLoadProgress;
    onLoadedRef.current = onLoaded;
  });

  const drawFrameRef = useRef(drawInterpolatedFrame);
  useEffect(() => {
    drawFrameRef.current = drawInterpolatedFrame;
  }, [drawInterpolatedFrame]);

  // Preload Image Sequence with progressive loading
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    const criticalThreshold = Math.min(8, totalFrames);

    const notifyLoadedOnce = () => {
      if (!isLoadedNotifiedRef.current) {
        isLoadedNotifiedRef.current = true;
        if (onLoadedRef.current) {
          onLoadedRef.current();
        }
      }
    };

    // Safety fallback: allow interaction after max 1.5s even on slow connections
    const fallbackTimer = setTimeout(() => {
      if (!isCancelled) {
        notifyLoadedOnce();
      }
    }, 1500);

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        if (isCancelled) return;
        loadedCount++;
        const percent = Math.round((loadedCount / totalFrames) * 100);
        if (onLoadProgressRef.current) {
          onLoadProgressRef.current(percent);
        }

        // Draw initial frame as soon as frame 0 is ready
        if (i === 0) {
          drawFrameRef.current(0);
        }

        // Fast reveal: unlock site as soon as critical threshold of frames is reached
        if (loadedCount >= criticalThreshold) {
          notifyLoadedOnce();
        }

        if (loadedCount >= totalFrames) {
          notifyLoadedOnce();
        }
      };

      img.onerror = () => {
        if (isCancelled) return;
        loadedCount++;
        const percent = Math.round((loadedCount / totalFrames) * 100);
        if (onLoadProgressRef.current) {
          onLoadProgressRef.current(percent);
        }
        if (loadedCount >= criticalThreshold) {
          notifyLoadedOnce();
        }
        if (loadedCount >= totalFrames) {
          notifyLoadedOnce();
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, [totalFrames, getFramePath]);

  // Handle Resize & RAF unmount cleanup
  useEffect(() => {
    const handleResize = () => {
      drawInterpolatedFrame(pendingFrameRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [drawInterpolatedFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block select-none pointer-events-none ${className}`}
    />
  );
});

ImageSequenceCanvas.displayName = 'ImageSequenceCanvas';

import React, { useEffect, useRef } from 'react';

interface ArchitecturalBackgroundProps {
  className?: string;
  intensity?: number;
}

export const ArchitecturalBackground: React.FC<ArchitecturalBackgroundProps> = ({
  className = '',
  intensity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes definition
    const nodeCount = Math.floor(Math.min(width, 1920) / 45 * intensity);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.3 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const maxDist = 130;
      const mouseMaxDist = 180;

      // Draw subtle connections between nearby nodes
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Move node
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Wrap edges
        if (nodeA.x < 0) nodeA.x = width;
        if (nodeA.x > width) nodeA.x = 0;
        if (nodeA.y < 0) nodeA.y = height;
        if (nodeA.y > height) nodeA.y = 0;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }

        // Mouse interaction line
        const mdx = nodeA.x - mouseRef.current.x;
        const mdy = nodeA.y - mouseRef.current.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouseMaxDist) {
          const mAlpha = (1 - mDist / mouseMaxDist) * 0.4;
          ctx.strokeStyle = `rgba(180, 83, 9, ${mAlpha})`;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }

        // Draw node dot
        const currentAlpha = nodeA.baseAlpha + Math.sin(time * nodeA.pulseSpeed + nodeA.pulseOffset) * 0.15;
        ctx.fillStyle = `rgba(217, 119, 6, ${Math.max(0.1, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw subtle horizontal laser scanline traveling down
      const scanY = (time * 35) % (height + 200) - 100;
      if (scanY > 0 && scanY < height) {
        const scanGrad = ctx.createLinearGradient(0, scanY, width, scanY);
        scanGrad.addColorStop(0, 'rgba(217, 119, 6, 0)');
        scanGrad.addColorStop(0.3, 'rgba(217, 119, 6, 0.08)');
        scanGrad.addColorStop(0.7, 'rgba(217, 119, 6, 0.14)');
        scanGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');

        ctx.strokeStyle = scanGrad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 opacity-25 ${className}`}
    />
  );
};

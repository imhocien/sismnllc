import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroOverlayProps {
  scrollProgress: number; // 0 to 1
  className?: string;
}

export const ThreeHeroOverlay: React.FC<ThreeHeroOverlayProps> = ({
  scrollProgress,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 50;

    // WebGL Renderer with transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 1. Floating Architectural Dust / Luminous Amber Particles
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      opacities[i] = Math.random() * 0.7 + 0.3;
      scales[i] = Math.random() * 2.0 + 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material with amber golden glow
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#F59E0B'),
      size: 1.6,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 2. 3D Architectural Blueprint Bounding Wireframe Cubes (BIM Spatial Coordinates)
    const wireframesGroup = new THREE.Group();
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const wireframeGeometry = new THREE.WireframeGeometry(boxGeometry);

    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8, // architectural cyan
      transparent: true,
      opacity: 0.18,
    });

    const cube1 = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube1.position.set(-35, 12, -20);
    wireframesGroup.add(cube1);

    const cube2 = new THREE.LineSegments(
      wireframeGeometry,
      new THREE.LineBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.15 })
    );
    cube2.position.set(38, -10, -10);
    cube2.scale.set(1.4, 0.9, 1.2);
    wireframesGroup.add(cube2);

    scene.add(wireframesGroup);

    // 3. Subtle Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('resize', handleResize);

    // Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let totalElapsedTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      totalElapsedTime += delta;

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Camera parallax based on mouse and scroll
      const progress = scrollProgressRef.current;
      camera.position.x = mouseX * 4;
      camera.position.y = -mouseY * 3;
      camera.position.z = 50 - progress * 25;

      // Rotate particles subtly
      particles.rotation.y = totalElapsedTime * 0.03 + progress * 0.5;
      particles.rotation.x = mouseX * 0.1;

      // Slowly rotate 3D wireframe coordinate boxes
      cube1.rotation.x = totalElapsedTime * 0.15;
      cube1.rotation.y = totalElapsedTime * 0.2 + progress;
      cube2.rotation.y = -totalElapsedTime * 0.12 - progress * 0.8;
      cube2.rotation.z = totalElapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      boxGeometry.dispose();
      wireframeGeometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-[2] overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};

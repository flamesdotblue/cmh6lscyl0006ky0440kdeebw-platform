import { useEffect, useRef } from 'react';

export default function BackgroundFX() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const isReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    resize();

    // Particle setup
    const baseDensity = isMobile ? 24000 : 16000; // bigger number = fewer particles
    const minCount = isMobile ? 22 : 40;
    const maxCount = isMobile ? 70 : 140;
    const PARTICLE_COUNT = Math.max(minCount, Math.min(maxCount, Math.floor((width * height) / baseDensity)));

    const particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height, isMobile));

    function createParticle(w, h, mobile) {
      const speed = mobile ? 0.08 + Math.random() * 0.22 : 0.12 + Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      const size = mobile ? 1 + Math.random() * 1.8 : 1 + Math.random() * 2.2;
      const hue = 45 + Math.random() * 25; // yellow range
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        hue,
      };
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      // soft vignette/spotlight
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        Math.min(width, height) * 0.15,
        width * 0.5,
        height * 0.35,
        Math.max(width, height)
      );
      gradient.addColorStop(0, 'rgba(250, 204, 21, 0.06)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 95%, 58%, ${isMobile ? 0.28 : 0.22})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // linking lines (desktop only for performance/clarity)
      if (!isMobile) {
        const maxDist = 130;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 < maxDist * maxDist) {
              const alpha = 0.085 * (1 - Math.sqrt(dist2) / maxDist);
              ctx.strokeStyle = `rgba(250, 204, 21, ${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    }

    // Start loop unless reduced motion
    if (!isReduced) {
      rafRef.current = requestAnimationFrame(step);
    }

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Fallback animated gradient (visible on mobile + desktop) */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 animate-[drift_18s_linear_infinite] bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(250,204,21,0.08),transparent_60%),radial-gradient(800px_500px_at_80%_70%,rgba(250,204,21,0.06),transparent_60%)]" />
      </div>

      {/* Subtle animated grid for depth */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:64px_64px] animate-[gridShift_22s_ease-in-out_infinite]" />
      </div>

      {/* Floating yellow blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-2xl opacity-30 animate-[floatA_16s_ease-in-out_infinite]" style={{background:'radial-gradient(closest-side, rgba(250,204,21,0.18), rgba(250,204,21,0) 70%)'}} />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full blur-2xl opacity-25 animate-[floatB_20s_ease-in-out_infinite]" style={{background:'radial-gradient(closest-side, rgba(250,204,21,0.16), rgba(250,204,21,0) 70%)'}} />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full blur-2xl opacity-20 animate-[floatC_18s_ease-in-out_infinite]" style={{background:'radial-gradient(closest-side, rgba(250,204,21,0.14), rgba(250,204,21,0) 70%)'}} />

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <style>{`
        @keyframes drift {
          0% { background-position: 0px 0px, 0px 0px; }
          50% { background-position: 80px 40px, -60px -30px; }
          100% { background-position: 0px 0px, 0px 0px; }
        }
        @keyframes gridShift {
          0% { background-position: 0px 0px, 0px 0px; }
          50% { background-position: 32px 32px, 32px 32px; }
          100% { background-position: 0px 0px, 0px 0px; }
        }
        @keyframes floatA {
          0% { transform: translate3d(0,0,0) rotate(0deg); }
          50% { transform: translate3d(24px,-18px,0) rotate(10deg); }
          100% { transform: translate3d(0,0,0) rotate(0deg); }
        }
        @keyframes floatB {
          0% { transform: translate3d(0,0,0) rotate(0deg); }
          50% { transform: translate3d(-28px,22px,0) rotate(-8deg); }
          100% { transform: translate3d(0,0,0) rotate(0deg); }
        }
        @keyframes floatC {
          0% { transform: translate3d(0,0,0) rotate(0deg); }
          50% { transform: translate3d(18px,16px,0) rotate(6deg); }
          100% { transform: translate3d(0,0,0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

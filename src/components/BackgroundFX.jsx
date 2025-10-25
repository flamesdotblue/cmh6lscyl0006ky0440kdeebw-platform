import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

// Full-screen background effects: animated particles + subtle moving gradient glows
export default function BackgroundFX() {
  const canvasRef = useRef(null);
  const controls = useAnimationControls();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    ctx.scale(DPR, DPR);

    const PARTICLE_COUNT = Math.min(120, Math.floor((width * height) / 16000));
    const particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height));

    function createParticle(w, h) {
      const speed = 0.15 + Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      const size = 1 + Math.random() * 2;
      const hue = 50 + Math.random() * 20; // yellow range
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        hue,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // subtle vignette
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        Math.min(width, height) * 0.1,
        width * 0.5,
        height * 0.3,
        Math.max(width, height)
      );
      gradient.addColorStop(0, 'rgba(250, 204, 21, 0.03)'); // yellow-400/5
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // wrap around
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // draw particle
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 95%, 60%, 0.25)`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // connecting lines (short range)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          const maxDist = 130;
          if (dist2 < maxDist * maxDist) {
            const alpha = 0.08 * (1 - Math.sqrt(dist2) / maxDist);
            ctx.strokeStyle = `rgba(250, 204, 21, ${alpha})`; // yellow-400 with fade
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    }

    draw();

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.scale(DPR, DPR);
    }

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    // start the floating glows animation
    controls.start(i => ({
      x: [0, i % 2 === 0 ? 40 : -40, 0],
      y: [0, i % 2 === 0 ? -30 : 30, 0],
      rotate: [0, 15, -10, 0],
      transition: {
        duration: 18 + i * 4,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    }));
  }, [controls]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Canvas particle field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Moving soft glows */}
      <motion.div
        custom={0}
        animate={controls}
        className="absolute -top-24 -left-16 h-72 w-72 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(250,204,21,0.12), rgba(250,204,21,0) 70%)',
          filter: 'blur(20px)',
        }}
      />
      <motion.div
        custom={1}
        animate={controls}
        className="absolute top-1/3 -right-24 h-80 w-80 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(250,204,21,0.10), rgba(250,204,21,0) 70%)',
          filter: 'blur(24px)',
        }}
      />
      <motion.div
        custom={2}
        animate={controls}
        className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(250,204,21,0.08), rgba(250,204,21,0) 70%)',
          filter: 'blur(22px)',
        }}
      />

      {/* Animated grid lines for subtle depth */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.08),transparent_60%)]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:60px_60px] animate-[gridMove_18s_linear_infinite]" />
      </div>

      {/* Keyframes for grid drift */}
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0px 0px, 0px 0px; }
          50% { background-position: 30px 30px, 30px 30px; }
          100% { background-position: 0px 0px, 0px 0px; }
        }
      `}</style>
    </div>
  );
}

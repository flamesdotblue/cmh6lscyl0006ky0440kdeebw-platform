import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { gsap } from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const contentInView = useInView(containerRef, { once: true, margin: '-20% 0px -10% 0px' });
  const controls = useAnimation();

  useEffect(() => {
    if (contentInView) controls.start('show');
  }, [contentInView, controls]);

  return (
    <section className="relative isolate overflow-hidden">
      <AgencyBackground />

      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_30%,black_35%,transparent)]">
        <div className="absolute -top-32 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pt-28">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.075 } } }}
          className="mx-auto max-w-3xl text-center relative"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300"
          >
            <Star size={14} className="text-yellow-400" />
            Websites that convert, delivered fast.
          </motion.div>

          <StackedReveal>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              We design and build high‑converting websites.
            </h1>
          </StackedReveal>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-6 text-lg leading-relaxed text-zinc-400"
          >
            Strategy, design, and development for ambitious brands. We ship modern, performant, and SEO‑ready sites that turn visitors into customers.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <a
              href="https://calendly.com/your-agency/intro-call"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
            >
              Book a call
              <ArrowRight size={16} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
            >
              Explore services
            </a>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ delay: 0.35 }}
            className="mt-4 text-xs text-zinc-500"
          >
            No pressure discovery call. We'll audit your site and share actionable next steps.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function StackedReveal({ children }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
      className="relative"
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <span className="pointer-events-none absolute -inset-x-6 -inset-y-2 -z-10 bg-[radial-gradient(40rem_20rem_at_50%_10%,rgba(250,204,21,0.12),transparent_60%)]" />
    </motion.div>
  );
}

function AgencyBackground() {
  const canvasRef = useRef(null);
  const clickLayerRef = useRef(null);
  const animationRef = useRef(0);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = Math.max(window.innerHeight * 0.9, 600);
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    const hex = { points: [], size: 26 };

    function buildHex() {
      hex.points = [];
      const size = window.innerWidth < 768 ? 22 : 26;
      hex.size = size;
      const w = Math.sqrt(3) * size;
      const h = 2 * size * 0.75;
      const cols = Math.ceil(width / w) + 2;
      const rows = Math.ceil(height / h) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * w + ((r % 2) * w) / 2 - w;
          const y = r * h - h;
          const phase = Math.random() * Math.PI * 2;
          hex.points.push({ x, y, phase });
        }
      }
    }

    buildHex();

    let timeStart = performance.now();

    function draw() {
      const now = performance.now();
      const t = (now - timeStart) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Spotlight
      const g = ctx.createRadialGradient(width * 0.5, height * 0.35, 10, width * 0.5, height * 0.35, Math.max(width, height));
      g.addColorStop(0, 'rgba(250,204,21,0.07)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // Pulsing hex grid (no cursor movement dependency)
      ctx.save();
      ctx.lineWidth = 1;
      for (let i = 0; i < hex.points.length; i++) {
        const p = hex.points[i];
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + p.phase);
        const alpha = 0.06 + 0.18 * pulse;
        polygon(ctx, p.x, p.y, 6, hex.size, `rgba(250,204,21,${alpha})`);
      }
      ctx.restore();

      // Floating data nodes
      const nodes = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < nodes; i++) {
        const x = (i * 73.21) % width;
        const y = (Math.sin(t * 0.6 + i) * 0.5 + 0.5) * height;
        const a = 0.06 + 0.08 * Math.sin(t * 3 + i);
        dot(ctx, x, y, 1.3, `rgba(250,204,21,${a})`);
      }

      // Sweep line accent (scroll-reactive via gsap below)
      const sweepOffset = sweepY;
      const grad = ctx.createLinearGradient(0, sweepOffset - 80, 0, sweepOffset + 80);
      grad.addColorStop(0, 'rgba(250,204,21,0)');
      grad.addColorStop(0.5, 'rgba(250,204,21,0.06)');
      grad.addColorStop(1, 'rgba(250,204,21,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, sweepOffset - 80, width, 160);

      // Click-burst particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.08; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.016;
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(250,204,21,${Math.max(0, p.life)})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    function polygon(context, x, y, sides, radius, stroke) {
      context.beginPath();
      for (let i = 0; i < sides; i++) {
        const ang = (i / sides) * Math.PI * 2;
        const px = x + Math.cos(ang) * radius;
        const py = y + Math.sin(ang) * radius;
        if (i === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }
      context.closePath();
      context.strokeStyle = stroke;
      context.stroke();
    }

    function dot(context, x, y, r, color) {
      context.beginPath();
      context.fillStyle = color;
      context.arc(x, y, r, 0, Math.PI * 2);
      context.fill();
    }

    // Scroll effect: animate sweepY across the hero height
    let sweepY = height * 0.2;
    gsap.to({}, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
      },
      onUpdate: (self) => {
        const p = self.progress; // 0..1 across page
        sweepY = 80 + p * (height - 160);
      },
    });

    // Kick off
    animationRef.current = requestAnimationFrame(draw);

    // Cleanups
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Click effects: ripple ring + particle burst using GSAP timelines
  useEffect(() => {
    const clickLayer = clickLayerRef.current;
    if (!clickLayer) return;
    function handleClick(e) {
      const rect = clickLayer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ripple element
      const ripple = document.createElement('span');
      ripple.className = 'absolute pointer-events-none rounded-full border border-yellow-400/70 opacity-100';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '8px';
      ripple.style.height = '8px';
      ripple.style.transform = 'translate(-50%, -50%)';
      clickLayer.appendChild(ripple);

      gsap.fromTo(ripple, { scale: 0.6, opacity: 0.8, borderWidth: 2 }, {
        scale: 16,
        opacity: 0,
        borderWidth: 1,
        duration: 0.9,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      });

      // Particle burst into the canvas
      const canvas = canvasRef.current;
      const rectCanvas = canvas.getBoundingClientRect();
      const cx = e.clientX - rectCanvas.left;
      const cy = e.clientY - rectCanvas.top;

      const count = 26;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
        const speed = 2.5 + Math.random() * 2.0;
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1 + Math.random() * 2,
        });
      }
    }

    clickLayer.addEventListener('click', handleClick);
    return () => clickLayer.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {/* Glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-2xl opacity-30 animate-[floatA_14s_ease-in-out_infinite]" style={{ background: 'radial-gradient(closest-side, rgba(250,204,21,0.18), rgba(250,204,21,0) 70%)' }} />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full blur-2xl opacity-25 animate-[floatB_18s_ease-in-out_infinite]" style={{ background: 'radial-gradient(closest-side, rgba(250,204,21,0.16), rgba(250,204,21,0) 70%)' }} />

      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Click capture layer (transparent) */}
      <div ref={clickLayerRef} className="absolute inset-0 pointer-events-auto" />

      {/* Fine grid drift */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:64px_64px] animate-[gridShift_22s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes gridShift { 0%{background-position:0 0,0 0} 50%{background-position:32px 32px,32px 32px} 100%{background-position:0 0,0 0} }
        @keyframes floatA { 0%{transform:translate3d(0,0,0) rotate(0)} 50%{transform:translate3d(22px,-16px,0) rotate(8deg)} 100%{transform:translate3d(0,0,0) rotate(0)} }
        @keyframes floatB { 0%{transform:translate3d(0,0,0) rotate(0)} 50%{transform:translate3d(-26px,18px,0) rotate(-6deg)} 100%{transform:translate3d(0,0,0) rotate(0)} }
      `}</style>
    </div>
  );
}

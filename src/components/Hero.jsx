import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

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
  const rafRef = useRef(0);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = Math.max(window.innerHeight * 0.9, 600));
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = Math.max(window.innerHeight * 0.9, 600);
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildHex();
    }

    // Hex grid setup
    const hex = { rows: 0, cols: 0, size: 26, points: [] };

    function buildHex() {
      hex.points = [];
      const size = isMobile ? 22 : 26;
      hex.size = size;
      const w = Math.sqrt(3) * size;
      const h = 2 * size * 0.75;
      hex.cols = Math.ceil(width / w) + 2;
      hex.rows = Math.ceil(height / h) + 2;
      for (let r = 0; r < hex.rows; r++) {
        for (let c = 0; c < hex.cols; c++) {
          const x = c * w + ((r % 2) * w) / 2 - w;
          const y = r * h - h;
          const phase = Math.random() * Math.PI * 2;
          hex.points.push({ x, y, phase });
        }
      }
    }

    // Code rain columns
    let cols = 0, drops = [], charset = '01{}<>[]/#$%&=+*';
    function setupRain() {
      cols = Math.floor(width / 16);
      drops = Array.from({ length: cols }, () => Math.random() * height);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Gradient spotlight
      const g = ctx.createRadialGradient(width * 0.5, height * 0.35, 10, width * 0.5, height * 0.35, Math.max(width, height));
      g.addColorStop(0, 'rgba(250,204,21,0.06)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // Hex grid pulse with parallax
      ctx.save();
      ctx.lineWidth = 1;
      const time = Date.now() * 0.001;
      const parallaxX = (pointer.current.tx - 0.5) * 20;
      const parallaxY = (pointer.current.ty - 0.5) * 16;
      ctx.translate(parallaxX, parallaxY);
      for (let i = 0; i < hex.points.length; i++) {
        const p = hex.points[i];
        const pulse = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(time * 2 + p.phase));
        const alpha = Math.max(0.05, 0.25 * pulse);
        polygon(ctx, p.x, p.y, 6, hex.size, `rgba(250,204,21,${alpha})`);
      }
      ctx.restore();

      // Data nodes flicker
      const nodes = isMobile ? 40 : 80;
      for (let i = 0; i < nodes; i++) {
        const x = (i * 73.21) % width;
        const y = (Math.sin(time * 0.6 + i) * 0.5 + 0.5) * height;
        const a = 0.08 + 0.08 * Math.sin(time * 3 + i);
        dot(ctx, x, y, 1.4, `rgba(250,204,21,${a})`);
      }

      // Subtle code rain overlay
      ctx.save();
      ctx.font = `${isMobile ? 12 : 13}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillStyle = 'rgba(250,204,21,0.07)';
      for (let i = 0; i < drops.length; i++) {
        const char = charset[(Math.random() * charset.length) | 0];
        const x = i * 16;
        ctx.fillText(char, x, drops[i]);
        drops[i] += 16 * (1.2 + Math.sin((i + time * 0.8)) * 0.1);
        if (drops[i] > height) drops[i] = -10;
      }
      ctx.restore();

      // Sweep line accent
      const sweepY = (time * 60) % (height * 2);
      const grad = ctx.createLinearGradient(0, sweepY - 80, 0, sweepY + 80);
      grad.addColorStop(0, 'rgba(250,204,21,0)');
      grad.addColorStop(0.5, 'rgba(250,204,21,0.06)');
      grad.addColorStop(1, 'rgba(250,204,21,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, sweepY - 80, width, 160);

      rafRef.current = requestAnimationFrame(draw);
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

    function onPointerMove(e) {
      const cx = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
      const cy = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0;
      pointer.current.x = cx / width;
      pointer.current.y = cy / height;
    }

    function onFrame() {
      pointer.current.tx += (pointer.current.x - pointer.current.tx) * 0.06;
      pointer.current.ty += (pointer.current.y - pointer.current.ty) * 0.06;
      if (!prefersReduced) requestAnimationFrame(onFrame);
    }

    buildHex();
    setupRain();
    resize();
    rafRef.current = requestAnimationFrame(draw);
    if (!prefersReduced) requestAnimationFrame(onFrame);

    window.addEventListener('resize', () => { resize(); setupRain(); });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-2xl opacity-30 animate-[floatA_14s_ease-in-out_infinite]" style={{ background: 'radial-gradient(closest-side, rgba(250,204,21,0.18), rgba(250,204,21,0) 70%)' }} />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full blur-2xl opacity-25 animate-[floatB_18s_ease-in-out_infinite]" style={{ background: 'radial-gradient(closest-side, rgba(250,204,21,0.16), rgba(250,204,21,0) 70%)' }} />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="absolute inset-0 opacity-[0.06]">
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

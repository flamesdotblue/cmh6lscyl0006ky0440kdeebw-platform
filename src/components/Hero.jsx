import { ArrowRight, Star } from 'lucide-react';
import BackgroundFX from './BackgroundFX';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <BackgroundFX />

      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_30%,black_35%,transparent)]">
        <div className="absolute -top-32 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
            <Star size={14} className="text-yellow-400" />
            Websites that convert, delivered fast.
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            We design and build high‑converting websites.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            Strategy, design, and development for ambitious brands. We ship modern, performant, and SEO‑ready sites that turn visitors into customers.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
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
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            No pressure discovery call. We'll audit your site and share actionable next steps.
          </p>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { Monitor, Code, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Monitor,
    title: 'Strategy & Design',
    points: [
      'Brand-aligned UI/UX',
      'Information architecture',
      'Conversion-focused wireframes',
    ],
  },
  {
    icon: Code,
    title: 'Web Development',
    points: [
      'React, Next.js, Tailwind',
      'SEO and performance built-in',
      'CMS and integrations',
    ],
  },
  {
    icon: Shield,
    title: 'Care & Optimization',
    points: [
      'Ongoing support & hosting',
      'Analytics & A/B testing',
      'Accessibility compliance',
    ],
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card');
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        rotateX: -10,
        transformOrigin: '50% 100%',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Section divider sweep as you scroll through services
      gsap.to('.services-sweep', {
        xPercent: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative border-t border-zinc-800/80 py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-yellow-400/10 to-transparent" />

      <div className="services-sweep pointer-events-none absolute inset-0 -z-10 translate-x-[-110%] [background:linear-gradient(100deg,transparent,rgba(250,204,21,0.05)_30%,transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">What we do</h2>
          <p className="mt-3 text-zinc-400">
            End-to-end website solutions tailored to your goals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="service-card group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-yellow-400/40"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-yellow-400/5 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/15 text-yellow-300 ring-1 ring-yellow-400/20">
                  <s.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="text-sm text-zinc-300">• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <a
            href="https://calendly.com/your-agency/intro-call"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}

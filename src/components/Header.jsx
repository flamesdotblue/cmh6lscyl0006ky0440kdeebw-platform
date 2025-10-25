import { Phone, Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-400 text-black">
            <Rocket size={18} />
          </div>
          <span className="text-sm font-semibold tracking-wide text-zinc-100">
            Volt Web Studio
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-sm text-zinc-300 transition-colors hover:text-yellow-300">Services</a>
          <a href="#work" className="text-sm text-zinc-300 transition-colors hover:text-yellow-300">Work</a>
          <a href="#book-call" className="text-sm text-zinc-300 transition-colors hover:text-yellow-300">Contact</a>
        </nav>
        <a
          href="https://calendly.com/your-agency/intro-call"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
        >
          <Phone size={16} />
          Book a call
        </a>
      </div>
    </header>
  );
}

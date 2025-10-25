import { Mail, Phone, Rocket } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="book-call" className="border-t border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-400 text-black">
                <Rocket size={18} />
              </div>
              <span className="text-sm font-semibold tracking-wide text-zinc-100">Volt Web Studio</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
              We help startups and growing brands launch beautiful, fast, and effective websites.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <a
              href="https://calendly.com/your-agency/intro-call"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
            >
              Book a call
            </a>
            <div className="flex flex-col gap-2 text-sm text-zinc-300 md:items-end">
              <a href="mailto:hello@voltwebstudio.com" className="inline-flex items-center gap-2 hover:text-yellow-300">
                <Mail size={16} /> hello@voltwebstudio.com
              </a>
              <a href="tel:+1234567890" className="inline-flex items-center gap-2 hover:text-yellow-300">
                <Phone size={16} /> +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-zinc-800 pt-6 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Volt Web Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-yellow-300">Privacy</a>
            <a href="#" className="hover:text-yellow-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

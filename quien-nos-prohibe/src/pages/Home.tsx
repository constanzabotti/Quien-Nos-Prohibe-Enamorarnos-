import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Author } from "@/components/sections/Author";
import { Community } from "@/components/sections/Community";
import { History } from "@/components/sections/History";
import { Book } from "@/components/sections/Book";

const INSTAGRAM_URL = "https://www.instagram.com/constanzabotti?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr";
const TIKTOK_URL    = "https://www.tiktok.com/@constanzabotti?_r=1&_t=ZS-95eTev4owfh";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.88a8.2 8.2 0 0 0 4.81 1.54V7c-.96 0-1.87-.2-2.04-.31z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="w-full relative">
      <Navbar />
      <Hero />
      <Author />
      <Community />
      <History />
      <Book />

      {/* ── Footer ── */}
      <footer className="bg-foreground text-background py-14 border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6">

          {/* Top row: title + social */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
            <p className="font-serif italic text-xl md:text-2xl text-center sm:text-left">
              ¿Quién nos prohíbe enamorarnos?
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex items-center gap-2 text-background/60 hover:text-primary transition-colors duration-300"
              >
                <InstagramIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-sans text-xs uppercase tracking-widest hidden sm:block">Instagram</span>
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="group flex items-center gap-2 text-background/60 hover:text-primary transition-colors duration-300"
              >
                <TikTokIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-sans text-xs uppercase tracking-widest hidden sm:block">TikTok</span>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-background/10 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="font-sans text-xs text-background/40 uppercase tracking-widest">
              © {new Date().getFullYear()} — La poesía como resistencia.
            </p>
            <p className="font-sans text-xs text-background/30 uppercase tracking-widest">
              Buenos Aires · San Francisco
            </p>
          </div>

        </div>
      </footer>
    </main>
  );
}

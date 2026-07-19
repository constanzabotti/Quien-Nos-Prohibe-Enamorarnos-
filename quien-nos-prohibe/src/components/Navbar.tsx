import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

type NavLink = { label: string; href: string; route?: boolean };

const NAV_LINKS: NavLink[] = [
  { label: "La Autora", href: "#autora"    },
  { label: "Las Voces", href: "#comunidad" },
  { label: "Historia",  href: "#historia"  },
  { label: "El Libro",  href: "#libro"     },
  { label: "Archivo",   href: "/archivo", route: true },
];

function scrollToId(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [location, navigate] = useLocation();

  // Track which section is in view
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLink = (link: NavLink) => {
    setMenuOpen(false);
    if (link.route) {
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    if (location !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(link.href), 50);
    } else {
      scrollToId(link.href);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[10000] bg-foreground border-b-2 border-primary shadow-[0_2px_20px_rgba(0,0,0,0.4)]">

        {/* ── Top micro-bar ── */}
        <div className="hidden md:flex items-center justify-end px-6 py-1 border-b border-background/10">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-background/30">
            Poesía · Memoria Colectiva · Argentina & San Francisco
          </p>
        </div>

        {/* ── Main toolbar row ── */}
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">

          {/* Brand */}
          <button
            onClick={() => {
              if (location !== "/") navigate("/");
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="shrink-0 font-serif italic text-background leading-none hover:text-primary transition-colors duration-300 text-left"
            aria-label="Volver al inicio"
          >
            <span className="text-base">¿Quién nos prohíbe </span>
            <span className="text-primary not-italic font-bold text-sm">enamorarnos?</span>
          </button>

          {/* Separator */}
          <div className="hidden md:block h-6 w-px bg-background/20 shrink-0" />

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1 flex-1" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => {
              const isActive = link.route
                ? location === link.href
                : location === "/" && activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleLink(link)}
                  className={`relative px-4 py-1.5 font-sans text-xs uppercase tracking-[0.18em] font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-background/60 hover:text-background"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA button — desktop */}
          <button
            onClick={() => handleLink({ label: "Reservar", href: "#libro" })}
            className="hidden md:block shrink-0 ml-auto px-4 py-1.5 bg-primary text-primary-foreground font-sans text-xs uppercase tracking-[0.15em] font-bold hover:bg-primary/80 transition-colors duration-200 border border-primary"
          >
            Reservar
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden ml-auto flex flex-col justify-center items-center gap-[5px] w-8 h-8 shrink-0"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-[1.5px] bg-background transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-background transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-background transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-background/10"
              aria-label="Menú móvil"
            >
              <div className="flex flex-col bg-foreground">
                {NAV_LINKS.map((link) => {
                  const isActive = link.route
                    ? location === link.href
                    : location === "/" && activeSection === link.href.replace("#", "");
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleLink(link)}
                      className={`flex items-center gap-3 px-6 py-4 font-sans text-sm uppercase tracking-[0.2em] font-semibold text-left border-b border-background/10 last:border-0 transition-colors duration-200 ${
                        isActive ? "text-primary bg-background/5" : "text-background/70 hover:text-background"
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                      {link.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => handleLink({ label: "Reservar", href: "#libro" })}
                  className="mx-6 my-4 py-3 bg-primary text-primary-foreground font-sans text-xs uppercase tracking-[0.2em] font-bold"
                >
                  Reservar el libro
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Push content below the fixed toolbar */}
      <div className="h-[calc(3.5rem+29px)] md:h-[calc(3.5rem+29px)]" aria-hidden="true" />
    </>
  );
}

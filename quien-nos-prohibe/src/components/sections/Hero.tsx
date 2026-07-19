import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToBuzon = () => {
    document.getElementById("buzon")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[72svh] md:min-h-screen flex items-center justify-center overflow-hidden bg-foreground">
      {/* Background image with slow zoom */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground z-10" />
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="San Francisco Golden Gate Bridge envuelto en niebla"
          className="w-full h-full object-cover object-center grayscale opacity-60"
          style={{ filter: "grayscale(1) contrast(1.1) brightness(0.85)" }}
        />
        {/* Extra analogue grain layer scoped to hero */}
        <svg className="absolute inset-0 w-full h-full z-10 opacity-[0.18] pointer-events-none mix-blend-overlay" aria-hidden="true">
          <filter id="hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-primary-foreground/70 uppercase tracking-[0.3em] text-xs md:text-sm font-sans mb-6 block font-semibold">
            Un libro de poesía e historia LGBTQ+
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-7xl lg:text-9xl font-serif text-background mb-4 md:mb-8 leading-tight max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          ¿Quién nos prohíbe{" "}
          <span className="italic text-primary">enamorarnos?</span>
        </motion.h1>

        <motion.p
          className="text-background/60 font-sans text-sm md:text-lg mb-6 md:mb-10 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
        >
          Argentina · San Francisco · La resistencia no tiene fronteras.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <Button size="lg" onClick={scrollToBuzon}>
            Sumate a la Resistencia Poética
          </Button>
        </motion.div>
      </div>

      {/* Torn paper bottom edge */}
      <div className="absolute bottom-[-2px] left-0 w-full h-12 bg-background torn-edge z-20" />
    </section>
  );
}

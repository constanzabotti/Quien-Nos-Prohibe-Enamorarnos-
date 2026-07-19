import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useGetLetters, useGetVerses } from "@workspace/api-client-react";
import { Navbar } from "@/components/Navbar";

const MOOD_LABELS: Record<string, string> = {
  amor:      "💛 Amor",
  duelo:     "🖤 Duelo",
  esperanza: "🌿 Esperanza",
  rabia:     "🔥 Rabia",
  nostalgia: "🌙 Nostalgia",
};

const MOOD_COLORS: Record<string, string> = {
  amor:      "border-yellow-600/50 bg-yellow-50/60",
  duelo:     "border-stone-700/50 bg-stone-100/70",
  esperanza: "border-green-700/50 bg-green-50/60",
  rabia:     "border-primary/50 bg-red-50/50",
  nostalgia: "border-blue-700/50 bg-blue-50/60",
};

const ROTATIONS = [
  "rotate-1", "-rotate-1", "rotate-2", "-rotate-2",
  "rotate-3", "-rotate-3", "rotate-1", "-rotate-2",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Archive() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const { data: lettersData, isLoading: loadingLetters } = useGetLetters({ limit: 10000 });
  const { data: versesData,  isLoading: loadingVerses  } = useGetVerses({  limit: 10000 });

  const letters = lettersData?.letters ?? [];
  const verses  = versesData?.verses  ?? [];

  return (
    <main className="w-full relative bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 px-6 border-b-2 border-foreground/10 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs uppercase tracking-[0.4em] text-primary mb-4"
          >
            Archivo Vivo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl italic leading-[1.05] mb-6"
          >
            Todas las voces,<br/>
            <span className="text-primary">todas las cartas</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-serif italic text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Aquí vive cada palabra que la comunidad ha dejado.
            Léelas. Sentilas. Son la memoria colectiva del libro.
          </motion.p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 font-sans text-xs uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-foreground text-background py-6 border-b-2 border-primary">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
          <div>
            <p className="font-serif italic text-3xl md:text-4xl text-primary">
              {letters.length}
            </p>
            <p className="font-sans text-xs uppercase tracking-widest text-background/60">
              Cartas anónimas
            </p>
          </div>
          <div className="w-px h-10 bg-background/20 hidden sm:block" />
          <div>
            <p className="font-serif italic text-3xl md:text-4xl text-primary">
              {verses.length}
            </p>
            <p className="font-sans text-xs uppercase tracking-widest text-background/60">
              Versos del cadáver exquisito
            </p>
          </div>
        </div>
      </section>

      {/* Cartas Anónimas */}
      <section className="py-16 md:py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-14">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-2">
              Sección 1
            </p>
            <h2 className="font-serif text-3xl md:text-5xl italic mb-3">
              Cartas Anónimas
            </h2>
            <p className="font-serif italic text-foreground/60 text-base md:text-lg">
              Cada carta es una voz que se animó a confesarse en silencio.
            </p>
          </div>

          {loadingLetters ? (
            <p className="font-serif italic text-foreground/50 text-center py-12">
              Buscando cartas en el buzón...
            </p>
          ) : letters.length === 0 ? (
            <p className="font-serif italic text-foreground/50 text-center py-12">
              Aún no hay cartas. Sé la primera voz.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {letters.map((letter, i) => (
                <motion.article
                  key={letter.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: (i % 9) * 0.05 }}
                  className={`p-6 border-l-4 ${MOOD_COLORS[letter.mood] ?? "border-foreground/20 bg-card"} shadow-[3px_3px_0_0_rgba(26,26,27,0.15)] hover:shadow-[5px_5px_0_0_rgba(26,26,27,0.25)] transition-shadow`}
                >
                  <p className="font-sans text-[10px] uppercase tracking-widest text-foreground/40 mb-2">
                    {MOOD_LABELS[letter.mood] ?? letter.mood}
                  </p>
                  <p className="font-handwriting text-xl md:text-2xl leading-relaxed text-foreground whitespace-pre-wrap">
                    "{letter.content}"
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-foreground/30 mt-4 pt-3 border-t border-foreground/10">
                    {formatDate(letter.createdAt)}
                  </p>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cadáver Exquisito */}
      <section className="py-16 md:py-24 px-6 bg-card border-t-2 border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-14">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-2">
              Sección 2
            </p>
            <h2 className="font-serif text-3xl md:text-5xl italic mb-3">
              Cadáver Exquisito
            </h2>
            <p className="font-serif italic text-foreground/60 text-base md:text-lg">
              Cada verso es una pieza del poema infinito que escribimos juntas.
            </p>
          </div>

          {loadingVerses ? (
            <p className="font-serif italic text-foreground/50 text-center py-12">
              Reuniendo los versos...
            </p>
          ) : verses.length === 0 ? (
            <p className="font-serif italic text-foreground/50 text-center py-12">
              Aún no hay versos. Sumá el primero.
            </p>
          ) : (
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              {verses.map((verse, i) => (
                <motion.div
                  key={verse.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: (i % 12) * 0.04 }}
                  className={`max-w-xs ${ROTATIONS[i % ROTATIONS.length]} bg-background p-5 border-2 border-foreground/15 shadow-[4px_4px_0_0_rgba(26,26,27,0.2)] hover:rotate-0 transition-transform duration-300`}
                >
                  <p className="font-handwriting text-lg md:text-xl text-foreground leading-snug">
                    "{verse.verse}"
                  </p>
                  {verse.author && (
                    <p className="font-sans text-[10px] uppercase tracking-widest text-foreground/50 mt-3">
                      — {verse.author}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA back */}
      <section className="py-16 px-6 bg-foreground text-background text-center">
        <p className="font-serif italic text-2xl md:text-3xl mb-6">
          ¿Querés sumar tu voz?
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-primary-foreground font-sans text-sm uppercase tracking-[0.2em] font-bold px-8 py-4 shadow-[5px_5px_0_0_rgba(245,245,220,0.3)] hover:shadow-[2px_2px_0_0_rgba(245,245,220,0.3)] transition-all"
        >
          ✦ Escribir mi carta
        </Link>
      </section>
    </main>
  );
}

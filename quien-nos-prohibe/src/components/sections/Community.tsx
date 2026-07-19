import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useGetLetters, useSubmitLetter, useGetVerses, useSubmitVerse } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

const letterSchema = z.object({
  content: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres"),
  mood: z.enum(["amor", "duelo", "esperanza", "rabia", "nostalgia"]),
});

const verseSchema = z.object({
  verse: z.string().min(3, "El verso es muy corto").max(500),
  author: z.string().max(100).optional(),
});

// Static seed verses that always appear in the Cadáver Exquisito
const SEED_VERSES = [
  { id: -1, verse: "A veces el mapa no coincide con el corazón", author: undefined, rotate: "rotate-2",    accent: true  },
  { id: -2, verse: "En Buenos Aires te busco, en San Francisco te encuentro", author: undefined, rotate: "-rotate-1", accent: false },
  { id: -3, verse: "Nadie puede prohibir lo que ya arde", author: undefined, rotate: "rotate-3",   accent: true  },
];

export function Community() {
  const [successLetter, setSuccessLetter] = useState(false);

  const { data: lettersData, refetch: refetchLetters } = useGetLetters({ limit: 3 });
  const { data: versesData, refetch: refetchVerses } = useGetVerses({ limit: 12 });

  const { mutate: submitLetter, isPending: isSubmittingLetter } = useSubmitLetter({
    mutation: {
      onSuccess: () => {
        setSuccessLetter(true);
        refetchLetters();
        letterForm.reset();
        setTimeout(() => setSuccessLetter(false), 7000);
      },
      onError: () => toast.error("Error al enviar la carta"),
    },
  });

  const { mutate: submitVerse, isPending: isSubmittingVerse } = useSubmitVerse({
    mutation: {
      onSuccess: () => {
        refetchVerses();
        verseForm.reset();
        toast.success("Verso añadido al cadáver exquisito");
      },
      onError: () => toast.error("Error al enviar el verso"),
    },
  });

  const letterForm = useForm<z.infer<typeof letterSchema>>({
    resolver: zodResolver(letterSchema),
    defaultValues: { content: "", mood: "esperanza" },
  });

  const verseForm = useForm<z.infer<typeof verseSchema>>({
    resolver: zodResolver(verseSchema),
    defaultValues: { verse: "", author: "" },
  });

  const onLetterSubmit = (data: z.infer<typeof letterSchema>) => {
    submitLetter({ data });
  };

  const onVerseSubmit = (data: z.infer<typeof verseSchema>) => {
    submitVerse({ data });
  };

  // Merge seed + community verses; seeds always first
  const communityVerses = versesData?.verses ?? [];

  return (
    <section id="comunidad" className="py-24 bg-background border-t border-border/20 relative">
      {/* Paper texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/paper-texture.png)`,
          backgroundSize: "cover",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Hoy podés amar y romperte</h2>
          <p className="text-xl font-sans text-foreground/70 max-w-2xl mx-auto">
            Este es un espacio colectivo. Dejá aquello que no pudiste decir, o sumá tu voz
            a nuestro poema interminable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── LEFT: Buzón de Cartas ── */}
          <div>
            <h3 className="text-3xl font-serif mb-2 border-b-2 border-foreground pb-4 inline-block">
              Buzón de Cartas No Enviadas
            </h3>

            {/* Bilingual instruction */}
            <p className="font-sans text-sm text-foreground/50 italic mb-8 leading-relaxed">
              Escribí en tu lengua materna; el amor y el dolor no necesitan traducción.
              <br />
              <span className="text-foreground/35">
                Write in your native language; love and pain need no translation.
              </span>
            </p>

            {/* Envelope container — anchored for Hero CTA scroll */}
            <div id="buzon" className="vintage-envelope p-8 mb-12 scroll-mt-8">
              <AnimatePresence mode="wait">
                {successLetter ? (
                  /* ── Poetic success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="min-h-[300px] flex flex-col items-center justify-center text-center gap-6 py-8"
                  >
                    {/* Wax seal decoration */}
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary-foreground fill-current">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                      </svg>
                    </div>
                    <p className="font-serif text-2xl md:text-3xl italic text-primary leading-snug max-w-xs">
                      Tu voz ya es parte de la historia.<br />Gracias por resistir.
                    </p>
                    <p className="font-sans text-xs uppercase tracking-widest text-foreground/40">
                      Tu carta ya viaja.
                    </p>
                  </motion.div>
                ) : (
                  /* ── Letter form ── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={letterForm.handleSubmit(onLetterSubmit)}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block font-sans text-sm uppercase tracking-widest font-bold mb-2">
                        Sentimiento
                      </label>
                      <select
                        {...letterForm.register("mood")}
                        className="w-full bg-transparent border-b-2 border-foreground pb-2 focus:outline-none focus:border-primary font-serif text-lg cursor-pointer"
                      >
                        <option value="amor">Amor</option>
                        <option value="duelo">Duelo</option>
                        <option value="esperanza">Esperanza</option>
                        <option value="rabia">Rabia</option>
                        <option value="nostalgia">Nostalgia</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-sm uppercase tracking-widest font-bold mb-2">
                        Carta Anónima
                      </label>
                      <Textarea
                        {...letterForm.register("content")}
                        placeholder="Escribí lo que nunca te animaste a mandar..."
                        className="font-handwriting text-xl leading-relaxed bg-[#fdfbf7] min-h-[200px]"
                      />
                      {letterForm.formState.errors.content && (
                        <p className="text-primary text-sm mt-1">
                          {letterForm.formState.errors.content.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-lg tracking-widest shadow-[6px_6px_0_0_rgba(26,26,27,1)] hover:shadow-[2px_2px_0_0_rgba(26,26,27,1)]"
                      disabled={isSubmittingLetter}
                    >
                      {isSubmittingLetter ? "Dejando en el buzón..." : "✦ Sellar y Confesar"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Recent letters */}
            <div className="space-y-6">
              <h4 className="font-sans uppercase tracking-widest text-sm font-bold text-foreground/50">
                Cartas Recientes
              </h4>
              {lettersData?.letters?.map((letter) => (
                <motion.div
                  key={letter.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 border border-border shadow-[4px_4px_0_0_rgba(26,26,27,1)]"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                    {letter.mood}
                  </span>
                  <p className="font-handwriting text-xl text-foreground/80 line-clamp-3">
                    "{letter.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Cadáver Exquisito ── */}
          <div>
            <h3 className="text-3xl font-serif mb-8 border-b-2 border-foreground pb-4 inline-block">
              Cadáver Exquisito
            </h3>

            {/* Verse input form */}
            <form
              onSubmit={verseForm.handleSubmit(onVerseSubmit)}
              className="mb-10 bg-white p-6 border border-border shadow-[8px_8px_0_0_rgba(26,26,27,1)]"
            >
              <h4 className="font-serif text-xl mb-4 italic">
                Añadí tu verso al poema colectivo...
              </h4>
              <div className="space-y-4">
                <Input
                  {...verseForm.register("verse")}
                  placeholder="Ej: Y en las calles rotas, florecimos."
                  className="font-serif italic text-lg bg-[#fdfbf7] p-3 border-2"
                />
                {verseForm.formState.errors.verse && (
                  <p className="text-primary text-sm">
                    {verseForm.formState.errors.verse.message}
                  </p>
                )}
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Input
                      {...verseForm.register("author")}
                      placeholder="Tu nombre o seudónimo (Opcional)"
                      className="text-sm"
                    />
                  </div>
                  <Button type="submit" disabled={isSubmittingVerse}>
                    Sumar Verso
                  </Button>
                </div>
              </div>
            </form>

            {/* Collage board */}
            <div className="p-8 bg-[#E8E1C8] border-2 border-foreground min-h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-foreground)_1px,_transparent_1px)] bg-[length:10px_10px]" />

              <div className="flex flex-wrap gap-4 relative z-10 items-start">

                {/* Static seed verses — always visible */}
                {SEED_VERSES.map((sv) => (
                  <motion.div
                    key={sv.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`newspaper-cutout text-sm md:text-base cursor-default transform hover:scale-105 transition-transform ${sv.rotate} ${sv.accent ? "bg-primary text-primary-foreground" : "bg-white text-black"}`}
                    style={{ padding: "6px 10px" }}
                  >
                    {sv.verse}
                  </motion.div>
                ))}

                {/* Community verses from DB */}
                {communityVerses.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`newspaper-cutout text-sm md:text-base cursor-default transform hover:scale-110 transition-transform ${
                      i % 2 === 0 ? "rotate-2" : "-rotate-1"
                    } ${i % 3 === 0 ? "bg-primary text-primary-foreground" : "bg-white text-black"}`}
                  >
                    {v.verse}
                  </motion.div>
                ))}

                {communityVerses.length === 0 && (
                  <p className="font-serif italic text-foreground/40 text-sm w-full mt-4">
                    + Sumá tu verso arriba y aparecerá aquí.
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

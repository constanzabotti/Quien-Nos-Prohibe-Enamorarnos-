import { motion } from "framer-motion";

export function Author() {
  return (
    <section id="autora" className="py-24 md:py-32 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Portrait col */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-4 bg-white border border-border shadow-[12px_12px_0_0_rgba(26,26,27,1)] transform -rotate-2">
              <img
                src={`${import.meta.env.BASE_URL}images/author-portrait.jpg`}
                alt="Constanza Botti observando el océano desde la costa de California"
                className="w-full h-auto grayscale contrast-110 object-cover object-top aspect-[3/4]"
              />

              {/* Name stamp */}
              <div className="absolute bottom-8 right-[-20px] bg-primary text-primary-foreground px-4 py-1 font-serif text-xl italic transform rotate-6 shadow-md border border-black">
                Constanza Botti
              </div>

              {/* Two-worlds bridge */}
              <div className="absolute -bottom-6 left-4 flex items-center gap-2">
                <span className="bg-foreground text-background font-sans text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 font-bold">
                  Buenos Aires
                </span>
                <span className="text-foreground/40 font-serif text-base">→</span>
                <span className="bg-primary text-primary-foreground font-sans text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 font-bold">
                  San Francisco
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bio col */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-start pt-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-sans text-primary uppercase tracking-[0.3em] text-xs font-bold block mb-4">
              La Autora
            </span>

            <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-8 leading-tight">
              Escribir desde<br />
              <span className="italic text-primary">el desarraigo</span>
            </h2>

            {/* ── Exact bio text as requested ── */}
            <div className="prose prose-lg font-sans text-foreground/80 mb-10">
              <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                Escritora argentina, inmigrante y observadora en las calles de San Francisco.
                Mi poesía nace del desarraigo y de la unión de dos mundos: la memoria de
                las luchas en el Sur y la libertad conquistada en el Norte. Este libro es
                un refugio para quienes se atreven a sentir en un mundo que intenta prohibirlo.
              </p>
            </div>

            {/* Identity strip */}
            <div className="flex flex-wrap gap-0 mb-10 border-2 border-foreground divide-x-2 divide-foreground self-start">
              {[
                { label: "País de origen", value: "Argentina" },
                { label: "País de escritura", value: "California" },
                { label: "Idioma del alma", value: "Castellano" },
              ].map((item) => (
                <div key={item.label} className="px-6 py-4">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-foreground/50 mb-1">
                    {item.label}
                  </p>
                  <p className="font-serif text-lg text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Diary note */}
            <motion.div
              className="bg-[#fdfaf1] p-8 border border-border shadow-md transform rotate-1 relative self-start w-full md:w-[85%]"
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#d1cdc0] opacity-80"
                style={{ clipPath: "polygon(5% 0, 95% 5%, 100% 95%, 0 100%)" }}
              />
              <h3 className="font-serif italic text-sm uppercase tracking-widest mb-4 text-foreground/50">
                Del diario de escritura
              </h3>
              <p className="font-handwriting text-2xl leading-relaxed text-foreground/90">
                "Escribo en el medio del océano. No en el agua — en el aire entre los dos
                continentes. Buenos Aires me enseñó a marchar. San Francisco me enseñó
                que el amor también es un acto político. Este libro es el puente."
              </p>
              <p className="font-sans text-xs text-foreground/40 mt-4 tracking-widest uppercase">
                — Constanza Botti, cuaderno de trabajo, 2023
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

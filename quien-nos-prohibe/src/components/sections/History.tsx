import { motion } from "framer-motion";

type Region = "ARG" | "USA" | "AMERICA" | "EUROPA" | "ASIA" | "AFRICA" | "OCEANIA";

const historyEvents: {
  year: string;
  region: Region;
  title: string;
  city: string;
  desc: string;
  bookLink: string;
}[] = [
  {
    year: "1791",
    region: "EUROPA",
    title: "Francia despenaliza",
    city: "París",
    desc: "Tras la Revolución Francesa, el nuevo Código Penal elimina la sodomía como delito. Europa da el primer paso legal de la historia moderna hacia la despenalización.",
    bookLink: "«La libertad también era nuestra, aunque tardara en saberlo.»",
  },
  {
    year: "1969",
    region: "USA",
    title: "La Noche de Stonewall",
    city: "Nueva York",
    desc: "Drag queens, maricas y travestis se rebelan en Christopher St. El primer «no» que se convirtió en todos los «sí» que vinieron después.",
    bookLink: "«Resistir es un acto de amor.»",
  },
  {
    year: "1984",
    region: "ARG",
    title: "Nace la CHA",
    city: "Buenos Aires",
    desc: "La Comunidad Homosexual Argentina surge en plena posdictadura. Organizarse cuando el miedo todavía huele a pólvora es la forma más radical de existir.",
    bookLink: "«La democracia también era nuestra.»",
  },
  {
    year: "1992",
    region: "ARG",
    title: "Primera Marcha del Orgullo",
    city: "Buenos Aires",
    desc: "200 personas caminaron por Avenida de Mayo hacia el Congreso. Hoy marchan más de un millón. Cada paso fue un poema no escrito.",
    bookLink: "«Doscientas voces que se volvieron millones.»",
  },
  {
    year: "1994",
    region: "AFRICA",
    title: "Constitución de Sudáfrica",
    city: "Johannesburgo",
    desc: "Sudáfrica se convierte en el primer país del mundo en constitucionalizar la protección por orientación sexual. África también tiene su historia de resistencia.",
    bookLink: "«Escribieron nuestra libertad en la ley más sagrada.»",
  },
  {
    year: "2001",
    region: "EUROPA",
    title: "Primer matrimonio igualitario del mundo",
    city: "Amsterdam",
    desc: "Países Bajos abre el registro civil a las parejas del mismo sexo. Cuatro parejas se casan a medianoche. El mundo no vuelve a ser el mismo.",
    bookLink: "«Dijimos «sí» cuando el mundo decía «imposible».»",
  },
  {
    year: "2001",
    region: "AMERICA",
    title: "Marcha del Orgullo CDMX",
    city: "Ciudad de México",
    desc: "La marcha del Distrito Federal se convierte en la más grande de América Latina. La región queer sale a las calles con colores, rabia y esperanza.",
    bookLink: "«Aquí también florecemos.»",
  },
  {
    year: "2010",
    region: "ARG",
    title: "Matrimonio Igualitario",
    city: "Argentina",
    desc: "Argentina se convierte en el primer país de América Latina —y décimo en el mundo— en legalizar el matrimonio igualitario. Una ley, mil historias.",
    bookLink: "«Nos dijeron que era imposible. Nos casamos igual.»",
  },
  {
    year: "2012",
    region: "ARG",
    title: "Ley de Identidad de Género",
    city: "Argentina",
    desc: "La ley más progresista del mundo en su momento. Las personas trans pueden cambiar su identidad sin cirugía, sin diagnóstico, sin pedir permiso.",
    bookLink: "«Mi nombre siempre fue mío.»",
  },
  {
    year: "2015",
    region: "USA",
    title: "Obergefell v. Hodges",
    city: "Washington D.C.",
    desc: "La Corte Suprema de EE.UU. legaliza el matrimonio igualitario en los 50 estados. En Castro Street, lloramos y bailamos al mismo tiempo.",
    bookLink: "«Amor es amor, de costa a costa.»",
  },
  {
    year: "2017",
    region: "OCEANIA",
    title: "Australia vota el amor",
    city: "Canberra",
    desc: "El 61,6% de los australianos vota «Sí» en el referéndum por el matrimonio igualitario. Oceanía celebra en sus playas y en su desierto rojo.",
    bookLink: "«Hasta el fin del mundo, el amor llega.»",
  },
  {
    year: "2019",
    region: "ASIA",
    title: "Taiwan: primero en Asia",
    city: "Taipei",
    desc: "Taiwan legaliza el matrimonio igualitario, siendo el primer país de Asia en hacerlo. Miles se abrazan bajo paraguas de colores en la lluvia de Taipei.",
    bookLink: "«El arcoíris no tiene fronteras de continente.»",
  },
];

const regionStyles: Record<Region, { badge: string; dot: string }> = {
  ARG: {
    badge: "bg-[#74ACDF]/20 text-[#74ACDF] border border-[#74ACDF]/40",
    dot:   "bg-[#74ACDF]",
  },
  USA: {
    badge: "bg-primary/20 text-primary border border-primary/40",
    dot:   "bg-primary",
  },
  AMERICA: {
    badge: "bg-[#5C8A3C]/20 text-[#8BC34A] border border-[#5C8A3C]/40",
    dot:   "bg-[#8BC34A]",
  },
  EUROPA: {
    badge: "bg-[#4A6FA5]/20 text-[#7B9CC4] border border-[#4A6FA5]/40",
    dot:   "bg-[#7B9CC4]",
  },
  ASIA: {
    badge: "bg-[#C4922A]/20 text-[#E5B84A] border border-[#C4922A]/40",
    dot:   "bg-[#E5B84A]",
  },
  AFRICA: {
    badge: "bg-[#A0522D]/20 text-[#D4845A] border border-[#A0522D]/40",
    dot:   "bg-[#D4845A]",
  },
  OCEANIA: {
    badge: "bg-[#2A8C8C]/20 text-[#4ABCBC] border border-[#2A8C8C]/40",
    dot:   "bg-[#4ABCBC]",
  },
};

const regionLabels: Record<Region, string> = {
  ARG:     "Argentina",
  USA:     "USA",
  AMERICA: "América",
  EUROPA:  "Europa",
  ASIA:    "Asia",
  AFRICA:  "África",
  OCEANIA: "Oceanía",
};

export function History() {
  return (
    <section id="historia" className="py-32 bg-foreground text-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-12 bg-background torn-edge rotate-180 z-20" />

      {/* Subtle coordinate grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(60 62% 91%) 1px, transparent 1px), linear-gradient(90deg, hsl(60 62% 91%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-12">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-sans text-primary uppercase tracking-[0.3em] text-xs font-bold block mb-4">
            Historia y Lucha
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-background leading-tight mb-6">
            Cartografía de la<br />
            <span className="italic text-primary">Lucha LGBTQ+ Global</span>
          </h2>
          <p className="text-lg font-sans text-background/60 max-w-2xl">
            Siete regiones, un mismo corazón. La resistencia no tiene un solo mapa —
            tiene mil calles, mil voces y un amor que no pide permiso.
          </p>
        </motion.div>

        {/* Region legend */}
        <motion.div
          className="flex flex-wrap gap-3 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {(Object.keys(regionLabels) as Region[]).map((r) => (
            <span
              key={r}
              className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest ${regionStyles[r].badge}`}
            >
              <span className={`w-2 h-2 rounded-full ${regionStyles[r].dot}`} />
              {regionLabels[r]}
            </span>
          ))}
        </motion.div>

        {/* Event grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {historyEvents.map((event, index) => (
            <motion.div
              key={`${event.year}-${event.title}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              className="relative bg-[#1E1E1F] border border-background/10 p-7 flex flex-col gap-4
                         shadow-[6px_6px_0_0_rgba(128,0,32,0.3)]
                         hover:-translate-y-1 hover:shadow-[10px_10px_0_0_rgba(128,0,32,0.6)]
                         transition-all duration-300 group"
            >
              {/* Ghost year watermark */}
              <span className="absolute top-3 right-4 font-serif text-6xl text-background/[0.05] select-none leading-none pointer-events-none">
                {event.year}
              </span>

              {/* Region badge */}
              <span className={`self-start px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-widest ${regionStyles[event.region].badge}`}>
                {regionLabels[event.region]}
              </span>

              <div className="relative z-10 flex flex-col gap-3 flex-1">
                <span className="text-primary font-bold tracking-widest text-xs font-sans">
                  {event.year} — {event.city}
                </span>
                <h4 className="text-xl font-serif text-background leading-snug">
                  {event.title}
                </h4>
                <p className="text-background/60 font-sans text-sm leading-relaxed flex-1">
                  {event.desc}
                </p>
              </div>

              {/* Book connection quote */}
              <p className="font-handwriting text-lg text-primary/80 border-t border-background/10 pt-4 leading-snug">
                {event.bookLink}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing connective line */}
        <motion.p
          className="text-center font-serif italic text-2xl md:text-3xl text-background/40 mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          "Constanza Botti escribe desde la intersección de todos estos mundos — el del Sur y el del Norte,
          el de la lucha y el del amor."
        </motion.p>
      </div>
    </section>
  );
}

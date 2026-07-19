import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const newsletterSchema = z.object({
  email: z.string().email("Ingresá un email válido"),
  name: z.string().max(100).optional(),
});

export function Book() {
  const { mutate: subscribe, isPending } = useSubscribeNewsletter({
    mutation: {
      onSuccess: () => {
        toast.success("¡Gracias por sumarte! Te avisaremos cuando el libro esté listo.");
        form.reset();
      },
      onError: () => toast.error("Hubo un error al suscribirte. Intentá de nuevo."),
    }
  });

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", name: "" },
  });

  const onSubmit = (data: z.infer<typeof newsletterSchema>) => {
    subscribe({ data });
  };

  return (
    <section id="libro" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* CSS 3D Book Mockup */}
          <motion.div 
            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="book-container w-[260px] md:w-[320px] h-[370px] md:h-[455px] relative">
              <div className="book-cover absolute inset-0 overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}images/book-cover.png`}
                  alt="Portada del libro ¿Quién nos prohíbe enamorarnos? de Constanza Botti"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="book-spine" />
            </div>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Lanzamiento Oficial</span>
            <h2 className="text-5xl md:text-6xl font-serif text-foreground mb-6 leading-tight">
              No te pierdas el lanzamiento.
            </h2>
            <p className="text-lg font-sans text-foreground/80 mb-10">
              Unite a la resistencia poética y sé de las primeras personas en tener el libro en sus manos. Recibí versos exclusivos y noticias directo en tu correo.
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
              <div>
                <Input 
                  {...form.register("name")} 
                  placeholder="Tu nombre (opcional)" 
                  className="bg-transparent border-t-0 border-x-0 border-b-2 border-foreground rounded-none px-0 text-xl"
                />
              </div>
              <div>
                <Input 
                  {...form.register("email")} 
                  type="email" 
                  placeholder="Tu mejor email" 
                  className="bg-transparent border-t-0 border-x-0 border-b-2 border-foreground rounded-none px-0 text-xl"
                />
                {form.formState.errors.email && (
                  <p className="text-primary text-sm mt-2">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <Button type="submit" size="lg" className="w-full mt-8" disabled={isPending}>
                {isPending ? "Suscribiendo..." : "Avisame cuando salga"}
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

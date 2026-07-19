import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-6">
        <h1 className="text-6xl md:text-9xl font-serif text-primary mb-6">404</h1>
        <h2 className="text-3xl font-serif mb-6">Esta página fue arrancada del libro.</h2>
        <p className="font-sans text-foreground/70 mb-10 max-w-md mx-auto">
          El verso que buscás ya no existe o se lo llevó el viento de San Francisco.
        </p>
        <Link href="/" className="inline-block">
          <Button size="lg">Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}

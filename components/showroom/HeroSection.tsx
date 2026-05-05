import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent tracking-wide uppercase">
              Concessionaria Premium
            </span>
          </div>

          <h1
            className="font-display font-bold leading-[0.95] mb-6 text-text"
            style={{ fontSize: "clamp(3rem, 7vw, 8rem)" }}
          >
            Guida il
            <br />
            <span className="gradient-text">Futuro</span>
          </h1>

          <p className="text-lg sm:text-xl text-text-muted leading-relaxed mb-10 max-w-lg">
            Scopri la nostra collezione esclusiva di auto premium. Ogni veicolo è selezionato con cura per offrirti il meglio del mercato.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/catalogo" className="btn-primary text-base gap-2 group">
              Esplora il Catalogo
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contatti" className="btn-secondary text-base">
              Contattaci
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex gap-10 mt-16 pt-8 border-t border-white/10">
            {[
              { value: "200+", label: "Auto Disponibili" },
              { value: "15k+", label: "Clienti Soddisfatti" },
              { value: "25", label: "Anni di Esperienza" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold font-display text-text">
                  {stat.value}
                </p>
                <p className="text-xs text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

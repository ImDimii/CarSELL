import Link from "next/link";
import { ArrowRight, Car, HandCoins, Repeat, Key } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Nostri Servizi | CarSELL",
  description: "Scopri i servizi esclusivi di CarSELL: Vendita auto premium, Finanziamenti personalizzati, Permuta dell'usato e Test Drive.",
};

const services = [
  {
    title: "Vendita Auto",
    description: "Una selezione curata di vetture premium e di lusso. Ogni veicolo è controllato rigorosamente per garantirti il massimo della qualità.",
    icon: Car,
    href: "/servizi/vendita",
  },
  {
    title: "Finanziamento",
    description: "Soluzioni finanziarie su misura con tassi agevolati. Calcoliamo insieme il piano migliore per le tue esigenze.",
    icon: HandCoins,
    href: "/servizi/finanziamento",
  },
  {
    title: "Permuta",
    description: "Valutiamo il tuo usato alle migliori condizioni di mercato per agevolare l'acquisto della tua nuova auto da sogno.",
    icon: Repeat,
    href: "/servizi/permuta",
  },
  {
    title: "Test Drive",
    description: "Prenota una prova su strada esclusiva. Tocca con mano l'emozione di guidare una delle nostre supercar.",
    icon: Key,
    href: "/servizi/test-drive",
  },
];

export default function ServiziPage() {
  return (
    <div className="pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-16 text-center max-w-3xl mx-auto stagger-grid">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-text mb-6">
            I Nostri <span className="text-accent">Servizi</span>
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            Non ci limitiamo a vendere auto. Offriamo un'esperienza d'acquisto a 360 gradi, pensata per soddisfare i clienti più esigenti.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-grid">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group surface-card-hover p-8 relative overflow-hidden flex flex-col items-start"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                <service.icon className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-text font-display mb-3">
                {service.title}
              </h2>
              <p className="text-text-muted leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all mt-auto">
                Scopri di più <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

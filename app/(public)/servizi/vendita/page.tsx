import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendita Auto Premium | CarSELL",
  description: "Il nostro processo di vendita: trasparenza, certificazione e qualità assoluta su ogni vettura.",
};

const benefits = [
  "Certificazione chilometrica ufficiale",
  "110 controlli tecnici pre-consegna",
  "Garanzia di 12-24 mesi estendibile",
  "Lavaggio e detailing completo inclusi",
  "Gestione pratiche burocratiche",
  "Consegna a domicilio in tutta Italia"
];

export default function VenditaAutoPage() {
  return (
    <div className="pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/servizi" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Torna ai servizi
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-text mb-4">
                Vendita Auto <span className="text-accent">Premium</span>
              </h1>
              <p className="text-lg text-text-muted leading-relaxed">
                Ogni vettura del nostro showroom non è un semplice veicolo, ma un'opera d'arte ingegneristica. Selezioniamo solo il top del mercato per offrirti affidabilità e prestigio.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-text">{b}</span>
                </li>
              ))}
            </ul>

            <Link href="/catalogo" className="btn-primary inline-flex mt-4">
              Sfoglia il Catalogo
            </Link>
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden glass-card">
            <Image
              src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1000&q=80"
              alt="Showroom CarSELL"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

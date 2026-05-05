import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Repeat, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Valutazione Permuta | CarSELL",
  description: "Ottieni la massima valutazione per il tuo veicolo usato in permuta.",
};

const steps = [
  { title: "Richiesta Online", desc: "Inviaci i dettagli di base (targa, km, anno) del tuo veicolo." },
  { title: "Perizia in Sede", desc: "I nostri esperti effettueranno un controllo visivo e meccanico." },
  { title: "Offerta Vantaggiosa", desc: "Riceverai la quotazione reale basata sulle dinamiche di mercato odierne." },
  { title: "Sconto Immediato", desc: "L'importo verrà scalato direttamente dal prezzo della tua nuova auto." }
];

export default function PermutaPage() {
  return (
    <div className="pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/servizi" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Torna ai servizi
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="order-2 lg:order-1 relative aspect-[4/3] lg:aspect-auto lg:h-[700px] rounded-2xl overflow-hidden glass-card">
            <Image
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1000&q=80"
              alt="Permuta Auto"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-text mb-4">
                Valuta la tua <span className="text-accent">Permuta</span>
              </h1>
              <p className="text-lg text-text-muted leading-relaxed">
                Passare alla tua prossima auto da sogno non è mai stato così semplice. Valorizziamo il tuo usato offrendoti una quotazione in linea con i valori di Quattroruote.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-text">Come funziona?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {steps.map((step, index) => (
                  <div key={step.title} className="surface-card p-5">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold mb-4">
                      {index + 1}
                    </div>
                    <h4 className="text-lg font-bold text-text mb-2">{step.title}</h4>
                    <p className="text-sm text-text-muted">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-text-muted mb-4">
                Pronto a scoprire quanto vale la tua auto?
              </p>
              <Link href="/contatti" className="btn-primary w-full sm:w-auto">
                Richiedi una Valutazione
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

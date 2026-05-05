import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, HandCoins, Percent, Calendar } from "lucide-react";
import type { Metadata } from "next";
import FinancingCalculator from "@/components/forms/FinancingCalculator";

export const metadata: Metadata = {
  title: "Finanziamenti e Leasing | CarSELL",
  description: "Piani di finanziamento flessibili e tassi agevolati per acquistare la tua prossima auto.",
};

export default function FinanziamentoPage() {
  return (
    <div className="pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/servizi" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Torna ai servizi
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-text mb-4">
                Piani Finanziari <span className="text-accent">Flessibili</span>
              </h1>
              <p className="text-lg text-text-muted leading-relaxed">
                Rendiamo l'acquisto della tua auto un'esperienza serena. Grazie alle nostre partnership con i principali istituti di credito, offriamo tassi competitivi e durate personalizzabili.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="surface-card p-6">
                <Percent className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-bold text-text mb-2">Tassi Agevolati</h3>
                <p className="text-sm text-text-muted">TAN e TAEG competitivi per minimizzare il costo del credito.</p>
              </div>
              <div className="surface-card p-6">
                <Calendar className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-bold text-text mb-2">Fino a 84 Mesi</h3>
                <p className="text-sm text-text-muted">Piani di rientro lunghi e flessibili per una rata sempre sostenibile.</p>
              </div>
            </div>

            <div className="surface-card p-6 border-l-4 border-l-accent">
              <h3 className="text-lg font-bold text-text mb-2">Opzione Maxi-Rata</h3>
              <p className="text-sm text-text-muted">
                Vuoi cambiare auto ogni 3 anni? Scopri la formula con Valore Futuro Garantito (VFG) e decidi solo alla fine se tenere, restituire o cambiare l'auto.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative h-64 rounded-2xl overflow-hidden glass-card">
              <Image
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"
                alt="Consulenza finanziaria"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="bg-surface-2 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-text mb-6 text-center">Calcola la tua Rata Ideale</h3>
              {/* Usa un prezzo base di default per il calcolatore sulla pagina servizi */}
              <FinancingCalculator prezzo={50000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Key, Clock, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prenota Test Drive | CarSELL",
  description: "Prenota un test drive esclusivo e mettiti alla guida dell'auto dei tuoi sogni.",
};

export default function TestDrivePage() {
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
                Vivi <span className="text-accent">l'Emozione</span>
              </h1>
              <p className="text-lg text-text-muted leading-relaxed">
                Nessuna scheda tecnica può eguagliare la sensazione del volante tra le mani e il rombo del motore. Prenota un test drive VIP accompagnato dai nostri piloti esperti.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text mb-1">Guida in Prima Persona</h3>
                  <p className="text-text-muted">Un'esperienza di guida di 30 minuti su percorsi studiati per esaltare le qualità della vettura.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text mb-1">Affiancamento Esperto</h3>
                  <p className="text-text-muted">Un nostro consulente tecnico siederà al tuo fianco per illustrarti tutte le tecnologie di bordo.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text mb-1">Appuntamenti Flessibili</h3>
                  <p className="text-text-muted">Scegli tu il giorno e l'ora che preferisci. Il veicolo sarà lavato, sanificato e pronto per te.</p>
                </div>
              </div>
            </div>

            <Link href="/catalogo" className="btn-primary inline-flex mt-4">
              Scegli l'auto e prenota
            </Link>
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-[650px] rounded-2xl overflow-hidden glass-card">
            <Image
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1000&q=80"
              alt="Test Drive Experience"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

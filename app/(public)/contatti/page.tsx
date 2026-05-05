import type { Metadata } from "next";
import LeadForm from "@/components/forms/LeadForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contatti | CarSELL",
  description:
    "Contattaci per un preventivo, un finanziamento, una permuta o prenotare un test drive.",
};

export default function ContattiPage() {
  return (
    <div className="pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text mb-4">
            Contattaci
          </h1>
          <p className="text-lg text-text-muted">
            Compila il modulo e ti ricontatteremo entro 24 ore. Siamo qui per
            aiutarti a trovare l&apos;auto perfetta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact cards */}
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                title: "Indirizzo",
                detail: "Via Roma 123, 20121 Milano (MI)",
                sub: "Zona Duomo",
              },
              {
                icon: Phone,
                title: "Telefono",
                detail: "+39 02 1234567",
                sub: "Lun-Sab 9:00-19:00",
              },
              {
                icon: Mail,
                title: "Email",
                detail: "info@carsell.it",
                sub: "Rispondiamo entro 24h",
              },
              {
                icon: Clock,
                title: "Orari",
                detail: "Lun-Ven: 9:00 - 19:00",
                sub: "Sab: 9:00 - 13:00",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="surface-card rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted">{item.detail}</p>
                  <p className="text-xs text-text-faint mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 surface-card rounded-xl p-8">
            <h2 className="text-xl font-semibold text-text mb-6">
              Invia una Richiesta
            </h2>
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}

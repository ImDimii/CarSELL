import Link from "next/link";
import { Car, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[.08] bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Car className="w-6 h-6 text-accent" />
              <span className="text-lg font-bold font-display">
                Car<span className="text-accent">SELL</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              La tua concessionaria premium. Auto selezionate, qualità garantita, servizio impeccabile.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider">
              Navigazione
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/catalogo", label: "Catalogo" },
                { href: "/contatti", label: "Contatti" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider">
              Servizi
            </h4>
            <ul className="space-y-3">
              {["Vendita Auto", "Finanziamento", "Permuta", "Test Drive"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-text-muted">{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider">
              Contatti
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-text-muted">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                Via Roma 123, Milano
              </li>
              <li className="flex items-center gap-2 text-sm text-text-muted">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                +39 02 1234567
              </li>
              <li className="flex items-center gap-2 text-sm text-text-muted">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                info@carsell.it
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[.08] text-center">
          <p className="text-xs text-text-faint">
            © {new Date().getFullYear()} CarSELL. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}

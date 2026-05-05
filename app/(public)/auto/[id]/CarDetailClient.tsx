"use client";

import Image from "next/image";
import { useState } from "react";
import { Car } from "@/lib/types";
import { formatPrice, formatKm, getCarImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui";
import LeadForm from "@/components/forms/LeadForm";
import FinancingCalculator from "@/components/forms/FinancingCalculator";
import {
  Fuel, Gauge, Calendar, Zap, Settings, Palette, ArrowLeft, ChevronLeft, ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface CarDetailClientProps {
  car: Car;
}

export default function CarDetailClient({ car }: CarDetailClientProps) {
  const photos = car.foto?.length ? car.foto : [getCarImageUrl(null)];
  const [activePhoto, setActivePhoto] = useState(0);

  const specs = [
    { icon: Calendar, label: "Anno", value: car.anno },
    { icon: Gauge, label: "Chilometri", value: formatKm(car.km) },
    { icon: Fuel, label: "Carburante", value: car.carburante },
    { icon: Settings, label: "Trasmissione", value: car.trasmissione },
    { icon: Zap, label: "Potenza", value: car.potenza_cv ? `${car.potenza_cv} CV` : "—" },
    { icon: Settings, label: "Motore", value: car.motore || "—" },
    { icon: Gauge, label: "Cilindrata", value: car.cilindrata || "—" },
    { icon: Zap, label: "Coppia", value: car.coppia || "—" },
    { icon: Settings, label: "Trazione", value: car.trazione || "—" },
    { icon: Fuel, label: "Consumo", value: car.consumo || "—" },
    { icon: Palette, label: "Colore Esterno", value: car.colore_esterno || "—" },
    { icon: Palette, label: "Colore Interno", value: car.colore_interno || "—" },
  ];

  return (
    <div className="pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna al catalogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Gallery */}
          <div>
            {/* Main image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-surface">
              <Image
                src={photos[activePhoto]}
                alt={`${car.marca} ${car.modello}`}
                fill
                className="object-cover"
                priority
              />
              {photos.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActivePhoto((p) =>
                        p === 0 ? photos.length - 1 : p - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActivePhoto((p) =>
                        p === photos.length - 1 ? 0 : p + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      i === activePhoto
                        ? "border-accent"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={photo}
                      alt={`Foto ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-accent font-medium mb-1">
                  {car.marca}
                </p>
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-text">
                  {car.modello}
                </h1>
              </div>
              <Badge
                variant={
                  car.stato === "Disponibile"
                    ? "success"
                    : car.stato === "Riservata"
                    ? "warning"
                    : "danger"
                }
              >
                {car.stato}
              </Badge>
            </div>

            <p className="text-3xl font-bold text-accent mt-4 mb-6">
              {formatPrice(car.prezzo)}
            </p>

            {/* Specs table */}
            <div className="surface-card rounded-xl overflow-hidden mb-6">
              <h3 className="px-5 py-3 text-sm font-semibold text-text border-b border-white/[.08]">
                Specifiche Tecniche
              </h3>
              <div className="divide-y divide-white/8">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <spec.icon className="w-4 h-4 text-text-faint" />
                      {spec.label}
                    </div>
                    <span className="text-sm font-medium text-text">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {car.descrizione && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text mb-2">
                  Descrizione
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {car.descrizione}
                </p>
              </div>
            )}

            {/* Financing Calculator */}
            <div className="mb-8">
              <FinancingCalculator prezzo={car.prezzo} />
            </div>

            {/* Lead Form */}
            <div className="surface-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-text mb-4">
                Interessato? Contattaci
              </h3>
              <LeadForm carId={car.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

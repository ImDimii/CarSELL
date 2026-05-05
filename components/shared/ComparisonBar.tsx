"use client";

import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { useComparisonStore } from "@/store/useComparisonStore";
import { formatPrice, getCarImageUrl, getCarTitle, formatNumber } from "@/lib/utils";
import { Modal } from "@/components/ui";
import { useState } from "react";
import { Car } from "@/lib/types";

function ComparisonTable({ cars, onClose }: { cars: Car[]; onClose: () => void }) {
  const specs: { label: string; key: keyof Car }[] = [
    { label: "Anno", key: "anno" },
    { label: "Prezzo", key: "prezzo" },
    { label: "Km", key: "km" },
    { label: "Carburante", key: "carburante" },
    { label: "Trasmissione", key: "trasmissione" },
    { label: "Potenza (CV)", key: "potenza_cv" },
    { label: "Motore", key: "motore" },
    { label: "Trazione", key: "trazione" },
    { label: "Colore", key: "colore_esterno" },
  ];

  const formatValue = (car: Car, key: keyof Car) => {
    const val = car[key];
    if (key === "prezzo") return formatPrice(val as number);
    if (key === "km") return `${formatNumber(val as number)} km`;
    if (val === null || val === undefined) return "—";
    return String(val);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Confronta Auto" size="full">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left p-3 text-text-muted font-medium">Specifica</th>
              {cars.map((car) => (
                <th key={car.id} className="p-3 text-center">
                  <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2">
                    <Image
                      src={getCarImageUrl(car.foto)}
                      alt={getCarTitle(car.marca, car.modello)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-semibold text-text">
                    {getCarTitle(car.marca, car.modello)}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec) => (
              <tr key={spec.key} className="border-t border-white/[.08]">
                <td className="p-3 text-text-muted font-medium">{spec.label}</td>
                {cars.map((car) => (
                  <td key={car.id} className="p-3 text-center text-text">
                    {formatValue(car, spec.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

export default function ComparisonBar() {
  const { items, removeItem, isOpen, setOpen } = useComparisonStore();
  const [showTable, setShowTable] = useState(false);

  if (items.length < 2 && !showTable) return null;

  return (
    <>
      {showTable && (
        <ComparisonTable cars={items} onClose={() => setShowTable(false)} />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-surface/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            {items.map((car) => (
              <div
                key={car.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-surface-2 rounded-lg border border-white/[.08] flex-shrink-0"
              >
                <div className="relative w-10 h-7 rounded overflow-hidden">
                  <Image
                    src={getCarImageUrl(car.foto)}
                    alt={car.modello}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-text whitespace-nowrap">
                  {car.marca} {car.modello}
                </span>
                <button
                  onClick={() => removeItem(car.id)}
                  className="p-0.5 text-text-faint hover:text-red-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowTable(true)}
            className="btn-primary flex-shrink-0 text-sm gap-2"
          >
            Confronta
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

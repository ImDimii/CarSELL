"use client";

import { useFilterStore } from "@/store/useFilterStore";
import { Search, SlidersHorizontal, X } from "lucide-react";

const MARCHE = [
  "Ferrari", "Lamborghini", "Porsche", "BMW", "Mercedes",
  "Audi", "Maserati", "Alfa Romeo", "Ford", "Tesla",
];

const CARBURANTI = ["Benzina", "Diesel", "Ibrido", "Elettrico"];
const TRASMISSIONI = ["Automatico", "Manuale"];

export default function FilterBar() {
  const { filters, setFilter, resetFilters } = useFilterStore();

  const hasFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== "" && v !== null
  );

  return (
    <div className="glass-card rounded-xl p-5 mb-8">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
        <input
          type="text"
          placeholder="Cerca per marca o modello..."
          value={filters.search || ""}
          onChange={(e) => setFilter("search", e.target.value || undefined)}
          className="input-field pl-10"
        />
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-1.5 text-sm text-text-muted">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filtri:</span>
        </div>

        <select
          value={filters.marca || ""}
          onChange={(e) => setFilter("marca", e.target.value || undefined)}
          className="input-field !w-auto !py-2 text-sm"
        >
          <option value="">Tutte le marche</option>
          {MARCHE.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={filters.carburante || ""}
          onChange={(e) =>
            setFilter("carburante", (e.target.value as any) || undefined)
          }
          className="input-field !w-auto !py-2 text-sm"
        >
          <option value="">Carburante</option>
          {CARBURANTI.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={filters.trasmissione || ""}
          onChange={(e) =>
            setFilter("trasmissione", (e.target.value as any) || undefined)
          }
          className="input-field !w-auto !py-2 text-sm"
        >
          <option value="">Trasmissione</option>
          {TRASMISSIONI.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Prezzo max (€)"
          value={filters.prezzoMax || ""}
          onChange={(e) =>
            setFilter(
              "prezzoMax",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          className="input-field !w-40 !py-2 text-sm"
        />

        <input
          type="number"
          placeholder="Km max"
          value={filters.kmMax || ""}
          onChange={(e) =>
            setFilter(
              "kmMax",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          className="input-field !w-32 !py-2 text-sm"
        />

        {hasFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <X className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

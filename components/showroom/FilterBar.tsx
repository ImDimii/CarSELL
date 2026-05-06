"use client";

import { useState } from "react";
import { useFilterStore } from "@/store/useFilterStore";
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";

const MARCHE = [
  "Ferrari", "Lamborghini", "Porsche", "BMW", "Mercedes",
  "Audi", "Maserati", "Alfa Romeo", "Ford", "Tesla",
];

const CARBURANTI = ["Benzina", "Diesel", "Ibrido", "Elettrico"];
const TRASMISSIONI = ["Automatico", "Manuale"];

export default function FilterBar() {
  const { filters, setFilter, resetFilters } = useFilterStore();
  const [isOpen, setIsOpen] = useState(false);

  const hasFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== "" && v !== null
  );

  return (
    <div className="glass-card rounded-2xl p-4 md:p-6 mb-8 border border-white/[.08]">
      {/* Search Bar & Mobile Toggle */}
      <div className="flex gap-3 relative z-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Cerca per marca o modello..."
            value={filters.search || ""}
            onChange={(e) => setFilter("search", e.target.value || undefined)}
            className="w-full bg-surface/50 border border-white/[.08] rounded-xl pl-12 pr-4 py-3.5 text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-14 h-14 bg-surface/50 border border-white/[.08] rounded-xl text-text hover:text-accent transition-colors shrink-0"
          aria-label="Toggle Filters"
        >
          {isOpen ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
        </button>
      </div>

      {/* Advanced Filters */}
      <div
        className={`mt-4 grid gap-4 transition-all duration-300 ${
          isOpen ? "grid" : "hidden md:grid"
        }`}
      >
        {/* Row 1: Selects & Years */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <select
            value={filters.marca || ""}
            onChange={(e) => setFilter("marca", e.target.value || undefined)}
            className="w-full bg-surface/50 border border-white/[.08] rounded-xl px-4 py-3.5 text-sm text-text focus:outline-none focus:border-accent appearance-none cursor-pointer"
          >
            <option value="">Tutte le marche</option>
            {MARCHE.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={filters.carburante || ""}
            onChange={(e) => setFilter("carburante", (e.target.value as any) || undefined)}
            className="w-full bg-surface/50 border border-white/[.08] rounded-xl px-4 py-3.5 text-sm text-text focus:outline-none focus:border-accent appearance-none cursor-pointer"
          >
            <option value="">Carburante</option>
            {CARBURANTI.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={filters.trasmissione || ""}
            onChange={(e) => setFilter("trasmissione", (e.target.value as any) || undefined)}
            className="w-full bg-surface/50 border border-white/[.08] rounded-xl px-4 py-3.5 text-sm text-text focus:outline-none focus:border-accent appearance-none cursor-pointer"
          >
            <option value="">Trasmissione</option>
            {TRASMISSIONI.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Anno Min"
              value={filters.annoMin || ""}
              onChange={(e) => setFilter("annoMin", e.target.value ? Number(e.target.value) : undefined)}
              className="w-1/2 bg-surface/50 border border-white/[.08] rounded-xl px-3 py-3.5 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="number"
              placeholder="Anno Max"
              value={filters.annoMax || ""}
              onChange={(e) => setFilter("annoMax", e.target.value ? Number(e.target.value) : undefined)}
              className="w-1/2 bg-surface/50 border border-white/[.08] rounded-xl px-3 py-3.5 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex gap-2 sm:col-span-2 md:col-span-2">
            <input
              type="number"
              placeholder="Prezzo Min (€)"
              value={filters.prezzoMin || ""}
              onChange={(e) => setFilter("prezzoMin", e.target.value ? Number(e.target.value) : undefined)}
              className="w-1/2 bg-surface/50 border border-white/[.08] rounded-xl px-4 py-3.5 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="number"
              placeholder="Prezzo Max (€)"
              value={filters.prezzoMax || ""}
              onChange={(e) => setFilter("prezzoMax", e.target.value ? Number(e.target.value) : undefined)}
              className="w-1/2 bg-surface/50 border border-white/[.08] rounded-xl px-4 py-3.5 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <input
            type="number"
            placeholder="Chilometraggio Max (Km)"
            value={filters.kmMax || ""}
            onChange={(e) => setFilter("kmMax", e.target.value ? Number(e.target.value) : undefined)}
            className="w-full bg-surface/50 border border-white/[.08] rounded-xl px-4 py-3.5 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
          />

          <div className="flex items-center justify-end h-full">
            {hasFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all"
              >
                <X className="w-4 h-4" />
                Reset Filtri
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

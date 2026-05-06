"use client";

import { useState, useRef, useEffect } from "react";
import { useFilterStore } from "@/store/useFilterStore";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MARCHE = [
  "Ferrari", "Lamborghini", "Porsche", "BMW", "Mercedes",
  "Audi", "Maserati", "Alfa Romeo", "Ford", "Tesla",
];

const CARBURANTI = ["Benzina", "Diesel", "Ibrido", "Elettrico"];
const TRASMISSIONI = ["Automatico", "Manuale"];

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-surface/50 border border-white/[.08] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent appearance-none cursor-pointer transition-colors"
      >
        <span className={value ? "text-text" : "text-text-muted"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-text-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-surface border border-white/[.08] rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-text-muted hover:bg-white/5 transition-colors"
            >
              Tutti / {placeholder}
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${
                  value === opt ? "text-accent bg-accent/10 font-medium" : "text-text"
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
          <CustomSelect
            value={filters.marca || ""}
            onChange={(val) => setFilter("marca", val || undefined)}
            options={MARCHE}
            placeholder="Marca"
          />

          <CustomSelect
            value={filters.carburante || ""}
            onChange={(val) => setFilter("carburante", (val as any) || undefined)}
            options={CARBURANTI}
            placeholder="Carburante"
          />

          <CustomSelect
            value={filters.trasmissione || ""}
            onChange={(val) => setFilter("trasmissione", (val as any) || undefined)}
            options={TRASMISSIONI}
            placeholder="Trasmissione"
          />

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

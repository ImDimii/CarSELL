"use client";

import CarCard from "./CarCard";
import { Car } from "@/lib/types";

interface CarGridProps {
  cars: Car[];
}

export default function CarGrid({ cars }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-2 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-text-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-text mb-1">
          Nessun risultato
        </h3>
        <p className="text-sm text-text-muted">
          Prova a modificare i filtri per trovare l&apos;auto perfetta
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-grid">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

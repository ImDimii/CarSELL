"use client";

import { useEffect, useState } from "react";
import { Car } from "@/lib/types";
import { useFilterStore } from "@/store/useFilterStore";
import FilterBar from "@/components/showroom/FilterBar";
import CarGrid from "@/components/showroom/CarGrid";

interface CatalogClientProps {
  initialCars: Car[];
}

export default function CatalogClient({ initialCars }: CatalogClientProps) {
  const { filters } = useFilterStore();
  const [filteredCars, setFilteredCars] = useState(initialCars);

  useEffect(() => {
    let result = initialCars;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.marca.toLowerCase().includes(q) ||
          c.modello.toLowerCase().includes(q)
      );
    }
    if (filters.marca) {
      result = result.filter((c) => c.marca === filters.marca);
    }
    if (filters.carburante) {
      result = result.filter((c) => c.carburante === filters.carburante);
    }
    if (filters.trasmissione) {
      result = result.filter((c) => c.trasmissione === filters.trasmissione);
    }
    if (filters.prezzoMax) {
      result = result.filter((c) => c.prezzo <= filters.prezzoMax!);
    }
    if (filters.kmMax) {
      result = result.filter((c) => c.km <= filters.kmMax!);
    }
    if (filters.annoMin) {
      result = result.filter((c) => c.anno >= filters.annoMin!);
    }
    if (filters.annoMax) {
      result = result.filter((c) => c.anno <= filters.annoMax!);
    }
    if (filters.prezzoMin) {
      result = result.filter((c) => c.prezzo >= filters.prezzoMin!);
    }

    setFilteredCars(result);
  }, [filters, initialCars]);

  return (
    <>
      <FilterBar />
      <CarGrid cars={filteredCars} />
    </>
  );
}

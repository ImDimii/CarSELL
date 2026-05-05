import { createClient } from "@/lib/supabase/server";
import CatalogClient from "./CatalogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogo Auto | CarSELL",
  description:
    "Esplora il nostro catalogo completo di auto premium. Filtra per marca, prezzo, carburante e molto altro.",
};

export default async function CatalogoPage() {
  const supabase = createClient();

  const { data: cars } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text mb-3">
            Catalogo
          </h1>
          <p className="text-lg text-text-muted">
            {cars?.length || 0} auto disponibili nella nostra selezione
          </p>
        </div>

        <CatalogClient initialCars={cars || []} />
      </div>
    </div>
  );
}

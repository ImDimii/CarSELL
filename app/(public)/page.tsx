import HeroSection from "@/components/showroom/HeroSection";
import CarCarousel from "@/components/showroom/CarCarousel";
import { createClient } from "@/lib/supabase/server";
import HomeCatalog from "./HomeCatalog";

export default async function HomePage() {
  const supabase = createClient();

  // Fetch featured cars
  const { data: featuredCars } = await supabase
    .from("cars")
    .select("*")
    .eq("featured", true)
    .eq("stato", "Disponibile")
    .order("created_at", { ascending: false })
    .limit(6);

  // Fetch all available cars for the grid
  const { data: allCars } = await supabase
    .from("cars")
    .select("*")
    .eq("stato", "Disponibile")
    .order("created_at", { ascending: false });

  return (
    <>
      <HeroSection />
      <CarCarousel cars={featuredCars || []} />

      {/* Catalog section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text mb-2">
              Tutte le Auto
            </h2>
            <p className="text-text-muted">
              Esplora il nostro catalogo completo
            </p>
          </div>
          <HomeCatalog initialCars={allCars || []} />
        </div>
      </section>
    </>
  );
}

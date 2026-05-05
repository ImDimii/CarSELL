import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CarDetailClient from "./CarDetailClient";
import { formatNumber } from "@/lib/utils";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();
  const { data: car } = await supabase
    .from("cars")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!car) return { title: "Auto non trovata | CarSELL" };

  return {
    title: `${car.marca} ${car.modello} ${car.anno} | CarSELL`,
    description: car.descrizione || `${car.marca} ${car.modello} ${car.anno} - ${car.potenza_cv}CV, ${formatNumber(car.km)} km, ${car.carburante}`,
  };
}

export default async function AutoDetailPage({ params }: Props) {
  const supabase = createClient();
  const { data: car } = await supabase
    .from("cars")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!car) notFound();

  // JSON-LD Structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.marca} ${car.modello}`,
    brand: { "@type": "Brand", name: car.marca },
    model: car.modello,
    vehicleModelDate: car.anno.toString(),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.km,
      unitCode: "KMT",
    },
    fuelType: car.carburante,
    vehicleTransmission: car.trasmissione,
    offers: {
      "@type": "Offer",
      price: car.prezzo,
      priceCurrency: "EUR",
      availability: car.stato === "Disponibile"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    image: car.foto?.[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarDetailClient car={car} />
    </>
  );
}

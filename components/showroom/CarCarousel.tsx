"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Car } from "@/lib/types";
import { formatPrice, getCarImageUrl, getCarTitle, formatNumber } from "@/lib/utils";

interface CarCarouselProps {
  cars: Car[];
}

export default function CarCarousel({ cars }: CarCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!cars.length) return null;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text mb-2">
              In Evidenza
            </h2>
            <p className="text-text-muted">Le nostre auto più esclusive</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-lg bg-surface border border-white/10 text-text-muted hover:text-text hover:border-white/20 transition-all"
              aria-label="Scorri a sinistra"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-lg bg-surface border border-white/10 text-text-muted hover:text-text hover:border-white/20 transition-all"
              aria-label="Scorri a destra"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {cars.map((car) => (
            <Link
              key={car.id}
              href={`/auto/${car.id}`}
              className="flex-shrink-0 w-[340px] sm:w-[380px] group snap-start"
            >
              <div className="surface-card-hover overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={getCarImageUrl(car.foto)}
                    alt={getCarTitle(car.marca, car.modello)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-text mb-1">
                    {getCarTitle(car.marca, car.modello)}
                  </h3>
                  <p className="text-sm text-text-muted mb-4">
                    {car.anno} · {formatNumber(car.km)} km · {car.carburante}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-accent">
                      {formatPrice(car.prezzo)}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-text-muted group-hover:text-accent transition-colors">
                      Dettagli
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

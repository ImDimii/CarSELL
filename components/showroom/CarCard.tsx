"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, GitCompareArrows, ArrowRight, Fuel, Gauge, Calendar } from "lucide-react";
import { Car } from "@/lib/types";
import { formatPrice, getCarImageUrl, getCarTitle, formatNumber } from "@/lib/utils";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useComparisonStore } from "@/store/useComparisonStore";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { toggleItem: toggleWish, isInWishlist } = useWishlistStore();
  const { toggleItem: toggleComp, isInComparison } = useComparisonStore();

  const isWished = isInWishlist(car.id);
  const isCompared = isInComparison(car.id);

  return (
    <div className="surface-card-hover overflow-hidden group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={getCarImageUrl(car.foto)}
          alt={getCarTitle(car.marca, car.modello)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

        {/* Overlay buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWish(car);
            }}
            className={`p-2 rounded-lg backdrop-blur-sm transition-all ${
              isWished
                ? "bg-red-500/20 text-red-400"
                : "bg-black/30 text-white/70 hover:text-white"
            }`}
            aria-label="Aggiungi alla wishlist"
          >
            <Heart className={`w-4 h-4 ${isWished ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleComp(car);
            }}
            className={`p-2 rounded-lg backdrop-blur-sm transition-all ${
              isCompared
                ? "bg-accent/20 text-accent"
                : "bg-black/30 text-white/70 hover:text-white"
            }`}
            aria-label="Confronta"
          >
            <GitCompareArrows className="w-4 h-4" />
          </button>
        </div>

        {/* Status badge */}
        {car.stato !== "Disponibile" && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full backdrop-blur-sm">
              {car.stato}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-text mb-2">
          {getCarTitle(car.marca, car.modello)}
        </h3>

        {/* Specs chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="flex items-center gap-1 text-xs text-text-muted bg-surface-2 px-2 py-1 rounded-md">
            <Calendar className="w-3 h-3" />
            {car.anno}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted bg-surface-2 px-2 py-1 rounded-md">
            <Gauge className="w-3 h-3" />
            {formatNumber(car.km)} km
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted bg-surface-2 px-2 py-1 rounded-md">
            <Fuel className="w-3 h-3" />
            {car.carburante}
          </span>
          {car.potenza_cv && (
            <span className="text-xs text-text-muted bg-surface-2 px-2 py-1 rounded-md">
              {car.potenza_cv} CV
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[.08]">
          <span className="text-lg font-bold text-accent">
            {formatPrice(car.prezzo)}
          </span>
          <Link
            href={`/auto/${car.id}`}
            className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-accent transition-colors group/link"
          >
            Vedi Dettaglio
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice, getCarImageUrl, getCarTitle } from "@/lib/utils";

export default function WishlistPanel() {
  const { items, isOpen, setOpen, removeItem } = useWishlistStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-md h-full bg-surface border-l border-white/10 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[.08]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold">Wishlist ({items.length})</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg text-text-muted hover:bg-surface-2 hover:text-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-muted">
              <ShoppingBag className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">La tua wishlist è vuota</p>
            </div>
          ) : (
            items.map((car) => (
              <div
                key={car.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 border border-white/[.08]"
              >
                <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={getCarImageUrl(car.foto)}
                    alt={getCarTitle(car.marca, car.modello)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/auto/${car.id}`}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-text hover:text-accent transition-colors truncate block"
                  >
                    {getCarTitle(car.marca, car.modello)}
                  </Link>
                  <p className="text-xs text-accent font-semibold">
                    {formatPrice(car.prezzo)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(car.id)}
                  className="p-2 rounded-lg text-text-faint hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-white/[.08]">
            <Link
              href="/contatti"
              onClick={() => setOpen(false)}
              className="btn-primary w-full text-center block"
            >
              Richiedi info su {items.length} auto
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

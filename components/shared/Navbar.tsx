"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, X, Car } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, setOpen } = useWishlistStore();

  const links = [
    { href: "/", label: "Home" },
    { href: "/catalogo", label: "Catalogo" },
    { href: "/contatti", label: "Contatti" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/[.08] bg-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Car className="w-7 h-7 text-accent transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold font-display tracking-tight">
              Car<span className="text-accent">SELL</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text hover:bg-surface transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="relative p-2.5 rounded-lg text-text-muted hover:text-text hover:bg-surface transition-all duration-200"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-bg text-[10px] font-bold rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-lg text-text-muted hover:text-text hover:bg-surface transition-all"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 z-50 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-display font-bold text-text hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

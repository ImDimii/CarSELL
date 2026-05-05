"use client";

import { useState, useEffect, useRef } from "react";
import { Calculator } from "lucide-react";

interface FinancingCalculatorProps {
  prezzo: number;
}

export default function FinancingCalculator({ prezzo }: FinancingCalculatorProps) {
  const [anticipo, setAnticipo] = useState(20);
  const [durata, setDurata] = useState(48);
  const [tasso, setTasso] = useState(4.9);
  const [displayRata, setDisplayRata] = useState(0);

  const animRef = useRef<number>();

  const principal = prezzo * (1 - anticipo / 100);
  const monthlyRate = tasso / 100 / 12;
  const rata =
    monthlyRate === 0
      ? principal / durata
      : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -durata));

  useEffect(() => {
    const start = displayRata;
    const end = rata;
    const duration = 400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayRata(start + (end - start) * easeOut);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [rata]);

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-text">
          Calcola il Finanziamento
        </h3>
      </div>

      <div className="space-y-6">
        {/* Anticipo */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-muted">Anticipo</span>
            <span className="text-text font-medium">{anticipo}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={anticipo}
            onChange={(e) => setAnticipo(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-text-faint mt-1">
            <span>0%</span>
            <span>
              {new Intl.NumberFormat("it-IT", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(prezzo * (anticipo / 100))}
            </span>
            <span>50%</span>
          </div>
        </div>

        {/* Durata */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-muted">Durata</span>
            <span className="text-text font-medium">{durata} mesi</span>
          </div>
          <div className="flex gap-2">
            {[24, 36, 48, 60].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDurata(d)}
                className={`flex-1 py-2 text-sm rounded-lg border transition-all ${
                  durata === d
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "bg-surface-2 border-white/10 text-text-muted hover:border-white/20"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Tasso */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-muted">Tasso annuo (TAN)</span>
            <span className="text-text font-medium">{tasso}%</span>
          </div>
          <input
            type="range"
            min={2}
            max={12}
            step={0.1}
            value={tasso}
            onChange={(e) => setTasso(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>

        {/* Result */}
        <div className="bg-surface-2 rounded-xl p-5 text-center border border-white/[.08]">
          <p className="text-sm text-text-muted mb-1">Rata mensile stimata</p>
          <p className="text-3xl font-bold text-accent font-display">
            {new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(displayRata)}
            <span className="text-base text-text-muted font-normal">/mese</span>
          </p>
          <p className="text-xs text-text-faint mt-2">
            Totale finanziato:{" "}
            {new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(principal)}
          </p>
        </div>
      </div>
    </div>
  );
}

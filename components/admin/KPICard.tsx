"use client";

import { useEffect, useState, useRef } from "react";
import { formatNumber } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  trend?: string;
}

export default function KPICard({
  title,
  value,
  prefix = "",
  suffix = "",
  icon,
  trend,
}: KPICardProps) {
  const [display, setDisplay] = useState(0);
  const animRef = useRef<number>();

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * easeOut));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [value]);

  return (
    <div className="surface-card rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-text font-display">
        {prefix}
        {formatNumber(display)}
        {suffix}
      </p>
      <p className="text-sm text-text-muted mt-1">{title}</p>
    </div>
  );
}

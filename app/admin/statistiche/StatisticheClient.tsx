"use client";

import { useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface Props {
  allLeads: { created_at: string; tipo: string }[];
  soldCars: { marca: string }[];
}

const COLORS = ["#00D4FF", "#00B4D8", "#0096C7", "#0077B6", "#023E8A", "#6DD3CE"];

export default function StatisticheClient({ allLeads, soldCars }: Props) {
  // Leads per month
  const leadsPerMonth = useMemo(() => {
    const months: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("it-IT", { month: "short", year: "2-digit" });
      months[key] = 0;
    }
    allLeads.forEach((l) => {
      const d = new Date(l.created_at);
      const key = d.toLocaleDateString("it-IT", { month: "short", year: "2-digit" });
      if (key in months) months[key]++;
    });
    return Object.entries(months).map(([name, leads]) => ({ name, leads }));
  }, [allLeads]);

  // Cars sold per brand
  const carsPerBrand = useMemo(() => {
    const brands: Record<string, number> = {};
    soldCars.forEach((c) => {
      brands[c.marca] = (brands[c.marca] || 0) + 1;
    });
    return Object.entries(brands)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [soldCars]);

  // Leads per tipo
  const leadsPerTipo = useMemo(() => {
    const tipos: Record<string, number> = {};
    allLeads.forEach((l) => {
      tipos[l.tipo] = (tipos[l.tipo] || 0) + 1;
    });
    return Object.entries(tipos).map(([name, value]) => ({ name, value }));
  }, [allLeads]);

  const tooltipStyle = {
    contentStyle: {
      background: "#111113",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      color: "#F0F0F0",
      fontSize: "12px",
    },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text font-display">Statistiche</h1>
        <p className="text-sm text-text-muted">Analisi e performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line: Leads per month */}
        <div className="surface-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-text mb-4">Lead per Mese</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={leadsPerMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip {...tooltipStyle} />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#00D4FF"
                strokeWidth={2}
                dot={{ fill: "#00D4FF", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar: Cars sold per brand */}
        <div className="surface-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-text mb-4">Auto Vendute per Brand</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={carsPerBrand}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="count" fill="#00D4FF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut: Leads per tipo */}
        <div className="surface-card rounded-xl p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-text mb-4">Lead per Tipo Richiesta</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadsPerTipo}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {leadsPerTipo.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

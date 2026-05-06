"use client";

import KPICard from "@/components/admin/KPICard";
import { CarFront, Users, CalendarDays, DollarSign } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui";

interface Props {
  carsCount: number;
  leadsThisMonth: number;
  testDrivesThisWeek: number;
  totalValue: number;
  recentLeads: any[];
}

export default function AdminDashboardClient({
  carsCount,
  leadsThisMonth,
  testDrivesThisWeek,
  totalValue,
  recentLeads,
}: Props) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text font-display">Dashboard</h1>
        <p className="text-sm text-text-muted">
          Panoramica della concessionaria
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Auto Disponibili"
          value={carsCount}
          icon={<CarFront className="w-5 h-5 text-accent" />}
        />
        <KPICard
          title="Leads Questo Mese"
          value={leadsThisMonth}
          icon={<Users className="w-5 h-5 text-accent" />}
          trend="+12%"
        />
        <KPICard
          title="Test Drive Questa Settimana"
          value={testDrivesThisWeek}
          icon={<CalendarDays className="w-5 h-5 text-accent" />}
        />
        <KPICard
          title="Valore Inventario"
          value={totalValue}
          prefix="€"
          icon={<DollarSign className="w-5 h-5 text-accent" />}
        />
      </div>

      {/* Recent leads */}
      <div className="surface-card rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[.08]">
          <h2 className="text-lg font-semibold text-text">Lead Recenti</h2>
        </div>
        <div className="divide-y divide-white/8">
          {recentLeads.length === 0 ? (
            <div className="px-5 py-8 text-center text-text-muted text-sm">
              Nessun lead recente
            </div>
          ) : (
            recentLeads.map((lead: any) => (
              <div
                key={lead.id}
                className="px-5 py-3.5 flex items-center justify-between hover:bg-surface-2 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">
                    {lead.nome} {lead.cognome}
                  </p>
                  <p className="text-xs text-text-muted truncate">
                    {lead.car?.marca} {lead.car?.modello} · {lead.tipo}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Badge
                    variant={
                      lead.stato === "Nuovo"
                        ? "accent"
                        : lead.stato === "In lavorazione"
                        ? "warning"
                        : "success"
                    }
                    className="scale-90 sm:scale-100"
                  >
                    {lead.stato}
                  </Badge>
                  <span className="text-[10px] sm:text-xs text-text-faint whitespace-nowrap">
                    {formatDate(lead.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

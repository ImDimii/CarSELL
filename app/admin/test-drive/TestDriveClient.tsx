"use client";

import { useState, useMemo } from "react";
import { TestDrive, Car } from "@/lib/types";
import { formatTime, cn } from "@/lib/utils";
import { Badge, Button, SlideOver, Input, Select, Textarea, Toast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testDriveSchema, TestDriveFormData } from "@/lib/validations";

interface TestDriveClientProps {
  initialTestDrives: TestDrive[];
  cars: Car[];
}

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
];

function getWeekDays(baseDate: Date): Date[] {
  const start = new Date(baseDate);
  start.setDate(start.getDate() - start.getDay() + 1); // Monday
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function formatDayLabel(date: Date): string {
  return new Intl.DateTimeFormat("it-IT", { weekday: "short", day: "numeric" }).format(date);
}

function formatDateStr(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function TestDriveClient({ initialTestDrives, cars }: TestDriveClientProps) {
  const [testDrives, setTestDrives] = useState(initialTestDrives);
  const [weekOffset, setWeekOffset] = useState(0);
  const [slideOpen, setSlideOpen] = useState(false);
  const [selectedTD, setSelectedTD] = useState<TestDrive | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info"; visible: boolean }>({ message: "", type: "info", visible: false });
  const router = useRouter();

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  const baseDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);

  const weekDays = useMemo(() => getWeekDays(baseDate), [baseDate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestDriveFormData>({
    resolver: zodResolver(testDriveSchema),
  });

  const getEventsForSlot = (day: Date, time: string) => {
    const dateStr = formatDateStr(day);
    return testDrives.filter(
      (td) => td.data_appuntamento === dateStr && td.ora_inizio.startsWith(time)
    );
  };

  const onSubmit = async (data: TestDriveFormData) => {
    const supabase = createClient();
    const { error } = await supabase.from("test_drives").insert([data]);
    if (!error) {
      showToast("Test drive creato!");
      setShowForm(false);
      reset();
      router.refresh();
    } else {
      showToast("Errore nella creazione", "error");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text font-display">Test Drive</h1>
          <p className="text-sm text-text-muted">Calendario settimanale</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuovo Test Drive
        </Button>
      </div>

      {/* Week navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setWeekOffset((w) => w - 1)}
          className="p-2 rounded-lg bg-surface border border-white/10 text-text-muted hover:text-text transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-medium text-text">
          {formatDayLabel(weekDays[0])} – {formatDayLabel(weekDays[6])}
        </span>
        <button
          onClick={() => setWeekOffset((w) => w + 1)}
          className="p-2 rounded-lg bg-surface border border-white/10 text-text-muted hover:text-text transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="surface-card rounded-xl overflow-hidden overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-white/[.08]">
            <div className="px-3 py-3 text-xs text-text-faint font-medium">Ora</div>
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className={cn(
                  "px-3 py-3 text-xs font-medium text-center border-l border-white/[.08]",
                  formatDateStr(day) === formatDateStr(new Date())
                    ? "text-accent bg-accent/5"
                    : "text-text-muted"
                )}
              >
                {formatDayLabel(day)}
              </div>
            ))}
          </div>

          {/* Rows */}
          {TIME_SLOTS.map((time) => (
            <div key={time} className="grid grid-cols-8 border-b border-white/[.08] last:border-0">
              <div className="px-3 py-3 text-xs text-text-faint flex items-start">
                {time}
              </div>
              {weekDays.map((day) => {
                const events = getEventsForSlot(day, time);
                return (
                  <div
                    key={day.toISOString()}
                    className="px-1 py-1 border-l border-white/[.08] min-h-[52px]"
                  >
                    {events.map((ev) => (
                      <button
                        key={ev.id}
                        onClick={() => {
                          setSelectedTD(ev);
                          setSlideOpen(true);
                        }}
                        className={cn(
                          "w-full text-left px-2 py-1 rounded text-xs font-medium truncate",
                          ev.stato === "Confermato"
                            ? "bg-accent/15 text-accent"
                            : ev.stato === "Completato"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-red-500/15 text-red-400"
                        )}
                      >
                        {ev.nome_cliente.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Detail overlay */}
      <SlideOver
        isOpen={slideOpen && !!selectedTD}
        onClose={() => { setSlideOpen(false); setSelectedTD(null); }}
        title="Dettaglio Test Drive"
      >
        {selectedTD && (
          <div className="space-y-4">
            <div className="bg-surface-2 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-text-muted">Cliente</span>
                <span className="text-sm text-text font-medium">{selectedTD.nome_cliente}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-muted">Email</span>
                <span className="text-sm text-text">{selectedTD.email_cliente}</span>
              </div>
              {selectedTD.telefono_cliente && (
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">Telefono</span>
                  <span className="text-sm text-text">{selectedTD.telefono_cliente}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-text-muted">Data</span>
                <span className="text-sm text-text">{selectedTD.data_appuntamento}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-muted">Orario</span>
                <span className="text-sm text-text">
                  {formatTime(selectedTD.ora_inizio)} – {formatTime(selectedTD.ora_fine)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-muted">Auto</span>
                <span className="text-sm text-text">
                  {selectedTD.car ? `${selectedTD.car.marca} ${selectedTD.car.modello}` : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-muted">Stato</span>
                <Badge
                  variant={
                    selectedTD.stato === "Confermato"
                      ? "accent"
                      : selectedTD.stato === "Completato"
                      ? "success"
                      : "danger"
                  }
                >
                  {selectedTD.stato}
                </Badge>
              </div>
            </div>
            {selectedTD.note && (
              <div>
                <p className="text-sm text-text-muted mb-1">Note:</p>
                <p className="text-sm text-text bg-surface-2 rounded-lg p-3">{selectedTD.note}</p>
              </div>
            )}
          </div>
        )}
      </SlideOver>

      {/* New Test Drive Form */}
      <SlideOver
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Nuovo Test Drive"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            label="Auto"
            {...register("car_id")}
            error={errors.car_id?.message}
            options={cars.map((c) => ({
              value: c.id,
              label: `${c.marca} ${c.modello} (${c.anno})`,
            }))}
          />
          <Input
            label="Nome Cliente"
            {...register("nome_cliente")}
            error={errors.nome_cliente?.message}
          />
          <Input
            label="Email Cliente"
            type="email"
            {...register("email_cliente")}
            error={errors.email_cliente?.message}
          />
          <Input
            label="Telefono (opzionale)"
            {...register("telefono_cliente")}
          />
          <Input
            label="Data"
            type="date"
            {...register("data_appuntamento")}
            error={errors.data_appuntamento?.message}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ora Inizio"
              type="time"
              {...register("ora_inizio")}
              error={errors.ora_inizio?.message}
            />
            <Input
              label="Ora Fine"
              type="time"
              {...register("ora_fine")}
              error={errors.ora_fine?.message}
            />
          </div>
          <Textarea label="Note (opzionale)" {...register("note")} />
          <Button type="submit" loading={isSubmitting} className="w-full">
            Crea Test Drive
          </Button>
        </form>
      </SlideOver>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Lead } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";
import { Badge, Button, SlideOver, Textarea, Toast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Search, Mail, Phone } from "lucide-react";

interface LeadsClientProps {
  initialLeads: Lead[];
}

export default function LeadsClient({ initialLeads }: LeadsClientProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [slideOpen, setSlideOpen] = useState(false);
  const [noteAdmin, setNoteAdmin] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info"; visible: boolean }>({ message: "", type: "info", visible: false });
  const router = useRouter();

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  const openDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setNoteAdmin(lead.note_admin || "");
    setSlideOpen(true);
  };

  const updateLeadStato = async (id: string, stato: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("leads")
      .update({ stato, note_admin: noteAdmin })
      .eq("id", id);
    if (!error) {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, stato: stato as any, note_admin: noteAdmin } : l))
      );
      showToast("Lead aggiornato");
      setSlideOpen(false);
    }
  };

  const saveNotes = async () => {
    if (!selectedLead) return;
    const supabase = createClient();
    await supabase
      .from("leads")
      .update({ note_admin: noteAdmin })
      .eq("id", selectedLead.id);
    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLead.id ? { ...l, note_admin: noteAdmin } : l))
    );
    showToast("Note salvate");
  };

  const filtered = leads.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.nome.toLowerCase().includes(q) ||
      l.cognome.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text font-display">Leads</h1>
        <p className="text-sm text-text-muted">{leads.length} richieste totali</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
        <input
          type="text"
          placeholder="Cerca per nome o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10 !py-2"
        />
      </div>

      {/* Grid of Leads (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filtered.map((lead) => (
          <div
            key={lead.id}
            onClick={() => openDetail(lead)}
            className="surface-card p-5 rounded-xl space-y-4 hover:border-accent/30 transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0">
                <p className="font-bold text-text truncate text-lg">
                  {lead.nome} {lead.cognome}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-faint mt-0.5">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{lead.email}</span>
                </div>
              </div>
              <Badge
                variant={
                  lead.stato === "Nuovo"
                    ? "accent"
                    : lead.stato === "In lavorazione"
                    ? "warning"
                    : "success"
                }
                className="text-[10px] uppercase tracking-wider"
              >
                {lead.stato}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-text-muted bg-surface-2/50 p-2 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="truncate">
                  {lead.car ? `${lead.car.marca} ${lead.car.modello}` : "Interesse Generico"}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-text-faint px-1">
                <Badge variant="default" className="bg-white/5 border-transparent">{lead.tipo}</Badge>
                <span>{formatDate(lead.created_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lead Detail SlideOver */}
      <SlideOver
        isOpen={slideOpen}
        onClose={() => setSlideOpen(false)}
        title="Dettaglio Lead"
      >
        {selectedLead && (
          <div className="space-y-6">
            {/* Contact info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Contatto</h3>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-text">
                  {selectedLead.nome} {selectedLead.cognome}
                </p>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:text-accent transition-colors">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.telefono && (
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${selectedLead.telefono}`} className="hover:text-accent transition-colors">
                      {selectedLead.telefono}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Request info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Richiesta</h3>
              <div className="bg-surface-2 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">Tipo</span>
                  <Badge variant="accent">{selectedLead.tipo}</Badge>
                </div>
                {selectedLead.car && (
                  <div className="flex justify-between">
                    <span className="text-sm text-text-muted">Auto</span>
                    <span className="text-sm text-text">{selectedLead.car.marca} {selectedLead.car.modello}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">Data</span>
                  <span className="text-sm text-text">{formatDate(selectedLead.created_at)}</span>
                </div>
              </div>
              {selectedLead.messaggio && (
                <div>
                  <p className="text-sm text-text-muted mb-1">Messaggio:</p>
                  <p className="text-sm text-text bg-surface-2 rounded-lg p-3">
                    {selectedLead.messaggio}
                  </p>
                </div>
              )}
            </div>

            {/* Admin notes */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Note Admin</h3>
              <Textarea
                value={noteAdmin}
                onChange={(e) => setNoteAdmin(e.target.value)}
                placeholder="Aggiungi note interne..."
              />
              <Button variant="secondary" size="sm" onClick={saveNotes}>
                Salva Note
              </Button>
            </div>

            {/* Status actions */}
            <div className="space-y-3 pt-4 border-t border-white/[.08]">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Aggiorna Stato</h3>
              <div className="flex gap-2">
                {["Nuovo", "In lavorazione", "Chiuso"].map((s) => (
                  <Button
                    key={s}
                    variant={selectedLead.stato === s ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => updateLeadStato(selectedLead.id, s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
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

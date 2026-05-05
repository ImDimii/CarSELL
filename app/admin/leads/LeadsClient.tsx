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

      {/* Table */}
      <div className="surface-card rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[.08]">
              <th className="text-left px-4 py-3 text-text-muted font-medium">Cliente</th>
              <th className="text-left px-4 py-3 text-text-muted font-medium hidden sm:table-cell">Auto</th>
              <th className="text-left px-4 py-3 text-text-muted font-medium hidden md:table-cell">Tipo</th>
              <th className="text-left px-4 py-3 text-text-muted font-medium">Stato</th>
              <th className="text-left px-4 py-3 text-text-muted font-medium hidden lg:table-cell">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => openDetail(lead)}
                className="hover:bg-surface-2 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-text">{lead.nome} {lead.cognome}</p>
                  <p className="text-xs text-text-faint">{lead.email}</p>
                </td>
                <td className="px-4 py-3 text-text-muted hidden sm:table-cell">
                  {lead.car ? `${lead.car.marca} ${lead.car.modello}` : "—"}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <Badge variant="accent">{lead.tipo}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      lead.stato === "Nuovo"
                        ? "accent"
                        : lead.stato === "In lavorazione"
                        ? "warning"
                        : "success"
                    }
                  >
                    {lead.stato}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-text-faint text-xs hidden lg:table-cell">
                  {formatDate(lead.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

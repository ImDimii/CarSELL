"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Car } from "@/lib/types";
import { formatPrice, getCarImageUrl, cn, formatNumber } from "@/lib/utils";
import { Badge, Button, SlideOver, Input, Select, Textarea, Toast } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSchema, CarFormData } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, Pencil, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

interface InventarioClientProps {
  initialCars: Car[];
}

export default function InventarioClient({ initialCars }: InventarioClientProps) {
  const [cars, setCars] = useState(initialCars);
  const [search, setSearch] = useState("");
  const [filterStato, setFilterStato] = useState("");
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [uploading, setUploading] = useState(false);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info"; visible: boolean }>({ message: "", type: "info", visible: false });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
  });

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  const openCreate = () => {
    setEditingCar(null);
    setPhotoUrls([]);
    reset({
      marca: "", modello: "", anno: new Date().getFullYear(), prezzo: 0, km: 0,
      carburante: "Benzina", trasmissione: "Automatico", stato: "Disponibile", featured: false,
    });
    setSlideOpen(true);
  };

  const openEdit = (car: Car) => {
    setEditingCar(car);
    setPhotoUrls(car.foto || []);
    reset({
      marca: car.marca, modello: car.modello, anno: car.anno, prezzo: car.prezzo,
      km: car.km, carburante: car.carburante as any, trasmissione: car.trasmissione as any,
      potenza_cv: car.potenza_cv, motore: car.motore, cilindrata: car.cilindrata,
      coppia: car.coppia, trazione: car.trazione as any, consumo: car.consumo,
      emissioni: car.emissioni, colore_esterno: car.colore_esterno,
      colore_interno: car.colore_interno, descrizione: car.descrizione,
      stato: car.stato as any, featured: car.featured,
    });
    setSlideOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    const supabase = createClient();

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage
        .from("car-photos")
        .upload(path, file);
      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("car-photos")
          .getPublicUrl(data.path);
        setPhotoUrls((prev) => [...prev, urlData.publicUrl]);
      }
    }
    setUploading(false);
  };

  const onSubmit = async (data: CarFormData) => {
    const supabase = createClient();
    const payload = { ...data, foto: photoUrls };

    if (editingCar) {
      const { error } = await supabase
        .from("cars")
        .update(payload)
        .eq("id", editingCar.id);
      if (!error) {
        showToast("Auto aggiornata con successo");
        setSlideOpen(false);
        router.refresh();
      } else {
        showToast("Errore nell'aggiornamento", "error");
      }
    } else {
      const { error } = await supabase.from("cars").insert([payload]);
      if (!error) {
        showToast("Auto aggiunta con successo");
        setSlideOpen(false);
        router.refresh();
      } else {
        showToast("Errore nell'inserimento", "error");
      }
    }
  };

  const handleDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("cars").delete().eq("id", id);
    if (!error) {
      setCars((prev) => prev.filter((c) => c.id !== id));
      showToast("Auto eliminata");
    }
  };

  const handleStatusToggle = async (car: Car) => {
    const nextStato =
      car.stato === "Disponibile"
        ? "Riservata"
        : car.stato === "Riservata"
        ? "Venduta"
        : "Disponibile";
    const supabase = createClient();
    await supabase.from("cars").update({ stato: nextStato }).eq("id", car.id);
    setCars((prev) =>
      prev.map((c) => (c.id === car.id ? { ...c, stato: nextStato as any } : c))
    );
  };

  const filtered = cars.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      c.marca.toLowerCase().includes(q) ||
      c.modello.toLowerCase().includes(q);
    const matchStato = !filterStato || c.stato === filterStato;
    return matchSearch && matchStato;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text font-display">Inventario</h1>
          <p className="text-sm text-text-muted">{cars.length} auto totali</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Aggiungi Auto
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
          <input
            type="text"
            placeholder="Cerca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 !py-2"
          />
        </div>
        <select
          value={filterStato}
          onChange={(e) => setFilterStato(e.target.value)}
          className="input-field !w-auto !py-2"
        >
          <option value="">Tutti gli stati</option>
          <option value="Disponibile">Disponibile</option>
          <option value="Riservata">Riservata</option>
          <option value="Venduta">Venduta</option>
        </select>
      </div>

      {/* Table */}
      <div className="surface-card rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[.08]">
              <th className="text-left px-4 py-3 text-text-muted font-medium">Auto</th>
              <th className="text-left px-4 py-3 text-text-muted font-medium hidden sm:table-cell">Anno</th>
              <th className="text-left px-4 py-3 text-text-muted font-medium">Prezzo</th>
              <th className="text-left px-4 py-3 text-text-muted font-medium hidden md:table-cell">Km</th>
              <th className="text-left px-4 py-3 text-text-muted font-medium">Stato</th>
              <th className="text-right px-4 py-3 text-text-muted font-medium">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {filtered.map((car) => (
              <tr key={car.id} className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-8 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={getCarImageUrl(car.foto)}
                        alt={car.modello}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-text">{car.marca} {car.modello}</p>
                      <p className="text-xs text-text-faint">{car.carburante}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-muted hidden sm:table-cell">{car.anno}</td>
                <td className="px-4 py-3 text-accent font-medium">{formatPrice(car.prezzo)}</td>
                <td className="px-4 py-3 text-text-muted hidden md:table-cell">
                  {formatNumber(car.km)}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleStatusToggle(car)}>
                    <Badge
                      variant={
                        car.stato === "Disponibile"
                          ? "success"
                          : car.stato === "Riservata"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {car.stato}
                    </Badge>
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(car)}
                      className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Car Form SlideOver */}
      <SlideOver
        isOpen={slideOpen}
        onClose={() => setSlideOpen(false)}
        title={editingCar ? "Modifica Auto" : "Nuova Auto"}
        width="max-w-xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Marca" {...register("marca")} error={errors.marca?.message} />
            <Input label="Modello" {...register("modello")} error={errors.modello?.message} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Anno" type="number" {...register("anno")} error={errors.anno?.message} />
            <Input label="Prezzo (€)" type="number" {...register("prezzo")} error={errors.prezzo?.message} />
            <Input label="Km" type="number" {...register("km")} error={errors.km?.message} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Carburante"
              {...register("carburante")}
              options={[
                { value: "Benzina", label: "Benzina" },
                { value: "Diesel", label: "Diesel" },
                { value: "Ibrido", label: "Ibrido" },
                { value: "Elettrico", label: "Elettrico" },
              ]}
            />
            <Select
              label="Trasmissione"
              {...register("trasmissione")}
              options={[
                { value: "Automatico", label: "Automatico" },
                { value: "Manuale", label: "Manuale" },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Potenza (CV)" type="number" {...register("potenza_cv")} />
            <Input label="Motore" {...register("motore")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Cilindrata" {...register("cilindrata")} />
            <Input label="Coppia" {...register("coppia")} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Trazione"
              {...register("trazione")}
              options={[
                { value: "FWD", label: "FWD" },
                { value: "RWD", label: "RWD" },
                { value: "AWD", label: "AWD" },
              ]}
            />
            <Input label="Consumo" {...register("consumo")} />
            <Input label="Emissioni" {...register("emissioni")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Colore Esterno" {...register("colore_esterno")} />
            <Input label="Colore Interno" {...register("colore_interno")} />
          </div>
          <Textarea label="Descrizione" {...register("descrizione")} />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Stato"
              {...register("stato")}
              options={[
                { value: "Disponibile", label: "Disponibile" },
                { value: "Riservata", label: "Riservata" },
                { value: "Venduta", label: "Venduta" },
              ]}
            />
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("featured")} className="w-4 h-4 rounded" />
                <span className="text-sm text-text-muted">In evidenza</span>
              </label>
            </div>
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Foto</label>
            <label className="flex items-center justify-center gap-2 w-full py-8 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-accent/30 hover:bg-accent/5 transition-all">
              <Upload className="w-5 h-5 text-text-muted" />
              <span className="text-sm text-text-muted">
                {uploading ? "Caricamento..." : "Trascina o clicca per caricare"}
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            {photoUrls.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {photoUrls.map((url, i) => (
                  <div key={i} className="relative w-16 h-12 rounded-lg overflow-hidden">
                    <Image src={url} alt={`Foto ${i + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoUrls((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center text-white text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" loading={isSubmitting} className="flex-1">
              {editingCar ? "Salva Modifiche" : "Aggiungi Auto"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setSlideOpen(false)}>
              Annulla
            </Button>
          </div>
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

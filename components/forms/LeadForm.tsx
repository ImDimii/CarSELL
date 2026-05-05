"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, LeadFormData } from "@/lib/validations";
import { Input, Select, Textarea, Button } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

interface LeadFormProps {
  carId?: string;
}

export default function LeadForm({ carId }: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      car_id: carId || null,
      tipo: "Preventivo",
    },
  });

  const nextStep = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(["nome", "cognome", "email", "telefono"]);
    } else if (step === 2) {
      valid = await trigger(["tipo"]);
    }
    if (valid) setStep(step + 1);
  };

  const onSubmit = async (data: LeadFormData) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { privacy, ...insertData } = data;
      await supabase.from("leads").insert([insertData]);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00D4FF", "#F0F0F0", "#0A0A0B"],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">
          Richiesta Inviata!
        </h3>
        <p className="text-text-muted">
          Ti ricontatteremo al più presto. Grazie per averci scelto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                s <= step
                  ? "bg-accent text-bg"
                  : "bg-surface-2 text-text-faint"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`flex-1 h-0.5 rounded-full transition-all ${
                  s < step ? "bg-accent" : "bg-surface-2"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Contact Info */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-up">
          <h3 className="text-lg font-semibold text-text">I Tuoi Dati</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nome"
              {...register("nome")}
              error={errors.nome?.message}
              placeholder="Mario"
            />
            <Input
              label="Cognome"
              {...register("cognome")}
              error={errors.cognome?.message}
              placeholder="Rossi"
            />
          </div>
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="mario@email.com"
          />
          <Input
            label="Telefono (opzionale)"
            type="tel"
            {...register("telefono")}
            placeholder="+39 333 1234567"
          />
          <div className="flex justify-end">
            <Button type="button" onClick={nextStep} className="gap-2">
              Avanti
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Request Type */}
      {step === 2 && (
        <div className="space-y-4 animate-fade-up">
          <h3 className="text-lg font-semibold text-text">Tipo Richiesta</h3>
          <Select
            label="Cosa ti interessa?"
            {...register("tipo")}
            error={errors.tipo?.message}
            options={[
              { value: "Preventivo", label: "Preventivo" },
              { value: "Finanziamento", label: "Finanziamento" },
              { value: "Permuta", label: "Permuta" },
              { value: "Test Drive", label: "Test Drive" },
            ]}
          />
          <div className="flex justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Indietro
            </Button>
            <Button type="button" onClick={nextStep} className="gap-2">
              Avanti
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Message */}
      {step === 3 && (
        <div className="space-y-4 animate-fade-up">
          <h3 className="text-lg font-semibold text-text">Il Tuo Messaggio</h3>
          <Textarea
            label="Messaggio (opzionale)"
            {...register("messaggio")}
            placeholder="Dicci di più su cosa cerchi..."
          />
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("privacy")}
              className="mt-1 w-4 h-4 rounded border-white/20 bg-surface-2 text-accent focus:ring-accent"
            />
            <span className="text-sm text-text-muted">
              Ho letto e accetto la{" "}
              <span className="text-accent">Privacy Policy</span> e acconsento
              al trattamento dei miei dati personali.
            </span>
          </label>
          {errors.privacy && (
            <p className="text-xs text-red-400">{errors.privacy.message}</p>
          )}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(2)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Indietro
            </Button>
            <Button type="submit" loading={loading} className="gap-2">
              Invia Richiesta
              <CheckCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

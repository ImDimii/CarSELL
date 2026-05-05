import { z } from "zod";

export const leadSchema = z.object({
  nome: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  cognome: z.string().min(2, "Il cognome deve avere almeno 2 caratteri"),
  email: z.string().email("Inserisci un'email valida"),
  telefono: z.string().optional(),
  car_id: z.string().uuid().optional().nullable(),
  tipo: z.enum(["Preventivo", "Finanziamento", "Permuta", "Test Drive"]),
  messaggio: z.string().optional(),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Devi accettare la privacy policy" }),
  }),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const carSchema = z.object({
  marca: z.string().min(1, "La marca è obbligatoria"),
  modello: z.string().min(1, "Il modello è obbligatorio"),
  anno: z.coerce.number().min(1900).max(2030),
  prezzo: z.coerce.number().min(0, "Il prezzo deve essere positivo"),
  km: z.coerce.number().min(0),
  carburante: z.enum(["Benzina", "Diesel", "Ibrido", "Elettrico"]),
  trasmissione: z.enum(["Automatico", "Manuale"]),
  potenza_cv: z.coerce.number().optional().nullable(),
  motore: z.string().optional().nullable(),
  cilindrata: z.string().optional().nullable(),
  coppia: z.string().optional().nullable(),
  trazione: z.enum(["FWD", "RWD", "AWD"]).optional().nullable(),
  consumo: z.string().optional().nullable(),
  emissioni: z.string().optional().nullable(),
  colore_esterno: z.string().optional().nullable(),
  colore_interno: z.string().optional().nullable(),
  descrizione: z.string().optional().nullable(),
  stato: z.enum(["Disponibile", "Riservata", "Venduta"]).default("Disponibile"),
  featured: z.boolean().default(false),
});

export type CarFormData = z.infer<typeof carSchema>;

export const testDriveSchema = z.object({
  car_id: z.string().uuid("Seleziona un'auto"),
  nome_cliente: z.string().min(2, "Il nome è obbligatorio"),
  email_cliente: z.string().email("Email non valida"),
  telefono_cliente: z.string().optional(),
  data_appuntamento: z.string().min(1, "Seleziona una data"),
  ora_inizio: z.string().min(1, "Seleziona un orario di inizio"),
  ora_fine: z.string().min(1, "Seleziona un orario di fine"),
  note: z.string().optional(),
});

export type TestDriveFormData = z.infer<typeof testDriveSchema>;

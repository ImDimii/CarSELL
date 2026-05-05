export type Carburante = "Benzina" | "Diesel" | "Ibrido" | "Elettrico";
export type Trasmissione = "Automatico" | "Manuale";
export type Trazione = "FWD" | "RWD" | "AWD";
export type StatoAuto = "Disponibile" | "Riservata" | "Venduta";
export type TipoRichiesta = "Preventivo" | "Finanziamento" | "Permuta" | "Test Drive";
export type StatoLead = "Nuovo" | "In lavorazione" | "Chiuso";
export type StatoTestDrive = "Confermato" | "Cancellato" | "Completato";

export interface Car {
  id: string;
  created_at: string;
  marca: string;
  modello: string;
  anno: number;
  prezzo: number;
  km: number;
  carburante: Carburante;
  trasmissione: Trasmissione;
  potenza_cv: number | null;
  motore: string | null;
  cilindrata: string | null;
  coppia: string | null;
  trazione: Trazione | null;
  consumo: string | null;
  emissioni: string | null;
  colore_esterno: string | null;
  colore_interno: string | null;
  descrizione: string | null;
  stato: StatoAuto;
  foto: string[];
  featured: boolean;
}

export interface Lead {
  id: string;
  created_at: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string | null;
  car_id: string | null;
  tipo: TipoRichiesta;
  messaggio: string | null;
  stato: StatoLead;
  note_admin: string | null;
  car?: Car;
}

export interface TestDrive {
  id: string;
  created_at: string;
  car_id: string;
  lead_id: string | null;
  nome_cliente: string;
  email_cliente: string;
  telefono_cliente: string | null;
  data_appuntamento: string;
  ora_inizio: string;
  ora_fine: string;
  stato: StatoTestDrive;
  note: string | null;
  car?: Car;
}

export interface Filters {
  marca?: string;
  modello?: string;
  annoMin?: number;
  annoMax?: number;
  prezzoMin?: number;
  prezzoMax?: number;
  carburante?: Carburante;
  kmMax?: number;
  trasmissione?: Trasmissione;
  search?: string;
}

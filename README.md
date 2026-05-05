# 🏎️ CarSELL | Piattaforma Premium per Concessionarie

![CarSELL Hero](https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80)

**CarSELL** è una piattaforma web ultra-moderna e ad alte prestazioni progettata esclusivamente per concessionarie di auto di lusso e premium. Costruita da zero con un design system "dark-luxury" dal sapore cinematografico, offre un'esperienza utente fluida e immersiva studiata per incrementare le vendite e generare lead di alta qualità.

---

## ✨ Funzionalità Principali

### 🏢 Showroom Pubblico
* **Design Cinematografico**: Un'estetica scura, lussuosa e su misura per i veicoli di fascia alta.
* **Catalogo Avanzato**: Sistema di filtraggio lato client (per marca, prezzo, carburante, chilometraggio) per ricerche fulminee.
* **Dettaglio Veicoli Immersivo**: Gallerie fotografiche interattive, specifiche tecniche dettagliate e badge dinamici per lo stato del veicolo.
* **Calcolatore Finanziamento**: Strumento di stima interattivo e in tempo reale con animazioni sui numeri (count-up).
* **Wishlist & Comparazione**: Gli utenti possono salvare le auto preferite in una Wishlist laterale (slide-out) e confrontare fino a 3 veicoli fianco a fianco grazie a una barra di comparazione sempre visibile (sticky).
* **Generazione Lead**: Moduli di contatto multi-step ad alta conversione, completi di animazione "confetti" al momento dell'invio.

### 🛡️ Pannello Admin (Dashboard)
* **Autenticazione Sicura**: Percorsi protetti gestiti tramite Supabase Auth e i Middleware di Next.js.
* **Panoramica KPI**: Analisi immediata dell'inventario totale, dei volumi di lead e dei test drive programmati.
* **Gestione Inventario (CRUD)**: Operazioni complete per aggiungere/modificare auto, con supporto per il caricamento di foto multiple ad alta risoluzione direttamente su Supabase Storage.
* **CRM per i Lead**: Tieni traccia, aggiorna e gestisci le richieste dei clienti integrando note interne riservate agli admin.
* **Calendario Test Drive**: Visualizzazione settimanale interattiva per gestire facilmente gli appuntamenti.
* **Statistiche**: Grafici interattivi e dal design elegante (basati su Recharts) per analizzare le vendite per brand e le tipologie di richieste.

---

## 🛠️ Tecnologie Utilizzate (Tech Stack)

Questo progetto sfrutta le tecnologie più all'avanguardia per lo sviluppo web moderno:

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
* **Stile**: [Tailwind CSS](https://tailwindcss.com/) (Animazioni personalizzate ed effetto Glassmorphism)
* **Backend as a Service**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage, policy RLS)
* **Gestione Stato**: [Zustand](https://github.com/pmndrs/zustand)
* **Moduli & Validazione**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
* **Icone & UI**: [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Visualizzazione Dati**: [Recharts](https://recharts.org/)

---

## 🚀 Guida all'Installazione

Segui queste istruzioni per avviare CarSELL in ambiente locale.

### 1. Clona il repository
```bash
git clone https://github.com/ImDimii/CarSELL.git
cd CarSELL
```

### 2. Installa le dipendenze
```bash
npm install
```

### 3. Configura Supabase
1. Crea un nuovo progetto su [Supabase](https://supabase.com/).
2. Crea un bucket di archiviazione pubblico (Storage) chiamato `car-photos`.
3. Apri l'**SQL Editor** nella dashboard di Supabase ed esegui l'intero contenuto del file `supabase-seed.sql`. Questo script creerà automaticamente le tabelle necessarie, imposterà le regole di sicurezza (RLS) e popolerà il database con 10 auto di lusso per fare dei test, complete di gallerie fotografiche multiple.

### 4. Variabili d'Ambiente
Rinomina il file `.env.local.example` in `.env.local` e inserisci le credenziali del tuo progetto Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=il_tuo_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=la_tua_anon_key_supabase
SUPABASE_SERVICE_ROLE_KEY=la_tua_service_role_key_supabase
```

### 5. Avvia il Server di Sviluppo
```bash
npm run dev
```
Apri [http://localhost:3000](http://localhost:3000) nel tuo browser. Per accedere al pannello admin, vai su `/admin/login` (Nota: devi prima creare un utente nella sezione Auth di Supabase).

---

## 🏗️ Note sull'Architettura
* **Hydration Safe**: Utilizza una formattazione numerica deterministica personalizzata (Regex) per prevenire gli errori di "React Hydration Mismatch" tipici di Next.js tra Server e Client.
* **Libreria Componenti Interna**: Include una libreria di componenti UI riutilizzabili (`components/ui`) costruita senza pesanti librerie esterne come Radix o MUI, per garantire la massima flessibilità stilistica e prestazioni elevate.

---
*Progettato & Sviluppato per il web moderno.*

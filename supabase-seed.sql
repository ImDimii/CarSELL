-- ============================================
-- CarSELL - Supabase Schema + Seed Data
-- Run this in the Supabase SQL Editor
-- ============================================

-- 1. CREATE TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  marca text NOT NULL,
  modello text NOT NULL,
  anno int NOT NULL,
  prezzo numeric NOT NULL,
  km int NOT NULL,
  carburante text CHECK (carburante IN ('Benzina', 'Diesel', 'Ibrido', 'Elettrico')),
  trasmissione text CHECK (trasmissione IN ('Automatico', 'Manuale')),
  potenza_cv int,
  motore text,
  cilindrata text,
  coppia text,
  trazione text CHECK (trazione IN ('FWD', 'RWD', 'AWD')),
  consumo text,
  emissioni text,
  colore_esterno text,
  colore_interno text,
  descrizione text,
  stato text DEFAULT 'Disponibile' CHECK (stato IN ('Disponibile', 'Riservata', 'Venduta')),
  foto text[],
  featured boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  nome text NOT NULL,
  cognome text NOT NULL,
  email text NOT NULL,
  telefono text,
  car_id uuid REFERENCES cars(id),
  tipo text CHECK (tipo IN ('Preventivo', 'Finanziamento', 'Permuta', 'Test Drive')),
  messaggio text,
  stato text DEFAULT 'Nuovo' CHECK (stato IN ('Nuovo', 'In lavorazione', 'Chiuso')),
  note_admin text
);

CREATE TABLE IF NOT EXISTS test_drives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  car_id uuid REFERENCES cars(id),
  lead_id uuid REFERENCES leads(id),
  nome_cliente text NOT NULL,
  email_cliente text NOT NULL,
  telefono_cliente text,
  data_appuntamento date NOT NULL,
  ora_inizio time NOT NULL,
  ora_fine time NOT NULL,
  stato text DEFAULT 'Confermato' CHECK (stato IN ('Confermato', 'Cancellato', 'Completato')),
  note text
);

-- 2. ROW LEVEL SECURITY
-- ============================================

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_drives ENABLE ROW LEVEL SECURITY;

-- Cars: public read, admin write
CREATE POLICY "cars_select_public" ON cars FOR SELECT USING (true);
CREATE POLICY "cars_insert_auth" ON cars FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "cars_update_auth" ON cars FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "cars_delete_auth" ON cars FOR DELETE USING (auth.role() = 'authenticated');

-- Leads: public insert, admin read/update
CREATE POLICY "leads_insert_public" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "leads_select_auth" ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "leads_update_auth" ON leads FOR UPDATE USING (auth.role() = 'authenticated');

-- Test Drives: public insert, admin CRUD
CREATE POLICY "td_insert_public" ON test_drives FOR INSERT WITH CHECK (true);
CREATE POLICY "td_select_auth" ON test_drives FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "td_update_auth" ON test_drives FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "td_delete_auth" ON test_drives FOR DELETE USING (auth.role() = 'authenticated');

-- 3. STORAGE BUCKET
-- ============================================
-- Create "car-photos" public bucket via Supabase Dashboard > Storage

-- 4. SEED DATA
-- ============================================

INSERT INTO cars (marca, modello, anno, prezzo, km, carburante, trasmissione, potenza_cv, motore, cilindrata, coppia, trazione, consumo, emissioni, colore_esterno, colore_interno, descrizione, stato, foto, featured) VALUES
(
  'Ferrari', '488 GTB', 2021, 285000, 12000,
  'Benzina', 'Automatico', 670, 'V8 Biturbo', '3902 cc', '760 Nm', 'RWD',
  '11.4 L/100km', '260 g/km', 'Rosso Corsa', 'Nero',
  'La Ferrari 488 GTB rappresenta il massimo della sportività italiana. Motore V8 biturbo da 670 CV, design aerodinamico mozzafiato e prestazioni da supercar pura. Un capolavoro di ingegneria.',
  'Disponibile',
  ARRAY[
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80',
    'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80'
  ],
  true
),
(
  'Lamborghini', 'Urus', 2023, 245000, 8500,
  'Benzina', 'Automatico', 650, 'V8 Biturbo', '3996 cc', '850 Nm', 'AWD',
  '12.7 L/100km', '325 g/km', 'Giallo Auge', 'Nero Ade',
  'Il Lamborghini Urus è il SUV più potente al mondo. Design aggressivo tipico Lamborghini con la praticità di un SUV di lusso. Prestazioni incredibili su ogni terreno.',
  'Disponibile',
  ARRAY[
    'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
    'https://images.unsplash.com/photo-1669023030485-573b6a75ab64?w=800&q=80'
  ],
  true
),
(
  'Porsche', '911 Carrera', 2022, 135000, 18000,
  'Benzina', 'Automatico', 385, 'Flat-6 Biturbo', '2981 cc', '450 Nm', 'RWD',
  '8.9 L/100km', '206 g/km', 'Grigio Agata', 'Cuoio Cognac',
  'L''iconica Porsche 911 Carrera nella sua versione più equilibrata. Il motore flat-6 biturbo offre un sound inconfondibile e prestazioni sportive eccezionali per l''uso quotidiano.',
  'Disponibile',
  ARRAY[
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80'
  ],
  true
),
(
  'BMW', 'M4 Competition', 2023, 98000, 5200,
  'Benzina', 'Automatico', 510, 'L6 Biturbo', '2993 cc', '650 Nm', 'RWD',
  '10.2 L/100km', '234 g/km', 'Blu San Marino', 'Merino Nero',
  'La BMW M4 Competition è la coupé sportiva per eccellenza. Con il suo motore 6 cilindri in linea biturbo da 510 CV, offre prestazioni da pista con il comfort di una GT.',
  'Disponibile',
  ARRAY['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80'],
  true
),
(
  'Mercedes', 'AMG GT', 2022, 168000, 15000,
  'Benzina', 'Automatico', 585, 'V8 Biturbo', '3982 cc', '700 Nm', 'RWD',
  '11.3 L/100km', '258 g/km', 'Grigio Selenite', 'Nappa Rosso',
  'La Mercedes AMG GT è una granturismo dalla personalità travolgente. Il V8 biturbo handcrafted garantisce prestazioni superlative e un rombo che fa vibrare l''anima.',
  'Disponibile',
  ARRAY['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80'],
  false
),
(
  'Audi', 'RS6 Avant', 2023, 142000, 9800,
  'Ibrido', 'Automatico', 600, 'V8 Biturbo MHEV', '3996 cc', '800 Nm', 'AWD',
  '11.5 L/100km', '270 g/km', 'Verde Sonoma', 'Valcona Nero',
  'L''Audi RS6 Avant è la familiare più veloce al mondo. 600 CV in un pacchetto elegante e versatile, perfetta per chi vuole tutto: spazio, lusso e prestazioni brutali.',
  'Disponibile',
  ARRAY['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'],
  false
),
(
  'Maserati', 'Ghibli', 2021, 72000, 32000,
  'Diesel', 'Automatico', 275, 'V6 Turbodiesel', '2987 cc', '600 Nm', 'RWD',
  '6.2 L/100km', '163 g/km', 'Blu Emozione', 'Cuoio Naturale',
  'La Maserati Ghibli diesel combina l''eleganza del Tridente con l''efficienza del motore turbodiesel V6. Comfort di viaggio eccezionale e design che non passa mai inosservato.',
  'Disponibile',
  ARRAY['https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80'],
  false
),
(
  'Alfa Romeo', 'Giulia Quadrifoglio', 2022, 85000, 21000,
  'Benzina', 'Automatico', 510, 'V6 Biturbo', '2891 cc', '600 Nm', 'RWD',
  '9.0 L/100km', '210 g/km', 'Verde Montreal', 'Alcantara Nero',
  'La Giulia Quadrifoglio è il cuore sportivo di Alfa Romeo. Il V6 biturbo da 510 CV firmato Ferrari la rende una delle berline più veloci al Nürburgring.',
  'Disponibile',
  ARRAY['https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=800&q=80'],
  false
),
(
  'Ford', 'Mustang Shelby GT500', 2022, 95000, 11000,
  'Benzina', 'Manuale', 760, 'V8 Supercharged', '5163 cc', '847 Nm', 'RWD',
  '15.7 L/100km', '362 g/km', 'Bianco Oxford', 'Recaro Nero',
  'La Ford Mustang Shelby GT500 è il muscle car americano definitivo. Con 760 CV e il cambio manuale, offre un''esperienza di guida pura e adrenalinica.',
  'Disponibile',
  ARRAY['https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?w=800&q=80'],
  false
),
(
  'Tesla', 'Model S Plaid', 2024, 112000, 3200,
  'Elettrico', 'Automatico', 1020, 'Tri-Motor Elettrico', 'N/A', 'N/A', 'AWD',
  '0 L/100km', '0 g/km', 'Bianco Perla', 'Vegano Nero',
  'La Tesla Model S Plaid è la berlina elettrica più veloce al mondo. Tre motori elettrici per 1.020 CV, 0-100 km/h in 2.1 secondi e un''autonomia di oltre 600 km.',
  'Disponibile',
  ARRAY['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80'],
  false
);

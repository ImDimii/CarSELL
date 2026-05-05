# 🏎️ CarSELL | Premium Auto Dealership Platform

![CarSELL Hero](https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80)

**CarSELL** is an ultra-modern, high-performance web platform designed exclusively for luxury and premium automotive dealerships. Built from the ground up with a cinematic dark-luxury design system, it provides a seamless and immersive user experience to drive sales and generate high-quality leads.

---

## ✨ Key Features

### 🏢 Public Showroom
* **Cinematic Design**: A bespoke dark-luxury aesthetic tailored for high-end vehicles.
* **Advanced Catalog**: Client-side filtering by brand, price, fuel type, and mileage for lightning-fast searches.
* **Interactive Vehicle Details**: Immersive photo galleries, detailed technical specs, and dynamic badges.
* **Finance Calculator**: Real-time interactive financing estimator with animated number counters.
* **Wishlist & Comparison**: Users can save favorite cars to a slide-out wishlist and compare up to 3 cars side-by-side using the sticky comparison bar.
* **Lead Generation**: Multi-step, high-conversion contact forms with visual "confetti" feedback upon submission.

### 🛡️ Admin Dashboard
* **Secure Authentication**: Protected routes powered by Supabase Auth and Next.js Middleware.
* **KPI Overview**: Instant insights into total inventory, lead volumes, and scheduled test drives.
* **Inventory Management**: Full CRUD operations for cars with support for multiple high-res photo uploads directly to Supabase Storage.
* **Lead CRM**: Track, update, and manage incoming client requests with integrated admin notes.
* **Test Drive Calendar**: Weekly grid view to manage and schedule test drive appointments.
* **Analytics**: Beautiful, interactive charts (Recharts) visualizing sales distribution and lead types.

---

## 🛠️ Tech Stack

This project leverages the bleeding edge of modern web development:

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom animations & glassmorphism)
* **Backend as a Service**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage, RLS Policies)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)
* **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
* **Icons & UI**: [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Data Visualization**: [Recharts](https://recharts.org/)

---

## 🚀 Getting Started

Follow these instructions to run CarSELL locally.

### 1. Clone the repository
```bash
git clone https://github.com/ImDimii/CarSELL.git
cd CarSELL
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Supabase
1. Create a new project on [Supabase](https://supabase.com/).
2. Create a public storage bucket named `car-photos`.
3. Open the **SQL Editor** in your Supabase dashboard and run the entire contents of the `supabase-seed.sql` file. This will create the required tables, set up Row Level Security (RLS) policies, and populate the database with 10 premium test cars.

### 4. Environment Variables
Rename `.env.local.example` to `.env.local` and fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. To access the admin panel, navigate to `/admin/login` (Note: you must create a user in the Supabase Auth dashboard first).

---

## 🏗️ Architecture Notes
* **Hydration Safe**: Utilizes custom deterministic number formatting to prevent Next.js React Hydration errors between server and client rendering.
* **Component Library**: Includes a custom, reusable UI component library (`components/ui`) built without external heavy libraries like Radix or MUI, ensuring maximum performance and styling flexibility.

---
*Designed & Developed for the modern web.*

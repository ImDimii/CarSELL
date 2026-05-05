import { createClient } from "@/lib/supabase/server";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  // KPI data
  const { count: carsCount } = await supabase
    .from("cars")
    .select("*", { count: "exact", head: true })
    .eq("stato", "Disponibile");

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const { count: leadsThisMonth } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOfMonth);

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const { count: testDrivesThisWeek } = await supabase
    .from("test_drives")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOfWeek.toISOString());

  const { data: allCars } = await supabase
    .from("cars")
    .select("prezzo")
    .eq("stato", "Disponibile");

  const totalValue = allCars?.reduce((sum, c) => sum + Number(c.prezzo), 0) || 0;

  // Recent leads
  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*, car:cars(marca, modello)")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <AdminDashboardClient
      carsCount={carsCount || 0}
      leadsThisMonth={leadsThisMonth || 0}
      testDrivesThisWeek={testDrivesThisWeek || 0}
      totalValue={totalValue}
      recentLeads={recentLeads || []}
    />
  );
}

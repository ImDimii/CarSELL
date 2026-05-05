import { createClient } from "@/lib/supabase/server";
import StatisticheClient from "./StatisticheClient";

export default async function StatistichePage() {
  const supabase = createClient();

  // Leads per month (last 6 months)
  const { data: allLeads } = await supabase
    .from("leads")
    .select("created_at, tipo, stato")
    .order("created_at", { ascending: true });

  const { data: soldCars } = await supabase
    .from("cars")
    .select("marca")
    .eq("stato", "Venduta");

  const { data: testDrives } = await supabase
    .from("test_drives")
    .select("stato, data_appuntamento");

  return (
    <StatisticheClient
      allLeads={allLeads || []}
      soldCars={soldCars || []}
      testDrives={testDrives || []}
    />
  );
}

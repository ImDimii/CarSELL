import { createClient } from "@/lib/supabase/server";
import StatisticheClient from "./StatisticheClient";

export default async function StatistichePage() {
  const supabase = createClient();

  // Leads per month (last 6 months)
  const { data: allLeads } = await supabase
    .from("leads")
    .select("created_at, tipo")
    .order("created_at", { ascending: true });

  // Cars sold per brand
  const { data: soldCars } = await supabase
    .from("cars")
    .select("marca")
    .eq("stato", "Venduta");

  return (
    <StatisticheClient
      allLeads={allLeads || []}
      soldCars={soldCars || []}
    />
  );
}

import { createClient } from "@/lib/supabase/server";
import LeadsClient from "./LeadsClient";

export default async function LeadsPage() {
  const supabase = createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*, car:cars(id, marca, modello)")
    .order("created_at", { ascending: false });

  return <LeadsClient initialLeads={leads || []} />;
}

import { createClient } from "@/lib/supabase/server";
import InventarioClient from "./InventarioClient";

export default async function InventarioPage() {
  const supabase = createClient();
  const { data: cars } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  return <InventarioClient initialCars={cars || []} />;
}

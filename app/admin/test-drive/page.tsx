import { createClient } from "@/lib/supabase/server";
import TestDriveClient from "./TestDriveClient";

export default async function TestDrivePage() {
  const supabase = createClient();

  const { data: testDrives } = await supabase
    .from("test_drives")
    .select("*, car:cars(id, marca, modello)")
    .order("data_appuntamento", { ascending: true });

  const { data: cars } = await supabase
    .from("cars")
    .select("*")
    .eq("stato", "Disponibile")
    .order("marca");

  return <TestDriveClient initialTestDrives={testDrives || []} cars={cars || []} />;
}

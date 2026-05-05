"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { Car, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Credenziali non valide. Riprova.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Car className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold font-display">
              Car<span className="text-accent">SELL</span>
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-text">Admin Panel</h1>
          <p className="text-sm text-text-muted mt-1">
            Accedi per gestire la concessionaria
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="surface-card rounded-xl p-8 space-y-5"
        >
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@carsell.it"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <Button type="submit" loading={loading} className="w-full gap-2">
            <LogIn className="w-4 h-4" />
            Accedi
          </Button>
        </form>
      </div>
    </div>
  );
}

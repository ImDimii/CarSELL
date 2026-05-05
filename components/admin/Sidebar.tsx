"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard, CarFront, Users, CalendarDays, BarChart3, LogOut, Car,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inventario", label: "Inventario", icon: CarFront },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/test-drive", label: "Test Drive", icon: CalendarDays },
  { href: "/admin/statistiche", label: "Statistiche", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-white/[.08] bg-surface">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/[.08]">
          <Link href="/admin" className="flex items-center gap-2">
            <Car className="w-6 h-6 text-accent" />
            <span className="text-lg font-bold font-display">
              Car<span className="text-accent">SELL</span>
            </span>
          </Link>
          <p className="text-xs text-text-faint mt-1">Pannello Admin</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-text-muted hover:bg-surface-2 hover:text-text"
                )}
              >
                <item.icon className="w-4.5 h-4.5" />
                {item.label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/[.08]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            Disconnetti
          </button>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-white/[.08] flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs transition-all min-w-[56px]",
                isActive ? "text-accent" : "text-text-faint"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

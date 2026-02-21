"use client";

import * as React from "react";
import { Bell, User, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export function AdminNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 right-0 left-64 z-30 h-16 bg-slate-900/95 dark:bg-black/95 backdrop-blur-xl border-b border-slate-800/50 transition-all duration-300">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-slate-200">
            Welcome back, {user?.name || "Admin"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-slate-400 hover:text-slate-200"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

"use client";

import * as React from "react";
import { Moon, Sun, Search, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 right-0 left-64 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search colleges, branches..."
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:block">
                  {user.name}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
}

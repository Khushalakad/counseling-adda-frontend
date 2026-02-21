"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Upload,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: TrendingUp, label: "Manage Cutoffs", href: "/admin/cutoffs" },
  { icon: Briefcase, label: "Manage Placements", href: "/admin/placements" },
  { icon: Upload, label: "Excel Upload", href: "/admin/upload" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
];

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-slate-900/95 dark:bg-black/95 backdrop-blur-xl border-r border-slate-800/50 transition-all duration-300 shadow-2xl",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800/50">
          {!isCollapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Admin Portal
            </h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-200"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800/50">
          <button
            onClick={logout}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-300 w-full",
              isCollapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

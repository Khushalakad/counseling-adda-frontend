"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  TrendingUp,
  Building2,
  Briefcase,
  Bookmark,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: GraduationCap, label: "Predict Colleges", href: "/predict" },
  { icon: TrendingUp, label: "Rank Band Analysis", href: "/rank-band" },
  { icon: Building2, label: "Compare Colleges", href: "/compare" },
  { icon: Briefcase, label: "Placement Insights", href: "/placements" },
  { icon: Bookmark, label: "Saved Results", href: "/saved" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 shadow-xl",
        isCollapsed ? "w-20" : "w-64"
      )}
      style={{ width: isCollapsed ? "80px" : "256px" }}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200/50 dark:border-slate-800/50">
          {!isCollapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Counseling Adda
            </h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

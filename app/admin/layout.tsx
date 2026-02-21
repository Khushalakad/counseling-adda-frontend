"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminNavbar } from "@/components/layout/admin-navbar";
import { useAuth } from "@/contexts/auth-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      if (!isAuthenticated) {
        router.push("/admin/login");
      } else if (!isAdmin) {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, isAdmin, isLoginPage, router]);

  // Don't show sidebar/navbar on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 ml-64 transition-all duration-300">
        <AdminNavbar />
        <main className="mt-16 p-6 bg-slate-950 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

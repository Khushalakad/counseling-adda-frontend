"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function SavedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64 transition-all duration-300">
          <Navbar />
          <main className="mt-16 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login page gets its own full-screen layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-dark font-body">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="lg:ml-[260px] min-h-screen flex flex-col">
        <AdminTopbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

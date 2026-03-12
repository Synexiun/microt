"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface AdminTopbarProps {
  onMenuToggle: () => void;
}

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/appointments": "Appointments",
  "/admin/customers": "Customers",
  "/admin/mailing-list": "Mailing List",
  "/admin/gallery": "Gallery",
  "/admin/instagram": "Instagram",
};

export default function AdminTopbar({ onMenuToggle }: AdminTopbarProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Admin";

  return (
    <header className="sticky top-0 z-30 bg-dark-light/80 backdrop-blur-md border-b border-dark-lighter">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <h2 className="text-lg font-heading text-white">{title}</h2>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors duration-200 font-body"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          View Site
        </a>
      </div>
    </header>
  );
}

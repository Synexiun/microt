"use client";

import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import type { Subscriber } from "@/types";

export default function MailingListPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const res = await fetch("/api/subscribers");
        if (res.ok) {
          const data: Subscriber[] = await res.json();
          setSubscribers(data);
        }
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscribers();
  }, []);

  async function handleExport() {
    setExporting(true);
    try {
      const res = await fetch("/api/subscribers/export");
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "subscribers.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting subscribers:", error);
    } finally {
      setExporting(false);
    }
  }

  const filtered = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with stats and export */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Card padding="md" className="sm:flex-1">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-3xl font-bold text-gold">
                {subscribers.length}
              </p>
              <p className="text-sm text-gray-400 font-body">
                Total Subscribers
              </p>
            </div>
          </div>
        </Card>

        <Button
          variant="secondary"
          onClick={handleExport}
          disabled={exporting || subscribers.length === 0}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            {exporting ? "Exporting..." : "Export CSV"}
          </span>
        </Button>
      </div>

      {/* Search and table */}
      <Card padding="sm">
        <div className="p-4 border-b border-dark-lighter">
          <div className="max-w-md">
            <Input
              type="text"
              placeholder="Filter by email..."
              value={search}
              onChange={(e) =>
                setSearch((e.target as HTMLInputElement).value)
              }
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Spinner size="lg" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-body">
            {search ? "No subscribers match your filter." : "No subscribers yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-dark-lighter">
                  <th className="px-4 pb-3 pt-4 font-medium">Email</th>
                  <th className="px-4 pb-3 pt-4 font-medium">
                    Subscribed Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-lighter">
                {filtered.map((sub) => (
                  <tr
                    key={sub.id}
                    className="text-gray-300 hover:bg-dark/50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      {sub.email}
                    </td>
                    <td className="px-4 py-3">
                      {format(parseISO(sub.subscribedAt), "MMM d, yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

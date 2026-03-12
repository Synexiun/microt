"use client";

import React, { useEffect, useState, useCallback } from "react";
import { format, parseISO } from "date-fns";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import type { Appointment } from "@/types";

type StatusFilter = "all" | Appointment["status"];

const STATUS_TABS: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dateFilter, setDateFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const fetchAppointments = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (dateFilter) params.set("date", dateFilter);

      const res = await fetch(`/api/appointments?${params.toString()}`);
      if (res.ok) {
        const data: Appointment[] = await res.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, dateFilter]);

  useEffect(() => {
    setLoading(true);
    fetchAppointments();
  }, [fetchAppointments]);

  async function handleStatusChange(id: string, newStatus: Appointment["status"]) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        await fetchAppointments();
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    } finally {
      setActionLoading(null);
    }
  }

  const sorted = [...appointments].sort((a, b) => {
    const dateA = parseISO(a.date).getTime();
    const dateB = parseISO(b.date).getTime();
    return sortAsc ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Status tabs */}
          <div className="flex flex-wrap gap-2">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`
                  px-4 py-2 text-sm rounded font-body transition-all duration-200
                  ${
                    statusFilter === tab.value
                      ? "bg-gold text-black"
                      : "bg-dark text-gray-400 hover:text-white border border-dark-lighter"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Date filter */}
          <div className="lg:ml-auto">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-dark border border-dark-lighter rounded px-4 py-2 text-sm text-white font-body focus:outline-none focus:border-gold transition-colors duration-200"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter("")}
                className="ml-2 text-xs text-gray-500 hover:text-white transition-colors duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card padding="sm">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Spinner size="lg" />
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-body">
            No appointments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-dark-lighter">
                  <th className="px-4 pb-3 font-medium">Client</th>
                  <th className="px-4 pb-3 font-medium">Service</th>
                  <th
                    className="px-4 pb-3 font-medium cursor-pointer hover:text-gold transition-colors duration-200 select-none"
                    onClick={() => setSortAsc(!sortAsc)}
                  >
                    Date {sortAsc ? "\u2191" : "\u2193"}
                  </th>
                  <th className="px-4 pb-3 font-medium">Time</th>
                  <th className="px-4 pb-3 font-medium">Status</th>
                  <th className="px-4 pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-lighter">
                {sorted.map((appt) => (
                  <tr
                    key={appt.id}
                    className="text-gray-300 hover:bg-dark/50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-white">
                          {appt.clientName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appt.clientEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{appt.serviceName}</td>
                    <td className="px-4 py-3">
                      {format(parseISO(appt.date), "MMM d, yyyy")}
                    </td>
                    <td className="px-4 py-3">{appt.time}</td>
                    <td className="px-4 py-3">
                      <Badge variant={appt.status}>
                        {appt.status.charAt(0).toUpperCase() +
                          appt.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {actionLoading === appt.id ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            {appt.status === "pending" && (
                              <>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() =>
                                    handleStatusChange(appt.id, "confirmed")
                                  }
                                >
                                  Confirm
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300"
                                  onClick={() =>
                                    handleStatusChange(appt.id, "cancelled")
                                  }
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {appt.status === "confirmed" && (
                              <>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() =>
                                    handleStatusChange(appt.id, "completed")
                                  }
                                >
                                  Complete
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300"
                                  onClick={() =>
                                    handleStatusChange(appt.id, "cancelled")
                                  }
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </>
                        )}
                      </div>
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

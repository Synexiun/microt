"use client";

import React, { useEffect, useState, useCallback } from "react";
import { format, parseISO } from "date-fns";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import type { Appointment, Customer } from "@/types";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());

      const [customersRes, appointmentsRes] = await Promise.all([
        fetch(`/api/customers?${params.toString()}`),
        fetch("/api/appointments"),
      ]);

      if (customersRes.ok) {
        const data: Customer[] = await customersRes.json();
        setCustomers(data);
      }
      if (appointmentsRes.ok) {
        const data: Appointment[] = await appointmentsRes.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchData]);

  function getCustomerAppointments(customer: Customer): Appointment[] {
    return appointments.filter((a) =>
      customer.appointmentIds.includes(a.id)
    );
  }

  function getLastVisit(customer: Customer): string | null {
    const custAppts = getCustomerAppointments(customer);
    const completed = custAppts
      .filter((a) => a.status === "completed")
      .sort(
        (a, b) =>
          parseISO(b.date).getTime() - parseISO(a.date).getTime()
      );
    return completed.length > 0 ? completed[0].date : null;
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card padding="md">
        <div className="max-w-md">
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch((e.target as HTMLInputElement).value)
            }
          />
        </div>
      </Card>

      {/* Table */}
      <Card padding="sm">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Spinner size="lg" />
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-body">
            No customers found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-dark-lighter">
                  <th className="px-4 pb-3 font-medium">Name</th>
                  <th className="px-4 pb-3 font-medium">Email</th>
                  <th className="px-4 pb-3 font-medium">Phone</th>
                  <th className="px-4 pb-3 font-medium">Appointments</th>
                  <th className="px-4 pb-3 font-medium">Last Visit</th>
                  <th className="px-4 pb-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-lighter">
                {customers.map((customer) => {
                  const isExpanded = expandedId === customer.id;
                  const custAppts = getCustomerAppointments(customer);
                  const lastVisit = getLastVisit(customer);

                  return (
                    <React.Fragment key={customer.id}>
                      <tr
                        className="text-gray-300 hover:bg-dark/50 transition-colors duration-150 cursor-pointer"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : customer.id)
                        }
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <svg
                              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                              />
                            </svg>
                            <span className="font-medium text-white">
                              {customer.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{customer.email}</td>
                        <td className="px-4 py-3">{customer.phone}</td>
                        <td className="px-4 py-3">
                          <span className="text-gold font-medium">
                            {customer.appointmentIds.length}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {lastVisit
                            ? format(parseISO(lastVisit), "MMM d, yyyy")
                            : "-"}
                        </td>
                        <td className="px-4 py-3">
                          {format(
                            parseISO(customer.createdAt),
                            "MMM d, yyyy"
                          )}
                        </td>
                      </tr>

                      {/* Expanded row */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="px-4 py-4 bg-dark/30">
                            <div className="pl-6">
                              <h4 className="text-sm font-medium text-white mb-3">
                                Appointment History
                              </h4>
                              {custAppts.length === 0 ? (
                                <p className="text-gray-500 text-xs">
                                  No appointment records.
                                </p>
                              ) : (
                                <div className="space-y-2">
                                  {custAppts
                                    .sort(
                                      (a, b) =>
                                        parseISO(b.date).getTime() -
                                        parseISO(a.date).getTime()
                                    )
                                    .map((appt) => (
                                      <div
                                        key={appt.id}
                                        className="flex items-center gap-4 text-xs text-gray-400 py-1.5 border-b border-dark-lighter/50 last:border-0"
                                      >
                                        <span className="min-w-[100px]">
                                          {format(
                                            parseISO(appt.date),
                                            "MMM d, yyyy"
                                          )}
                                        </span>
                                        <span className="min-w-[80px]">
                                          {appt.time}
                                        </span>
                                        <span className="min-w-[140px] text-gray-300">
                                          {appt.serviceName}
                                        </span>
                                        <Badge variant={appt.status}>
                                          {appt.status.charAt(0).toUpperCase() +
                                            appt.status.slice(1)}
                                        </Badge>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { format, parseISO, isAfter, startOfWeek, endOfWeek } from "date-fns";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";
import type { Appointment, Customer, Subscriber } from "@/types";

interface DashboardStats {
  weekAppointments: number;
  pendingAppointments: number;
  totalCustomers: number;
  totalSubscribers: number;
  totalServices: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    weekAppointments: 0,
    pendingAppointments: 0,
    totalCustomers: 0,
    totalSubscribers: 0,
    totalServices: 0,
  });
  const [upcoming, setUpcoming] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [appointmentsRes, customersRes, subscribersRes, servicesRes] =
          await Promise.all([
            fetch("/api/appointments"),
            fetch("/api/customers"),
            fetch("/api/subscribers"),
            fetch("/api/admin/services"),
          ]);

        const appointments: Appointment[] = appointmentsRes.ok
          ? await appointmentsRes.json()
          : [];
        const customers: Customer[] = customersRes.ok
          ? await customersRes.json()
          : [];
        const subscribers: Subscriber[] = subscribersRes.ok
          ? await subscribersRes.json()
          : [];
        const services: unknown[] = servicesRes.ok
          ? await servicesRes.json()
          : [];

        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

        const weekAppointments = appointments.filter((a) => {
          const date = parseISO(a.date);
          return date >= weekStart && date <= weekEnd;
        }).length;

        const pendingAppointments = appointments.filter(
          (a) => a.status === "pending"
        ).length;

        setStats({
          weekAppointments,
          pendingAppointments,
          totalCustomers: customers.length,
          totalSubscribers: subscribers.length,
          totalServices: services.length,
        });

        // Get upcoming appointments (future, not cancelled)
        const upcomingAppts = appointments
          .filter(
            (a) =>
              a.status !== "cancelled" &&
              isAfter(parseISO(a.date), new Date(now.toDateString()))
          )
          .sort(
            (a, b) =>
              parseISO(a.date).getTime() - parseISO(b.date).getTime()
          )
          .slice(0, 5);

        setUpcoming(upcomingAppts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Appointments This Week",
      value: stats.weekAppointments,
      icon: (
        <svg className="w-8 h-8 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
    {
      label: "Pending Appointments",
      value: stats.pendingAppointments,
      icon: (
        <svg className="w-8 h-8 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Total Customers",
      value: stats.totalCustomers,
      icon: (
        <svg className="w-8 h-8 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      label: "Total Subscribers",
      value: stats.totalSubscribers,
      icon: (
        <svg className="w-8 h-8 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: "Active Services",
      value: stats.totalServices,
      href: "/admin/services",
      icon: (
        <svg className="w-8 h-8 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <Card key={card.label} padding="md" glow={"href" in card} onClick={"href" in card ? () => (window.location.href = (card as {href:string}).href) : undefined}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold text-gold">{card.value}</p>
                <p className="text-sm text-gray-400 mt-1 font-body">
                  {card.label}
                </p>
              </div>
              {card.icon}
            </div>
          </Card>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <Card padding="md">
        <h3 className="text-lg font-heading text-white mb-4">
          Upcoming Appointments
        </h3>

        {upcoming.length === 0 ? (
          <p className="text-gray-500 text-sm py-4">
            No upcoming appointments.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-dark-lighter">
                  <th className="pb-3 pr-4 font-medium">Client</th>
                  <th className="pb-3 pr-4 font-medium">Service</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 pr-4 font-medium">Time</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-lighter">
                {upcoming.map((appt) => (
                  <tr key={appt.id} className="text-gray-300">
                    <td className="py-3 pr-4">{appt.clientName}</td>
                    <td className="py-3 pr-4">{appt.serviceName}</td>
                    <td className="py-3 pr-4">
                      {format(parseISO(appt.date), "MMM d, yyyy")}
                    </td>
                    <td className="py-3 pr-4">{appt.time}</td>
                    <td className="py-3">
                      <Badge variant={appt.status}>
                        {appt.status.charAt(0).toUpperCase() +
                          appt.status.slice(1)}
                      </Badge>
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

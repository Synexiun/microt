"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import type { Service } from "@/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  async function fetchServices() {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) setServices(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeletingSlug(slug);
    try {
      const res = await fetch(`/api/admin/services/${slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.slug !== slug));
      }
    } finally {
      setDeletingSlug(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-white">Services</h1>
          <p className="text-gray-400 text-sm mt-1">
            Edit service content, pricing, and FAQs
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.slug} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {service.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-14 h-14 rounded object-cover flex-shrink-0 border border-dark-lighter"
                />
              )}
              <div className="min-w-0">
                <h3 className="font-heading text-lg text-white">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  {service.shortDescription}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-gold text-sm font-medium">
                    {service.priceRange}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {service.duration}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href={`/admin/services/${service.slug}`}>
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                disabled={deletingSlug === service.slug}
                onClick={() => handleDelete(service.slug)}
                className="hover:text-red-400"
              >
                {deletingSlug === service.slug ? <Spinner /> : "Delete"}
              </Button>
            </div>
          </Card>
        ))}

        {services.length === 0 && (
          <Card>
            <p className="text-gray-400 text-center py-8">
              No services found.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

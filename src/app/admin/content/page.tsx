"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import type { SiteContent } from "@/lib/constants";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/content");
        if (res.ok) setContent(await res.json());
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function setBrand(key: keyof SiteContent["brand"], value: string) {
    setContent((prev) =>
      prev ? { ...prev, brand: { ...prev.brand, [key]: value } } : prev
    );
  }

  function setSocial(key: keyof SiteContent["socialLinks"], value: string) {
    setContent((prev) =>
      prev
        ? { ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }
        : prev
    );
  }

  function setHours(
    day: string,
    field: "open" | "close" | "closed",
    value: string | boolean
  ) {
    setContent((prev) => {
      if (!prev) return prev;
      const current = prev.businessHours[day];
      if (field === "closed") {
        return {
          ...prev,
          businessHours: {
            ...prev.businessHours,
            [day]: value ? null : { open: "9:00 AM", close: "6:00 PM" },
          },
        };
      }
      return {
        ...prev,
        businessHours: {
          ...prev.businessHours,
          [day]: { open: current?.open ?? "9:00 AM", close: current?.close ?? "6:00 PM", [field]: value },
        },
      };
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Saved successfully." });
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Save failed." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error." });
    } finally {
      setSaving(false);
    }
  }

  if (loading || !content) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-white">Site Content</h1>
          <p className="text-gray-400 text-sm mt-1">
            Edit studio info, contact details, and business hours
          </p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <span
              className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}
            >
              {message.text}
            </span>
          )}
          <Button type="submit" disabled={saving}>
            {saving ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Brand */}
        <Card>
          <h2 className="font-heading text-xl text-white mb-4">Studio Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Studio Name">
              <input
                type="text"
                value={content.brand.name}
                onChange={(e) => setBrand("name", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Tagline">
              <input
                type="text"
                value={content.brand.tagline}
                onChange={(e) => setBrand("tagline", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Phone">
              <input
                type="text"
                value={content.brand.phone}
                onChange={(e) => setBrand("phone", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={content.brand.email}
                onChange={(e) => setBrand("email", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Location (City, State)">
              <input
                type="text"
                value={content.brand.location}
                onChange={(e) => setBrand("location", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Instagram Handle">
              <input
                type="text"
                value={content.brand.instagramHandle}
                onChange={(e) => setBrand("instagramHandle", e.target.value)}
                className={inputClass}
                placeholder="@handle"
              />
            </Field>
            <Field label="Full Address" className="md:col-span-2">
              <input
                type="text"
                value={content.brand.address}
                onChange={(e) => setBrand("address", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Studio Description" className="md:col-span-2">
              <textarea
                rows={4}
                value={content.brand.description}
                onChange={(e) => setBrand("description", e.target.value)}
                className={`${inputClass} resize-y`}
              />
            </Field>
          </div>
        </Card>

        {/* Social Links */}
        <Card>
          <h2 className="font-heading text-xl text-white mb-4">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Instagram URL">
              <input
                type="url"
                value={content.socialLinks.instagram}
                onChange={(e) => setSocial("instagram", e.target.value)}
                className={inputClass}
                placeholder="https://instagram.com/..."
              />
            </Field>
            <Field label="TikTok URL">
              <input
                type="url"
                value={content.socialLinks.tiktok}
                onChange={(e) => setSocial("tiktok", e.target.value)}
                className={inputClass}
                placeholder="https://tiktok.com/..."
              />
            </Field>
            <Field label="Facebook URL">
              <input
                type="url"
                value={content.socialLinks.facebook}
                onChange={(e) => setSocial("facebook", e.target.value)}
                className={inputClass}
                placeholder="https://facebook.com/..."
              />
            </Field>
          </div>
        </Card>

        {/* Business Hours */}
        <Card>
          <h2 className="font-heading text-xl text-white mb-4">
            Business Hours
          </h2>
          <div className="space-y-3">
            {DAYS.map((day) => {
              const hours = content.businessHours[day];
              const isClosed = hours === null;
              return (
                <div
                  key={day}
                  className="flex items-center gap-4 py-2 border-b border-dark-lighter/50 last:border-0"
                >
                  <span className="w-28 text-sm text-gray-300 flex-shrink-0">
                    {day}
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={isClosed}
                      onChange={(e) => setHours(day, "closed", e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-gray-400">Closed</span>
                  </label>
                  {!isClosed && (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={hours?.open ?? ""}
                        onChange={(e) => setHours(day, "open", e.target.value)}
                        placeholder="9:00 AM"
                        className={`${inputClass} w-28`}
                      />
                      <span className="text-gray-500 text-sm">to</span>
                      <input
                        type="text"
                        value={hours?.close ?? ""}
                        onChange={(e) => setHours(day, "close", e.target.value)}
                        placeholder="6:00 PM"
                        className={`${inputClass} w-28`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Sticky save bar */}
      <div className="sticky bottom-0 bg-dark-light border-t border-dark-lighter py-4 px-6 -mx-6 mt-8 flex items-center justify-between">
        {message ? (
          <span
            className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}
          >
            {message.text}
          </span>
        ) : (
          <span />
        )}
        <Button type="submit" disabled={saving}>
          {saving ? <Spinner /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-dark border border-dark-lighter rounded px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors";

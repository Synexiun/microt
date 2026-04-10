"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import ListEditor from "@/components/admin/ListEditor";
import type { Service } from "@/types";

type EditableService = Omit<Service, "slug">;

const PROCESS_STEP_FIELDS = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description", multiline: true },
];

const HEALING_FIELDS = [
  { key: "day", label: "Day/Period" },
  { key: "description", label: "Description", multiline: true },
];

const FAQ_FIELDS = [
  { key: "question", label: "Question" },
  { key: "answer", label: "Answer", multiline: true },
];

export default function AdminServiceEditPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [form, setForm] = useState<EditableService | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/services/${slug}`);
        if (!res.ok) { router.push("/admin/services"); return; }
        const service: Service = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { slug: _slug, ...rest } = service;
        setForm(rest);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, router]);

  // Warn before navigating away with unsaved changes
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  function setField<K extends keyof EditableService>(key: K, value: EditableService[K]) {
    setIsDirty(true);
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/services/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setIsDirty(false);
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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`/api/admin/services/${slug}/image`, {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        const { image } = await res.json();
        // Update preview without marking form dirty — upload already saved to services.json
        setForm((prev) => prev ? { ...prev, image } : prev);
        setMessage({ type: "success", text: "Image uploaded." });
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Upload failed." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error." });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  if (loading || !form) {
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
          <button
            type="button"
            onClick={() => router.push("/admin/services")}
            className="text-gray-400 hover:text-white text-sm mb-2 flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Services
          </button>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-3xl text-white">{form.name}</h1>
            {isDirty && (
              <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                Unsaved
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/services/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Preview
          </a>
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
        {/* Basic Info */}
        <Card>
          <h2 className="font-heading text-xl text-white mb-4">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Duration">
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setField("duration", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Price">
              <input
                type="text"
                value={form.priceRange}
                onChange={(e) => setField("priceRange", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Touch-Up Price">
              <input
                type="text"
                value={form.touchUpPrice ?? ""}
                onChange={(e) => setField("touchUpPrice", e.target.value)}
                className={inputClass}
                placeholder="Optional"
              />
            </Field>
            <Field label="Short Description" className="md:col-span-2">
              <input
                type="text"
                value={form.shortDescription}
                onChange={(e) => setField("shortDescription", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Full Description" className="md:col-span-2">
              <textarea
                rows={6}
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                className={`${inputClass} resize-y`}
              />
            </Field>
          </div>
        </Card>

        {/* Image */}
        <Card>
          <h2 className="font-heading text-xl text-white mb-4">Service Image</h2>
          <div className="flex items-start gap-6">
            {form.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={
                  form.image.includes(".blob.vercel-storage.com")
                    ? `/api/blob-image?url=${encodeURIComponent(form.image)}`
                    : form.image
                }
                alt={form.name}
                className="w-32 h-32 object-cover rounded border border-dark-lighter flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <p className="text-gray-400 text-sm mb-3">
                Upload a new image to replace the current one.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleImageUpload}
                className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gold/10 file:text-gold file:text-xs file:font-medium hover:file:bg-gold/20 file:cursor-pointer"
              />
              {uploading && (
                <div className="text-gold text-xs mt-2 flex items-center gap-2">
                  <Spinner size="sm" /> Uploading...
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Process Steps */}
        <Card>
          <h2 className="font-heading text-xl text-white mb-4">Process Steps</h2>
          <ListEditor
            items={form.processSteps as Record<string, string>[]}
            fields={PROCESS_STEP_FIELDS}
            onChange={(items) =>
              setField("processSteps", items as Service["processSteps"])
            }
          />
        </Card>

        {/* Healing Timeline */}
        <Card>
          <h2 className="font-heading text-xl text-white mb-4">Healing Timeline</h2>
          <ListEditor
            items={form.healingTimeline as Record<string, string>[]}
            fields={HEALING_FIELDS}
            onChange={(items) =>
              setField("healingTimeline", items as Service["healingTimeline"])
            }
          />
        </Card>

        {/* FAQs */}
        <Card>
          <h2 className="font-heading text-xl text-white mb-4">FAQs</h2>
          <ListEditor
            items={form.faqs as Record<string, string>[]}
            fields={FAQ_FIELDS}
            onChange={(items) =>
              setField("faqs", items as Service["faqs"])
            }
          />
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

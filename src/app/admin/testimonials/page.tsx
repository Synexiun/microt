"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import type { Testimonial } from "@/types";

const EMPTY_FORM = { name: "", service: "", quote: "", rating: 5, location: "" };

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchTestimonials() {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) setTestimonials(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTestimonials(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const created = await res.json();
        setTestimonials((prev) => [...prev, created]);
        setForm(EMPTY_FORM);
        setShowAddForm(false);
      }
    } finally {
      setAdding(false);
    }
  }

  async function handleUpdate(id: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        setTestimonials((prev) => prev.map((t) => (t.id === id ? updated : t)));
        setEditingId(null);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  function startEdit(t: Testimonial) {
    setEditingId(t.id);
    setForm({ name: t.name, service: t.service, quote: t.quote, rating: t.rating, location: t.location });
    setShowAddForm(false);
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Spinner /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-white">Testimonials</h1>
          <p className="text-gray-400 text-sm mt-1">
            {testimonials.length} review{testimonials.length !== 1 ? "s" : ""} · shown in carousel on home page
          </p>
        </div>
        <Button onClick={() => { setShowAddForm(true); setEditingId(null); setForm(EMPTY_FORM); }}>
          + Add Testimonial
        </Button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <Card className="mb-6 border-gold/20">
          <h2 className="font-heading text-lg text-white mb-4">New Testimonial</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <TestimonialForm form={form} onChange={setForm} />
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" size="sm" disabled={adding}>
                {adding ? <Spinner /> : "Add"}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <Card key={t.id}>
            {editingId === t.id ? (
              <div>
                <h3 className="font-heading text-base text-white mb-3">Editing</h3>
                <div className="space-y-3">
                  <TestimonialForm form={form} onChange={setForm} />
                  <div className="flex items-center gap-3 pt-2">
                    <Button size="sm" disabled={saving} onClick={() => handleUpdate(t.id)}>
                      {saving ? <Spinner /> : "Save"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-heading text-white">{t.name}</span>
                    {t.service && (
                      <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded">
                        {t.service}
                      </span>
                    )}
                    <span className="text-gray-500 text-xs">{t.location}</span>
                    <StarDisplay rating={t.rating} />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(t)}>
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={deletingId === t.id}
                    onClick={() => handleDelete(t.id)}
                    className="hover:text-red-400"
                  >
                    {deletingId === t.id ? <Spinner /> : "Delete"}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}

        {testimonials.length === 0 && (
          <Card>
            <p className="text-gray-400 text-center py-8">No testimonials yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

function TestimonialForm({
  form,
  onChange,
}: {
  form: { name: string; service: string; quote: string; rating: number; location: string };
  onChange: (f: typeof form) => void;
}) {
  const ic = "w-full bg-dark border border-dark-lighter rounded px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="block text-xs text-gray-400 mb-1">Client Name *</label>
        <input type="text" required value={form.name} onChange={(e) => onChange({ ...form, name: e.target.value })} className={ic} />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Service</label>
        <input type="text" value={form.service} onChange={(e) => onChange({ ...form, service: e.target.value })} className={ic} placeholder="e.g. Microblading" />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Location</label>
        <input type="text" value={form.location} onChange={(e) => onChange({ ...form, location: e.target.value })} className={ic} placeholder="e.g. Newport Beach, CA" />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Rating</label>
        <select value={form.rating} onChange={(e) => onChange({ ...form, rating: Number(e.target.value) })}
          className={ic}>
          {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} star{r !== 1 ? "s" : ""}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs text-gray-400 mb-1">Quote *</label>
        <textarea required rows={4} value={form.quote} onChange={(e) => onChange({ ...form, quote: e.target.value })}
          className={`${ic} resize-y`} />
      </div>
    </div>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="text-gold text-xs">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
  );
}

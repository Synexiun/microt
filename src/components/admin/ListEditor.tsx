"use client";

import React from "react";
import Button from "@/components/ui/Button";

interface Field {
  key: string;
  label: string;
  multiline?: boolean;
}

interface ListEditorProps {
  items: Record<string, string>[];
  fields: Field[];
  onChange: (items: Record<string, string>[]) => void;
}

export default function ListEditor({ items, fields, onChange }: ListEditorProps) {
  function addItem() {
    const blank = Object.fromEntries(fields.map((f) => [f.key, ""]));
    onChange([...items, blank]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function updateField(index: number, key: string, value: string) {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    onChange(updated);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const updated = [...items];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onChange(updated);
  }

  function moveDown(index: number) {
    if (index === items.length - 1) return;
    const updated = [...items];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-dark border border-dark-lighter rounded-lg p-4 space-y-3"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              #{index + 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="p-1 text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
                title="Move up"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className="p-1 text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
                title="Move down"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-1 text-gray-500 hover:text-red-400 transition-colors ml-1"
                title="Remove"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          {fields.map((field) =>
            field.multiline ? (
              <div key={field.key}>
                <label className="block text-xs text-gray-400 mb-1">
                  {field.label}
                </label>
                <textarea
                  rows={3}
                  value={item[field.key] ?? ""}
                  onChange={(e) => updateField(index, field.key, e.target.value)}
                  className="w-full bg-dark-light border border-dark-lighter rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 resize-y"
                />
              </div>
            ) : (
              <div key={field.key}>
                <label className="block text-xs text-gray-400 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={item[field.key] ?? ""}
                  onChange={(e) => updateField(index, field.key, e.target.value)}
                  className="w-full bg-dark-light border border-dark-lighter rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/50"
                />
              </div>
            )
          )}
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={addItem}>
        + Add Item
      </Button>
    </div>
  );
}

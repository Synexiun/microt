"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import type { GalleryImage } from "@/types";

const SERVICE_OPTIONS = [
  { value: "microblading", label: "Microblading" },
  { value: "phibrows", label: "PhiBrows" },
  { value: "combo-brows", label: "Combo Brows" },
  { value: "lip-blush", label: "Lip Blush" },
  { value: "permanent-eyeliner", label: "Permanent Eyeliner" },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Upload form state
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [serviceSlug, setServiceSlug] = useState("");
  const [imageType, setImageType] = useState<"before-after" | "portfolio">(
    "portfolio"
  );
  const [uploadError, setUploadError] = useState("");

  async function fetchImages() {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data: GalleryImage[] = await res.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setUploadError("");

    if (!file) {
      setUploadError("Please select an image file.");
      return;
    }
    if (!title.trim()) {
      setUploadError("Title is required.");
      return;
    }
    if (!serviceSlug) {
      setUploadError("Please select a service category.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title.trim());
      formData.append("serviceSlug", serviceSlug);
      formData.append("type", imageType);

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setFile(null);
        setTitle("");
        setServiceSlug("");
        setImageType("portfolio");
        // Reset file input
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        await fetchImages();
      } else {
        const data = await res.json();
        setUploadError(data.error || "Upload failed.");
      }
    } catch {
      setUploadError("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchImages();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload section */}
      <Card padding="md">
        <h3 className="text-lg font-heading text-white mb-4">Upload Image</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image File
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20 file:cursor-pointer file:transition-colors file:duration-200"
              />
            </div>

            {/* Title */}
            <Input
              label="Title"
              type="text"
              placeholder="Image title"
              value={title}
              onChange={(e) =>
                setTitle((e.target as HTMLInputElement).value)
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Service Category
              </label>
              <select
                value={serviceSlug}
                onChange={(e) => setServiceSlug(e.target.value)}
                className="w-full bg-dark-light border border-dark-lighter rounded px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-300"
              >
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setImageType("portfolio")}
                  className={`
                    flex-1 px-4 py-3 text-sm rounded font-body transition-all duration-200
                    ${
                      imageType === "portfolio"
                        ? "bg-gold text-black"
                        : "bg-dark border border-dark-lighter text-gray-400 hover:text-white"
                    }
                  `}
                >
                  Portfolio
                </button>
                <button
                  type="button"
                  onClick={() => setImageType("before-after")}
                  className={`
                    flex-1 px-4 py-3 text-sm rounded font-body transition-all duration-200
                    ${
                      imageType === "before-after"
                        ? "bg-gold text-black"
                        : "bg-dark border border-dark-lighter text-gray-400 hover:text-white"
                    }
                  `}
                >
                  Before/After
                </button>
              </div>
            </div>
          </div>

          {uploadError && (
            <p className="text-sm text-red-400">{uploadError}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </Card>

      {/* Gallery grid */}
      <div>
        <h3 className="text-lg font-heading text-white mb-4">
          Gallery Images
        </h3>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Spinner size="lg" />
          </div>
        ) : images.length === 0 ? (
          <Card padding="lg">
            <p className="text-center text-gray-500 font-body">
              No images uploaded yet.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((img) => {
              const serviceLabel =
                SERVICE_OPTIONS.find((o) => o.value === img.serviceSlug)
                  ?.label || img.serviceSlug;

              return (
                <Card key={img.id} padding="sm" className="overflow-hidden">
                  <div className="relative aspect-square bg-dark rounded overflow-hidden mb-3">
                    <Image
                      src={`/uploads/gallery/${img.filename}`}
                      alt={img.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white truncate">
                      {img.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {serviceLabel} &middot;{" "}
                      {img.type === "before-after"
                        ? "Before/After"
                        : "Portfolio"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(img.id)}
                    disabled={deletingId === img.id}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors duration-200 disabled:opacity-50"
                  >
                    {deletingId === img.id ? (
                      <Spinner size="sm" />
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                      </>
                    )}
                  </button>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

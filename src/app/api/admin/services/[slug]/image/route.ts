import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { put } from "@vercel/blob";
import { readJsonFileOrNull, writeJsonFile } from "@/lib/data";
import type { Service } from "@/types";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/heic",
  "image/heif",
];

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;

    // Parse form data first — fail fast before touching blob storage
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }
    if (file.type && !ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: `Invalid file type "${file.type}". Allowed: JPEG, PNG, WebP, AVIF` },
        { status: 400 }
      );
    }

    // Read services directly — skip migration to keep this route fast and isolated
    const services = await readJsonFileOrNull<Service>("services.json");
    if (!services) {
      return NextResponse.json({ error: "Services not found" }, { status: 404 });
    }
    const index = services.findIndex((s) => s.slug === slug);
    if (index === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const blob = await put(`services/${slug}-${uuidv4()}.${ext}`, file, {
      access: "private",
      allowOverwrite: true,
    });

    services[index] = { ...services[index], image: blob.url };
    await writeJsonFile<Service>("services.json", services);

    return NextResponse.json({ image: blob.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error uploading service image:", message, error);
    return NextResponse.json(
      { error: `Failed to upload image: ${message}` },
      { status: 500 }
    );
  }
}

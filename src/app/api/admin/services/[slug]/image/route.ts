import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { put } from "@vercel/blob";
import { getServices } from "@/lib/services";
import { writeJsonFile } from "@/lib/data";
import type { Service } from "@/types";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const services = await getServices();
    const index = services.findIndex((s) => s.slug === slug);
    if (index === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, AVIF" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || "jpg";
    const blob = await put(`services/${slug}-${uuidv4()}.${ext}`, file, {
      access: "public",
    });

    services[index] = { ...services[index], image: blob.url };
    await writeJsonFile<Service>("services.json", services);

    return NextResponse.json({ image: blob.url });
  } catch (error) {
    console.error("Error uploading service image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

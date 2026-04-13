import { NextRequest, NextResponse } from "next/server";
import { getServices } from "@/lib/services";
import { readJsonFile, readJsonFileOrNull, writeJsonFile } from "@/lib/data";
import { serviceEditSchema } from "@/lib/validators";
import type { Service, GalleryImage, Testimonial } from "@/types";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const services = await getServices();
    const service = services.find((s) => s.slug === slug);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error("Error reading service:", error);
    return NextResponse.json(
      { error: "Failed to read service" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const body = await request.json();
    // Read directly to avoid triggering migration on every save
    const services = await readJsonFileOrNull<Service>("services.json") ?? await getServices();
    const index = services.findIndex((s) => s.slug === slug);
    if (index === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    const result = serviceEditSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }
    const updated: Service = { ...result.data, slug };
    services[index] = updated;
    await writeJsonFile<Service>("services.json", services);
    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating service:", message, error);
    return NextResponse.json(
      { error: `Failed to update service: ${message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const services = await getServices();
    const filtered = services.filter((s) => s.slug !== slug);
    if (filtered.length === services.length) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Cascade delete: remove related gallery images
    const gallery = await readJsonFile<GalleryImage>("gallery.json");
    await writeJsonFile<GalleryImage>(
      "gallery.json",
      gallery.filter((img) => img.serviceSlug !== slug)
    );

    // Cascade delete: remove related testimonials
    const testimonials = await readJsonFile<Testimonial>("testimonials.json");
    await writeJsonFile<Testimonial>(
      "testimonials.json",
      testimonials.filter((t) => t.service !== slug)
    );

    await writeJsonFile<Service>("services.json", filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}

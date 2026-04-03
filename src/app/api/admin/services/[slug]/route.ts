import { NextRequest, NextResponse } from "next/server";
import { getServices } from "@/lib/services";
import { writeJsonFile } from "@/lib/data";
import type { Service } from "@/types";

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
    const services = await getServices();
    const index = services.findIndex((s) => s.slug === slug);
    if (index === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    const updated: Service = { ...services[index], ...body, slug };
    services[index] = updated;
    await writeJsonFile<Service>("services.json", services);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
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

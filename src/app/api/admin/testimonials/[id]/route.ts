import { NextRequest, NextResponse } from "next/server";
import { getTestimonials } from "@/lib/testimonials";
import { writeJsonFile } from "@/lib/data";
import type { Testimonial } from "@/types";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();
    const testimonials = await getTestimonials();
    const index = testimonials.findIndex((t) => t.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }
    const updated: Testimonial = {
      ...testimonials[index],
      ...body,
      id,
      rating: Math.min(5, Math.max(1, Number(body.rating ?? testimonials[index].rating))),
    };
    testimonials[index] = updated;
    await writeJsonFile<Testimonial>("testimonials.json", testimonials);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const testimonials = await getTestimonials();
    const filtered = testimonials.filter((t) => t.id !== id);
    if (filtered.length === testimonials.length) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }
    await writeJsonFile<Testimonial>("testimonials.json", filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}

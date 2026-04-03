import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getTestimonials } from "@/lib/testimonials";
import { appendToJsonFile } from "@/lib/data";
import type { Testimonial } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error reading testimonials:", error);
    return NextResponse.json(
      { error: "Failed to read testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, service, quote, rating, location } = body;
    if (!name || !quote || !rating) {
      return NextResponse.json(
        { error: "name, quote, and rating are required" },
        { status: 400 }
      );
    }
    const testimonial: Testimonial = {
      id: uuidv4(),
      name: String(name),
      service: String(service ?? ""),
      quote: String(quote),
      rating: Math.min(5, Math.max(1, Number(rating))),
      location: String(location ?? ""),
      createdAt: new Date().toISOString(),
    };
    // Ensure seeded first
    await getTestimonials();
    await appendToJsonFile<Testimonial>("testimonials.json", testimonial);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

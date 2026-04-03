import { v4 as uuidv4 } from "uuid";
import { readJsonFile, writeJsonFile } from "@/lib/data";
import { sampleTestimonials } from "@/lib/sample-data";
import type { Testimonial } from "@/types";

export async function getTestimonials(): Promise<Testimonial[]> {
  const stored = await readJsonFile<Testimonial>("testimonials.json");
  if (stored.length > 0) return stored;
  // Seed from sample data on first call
  const seeded: Testimonial[] = sampleTestimonials.map((t) => ({
    id: uuidv4(),
    name: t.name,
    service: t.service,
    quote: t.quote,
    rating: t.rating,
    location: t.location,
    createdAt: new Date().toISOString(),
  }));
  await writeJsonFile<Testimonial>("testimonials.json", seeded);
  return seeded;
}

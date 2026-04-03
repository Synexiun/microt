import { NextRequest, NextResponse } from "next/server";
import { getServices } from "@/lib/services";
import { writeJsonFile } from "@/lib/data";
import type { Service } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error reading services:", error);
    return NextResponse.json(
      { error: "Failed to read services" },
      { status: 500 }
    );
  }
}

// Replace the entire services array (used for reordering)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Request body must be an array of services" },
        { status: 400 }
      );
    }
    await writeJsonFile<Service>("services.json", body);
    return NextResponse.json(body);
  } catch (error) {
    console.error("Error updating services:", error);
    return NextResponse.json(
      { error: "Failed to update services" },
      { status: 500 }
    );
  }
}

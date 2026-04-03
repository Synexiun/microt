import { NextRequest, NextResponse } from "next/server";
import { getSiteContent, type SiteContent } from "@/lib/constants";
import { writeJsonObject } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error reading site content:", error);
    return NextResponse.json(
      { error: "Failed to read site content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    // Merge with existing content so partial updates are safe
    const existing = await getSiteContent();
    const updated: SiteContent = {
      brand: { ...existing.brand, ...body.brand },
      businessHours: body.businessHours ?? existing.businessHours,
      socialLinks: { ...existing.socialLinks, ...body.socialLinks },
    };
    await writeJsonObject<SiteContent>("site-content.json", updated);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating site content:", error);
    return NextResponse.json(
      { error: "Failed to update site content" },
      { status: 500 }
    );
  }
}

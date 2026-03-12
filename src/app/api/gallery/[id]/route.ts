import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { readJsonFile, deleteFromJsonFile } from "@/lib/data";
import type { GalleryImage } from "@/types";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find the image record first to get the filename
    const images = await readJsonFile<GalleryImage>("gallery.json");
    const image = images.find((img) => img.id === id);

    if (!image) {
      return NextResponse.json(
        { error: "Gallery image not found" },
        { status: 404 }
      );
    }

    // Delete from JSON
    await deleteFromJsonFile("gallery.json", id);

    // Delete physical file
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "gallery",
      image.filename
    );
    try {
      await fs.unlink(filePath);
    } catch {
      // File may already be missing — not critical
      console.warn(`Physical file not found: ${filePath}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}

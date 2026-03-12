import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { readJsonFile, deleteFromJsonFile } from "@/lib/data";
import type { GalleryImage } from "@/types";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const images = await readJsonFile<GalleryImage>("gallery.json");
    const image = images.find((img) => img.id === id);

    if (!image) {
      return NextResponse.json(
        { error: "Gallery image not found" },
        { status: 404 }
      );
    }

    // Delete from KV
    await deleteFromJsonFile("gallery.json", id);

    // Delete from Vercel Blob
    try {
      await del(image.filename);
    } catch {
      console.warn(`Blob not found: ${image.filename}`);
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

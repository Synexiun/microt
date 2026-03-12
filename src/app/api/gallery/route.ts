import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { put } from "@vercel/blob";
import { readJsonFile, appendToJsonFile } from "@/lib/data";
import { galleryUploadSchema } from "@/lib/validators";
import type { GalleryImage } from "@/types";

export async function GET() {
  try {
    const images = await readJsonFile<GalleryImage>("gallery.json");
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error reading gallery:", error);
    return NextResponse.json(
      { error: "Failed to read gallery" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("image") as File | null;
    const title = formData.get("title") as string | null;
    const serviceSlug = formData.get("serviceSlug") as string | null;
    const type = formData.get("type") as string | null;

    const metaResult = galleryUploadSchema.safeParse({
      title,
      serviceSlug,
      type,
    });

    if (!metaResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: metaResult.error.flatten() },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, AVIF" },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `gallery/${uuidv4()}.${ext}`;
    const blob = await put(filename, file, { access: "public" });

    // Create gallery record — store the Blob URL as the filename
    const galleryImage: GalleryImage = {
      id: uuidv4(),
      filename: blob.url,
      title: metaResult.data.title,
      serviceSlug: metaResult.data.serviceSlug,
      type: metaResult.data.type,
      uploadedAt: new Date().toISOString(),
    };

    await appendToJsonFile<GalleryImage>("gallery.json", galleryImage);

    return NextResponse.json(galleryImage, { status: 201 });
  } catch (error) {
    console.error("Error uploading gallery image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

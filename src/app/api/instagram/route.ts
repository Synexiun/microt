import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { readJsonFile, appendToJsonFile, deleteFromJsonFile } from "@/lib/data";
import type { InstagramPost } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await readJsonFile<InstagramPost>("instagram.json");
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error reading instagram posts:", error);
    return NextResponse.json(
      { error: "Failed to read instagram posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid URL is required" },
        { status: 400 }
      );
    }

    // Only accept HTTPS Instagram URLs
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }
    if (
      parsed.protocol !== "https:" ||
      !["instagram.com", "www.instagram.com"].includes(parsed.hostname)
    ) {
      return NextResponse.json(
        { error: "URL must be a valid https://instagram.com link" },
        { status: 400 }
      );
    }

    const post: InstagramPost = {
      id: uuidv4(),
      url,
      addedAt: new Date().toISOString(),
    };

    await appendToJsonFile<InstagramPost>("instagram.json", post);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error adding instagram post:", error);
    return NextResponse.json(
      { error: "Failed to add instagram post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    // Also accept id in body
    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch {
        // No body provided
      }
    }

    if (!id) {
      return NextResponse.json(
        { error: "An id is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteFromJsonFile("instagram.json", id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Instagram post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting instagram post:", error);
    return NextResponse.json(
      { error: "Failed to delete instagram post" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Proxy for private Vercel Blob images — the store is private, so browsers
// can't fetch blob URLs directly. This route fetches with the token server-side.
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing url", { status: 400 });
  }

  // Safety: only proxy Vercel Blob hostnames
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }
  if (!parsed.hostname.endsWith(".blob.vercel-storage.com")) {
    return new NextResponse("URL not allowed", { status: 403 });
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const response = await fetch(url, {
      headers: token ? { authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });

    if (!response.ok) {
      return new NextResponse("Image not found", { status: response.status });
    }

    const contentType = response.headers.get("content-type") ?? "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        // Images have UUID paths — they're immutable, safe to cache forever
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Blob image proxy error:", error);
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { readJsonFile } from "@/lib/data";
import type { Subscriber } from "@/types";

export async function GET() {
  try {
    const subscribers = await readJsonFile<Subscriber>("subscribers.json");
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Error reading subscribers:", error);
    return NextResponse.json(
      { error: "Failed to read subscribers" },
      { status: 500 }
    );
  }
}

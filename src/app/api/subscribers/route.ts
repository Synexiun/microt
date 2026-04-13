import { NextResponse } from "next/server";
import { readJsonFile } from "@/lib/data";
import type { Subscriber } from "@/types";
import { isAdminRequest } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

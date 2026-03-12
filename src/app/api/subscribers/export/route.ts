import { NextResponse } from "next/server";
import { readJsonFile } from "@/lib/data";
import type { Subscriber } from "@/types";

export async function GET() {
  try {
    const subscribers = await readJsonFile<Subscriber>("subscribers.json");

    const csvRows = ["id,email,subscribedAt"];
    for (const sub of subscribers) {
      csvRows.push(`${sub.id},${sub.email},${sub.subscribedAt}`);
    }
    const csv = csvRows.join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="subscribers.csv"',
      },
    });
  } catch (error) {
    console.error("Error exporting subscribers:", error);
    return NextResponse.json(
      { error: "Failed to export subscribers" },
      { status: 500 }
    );
  }
}

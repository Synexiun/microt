import { NextRequest, NextResponse } from "next/server";
import { readJsonFile } from "@/lib/data";
import type { Customer } from "@/types";
import { isAdminRequest } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();

    let customers = await readJsonFile<Customer>("customers.json");

    if (search) {
      customers = customers.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search)
      );
    }

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error reading customers:", error);
    return NextResponse.json(
      { error: "Failed to read customers" },
      { status: 500 }
    );
  }
}

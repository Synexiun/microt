import { NextRequest, NextResponse } from "next/server";
import { updateInJsonFile } from "@/lib/data";
import type { Appointment } from "@/types";

const VALID_STATUSES: Appointment["status"][] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          error: "Invalid status. Must be one of: pending, confirmed, completed, cancelled",
        },
        { status: 400 }
      );
    }

    const updated = await updateInJsonFile<Appointment>(
      "appointments.json",
      id,
      { status } as Partial<Appointment>
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

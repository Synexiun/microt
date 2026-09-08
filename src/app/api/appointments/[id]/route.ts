import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, updateInJsonFile } from "@/lib/data";
import type { Appointment } from "@/types";

export const dynamic = "force-dynamic";

const VALID_STATUSES: Appointment["status"][] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

// Lookup for the post-booking confirmation screen, which the client sees while
// signed out. The v4 UUID in the URL is the capability: it is unguessable, so
// only the person who just booked can read it back. Phone and status are
// withheld — the confirmation screen has no use for them.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const appointments = await readJsonFile<Appointment>("appointments.json");
    const appointment = appointments.find((a) => a.id === id);

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: appointment.id,
      serviceName: appointment.serviceName,
      date: appointment.date,
      time: appointment.time,
      clientName: appointment.clientName,
      clientEmail: appointment.clientEmail,
      notes: appointment.notes,
    });
  } catch (error) {
    console.error("Error reading appointment:", error);
    return NextResponse.json(
      { error: "Failed to read appointment" },
      { status: 500 }
    );
  }
}

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

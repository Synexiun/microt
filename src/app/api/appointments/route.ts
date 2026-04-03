import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { readJsonFile, appendToJsonFile, updateInJsonFile } from "@/lib/data";
import { bookingSchema } from "@/lib/validators";
import { getServiceBySlugAsync } from "@/lib/services";

export const dynamic = "force-dynamic";
import type { Appointment, Customer } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");

    let appointments = await readJsonFile<Appointment>("appointments.json");

    if (status) {
      appointments = appointments.filter((a) => a.status === status);
    }

    if (date) {
      appointments = appointments.filter((a) => a.date === date);
    }

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error reading appointments:", error);
    return NextResponse.json(
      { error: "Failed to read appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;
    const service = await getServiceBySlugAsync(data.serviceSlug);

    if (!service) {
      return NextResponse.json(
        { error: "Invalid service selected" },
        { status: 400 }
      );
    }

    const appointmentId = uuidv4();
    const appointment: Appointment = {
      id: appointmentId,
      serviceSlug: data.serviceSlug,
      serviceName: service.name,
      date: data.date,
      time: data.time,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      notes: data.notes ?? "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await appendToJsonFile<Appointment>("appointments.json", appointment);

    // Handle customer record
    const customers = await readJsonFile<Customer>("customers.json");
    const existingCustomer = customers.find(
      (c) => c.email.toLowerCase() === data.clientEmail.toLowerCase()
    );

    if (existingCustomer) {
      await updateInJsonFile<Customer>("customers.json", existingCustomer.id, {
        appointmentIds: [...existingCustomer.appointmentIds, appointmentId],
        name: data.clientName,
        phone: data.clientPhone,
      } as Partial<Customer>);
    } else {
      const newCustomer: Customer = {
        id: uuidv4(),
        name: data.clientName,
        email: data.clientEmail,
        phone: data.clientPhone,
        appointmentIds: [appointmentId],
        createdAt: new Date().toISOString(),
      };
      await appendToJsonFile<Customer>("customers.json", newCustomer);
    }

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}

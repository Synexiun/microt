import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { readJsonFile, appendToJsonFile } from "@/lib/data";
import { subscribeSchema } from "@/lib/validators";
import type { Subscriber } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email } = result.data;

    const subscribers = await readJsonFile<Subscriber>("subscribers.json");
    const exists = subscribers.some(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }

    const subscriber: Subscriber = {
      id: uuidv4(),
      email,
      subscribedAt: new Date().toISOString(),
    };

    await appendToJsonFile<Subscriber>("subscribers.json", subscriber);

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { appendToJsonFile, readJsonFile } from "@/lib/data";
import { ConsentFormSubmission } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const submissions = await readJsonFile<ConsentFormSubmission>(
      "consent-forms.json"
    );
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch consent forms" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const submission: ConsentFormSubmission = {
      ...body,
      id: uuidv4(),
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") ?? undefined,
    };

    const saved = await appendToJsonFile<ConsentFormSubmission>(
      "consent-forms.json",
      submission
    );

    return NextResponse.json(saved, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to save consent form" },
      { status: 500 }
    );
  }
}

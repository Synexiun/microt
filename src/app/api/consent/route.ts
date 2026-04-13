import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendToJsonFile, readJsonFile } from "@/lib/data";
import { ConsentFormSubmission } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

const consentSchema = z.object({
  // Section 1 — Client Info
  salonName: z.string().min(1),
  clientName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  treatmentType: z.string().min(1),
  appointmentDate: z.string().min(1),
  // Section 2 — Health (all required booleans)
  hemophilia: z.boolean(),
  diabetesMellitus: z.boolean(),
  hepatitis: z.boolean(),
  hivPositive: z.boolean(),
  skinDiseases: z.boolean(),
  eczema: z.boolean(),
  allergies: z.boolean(),
  autoimmuneDisease: z.boolean(),
  herpesProne: z.boolean(),
  infectiousDiseases: z.boolean(),
  epilepsy: z.boolean(),
  cardiovascularProblems: z.boolean(),
  bloodThinners: z.boolean(),
  pregnant: z.boolean(),
  regularMedications: z.boolean(),
  hasPacemaker: z.boolean(),
  woundHealingProblems: z.boolean(),
  keloidScars: z.boolean(),
  drugsAlcohol24h: z.boolean(),
  recentSurgery14d: z.boolean(),
  irradiationIntervention: z.boolean(),
  usesRetinol: z.boolean(),
  facialTreatment15d: z.boolean(),
  microneedling1m: z.boolean(),
  botox2m: z.boolean(),
  vaccinationTimeframe: z.string(),
  // Section 3 — Consents (all must be true)
  consentSwellingRedness: z.literal(true),
  consentScabsColorChanges: z.literal(true),
  consentDarkerThicker: z.literal(true),
  consentSkinTypeRetention: z.literal(true),
  consentSymmetry: z.literal(true),
  consentHealingVariation: z.literal(true),
  consentCorrectionTiming: z.literal(true),
  consentRefreshNeeded: z.literal(true),
  consentAftercare: z.literal(true),
  consentAllergicReactions: z.literal(true),
  consentFalseInfo: z.literal(true),
  consentPhotoMarketing: z.boolean(),
  // Section 4 — Signature
  signatureFullName: z.string().min(2),
  signatureData: z.string().min(10), // base64 data URL
  signatureDate: z.string().min(1),
});

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
    const result = consentSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const submission: ConsentFormSubmission = {
      ...result.data,
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

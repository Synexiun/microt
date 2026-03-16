"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Constants ──────────────────────────────────────────────────────────────

const TREATMENT_TYPES = [
  "Microblading",
  "Ombre / Powder Brows",
  "Combo Brows",
  "Lip Blush",
  "Eye Liner",
  "Other",
];

const HEALTH_QUESTIONS: { key: HealthKey; label: string }[] = [
  { key: "hemophilia", label: "Hemophilia" },
  { key: "diabetesMellitus", label: "Diabetes mellitus" },
  { key: "hepatitis", label: "Hepatitis A, B, C, D, E, F" },
  { key: "hivPositive", label: "HIV+" },
  { key: "skinDiseases", label: "Skin diseases" },
  { key: "eczema", label: "Eczema" },
  { key: "allergies", label: "Allergies" },
  { key: "autoimmuneDisease", label: "Autoimmune diseases" },
  { key: "herpesProne", label: "Prone to herpes" },
  { key: "infectiousDiseases", label: "Infectious diseases / fever" },
  { key: "epilepsy", label: "Epilepsy" },
  { key: "cardiovascularProblems", label: "Cardiovascular problems" },
  { key: "bloodThinners", label: "Taking blood-thinning medication" },
  { key: "pregnant", label: "Pregnant" },
  { key: "regularMedications", label: "Regularly taking medications" },
  { key: "hasPacemaker", label: "Has pacemaker" },
  { key: "woundHealingProblems", label: "Problem with wound healing" },
  { key: "keloidScars", label: "Problem with keloid scars" },
  {
    key: "drugsAlcohol24h",
    label: "Consumed drugs or alcohol in the last 24 hours",
  },
  { key: "recentSurgery14d", label: "Surgery in the last 14 days" },
  {
    key: "irradiationIntervention",
    label: "Irradiation or other medical intervention",
  },
  { key: "usesRetinol", label: "Uses Retinol" },
  { key: "facialTreatment15d", label: "Facial treatment in the last 15 days" },
  { key: "microneedling1m", label: "Microneedling in the last month" },
  { key: "botox2m", label: "Botox in the last 2 months" },
];

const CONSENT_ITEMS: { key: ConsentKey; label: string }[] = [
  {
    key: "consentSwellingRedness",
    label:
      "Temporary swelling, redness, and itching may occur after treatment.",
  },
  {
    key: "consentScabsColorChanges",
    label: "Small scabs and color intensity changes may happen during healing.",
  },
  {
    key: "consentDarkerThicker",
    label:
      "Eyebrows may appear darker and thicker during the early healing phase.",
  },
  {
    key: "consentSkinTypeRetention",
    label: "Skin type significantly affects pigment retention and final results.",
  },
  {
    key: "consentSymmetry",
    label:
      "Perfect symmetry cannot be guaranteed, as natural facial asymmetry exists.",
  },
  {
    key: "consentHealingVariation",
    label:
      "Healing results vary depending on skin type, body chemistry, and external factors.",
  },
  {
    key: "consentCorrectionTiming",
    label:
      "Correction or touch-up is typically performed after 5–6 weeks to allow full healing.",
  },
  {
    key: "consentRefreshNeeded",
    label:
      "A color refresh treatment may be needed within 2–3 years to maintain results.",
  },
  {
    key: "consentAftercare",
    label: "Poor aftercare can negatively affect the final healed result.",
  },
  {
    key: "consentAllergicReactions",
    label: "Allergic reactions to pigment, numbing cream, or aftercare are possible.",
  },
  {
    key: "consentFalseInfo",
    label:
      "The studio is not responsible for any complications arising from false or incomplete health information provided by me.",
  },
  {
    key: "consentPhotoMarketing",
    label:
      "Photographs of the work and my face may be used for marketing and social media purposes.",
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type HealthKey =
  | "hemophilia"
  | "diabetesMellitus"
  | "hepatitis"
  | "hivPositive"
  | "skinDiseases"
  | "eczema"
  | "allergies"
  | "autoimmuneDisease"
  | "herpesProne"
  | "infectiousDiseases"
  | "epilepsy"
  | "cardiovascularProblems"
  | "bloodThinners"
  | "pregnant"
  | "regularMedications"
  | "hasPacemaker"
  | "woundHealingProblems"
  | "keloidScars"
  | "drugsAlcohol24h"
  | "recentSurgery14d"
  | "irradiationIntervention"
  | "usesRetinol"
  | "facialTreatment15d"
  | "microneedling1m"
  | "botox2m";

type ConsentKey =
  | "consentSwellingRedness"
  | "consentScabsColorChanges"
  | "consentDarkerThicker"
  | "consentSkinTypeRetention"
  | "consentSymmetry"
  | "consentHealingVariation"
  | "consentCorrectionTiming"
  | "consentRefreshNeeded"
  | "consentAftercare"
  | "consentAllergicReactions"
  | "consentFalseInfo"
  | "consentPhotoMarketing";

interface FormData {
  // Step 1
  salonName: string;
  clientName: string;
  phone: string;
  email: string;
  treatmentType: string;
  appointmentDate: string;
  // Step 2 health
  hemophilia: boolean;
  diabetesMellitus: boolean;
  hepatitis: boolean;
  hivPositive: boolean;
  skinDiseases: boolean;
  eczema: boolean;
  allergies: boolean;
  autoimmuneDisease: boolean;
  herpesProne: boolean;
  infectiousDiseases: boolean;
  epilepsy: boolean;
  cardiovascularProblems: boolean;
  bloodThinners: boolean;
  pregnant: boolean;
  regularMedications: boolean;
  hasPacemaker: boolean;
  woundHealingProblems: boolean;
  keloidScars: boolean;
  drugsAlcohol24h: boolean;
  recentSurgery14d: boolean;
  irradiationIntervention: boolean;
  usesRetinol: boolean;
  facialTreatment15d: boolean;
  microneedling1m: boolean;
  botox2m: boolean;
  vaccinationTimeframe: string;
  // Step 3 consents
  consentSwellingRedness: boolean;
  consentScabsColorChanges: boolean;
  consentDarkerThicker: boolean;
  consentSkinTypeRetention: boolean;
  consentSymmetry: boolean;
  consentHealingVariation: boolean;
  consentCorrectionTiming: boolean;
  consentRefreshNeeded: boolean;
  consentAftercare: boolean;
  consentAllergicReactions: boolean;
  consentFalseInfo: boolean;
  consentPhotoMarketing: boolean;
  // Step 4 signature
  signatureFullName: string;
  signatureData: string;
  signatureDate: string;
}

const INITIAL: FormData = {
  salonName: "Velvet Brow Studio",
  clientName: "",
  phone: "",
  email: "",
  treatmentType: "",
  appointmentDate: "",
  hemophilia: false,
  diabetesMellitus: false,
  hepatitis: false,
  hivPositive: false,
  skinDiseases: false,
  eczema: false,
  allergies: false,
  autoimmuneDisease: false,
  herpesProne: false,
  infectiousDiseases: false,
  epilepsy: false,
  cardiovascularProblems: false,
  bloodThinners: false,
  pregnant: false,
  regularMedications: false,
  hasPacemaker: false,
  woundHealingProblems: false,
  keloidScars: false,
  drugsAlcohol24h: false,
  recentSurgery14d: false,
  irradiationIntervention: false,
  usesRetinol: false,
  facialTreatment15d: false,
  microneedling1m: false,
  botox2m: false,
  vaccinationTimeframe: "",
  consentSwellingRedness: false,
  consentScabsColorChanges: false,
  consentDarkerThicker: false,
  consentSkinTypeRetention: false,
  consentSymmetry: false,
  consentHealingVariation: false,
  consentCorrectionTiming: false,
  consentRefreshNeeded: false,
  consentAftercare: false,
  consentAllergicReactions: false,
  consentFalseInfo: false,
  consentPhotoMarketing: false,
  signatureFullName: "",
  signatureData: "",
  signatureDate: new Date().toISOString().split("T")[0],
};

const STEPS = [
  { id: 1, label: "Client Info" },
  { id: 2, label: "Health" },
  { id: 3, label: "Consent" },
  { id: 4, label: "Signature" },
];

// ─── Signature Pad ───────────────────────────────────────────────────────────

function SignaturePad({
  onSave,
  onClear,
}: {
  onSave: (data: string) => void;
  onClear: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [hasSignature, setHasSignature] = useState(false);
  const dprRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  const getPos = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      isDrawing.current = true;
      const pos = getPos(e, canvas);
      lastPos.current = pos;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "#C9A96E";
        ctx.fill();
      }
      setHasSignature(true);
    },
    []
  );

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#C9A96E";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPos.current = pos;
  }, []);

  const stopDrawing = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) onSave(canvas.toDataURL());
  }, [onSave]);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width / dprRef.current, canvas.height / dprRef.current);
    setHasSignature(false);
    onClear();
  };

  return (
    <div>
      <div className="relative rounded-lg border-2 border-dashed border-dark-lighter overflow-hidden bg-dark">
        <canvas
          ref={canvasRef}
          className="w-full touch-none"
          style={{ height: 160, cursor: "crosshair" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-600 text-sm select-none">
              Draw your signature here
            </p>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={clear}
        className="mt-2 text-xs text-gray-500 hover:text-gold transition-colors duration-200 uppercase tracking-wider"
      >
        Clear signature
      </button>
    </div>
  );
}

// ─── YesNo Field ─────────────────────────────────────────────────────────────

function YesNoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-dark-lighter/40 last:border-0">
      <span className="text-gray-300 text-sm leading-relaxed flex-1">
        {label}
      </span>
      <div className="flex gap-1.5 flex-shrink-0">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`min-w-[44px] px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 ${
            !value
              ? "bg-dark-lighter text-white"
              : "bg-transparent text-gray-600 border border-dark-lighter hover:border-gray-500"
          }`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`min-w-[44px] px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 ${
            value
              ? "bg-red-500/20 text-red-400 border border-red-500/40"
              : "bg-transparent text-gray-600 border border-dark-lighter hover:border-gray-500"
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

// ─── Consent Checkbox ────────────────────────────────────────────────────────

function ConsentCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-4 py-3 border-b border-dark-lighter/40 last:border-0 cursor-pointer group">
      <div className="flex-shrink-0 mt-0.5">
        <div
          onClick={() => onChange(!checked)}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            checked
              ? "bg-gold/20 border-gold"
              : "border-dark-lighter group-hover:border-gray-500"
          }`}
        >
          {checked && (
            <svg
              className="w-3.5 h-3.5 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      <span
        className="text-gray-300 text-sm leading-relaxed"
        onClick={() => onChange(!checked)}
      >
        {label}
      </span>
    </label>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((s, i) => {
        const isActive = s.id === step;
        const isDone = s.id < step;
        return (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-gold text-black"
                    : isActive
                    ? "bg-gold/20 border-2 border-gold text-gold"
                    : "bg-dark-lighter text-gray-500"
                }`}
              >
                {isDone ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  s.id
                )}
              </div>
              <span
                className={`mt-1.5 text-xs uppercase tracking-wider hidden sm:block ${
                  isActive ? "text-gold" : isDone ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 transition-all duration-500 ${
                  s.id < step ? "bg-gold" : "bg-dark-lighter"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Field Helpers ────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
  error,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full bg-dark border border-dark-lighter rounded px-4 py-3 text-white placeholder-gray-600 text-sm transition-all duration-300 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ConsentFormClient() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const set = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setData((d) => ({ ...d, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined }));
    },
    []
  );

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Step 1 Validation ──
  const validateStep1 = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!data.clientName.trim()) errs.clientName = "Full name is required.";
    if (!data.phone.trim()) errs.phone = "Phone number is required.";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = "Valid email address is required.";
    if (!data.treatmentType) errs.treatmentType = "Please select a treatment type.";
    if (!data.appointmentDate) errs.appointmentDate = "Please enter the appointment date.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Step 2 Validation ──
  const validateStep2 = (): boolean => {
    if (!data.vaccinationTimeframe.trim()) {
      setErrors({ vaccinationTimeframe: "Please enter the vaccination timeframe." });
      return false;
    }
    return true;
  };

  // ── Step 3 Validation ──
  const validateStep3 = (): boolean => {
    const allChecked = CONSENT_ITEMS.every((item) => data[item.key]);
    if (!allChecked) {
      setErrors({
        consentPhotoMarketing: "All consent items must be acknowledged before proceeding.",
      });
      return false;
    }
    return true;
  };

  // ── Step 4 Validation ──
  const validateStep4 = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!data.signatureFullName.trim())
      errs.signatureFullName = "Please type your full legal name.";
    if (!data.signatureData)
      errs.signatureData = "Please provide your digital signature above.";
    if (!data.signatureDate)
      errs.signatureDate = "Please enter the date.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    setErrors({});
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    goTo(step + 1);
  };

  const handleSubmit = async () => {
    setErrors({});
    if (!validateStep4()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      const saved = await res.json();
      setSubmissionId(saved.id);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success Screen ────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen bg-dark py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-8 w-24 h-24 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center"
          >
            <motion.svg
              className="w-12 h-12 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-heading text-4xl text-white mb-3">
              Consent Form Submitted
            </h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Thank you, {data.clientName}. Your intake and consent form has
              been received. We look forward to seeing you at your{" "}
              <span className="text-gold">{data.treatmentType}</span>{" "}
              appointment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-dark-light border border-dark-lighter rounded-lg p-6 mb-8 text-left"
          >
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
              Record ID
            </p>
            <p className="text-gold font-mono text-sm mb-4">{submissionId}</p>
            <p className="text-xs text-gray-500">
              Please keep this reference for your records. Your information has
              been securely saved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 rounded text-sm font-semibold uppercase tracking-widest transition-all duration-300"
            >
              Print / Save as PDF
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gold-gradient text-black rounded text-sm font-semibold uppercase tracking-widest hover:shadow-glow transition-shadow duration-300 text-center"
            >
              Return to Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Main Form ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-dark py-16 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <p className="text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-3">
          Pre-Treatment
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-white mb-3">
          Client Intake &amp; Consent Form
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Please complete this form before your appointment. All information is
          kept confidential and used solely for treatment purposes.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <ProgressBar step={step} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            {/* ── Step 1: Client Info ── */}
            {step === 1 && (
              <div className="bg-dark-light border border-dark-lighter rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="font-heading text-2xl text-white mb-1">
                    Client Information
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Please fill in your details accurately.
                  </p>
                </div>

                <Field label="Company / Salon Name">
                  <input
                    type="text"
                    value={data.salonName}
                    onChange={(e) => set("salonName", e.target.value)}
                    className={inputClass}
                    placeholder="Velvet Brow Studio"
                  />
                </Field>

                <Field label="Client Full Name" required error={errors.clientName}>
                  <input
                    type="text"
                    value={data.clientName}
                    onChange={(e) => set("clientName", e.target.value)}
                    className={inputClass}
                    placeholder="Your full legal name"
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Phone Number" required error={errors.phone}>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={inputClass}
                      placeholder="(000) 000-0000"
                    />
                  </Field>
                  <Field label="Email Address" required error={errors.email}>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </Field>
                </div>

                <Field label="Treatment Type" required error={errors.treatmentType}>
                  <select
                    value={data.treatmentType}
                    onChange={(e) => set("treatmentType", e.target.value)}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="">Select treatment…</option>
                    {TREATMENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Appointment Date" required error={errors.appointmentDate}>
                  <input
                    type="date"
                    value={data.appointmentDate}
                    onChange={(e) => set("appointmentDate", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
            )}

            {/* ── Step 2: Health Questions ── */}
            {step === 2 && (
              <div className="bg-dark-light border border-dark-lighter rounded-xl p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="font-heading text-2xl text-white mb-1">
                    Health Assessment
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Please answer honestly. Items not selected default to{" "}
                    <strong className="text-white">No</strong>. All answers are
                    kept confidential.
                  </p>
                </div>

                <div className="space-y-0">
                  {HEALTH_QUESTIONS.map((q) => (
                    <YesNoField
                      key={q.key}
                      label={q.label}
                      value={data[q.key] as boolean}
                      onChange={(v) => set(q.key, v)}
                    />
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-dark-lighter">
                  <Field
                    label="How much time has passed since your last vaccination?"
                    required
                    error={errors.vaccinationTimeframe}
                  >
                    <input
                      type="text"
                      value={data.vaccinationTimeframe}
                      onChange={(e) => set("vaccinationTimeframe", e.target.value)}
                      className={inputClass}
                      placeholder="e.g. 6 months ago, 2 years ago, never"
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* ── Step 3: Consent ── */}
            {step === 3 && (
              <div className="bg-dark-light border border-dark-lighter rounded-xl p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="font-heading text-2xl text-white mb-1">
                    Consent &amp; Acknowledgements
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Please read and check each item carefully. All boxes must be
                    confirmed to proceed.
                  </p>
                </div>

                <div className="space-y-0">
                  {CONSENT_ITEMS.map((item) => (
                    <ConsentCheckbox
                      key={item.key}
                      label={item.label}
                      checked={data[item.key] as boolean}
                      onChange={(v) => set(item.key, v)}
                    />
                  ))}
                </div>

                {errors.consentPhotoMarketing && (
                  <p className="mt-4 text-xs text-red-400 text-center">
                    {errors.consentPhotoMarketing}
                  </p>
                )}

                <div className="mt-6 pt-6 border-t border-dark-lighter flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {CONSENT_ITEMS.filter((i) => data[i.key]).length} /{" "}
                    {CONSENT_ITEMS.length} confirmed
                  </span>
                  {CONSENT_ITEMS.every((i) => data[i.key]) ? (
                    <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      All confirmed
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        CONSENT_ITEMS.forEach((item) => set(item.key, true));
                      }}
                      className="text-xs text-gold underline underline-offset-2 hover:text-gold-light transition-colors"
                    >
                      Accept all
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ── Step 4: Signature ── */}
            {step === 4 && (
              <div className="bg-dark-light border border-dark-lighter rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="font-heading text-2xl text-white mb-1">
                    Signature
                  </h2>
                  <p className="text-gray-500 text-sm">
                    By signing below, you confirm that all information provided
                    is accurate and complete.
                  </p>
                </div>

                <Field
                  label="Typed Full Legal Name"
                  required
                  error={errors.signatureFullName}
                >
                  <input
                    type="text"
                    value={data.signatureFullName}
                    onChange={(e) => set("signatureFullName", e.target.value)}
                    className={inputClass}
                    placeholder="Type your full name"
                  />
                </Field>

                <Field
                  label="Digital Signature"
                  required
                  error={errors.signatureData}
                >
                  <SignaturePad
                    onSave={(d) => set("signatureData", d)}
                    onClear={() => set("signatureData", "")}
                  />
                </Field>

                <Field label="Date" required error={errors.signatureDate}>
                  <input
                    type="date"
                    value={data.signatureDate}
                    onChange={(e) => set("signatureDate", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm text-center">
                    {submitError}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={() => goTo(step - 1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gold-gradient px-8 py-3 text-black font-semibold uppercase tracking-widest text-sm rounded hover:shadow-glow transition-shadow duration-300"
            >
              Continue
            </motion.button>
          ) : (
            <motion.button
              onClick={handleSubmit}
              disabled={submitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gold-gradient px-8 py-3 text-black font-semibold uppercase tracking-widest text-sm rounded hover:shadow-glow transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : "Submit Consent Form"}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

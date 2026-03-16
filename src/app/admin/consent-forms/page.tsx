"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import type { ConsentFormSubmission } from "@/types";

const HEALTH_LABELS: Partial<Record<keyof ConsentFormSubmission, string>> = {
  hemophilia: "Hemophilia",
  diabetesMellitus: "Diabetes mellitus",
  hepatitis: "Hepatitis A/B/C/D/E/F",
  hivPositive: "HIV+",
  skinDiseases: "Skin diseases",
  eczema: "Eczema",
  allergies: "Allergies",
  autoimmuneDisease: "Autoimmune diseases",
  herpesProne: "Prone to herpes",
  infectiousDiseases: "Infectious diseases / fever",
  epilepsy: "Epilepsy",
  cardiovascularProblems: "Cardiovascular problems",
  bloodThinners: "Blood-thinning medication",
  pregnant: "Pregnant",
  regularMedications: "Regular medications",
  hasPacemaker: "Pacemaker",
  woundHealingProblems: "Wound healing problems",
  keloidScars: "Keloid scar problems",
  drugsAlcohol24h: "Drugs / alcohol (last 24h)",
  recentSurgery14d: "Surgery (last 14 days)",
  irradiationIntervention: "Irradiation / medical intervention",
  usesRetinol: "Uses Retinol",
  facialTreatment15d: "Facial treatment (last 15 days)",
  microneedling1m: "Microneedling (last month)",
  botox2m: "Botox (last 2 months)",
};

function DetailModal({
  submission,
  onClose,
}: {
  submission: ConsentFormSubmission;
  onClose: () => void;
}) {
  const positiveHealth = Object.entries(HEALTH_LABELS).filter(
    ([key]) => submission[key as keyof ConsentFormSubmission] === true
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-dark-light border border-dark-lighter rounded-xl w-full max-w-2xl my-8 overflow-hidden z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-lighter">
          <div>
            <h2 className="font-heading text-xl text-white">
              {submission.clientName}
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              ID: {submission.id}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-gold/40 text-gold hover:bg-gold/10 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Section 1 */}
          <div>
            <h3 className="text-gold text-xs uppercase tracking-widest font-semibold mb-3">
              Client Information
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Salon", submission.salonName],
                ["Name", submission.clientName],
                ["Phone", submission.phone],
                ["Email", submission.email],
                ["Treatment", submission.treatmentType],
                ["Appointment Date", submission.appointmentDate],
                [
                  "Submitted",
                  format(new Date(submission.submittedAt), "MMM d, yyyy h:mm a"),
                ],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-white">{value || "—"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-gold text-xs uppercase tracking-widest font-semibold mb-3">
              Health Flags
            </h3>
            {positiveHealth.length === 0 ? (
              <p className="text-green-400 text-sm">No health concerns flagged.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {positiveHealth.map(([, label]) => (
                  <span
                    key={label}
                    className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-3 text-sm">
              <span className="text-gray-500 text-xs uppercase tracking-wider">
                Last vaccination:{" "}
              </span>
              <span className="text-white">
                {submission.vaccinationTimeframe || "—"}
              </span>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-gold text-xs uppercase tracking-widest font-semibold mb-3">
              Consents
            </h3>
            <p className="text-sm text-gray-400">
              All 12 consent items acknowledged:{" "}
              <span
                className={
                  submission.consentPhotoMarketing &&
                  submission.consentFalseInfo
                    ? "text-green-400 font-semibold"
                    : "text-red-400 font-semibold"
                }
              >
                {submission.consentPhotoMarketing &&
                submission.consentFalseInfo
                  ? "Yes"
                  : "Incomplete"}
              </span>
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-gold text-xs uppercase tracking-widest font-semibold mb-3">
              Signature
            </h3>
            <p className="text-sm text-gray-400 mb-2">
              Signed as:{" "}
              <span className="text-white font-medium">
                {submission.signatureFullName}
              </span>{" "}
              on{" "}
              <span className="text-white">
                {submission.signatureDate}
              </span>
            </p>
            {submission.signatureData && (
              <div className="rounded-lg border border-dark-lighter overflow-hidden bg-dark p-2 inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={submission.signatureData}
                  alt="Client signature"
                  className="max-w-full h-20 object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ConsentFormsPage() {
  const [submissions, setSubmissions] = useState<ConsentFormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ConsentFormSubmission | null>(null);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    setQrUrl(`${window.location.origin}/consent`);
    fetch("/api/consent")
      .then((r) => r.json())
      .then((data) => {
        setSubmissions(
          Array.isArray(data)
            ? [...data].sort(
                (a, b) =>
                  new Date(b.submittedAt).getTime() -
                  new Date(a.submittedAt).getTime()
              )
            : []
        );
      })
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl text-white">Consent Forms</h1>
            <p className="text-gray-500 text-sm mt-1">
              {submissions.length} submission
              {submissions.length !== 1 ? "s" : ""}
            </p>
          </div>
          <a
            href="/consent/qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gold/40 text-gold hover:bg-gold/10 rounded text-sm font-semibold uppercase tracking-wider transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 3.5V16m0 0v3.5M20 16h-3.5M4 4h4v4H4V4zm12 0h4v4h-4V4zM4 16h4v4H4v-4z" />
            </svg>
            Print QR Code
          </a>
        </div>

        {/* QR Info Card */}
        <div className="bg-dark-light border border-dark-lighter rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            {qrUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&bgcolor=1A1A1A&color=C9A96E&data=${encodeURIComponent(qrUrl)}`}
                alt="Consent Form QR"
                width={120}
                height={120}
                className="rounded-lg"
              />
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-heading text-lg text-white mb-1">
              Client Consent Form
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              Scan here to complete your consultation and consent form before
              treatment.
            </p>
            <p className="text-gold/70 text-xs font-mono">{qrUrl}</p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="py-20 text-center text-gray-500">
            Loading submissions…
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-dark-light border border-dark-lighter rounded-xl p-12 text-center">
            <p className="text-gray-400 mb-2">No consent forms submitted yet.</p>
            <p className="text-gray-600 text-sm">
              Forms will appear here once clients complete them.
            </p>
          </div>
        ) : (
          <div className="bg-dark-light border border-dark-lighter rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-lighter">
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                      Client
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium hidden sm:table-cell">
                      Treatment
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium hidden md:table-cell">
                      Appt. Date
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                      Submitted
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium hidden lg:table-cell">
                      Health Flags
                    </th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s) => {
                    const flagCount = Object.keys(HEALTH_LABELS).filter(
                      (k) => s[k as keyof ConsentFormSubmission] === true
                    ).length;

                    return (
                      <tr
                        key={s.id}
                        className="border-b border-dark-lighter/50 last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setSelected(s)}
                      >
                        <td className="px-6 py-4">
                          <p className="text-white font-medium">{s.clientName}</p>
                          <p className="text-gray-500 text-xs">{s.email}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-400 hidden sm:table-cell">
                          {s.treatmentType}
                        </td>
                        <td className="px-6 py-4 text-gray-400 hidden md:table-cell">
                          {s.appointmentDate || "—"}
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {format(new Date(s.submittedAt), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          {flagCount > 0 ? (
                            <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-full">
                              {flagCount} flag{flagCount > 1 ? "s" : ""}
                            </span>
                          ) : (
                            <span className="text-green-400 text-xs">None</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gold text-xs hover:text-gold-light">
                            View →
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <DetailModal
            submission={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

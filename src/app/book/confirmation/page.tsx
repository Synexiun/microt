"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import GoldButton from "@/components/ui/GoldButton";
import Spinner from "@/components/ui/Spinner";
import type { Appointment } from "@/types";
import { format } from "date-fns";

function ConsentQRCard() {
  const [url, setUrl] = useState("https://velvetbrowstudio.com/consent");
  useEffect(() => {
    setUrl(`${window.location.origin}/consent`);
  }, []);
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&bgcolor=ffffff&color=0A0A0A&margin=8&data=${encodeURIComponent(url)}`;

  return (
    <div className="bg-gold/5 border border-gold/20 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-3 border-b border-gold/10 text-center">
        <p className="text-gold text-xs uppercase tracking-widest font-semibold">
          Next Step
        </p>
        <h3 className="font-heading text-xl text-white mt-1">
          Complete Your Consent Form
        </h3>
        <p className="text-gray-400 text-xs mt-1 leading-relaxed">
          Required before your appointment. Takes only a few minutes.
        </p>
      </div>

      {/* QR — desktop only */}
      <div className="hidden md:flex flex-col items-center py-5 border-b border-gold/10">
        <div className="rounded-lg overflow-hidden shadow-glow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrSrc} alt="Consent Form QR" width={120} height={120} />
        </div>
        <p className="mt-2 text-gray-500 text-xs">Scan with your phone</p>
      </div>

      {/* Button — always visible */}
      <div className="px-6 py-4 text-center">
        <Link
          href="/consent"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold-gradient text-black text-xs font-semibold uppercase tracking-widest rounded hover:shadow-glow transition-shadow duration-300"
        >
          <span className="md:hidden">Tap to Open Consent Form</span>
          <span className="hidden md:inline">Open on This Device</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("id");
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appointmentId) {
      setLoading(false);
      return;
    }

    // Attempt to fetch the appointment details from the list
    async function fetchAppointment() {
      try {
        const res = await fetch("/api/appointments");
        if (res.ok) {
          const appointments: Appointment[] = await res.json();
          const found = appointments.find((a) => a.id === appointmentId);
          if (found) setAppointment(found);
        }
      } catch {
        // Non-critical — we still display the confirmation
      } finally {
        setLoading(false);
      }
    }

    fetchAppointment();
  }, [appointmentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 text-center">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="mx-auto mb-6 w-24 h-24 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center"
      >
        <motion.svg
          className="w-12 h-12 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-heading text-4xl text-white mb-3">
          Booking Confirmed!
        </h1>
        <p className="text-gray-400 mb-8">
          Thank you for choosing Velvet Brow Studio. We look forward to seeing
          you!
        </p>
      </motion.div>

      {/* Booking details */}
      {appointment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-light border border-dark-lighter rounded-lg text-left mb-8 overflow-hidden"
        >
          <div className="p-5 border-b border-dark-lighter">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
              Booking Reference
            </p>
            <p className="text-gold font-mono text-sm">
              {appointment.id}
            </p>
          </div>

          <div className="p-5 border-b border-dark-lighter">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
              Service
            </p>
            <p className="text-white font-medium">{appointment.serviceName}</p>
          </div>

          <div className="p-5 border-b border-dark-lighter">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
              Date & Time
            </p>
            <p className="text-white font-medium">
              {format(
                new Date(appointment.date + "T00:00:00"),
                "EEEE, MMMM d, yyyy"
              )}{" "}
              at {appointment.time}
            </p>
          </div>

          <div className="p-5 border-b border-dark-lighter">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
              Name
            </p>
            <p className="text-white">{appointment.clientName}</p>
          </div>

          <div className="p-5">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
              Email
            </p>
            <p className="text-white">{appointment.clientEmail}</p>
          </div>

          {appointment.notes && (
            <div className="p-5 border-t border-dark-lighter">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Notes
              </p>
              <p className="text-gray-300 text-sm">{appointment.notes}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* No appointment found — still show confirmation with ID */}
      {!appointment && appointmentId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-light border border-dark-lighter rounded-lg p-6 mb-8"
        >
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
            Booking Reference
          </p>
          <p className="text-gold font-mono text-sm">{appointmentId}</p>
        </motion.div>
      )}

      {!appointmentId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-light border border-dark-lighter rounded-lg p-6 mb-8"
        >
          <p className="text-gray-400">No booking reference found.</p>
        </motion.div>
      )}

      {/* Consent form QR card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-8"
      >
        <ConsentQRCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Link href="/">
          <GoldButton>Return to Home</GoldButton>
        </Link>
      </motion.div>
    </div>
  );
}

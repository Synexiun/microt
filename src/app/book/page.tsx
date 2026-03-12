"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BookingProgress from "@/components/booking/BookingProgress";
import ServiceStep from "@/components/booking/ServiceStep";
import DateTimeStep from "@/components/booking/DateTimeStep";
import ClientInfoStep from "@/components/booking/ClientInfoStep";
import ReviewStep from "@/components/booking/ReviewStep";
import GoldButton from "@/components/ui/GoldButton";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function BookPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Booking data
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientInfo, setClientInfo] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: "",
  });

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
    setError("");
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedService) {
      setError("Please select a service to continue.");
      return;
    }
    if (currentStep === 2) {
      if (!selectedDate) {
        setError("Please select a date.");
        return;
      }
      if (!selectedTime) {
        setError("Please select a time slot.");
        return;
      }
    }
    setError("");
    goToStep(currentStep + 1);
  };

  const handleBack = () => {
    goToStep(currentStep - 1);
  };

  const handleClientInfoSubmit = (data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    notes?: string;
  }) => {
    setClientInfo({
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      notes: data.notes ?? "",
    });
    goToStep(4);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: selectedService,
          date: selectedDate,
          time: selectedTime,
          ...clientInfo,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create booking");
      }

      const appointment = await res.json();
      router.push(`/book/confirmation?id=${appointment.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <BookingProgress currentStep={currentStep} />

      {/* Error display */}
      {error && (
        <div className="max-w-lg mx-auto mb-6 px-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm text-center">
            {error}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        >
          {currentStep === 1 && (
            <ServiceStep
              selectedSlug={selectedService}
              onSelect={(slug) => {
                setSelectedService(slug);
                setError("");
              }}
            />
          )}

          {currentStep === 2 && (
            <DateTimeStep
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
            />
          )}

          {currentStep === 3 && (
            <ClientInfoStep
              defaultValues={clientInfo}
              onSubmit={handleClientInfoSubmit}
            />
          )}

          {currentStep === 4 && (
            <ReviewStep
              bookingData={{
                serviceSlug: selectedService,
                date: selectedDate,
                time: selectedTime,
                ...clientInfo,
              }}
              onEdit={goToStep}
              onConfirm={handleConfirm}
              isSubmitting={isSubmitting}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="max-w-lg mx-auto mt-8 px-4 flex items-center justify-between">
        {currentStep > 1 && currentStep < 4 ? (
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
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

        {/* Next button for steps 1 and 2 (step 3 uses form submit, step 4 uses confirm) */}
        {currentStep <= 2 && (
          <GoldButton onClick={handleNext}>
            Continue
          </GoldButton>
        )}

        {/* Back only on step 4 */}
        {currentStep === 4 && (
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
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
        )}
      </div>
    </div>
  );
}

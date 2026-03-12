"use client";

import React from "react";
import { format } from "date-fns";
import GoldButton from "@/components/ui/GoldButton";
import Spinner from "@/components/ui/Spinner";
import { services } from "@/lib/services";

interface BookingData {
  serviceSlug: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}

interface ReviewStepProps {
  bookingData: BookingData;
  onEdit: (step: number) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export default function ReviewStep({
  bookingData,
  onEdit,
  onConfirm,
  isSubmitting,
}: ReviewStepProps) {
  const service = services.find((s) => s.slug === bookingData.serviceSlug);
  const formattedDate = bookingData.date
    ? format(new Date(bookingData.date + "T00:00:00"), "EEEE, MMMM d, yyyy")
    : "";

  const rows = [
    {
      label: "Service",
      value: service?.name ?? bookingData.serviceSlug,
      sub: service ? `${service.duration} | ${service.priceRange}` : undefined,
      step: 1,
    },
    {
      label: "Date & Time",
      value: `${formattedDate} at ${bookingData.time}`,
      step: 2,
    },
    {
      label: "Name",
      value: bookingData.clientName,
      step: 3,
    },
    {
      label: "Email",
      value: bookingData.clientEmail,
      step: 3,
    },
    {
      label: "Phone",
      value: bookingData.clientPhone,
      step: 3,
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <h2 className="font-heading text-3xl text-white text-center mb-2">
        Review Your Booking
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Please confirm everything looks correct
      </p>

      <div className="bg-dark-light/50 border border-gold/20 rounded-lg overflow-hidden glass shadow-glow-sm">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`
              flex items-start justify-between p-5
              ${idx < rows.length - 1 ? "border-b border-dark-lighter" : ""}
            `}
          >
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                {row.label}
              </p>
              <p className="text-white font-medium">{row.value}</p>
              {row.sub && (
                <p className="text-sm text-gray-400 mt-0.5">{row.sub}</p>
              )}
            </div>
            <button
              onClick={() => onEdit(row.step)}
              className="text-gold text-sm hover:text-gold-light transition-colors ml-4 mt-1 shrink-0"
            >
              Edit
            </button>
          </div>
        ))}

        {/* Notes */}
        {bookingData.notes && (
          <div className="border-t border-dark-lighter p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Notes
                </p>
                <p className="text-gray-300 text-sm">{bookingData.notes}</p>
              </div>
              <button
                onClick={() => onEdit(3)}
                className="text-gold text-sm hover:text-gold-light transition-colors ml-4 mt-1 shrink-0"
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {/* Confirm button */}
        <div className="p-5 border-t border-dark-lighter">
          <GoldButton
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <Spinner size="sm" />
                Confirming...
              </span>
            ) : (
              "Confirm Booking"
            )}
          </GoldButton>
        </div>
      </div>
    </div>
  );
}

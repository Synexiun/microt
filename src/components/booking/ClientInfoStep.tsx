"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import GoldButton from "@/components/ui/GoldButton";

const clientInfoSchema = z.object({
  clientName: z.string().min(2, "Name must be at least 2 characters"),
  clientEmail: z.string().email("Please enter a valid email address"),
  clientPhone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    ),
  notes: z.string().optional(),
});

type ClientInfoData = z.infer<typeof clientInfoSchema>;

interface ClientInfoStepProps {
  defaultValues: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    notes: string;
  };
  onSubmit: (data: ClientInfoData) => void;
}

export default function ClientInfoStep({
  defaultValues,
  onSubmit,
}: ClientInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientInfoData>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues,
  });

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <h2 className="font-heading text-3xl text-white text-center mb-2">
        Your Information
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Tell us a bit about yourself
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-dark-light/50 border border-gold/20 rounded-lg p-6 sm:p-8 glass hover-glow"
      >
        <Input
          label="Full Name"
          placeholder="Jane Doe"
          {...register("clientName")}
          error={errors.clientName?.message}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          {...register("clientEmail")}
          error={errors.clientEmail?.message}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="(949) 555-0123"
          {...register("clientPhone")}
          error={errors.clientPhone?.message}
        />

        <Input
          variant="textarea"
          label="Notes (optional)"
          placeholder="Any allergies, preferences, or questions..."
          {...register("notes")}
          error={errors.notes?.message}
        />

        <div className="pt-2">
          <GoldButton type="submit" className="w-full">
            Continue to Review
          </GoldButton>
        </div>
      </form>
    </div>
  );
}

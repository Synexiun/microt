import { z } from "zod";

export const bookingSchema = z.object({
  serviceSlug: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
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

export type BookingFormData = z.infer<typeof bookingSchema>;

export const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;

export const adminLoginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

export const galleryUploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  serviceSlug: z.string().min(1, "Please select a service"),
  type: z.enum(["before-after", "portfolio"], {
    error: "Please select a gallery type",
  }),
});

export type GalleryUploadFormData = z.infer<typeof galleryUploadSchema>;

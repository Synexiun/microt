export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  duration: string;
  priceRange: string;
  image: string;
  processSteps: { title: string; description: string }[];
  healingTimeline: { day: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export interface Appointment {
  id: string;
  serviceSlug: string;
  serviceName: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointmentIds: string[];
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface GalleryImage {
  id: string;
  filename: string;
  title: string;
  serviceSlug: string;
  type: "before-after" | "portfolio";
  uploadedAt: string;
}

export interface InstagramPost {
  id: string;
  url: string;
  embedHtml?: string;
  addedAt: string;
}

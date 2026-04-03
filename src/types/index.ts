export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  duration: string;
  priceRange: string;
  touchUpPrice?: string;
  image: string;
  processSteps: { title: string; description: string }[];
  healingTimeline: { day: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export interface ConsentFormSubmission {
  id: string;
  submittedAt: string;
  // Section 1 — Client Info
  salonName: string;
  clientName: string;
  phone: string;
  email: string;
  treatmentType: string;
  appointmentDate: string;
  // Section 2 — Health
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
  // Section 3 — Consents
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
  // Section 4 — Signature
  signatureFullName: string;
  signatureData: string;
  signatureDate: string;
  // Metadata
  userAgent?: string;
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

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  quote: string;
  rating: number;
  location: string;
  createdAt: string;
}

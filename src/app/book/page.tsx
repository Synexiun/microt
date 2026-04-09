import { getServices } from "@/lib/services";
import BookingWizard from "./BookingWizard";

export const dynamic = "force-dynamic";

export default async function BookPage() {
  const services = await getServices();
  return <BookingWizard services={services} />;
}

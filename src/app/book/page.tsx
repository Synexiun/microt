import { getServices } from "@/lib/services";
import BookingWizard from "./BookingWizard";

export default async function BookPage() {
  const services = await getServices();
  return <BookingWizard services={services} />;
}

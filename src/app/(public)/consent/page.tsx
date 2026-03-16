import { Metadata } from "next";
import ConsentFormClient from "./ConsentFormClient";

export const metadata: Metadata = {
  title: "Client Consent Form | Velvet Brow Studio",
  description:
    "Complete your pre-treatment client intake and consent form before your permanent makeup appointment at Velvet Brow Studio.",
};

export default function ConsentPage() {
  return <ConsentFormClient />;
}

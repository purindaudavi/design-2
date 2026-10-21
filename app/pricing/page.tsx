import type { Metadata } from "next";
import { PricingPage } from "./pricing-page";

export const metadata: Metadata = {
  title: "Pricing | Destination Management System",
  description: "DMS PMS subscriptions from US$49 per month for up to 3 properties. Compare monthly and yearly plans for hotels, villas and cabanas."
};

export default function Page() {
  return <PricingPage />;
}

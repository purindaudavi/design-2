export type BillingPeriod = "monthly" | "yearly";

// Marketing prices approved by the owner. Subscription billing and entitlement
// enforcement belong to the PMS backend; this page does not activate a plan.
export const pricingPlans = [
  { id: "starter", name: "Starter", properties: 3, monthly: 49, yearly: 490,
    description: "A simple start for your first few properties." },
  { id: "growth", name: "Growth", properties: 6, monthly: 89, yearly: 890,
    description: "More room for your growing collection of stays." },
  { id: "portfolio", name: "Portfolio", properties: 10, monthly: 129, yearly: 1290,
    description: "Bring your larger property portfolio together." }
] as const;

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export function planEnquiryLabel(planId: string | null, billing: BillingPeriod) {
  if (planId === "custom") return "Custom pricing · More than 10 properties";
  const plan = pricingPlans.find((item) => item.id === planId);
  return plan ? `${plan.name} · Up to ${plan.properties} properties · US${formatPrice(plan[billing])}/${billing === "yearly" ? "year" : "month"}` : "";
}

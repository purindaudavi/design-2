"use client";

import { useState } from "react";
import { ArrowRight, BarChart3, BedDouble, Building2, CalendarCheck, Check, ChevronDown, Layers3, Network, ReceiptText, SprayCan, Users } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { formatPrice, pricingPlans, type BillingPeriod } from "./plans";
import styles from "./pricing.module.css";

const features = [
  { icon: CalendarCheck, title: "Reservations & front desk", text: "Bookings, check-ins, departures and in-house room moves." },
  { icon: BedDouble, title: "Rooms, rates & inventory", text: "Room types, rate plans, meal allocations and availability." },
  { icon: SprayCan, title: "Housekeeping", text: "Cleaning tasks, room readiness and inspection records." },
  { icon: ReceiptText, title: "Financial records", text: "Invoices, credit notes, recorded payments and expenses." },
  { icon: Users, title: "Guests & travel agents", text: "Guest profiles and agent-linked reservations in one place." },
  { icon: BarChart3, title: "Dashboards & reports", text: "Review occupancy, booking sources and property performance." }
];

const faqs = [
  { question: "What counts as a property?", answer: "A property is a separate hotel, villa operation or cabana site with its own PMS workspace. Individual rooms or cabanas within that property do not each count as another property." },
  { question: "Do all three plans include the same PMS features?", answer: "Yes. Starter, Growth and Portfolio share the core PMS features listed above. The difference is the number of properties covered by your account: up to 3, 6 or 10." },
  { question: "How does yearly billing work?", answer: "Yearly billing is one payment for 12 months: US$490 for Starter, US$890 for Growth or US$1,290 for Portfolio. That is the cost of 10 monthly payments, giving you two months free each year." },
  { question: "What if I need more properties?", answer: "Choose the tier that covers your total property count. For more than 10 properties, discuss a custom subscription with our team. Plan changes and their billing arrangements are confirmed during setup." },
  { question: "How do I get started?", answer: "Choose a plan to open the demo form with your selection attached. This website is currently a preview: demo enquiries are saved in your browser only, and no subscription or payment is activated here." }
];

export function PricingPage() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const yearly = billing === "yearly";

  return (
    <main className={`siteShell ${styles.page}`} id="top">
      <SiteHeader page="pricing" />
      <section className={`section ${styles.hero}`} aria-labelledby="pricing-heading">
        
        <h1 id="pricing-heading">One account.<br /><em>Every property in view.</em></h1>
        <p>Manage your hotels, villas and cabanas with one PMS subscription.<br className={styles.desktopBreak} /> Choose your property count. Keep the same core features.</p>
        <div className={styles.billingRow}>
          <div className={styles.billingSwitch} role="group" aria-label="Billing period">
            <button type="button" aria-pressed={!yearly} onClick={() => setBilling("monthly")}>Monthly</button>
            <button type="button" aria-pressed={yearly} onClick={() => setBilling("yearly")}>Yearly</button>
          </div>
          <span className={styles.savingPill}>2 months free yearly <ArrowRight aria-hidden="true" /></span>
        </div>
      </section>

      <section className={`section ${styles.plansSection}`} aria-label="Subscription plans">
        <div className={styles.plans}>
          {pricingPlans.map((plan, index) => (
            <article key={plan.id} className={`${styles.plan} ${index === 1 ? styles.featuredPlan : ""}`} aria-labelledby={`${plan.id}-heading`}>
              <div className={styles.planTop}>
                <span className={styles.planIcon} aria-hidden="true">{index === 0 ? <Building2 /> : index === 1 ? <Layers3 /> : <Network />}</span>
                {index === 1 && <span className={styles.planBadge}>Room to grow</span>}
              </div>
              <h2 id={`${plan.id}-heading`}>{plan.name}</h2>
              <p className={styles.planDescription}>{plan.description}</p>
              <div className={styles.priceBlock} aria-live="polite" aria-atomic="true">
                <div className={styles.price}><strong>{formatPrice(plan[billing])}</strong><span>USD / {yearly ? "year" : "month"}</span></div>
                <p className={styles.billingDetail}>{yearly
                  ? `$${(plan.yearly / 12).toFixed(2)}/month equivalent, billed yearly`
                  : "Per account, billed monthly"}</p>
                <p className={styles.savings}>{yearly ? `Save ${formatPrice(plan.monthly * 12 - plan.yearly)} each year` : `Or ${formatPrice(plan.yearly)}/year with 2 months free`}</p>
              </div>
              <a className={`${index === 1 ? "primaryButton" : "secondaryButton"} ${styles.planCta}`}
                href={`/?plan=${plan.id}&billing=${billing}#request-demo`} aria-label={`Explore ${plan.name} with ${billing} billing`}>
                Choose {plan.name} 
              </a>
              <ul className={styles.planIncludes}>
                <li><Check aria-hidden="true" /><strong>Up to {plan.properties} properties</strong><span>per account</span></li>
                <li><Check aria-hidden="true" />All core PMS features</li>
                <li><Check aria-hidden="true" />Hotels, villas & cabanas</li>
              </ul>
            </article>
          ))}
        </div>
        <p className={styles.priceNote}>All prices are in USD. Choose a plan to explore in your demo.</p>
        <div className={styles.customPlan}>
          <div className={styles.customIntro}><span className={styles.customIcon}><Building2 aria-hidden="true" /></span><div><h2>More than 10 properties?</h2><p>Let’s shape a subscription around your portfolio.</p></div></div>
          <a href="/?plan=custom#request-demo" className="faq-hover-right">Discuss custom pricing <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className={`section ${styles.included}`} aria-labelledby="included-heading">
        <div className={styles.sectionHeading}><h2 id="included-heading">INCLUDED IN EVERY PLAN</h2><p>Every plan brings the essential PMS workflows into your property workspace.</p></div>
        <div className={styles.featureGrid}>{features.map(({ icon: Icon, title, text }) => (
          <div className={styles.feature} key={title}><span className={styles.featureIcon}><Icon aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></div>
        ))}</div>
        <div className={styles.propertyCallout}>
          <span className={styles.propertyCalloutIcon}><Building2 aria-hidden="true" /></span>
          <div className={styles.propertyCalloutCopy}>
            <h3>Your properties, one account</h3>
            <p>Use the same core tools for hotels, villas and cabanas. Choose your tier by property count.</p>
          </div>
          <a href="#pricing-faq" className="faq-hover-right">How properties are counted <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className={`section ${styles.faq}`} id="pricing-faq" aria-labelledby="pricing-faq-heading">
        <div className={styles.faqIntro}><h2 id="pricing-faq-heading">Before you choose.</h2><p>A few practical answers about your subscription.</p><a href="/#features" className="faq-hover-right">Explore the PMS <ArrowRight aria-hidden="true" /></a></div>
        <div className={styles.faqList}>{faqs.map(({ question, answer }) => (
          <details key={question}><summary>{question}<ChevronDown aria-hidden="true" /></summary><p>{answer}</p></details>
        ))}</div>
      </section>

      <footer className={styles.footer}>
        <div className={`section ${styles.footerInner}`}>
          <a className="brand brandFull" href="/" aria-label="Destination Management System home"><img className="brandFullLogo" src="/assets/dms-full-logo.png" alt="Destination Management System" /></a>
          <nav aria-label="Footer navigation"><a href="/#features">Features</a><a href="/pricing" aria-current="page">Pricing</a><a href="/#request-demo">Request a demo</a></nav>
          <span>© 2026 Destination Management System</span>
        </div>
      </footer>
    </main>
  );
}

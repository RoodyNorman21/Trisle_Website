"use client";

import { ActivitiesShowcase } from "@/components/marketing/activities-showcase";
import { AlertMarquee } from "@/components/marketing/alert-marquee";
import { Comparison } from "@/components/marketing/comparison";
import { Customize } from "@/components/marketing/customize";
import { Faq } from "@/components/marketing/faq";
import { Features } from "@/components/marketing/features";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Navbar } from "@/components/marketing/navbar";
import { Pricing } from "@/components/marketing/pricing";
import { Screenshots } from "@/components/marketing/screenshots";
import { SocialProof } from "@/components/marketing/social-proof";
import { StickyBuyBar } from "@/components/marketing/sticky-buy-bar";

function scrollToPricing() {
  document
    .getElementById("pricing")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  return (
    <div
      id="top"
      className="flex min-h-screen flex-col bg-black text-foreground"
    >
      <Navbar onBuy={scrollToPricing} />

      <main className="flex-1">
        <Hero onBuy={scrollToPricing} />
        <AlertMarquee />
        <Features />
        <ActivitiesShowcase />
        <Customize />
        <HowItWorks />
        <Screenshots />
        <SocialProof />
        <Comparison />
        <Pricing />
        <Faq />
      </main>

      <Footer />
      <StickyBuyBar />
    </div>
  );
}

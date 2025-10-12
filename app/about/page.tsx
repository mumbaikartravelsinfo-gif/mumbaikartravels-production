import type { Metadata } from "next"
import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"

export const metadata: Metadata = {
  title: "About Mumbaikar Travels | Leading Cab Service Provider in Mumbai",
  description:
    "Learn about Mumbaikar Travels - your trusted partner for premium taxi services in Mumbai. Professional drivers, luxury vehicles, 24/7 support. Know how our booking process works.",
  keywords: "about Mumbaikar Travels, premium taxi service Mumbai, professional cab drivers Mumbai, luxury car rental Mumbai, 24/7 taxi service Mumbai",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-8">
        <AboutSection />
        <HowItWorks />
      </div>
      <Footer />
      <FloatingActions />
    </main>
  )
}
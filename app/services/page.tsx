import type { Metadata } from "next"
import { Header } from "@/components/header"
import { ServicesSection } from "@/components/services-section"
import { PopularCars } from "@/components/popular-cars"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"

export const metadata: Metadata = {
  title: "Premium Cab Services in Mumbai | Mumbaikar Travels",
  description:
    "Explore our comprehensive taxi and cab services in Mumbai. Airport transfers, outstation travel, corporate solutions, hourly rentals, wedding transportation and more. Book now for reliable service.",
  keywords: "Mumbai taxi services, cab booking Mumbai, airport transfer Mumbai, corporate cab services, outstation travel Mumbai, wedding car rental Mumbai",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-8">
        <ServicesSection />
        <PopularCars />
      </div>
      <Footer />
      <FloatingActions />
    </main>
  )
}
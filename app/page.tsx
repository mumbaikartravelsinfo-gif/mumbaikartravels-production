import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { PopularCars } from "@/components/popular-cars"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <PopularCars />
      <Footer />
      <FloatingActions />
    </main>
  )
}

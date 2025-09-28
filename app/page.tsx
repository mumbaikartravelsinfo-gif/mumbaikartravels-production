import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <Footer />
      <FloatingActions />
    </main>
  )
}

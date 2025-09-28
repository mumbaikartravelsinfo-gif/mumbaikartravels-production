import type { Metadata } from "next"
import { Header } from "@/components/header"
import { DestinationsSection } from "@/components/destinations-section"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"

export const metadata: Metadata = {
  title: "Popular Travel Destinations from Mumbai | Mumbai Kar Travels",
  description:
    "Discover amazing travel destinations from Mumbai. Visit Lonavala, Mahabaleshwar, Alibaug, Shirdi, Pune and more. Affordable outstation cab packages with professional drivers.",
  keywords: "Mumbai to Lonavala cab, Mumbai to Mahabaleshwar taxi, Mumbai to Alibaug car rental, Mumbai to Shirdi cab booking, Mumbai to Pune taxi service, outstation cab Mumbai",
}

export default function DestinationsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-8">
        <DestinationsSection />
      </div>
      <Footer />
      <FloatingActions />
    </main>
  )
}
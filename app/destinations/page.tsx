import type { Metadata } from "next"
import { Header } from "@/components/header"
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
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Travel Destinations
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore our popular destinations through the navigation menu above. Choose from Sightseeing, Pilgrimage Tours, or Daily Services to book your journey.
            </p>
            <div className="bg-muted/30 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">How to Book</h2>
              <p className="text-muted-foreground">
                Use the dropdown menus in the navigation bar to select your desired destination from our three categories: Sightseeing, Pilgrimage Tours, and Daily Services. Each selection will open a booking form for your convenience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingActions />
    </main>
  )
}
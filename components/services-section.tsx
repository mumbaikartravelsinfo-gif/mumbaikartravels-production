"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Car, MapPin, Clock, Shield, Users, Plane, Building, Star, Zap } from "lucide-react"
import { BookingModal } from "./booking-modal"

const services = [
  {
    icon: Car,
    title: "Premium Outstation Travel",
    description:
      "Luxury vehicles for comfortable long-distance journeys with experienced drivers and flexible packages.",
    image: "/travel/premium.png",
    features: ["AC Vehicles", "Professional Drivers", "24/7 Support"],
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Punctual airport pickup and drop services with flight tracking and meet & greet assistance.",
    image: "/travel/airport.png",
    features: ["Flight Tracking", "Meet & Greet", "Luggage Assistance"],
  },
  {
    icon: Clock,
    title: "Hourly Rentals",
    description: "Flexible hourly car rentals for shopping, meetings, or multiple stops within the city.",
    image: "/travel/hourly.png",
    features: ["Flexible Hours", "Multiple Stops", "Wait & Return"],
  },
  {
    icon: Star,
    title: "Wedding & Events",
    description: "Special occasion transportation with decorated vehicles and professional chauffeurs.",
    image: "/travel/wedding.png",
    features: ["Decorated Cars", "Special Rates", "Event Coordination"],
  },
  {
    icon: Zap,
    title: "Express Booking",
    description: "Quick 15-minute pickup guarantee for urgent travel needs within Mumbai city limits.",
    image: "/travel/express.png",
    features: ["15-Min Pickup", "City Coverage", "Instant Confirmation"],
  },
  {
    icon: MapPin,
    title: "Tourist Packages",
    description: "Curated sightseeing packages covering Mumbai's iconic landmarks and hidden gems.",
    image: "/travel/tourist.png",
    features: ["Tour Guide", "Popular Routes", "Photo Stops"],
  },
]

export function ServicesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const handleBookService = (serviceTitle: string) => {
    setSelectedService(serviceTitle)
    setIsBookingModalOpen(true)
  }

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Car className="h-4 w-4" />
            Our Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Comprehensive Travel Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From quick city rides to luxury outstation journeys, we provide tailored transportation services for every
            need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{service.description}</p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handleBookService(service.title)}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all bg-transparent"
                  >
                    Book Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType={selectedService}
      />
    </section>
  )
}

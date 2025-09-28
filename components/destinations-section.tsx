"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Star, Users } from "lucide-react"
import { useState } from "react"
import { BookingModal } from "./booking-modal"

export function DestinationsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState("")

  const destinations = [
    {
      name: "Mumbai Darshan",
      description: "Complete city tour covering Gateway of India, Marine Drive, Juhu Beach",
      duration: "8-10 hours",
      price: "₹2,500",
      rating: 4.8,
      capacity: "4-7 people",
      image: "/mumbai-gateway-of-india-marine-drive.jpg",
    },
    {
      name: "Lonavala Hill Station",
      description: "Scenic hill station with waterfalls, caves, and beautiful viewpoints",
      duration: "Full Day",
      price: "₹3,200",
      rating: 4.9,
      capacity: "4-7 people",
      image: "/lonavala-hill-station-waterfalls.jpg",
    },
    {
      name: "Mahabaleshwar",
      description: "Queen of hill stations with strawberry farms and scenic points",
      duration: "2 Days",
      price: "₹4,800",
      rating: 4.7,
      capacity: "4-7 people",
      image: "/mahabaleshwar-hill-station-strawberry-farms.jpg",
    },
    {
      name: "Alibaug Beach",
      description: "Coastal getaway with pristine beaches and historic forts",
      duration: "Full Day",
      price: "₹2,800",
      rating: 4.6,
      capacity: "4-7 people",
      image: "/alibaug-beach-coastal-fort.jpg",
    },
    {
      name: "Shirdi Sai Baba",
      description: "Spiritual journey to the holy shrine of Sai Baba",
      duration: "Full Day",
      price: "₹3,500",
      rating: 4.9,
      capacity: "4-7 people",
      image: "/shirdi-sai-baba-temple.jpg",
    },
    {
      name: "Pune City Tour",
      description: "Cultural capital with historic sites, gardens, and modern attractions",
      duration: "8-10 hours",
      price: "₹2,200",
      rating: 4.5,
      capacity: "4-7 people",
      image: "/pune-city-shaniwar-wada-historic-sites.jpg",
    },
  ]

  const handleBookNow = (destinationName: string) => {
    setSelectedDestination(destinationName)
    setIsModalOpen(true)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular <span className="text-primary">Destinations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Maharashtra's most beautiful destinations with our comfortable and reliable cab services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={`/.jpg?key=fa6g3&height=200&width=400&query=${destination.name.toLowerCase().replace(/\s+/g, "-")}-${destination.description.split(" ").slice(0, 3).join("-")}`}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{destination.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{destination.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Starting from Mumbai</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">{destination.price}</span>
                    <span className="text-sm text-gray-500 ml-1">onwards</span>
                  </div>
                  <Button
                    onClick={() => handleBookNow(destination.name)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 font-semibold"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceType={selectedDestination} />
    </section>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Fuel, Settings } from "lucide-react"

const cars = [
  {
    name: "Ertiga",
    brand: "ERTIGA",
    image: "/placeholder.svg?height=200&width=300",
    passengers: 6,
    fuel: "Petrol/CNG",
    pricePerKm: "₹18",
  },
  {
    name: "Swift Dzire",
    brand: "DZIRE",
    image: "/placeholder.svg?height=200&width=300",
    passengers: 4,
    fuel: "Petrol/CNG",
    pricePerKm: "₹16",
  },
  {
    name: "Innova",
    brand: "INNOVA",
    image: "/placeholder.svg?height=200&width=300",
    passengers: 7,
    fuel: "Diesel",
    pricePerKm: "₹20",
  },
  {
    name: "Innova Crysta",
    brand: "CRYSTA",
    image: "/placeholder.svg?height=200&width=300",
    passengers: 7,
    fuel: "Diesel",
    pricePerKm: "₹22",
  },
  {
    name: "Traveller",
    brand: "TRAVELLER",
    image: "/placeholder.svg?height=200&width=300",
    passengers: 17,
    fuel: "Diesel",
    pricePerKm: "₹28",
  },
  {
    name: "Urbania",
    brand: "URBANIA",
    image: "/placeholder.svg?height=200&width=300",
    passengers: 17,
    fuel: "Diesel",
    pricePerKm: "₹34",
  },
]

export function PopularCars() {
  return (
    <section id="cars" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Explore Most Popular Cab In Thane & Mumbai
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Choose from our diverse fleet of well-maintained vehicles, perfect for every occasion and group size.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["WAGON R", "DZIRE", "HONDA", "TOYOTA", "CHEVROLET", "MUV"].map((brand) => (
            <Button
              key={brand}
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              {brand}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Car Image */}
              <div className="aspect-video overflow-hidden rounded-xl mb-4 relative bg-gray-50">
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Car Type Badge */}
              <div className="inline-block bg-primary text-white px-3 py-1 rounded-lg text-sm font-medium mb-4">
                {car.brand}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Spacious and powerful, ideal for long journeys or group travel with extra luggage.
              </p>

              {/* Specs */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Per KM</span>
                  <span className="font-semibold text-foreground">{car.pricePerKm}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Capacity</span>
                  <span className="font-semibold text-foreground">{car.passengers} Seater</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Fuel Type</span>
                  <span className="font-semibold text-foreground">{car.fuel}</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button className="block w-full bg-primary hover:bg-primary/90 text-white text-center py-3 rounded-xl font-medium transition-colors">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

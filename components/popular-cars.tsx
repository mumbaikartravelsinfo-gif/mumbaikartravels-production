import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Fuel, Settings } from "lucide-react"

const cars = [
  {
    name: "Maruti Suzuki Wagon R",
    brand: "WAGON R",
    image: "/maruti-suzuki-wagon-r-white-car-side-view.jpg",
    passengers: 4,
    fuel: "Petrol",
    transmission: "Manual",
  },
  {
    name: "Maruti Suzuki Dzire",
    brand: "DZIRE",
    image: "/maruti-suzuki-dzire-sedan-silver-car.jpg",
    passengers: 4,
    fuel: "Petrol",
    transmission: "Manual",
  },
  {
    name: "Honda City",
    brand: "HONDA",
    image: "/honda-city-sedan-blue-car-premium.jpg",
    passengers: 4,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    name: "Toyota Innova",
    brand: "TOYOTA",
    image: "/toyota-innova-crysta-mpv-white-car-family.jpg",
    passengers: 7,
    fuel: "Diesel",
    transmission: "Manual",
  },
  {
    name: "Chevrolet Tavera",
    brand: "CHEVROLET",
    image: "/placeholder.svg?height=200&width=300",
    passengers: 9,
    fuel: "Diesel",
    transmission: "Manual",
  },
  {
    name: "Mahindra Xylo",
    brand: "MUV",
    image: "/placeholder.svg?height=200&width=300",
    passengers: 8,
    fuel: "Diesel",
    transmission: "Manual",
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
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg"
            >
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {car.brand}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {car.name}
                </h3>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{car.passengers} Passengers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

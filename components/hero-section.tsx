"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Users, Phone } from "lucide-react"
import { BookingModal } from "./booking-modal"

export function HeroSection() {
  const [tripType, setTripType] = useState("outstation")
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBookingModalOpen(true)
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/mumbai-taxi-street-scene-vibrant-yellow-cab.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="text-white max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance">
              Mumbai's Premier <span className="text-primary">Taxi Service</span>
            </h1>
            <p className="text-xl mb-8 text-pretty leading-relaxed max-w-2xl mx-auto">
              Professional drivers, luxury vehicles, and unmatched reliability for all your Mumbai travel needs.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-4">Quick Booking</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <Button
                    variant={tripType === "outstation" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTripType("outstation")}
                    className="min-w-[120px]"
                  >
                    Outstation
                  </Button>
                  <Button
                    variant={tripType === "airport" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTripType("airport")}
                    className="min-w-[120px]"
                  >
                    Airport Transfer
                  </Button>
                  <Button
                    variant={tripType === "local" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTripType("local")}
                    className="min-w-[120px]"
                  >
                    Local Hire
                  </Button>
                  <Button
                    variant={tripType === "corporate" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTripType("corporate")}
                    className="min-w-[120px]"
                  >
                    Corporate
                  </Button>
                </div>
              </div>

              <form onSubmit={handleBookNow} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="pickup-location" className="flex items-center gap-2 mb-2 text-base font-medium">
                      <MapPin className="h-5 w-5 text-primary" />
                      From
                    </Label>
                    <Input id="pickup-location" placeholder="Pickup location" className="h-12" />
                  </div>
                  <div>
                    <Label htmlFor="drop-location" className="flex items-center gap-2 mb-2 text-base font-medium">
                      <MapPin className="h-5 w-5 text-accent" />
                      To
                    </Label>
                    <Input id="drop-location" placeholder="Destination" className="h-12" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="travel-date" className="flex items-center gap-2 mb-2 text-base font-medium">
                      <Calendar className="h-5 w-5 text-primary" />
                      Travel Date
                    </Label>
                    <Input id="travel-date" type="date" className="h-12" />
                  </div>
                  <div>
                    <Label htmlFor="travel-time" className="flex items-center gap-2 mb-2 text-base font-medium">
                      <Clock className="h-5 w-5 text-primary" />
                      Time
                    </Label>
                    <Input id="travel-time" type="time" className="h-12" />
                  </div>
                  <div>
                    <Label htmlFor="passengers" className="flex items-center gap-2 mb-2 text-base font-medium">
                      <Users className="h-5 w-5 text-primary" />
                      Passengers
                    </Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 People</SelectItem>
                        <SelectItem value="3-4">3-4 People</SelectItem>
                        <SelectItem value="5-7">5-7 People</SelectItem>
                        <SelectItem value="8+">8+ People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2 text-base font-medium">
                    <Phone className="h-5 w-5 text-primary" />
                    Contact Number
                  </Label>
                  <Input id="phone" type="tel" placeholder="Your mobile number" className="h-12" />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg font-semibold h-14"
                  >
                    Get Quote & Book Now
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="px-8 py-4 text-lg font-semibold h-14 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Call Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} serviceType={tripType} />
    </section>
  )
}

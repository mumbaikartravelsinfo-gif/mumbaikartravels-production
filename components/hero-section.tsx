"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Users, Phone } from "lucide-react"

export function HeroSection() {
  const [tripType, setTripType] = useState("outstation")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    travelDate: "",
    travelTime: "",
    passengers: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Submit form data to Google Sheets
      const response = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          pickupLocation: formData.pickupLocation,
          dropLocation: formData.dropLocation,
          travelDate: formData.travelDate,
          passengers: formData.passengers,
          serviceType: tripType
        })
      })

      const result = await response.json()
      
      if (result.success) {
        console.log('Booking submitted to spreadsheet successfully')
      } else {
        console.warn('Spreadsheet submission failed, but continuing with WhatsApp')
      }
    } catch (error) {
      console.error('Error submitting to spreadsheet:', error)
      // Continue with WhatsApp even if spreadsheet fails
    }
    
    // Create WhatsApp message with form data
    const message = `Hi! I would like to book a cab service.
    
*Booking Details:*
Name: ${formData.name}
Phone: ${formData.phone}
From: ${formData.pickupLocation}
To: ${formData.dropLocation}
Date: ${formData.travelDate}
Time: ${formData.travelTime}
Passengers: ${formData.passengers}
Service Type: ${tripType}

Please provide me with the quote and availability.`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/917208491468?text=${encodedMessage}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank")
  }

  const handleCallNow = () => {
    window.open("tel:+917208491468", "_self")
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/mumbai-taxi-street-scene-vibrant-yellow-cab.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-white max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
              Mumbai's Premier <span className="text-primary">Taxi Service</span>
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-pretty leading-relaxed max-w-2xl mx-auto">
              Professional drivers, luxury vehicles, and unmatched reliability for all your travel needs.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-4 sm:p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-3">Quick Booking</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <Button
                    variant={tripType === "outstation" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTripType("outstation")}
                    className="text-xs px-3 py-1"
                  >
                    Outstation
                  </Button>
                  <Button
                    variant={tripType === "airport" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTripType("airport")}
                    className="text-xs px-3 py-1"
                  >
                    Airport
                  </Button>
                  <Button
                    variant={tripType === "local" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTripType("local")}
                    className="text-xs px-3 py-1"
                  >
                    Local
                  </Button>
                  <Button
                    variant={tripType === "corporate" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTripType("corporate")}
                    className="text-xs px-3 py-1"
                  >
                    Corporate
                  </Button>
                </div>
              </div>

              <form onSubmit={handleBookNow} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-1 mb-1 text-sm font-medium">
                      <Users className="h-4 w-4 text-primary" />
                      Name *
                    </Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name" 
                      className="h-10"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-1 mb-1 text-sm font-medium">
                      <Phone className="h-4 w-4 text-primary" />
                      Phone *
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX" 
                      className="h-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="pickup-location" className="flex items-center gap-1 mb-1 text-sm font-medium">
                      <MapPin className="h-4 w-4 text-primary" />
                      From *
                    </Label>
                    <Input 
                      id="pickup-location" 
                      value={formData.pickupLocation}
                      onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                      placeholder="Pickup location" 
                      className="h-10"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="drop-location" className="flex items-center gap-1 mb-1 text-sm font-medium">
                      <MapPin className="h-4 w-4 text-accent" />
                      To *
                    </Label>
                    <Input 
                      id="drop-location" 
                      value={formData.dropLocation}
                      onChange={(e) => handleInputChange("dropLocation", e.target.value)}
                      placeholder="Destination" 
                      className="h-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="travel-date" className="flex items-center gap-1 mb-1 text-sm font-medium">
                      <Calendar className="h-4 w-4 text-primary" />
                      Date *
                    </Label>
                    <Input 
                      id="travel-date" 
                      type="date" 
                      value={formData.travelDate}
                      onChange={(e) => handleInputChange("travelDate", e.target.value)}
                      className="h-10 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="travel-time" className="flex items-center gap-1 mb-1 text-sm font-medium">
                      <Clock className="h-4 w-4 text-primary" />
                      Time
                    </Label>
                    <Input 
                      id="travel-time" 
                      type="time" 
                      value={formData.travelTime}
                      onChange={(e) => handleInputChange("travelTime", e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="passengers" className="flex items-center gap-1 mb-1 text-sm font-medium">
                      <Users className="h-4 w-4 text-primary" />
                      Passengers *
                    </Label>
                    <Select value={formData.passengers} onValueChange={(value) => handleInputChange("passengers", value)}>
                      <SelectTrigger className="h-10">
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

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-semibold h-11"
                  >
                    Get Quote on WhatsApp
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCallNow}
                    className="px-6 py-3 text-base font-semibold h-11 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Call Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

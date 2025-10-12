"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { MapPin, Calendar, Users, Phone } from "lucide-react"
import { SwapButton } from "./swap-button"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  serviceType?: string
  selectedDestination?: string
  selectedSource?: string
  selectedCar?: string
}

export function BookingModal({ isOpen, onClose, serviceType, selectedDestination, selectedSource, selectedCar }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    travelDate: "",
    passengers: "",
    carType: "",
  })

  // Pre-fill destination and source when provided (but NOT for car rentals)
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        dropLocation: serviceType === "car rental" ? "" : (selectedDestination || prev.dropLocation),
        pickupLocation: selectedSource || prev.pickupLocation,
        carType: selectedCar || prev.carType
      }))
    }
  }, [selectedDestination, selectedSource, selectedCar, serviceType, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
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
          carType: formData.carType,
          serviceType: serviceType
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
Passengers: ${formData.passengers}
${formData.carType ? `Car Type: ${formData.carType}` : ""}
${serviceType ? `Service Type: ${serviceType}` : ""}

Please provide me with the quote and availability.`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/917208491468?text=${encodedMessage}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank")
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSwap = () => {
    setFormData((prev) => ({
      ...prev,
      pickupLocation: prev.dropLocation,
      dropLocation: prev.pickupLocation
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Quick Booking</DialogTitle>
          <DialogDescription>
            {serviceType ? `Book ${serviceType} service` : "Get instant quote for your trip"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="name" className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-primary" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Label htmlFor="pickup" className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  From *
                </Label>
                <Input
                  id="pickup"
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                  placeholder="Pickup location"
                  required
                />
              </div>
              
              {/* Swap Button */}
              <div className="pb-1">
                <SwapButton onSwap={handleSwap} />
              </div>
              
              <div className="flex-1">
                <Label htmlFor="drop" className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  To *
                </Label>
                <Input
                  id="drop"
                  value={formData.dropLocation}
                  onChange={(e) => handleInputChange("dropLocation", e.target.value)}
                  placeholder="Destination"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                Travel Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.travelDate}
                onChange={(e) => handleInputChange("travelDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="passengers" className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-primary" />
                Passengers *
              </Label>
              <Select value={formData.passengers} onValueChange={(value) => handleInputChange("passengers", value)}>
                <SelectTrigger>
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

          {/* Car Type Field - Only show if a car was selected */}
          {selectedCar && (
            <div>
              <Label htmlFor="carType" className="flex items-center gap-2 mb-2">
                Selected Car
              </Label>
              <Input
                id="carType"
                value={formData.carType}
                onChange={(e) => handleInputChange("carType", e.target.value)}
                placeholder="Car type"
                readOnly
                className="bg-gray-50"
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold"
            >
              Get Quote on WhatsApp
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-3 font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Cancel
            </Button>
          </div>

          {/* Direct Contact Options */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 text-center">Or contact us directly:</p>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => window.open("https://wa.me/917208491468", "_blank")}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 font-semibold"
              >
                WhatsApp Chat
              </Button>
              <Button
                type="button"
                onClick={() => window.open("tel:+917208491468", "_self")}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 font-semibold"
              >
                Call Now
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

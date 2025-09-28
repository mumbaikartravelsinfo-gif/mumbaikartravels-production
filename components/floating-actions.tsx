"use client"

import { MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingActions() {
  const phoneNumber = "917208491468"

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in your cab services. Please provide me with more details."
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  const handleCallClick = () => {
    window.open(`tel:+${phoneNumber}`, "_self")
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50 md:bottom-6 md:right-6">
      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-pulse hover:animate-none"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
      </Button>

      {/* Call Button */}
      <Button
        onClick={handleCallClick}
        className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Call us now"
      >
        <Phone className="h-7 w-7 group-hover:scale-110 transition-transform" />
      </Button>
    </div>
  )
}

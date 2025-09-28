"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail, MapPin } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 72084 91468</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@mumbaikartravels.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Mumbai, Maharashtra 400701</span>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="hidden md:inline-flex">
            {"Let's Ride Now"}
          </Button>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Mumbai Kar Travels</h1>
              <p className="text-sm text-muted-foreground">Premium Travel Services</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-foreground hover:text-primary font-medium">
              Home
            </a>
            <a href="/about" className="text-foreground hover:text-primary font-medium">
              About Us
            </a>
            <a href="/services" className="text-foreground hover:text-primary font-medium">
              Services
            </a>
            <a href="/destinations" className="text-foreground hover:text-primary font-medium">
              Destinations
            </a>
            <a href="/services#cars" className="text-foreground hover:text-primary font-medium">
              Fleet
            </a>
            <a href="/wordpress" className="text-foreground hover:text-primary font-medium">
              WordPress
            </a>
            <a href="#contact" className="text-foreground hover:text-primary font-medium">
              Contact Us
            </a>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col gap-4 pt-4">
              <a href="/" className="text-foreground hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
              <a href="/about" className="text-foreground hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                About Us
              </a>
              <a href="/services" className="text-foreground hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                Services
              </a>
              <a href="/destinations" className="text-foreground hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                Destinations
              </a>
              <a href="/services#cars" className="text-foreground hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                Fleet
              </a>
              <a href="/wordpress" className="text-foreground hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                WordPress
              </a>
              <a href="#contact" className="text-foreground hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

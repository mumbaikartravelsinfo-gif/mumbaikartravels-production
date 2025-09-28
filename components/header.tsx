"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react"
import { BookingModal } from "./booking-modal"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState("")
  const [selectedSource, setSelectedSource] = useState("")
  const [activeDropdown, setActiveDropdown] = useState("")
  const [mobileDropdowns, setMobileDropdowns] = useState({
    sightseeing: false,
    pilgrimage: false,
    daily: false
  })
  const headerRef = useRef<HTMLElement>(null)

  const handleDestinationClick = (destination: string, isDailyService: boolean = false) => {
    if (isDailyService && destination.includes('-')) {
      // Split daily service destinations like "MUMBAI-NASHIK"
      const [source, dest] = destination.split('-').map(s => s.trim())
      setSelectedSource(source)
      setSelectedDestination(dest)
    } else {
      setSelectedDestination(destination)
      setSelectedSource("")
    }
    setIsBookingModalOpen(true)
    setActiveDropdown("")
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMobileDropdown = (section: 'sightseeing' | 'pilgrimage' | 'daily') => {
    setMobileDropdowns(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const destinations = {
    sightseeing: ["MUMBAI", "NASHIK", "LONAVALA", "MAHABALESHWAR"],
    pilgrimage: ["SHIRDI SAI BABA", "PANDHARPUR", "SHANI-SHINGNAPUR", "TRAYAMBAKESHWER", "ASHTVINAYAK DARSHAN"],
    daily: ["MUMBAI-NASHIK", "MUMBAI-PUNE", "MUMBAI-GUJRAT", "MUMBAI-MAHAD", "MUMBAI-LONAVALA"]
  }

  return (
    <header ref={headerRef} className="bg-white shadow-sm sticky top-0 z-50">
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
            <a href="/about" className="round hover:text-primary font-medium">
              About Us
            </a>
            <a href="/#cars" className="text-foreground hover:text-primary font-medium">
              Services
            </a>
            
            {/* Sightseeing Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "sightseeing" ? "" : "sightseeing")}
                className="flex items-center gap-1 text-foreground hover:text-primary font-medium"
              >
                Sightseeing <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === "sightseeing" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {destinations.sightseeing.map((dest) => (
                    <button
                      key={dest}
                      onClick={() => handleDestinationClick(dest)}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary"
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pilgrimage Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "pilgrimage" ? "" : "pilgrimage")}
                className="flex items-center gap-1 text-foreground hover:text-primary font-medium"
              >
                Pilgrimage <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === "pilgrimage" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {destinations.pilgrimage.map((dest) => (
                    <button
                      key={dest}
                      onClick={() => handleDestinationClick(dest)}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary"
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Daily Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "daily" ? "" : "daily")}
                className="flex items-center gap-1 text-foreground hover:text-primary font-medium"
              >
                Daily Services <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === "daily" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {destinations.daily.map((dest) => (
                    <button
                      key={dest}
                      onClick={() => handleDestinationClick(dest, true)}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary"
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="/#cars" className="text-foreground hover:text-primary font-medium">
              Fleet
            </a>
            <a href="/wordpress" className="text-foreground hover:text-primary font-medium">
              WordPress
            </a>
            <button
              onClick={() => handleDestinationClick("Contact Us")}
              className="text-foreground hover:text-primary font-medium"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col gap-3 pt-4">
              <a href="/" className="text-foreground hover:text-primary font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
              <a href="/about" className="text-foreground hover:text-primary font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                About Us
              </a>
              <a href="/services" className="text-foreground hover:text-primary font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Services
              </a>
              
              {/* Sightseeing Mobile Dropdown */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleMobileDropdown('sightseeing')}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 text-foreground hover:bg-primary/10 transition-colors"
                >
                  <span className="font-medium">Sightseeing</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdowns.sightseeing ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.sightseeing && (
                  <div className="bg-white border-t border-gray-200">
                    {destinations.sightseeing.map((dest) => (
                      <button
                        key={dest}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          setMobileDropdowns({sightseeing: false, pilgrimage: false, daily: false});
                          handleDestinationClick(dest);
                        }}
                        className="block w-full text-left p-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary border-b border-gray-100 last:border-b-0"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Pilgrimage Mobile Dropdown */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleMobileDropdown('pilgrimage')}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 text-foreground hover:bg-primary/10 transition-colors"
                >
                  <span className="font-medium">Pilgrimage Tours</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdowns.pilgrimage ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.pilgrimage && (
                  <div className="bg-white border-t border-gray-200">
                    {destinations.pilgrimage.map((dest) => (
                      <button
                        key={dest}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          setMobileDropdowns({sightseeing: false, pilgrimage: false, daily: false});
                          handleDestinationClick(dest);
                        }}
                        className="block w-full text-left p-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary border-b border-gray-100 last:border-b-0"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Daily Services Mobile Dropdown */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleMobileDropdown('daily')}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 text-foreground hover:bg-primary/10 transition-colors"
                >
                  <span className="font-medium">Daily Services</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdowns.daily ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.daily && (
                  <div className="bg-white border-t border-gray-200">
                    {destinations.daily.map((dest) => (
                      <button
                        key={dest}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          setMobileDropdowns({sightseeing: false, pilgrimage: false, daily: false});
                          handleDestinationClick(dest, true);
                        }}
                        className="block w-full text-left p-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary border-b border-gray-100 last:border-b-0"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <a href="/#cars" className="text-foreground hover:text-primary font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Fleet
              </a>
              <a href="/wordpress" className="text-foreground hover:text-primary font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                WordPress
              </a>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleDestinationClick("Contact Us");
                }}
                className="text-left text-foreground hover:text-primary font-medium py-2"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        serviceType="destination"
        selectedDestination={selectedDestination}
        selectedSource={selectedSource}
      />
    </header>
  )
}

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
    <header ref={headerRef} className="bg-primary text-primary-foreground shadow-sm sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-black text-[#ff3131] py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 72084 91468</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>mumbaikartravelsinfo@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/mumbai-kar-travels-logo.png" 
              alt="Mumbaikar Travels Logo" 
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>

          {/* Centered Company Name */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <h1 className="text-2xl font-bold text-white whitespace-nowrap">
              Mumbaikar
              <br />
              <span className="text-base font-normal">Travels</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-foreground hover:text-primary-foreground/80 font-medium">
              Home
            </a>
            <a href="/about" className="text-foreground hover:text-primary-foreground/80 font-medium">
              About Us
            </a>
            <a href="/#cars" className="text-foreground hover:text-primary-foreground/80 font-medium">
              Services
            </a>
            
            {/* Sightseeing Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "sightseeing" ? "" : "sightseeing")}
                className="flex items-center gap-1 text-foreground hover:text-primary-foreground font-medium"
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
                className="flex items-center gap-1 text-foreground hover:text-primary-foreground font-medium"
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
                className="flex items-center gap-1 text-foreground hover:text-primary-foreground font-medium"
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

            <a href="/#cars" className="text-foreground hover:text-primary-foreground font-medium">
              Fleet
            </a>
            <a href="/wordpress" className="text-foreground hover:text-primary-foreground font-medium">
              WordPress
            </a>
          </div>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden p-2 hover:bg-white/10 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 px-4 pb-6 border-t border-white/20">
            <div className="flex flex-col gap-4 pt-6">
              <a 
                href="/" 
                className="text-white hover:text-white/80 font-medium py-3 px-3 rounded-lg hover:bg-white/10 transition-all" 
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/about" 
                className="text-white hover:text-white/80 font-medium py-3 px-3 rounded-lg hover:bg-white/10 transition-all" 
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a 
                href="/services" 
                className="text-white hover:text-white/80 font-medium py-3 px-3 rounded-lg hover:bg-white/10 transition-all" 
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              
              {/* Sightseeing Mobile Dropdown */}
              <div className="border border-white/30 rounded-xl overflow-hidden bg-white/10 shadow-lg">
                <button
                  onClick={() => toggleMobileDropdown('sightseeing')}
                  className="w-full flex items-center justify-between p-4 text-white hover:bg-white/15 transition-colors"
                >
                  <span className="font-medium text-base">Sightseeing</span>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${mobileDropdowns.sightseeing ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.sightseeing && (
                  <div className="bg-white/15 border-t border-white/20">
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
                        className="block w-full text-left p-4 text-sm text-white hover:bg-white/20 border-b border-white/10 last:border-b-0 transition-colors"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Pilgrimage Mobile Dropdown */}
              <div className="border border-white/30 rounded-xl overflow-hidden bg-white/10 shadow-lg">
                <button
                  onClick={() => toggleMobileDropdown('pilgrimage')}
                  className="w-full flex items-center justify-between p-4 text-white hover:bg-white/15 transition-colors"
                >
                  <span className="font-medium text-base">Pilgrimage Tours</span>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${mobileDropdowns.pilgrimage ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.pilgrimage && (
                  <div className="bg-white/15 border-t border-white/20">
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
                        className="block w-full text-left p-4 text-sm text-white hover:bg-white/20 border-b border-white/10 last:border-b-0 transition-colors"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Daily Services Mobile Dropdown */}
              <div className="border border-white/30 rounded-xl overflow-hidden bg-white/10 shadow-lg">
                <button
                  onClick={() => toggleMobileDropdown('daily')}
                  className="w-full flex items-center justify-between p-4 text-white hover:bg-white/15 transition-colors"
                >
                  <span className="font-medium text-base">Daily Services</span>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${mobileDropdowns.daily ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.daily && (
                  <div className="bg-white/15 border-t border-white/20">
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
                        className="block w-full text-left p-4 text-sm text-white hover:bg-white/20 border-b border-white/10 last:border-b-0 transition-colors"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <a 
                href="/#cars" 
                className="text-white hover:text-white/80 font-medium py-3 px-3 rounded-lg hover:bg-white/10 transition-all" 
                onClick={() => setIsMenuOpen(false)}
              >
                Fleet
              </a>
              <a 
                href="/wordpress" 
                className="text-white hover:text-white/80 font-medium py-3 px-3 rounded-lg hover:bg-white/10 transition-all" 
                onClick={() => setIsMenuOpen(false)}
              >
                WordPress
              </a>
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

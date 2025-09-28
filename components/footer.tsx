import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Mumbai Kar Travels</h3>
                <p className="text-sm text-background/70">Premium Travel Services</p>
              </div>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              Your trusted partner for comfortable, safe, and reliable transportation services in Mumbai and beyond.
            </p>
            <div className="flex gap-4">
              <Button
                size="sm"
                variant="outline"
                className="border-background/20 text-background hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-background/20 text-background hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-background/20 text-background hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-background/20 text-background hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <div className="space-y-3">
              <a href="#home" className="block text-background/80 hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="block text-background/80 hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#services" className="block text-background/80 hover:text-primary transition-colors">
                Services
              </a>
              <a href="#cars" className="block text-background/80 hover:text-primary transition-colors">
                Our Fleet
              </a>
              <a href="#gallery" className="block text-background/80 hover:text-primary transition-colors">
                Gallery
              </a>
              <a href="#contact" className="block text-background/80 hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <div className="space-y-3">
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Airport Transfer
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Outstation Trips
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Local Sightseeing
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Corporate Travel
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Wedding Cars
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                24/7 Service
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-background/80">+91 72084 91468</p>
                
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-background/80">info@mumbaikartravels.com</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-background/80">Mumbai, Maharashtra 400701</p>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/70">
            © 2025 Mumbai Kar Travels. All rights reserved. | Privacy Policy | Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
  )
}

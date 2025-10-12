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
            <div className="flex items-center justify-center gap-2 mb-2">
              <img 
                src="/mumbaikar-logo-footer.png" 
                alt="Mumbaikar Travels Logo" 
                className="h-36 w-auto object-contain"
              />
            </div>
            <p className="text-background/80 mb-6 leading-relaxed text-justify">
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
                <p className="text-background/80">mumbaikartravelsinfo@gmail.com</p>
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
            © 2025 Mumbaikar Travels. All rights reserved. | Privacy Policy | Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
  )
}

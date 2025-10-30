import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, CheckCircle, MapPin } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src="/mumbai-kar-travels-logo.png" alt="Professional taxi service" className="rounded-2xl shadow-2xl" />
            {/* <Card className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">5+</div>
                <div className="text-sm">Years Experience</div>
              </CardContent>
            </Card> */}
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              About Our Company
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Best Taxi Service In Thane & Mumbai With Affordable Prices
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We, Mumbaikar Travels situated at Mumbai, Navi Mumbai, Maharashtra, are a leading service provider of a
              wide range of Cars on hire. We have well maintained & luxurious cars which help to make your travel
              comfortable and amazing. We are passionate & professional at the same time which help you to get the best
              service from us. We are committed to serve our clients in the best way and have solutions.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Professional and experienced drivers</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Well-maintained and luxurious vehicles</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">24/7 customer support and assistance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Transparent pricing with no hidden charges</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Discover More →
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground p-3 rounded-full">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Call us now</div>
                  <div className="font-bold text-foreground">+91- 72084 91468</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Location Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              Our Location
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Visit Us Today
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Find us easily and plan your visit. We're conveniently located to serve you better.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 relative group cursor-pointer">
            <a
              href="https://maps.app.goo.gl/zFZyrwEtT4C9TJ5TA?g_st=awb"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              aria-label="Open Mumbaikar Travels location in Google Maps"
            ></a>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.659182567526!2d73.11790479999999!3d18.990653400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x81d85a8ef44f4fe9%3A0xcf29b950543cb2c0!2sMumbaikar%20travels!5e0!3m2!1sen!2sin!4v1761822284608!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mumbaikar Travels Location - C/105, Naya Nagar, Panvel, Navi Mumbai"
              className="pointer-events-none"
            ></iframe>
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none"></div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://maps.app.goo.gl/zFZyrwEtT4C9TJ5TA?g_st=awb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <MapPin className="h-5 w-5" />
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, CheckCircle } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src="/professional-taxi-driver-smiling-uniform-mumbai-ca.jpg" alt="Professional taxi service" className="rounded-2xl shadow-2xl" />
            <Card className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">5+</div>
                <div className="text-sm">Years Experience</div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              About Our Company
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Best Taxi Service In Thane & Mumbai With Affordable Prices
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We, Mumbai Kar Travels situated at Mumbai, Navi Mumbai, Maharashtra, are a leading service provider of a
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
                  <div className="font-bold text-foreground">+91-98824 56440</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

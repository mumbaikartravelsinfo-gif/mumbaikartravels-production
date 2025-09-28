import { MapPin, CreditCard, Car } from "lucide-react"

const steps = [
  {
    icon: MapPin,
    title: "Safe Guarantee",
    description:
      "Your safety is our top priority with verified drivers, GPS tracking, and 24/7 customer support for peace of mind.",
  },
  {
    icon: CreditCard,
    title: "Fastest Pickups",
    description:
      "Quick response times with our efficient dispatch system ensuring your cab arrives within minutes of booking.",
  },
  {
    icon: Car,
    title: "Quick Rides",
    description:
      "Smooth and comfortable rides with well-maintained vehicles and experienced drivers who know the best routes.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Our Working Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">How It Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="bg-primary text-primary-foreground w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-background">{step.title}</h3>
              <p className="text-background/80 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

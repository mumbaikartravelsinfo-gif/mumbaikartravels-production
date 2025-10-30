"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const reviews = [
  {
    name: "Karuna Kamble",
    location: "Local Guide",
    rating: 5,
    comment: "Conformable car. Cooperative person. Very nicely drive.",
    date: "5 days ago",
    avatar: "KK",
  },
  {
    name: "Kishan Sheregar",
    location: "8 reviews",
    rating: 5,
    comment: "Excellent Cab services we went from kalyan to Lonavala with my family. The car was clean, and the driver was experienced and courteous. I appreciate the quality of service provided. I'm satisfied with the overall experience and would recommend this rental service to others.",
    date: "2 weeks ago",
    avatar: "KS",
  },
  {
    name: "Swaraj Batawale",
    location: "2 reviews",
    rating: 5,
    comment: "Gem of a person!! New cars and comfortable ride!! The behaviour and service is top notch, 100% recommend with affordable pricing and flexible timing. 👍👌",
    date: "4 days ago",
    avatar: "SB",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 fill-current" />
            Customer Reviews
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Mumbai Kar Travels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg relative overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
                  <Quote className="h-12 w-12 fill-current" />
                </div>

                {/* Avatar and Info */}
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                  "{review.comment}"
                </p>

                {/* Date */}
                <p className="text-xs text-muted-foreground/70">{review.date}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 pointer-events-none"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        
      </div>
    </section>
  )
}

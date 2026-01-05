"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { getRecentReviews, getAverageRating } from "@/lib/data/reviews"

export function ReviewsSection() {
  const reviews = getRecentReviews(6)
  const averageRating = getAverageRating()

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Отзывы</span>
            <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">Что говорят покупатели</h2>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${star <= Math.round(averageRating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">из 5</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id} className="border-0 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{review.text}</p>

                {review.productName && (
                  <div className="mt-4 inline-flex rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {review.productName}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

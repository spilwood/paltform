"use client"

import { useState } from "react"
import { Star, Camera, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface AddReviewSheetProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  onSubmit: (review: { rating: number; text: string; photos: string[] }) => void
}

export function AddReviewSheet({ isOpen, onClose, productName, onSubmit }: AddReviewSheetProps) {
  const [rating, setRating] = useState(5)
  const [text, setText] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhotoAdd = () => {
    // Simulate adding a photo
    const mockPhoto = `/placeholder.svg?height=200&width=200&query=user photo wood slice ${photos.length + 1}`
    setPhotos((prev) => [...prev, mockPhoto])
  }

  const handleSubmit = async () => {
    if (text.trim().length < 10) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSubmit({ rating, text, photos })
    setIsSubmitting(false)
    setText("")
    setPhotos([])
    setRating(5)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
        <SheetHeader className="pb-4">
          <SheetTitle>Оставить отзыв</SheetTitle>
          <p className="text-sm text-muted-foreground">{productName}</p>
        </SheetHeader>

        <div className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Ваша оценка</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="p-1 transition-transform active:scale-90">
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Ваш отзыв</p>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Расскажите о качестве товара, соответствии описанию..."
              className="min-h-[120px] rounded-xl resize-none"
            />
            <p className="text-xs text-muted-foreground">Минимум 10 символов</p>
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Фото (необязательно)</p>
            <div className="flex gap-2 flex-wrap">
              {photos.map((photo, index) => (
                <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <img src={photo || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-background/80 flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {photos.length < 5 && (
                <button
                  onClick={handlePhotoAdd}
                  className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
                >
                  <Camera className="h-5 w-5 text-muted-foreground" />
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">+50 бонусов за отзыв с фото</p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={text.trim().length < 10 || isSubmitting}
            className="w-full h-12 rounded-xl"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Отправка...
              </span>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Отправить отзыв
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

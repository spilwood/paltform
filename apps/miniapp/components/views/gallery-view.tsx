"use client"

import { useState } from "react"
import { ChevronLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryItem {
  id: string
  image: string
  title: string
  description: string
  likes: number
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    image: "/wood-slice-table-centerpiece-with-candles.jpg",
    title: "Центр стола со свечами",
    description: "Спил березы 30см в качестве подставки для свечей",
    likes: 124,
  },
  {
    id: "2",
    image: "/rustic-wedding-decor-wood-slices.jpg",
    title: "Свадебный декор",
    description: "Набор спилов для рустикальной свадьбы",
    likes: 256,
  },
  {
    id: "3",
    image: "/wood-slice-wall-art-arrangement.jpg",
    title: "Панно на стену",
    description: "Композиция из 12 спилов разного размера",
    likes: 189,
  },
  {
    id: "4",
    image: "/wood-stump-plant-stand-interior.jpg",
    title: "Подставка для растений",
    description: "Пенек-подставка в современном интерьере",
    likes: 145,
  },
  {
    id: "5",
    image: "/christmas-ornaments-wood-slices-painted.jpg",
    title: "Новогодние украшения",
    description: "Расписные мини-спилы на елку",
    likes: 312,
  },
  {
    id: "6",
    image: "/wood-slice-coasters-set.jpg",
    title: "Набор подставок",
    description: "Подставки под горячее из спилов дуба",
    likes: 98,
  },
]

interface GalleryViewProps {
  onBack: () => void
}

export function GalleryView({ onBack }: GalleryViewProps) {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

  const toggleLike = (id: string) => {
    setLikedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10 rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Галерея работ</h1>
            <p className="text-xs text-muted-foreground">Идеи от наших клиентов</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-3">
          {galleryItems.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl overflow-hidden border border-border">
              <div className="aspect-square relative">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => toggleLike(item.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      likedItems.has(item.id) ? "fill-red-500 text-red-500" : "text-foreground"
                    }`}
                  />
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-foreground line-clamp-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Heart className="h-3 w-3" />
                  <span>{item.likes + (likedItems.has(item.id) ? 1 : 0)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

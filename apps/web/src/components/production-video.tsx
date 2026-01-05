"use client"

import { useState } from "react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Play } from "lucide-react"
import Image from "next/image"

interface ProductionVideoProps {
  videoId?: string
  thumbnailUrl?: string
  title?: string
}

export function ProductionVideo({
  videoId = "dQw4w9WgXcQ", // Replace with actual video ID
  thumbnailUrl = "/production-video-thumbnail.jpg",
  title = "Как мы делаем спилы",
}: ProductionVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="overflow-hidden rounded-lg">
      <AspectRatio ratio={16 / 9}>
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="group relative h-full w-full"
            aria-label={`Воспроизвести видео: ${title}`}
          >
            <Image
              src={thumbnailUrl || "/placeholder.svg?height=720&width=1280&query=wood workshop production video"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform group-hover:scale-110">
                <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-lg font-medium text-white drop-shadow-lg">{title}</p>
              <p className="text-sm text-white/80">Нажмите для просмотра</p>
            </div>
          </button>
        )}
      </AspectRatio>
    </div>
  )
}

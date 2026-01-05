"use client"

import { useRef, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import type { BlogPost } from "@/lib/data/blog"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (videoRef.current && post.video) {
      playPromiseRef.current = videoRef.current.play()
      playPromiseRef.current.catch(() => {
        // Ignore AbortError when play is interrupted
      })
    }
  }, [post.video])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (videoRef.current && post.video) {
      const pauseVideo = () => {
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      }

      if (playPromiseRef.current) {
        playPromiseRef.current.then(pauseVideo).catch(() => {
          // If play failed, still try to reset
          pauseVideo()
        })
      } else {
        pauseVideo()
      }
    }
  }, [post.video])

  return (
    <Link href={`/blog/${post.slug}`} className="group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Card className="overflow-hidden border-0 bg-transparent shadow-none">
        <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg bg-muted">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              post.video && isHovered ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {post.video && (
            <video
              ref={videoRef}
              src={post.video}
              poster={post.image || "/video-poster-wooden-workshop.jpg"}
              muted
              loop
              playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </AspectRatio>
        <CardContent className="px-0 pt-4">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs font-normal">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{post.readTime} мин</span>
          </div>
          <div className="mt-3 flex items-start justify-between gap-4">
            <h3 className="text-lg font-medium leading-snug transition-colors group-hover:text-primary">
              {post.title}
            </h3>
            <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
          <p className="mt-4 text-xs text-muted-foreground">{formattedDate}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

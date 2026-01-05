"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import type { Product } from "@/lib/data/products"
import { useState, useCallback, memo } from "react"
import { CompareButton } from "./compare-button"
import { FavoriteButton } from "./favorite-button"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])

  const images = product.images && product.images.length > 0 ? product.images : ["/wood-slice-natural-texture.jpg"]
  const hasMultipleImages = images.length > 1

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasMultipleImages) return

      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const segmentWidth = rect.width / images.length
      const newIndex = Math.min(Math.floor(x / segmentWidth), images.length - 1)

      setActiveImageIndex((prev) => (prev !== newIndex ? newIndex : prev))
    },
    [hasMultipleImages, images.length],
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setActiveImageIndex(0)
  }, [])

  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }, [])

  return (
    <Card className="group overflow-hidden border-0 bg-transparent shadow-none">
      <Link href={`/spily/${product.category}/${product.slug}`}>
        <AspectRatio
          ratio={1}
          className="relative overflow-hidden rounded-lg bg-muted"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {hasMultipleImages && (
            <div className="absolute left-0 right-0 top-0 z-20 flex gap-0.5 px-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {images.map((_, index) => (
                <div key={index} className="relative h-1 flex-1 overflow-hidden">
                  {/* Background track */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                  {/* Active indicator */}
                  <div
                    className={`absolute inset-0 bg-white transition-transform duration-200 ease-out ${
                      index === activeImageIndex
                        ? "translate-x-0"
                        : index < activeImageIndex
                          ? "translate-x-0 bg-white/60"
                          : "-translate-x-full"
                    }`}
                  />
                </div>
              ))}
            </div>
          )}

          {hasMultipleImages && isHovered && (
            <div className="absolute inset-0 z-10 flex">
              {images.map((_, index) => (
                <div key={index} className="flex-1 cursor-pointer" onMouseEnter={() => setActiveImageIndex(index)} />
              ))}
            </div>
          )}

          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === activeImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Skeleton placeholder while loading */}
              {!imagesLoaded[index] && <div className="absolute inset-0 animate-pulse bg-muted" />}
              <Image
                src={image || "/placeholder.svg"}
                alt={index === 0 ? product.name : `${product.name} - фото ${index + 1}`}
                fill
                className={`object-cover transition-all duration-500 ${
                  imagesLoaded[index] ? "opacity-100 scale-100" : "opacity-0 scale-105"
                } ${isHovered ? "scale-105" : "scale-100"}`}
                loading={priority ? "eager" : "lazy"}
                priority={priority && index === 0}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onLoad={() => handleImageLoad(index)}
              />
            </div>
          ))}

          {!product.inStock && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <Badge variant="secondary" className="text-xs uppercase tracking-widest">
                Нет в наличии
              </Badge>
            </div>
          )}

          <div className="absolute bottom-2 right-2 z-20 flex gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
            <FavoriteButton product={product} />
            <CompareButton product={product} />
          </div>

          {product.inStock && (
            <Badge className="absolute left-2 top-2 z-20 bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
              В наличии
            </Badge>
          )}
        </AspectRatio>
      </Link>
      <CardContent className="px-0 pt-4">
        <Link href={`/spily/${product.category}/${product.slug}`}>
          <h3 className="font-medium transition-colors group-hover:text-primary">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
          <span>⌀ {product.diameter} см</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{product.thickness} см</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold">{product.price} ₽</span>
          {hasMultipleImages && <span className="text-xs text-muted-foreground">{images.length} фото</span>}
        </div>
      </CardContent>
    </Card>
  )
})

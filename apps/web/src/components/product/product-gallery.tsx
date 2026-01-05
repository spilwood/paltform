"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const displayImages = images.length > 0 ? images : ["/wood-slice-natural-texture.jpg"]

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 4))
  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1))
    if (zoomLevel <= 1.5) setPosition({ x: 0, y: 0 })
  }
  const handleResetZoom = () => {
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
    }
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && zoomLevel > 1) {
        setPosition({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        })
      }
    },
    [isDragging, zoomLevel],
  )

  const handleMouseUp = () => setIsDragging(false)

  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % displayImages.length)
  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isZoomOpen) {
        if (e.key === "ArrowRight") nextImage()
        if (e.key === "ArrowLeft") prevImage()
        if (e.key === "Escape") setIsZoomOpen(false)
        if (e.key === "+" || e.key === "=") handleZoomIn()
        if (e.key === "-") handleZoomOut()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isZoomOpen])

  return (
    <>
      <div className="space-y-4">
        <div className="relative group">
          <div className="aspect-square overflow-hidden rounded-xl bg-muted">
            <Image
              src={displayImages[selectedIndex] || "/placeholder.svg"}
              alt={productName}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={selectedIndex === 0}
            />
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsZoomOpen(true)}
            aria-label="Увеличить изображение"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          {displayImages.length > 1 && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm"
              onClick={() => setSelectedIndex((prev) => (prev + 1) % displayImages.length)}
              aria-label="Следующее изображение"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {displayImages.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "aspect-square overflow-hidden rounded-lg bg-muted transition-all duration-200 relative",
                  selectedIndex === index
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "opacity-70 hover:opacity-100 hover:ring-1 hover:ring-border",
                )}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${productName} - изображение ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-background/95 backdrop-blur-md border-0">
          <DialogTitle className="sr-only">Просмотр изображения: {productName}</DialogTitle>
          {/* Controls */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={zoomLevel <= 1}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[3rem] text-center">{Math.round(zoomLevel * 100)}%</span>
            <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={zoomLevel >= 4}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-border mx-2" />
            <Button variant="ghost" size="icon" onClick={handleResetZoom}>
              <span className="text-xs">1:1</span>
            </Button>
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-background/90 backdrop-blur-sm rounded-full"
            onClick={() => setIsZoomOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Navigation buttons */}
          {displayImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-background/90 backdrop-blur-sm rounded-full h-12 w-12"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-background/90 backdrop-blur-sm rounded-full h-12 w-12"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Image */}
          <div
            ref={imageRef}
            className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="relative transition-transform duration-100"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
              }}
            >
              <Image
                src={displayImages[selectedIndex] || "/placeholder.svg"}
                alt={productName}
                width={1200}
                height={1200}
                className="max-w-[80vw] max-h-[80vh] object-contain select-none"
                draggable={false}
                priority
              />
            </div>
          </div>

          {/* Thumbnails */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/90 backdrop-blur-sm rounded-lg p-2">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "w-12 h-12 rounded overflow-hidden transition-all relative",
                    selectedIndex === index ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100",
                  )}
                >
                  <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover" sizes="48px" />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

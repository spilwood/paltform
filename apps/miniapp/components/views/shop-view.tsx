"use client"

import type React from "react"

import { useState, useMemo, useEffect, useRef } from "react"
import { Search, Plus, ChevronLeft, ChevronRight, Star, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { getAllProducts, categories, getFlashSaleInfo, getRelatedProducts } from "@/lib/products"
import { useCart, type Product } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShareProduct } from "@/components/share-product"
import { AddReviewSheet } from "@/components/add-review-sheet"

type SortType = "default" | "price-asc" | "price-desc" | "popular" | "newest"

export function ShopView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<SortType>("default")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 })
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const startY = useRef(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { addItem, addViewedProduct, viewedProducts, triggerFlyAnimation } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (searchQuery.length > 1) {
      const suggestions = getAllProducts()
        .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((p) => p.name)
        .slice(0, 5)
      setSearchSuggestions(suggestions)
      setShowSuggestions(suggestions.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery])

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = getAllProducts()
        .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const allProducts = getAllProducts()

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === "all" || product.category === activeCategory
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      return matchesSearch && matchesCategory && matchesPrice
    })

    switch (sortBy) {
      case "popular":
        result = result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        break
      case "price-asc":
        result = result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result = result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result = result.sort((a, b) => new Date(b.addedDate || 0).getTime() - new Date(a.addedDate || 0).getTime())
        break
    }

    return result
  }, [searchQuery, activeCategory, sortBy, priceRange])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0) {
      startY.current = e.touches[0].clientY
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0) {
      const currentY = e.touches[0].clientY
      const distance = currentY - startY.current
      if (distance > 0 && distance < 120) {
        setPullDistance(distance)
        setIsPulling(true)
      }
    }
  }

  const handleTouchEnd = () => {
    if (pullDistance > 80) {
      refreshProducts()
    }
    setPullDistance(0)
    setIsPulling(false)
  }

  const refreshProducts = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation()
    addItem(product)

    if (e) {
      const rect = (e.target as HTMLElement).getBoundingClientRect()
      triggerFlyAnimation(rect.left + rect.width / 2, rect.top + rect.height / 2)
    }

    if (typeof window !== "undefined" && (window as any).Telegram?.WebApp) {
      ;(window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light")
    }
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    addViewedProduct(product)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
  }

  const flashSaleProductsList = allProducts.filter((p) => getFlashSaleInfo(p.id))

  return (
    <div
      ref={scrollContainerRef}
      className="flex flex-col h-full overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {isPulling && (
        <div className="flex justify-center py-2 transition-opacity" style={{ opacity: pullDistance / 80 }}>
          <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <h1 className="text-lg font-semibold text-foreground">Spilwood</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-10 w-10 rounded-full"
          >
            <div
              className={`h-5 w-5 border-2 border-current border-t-transparent rounded-full ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-10 pr-24 h-11 rounded-xl bg-muted border-0 text-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setShowFilters(true)} className="h-8 px-3 text-xs">
              Фильтры
            </Button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowSuggestions(false)} />
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-40 overflow-hidden">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product)
                      setShowSuggestions(false)
                      setSearchQuery(product.name)
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-primary">{product.price} ₽</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 mb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[36px] ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortType)}>
            <SelectTrigger className="h-9 w-[160px] rounded-lg text-xs">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">По умолчанию</SelectItem>
              <SelectItem value="price-asc">Цена: возр.</SelectItem>
              <SelectItem value="price-desc">Цена: убыв.</SelectItem>
              <SelectItem value="popular">Популярные</SelectItem>
              <SelectItem value="newest">Новинки</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="p-4">
        {flashSaleProductsList.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🔥</span>
              <h2 className="text-sm font-semibold text-foreground">Flash-распродажа</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {flashSaleProductsList.map((product) => {
                const saleInfo = getFlashSaleInfo(product.id)
                if (!saleInfo) return null
                const salePrice = Math.round(product.price * (1 - saleInfo.discount / 100))
                return (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="flex-shrink-0 w-36 bg-card rounded-2xl border border-destructive/30 overflow-hidden"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                        -{saleInfo.discount}%
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-foreground line-clamp-1">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-destructive">{salePrice} ₽</span>
                        <span className="text-xs text-muted-foreground line-through">{product.price} ₽</span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
                <div className="aspect-square bg-muted animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => handleProductSelect(product)}
                onAddToCart={(e) => handleAddToCart(product, e)}
                isInWishlist={isInWishlist(product.id)}
                onToggleWishlist={() => {
                  if (isInWishlist(product.id)) {
                    removeFromWishlist(product.id)
                  } else {
                    addToWishlist(product)
                  }
                }}
              />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Товары не найдены</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("all")
                setPriceRange({ min: 0, max: 3000 })
                setSortBy("default")
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>

      {viewedProducts.length > 0 && (
        <div className="px-4 pb-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Вы смотрели</h2>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {viewedProducts
              .slice(-5)
              .reverse()
              .map((product) => (
                <button key={product.id} onClick={() => handleProductSelect(product)} className="flex-shrink-0 w-32">
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-2">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-foreground line-clamp-2">{product.name}</p>
                  <p className="text-xs text-primary font-medium">{product.price} ₽</p>
                </button>
              ))}
          </div>
        </div>
      )}

      <Sheet open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl px-0">
          {selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={() => {
                handleAddToCart(selectedProduct)
                setSelectedProduct(null)
              }}
            />
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl">
          <SheetHeader className="mb-4">
            <SheetTitle>Фильтры</SheetTitle>
          </SheetHeader>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Цена: {priceRange.min} ₽ - {priceRange.max} ₽
              </label>
              <div className="flex gap-3">
                <Input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="h-10 rounded-lg"
                  placeholder="От"
                />
                <Input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="h-10 rounded-lg"
                  placeholder="До"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange({ min: 0, max: 3000 })
                  setSortBy("default")
                }}
                className="flex-1"
              >
                Сбросить
              </Button>
              <Button onClick={() => setShowFilters(false)} className="flex-1">
                Применить
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function ProductCard({
  product,
  onSelect,
  onAddToCart,
  isInWishlist,
  onToggleWishlist,
}: {
  product: Product
  onSelect: () => void
  onAddToCart: (e: React.MouseEvent) => void
  isInWishlist: boolean
  onToggleWishlist: () => void
}) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    setIsAdding(true)
    onAddToCart(e)
    setTimeout(() => setIsAdding(false), 300)
  }

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
      : null

  const flashSale = getFlashSaleInfo(product.id)

  return (
    <div
      onClick={onSelect}
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
    >
      <div className="aspect-square relative bg-muted">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />

        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist()
          }}
          className="absolute top-2 left-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-95 transition-transform"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isInWishlist ? "fill-red-500 text-red-500" : "text-foreground"}`}
          />
        </button>

        <Button
          size="icon"
          onClick={handleAdd}
          className={`absolute bottom-2 right-2 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all duration-200 ${
            isAdding ? "scale-125 bg-green-500" : ""
          }`}
        >
          <Plus className={`h-5 w-5 transition-transform duration-200 ${isAdding ? "rotate-90" : ""}`} />
        </Button>

        {avgRating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{avgRating}</span>
          </div>
        )}

        {product.stock && product.stock <= 5 && (
          <div className="absolute bottom-2 left-2 bg-amber-500/90 text-white rounded-full px-2 py-1">
            <span className="text-[10px] font-medium">Осталось {product.stock}</span>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-medium text-sm text-foreground leading-tight line-clamp-2 mb-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          {flashSale ? (
            <>
              <p className="text-base font-semibold text-destructive">
                {Math.round(product.price * (1 - flashSale.discount / 100))} ₽
              </p>
              <p className="text-xs text-muted-foreground line-through">{product.price} ₽</p>
            </>
          ) : (
            <p className="text-base font-semibold text-primary">{product.price} ₽</p>
          )}
        </div>
      </div>
    </div>
  )
}

function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  if (images.length === 0) return null

  return (
    <div className="relative">
      <div
        className="h-48 rounded-2xl overflow-hidden bg-muted relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`${productName} - фото ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-95 transition-transform"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
            )}
            {currentIndex < images.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-95 transition-transform"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            )}
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProductDetail({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product
  onClose: () => void
  onAddToCart: () => void
}) {
  const [showAddReview, setShowAddReview] = useState(false)
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image]
  const avgRating =
    product.reviews && product.reviews.length > 0
      ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
      : null

  const relatedProducts = getRelatedProducts(product.id)
  const { addItem } = useCart()

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="px-4 pb-2">
        <div className="flex items-center justify-between">
          <SheetTitle className="text-left">Детали товара</SheetTitle>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xl font-light">×</span>
          </button>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto px-4">
        <ImageGallery images={galleryImages} productName={product.name} />

        <div className="space-y-4 mt-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{categories.find((c) => c.id === product.category)?.name || "Другое"}</Badge>
                {avgRating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{avgRating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews?.length})</span>
                  </div>
                )}
              </div>
              <ShareProduct productName={product.name} productId={product.id} />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{product.name}</h2>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
            {product.stock && product.stock <= 5 && (
              <span className="text-amber-600 text-sm font-medium">Осталось {product.stock} шт</span>
            )}
          </div>

          {product.origin && (
            <div className="p-3 bg-muted/50 rounded-xl">
              <p className="text-xs text-muted-foreground mb-0.5">Место заготовки</p>
              <p className="text-sm font-medium text-foreground">{product.origin}</p>
            </div>
          )}

          {(product.diameter || product.thickness) && (
            <div className="grid grid-cols-2 gap-3">
              {product.diameter && (
                <div className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-0.5">Диаметр</p>
                  <p className="text-sm font-medium text-foreground">{product.diameter}</p>
                </div>
              )}
              {product.thickness && (
                <div className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-0.5">Толщина</p>
                  <p className="text-sm font-medium text-foreground">{product.thickness}</p>
                </div>
              )}
            </div>
          )}

          {product.description && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Описание</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Особенности</h3>
              <ul className="space-y-1.5">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedProducts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">С этим товаром покупают</h3>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {relatedProducts.map((related) => (
                  <div key={related.id} className="flex-shrink-0 w-28">
                    <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-2">
                      <img
                        src={related.image || "/placeholder.svg"}
                        alt={related.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-foreground line-clamp-2">{related.name}</p>
                    <p className="text-xs text-primary font-medium">{related.price} ₽</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                Отзывы {product.reviews?.length ? `(${product.reviews.length})` : ""}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddReview(true)}
                className="h-8 rounded-lg text-xs"
              >
                Написать отзыв
              </Button>
            </div>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-3">
                {product.reviews.map((review) => (
                  <div key={review.id} className="p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{review.author}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                    {review.photos && review.photos.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {review.photos.map((photo, i) => (
                          <img
                            key={i}
                            src={photo || "/placeholder.svg"}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground/70 mt-1">{review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Пока нет отзывов. Будьте первым!</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-card">
        <Button
          onClick={onAddToCart}
          className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90"
        >
          Добавить в корзину
        </Button>
      </div>

      <AddReviewSheet
        isOpen={showAddReview}
        onClose={() => setShowAddReview(false)}
        productName={product.name}
        onSubmit={(review) => {
          console.log("Review submitted:", review)
        }}
      />
    </div>
  )
}

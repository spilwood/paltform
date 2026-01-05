"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Star,
  Store,
  TrendingUp,
  Award,
  Package,
  MessageCircle,
  ExternalLink,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { sellerProducts, sellers, type Seller } from "@/lib/products"
import type { Product } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"
import { telegram } from "@/lib/telegram"

export function MarketplaceView({ onBack }: { onBack: () => void }) {
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const featuredSellers = sellers.filter((s) => s.verified)

  const contactSeller = (product: Product) => {
    const seller = sellers.find((s) => s.id === product.sellerId)
    if (seller) {
      const message = `Здравствуйте! Интересует товар "${product.name}" за ${product.price}₽. Как можно оформить заказ?`
      telegram.openTelegramLink(`https://t.me/${seller.id}?text=${encodeURIComponent(message)}`)
      telegram.showAlert("Открываем чат с мастером в Telegram")
    }
  }

  if (selectedSeller) {
    const sellerItems = sellerProducts.filter((p) => p.sellerId === selectedSeller.id)
    return (
      <div className="flex flex-col min-h-full">
        <header className="bg-card border-b border-border px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
          <button
            onClick={() => setSelectedSeller(null)}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Профиль продавца</h1>
        </header>

        <div className="flex-1 p-4 space-y-4">
          <Card className="p-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={selectedSeller.avatar || "/placeholder.svg"}
                  alt={selectedSeller.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold text-foreground">{selectedSeller.name}</h2>
                  {selectedSeller.verified && (
                    <Badge variant="secondary" className="text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      Проверен
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{selectedSeller.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>{selectedSeller.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-3.5 w-3.5" />
                    <span>{selectedSeller.totalSales} продаж</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => contactSeller(sellerItems[0])}
              variant="outline"
              className="w-full h-10 rounded-xl gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Связаться с мастером
            </Button>
          </Card>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Товары продавца</h3>
            <div className="grid grid-cols-2 gap-3">
              {sellerItems.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-card rounded-2xl border border-border overflow-hidden active:scale-[0.98] transition-transform"
                >
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.stock && product.stock <= 5 && (
                      <div className="absolute top-2 left-2 bg-destructive/90 backdrop-blur-sm text-destructive-foreground text-[10px] px-2 py-0.5 rounded-full font-medium">
                        Осталось {product.stock}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-foreground mb-1 line-clamp-2 text-left">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{product.price} ₽</span>
                      {product.rating && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          <span>{product.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Sheet open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
            {selectedProduct && (
              <>
                <SheetHeader className="px-4 pb-2">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-left">Детали товара</SheetTitle>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                </SheetHeader>

                <div className="overflow-y-auto h-[calc(100%-120px)] px-4">
                  <div className="h-48 rounded-2xl overflow-hidden bg-muted mb-4">
                    <img
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-2">{selectedProduct.name}</h2>
                  <p className="text-2xl font-bold text-primary mb-4">{selectedProduct.price} ₽</p>

                  {selectedProduct.description && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Описание</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedProduct.description}</p>
                    </div>
                  )}

                  {selectedProduct.features && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Особенности</h3>
                      <ul className="space-y-2">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Продавец и доставка</h3>
                    <Card className="p-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                          <img
                            src={sellers.find((s) => s.id === selectedProduct.sellerId)?.avatar || "/placeholder.svg"}
                            alt={selectedProduct.sellerName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{selectedProduct.sellerName}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span>{sellers.find((s) => s.id === selectedProduct.sellerId)?.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
                        <ExternalLink className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <p>
                          Доставку оформляет мастер через Ozon. После связи с мастером вы получите инструкции по
                          оформлению заказа.
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
                  <Button
                    onClick={() => {
                      contactSeller(selectedProduct)
                      setSelectedProduct(null)
                    }}
                    className="w-full h-12 rounded-2xl bg-primary text-base font-medium gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Связаться с мастером
                  </Button>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="bg-card border-b border-border px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center active:scale-95 transition-transform"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Маркетплейс мастеров</h1>
      </header>

      <div className="flex-1 p-4 space-y-6">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Store className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground mb-1">Витрина изделий мастеров</h2>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Уникальные изделия из спилов, созданные вручную. Связывайтесь с мастерами напрямую для заказа. Доставку
                каждый мастер оформляет самостоятельно через Ozon.
              </p>
            </div>
          </div>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Проверенные мастера</h2>
            <Badge variant="secondary" className="text-xs">
              <TrendingUp className="h-4 w-4 mr-1" />
              Топ продавцы
            </Badge>
          </div>

          <div className="space-y-3">
            {featuredSellers.map((seller) => {
              const sellerItemsCount = sellerProducts.filter((p) => p.sellerId === seller.id).length
              return (
                <Card
                  key={seller.id}
                  className="p-4 cursor-pointer active:scale-[0.98] transition-transform"
                  onClick={() => setSelectedSeller(seller)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={seller.avatar || "/placeholder.svg"}
                        alt={seller.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{seller.name}</h3>
                        {seller.verified && <Award className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{seller.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 pb-3 border-b border-border">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span>{seller.rating} рейтинг</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>{seller.totalSales} продаж</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{sellerItemsCount} товаров</span>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      Смотреть →
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Новинки от мастеров</h2>
          <div className="grid grid-cols-2 gap-3">
            {sellerProducts.slice(0, 6).map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-card rounded-2xl border border-border overflow-hidden active:scale-[0.98] transition-transform"
              >
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.sellerName && (
                    <div className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm text-[10px] px-2 py-1 rounded-full">
                      {product.sellerName}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-foreground mb-1 line-clamp-2 text-left">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{product.price} ₽</span>
                    {product.rating && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, MapPin, User, Phone, Check, Package, Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { checkoutFormSchema, type CheckoutFormData } from "@/lib/validation-schemas"

const ozonPickupPoints = [
  { id: 1, name: "Ozon Box", address: "ул. Тверская, 15", lat: 55.7647, lng: 37.6056 },
  { id: 2, name: "Ozon Пункт выдачи", address: "ул. Арбат, 24", lat: 55.7517, lng: 37.5914 },
  { id: 3, name: "Ozon Box", address: "Ленинградский пр-т, 47", lat: 55.7903, lng: 37.5477 },
  { id: 4, name: "Ozon Пункт выдачи", address: "ул. Новый Арбат, 11", lat: 55.7531, lng: 37.5854 },
  { id: 5, name: "Ozon Box", address: "Комсомольский пр-т, 28", lat: 55.7291, lng: 37.586 },
]

export function CartView() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart")
  const [selectedPickupPoint, setSelectedPickupPoint] = useState<number | null>(null)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)
  const [promoError, setPromoError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
    },
  })

  const pickupPointId = watch("pickupPointId")

  const promoCodes: Record<string, number> = {
    SPILWOOD10: 10,
    FIRST20: 20,
    SALE15: 15,
  }

  const applyPromoCode = () => {
    const upperCode = promoCode.toUpperCase()
    if (promoCodes[upperCode]) {
      setAppliedPromo({ code: upperCode, discount: promoCodes[upperCode] })
      setPromoError("")
    } else {
      setPromoError("Неверный промокод")
      setAppliedPromo(null)
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    setPromoCode("")
    setPromoError("")
  }

  const discount = appliedPromo ? Math.round(totalPrice * (appliedPromo.discount / 100)) : 0
  const finalTotal = totalPrice - discount + 299

  const onSubmit = async (data: CheckoutFormData) => {
    setIsCheckingOut(true)
    console.log("[v0] Checkout form data:", data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setCheckoutStep("success")
    setIsCheckingOut(false)
  }

  const handleSuccessClose = () => {
    clearCart()
    setCheckoutStep("cart")
    reset()
    setSelectedPickupPoint(null)
    removePromoCode()
  }

  const handlePickupPointSelect = (pointId: number) => {
    setSelectedPickupPoint(pointId)
    setValue("pickupPointId", pointId, { shouldValidate: true })
  }

  if (checkoutStep === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 animate-in zoom-in-50 duration-300">
          <Check className="h-10 w-10 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Заказ оформлен!</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Номер заказа:{" "}
          <span className="font-medium text-foreground">#{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
        </p>
        <p className="text-sm text-muted-foreground mb-6 max-w-[280px]">
          Мы свяжемся с вами в Telegram для подтверждения. Доставка через Ozon в выбранный пункт выдачи.
        </p>
        <div className="bg-card border border-border rounded-2xl p-4 w-full mb-6">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {ozonPickupPoints.find((p) => p.id === selectedPickupPoint)?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {ozonPickupPoints.find((p) => p.id === selectedPickupPoint)?.address}
              </p>
            </div>
          </div>
        </div>
        <Button onClick={handleSuccessClose} className="w-full h-12 rounded-2xl bg-primary">
          Вернуться к покупкам
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Корзина пуста</h2>
        <p className="text-sm text-muted-foreground text-center max-w-[200px]">
          Добавьте товары из каталога или оформите индивидуальный заказ
        </p>
      </div>
    )
  }

  if (checkoutStep === "form") {
    return (
      <div className="flex flex-col min-h-full">
        {/* Header with back button */}
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCheckoutStep("cart")}
              className="h-10 w-10 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Оформление заказа</h1>
              <p className="text-xs text-muted-foreground">Заполните данные для доставки</p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
          <div className="flex-1 p-4 space-y-6 pb-40">
            {/* Personal Info */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Контактные данные
              </h2>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm text-muted-foreground">
                    ФИО получателя
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Иванов Иван Иванович"
                    {...register("fullName")}
                    className={`h-12 rounded-xl bg-muted/50 border-border ${errors.fullName ? "border-destructive" : ""}`}
                  />
                  {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-muted-foreground">
                    Номер телефона
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      {...register("phone")}
                      className={`h-12 rounded-xl bg-muted/50 border-border pl-10 ${errors.phone ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Pickup Point Selection */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Пункт выдачи Ozon
              </h2>

              {errors.pickupPointId && <p className="text-xs text-destructive">{errors.pickupPointId.message}</p>}

              {/* Yandex Map Placeholder */}
              <div className="relative h-48 rounded-2xl overflow-hidden border border-border bg-muted">
                <img
                  src="/yandex-map-moscow-with-ozon-pickup-points-markers.jpg"
                  alt="Карта пунктов выдачи"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs text-muted-foreground">Выберите пункт выдачи из списка ниже</p>
                </div>
                {/* Map pins */}
                {ozonPickupPoints.map((point, index) => (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => handlePickupPointSelect(point.id)}
                    className={`absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center transition-transform ${selectedPickupPoint === point.id ? "scale-125 z-10" : ""}`}
                    style={{
                      top: `${20 + index * 15}%`,
                      left: `${15 + index * 18}%`,
                    }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${selectedPickupPoint === point.id ? "bg-primary" : "bg-blue-500"}`}
                    >
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Pickup Points List */}
              <div className="space-y-2">
                {ozonPickupPoints.map((point) => (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => handlePickupPointSelect(point.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-[0.98] ${
                      selectedPickupPoint === point.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedPickupPoint === point.id ? "bg-primary" : "bg-blue-500/10"
                      }`}
                    >
                      <MapPin
                        className={`h-5 w-5 ${selectedPickupPoint === point.id ? "text-primary-foreground" : "text-blue-500"}`}
                      />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-medium text-foreground">{point.name}</p>
                      <p className="text-xs text-muted-foreground">{point.address}</p>
                    </div>
                    {selectedPickupPoint === point.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-3 bg-card rounded-2xl border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground">Ваш заказ</h3>
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-foreground">{item.price * item.quantity} ₽</span>
                </div>
              ))}
              <div className="h-px bg-border" />
              {appliedPromo && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Скидка ({appliedPromo.code})</span>
                  <span>-{discount} ₽</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Доставка Ozon</span>
                <span className="text-foreground">299 ₽</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Итого</span>
                <span className="text-lg font-bold text-primary">{finalTotal} ₽</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t border-border max-w-[430px] mx-auto">
            <Button
              type="submit"
              disabled={isCheckingOut}
              className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90"
            >
              {isCheckingOut ? (
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Оформляем...
                </span>
              ) : (
                "Подтвердить заказ"
              )}
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Корзина</h1>
            <p className="text-xs text-muted-foreground">
              {items.length} {items.length === 1 ? "товар" : items.length < 5 ? "товара" : "товаров"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Очистить
          </Button>
        </div>
      </header>

      {/* Cart Items */}
      <div className="flex-1 p-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 bg-card rounded-2xl p-3 border border-border">
            {/* Product Image */}
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">{item.name}</h3>
              <p className="text-base font-semibold text-primary">{item.price} ₽</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-9 w-9 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-base font-medium w-6 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-9 w-9 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="h-9 w-9 rounded-full ml-auto text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Промокод</span>
          </div>

          {!appliedPromo ? (
            <div className="flex gap-2">
              <Input
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value)
                  setPromoError("")
                }}
                placeholder="Введите промокод"
                className="h-11 rounded-xl"
              />
              <Button onClick={applyPromoCode} variant="outline" className="h-11 px-4 rounded-xl bg-transparent">
                Применить
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl">
              <div>
                <p className="text-sm font-medium text-green-600">{appliedPromo.code}</p>
                <p className="text-xs text-muted-foreground">Скидка {appliedPromo.discount}%</p>
              </div>
              <Button onClick={removePromoCode} variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {promoError && <p className="text-xs text-destructive">{promoError}</p>}
        </div>
      </div>

      {/* Order Summary & Checkout */}
      <div className="sticky bottom-20 p-4 bg-card border-t border-border space-y-4">
        {/* Summary */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Товары</span>
            <span className="text-foreground">{totalPrice} ₽</span>
          </div>
          {appliedPromo && (
            <div className="flex items-center justify-between text-sm text-green-600">
              <span>Скидка ({appliedPromo.code})</span>
              <span>-{discount} ₽</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Доставка Ozon</span>
            <span className="text-foreground">299 ₽</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">Итого</span>
            <span className="text-xl font-bold text-primary">{finalTotal} ₽</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={() => setCheckoutStep("form")}
          className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

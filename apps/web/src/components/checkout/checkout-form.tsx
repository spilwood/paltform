"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { useCart } from "@/lib/store/cart"
import { useOrders, type ShippingAddress } from "@/lib/store/orders"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"
import Image from "next/image"

type Step = "shipping" | "review" | "complete"

export function CheckoutForm() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const { createOrder } = useOrders()
  const [step, setStep] = useState<Step>("shipping")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderId, setOrderId] = useState<string>("")

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    postalCode: "",
    comment: "",
  })

  const [errors, setErrors] = useState<Partial<ShippingAddress>>({})

  const validateShipping = (): boolean => {
    const newErrors: Partial<ShippingAddress> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Введите имя"
    if (!formData.phone.trim()) newErrors.phone = "Введите телефон"
    if (!formData.email.trim()) {
      newErrors.email = "Введите email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Неверный формат email"
    }
    if (!formData.city.trim()) newErrors.city = "Введите город"
    if (!formData.address.trim()) newErrors.address = "Введите адрес"
    if (!formData.postalCode.trim()) newErrors.postalCode = "Введите индекс"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const order = createOrder(cart.items, cart.total, formData)
    setOrderId(order.id)
    clearCart()
    setStep("complete")
    setIsSubmitting(false)
  }

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (cart.items.length === 0 && step !== "complete") {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">Ваша корзина пуста</p>
          <p className="mt-1 text-sm text-muted-foreground">Добавьте товары для оформления заказа</p>
          <Button className="mt-6" onClick={() => router.push("/spily")}>
            Перейти в каталог
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Form Section */}
      <div>
        <div className="mb-10 flex items-center gap-4">
          {(["shipping", "review", "complete"] as Step[]).map((s, index) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  step === s
                    ? "bg-primary text-primary-foreground"
                    : (["shipping", "review", "complete"].indexOf(step) > index)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {["shipping", "review", "complete"].indexOf(step) > index ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              {index < 2 && <div className="h-px w-8 bg-border md:w-16" />}
            </div>
          ))}
        </div>

        {step === "shipping" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Доставка</h2>
              <p className="mt-1 text-sm text-muted-foreground">Введите данные для доставки заказа</p>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Имя и фамилия *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={errors.fullName ? "border-destructive" : ""}
                  placeholder="Иван Иванов"
                />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                    placeholder="+7 (999) 123-45-67"
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Город *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={errors.city ? "border-destructive" : ""}
                    placeholder="Москва"
                  />
                  {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Индекс *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    className={errors.postalCode ? "border-destructive" : ""}
                    placeholder="123456"
                  />
                  {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Адрес доставки *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={errors.address ? "border-destructive" : ""}
                  placeholder="ул. Примерная, д. 1, кв. 10"
                />
                {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Комментарий к заказу</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => handleInputChange("comment", e.target.value)}
                  className="min-h-[100px] resize-none"
                  placeholder="Дополнительная информация..."
                />
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                if (validateShipping()) setStep("review")
              }}
            >
              Продолжить
              <ArrowRight />
            </Button>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Проверка заказа</h2>
              <p className="mt-1 text-sm text-muted-foreground">Проверьте данные перед оформлением</p>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Адрес доставки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="font-medium">{formData.fullName}</p>
                <p className="text-muted-foreground">{formData.phone}</p>
                <p className="text-muted-foreground">{formData.email}</p>
                <p className="text-muted-foreground">
                  {formData.postalCode}, {formData.city}
                </p>
                <p className="text-muted-foreground">{formData.address}</p>
                {formData.comment && <p className="mt-2 text-muted-foreground">"{formData.comment}"</p>}
                <Button variant="link" className="h-auto p-0 text-sm" onClick={() => setStep("shipping")}>
                  Изменить
                </Button>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep("shipping")}>
                <ArrowLeft />
                Назад
              </Button>
              <Button className="flex-1" size="lg" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2" />
                    Оформление...
                  </>
                ) : (
                  <>
                    Оформить заказ
                    <ArrowRight />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "complete" && (
          <Card className="text-center">
            <CardContent className="space-y-6 py-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Check className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Заказ оформлен</h2>
                <p className="mt-2 text-muted-foreground">
                  Номер заказа: <span className="font-mono font-medium text-foreground">{orderId}</span>
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Мы отправили подтверждение на {formData.email}. Вы можете отслеживать статус заказа в личном кабинете.
              </p>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
                <Button onClick={() => router.push("/account/orders")}>Мои заказы</Button>
                <Button variant="outline" onClick={() => router.push("/spily")}>
                  Продолжить покупки
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Order Summary */}
      {step !== "complete" && (
        <div className="lg:border-l lg:border-border lg:pl-12">
          <div className="sticky top-28">
            <h2 className="text-sm font-medium text-muted-foreground">Ваш заказ</h2>

            <ul className="mt-6 space-y-4">
              {cart.items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <h3 className="text-sm font-medium">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground">Кол-во: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Separator className="my-6" />
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары ({cart.items.length})</span>
                <span>{cart.total.toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Доставка</span>
                <span>Рассчитывается</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Итого</span>
                <span>{cart.total.toLocaleString("ru-RU")} ₽</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

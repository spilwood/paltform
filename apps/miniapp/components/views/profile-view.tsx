"use client"

import { useState, useEffect } from "react"
import {
  User,
  Package,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle2,
  Truck,
  Info,
  Send,
  Heart,
  Gift,
  Users,
  ImageIcon,
  Store,
  Settings,
  Trophy,
  LayoutGrid,
  Medal,
  Target,
  Star,
  Bell,
  Shield,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTelegramUser, openTelegramLink, type TelegramUser } from "@/lib/telegram"
import { WishlistView } from "./wishlist-view"
import { BonusView } from "./bonus-view"
import { ReferralView } from "./referral-view"
import { GalleryView } from "./gallery-view"
import { OrderTrackingView } from "./order-tracking-view"
import { MarketplaceView } from "./marketplace-view"
import { SellOnSpilwoodView } from "./sell-on-spilwood-view"
import { useWishlist } from "@/lib/wishlist-context"
import { useBonus } from "@/lib/bonus-context"

type OrderStatus = "processing" | "shipping" | "delivered"

interface Order {
  id: string
  date: string
  items: { name: string; quantity: number }[]
  total: number
  status: OrderStatus
}

const mockOrders: Order[] = [
  {
    id: "SW-2847",
    date: "28 ноября 2025",
    items: [
      { name: "Береза шлифованная 20см", quantity: 2 },
      { name: "Пенек интерьерный", quantity: 1 },
    ],
    total: 1900,
    status: "shipping",
  },
  {
    id: "SW-2831",
    date: "25 ноября 2025",
    items: [{ name: "Индивидуальный распил (Дуб)", quantity: 3 }],
    total: 2850,
    status: "processing",
  },
  {
    id: "SW-2756",
    date: "15 ноября 2025",
    items: [
      { name: "Набор спилов (5 шт)", quantity: 1 },
      { name: "Сосна натуральная 15см", quantity: 4 },
    ],
    total: 1600,
    status: "delivered",
  },
]

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock; color: string }> = {
  processing: { label: "В обработке", icon: Clock, color: "bg-amber-500/20 text-amber-600" },
  shipping: { label: "В доставке", icon: Truck, color: "bg-blue-500/20 text-blue-600" },
  delivered: { label: "Доставлен", icon: CheckCircle2, color: "bg-green-500/20 text-green-600" },
}

const menuItems = [
  { icon: Package, label: "Мои заказы", badge: "2", action: "orders" },
  { icon: Heart, label: "Избранное", badge: null, action: "wishlist" },
  { icon: Gift, label: "Бонусы", badge: null, action: "bonus" },
  { icon: Store, label: "Маркетплейс мастеров", badge: null, action: "marketplace" },
  { icon: Store, label: "Продавать на Spilwood", badge: "NEW", action: "sell" },
  { icon: Users, label: "Приведи друга", badge: null, action: "referral" },
  { icon: ImageIcon, label: "Галерея работ", badge: null, action: "gallery" },
  { icon: MessageCircle, label: "Связаться с нами", badge: null, action: "contact" },
  { icon: HelpCircle, label: "Помощь", badge: null, action: "help" },
  { icon: Info, label: "О компании", badge: null, action: "about" },
]

const faqItems = [
  {
    question: "Как оформить заказ?",
    answer:
      "Выберите товары в каталоге, добавьте их в корзину и перейдите к оформлению. Заполните контактные данные и выберите пункт выдачи Ozon.",
  },
  {
    question: "Сколько времени занимает доставка?",
    answer:
      "Обработка заказа занимает 1-2 рабочих дня. Доставка через Ozon обычно занимает 2-5 дней в зависимости от вашего региона.",
  },
  {
    question: "Можно ли вернуть товар?",
    answer:
      "Да, вы можете вернуть товар в течение 14 дней с момента получения, если он не был в использовании и сохранил товарный вид.",
  },
  {
    question: "Как заказать индивидуальный распил?",
    answer:
      "Перейдите во вкладку 'Распил', выберите тип древесины, укажите размеры и количество. Мы рассчитаем стоимость и свяжемся с вами для уточнения деталей.",
  },
  {
    question: "Обрабатываются ли спилы защитным составом?",
    answer:
      "Да, все наши спилы обработаны натуральным льняным или датским маслом для защиты древесины и подчеркивания текстуры.",
  },
]

type ProfileTabType = "overview" | "projects" | "achievements" | "settings"
type ViewType =
  | "profile"
  | "orders"
  | "contact"
  | "help"
  | "about"
  | "wishlist"
  | "bonus"
  | "referral"
  | "gallery"
  | "tracking"
  | "marketplace"
  | "sell"

export function ProfileView() {
  const [currentView, setCurrentView] = useState<ViewType>("profile")
  const [profileTab, setProfileTab] = useState<ProfileTabType>("overview")
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const { items: wishlistItems } = useWishlist()
  const { balance } = useBonus()

  useEffect(() => {
    const user = getTelegramUser()
    setTelegramUser(user)
  }, [])

  if (currentView === "wishlist") {
    return <WishlistView onBack={() => setCurrentView("profile")} />
  }

  if (currentView === "bonus") {
    return <BonusView onBack={() => setCurrentView("profile")} />
  }

  if (currentView === "referral") {
    return <ReferralView onBack={() => setCurrentView("profile")} />
  }

  if (currentView === "gallery") {
    return <GalleryView onBack={() => setCurrentView("profile")} />
  }

  if (currentView === "tracking" && selectedOrderId) {
    return <OrderTrackingView orderId={selectedOrderId} onBack={() => setCurrentView("orders")} />
  }

  if (currentView === "orders") {
    return (
      <div className="flex flex-col min-h-full">
        <header className="bg-card border-b border-border px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setCurrentView("profile")}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Мои заказы</h1>
        </header>

        <div className="flex-1 p-4 space-y-3">
          {mockOrders.map((order) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon
            return (
              <button
                key={order.id}
                onClick={() => {
                  setSelectedOrderId(order.id)
                  setCurrentView("tracking")
                }}
                className="w-full bg-card rounded-2xl border border-border p-4 text-left active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-semibold text-foreground">#{order.id}</span>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {status.label}
                  </div>
                </div>

                <div className="space-y-1.5 mb-3 pb-3 border-b border-border">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="text-foreground">x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Итого</span>
                  <span className="font-semibold text-foreground">{order.total} ₽</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (currentView === "contact") {
    return (
      <div className="flex flex-col min-h-full">
        <header className="bg-card border-b border-border px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setCurrentView("profile")}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Связаться с нами</h1>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Send className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Telegram поддержка</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-[280px]">
            Напишите нам в Telegram, и мы ответим на все ваши вопросы в течение нескольких минут
          </p>
          <Button
            onClick={() => openTelegramLink("https://t.me/spilwood_support")}
            className="w-full max-w-[280px] h-12 rounded-2xl bg-primary"
          >
            Написать в Telegram
          </Button>
          <div className="mt-8 space-y-2 text-xs text-muted-foreground">
            <p>Режим работы: Пн-Пт 9:00-18:00</p>
            <p>Email: support@spilwood.ru</p>
            <p>Телефон: +7 (999) 123-45-67</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "help") {
    return (
      <div className="flex flex-col min-h-full">
        <header className="bg-card border-b border-border px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setCurrentView("profile")}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Помощь</h1>
        </header>

        <div className="flex-1 p-4 space-y-3">
          <h2 className="text-sm font-semibold text-foreground mb-2">Частые вопросы</h2>
          {faqItems.map((item, index) => (
            <details key={index} className="bg-card rounded-2xl border border-border overflow-hidden group">
              <summary className="px-4 py-4 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors">
                <span className="text-sm font-medium text-foreground pr-4">{item.question}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90 flex-shrink-0" />
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                {item.answer}
              </div>
            </details>
          ))}

          <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20">
            <p className="text-sm text-foreground mb-2">Не нашли ответ?</p>
            <Button onClick={() => setCurrentView("contact")} variant="outline" className="w-full">
              Связаться с поддержкой
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "about") {
    return (
      <div className="flex flex-col min-h-full">
        <header className="bg-card border-b border-border px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setCurrentView("profile")}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">О компании</h1>
        </header>

        <div className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-3xl">S</span>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-foreground">Spilwood</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Натуральные спилы дерева для декора, творчества и интерьера
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-4 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Spilwood</strong> — это семейное производство, специализирующееся на
              изготовлении качественных спилов дерева с 2018 года.
            </p>
            <p>
              Мы работаем только с натуральной древесиной из экологически чистых регионов России. Каждый спил проходит
              тщательную обработку: сушку, шлифовку и покрытие натуральными маслами.
            </p>
            <p>
              Наша миссия — сделать природную красоту дерева доступной для каждого, кто ценит экологичность и
              уникальность натуральных материалов.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-card rounded-xl border border-border p-3">
              <p className="text-2xl font-bold text-primary">7+</p>
              <p className="text-xs text-muted-foreground mt-1">лет опыта</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-3">
              <p className="text-2xl font-bold text-primary">5000+</p>
              <p className="text-xs text-muted-foreground mt-1">заказов</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-3">
              <p className="text-2xl font-bold text-primary">100%</p>
              <p className="text-xs text-muted-foreground mt-1">натурально</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "marketplace") {
    return <MarketplaceView onBack={() => setCurrentView("profile")} />
  }

  if (currentView === "sell") {
    return <SellOnSpilwoodView onBack={() => setCurrentView("profile")} />
  }

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Profile Header */}
      <header className="bg-gradient-to-b from-primary/10 to-background px-4 pt-6 pb-4 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden border-2 border-primary/20">
            {telegramUser?.photo_url ? (
              <img
                src={telegramUser.photo_url || "/placeholder.svg"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-primary" />
            )}
            {telegramUser?.is_premium && (
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center border-2 border-background">
                <Star className="h-3 w-3 text-white fill-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-foreground truncate">
              {telegramUser
                ? `${telegramUser.first_name}${telegramUser.last_name ? ` ${telegramUser.last_name}` : ""}`
                : "Гость"}
            </h1>
            <p className="text-sm text-muted-foreground truncate">
              {telegramUser?.username ? `@${telegramUser.username}` : "Войдите через Telegram"}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                <Trophy className="h-3 w-3" />
                <span className="font-medium">Мастер</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              setProfileTab("projects")
            }}
            className="bg-card rounded-xl p-3 text-center border border-border hover:border-primary/50 transition-colors active:scale-95"
          >
            <p className="text-lg font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground mt-0.5">Заказов</p>
          </button>
          <button
            onClick={() => setCurrentView("bonus")}
            className="bg-card rounded-xl p-3 text-center border border-border hover:border-primary/50 transition-colors active:scale-95"
          >
            <p className="text-lg font-bold text-primary">{balance}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Бонусов</p>
          </button>
          <button
            onClick={() => {
              setProfileTab("achievements")
            }}
            className="bg-card rounded-xl p-3 text-center border border-border hover:border-primary/50 transition-colors active:scale-95"
          >
            <p className="text-lg font-bold text-amber-500">8</p>
            <p className="text-xs text-muted-foreground mt-0.5">Значков</p>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
          {[
            { id: "overview" as ProfileTabType, label: "Обзор", icon: LayoutGrid },
            { id: "projects" as ProfileTabType, label: "Проекты", icon: Package },
            { id: "achievements" as ProfileTabType, label: "Достижения", icon: Trophy },
            { id: "settings" as ProfileTabType, label: "Настройки", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = profileTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setProfileTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all active:scale-95 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {profileTab === "overview" && (
          <div className="space-y-4">
            {/* Frequently Accessed */}
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Быстрый доступ
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCurrentView("orders")}
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all active:scale-95 text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium text-foreground">Мои заказы</p>
                  <p className="text-xs text-muted-foreground mt-1">2 активных</p>
                </button>

                <button
                  onClick={() => setCurrentView("wishlist")}
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all active:scale-95 text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-2">
                    <Heart className="h-5 w-5 text-destructive" />
                  </div>
                  <p className="font-medium text-foreground">Избранное</p>
                  <p className="text-xs text-muted-foreground mt-1">{wishlistItems.length} товаров</p>
                </button>

                <button
                  onClick={() => setCurrentView("bonus")}
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all active:scale-95 text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-2">
                    <Gift className="h-5 w-5 text-amber-500" />
                  </div>
                  <p className="font-medium text-foreground">Бонусы</p>
                  <p className="text-xs text-muted-foreground mt-1">{balance} ₽</p>
                </button>

                <button
                  onClick={() => setCurrentView("referral")}
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all active:scale-95 text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="font-medium text-foreground">Пригласить</p>
                  <p className="text-xs text-muted-foreground mt-1">200₽ бонус</p>
                </button>
              </div>
            </section>

            {/* Community & Marketplace */}
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Сообщество
              </h2>
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <button
                  onClick={() => setCurrentView("gallery")}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 active:bg-muted transition-colors border-b border-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left font-medium text-foreground">Галерея работ</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>

                <button
                  onClick={() => setCurrentView("marketplace")}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 active:bg-muted transition-colors border-b border-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Store className="h-5 w-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left font-medium text-foreground">Маркетплейс мастеров</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>

                <button
                  onClick={() => setCurrentView("sell")}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 active:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Store className="h-5 w-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left font-medium text-foreground">Продавать на Spilwood</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    NEW
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </section>

            {/* Support & Info */}
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Поддержка
              </h2>
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <button
                  onClick={() => setCurrentView("help")}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 active:bg-muted transition-colors border-b border-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left font-medium text-foreground">Помощь</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>

                <button
                  onClick={() => setCurrentView("contact")}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 active:bg-muted transition-colors border-b border-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left font-medium text-foreground">Связаться с нами</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>

                <button
                  onClick={() => setCurrentView("about")}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 active:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left font-medium text-foreground">О компании</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </section>
          </div>
        )}

        {profileTab === "projects" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-foreground">Мои заказы</h2>
              <Button variant="ghost" size="sm" onClick={() => setCurrentView("orders")}>
                Все заказы
              </Button>
            </div>
            {mockOrders.slice(0, 3).map((order) => {
              const status = statusConfig[order.status]
              const StatusIcon = status.icon
              return (
                <button
                  key={order.id}
                  onClick={() => {
                    setSelectedOrderId(order.id)
                    setCurrentView("tracking")
                  }}
                  className="w-full bg-card rounded-xl border border-border p-4 text-left active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">#{order.id}</span>
                    <div
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{order.date}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">{order.items.length} товара</span>
                    <span className="font-semibold text-foreground">{order.total} ₽</span>
                  </div>
                </button>
              )
            })}

            <div className="mt-6">
              <h2 className="text-sm font-semibold text-foreground mb-3">Мои проекты</h2>
              <button
                onClick={() => setCurrentView("gallery")}
                className="w-full bg-card rounded-xl border border-dashed border-border p-6 text-center hover:border-primary/50 transition-colors active:scale-95"
              >
                <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Загрузить работу</p>
                <p className="text-xs text-muted-foreground mt-1">Поделитесь своими изделиями</p>
              </button>
            </div>
          </div>
        )}

        {profileTab === "achievements" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-4 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Уровень: Мастер</p>
                  <p className="text-xs text-muted-foreground">8 из 12 значков</p>
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "66%" }} />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-foreground mb-3">Значки</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Star, label: "Первый заказ", unlocked: true, color: "text-amber-500" },
                  { icon: Heart, label: "Первая покупка", unlocked: true, color: "text-red-500" },
                  { icon: Users, label: "Пригласил друга", unlocked: true, color: "text-blue-500" },
                  { icon: Package, label: "5 заказов", unlocked: true, color: "text-green-500" },
                  { icon: Medal, label: "10 заказов", unlocked: true, color: "text-purple-500" },
                  { icon: Trophy, label: "Мастер", unlocked: true, color: "text-orange-500" },
                  { icon: Target, label: "20 заказов", unlocked: true, color: "text-cyan-500" },
                  { icon: Gift, label: "Щедрый друг", unlocked: true, color: "text-pink-500" },
                  { icon: ImageIcon, label: "Первое фото", unlocked: false, color: "text-gray-400" },
                ].map((badge, idx) => {
                  const Icon = badge.icon
                  return (
                    <div
                      key={idx}
                      className={`bg-card rounded-xl p-4 border ${
                        badge.unlocked ? "border-border" : "border-dashed border-border/50"
                      } flex flex-col items-center gap-2 ${!badge.unlocked && "opacity-50"}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full ${
                          badge.unlocked ? "bg-primary/10" : "bg-muted"
                        } flex items-center justify-center`}
                      >
                        <Icon className={`h-6 w-6 ${badge.unlocked ? badge.color : "text-muted-foreground"}`} />
                      </div>
                      <p className="text-xs text-center font-medium text-foreground">{badge.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {profileTab === "settings" && (
          <div className="space-y-4">
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-3">Аккаунт</h2>
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 active:bg-muted transition-colors border-b border-border">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium text-foreground">Редактировать профиль</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 active:bg-muted transition-colors">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium text-foreground">Конфиденциальность</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-foreground mb-3">Уведомления</h2>
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 active:bg-muted transition-colors border-b border-border">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium text-foreground">Настройки уведомлений</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>

                <div className="px-4 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium text-foreground">Статус заказа</span>
                    </div>
                    <div className="w-11 h-6 bg-primary rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium text-foreground">Акции и бонусы</span>
                    </div>
                    <div className="w-11 h-6 bg-primary rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-destructive/5 active:bg-destructive/10 transition-colors text-destructive">
                  <LogOut className="h-5 w-5" />
                  <span className="flex-1 text-left font-medium">Выйти</span>
                </button>
              </div>
            </section>

            <div className="text-center pt-4">
              <p className="text-xs text-muted-foreground">Версия 1.0.0</p>
              <p className="text-xs text-muted-foreground mt-1">© 2025 Spilwood</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

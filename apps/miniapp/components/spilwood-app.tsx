"use client"

import { useState, useRef, useEffect } from "react"
import { Home, PenTool, ShoppingBag, User, Bell, Users } from "lucide-react"
import { ShopView } from "./views/shop-view"
import { CustomOrderView } from "./views/custom-order-view"
import { CartView } from "./views/cart-view"
import { ProfileView } from "./views/profile-view"
import { NotificationsView } from "./views/notifications-view"
import { CommunityView } from "./views/community-view"
import { CartProvider, useCart } from "@/lib/cart-context"
import { NotificationsProvider, useNotifications } from "@/lib/notifications-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { BonusProvider } from "@/lib/bonus-context"
import { CommunityProvider } from "@/lib/community-context"
import { CartToast } from "./cart-toast"
import { Onboarding } from "./onboarding"
import { FlyToCartAnimation } from "./fly-to-cart-animation"
import { getTelegramWebApp } from "@/lib/telegram"

type TabType = "shop" | "custom" | "cart" | "notifications" | "community" | "profile"

const tabs = [
  { id: "shop" as TabType, label: "Магазин", icon: Home },
  { id: "custom" as TabType, label: "Распил", icon: PenTool },
  { id: "cart" as TabType, label: "Корзина", icon: ShoppingBag },
  { id: "community" as TabType, label: "Сообщество", icon: Users },
  { id: "notifications" as TabType, label: "Уведомления", icon: Bell },
  { id: "profile" as TabType, label: "Профиль", icon: User },
]

export function SpilwoodApp() {
  return (
    <BonusProvider>
      <WishlistProvider>
        <NotificationsProvider>
          <CommunityProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </CommunityProvider>
        </NotificationsProvider>
      </WishlistProvider>
    </BonusProvider>
  )
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>("shop")
  const [previousTab, setPreviousTab] = useState<TabType>("shop")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const { toastMessage, showToast, hideToast, totalItems, flyAnimationStart, triggerFlyAnimation } = useCart()
  const { unreadCount } = useNotifications()

  useEffect(() => {
    const webApp = getTelegramWebApp()
    if (webApp) {
      webApp.ready()
      webApp.expand()

      if (webApp.themeParams.bg_color) {
        document.documentElement.style.setProperty("--tg-bg-color", webApp.themeParams.bg_color)
      }
      if (webApp.themeParams.text_color) {
        document.documentElement.style.setProperty("--tg-text-color", webApp.themeParams.text_color)
      }

      webApp.setHeaderColor("#1c1917")
      webApp.setBackgroundColor("#0c0a09")

      if (webApp.colorScheme === "dark") {
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  const handleTabChange = (newTab: TabType) => {
    if (newTab === activeTab || isTransitioning) return

    setPreviousTab(activeTab)
    setIsTransitioning(true)

    setTimeout(() => {
      setActiveTab(newTab)
      setTimeout(() => setIsTransitioning(false), 150)
    }, 100)

    if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged()
    }
  }

  const getTabIndex = (tab: TabType) => tabs.findIndex((t) => t.id === tab)

  return (
    <div className="min-h-screen bg-muted flex justify-center">
      <div className="w-full max-w-[430px] min-w-[375px] bg-background min-h-screen flex flex-col relative shadow-2xl overflow-hidden">
        <Onboarding onComplete={() => setShowOnboarding(false)} />

        <CartToast message={toastMessage} isVisible={showToast} onHide={hideToast} />

        <FlyToCartAnimation startPosition={flyAnimationStart} onComplete={() => {}} />

        <main className="flex-1 overflow-hidden pb-20 relative">
          <div
            className={`h-full transition-all duration-200 ease-out ${
              isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
            }`}
          >
            {activeTab === "shop" && <ShopView />}
            {activeTab === "custom" && <CustomOrderView />}
            {activeTab === "cart" && <CartView />}
            {activeTab === "community" && <CommunityView />}
            {activeTab === "notifications" && <NotificationsView />}
            {activeTab === "profile" && <ProfileView />}
          </div>
        </main>

        <BottomTabBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          cartItemCount={totalItems}
          notificationCount={unreadCount}
        />
      </div>
    </div>
  )
}

function BottomTabBar({
  activeTab,
  onTabChange,
  cartItemCount,
  notificationCount,
}: {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  cartItemCount: number
  notificationCount: number
}) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.id === activeTab)
    const activeButton = tabRefs.current[activeIndex]
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft + activeButton.offsetWidth / 2 - 12,
        width: 24,
      })
    }
  }, [activeTab])

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card/95 backdrop-blur-lg border-t border-border safe-bottom z-50">
      <div
        className="absolute top-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out"
        style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
      />

      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const showCartBadge = tab.id === "cart" && cartItemCount > 0
          const showNotifBadge = tab.id === "notifications" && notificationCount > 0

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-1 min-h-[44px] min-w-[56px] rounded-xl transition-all duration-200 active:scale-95 ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 transition-all duration-200 ${isActive ? "scale-110" : ""}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {showCartBadge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center px-1 animate-in zoom-in-50 duration-200">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
                {showNotifBadge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center px-1 animate-in zoom-in-50 duration-200">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </div>
              <span className={`text-[9px] font-medium transition-all duration-200 ${isActive ? "font-semibold" : ""}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

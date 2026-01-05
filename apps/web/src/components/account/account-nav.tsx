"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Package,
  Settings,
  LogOut,
  LayoutDashboard,
  Palette,
  PlusCircle,
  BarChart3,
  Heart,
  Star,
  MessageSquare,
  Home,
} from "lucide-react"
import { useAuth } from "@/lib/store/auth"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const buyerNavItems = [
  { name: "Обзор", href: "/account", icon: LayoutDashboard },
  { name: "Заказы", href: "/account/orders", icon: Package },
  { name: "Избранное", href: "/account/favorites", icon: Heart },
  { name: "Настройки", href: "/account/settings", icon: Settings },
]

const craftsmanNavItems = [
  { name: "Панель мастера", href: "/account", icon: LayoutDashboard },
  { name: "Мои изделия", href: "/account/products", icon: Palette },
  { name: "Добавить изделие", href: "/account/products/new", icon: PlusCircle },
  { name: "Статистика", href: "/account/analytics", icon: BarChart3 },
  { name: "Отзывы", href: "/account/reviews", icon: Star },
  { name: "Сообщения", href: "/account/messages", icon: MessageSquare, badge: 3 },
  { name: "Настройки", href: "/account/settings", icon: Settings },
]

export function AccountNav() {
  const pathname = usePathname()
  const { logout, user, isCraftsman, switchRole } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navItems = isCraftsman ? craftsmanNavItems : buyerNavItems

  return (
    <nav className="space-y-1">
      <Link
        href="/"
        className="flex items-center gap-3 rounded-md px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Home className="h-4 w-4" />
        На главную
      </Link>

      <Separator className="my-3" />

      {/* Role indicator */}
      <div className="mb-4 rounded-lg border border-border bg-muted/30 p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Режим:</span>
          <Badge variant={isCraftsman ? "default" : "secondary"}>{isCraftsman ? "Мастер" : "Покупатель"}</Badge>
        </div>
        {user && (
          <button
            onClick={() => switchRole(isCraftsman ? "buyer" : "craftsman")}
            className="mt-2 w-full text-xs text-primary hover:underline"
          >
            Переключить на {isCraftsman ? "покупателя" : "мастера"}
          </button>
        )}
      </div>

      <Separator className="my-3" />

      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-between gap-3 rounded-md px-4 py-3 text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4" />
              {item.name}
            </div>
            {item.badge && (
              <Badge variant={isActive ? "secondary" : "default"} className="h-5 min-w-5 justify-center text-xs">
                {item.badge}
              </Badge>
            )}
          </Link>
        )
      })}

      <Separator className="my-3" />

      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOut className="h-4 w-4" />
        Выйти
      </button>
    </nav>
  )
}

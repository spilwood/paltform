"use client"

import { useAuth } from "@/lib/store/auth"
import { useOrders } from "@/lib/store/orders"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AccountNav } from "@/components/account/account-nav"
import { OrderCard } from "@/components/orders/order-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package } from "lucide-react"

export default function OrdersPage() {
  const { isAuthenticated } = useAuth()
  const { orders } = useOrders()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-10 text-3xl font-light tracking-tight">Мои заказы</h1>

      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <AccountNav />
        </aside>

        <div>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-border py-16 text-center">
              <Package className="h-16 w-16 text-muted-foreground/30" />
              <p className="mt-4 text-lg">У вас пока нет заказов</p>
              <p className="mt-1 text-sm text-muted-foreground">Добавьте товары в корзину и оформите первый заказ</p>
              <Button className="mt-6 rounded-none" asChild>
                <Link href="/spily">Перейти в каталог</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

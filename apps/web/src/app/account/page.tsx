"use client"

import { useAuth } from "@/lib/store/auth"
import { useOrders } from "@/lib/store/orders"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AccountNav } from "@/components/account/account-nav"
import { BuyerDashboard } from "@/components/account/buyer-dashboard"
import { CraftsmanDashboard } from "@/components/account/craftsman-dashboard"

export default function AccountPage() {
  const { user, isAuthenticated, isCraftsman } = useAuth()
  const { orders } = useOrders()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 text-3xl font-light tracking-tight">{isCraftsman ? "Панель мастера" : "Личный кабинет"}</h1>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <AccountNav />
        </aside>

        <div>
          {isCraftsman ? <CraftsmanDashboard user={user} /> : <BuyerDashboard user={user} orders={orders} />}

          {/* Mobile Nav */}
          <div className="mt-10 lg:hidden">
            <AccountNav />
          </div>
        </div>
      </div>
    </main>
  )
}

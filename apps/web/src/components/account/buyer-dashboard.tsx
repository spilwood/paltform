"use client"

import { Package, ShoppingBag, ArrowRight, Heart, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@spilwood/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@spilwood/ui"
import { Badge } from "@spilwood/ui"
import { Avatar, AvatarFallback, AvatarImage } from "@spilwood/ui"
import type { User } from "@/lib/store/auth"
import type { Order } from "@/lib/store/orders"

interface BuyerDashboardProps {
  user: User
  orders: Order[]
}

export function BuyerDashboard({ user, orders }: BuyerDashboardProps) {
  const recentOrders = orders.slice(0, 3)
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0)

  // Mock favorites for demo
  const favorites = [
    { id: 1, name: "Спил дуба 30 см", price: 1200, image: "/oak-wood-slice.jpg" },
    { id: 2, name: "Спил берёзы 25 см", price: 800, image: "/birch-wood-slice.jpg" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card>
        <CardContent className="flex items-center gap-6 p-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {user.fullName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-medium">Добро пожаловать, {user.fullName}!</h2>
            <p className="mt-1 text-muted-foreground">{user.email}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Клиент с {new Date(user.createdAt).toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/account/settings">Редактировать профиль</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{orders.length}</p>
              <p className="text-sm text-muted-foreground">Заказов</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{totalSpent.toLocaleString("ru-RU")} ₽</p>
              <p className="text-sm text-muted-foreground">Сумма покупок</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{favorites.length}</p>
              <p className="text-sm text-muted-foreground">В избранном</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">5%</p>
              <p className="text-sm text-muted-foreground">Скидка</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg">Последние заказы</CardTitle>
              <CardDescription>История ваших покупок</CardDescription>
            </div>
            {orders.length > 0 && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/account/orders" className="flex items-center gap-1">
                  Все заказы
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">У вас пока нет заказов</p>
                <Button className="mt-4" size="sm" asChild>
                  <Link href="/spily">Перейти в каталог</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.total.toLocaleString("ru-RU")} ₽</p>
                      <Badge variant="secondary" className="mt-1">
                        {order.status === "pending"
                          ? "В обработке"
                          : order.status === "completed"
                            ? "Завершён"
                            : "Отменён"}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Favorites */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg">Избранное</CardTitle>
              <CardDescription>Товары, которые вам понравились</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/account/favorites" className="flex items-center gap-1">
                Все товары
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <Heart className="h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">Пока нет избранных товаров</p>
                <Button className="mt-4" size="sm" asChild>
                  <Link href="/spily">Посмотреть каталог</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.price.toLocaleString("ru-RU")} ₽</p>
                    </div>
                    <Button size="sm">В корзину</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <Button variant="outline" className="h-auto flex-col gap-2 p-6 bg-transparent" asChild>
              <Link href="/spily">
                <ShoppingBag className="h-6 w-6" />
                <span>Каталог спилов</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6 bg-transparent" asChild>
              <Link href="/zakaz">
                <Package className="h-6 w-6" />
                <span>Индивидуальный заказ</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6 bg-transparent" asChild>
              <Link href="/kontakty">
                <Heart className="h-6 w-6" />
                <span>Связаться с нами</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import {
  Package,
  Eye,
  MessageSquare,
  TrendingUp,
  Star,
  Plus,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useAuth, type User } from "@/lib/store/auth"

interface CraftsmanDashboardProps {
  user: User
}

export function CraftsmanDashboard({ user }: CraftsmanDashboardProps) {
  const { craftsmanProducts } = useAuth()

  // Mock statistics for demo
  const stats = {
    totalViews: 1250,
    viewsChange: 12,
    totalSales: craftsmanProducts.length * 3,
    salesChange: 8,
    totalRevenue: 45600,
    revenueChange: 15,
    averageRating: user.rating || 4.8,
    reviewsCount: user.reviewsCount || 24,
  }

  const recentInquiries = [
    { id: 1, customer: "Анна М.", product: "Часы из дуба", date: "2 часа назад", status: "new" },
    { id: 2, customer: "Пётр К.", product: "Спил берёзы 40 см", date: "5 часов назад", status: "read" },
    { id: 3, customer: "Елена В.", product: "Сервировочная доска", date: "Вчера", status: "replied" },
  ]

  const profileCompleteness = () => {
    let complete = 0
    if (user.fullName) complete += 20
    if (user.workshopName) complete += 20
    if (user.bio) complete += 20
    if (user.location) complete += 20
    if (user.specializations && user.specializations.length > 0) complete += 20
    return complete
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                {user.fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-medium">{user.workshopName || user.fullName}</h2>
                {user.verified && (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Проверено
                  </Badge>
                )}
              </div>
              {user.location && <p className="mt-1 text-muted-foreground">{user.location}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                {user.specializations?.map((spec) => (
                  <Badge key={spec} variant="outline">
                    {spec}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{stats.averageRating}</span>
                  <span className="text-muted-foreground">({stats.reviewsCount} отзывов)</span>
                </div>
                <div className="text-muted-foreground">{stats.totalSales} продаж</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <Button asChild>
                <Link href="/account/products/new" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Добавить изделие
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/account/settings">Редактировать профиль</Link>
              </Button>
            </div>
          </div>

          {/* Profile completeness */}
          {profileCompleteness() < 100 && (
            <>
              <Separator className="my-6" />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Заполненность профиля
                  </span>
                  <span className="font-medium">{profileCompleteness()}%</span>
                </div>
                <Progress value={profileCompleteness()} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Заполните профиль полностью, чтобы повысить доверие покупателей
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${stats.viewsChange >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {stats.viewsChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {Math.abs(stats.viewsChange)}%
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold">{stats.totalViews.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Просмотров за месяц</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${stats.salesChange >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {stats.salesChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {Math.abs(stats.salesChange)}%
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold">{stats.totalSales}</p>
            <p className="text-sm text-muted-foreground">Продаж за месяц</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${stats.revenueChange >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {stats.revenueChange >= 0 ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {Math.abs(stats.revenueChange)}%
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold">{stats.totalRevenue.toLocaleString()} ₽</p>
            <p className="text-sm text-muted-foreground">Выручка за месяц</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <Badge>3 новых</Badge>
            </div>
            <p className="mt-4 text-2xl font-semibold">{recentInquiries.length}</p>
            <p className="text-sm text-muted-foreground">Запросов</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* My Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg">Мои изделия</CardTitle>
              <CardDescription>{craftsmanProducts.length} товаров в каталоге</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/account/products" className="flex items-center gap-1">
                Все изделия
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {craftsmanProducts.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">Пока нет добавленных изделий</p>
                <Button className="mt-4" size="sm" asChild>
                  <Link href="/account/products/new" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Добавить первое изделие
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {craftsmanProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.price.toLocaleString()} ₽</p>
                    </div>
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        {product.views}
                      </div>
                      <Badge variant={product.inStock ? "secondary" : "outline"} className="mt-1">
                        {product.inStock ? "В наличии" : "Нет в наличии"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg">Последние запросы</CardTitle>
              <CardDescription>Сообщения от покупателей</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/account/messages" className="flex items-center gap-1">
                Все сообщения
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{inquiry.customer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{inquiry.customer}</p>
                      <p className="text-sm text-muted-foreground">{inquiry.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{inquiry.date}</p>
                    <Badge
                      variant={
                        inquiry.status === "new" ? "default" : inquiry.status === "read" ? "secondary" : "outline"
                      }
                      className="mt-1"
                    >
                      {inquiry.status === "new" ? "Новое" : inquiry.status === "read" ? "Прочитано" : "Отвечено"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 p-6 bg-transparent" asChild>
              <Link href="/account/products/new">
                <Plus className="h-6 w-6" />
                <span>Добавить изделие</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6 bg-transparent" asChild>
              <Link href="/account/analytics">
                <BarChart3 className="h-6 w-6" />
                <span>Статистика</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6 bg-transparent" asChild>
              <Link href="/account/messages">
                <MessageSquare className="h-6 w-6" />
                <span>Сообщения</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6 bg-transparent" asChild>
              <Link href="/account/settings">
                <Star className="h-6 w-6" />
                <span>Настроить профиль</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

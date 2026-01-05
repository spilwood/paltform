"use client"

import { useAuth } from "@/lib/store/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AccountNav } from "@/components/account/account-nav"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  Calendar,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for analytics
const viewsData = [
  { date: "1 мая", views: 245, clicks: 89, orders: 12 },
  { date: "8 мая", views: 312, clicks: 124, orders: 18 },
  { date: "15 мая", views: 428, clicks: 156, orders: 24 },
  { date: "22 мая", views: 389, clicks: 142, orders: 21 },
  { date: "29 мая", views: 502, clicks: 198, orders: 32 },
  { date: "5 июн", views: 445, clicks: 167, orders: 28 },
  { date: "12 июн", views: 623, clicks: 234, orders: 41 },
]

const revenueData = [
  { month: "Янв", revenue: 45000, orders: 28 },
  { month: "Фев", revenue: 52000, orders: 34 },
  { month: "Мар", revenue: 61000, orders: 42 },
  { month: "Апр", revenue: 48000, orders: 31 },
  { month: "Май", revenue: 72000, orders: 48 },
  { month: "Июн", revenue: 68000, orders: 45 },
]

const productPerformance = [
  { name: "Спилы березы 20-25см", views: 1240, orders: 86, revenue: 129000 },
  { name: "Пеньки сосны 30-40см", views: 980, orders: 64, revenue: 96000 },
  { name: "Спилы сосны 15-20см", views: 745, orders: 52, revenue: 62400 },
  { name: "Декоративные спилы", views: 623, orders: 41, revenue: 51200 },
]

const categoryData = [
  { name: "Спилы березы", value: 42, color: "#f59e0b" },
  { name: "Спилы сосны", value: 28, color: "#10b981" },
  { name: "Пеньки", value: 20, color: "#3b82f6" },
  { name: "Декор", value: 10, color: "#8b5cf6" },
]

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
}: {
  title: string
  value: string | number
  change: string
  icon: any
  trend: "up" | "down"
}) => (
  <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight">{value}</h3>
        <div className="mt-2 flex items-center gap-1">
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{change}</span>
          <span className="text-sm text-muted-foreground">vs прошлый месяц</span>
        </div>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </div>
)

export default function AnalyticsPage() {
  const { user, isAuthenticated, isCraftsman } = useAuth()
  const router = useRouter()
  const [dateRange, setDateRange] = useState("30d")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account/login")
    } else if (!isCraftsman) {
      router.push("/account")
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated, isCraftsman, router])

  if (!isAuthenticated || !user || !isCraftsman || isLoading) {
    return null
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Аналитика</h1>
          <p className="mt-2 text-sm text-muted-foreground">Отслеживайте производительность ваших изделий и продаж</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Последние 7 дней</SelectItem>
              <SelectItem value="30d">Последние 30 дней</SelectItem>
              <SelectItem value="90d">Последние 90 дней</SelectItem>
              <SelectItem value="1y">Последний год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <AccountNav />
        </aside>

        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Просмотры" value="3,847" change="+23.4%" icon={Eye} trend="up" />
            <StatCard title="Выручка" value="₽284,600" change="+18.2%" icon={DollarSign} trend="up" />
            <StatCard title="Заказы" value="142" change="+12.8%" icon={ShoppingCart} trend="up" />
            <StatCard title="Конверсия" value="3.69%" change="-2.1%" icon={TrendingUp} trend="down" />
          </div>

          {/* Views & Orders Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Обзор активности</CardTitle>
                  <CardDescription className="mt-2">Просмотры, клики и заказы за выбранный период</CardDescription>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="text-sm text-muted-foreground">Просмотры</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">Клики</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-sm text-muted-foreground">Заказы</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={viewsData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    className="text-xs text-muted-foreground"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis className="text-xs text-muted-foreground" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#f59e0b" fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="clicks" stroke="#10b981" fillOpacity={1} fill="url(#colorClicks)" />
                  <Area type="monotone" dataKey="orders" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOrders)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue & Category Distribution */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Выручка по месяцам</CardTitle>
                <CardDescription className="mt-2">Динамика дохода за последние 6 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any) => [`₽${value.toLocaleString()}`, "Выручка"]}
                    />
                    <Bar dataKey="revenue" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Распределение по категориям</CardTitle>
                <CardDescription className="mt-2">Доля продаж по типам изделий</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <ResponsiveContainer width="50%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    {categoryData.map((category) => (
                      <div key={category.name} className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="text-sm text-muted-foreground">{category.name}</span>
                        </div>
                        <span className="text-sm font-medium">{category.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Performance Table */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Производительность изделий</CardTitle>
              <CardDescription className="mt-2">Топ продуктов по просмотрам и продажам</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productPerformance.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex flex-col gap-4 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.views.toLocaleString()} просмотров</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Заказы</p>
                        <p className="text-xl font-semibold">{product.orders}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Выручка</p>
                        <p className="text-xl font-semibold">₽{product.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Конверсия</p>
                        <p className="text-xl font-semibold">{((product.orders / product.views) * 100).toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Insights */}
          <div className="grid gap-6 sm:grid-cols-3">
            <Card className="border-0 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-amber-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Новые клиенты</p>
                    <p className="text-2xl font-semibold">89</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Heart className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">В избранное</p>
                    <p className="text-2xl font-semibold">234</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Всего изделий</p>
                    <p className="text-2xl font-semibold">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="mt-10 lg:hidden">
        <AccountNav />
      </div>
    </main>
  )
}

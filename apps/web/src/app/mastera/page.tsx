import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { WorkCard } from "@/components/masters/work-card"
import { MasterCard } from "@/components/masters/master-card"
import { Button } from "@spilwood/ui"
import { Card, CardContent } from "@spilwood/ui"
import { Badge } from "@spilwood/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@spilwood/ui"
import { Separator } from "@spilwood/ui"
import { ArrowRight, Users, Eye, TrendingUp, Sparkles, Clock, UtensilsCrossed, Palette, LayoutGrid } from "lucide-react"
import { masters, masterWorks, getMasterForWork, getAllWorkCategories } from "@/lib/data/masters"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Работы мастеров — изделия из спилов дерева | Spilwood",
  description:
    "Изделия от мастеров, созданные из спилов Spilwood. Часы, сервировочные доски, декор и другие уникальные работы ручной работы.",
}

const categoryIcons: Record<string, React.ElementType> = {
  clocks: Clock,
  boards: UtensilsCrossed,
  decor: Palette,
  other: LayoutGrid,
}

export default function MasteraPage() {
  const categories = getAllWorkCategories()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <Breadcrumbs items={[{ label: "Работы мастеров" }]} />

            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Badge variant="secondary" className="mb-4">
                  <Sparkles className="mr-1.5 h-3 w-3" />
                  Сообщество мастеров
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Работы мастеров</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Уникальные изделия от талантливых мастеров, созданные из натуральных спилов Spilwood.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6 md:gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold">{masters.length}</p>
                  <p className="text-sm text-muted-foreground">Мастеров</p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <p className="text-2xl font-bold">{masterWorks.length}</p>
                  <p className="text-sm text-muted-foreground">Работ</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 via-background to-primary/5">
            <CardContent className="p-0">
              <div className="flex flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-10">
                <div className="flex-1">
                  <Badge variant="outline" className="mb-3">
                    Для мастеров
                  </Badge>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Покупайте спилы — продавайте изделия через наш сайт
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                      { icon: Eye, label: "Дополнительный трафик" },
                      { icon: TrendingUp, label: "Доверие к материалу" },
                      { icon: Users, label: "SEO-видимость" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button size="lg" className="shrink-0" asChild>
                  <Link href="/mastera/prisoedinyaysya">
                    Присоединиться
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <section className="mt-16">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Все работы</h2>
                <p className="mt-1 text-sm text-muted-foreground">Фильтруйте по категориям</p>
              </div>
            </div>

            <Tabs defaultValue="all" className="mt-6">
              <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-full border border-border bg-background px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Все
                  <Badge variant="secondary" className="ml-2">
                    {masterWorks.length}
                  </Badge>
                </TabsTrigger>
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.slug] || LayoutGrid
                  const count = masterWorks.filter((w) => w.category === cat.slug).length
                  return (
                    <TabsTrigger
                      key={cat.slug}
                      value={cat.slug}
                      className="rounded-full border border-border bg-background px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {cat.name}
                      <Badge variant="secondary" className="ml-2">
                        {count}
                      </Badge>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              <TabsContent value="all" className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {masterWorks.map((work) => {
                    const master = getMasterForWork(work)
                    if (!master) return null
                    return <WorkCard key={work.id} work={work} master={master} />
                  })}
                </div>
              </TabsContent>

              {categories.map((cat) => (
                <TabsContent key={cat.slug} value={cat.slug} className="mt-8">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {masterWorks
                      .filter((w) => w.category === cat.slug)
                      .map((work) => {
                        const master = getMasterForWork(work)
                        if (!master) return null
                        return <WorkCard key={work.id} work={work} master={master} />
                      })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <section className="mt-20">
            <Separator className="mb-12" />
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="outline" className="mb-3">
                  <Users className="mr-1.5 h-3 w-3" />
                  Наши мастера
                </Badge>
                <h2 className="text-xl font-semibold">Мастера, работающие с нами</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Талантливые люди, создающие уникальные изделия из спилов Spilwood
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {masters.map((master) => (
                <MasterCard key={master.id} master={master} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

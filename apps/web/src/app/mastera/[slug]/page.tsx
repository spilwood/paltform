import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { WorkCard } from "@/components/masters/work-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, MessageCircle } from "lucide-react"
import { masters, getMasterBySlug, getMasterWorks } from "@/lib/data/masters"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface MasterPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: MasterPageProps): Promise<Metadata> {
  const { slug } = await params
  const master = getMasterBySlug(slug)
  if (!master) return { title: "Мастер не найден" }

  return {
    title: `${master.name} — работы мастера | Spilwood`,
    description: master.bio,
  }
}

export async function generateStaticParams() {
  return masters.map((master) => ({ slug: master.slug }))
}

export default async function MasterPage({ params }: MasterPageProps) {
  const { slug } = await params
  const master = getMasterBySlug(slug)

  if (!master) notFound()

  const works = getMasterWorks(master.id)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[{ label: "Работы мастеров", href: "/mastera" }, { label: master.name }]} />

          {/* Master Profile Header */}
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={master.avatar || "/placeholder.svg"} alt={master.name} />
              <AvatarFallback className="text-2xl">{master.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold">{master.name}</h1>
                <Badge variant="secondary">Использует Spilwood</Badge>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {master.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {master.worksCount} работ
                </span>
              </div>

              <p className="mt-4 max-w-2xl text-muted-foreground">{master.bio}</p>
            </div>

            {master.contactUrl && (
              <Button asChild>
                <a href={master.contactUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Связаться
                </a>
              </Button>
            )}
          </div>

          {/* Master Works */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">Работы мастера</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {works.map((work) => (
                <WorkCard key={work.id} work={work} master={master} />
              ))}
            </div>

            {works.length === 0 && (
              <p className="mt-6 text-center text-muted-foreground">У этого мастера пока нет опубликованных работ</p>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

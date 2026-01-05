import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ProductGallery } from "@/components/product/product-gallery"
import { WorkCard } from "@/components/masters/work-card"
import { Avatar, AvatarFallback, AvatarImage } from "@spilwood/ui"
import { Badge } from "@spilwood/ui"
import { Button } from "@spilwood/ui"
import { Card, CardContent } from "@spilwood/ui"
import { Separator } from "@spilwood/ui"
import { MessageCircle, ExternalLink } from "lucide-react"
import { masterWorks, getWorkBySlug, getMasterForWork, getMasterWorks } from "@/lib/data/masters"
import { getProductBySlug } from "@/lib/data/products"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface WorkPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const work = getWorkBySlug(slug)
  if (!work) return { title: "Работа не найдена" }

  return {
    title: `${work.title} — купить изделие из дерева | Spilwood`,
    description: work.description,
  }
}

export async function generateStaticParams() {
  return masterWorks.map((work) => ({ slug: work.slug }))
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params
  const work = getWorkBySlug(slug)

  if (!work) notFound()

  const master = getMasterForWork(work)
  if (!master) notFound()

  const otherWorks = getMasterWorks(master.id)
    .filter((w) => w.id !== work.id)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: "Работы мастеров", href: "/mastera" },
              { label: master.name, href: `/mastera/${master.slug}` },
              { label: work.title },
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Gallery */}
            <ProductGallery images={work.images} productName={work.title} />

            {/* Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary">{work.categoryName}</Badge>
                <h1 className="mt-4 text-3xl font-bold tracking-tight">{work.title}</h1>
              </div>

              <div className="text-4xl font-bold text-primary">{work.price.toLocaleString("ru-RU")} ₽</div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="mb-2 font-semibold">Описание</h2>
                <p className="leading-relaxed text-muted-foreground">{work.description}</p>
              </div>

              {/* Used Materials */}
              <div>
                <h2 className="mb-3 font-semibold">Использованные материалы Spilwood</h2>
                <div className="flex flex-wrap gap-2">
                  {work.usedMaterials.map((material) => (
                    <Link
                      key={material.productId}
                      href={`/spily/bereza/${getProductBySlug(material.productName)?.slug || ""}`}
                    >
                      <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        {material.productName}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Master Info */}
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={master.avatar || "/placeholder.svg"} alt={master.name} />
                    <AvatarFallback>{master.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link href={`/mastera/${master.slug}`} className="font-semibold hover:text-primary">
                      {master.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{master.location}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Использует Spilwood
                  </Badge>
                </CardContent>
              </Card>

              {/* CTA */}
              {work.contactUrl && (
                <Button size="lg" className="w-full" asChild>
                  <a href={work.contactUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Купить у мастера
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Other Works by Master */}
          {otherWorks.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold">Другие работы {master.name}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherWorks.map((w) => (
                  <WorkCard key={w.id} work={w} master={master} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

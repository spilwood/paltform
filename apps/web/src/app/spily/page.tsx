import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { products, getAllCategories } from "@/lib/data/products"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { ScrollAnimation } from "@/components/scroll-animation"
import { CollectionJsonLd } from "@/components/seo/collection-json-ld"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld"
import { ProductGrid } from "@/components/catalog/product-grid"

export const metadata: Metadata = {
  title: "Спилы дерева — купить спилы берёзы и сосны | Spilwood",
  description:
    "Каталог спилов дерева от производителя. Спилы берёзы и сосны разных диаметров для декора, мастерских и интерьеров. Доставка по России.",
  openGraph: {
    title: "Спилы дерева — купить спилы берёзы и сосны | Spilwood",
    description: "Каталог спилов дерева от производителя. Берёза и сосна разных диаметров. Доставка по России.",
    type: "website",
    locale: "ru_RU",
    siteName: "Spilwood",
    images: [
      {
        url: "/birch-wood-slices-stacked-natural-white-bark.jpg",
        width: 1200,
        height: 630,
        alt: "Спилы дерева Spilwood",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Спилы дерева — Spilwood",
    description: "Каталог спилов берёзы и сосны от производителя",
    images: ["/birch-wood-slices-stacked-natural-white-bark.jpg"],
  },
  alternates: {
    canonical: "https://spilwood.ru/spily",
  },
}

export default function SpilyPage() {
  const categories = getAllCategories()
  const featuredProducts = products.filter((p) => p.inStock).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <CollectionJsonLd
        name="Спилы дерева"
        description="Каталог спилов дерева от производителя"
        products={featuredProducts}
        url="/spily"
      />
      <BreadcrumbJsonLd items={[{ label: "Спилы" }]} />

      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumbs items={[{ label: "Спилы" }]} />

          <ScrollAnimation animation="fade-up">
            <h1 className="mt-8 text-4xl font-light tracking-tight md:text-5xl">Спилы дерева</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Натуральные спилы берёзы и сосны от производителя. Выберите категорию или посмотрите все товары.
            </p>
          </ScrollAnimation>

          {/* Categories */}
          <section className="mt-16">
            <ScrollAnimation animation="fade-up" delay={100}>
              <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Категории</h2>
            </ScrollAnimation>
            <div className="mt-6 grid gap-px border border-border bg-border md:grid-cols-2">
              {categories
                .filter((c) => c.slug !== "penki")
                .map((category, index) => (
                  <ScrollAnimation key={category.slug} animation="fade-up" delay={150 + index * 50}>
                    <Link
                      href={`/spily/${category.slug}`}
                      className="group flex items-center justify-between bg-background p-8 transition-colors hover:bg-muted/50"
                    >
                      <div>
                        <h3 className="text-lg font-medium">{category.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                  </ScrollAnimation>
                ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="mt-24">
            <ScrollAnimation animation="fade-up">
              <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Популярные спилы</h2>
            </ScrollAnimation>
            <div className="mt-8">
              <ProductGrid products={featuredProducts} columns={4} />
            </div>
          </section>

          {/* SEO Text */}
          <section className="mt-24 border-t border-border pt-16">
            <ScrollAnimation animation="fade-up">
              <h2 className="text-2xl font-light tracking-tight">Спилы дерева для декора и творчества</h2>
              <div className="mt-6 max-w-2xl space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Спилы дерева — универсальный материал для декора и творчества. Из них создают часы, подставки,
                  сервировочные доски, настенные панно и множество других изделий. Каждый спил уникален благодаря
                  природному рисунку годовых колец.
                </p>
                <p className="leading-relaxed">
                  В нашем каталоге представлены спилы берёзы и сосны разных диаметров — от компактных 15 см до крупных
                  40 см. Берёза отличается светлой древесиной и характерной белой корой, сосна — тёплыми оттенками и
                  выраженным рисунком колец.
                </p>
              </div>
            </ScrollAnimation>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

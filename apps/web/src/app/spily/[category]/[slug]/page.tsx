import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductDetails } from "@/components/product/product-details"
import { ProductCard } from "@/components/catalog/product-card"
import { ProductJsonLd } from "@/components/product-json-ld"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld"
import { ProductViewTracker } from "@/components/product/product-view-tracker"
import { InspirationGenerator } from "@/components/ai/inspiration-generator"
import { products, getProductBySlug, getProductsByCategory } from "@/lib/data/products"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug, category } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "Товар не найден" }

  return {
    title: `${product.name} — купить спил дерева | Spilwood`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Spilwood`,
      description: product.description,
      type: "website",
      url: `https://spilwood.ru/spily/${category}/${slug}`,
      images: product.images.map((img) => ({
        url: img,
        width: 800,
        height: 800,
        alt: product.name,
      })),
    },
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params
  const product = getProductBySlug(slug)

  if (!product || product.category !== category) {
    notFound()
  }

  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const categoryName =
    product.category === "bereza" ? "Спилы берёзы" : product.category === "sosna" ? "Спилы сосны" : "Пеньки"

  const breadcrumbItems = [
    { label: "Спилы", href: "/spily" },
    { label: categoryName, href: `/spily/${category}` },
    { label: product.name },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ProductViewTracker product={product} />

      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ProductGallery images={product.images} productName={product.name} />
            <ProductInfo product={product} />
          </div>

          <ProductDetails product={product} />

          <section className="mt-16 rounded-2xl border bg-muted/30 p-6 md:p-8">
            <InspirationGenerator productName={product.name} category={product.category} diameter={product.diameter} />
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-24 border-t border-border pt-16">
              <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Похожие товары</h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
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

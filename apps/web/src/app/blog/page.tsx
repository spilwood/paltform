import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BlogCard } from "@/components/blog/blog-card"
import { blogPosts } from "@/lib/data/blog"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld"

export const metadata: Metadata = {
  title: "Блог о спилах дерева — гайды, идеи и вдохновение | Spilwood",
  description:
    "Статьи о работе с деревом: как выбрать спил, идеи для творчества, гайды по обработке. Вдохновение от мастеров.",
  openGraph: {
    title: "Блог о спилах дерева | Spilwood",
    description: "Гайды, идеи и вдохновение для работы с деревом",
    type: "website",
    locale: "ru_RU",
    siteName: "Spilwood",
    images: [
      {
        url: "/handmade-wooden-crafts-clock-coasters-art.jpg",
        width: 1200,
        height: 630,
        alt: "Блог Spilwood",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Блог Spilwood",
    description: "Гайды и идеи для работы с деревом",
    images: ["/handmade-wooden-crafts-clock-coasters-art.jpg"],
  },
  alternates: {
    canonical: "https://spilwood.ru/blog",
  },
}

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BreadcrumbJsonLd items={[{ label: "Блог" }]} />

      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumbs items={[{ label: "Блог" }]} />

          <h1 className="mt-8 text-4xl font-light tracking-tight md:text-5xl">Блог</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">Гайды, идеи и вдохновение для работы с деревом.</p>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* SEO Text */}
          <section className="mt-24 border-t border-border pt-16">
            <h2 className="text-2xl font-light tracking-tight">О чём наш блог</h2>
            <div className="mt-6 max-w-2xl space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                В блоге Spilwood мы делимся полезными материалами для всех, кто работает с деревом: от новичков до
                опытных мастеров. Публикуем пошаговые гайды по обработке спилов, идеи для творческих проектов.
              </p>
              <p className="leading-relaxed">
                Если вы хотите поделиться своей работой или написать статью для блога — свяжитесь с нами.
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

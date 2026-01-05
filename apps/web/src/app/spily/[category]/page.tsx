import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductsByCategory, getAllCategories } from "@/lib/data/products"
import { CategoryPageClient } from "./category-page-client"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

const categoryMeta: Record<string, { title: string; description: string; h1: string }> = {
  bereza: {
    title: "Спилы берёзы — купить спил берёзы от производителя | Spilwood",
    description:
      "Спилы берёзы разных диаметров от 15 до 40 см. Светлая древесина с характерной белой корой. Производство в Тверской области.",
    h1: "Спилы берёзы",
  },
  sosna: {
    title: "Спилы сосны — купить спил сосны от производителя | Spilwood",
    description:
      "Спилы сосны с выраженными годовыми кольцами. Тёплые оттенки древесины. Разные размеры для декора и творчества.",
    h1: "Спилы сосны",
  },
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const meta = categoryMeta[category]
  if (!meta) return {}
  return {
    title: meta.title,
    description: meta.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const meta = categoryMeta[category]

  if (!meta) notFound()

  const products = getProductsByCategory(category)
  const categoryInfo = getAllCategories().find((c) => c.slug === category)

  return (
    <CategoryPageClient
      category={category}
      meta={meta}
      products={products}
      categoryDescription={categoryInfo?.description}
    />
  )
}

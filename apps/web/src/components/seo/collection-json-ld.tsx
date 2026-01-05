import type { Product } from "@/lib/data/products"

interface CollectionJsonLdProps {
  name: string
  description: string
  products: Product[]
  url: string
  baseUrl?: string
}

export function CollectionJsonLd({
  name,
  description,
  products,
  url,
  baseUrl = "https://spilwood.ru",
}: CollectionJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${baseUrl}${url}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          url: `${baseUrl}/spily/${product.category}/${product.slug}`,
          image: product.images[0] ? `${baseUrl}${product.images[0]}` : undefined,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "RUB",
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        },
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

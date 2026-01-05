import type { Product } from "@/lib/data/products"

interface ProductJsonLdProps {
  product: Product
  baseUrl?: string
}

export function ProductJsonLd({ product, baseUrl = "https://spilwood.ru" }: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => `${baseUrl}${img}`),
    sku: product.id,
    mpn: `SPW-${product.category.toUpperCase()}-${product.diameter}`,
    brand: {
      "@type": "Brand",
      name: "Spilwood",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/spily/${product.category}/${product.slug}`,
      priceCurrency: "RUB",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "RUB",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "RU",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 14,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "RU",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      seller: {
        "@type": "Organization",
        name: "Spilwood",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Диаметр",
        value: `${product.diameter} см`,
      },
      {
        "@type": "PropertyValue",
        name: "Толщина",
        value: `${product.thickness} см`,
      },
      {
        "@type": "PropertyValue",
        name: "Порода дерева",
        value: product.category === "bereza" ? "Берёза" : product.category === "sosna" ? "Сосна" : "Берёза",
      },
      {
        "@type": "PropertyValue",
        name: "Материал",
        value: "Натуральное дерево",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

interface ArticleJsonLdProps {
  title: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
  url: string
  baseUrl?: string
}

export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = "Spilwood",
  url,
  baseUrl = "https://spilwood.ru",
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ? `${baseUrl}${image}` : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Spilwood",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}${url}`,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

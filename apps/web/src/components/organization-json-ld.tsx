interface OrganizationJsonLdProps {
  baseUrl?: string
}

export function OrganizationJsonLd({ baseUrl = "https://spilwood.ru" }: OrganizationJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Spilwood",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Производство спилов дерева в Тверской области. Готовые спилы для декора, мастерских и интерьеров. Доставка по России.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Зубцовский район",
      addressRegion: "Тверская область",
      addressCountry: "RU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://t.me/spilwood_bot",
    },
    sameAs: ["https://t.me/spilwood_bot"],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

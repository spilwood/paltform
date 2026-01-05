interface LocalBusinessJsonLdProps {
  baseUrl?: string
}

export function LocalBusinessJsonLd({ baseUrl = "https://spilwood.ru" }: LocalBusinessJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#business`,
    name: "Spilwood",
    description: "Производство и продажа спилов дерева в Тверской области",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/wood-workshop-crafting-table-with-slices.jpg`,
    telephone: "+7 (000) 000-00-00",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Зубцовский район",
      addressLocality: "Зубцов",
      addressRegion: "Тверская область",
      postalCode: "172333",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 56.1767,
      longitude: 34.5833,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "₽₽",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    areaServed: {
      "@type": "Country",
      name: "Russia",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

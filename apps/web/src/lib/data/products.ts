export interface Product {
  id: string
  name: string
  slug: string
  category: "bereza" | "sosna" | "penki"
  categoryName: string
  diameter: number
  thickness: number
  price: number
  inStock: boolean
  images: string[]
  description: string
  usage: string[]
  ozonUrl: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Спил берёзы 15 см",
    slug: "spil-berezy-15cm",
    category: "bereza",
    categoryName: "Спилы берёзы",
    diameter: 15,
    thickness: 2,
    price: 150,
    inStock: true,
    images: ["/products/birch-15-1.jpg", "/products/birch-15-2.jpg"],
    description:
      "Натуральный спил берёзы диаметром 15 см. Идеален для подставок под кружки, небольших декоративных элементов и творческих проектов.",
    usage: ["Подставки под кружки", "Декор для стола", "Основа для росписи", "Свадебный декор"],
    ozonUrl: "https://ozon.ru",
  },
  {
    id: "2",
    name: "Спил берёзы 20 см",
    slug: "spil-berezy-20cm",
    category: "bereza",
    categoryName: "Спилы берёзы",
    diameter: 20,
    thickness: 2,
    price: 250,
    inStock: true,
    images: ["/products/birch-20-1.jpg", "/products/birch-20-2.jpg"],
    description: "Спил берёзы среднего размера. Подходит для создания часов, сервировочных досок и настенного декора.",
    usage: ["Основа для часов", "Сервировочная доска", "Настенный декор", "Фотофон"],
    ozonUrl: "https://ozon.ru",
  },
  {
    id: "3",
    name: "Спил берёзы 30 см",
    slug: "spil-berezy-30cm",
    category: "bereza",
    categoryName: "Спилы берёзы",
    diameter: 30,
    thickness: 3,
    price: 450,
    inStock: true,
    images: ["/products/birch-30-1.jpg", "/products/birch-30-2.jpg"],
    description:
      "Крупный спил берёзы для масштабных проектов. Отличная основа для столешниц, больших часов и художественных работ.",
    usage: ["Столешница", "Большие часы", "Художественное панно", "Поднос"],
    ozonUrl: "https://ozon.ru",
  },
  {
    id: "4",
    name: "Спил берёзы 40 см",
    slug: "spil-berezy-40cm",
    category: "bereza",
    categoryName: "Спилы берёзы",
    diameter: 40,
    thickness: 4,
    price: 750,
    inStock: false,
    images: ["/products/birch-40-1.jpg", "/products/birch-40-2.jpg"],
    description: "Большой спил берёзы премиум-класса. Редкий размер для эксклюзивных интерьерных решений.",
    usage: ["Журнальный столик", "Панно для интерьера", "Основа для эпоксидной смолы"],
    ozonUrl: "https://ozon.ru",
  },
  {
    id: "5",
    name: "Спил сосны 15 см",
    slug: "spil-sosny-15cm",
    category: "sosna",
    categoryName: "Спилы сосны",
    diameter: 15,
    thickness: 2,
    price: 120,
    inStock: true,
    images: ["/products/pine-15-1.jpg", "/products/pine-15-2.jpg"],
    description: "Тёплый спил сосны с выраженными годовыми кольцами. Красивая текстура для декора и творчества.",
    usage: ["Подставки", "Декор", "Роспись", "Выжигание"],
    ozonUrl: "https://ozon.ru",
  },
  {
    id: "6",
    name: "Спил сосны 25 см",
    slug: "spil-sosny-25cm",
    category: "sosna",
    categoryName: "Спилы сосны",
    diameter: 25,
    thickness: 3,
    price: 350,
    inStock: true,
    images: ["/products/pine-25-1.jpg", "/products/pine-25-2.jpg"],
    description: "Спил сосны с насыщенным рисунком годовых колец. Идеален для часов и сервировочных досок.",
    usage: ["Часы", "Сервировка", "Настенный декор", "Табличка"],
    ozonUrl: "https://ozon.ru",
  },
  {
    id: "7",
    name: "Спил сосны 35 см",
    slug: "spil-sosny-35cm",
    category: "sosna",
    categoryName: "Спилы сосны",
    diameter: 35,
    thickness: 4,
    price: 550,
    inStock: true,
    images: ["/products/pine-35-1.jpg", "/products/pine-35-2.jpg"],
    description: "Большой спил сосны для крупных интерьерных проектов и художественных работ.",
    usage: ["Столешница", "Панно", "Поднос", "Арт-объект"],
    ozonUrl: "https://ozon.ru",
  },
  {
    id: "8",
    name: "Пенёк берёзовый 15 см",
    slug: "penek-berezoviy-15cm",
    category: "penki",
    categoryName: "Пеньки",
    diameter: 12,
    thickness: 15,
    price: 350,
    inStock: true,
    images: ["/products/stump-15-1.jpg", "/products/stump-15-2.jpg"],
    description: "Компактный берёзовый пенёк высотой 15 см. Подставка для декора, цветов и свечей.",
    usage: ["Подставка для свечей", "Опора для декора", "Свадебный элемент", "Фотозона"],
    ozonUrl: "https://ozon.ru",
  },
  {
    id: "9",
    name: "Пенёк берёзовый 25 см",
    slug: "penek-berezoviy-25cm",
    category: "penki",
    categoryName: "Пеньки",
    diameter: 15,
    thickness: 25,
    price: 550,
    inStock: true,
    images: ["/products/stump-25-1.jpg", "/products/stump-25-2.jpg"],
    description: "Средний пенёк для интерьерного декора. Может служить подставкой или табуретом.",
    usage: ["Прикроватный столик", "Табурет", "Подставка для растений", "Интерьерный акцент"],
    ozonUrl: "https://ozon.ru",
  },
  {
    id: "10",
    name: "Пенёк берёзовый 30 см",
    slug: "penek-berezoviy-30cm",
    category: "penki",
    categoryName: "Пеньки",
    diameter: 18,
    thickness: 30,
    price: 750,
    inStock: false,
    images: ["/products/stump-30-1.jpg", "/products/stump-30-2.jpg"],
    description: "Высокий пенёк для использования как столик или сиденье. Натуральный рустик-стиль.",
    usage: ["Кофейный столик", "Сиденье", "Подиум для декора", "Фотозона"],
    ozonUrl: "https://ozon.ru",
  },
]

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getAllCategories() {
  return [
    { slug: "bereza", name: "Спилы берёзы", description: "Светлая древесина с характерной корой" },
    { slug: "sosna", name: "Спилы сосны", description: "Тёплые оттенки с выраженными кольцами" },
    { slug: "penki", name: "Пеньки", description: "Декоративные пеньки для интерьера" },
  ]
}

import type { Product } from "./cart-context"

export interface Seller {
  id: string
  name: string
  avatar: string
  rating: number
  totalSales: number
  joinedDate: string
  description: string
  verified: boolean
}

export const sellers: Seller[] = [
  {
    id: "s1",
    name: "Мария Ремесленница",
    avatar: "/woman-craftsperson.jpg",
    rating: 4.9,
    totalSales: 142,
    joinedDate: "2024-03-15",
    description: "Создаю уникальные декоративные изделия из спилов. Доставка через мой Ozon.",
    verified: true,
  },
  {
    id: "s2",
    name: "Дмитрий Мастер",
    avatar: "/man-woodworker.jpg",
    rating: 4.8,
    totalSales: 89,
    joinedDate: "2024-06-20",
    description: "Специализируюсь на мебели и функциональных предметах. Доставка через Ozon.",
    verified: true,
  },
]

export const sellerProducts: Product[] = [
  {
    id: "sp1",
    name: 'Панно из спилов "Лес"',
    price: 2800,
    image: "/birch-wood-slice-wall-art.jpg",
    images: ["/birch-wood-slice-wall-art.jpg"],
    category: "birch",
    description:
      "Декоративное панно ручной работы из натуральных березовых спилов. Каждый элемент тщательно подобран по цвету и текстуре.",
    origin: "Ручная работа, Москва",
    diameter: "40x60 см",
    thickness: "3 см",
    features: ["Готово к подвешиванию", "Покрыто лаком", "Уникальная композиция"],
    rating: 5.0,
    reviewCount: 8,
    popularity: 95,
    addedDate: new Date("2025-11-25"),
    stock: 1,
    reviews: [],
    relatedProducts: ["1", "3"],
    sellerId: "s1",
    sellerName: "Мария Ремесленница",
  },
  {
    id: "sp2",
    name: "Подставки под кружки (4 шт)",
    price: 650,
    image: "/wood-slice-coasters-set.jpg",
    images: ["/wood-slice-coasters-set.jpg"],
    category: "birch",
    description: "Набор из 4 подставок под горячее из березы. Практично и стильно для вашей кухни.",
    origin: "Ручная работа, Санкт-Петербург",
    diameter: "10 см каждая",
    thickness: "1.5 см",
    features: ["Войлочное дно", "Покрыты маслом", "В подарочной упаковке"],
    rating: 4.8,
    reviewCount: 15,
    popularity: 88,
    addedDate: new Date("2025-11-20"),
    stock: 5,
    reviews: [],
    relatedProducts: ["1", "8"],
    sellerId: "s1",
    sellerName: "Мария Ремесленница",
  },
  {
    id: "sp3",
    name: "Журнальный столик из спила",
    price: 8500,
    image: "/wood-coffee-table-with-wood-slices.jpg",
    images: ["/wood-coffee-table-with-wood-slices.jpg"],
    category: "oak",
    description:
      "Уникальный журнальный столик из цельного дубового спила на металлических ножках. Функциональный предмет интерьера.",
    origin: "Ручная работа, Московская обл.",
    diameter: "60 см",
    thickness: "5 см (+ ножки 40 см)",
    features: ["Металлические ножки", "Эпоксидная заливка трещин", "Доставка по Москве"],
    rating: 5.0,
    reviewCount: 6,
    popularity: 92,
    addedDate: new Date("2025-11-18"),
    stock: 2,
    reviews: [],
    relatedProducts: ["6", "7"],
    sellerId: "s2",
    sellerName: "Дмитрий Мастер",
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Береза шлифованная",
    price: 350,
    image: "/polished-birch-wood-slice-with-natural-bark-edge.jpg",
    images: [
      "/polished-birch-wood-slice-with-natural-bark-edge.jpg",
      "/birch-slice-top-view-annual-rings.jpg",
      "/birch-slice-side-profile-bark-detail.jpg",
    ],
    category: "birch",
    description:
      "Идеально отшлифованный спил березы. Подходит для декора, подставок под горячее и творческих проектов.",
    origin: "Подмосковье, Истринский район",
    diameter: "15-20 см",
    thickness: "2-3 см",
    features: ["Ручная шлифовка", "Натуральная кора", "Покрыт льняным маслом"],
    rating: 4.8,
    reviewCount: 24,
    popularity: 95,
    addedDate: new Date("2025-11-01"),
    stock: 3,
    reviews: [
      {
        id: "r1",
        author: "Анна М.",
        rating: 5,
        text: "Отличное качество! Спилы идеально отшлифованы, кора держится крепко. Использую как подставки под кружки.",
        date: "15 ноября 2025",
        photos: [],
      },
      {
        id: "r2",
        author: "Дмитрий К.",
        rating: 4,
        text: "Хорошие спилы, соответствуют описанию. Единственное — хотелось бы чуть больше по диаметру.",
        date: "10 ноября 2025",
        photos: [],
      },
    ],
    relatedProducts: ["3", "8", "5"],
    sellerId: "s1",
    sellerName: "Мария Ремесленница",
  },
  {
    id: "2",
    name: "Пенек интерьерный",
    price: 1200,
    image: "/decorative-wooden-stump-for-interior-design.jpg",
    images: [
      "/decorative-wooden-stump-for-interior-design.jpg",
      "/wooden-stump-with-plant-decoration.jpg",
      "/stump-detail-natural-cracks-texture.jpg",
    ],
    category: "stump",
    description: "Натуральный пенек для интерьера. Отлично подойдет как подставка для растений или предмет декора.",
    origin: "Тверская область",
    diameter: "20-25 см",
    thickness: "25-30 см (высота)",
    features: ["Устойчивое основание", "Обработан антисептиком", "Сухая древесина"],
    rating: 4.9,
    reviewCount: 18,
    popularity: 88,
    addedDate: new Date("2025-10-20"),
    stock: 5,
    reviews: [
      {
        id: "r3",
        author: "Елена С.",
        rating: 5,
        text: "Прекрасный пенек! Очень устойчивый, выглядит стильно. Поставила на него растение — идеально!",
        date: "20 ноября 2025",
        photos: [],
      },
    ],
    relatedProducts: ["7", "1", "4"],
    sellerId: "s2",
    sellerName: "Дмитрий Мастер",
  },
  {
    id: "3",
    name: "Набор спилов (5 шт)",
    price: 800,
    image: "/set-of-five-natural-wood-slices-different-sizes.jpg",
    images: [
      "/set-of-five-natural-wood-slices-different-sizes.jpg",
      "/wood-slices-arranged-on-table.jpg",
      "/single-slice-from-set-close-up.jpg",
    ],
    category: "birch",
    description: "Набор из 5 спилов разного диаметра. Идеально для декора стола или создания композиций.",
    origin: "Подмосковье, Клинский район",
    diameter: "8-15 см",
    thickness: "1.5-2 см",
    features: ["5 штук в наборе", "Разные размеры", "Подобраны по цвету"],
    rating: 4.7,
    reviewCount: 31,
    popularity: 92,
    addedDate: new Date("2025-11-10"),
    stock: 12,
    relatedProducts: ["1", "5", "8"],
    sellerId: "s1",
    sellerName: "Мария Ремесленница",
  },
  {
    id: "4",
    name: "Спил сосны 25см",
    price: 450,
    image: "/large-pine-wood-slice-natural-texture.jpg",
    images: [
      "/large-pine-wood-slice-natural-texture.jpg",
      "/pine-slice-annual-rings-detail.jpg",
      "/pine-slice-resin-pockets-close-up.jpg",
    ],
    category: "pine",
    description: "Крупный спил сосны с красивой текстурой древесины и выраженными годовыми кольцами.",
    origin: "Карелия",
    diameter: "около 25 см",
    thickness: "2-3 см",
    features: ["Выраженная текстура", "Смолистый аромат", "Легкий вес"],
    rating: 4.6,
    reviewCount: 15,
    popularity: 75,
    addedDate: new Date("2025-10-15"),
    stock: 8,
    relatedProducts: ["1", "6", "8"],
    sellerId: "s2",
    sellerName: "Дмитрий Мастер",
  },
  {
    id: "5",
    name: "Мини-спилы (10 шт)",
    price: 400,
    image: "/small-wood-slices-for-crafts-natural.jpg",
    images: [
      "/small-wood-slices-for-crafts-natural.jpg",
      "/mini-slices-with-holes-for-hanging.jpg",
      "/mini-slices-diy-craft-example.jpg",
    ],
    category: "birch",
    description: "Набор из 10 маленьких спилов. Идеально для поделок, подвесок и DIY проектов.",
    origin: "Ярославская область",
    diameter: "4-6 см",
    thickness: "0.8-1 см",
    features: ["10 штук в наборе", "Идеально для DIY", "С отверстием для подвеса"],
    rating: 4.5,
    reviewCount: 42,
    popularity: 85,
    addedDate: new Date("2025-11-05"),
    stock: 25,
    relatedProducts: ["3", "1", "8"],
    sellerId: "s1",
    sellerName: "Мария Ремесленница",
  },
  {
    id: "6",
    name: "Спил дуба премиум",
    price: 1500,
    image: "/premium-oak-wood-slice-dark-grain.jpg",
    images: [
      "/premium-oak-wood-slice-dark-grain.jpg",
      "/oak-slice-grain-pattern-close-up.jpg",
      "/oak-slice-oiled-finish-detail.jpg",
    ],
    category: "oak",
    description: "Премиальный спил дуба с выраженной текстурой. Отшлифован и покрыт натуральным маслом.",
    origin: "Воронежская область",
    diameter: "20-25 см",
    thickness: "3-4 см",
    features: ["Твердая порода", "Премиум качество", "Покрыт датским маслом"],
    rating: 5.0,
    reviewCount: 12,
    popularity: 98,
    addedDate: new Date("2025-11-20"),
    stock: 2,
    relatedProducts: ["1", "4", "7"],
    sellerId: "s2",
    sellerName: "Дмитрий Мастер",
  },
  {
    id: "7",
    name: "Пенек-табурет",
    price: 2500,
    image: "/natural-wood-stump-stool-rustic.jpg",
    images: [
      "/natural-wood-stump-stool-rustic.jpg",
      "/stump-stool-in-living-room-setting.jpg",
      "/stump-stool-top-surface-detail.jpg",
      "/stump-stool-felt-feet-bottom.jpg",
    ],
    category: "stump",
    description: "Функциональный пенек-табурет. Может использоваться как сидение или журнальный столик.",
    origin: "Вологодская область",
    diameter: "30-35 см",
    thickness: "40-45 см (высота)",
    features: ["Выдерживает до 120 кг", "Ровная поверхность", "Войлочные ножки"],
    rating: 4.9,
    reviewCount: 9,
    popularity: 80,
    addedDate: new Date("2025-10-25"),
    stock: 4,
    relatedProducts: ["2", "6", "1"],
    sellerId: "s2",
    sellerName: "Дмитрий Мастер",
  },
  {
    id: "8",
    name: "Спил березы 20см",
    price: 280,
    image: "/medium-birch-wood-slice-white-bark.jpg",
    images: [
      "/medium-birch-wood-slice-white-bark.jpg",
      "/birch-20cm-bark-texture-detail.jpg",
      "/birch-20cm-surface-wood-grain.jpg",
    ],
    category: "birch",
    description: "Классический спил березы с характерной белой корой. Универсальный размер для любых целей.",
    origin: "Новгородская область",
    diameter: "около 20 см",
    thickness: "2 см",
    features: ["Белая кора", "Классика декора", "Сушка 2+ года"],
    rating: 4.7,
    reviewCount: 28,
    popularity: 90,
    addedDate: new Date("2025-11-15"),
    stock: 18,
    relatedProducts: ["1", "3", "5"],
    sellerId: "s1",
    sellerName: "Мария Ремесленница",
  },
]

export const flashSaleProducts = [
  { productId: "6", discount: 20, endsAt: new Date(Date.now() + 3 * 60 * 60 * 1000) }, // 3 hours
  { productId: "2", discount: 15, endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000) }, // 5 hours
]

export const categories = [
  { id: "all", name: "Все" },
  { id: "birch", name: "Береза" },
  { id: "pine", name: "Сосна" },
  { id: "oak", name: "Дуб" },
  { id: "stump", name: "Пеньки" },
]

export function getRelatedProducts(productId: string): Product[] {
  const product = products.find((p) => p.id === productId)
  if (!product?.relatedProducts) return []
  return [...products, ...sellerProducts].filter((p) => product.relatedProducts?.includes(p.id))
}

export function getFlashSaleInfo(productId: string) {
  return flashSaleProducts.find((f) => f.productId === productId)
}

export function getAllProducts(): Product[] {
  return [...products, ...sellerProducts]
}

export function getProductsBySeller(sellerId: string): Product[] {
  return sellerProducts.filter((p) => p.sellerId === sellerId)
}

export function getSeller(sellerId: string): Seller | undefined {
  return sellers.find((s) => s.id === sellerId)
}

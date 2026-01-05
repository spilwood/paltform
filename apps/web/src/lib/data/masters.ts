export interface Master {
  id: string
  name: string
  slug: string
  avatar: string
  bio: string
  location: string
  worksCount: number
  contactUrl?: string
}

export interface MasterWork {
  id: string
  masterId: string
  title: string
  slug: string
  description: string
  price: number
  images: string[]
  usedMaterials: { productId: string; productName: string }[]
  category: "clocks" | "boards" | "decor" | "other"
  categoryName: string
  contactUrl?: string
}

export const masters: Master[] = [
  {
    id: "1",
    name: "Анна Мастерова",
    slug: "anna-masterova",
    avatar: "/masters/anna-avatar.jpg",
    bio: "Создаю уникальные часы и декор из натурального дерева. Каждое изделие — ручная работа с вниманием к деталям.",
    location: "Москва",
    worksCount: 12,
    contactUrl: "https://t.me/example",
  },
  {
    id: "2",
    name: "Иван Столяров",
    slug: "ivan-stolyarov",
    avatar: "/masters/ivan-avatar.jpg",
    bio: "Мастер по дереву с 10-летним опытом. Специализируюсь на сервировочных досках и кухонных аксессуарах.",
    location: "Санкт-Петербург",
    worksCount: 8,
    contactUrl: "https://t.me/example",
  },
  {
    id: "3",
    name: "Елена Декор",
    slug: "elena-decor",
    avatar: "/masters/elena-avatar.jpg",
    bio: "Интерьерный декор из спилов с элементами эпоксидной смолы. Создаю арт-объекты для вашего дома.",
    location: "Екатеринбург",
    worksCount: 15,
    contactUrl: "https://t.me/example",
  },
]

export const masterWorks: MasterWork[] = [
  {
    id: "1",
    masterId: "1",
    title: "Часы из спила берёзы «Рассвет»",
    slug: "chasy-rassvet",
    description:
      "Настенные часы из натурального спила берёзы диаметром 30 см. Бесшумный механизм, золотые стрелки. Покрыты датским маслом.",
    price: 3500,
    images: ["/works/clock-1.jpg", "/works/clock-1-2.jpg"],
    usedMaterials: [{ productId: "3", productName: "Спил берёзы 30 см" }],
    category: "clocks",
    categoryName: "Часы",
    contactUrl: "https://t.me/example",
  },
  {
    id: "2",
    masterId: "1",
    title: "Часы из сосны с выжиганием",
    slug: "chasy-sosna-vyzhiganie",
    description:
      "Часы ручной работы с авторским рисунком, выполненным выжиганием. Диаметр 25 см. Уникальный дизайн с лесным пейзажем.",
    price: 4200,
    images: ["/works/clock-2.jpg", "/works/clock-2-2.jpg"],
    usedMaterials: [{ productId: "6", productName: "Спил сосны 25 см" }],
    category: "clocks",
    categoryName: "Часы",
    contactUrl: "https://t.me/example",
  },
  {
    id: "3",
    masterId: "2",
    title: "Сервировочная доска «Классика»",
    slug: "doska-klassika",
    description:
      "Круглая сервировочная доска из спила берёзы. Идеальна для подачи сыра, закусок и десертов. Покрыта пищевым маслом.",
    price: 1800,
    images: ["/works/board-1.jpg", "/works/board-1-2.jpg"],
    usedMaterials: [{ productId: "2", productName: "Спил берёзы 20 см" }],
    category: "boards",
    categoryName: "Сервировка",
    contactUrl: "https://t.me/example",
  },
  {
    id: "4",
    masterId: "2",
    title: "Набор подставок под горячее",
    slug: "nabor-podstavok",
    description:
      "Комплект из 6 подставок под кружки из спилов берёзы. Диаметр 10-12 см. Обработаны и готовы к использованию.",
    price: 1200,
    images: ["/works/coasters-1.jpg", "/works/coasters-1-2.jpg"],
    usedMaterials: [{ productId: "1", productName: "Спил берёзы 15 см" }],
    category: "boards",
    categoryName: "Сервировка",
    contactUrl: "https://t.me/example",
  },
  {
    id: "5",
    masterId: "3",
    title: "Панно с эпоксидной рекой",
    slug: "panno-epoksidnaya-reka",
    description:
      "Декоративное панно из крупного спила берёзы с заливкой из голубой эпоксидной смолы. Эффект горной реки. Диаметр 40 см.",
    price: 8500,
    images: ["/works/epoxy-1.jpg", "/works/epoxy-1-2.jpg"],
    usedMaterials: [{ productId: "4", productName: "Спил берёзы 40 см" }],
    category: "decor",
    categoryName: "Декор",
    contactUrl: "https://t.me/example",
  },
  {
    id: "6",
    masterId: "3",
    title: "Светильник из пенька",
    slug: "svetilnik-iz-penka",
    description:
      "Настольный светильник из берёзового пенька с тёплой LED-подсветкой. Создаёт уютную атмосферу. Высота 25 см.",
    price: 5500,
    images: ["/works/lamp-1.jpg", "/works/lamp-1-2.jpg"],
    usedMaterials: [{ productId: "9", productName: "Пенёк берёзовый 25 см" }],
    category: "decor",
    categoryName: "Декор",
    contactUrl: "https://t.me/example",
  },
]

export function getMasterBySlug(slug: string): Master | undefined {
  return masters.find((m) => m.slug === slug)
}

export function getMasterWorks(masterId: string): MasterWork[] {
  return masterWorks.filter((w) => w.masterId === masterId)
}

export function getWorkBySlug(slug: string): MasterWork | undefined {
  return masterWorks.find((w) => w.slug === slug)
}

export function getMasterForWork(work: MasterWork): Master | undefined {
  return masters.find((m) => m.id === work.masterId)
}

export function getAllWorkCategories() {
  return [
    { slug: "clocks", name: "Часы" },
    { slug: "boards", name: "Сервировка" },
    { slug: "decor", name: "Декор" },
    { slug: "other", name: "Другое" },
  ]
}

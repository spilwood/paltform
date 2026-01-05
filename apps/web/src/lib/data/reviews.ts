export interface Review {
  id: string
  name: string
  avatar?: string
  rating: number
  date: string
  text: string
  productName?: string
  images?: string[]
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Мария К.",
    rating: 5,
    date: "2024-12-15",
    text: "Заказывала спилы берёзы для свадебного декора. Качество превосходное! Каждый спил аккуратно обработан, кора сохранена. Доставка была быстрой. Обязательно закажу ещё!",
    productName: "Спил берёзы 20 см",
    images: ["/reviews/review-1.jpg"],
  },
  {
    id: "2",
    name: "Алексей Т.",
    rating: 5,
    date: "2024-12-10",
    text: "Делаю часы на заказ, спилы от Spilwood — лучшие что я находил. Ровные, без трещин, красивый рисунок колец. Сотрудничаю уже год.",
    productName: "Спил сосны 25 см",
  },
  {
    id: "3",
    name: "Ольга М.",
    rating: 5,
    date: "2024-11-28",
    text: "Пеньки для фотозоны на мероприятии — просто супер! Все гости были в восторге. Натуральные, устойчивые, красивые.",
    productName: "Пенёк берёзовый 25 см",
    images: ["/reviews/review-3.jpg"],
  },
  {
    id: "4",
    name: "Дмитрий П.",
    rating: 4,
    date: "2024-11-20",
    text: "Хорошие спилы, использовал для подставок под горячее. Немного разный диаметр в партии, но это же натуральное дерево. В целом доволен.",
    productName: "Спил берёзы 15 см",
  },
  {
    id: "5",
    name: "Екатерина С.",
    rating: 5,
    date: "2024-11-15",
    text: "Второй раз заказываю индивидуальный распил. Всё точно по размерам, коммуникация отличная. Рекомендую!",
  },
  {
    id: "6",
    name: "Игорь В.",
    rating: 5,
    date: "2024-10-30",
    text: "Открыл небольшую мастерскую, беру спилы оптом. Цены адекватные, качество стабильное. Приятно работать с профессионалами.",
    productName: "Спил сосны 35 см",
  },
]

export function getRecentReviews(count = 6): Review[] {
  return reviews.slice(0, count)
}

export function getAverageRating(): number {
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}

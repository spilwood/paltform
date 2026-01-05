# Структура блог-постов

Блог-посты теперь хранятся в отдельных файлах для лучшей организации и поддержки.

## Структура файлов

```
blog/
├── types.ts              # Типы TypeScript
├── posts/                # Директория с постами
│   ├── index.ts          # Экспорт всех постов
│   ├── kak-sdelat-chasy-iz-spila.ts
│   ├── obrabotka-spilov-maslom.ts
│   └── ...               # Другие посты
└── README.md             # Эта документация
```

## Как добавить новый пост

1. Создайте новый файл в `posts/` с именем в формате `slug-posta.ts`
2. Импортируйте тип `BlogPost` из `../types`
3. Экспортируйте объект `post` с данными:

```typescript
import type { BlogPost } from "../types"

export const post: BlogPost = {
  id: "9",
  title: "Заголовок поста",
  slug: "slug-posta",
  excerpt: "Краткое описание...",
  content: `HTML контент поста...`,
  image: "/blog/image.jpg",
  category: "Категория",
  publishedAt: "2025-01-20",
  readTime: 10,
  author: "Команда Spilwood",
  tags: ["тег1", "тег2"],
}
```

4. Добавьте импорт в `posts/index.ts`:

```typescript
import { post as slugPosta } from "./slug-posta"

export const allPosts: BlogPost[] = [
  // ... существующие посты
  slugPosta,
]
```

## Использование

Импортируйте из основного файла `blog.tsx`:

```typescript
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/data/blog"
```

Все функции работают как раньше, но данные теперь организованы в отдельные файлы.

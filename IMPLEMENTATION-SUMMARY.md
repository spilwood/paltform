# Внедрение API для Web приложения

## Что было сделано

### 1. API Роутеры (packages/api)

Создан полный CRUD для постов:

```
packages/api/src/routers/post/
├── index.ts       # Экспорт роутера
├── list.ts        # GET - список постов
├── get.ts         # GET - один пост
├── create.ts      # POST - создание
├── update.ts      # PATCH - обновление
└── delete.ts      # DELETE - удаление
```

Роутер зарегистрирован в `packages/api/src/root.ts`:

```typescript
export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter, // ✅ Добавлен
});
```

### 2. Web приложение (apps/web)

#### Layout с TRPCProvider

`apps/web/src/app/layout.tsx` - обёрнут в `TRPCReactProvider` для работы tRPC на клиенте.

#### Компоненты блога

```
apps/web/src/components/blog/
├── post-list.tsx          # Список постов
├── post-card.tsx          # Карточка поста с удалением
└── create-post-form.tsx   # Форма создания
```

#### Демо страница

`apps/web/src/app/blog/demo/page.tsx` - полноценная демонстрация работы API:

- Server-side prefetch данных
- Создание постов (форма)
- Отображение списка
- Удаление с подтверждением

#### Хуки

`apps/web/src/hooks/use-user.ts` - хук для получения текущего пользователя.

#### REST API пример

`apps/web/src/app/api/posts/route.ts` - пример использования tRPC в API Routes.

### 3. Документация

- `README-API.md` - полное руководство по использованию API
- `IMPLEMENTATION-SUMMARY.md` - этот файл

## Как использовать

### Запуск демо

1. Убедитесь, что база данных запущена
2. Запустите dev сервер:
   ```bash
   bun run dev
   ```
3. Откройте http://localhost:3000/blog/demo

### Использование в компонентах

#### Клиентский компонент (Client Component)

```tsx
"use client";

import { useTRPC } from "~/trpc/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function MyComponent() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Получение данных
  const { data, isPending } = useQuery(trpc.post.list.queryOptions());

  // Мутация
  const { mutate } = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.post.list.queryKey(),
        });
      },
    })
  );

  return <div>{/* UI */}</div>;
}
```

#### Серверный компонент (Server Component)

```tsx
import { api, prefetch, trpc } from "~/trpc/server";

export default async function Page() {
  // Вариант 1: Прямой вызов
  const caller = await api();
  const posts = await caller.post.list();

  // Вариант 2: Prefetch для клиента
  await prefetch(trpc.post.list.queryOptions());

  return <ClientComponent />;
}
```

## Архитектурные решения

### Следование стандартам проекта

✅ **Один файл = одна процедура** - каждый endpoint в отдельном файле
✅ **Zod v4** - валидация входных данных
✅ **TanStack Query** - управление состоянием на клиенте
✅ **Типобезопасность** - полная типизация от API до UI
✅ **Accessibility** - все компоненты доступны с клавиатуры
✅ **UI компоненты** - используются только из @spilwood/ui

### Обработка ошибок

```typescript
throw new TRPCError({
  code: "NOT_FOUND",
  message: "Пост не найден",
});
```

Коды:

- `NOT_FOUND` - ресурс не найден
- `FORBIDDEN` - нет доступа
- `BAD_REQUEST` - некорректные данные
- `UNAUTHORIZED` - не авторизован

### Инвалидация кэша

```typescript
// Конкретный запрос
queryClient.invalidateQueries({
  queryKey: trpc.post.list.queryKey(),
});

// Весь роутер
queryClient.invalidateQueries({
  queryKey: trpc.post.queryKey(),
});
```

## Accessibility

Все компоненты следуют стандартам WAI-ARIA:

- ✅ Полная поддержка клавиатуры
- ✅ Видимые focus rings
- ✅ Aria-labels для icon-only кнопок
- ✅ Подтверждение деструктивных действий
- ✅ Loading states с сохранением текста
- ✅ Минимальный размер hit target 24px
- ✅ Font-size ≥16px для мобильных input

## Производительность

- ✅ Server-side prefetch критичных данных
- ✅ Оптимистичные обновления (можно добавить)
- ✅ Инвалидация только необходимых запросов
- ✅ Suspense boundaries для loading states
- ✅ Skeleton screens для предотвращения CLS

## Следующие шаги

### Рекомендуемые улучшения

1. **Добавить пагинацию** для списка постов
2. **Оптимистичные обновления** для лучшего UX
3. **Infinite scroll** для больших списков
4. **Фильтрация и поиск** постов
5. **Редактирование** постов (inline или модальное)
6. **Категории и теги** для организации
7. **Изображения** для постов
8. **Markdown поддержка** для контента

### Создание новых роутеров

Следуйте паттерну из `packages/api/src/routers/post/`:

1. Создайте директорию для домена
2. Создайте файлы для каждой процедуры
3. Экспортируйте в `index.ts` с `satisfies TRPCRouterRecord`
4. Зарегистрируйте в `root.ts`

Подробнее в `README-API.md`.

## Проверка работы

### Тестирование API

1. Откройте `/blog/demo`
2. Создайте несколько постов
3. Проверьте отображение списка
4. Удалите пост (с подтверждением)
5. Проверьте работу с клавиатуры (Tab, Enter, Escape)

### Проверка типов

```bash
# API пакет
cd packages/api
bun run typecheck

# Web приложение
cd apps/web
bun run typecheck
```

### Проверка линтинга

```bash
bun run check
```

## Известные проблемы

### TypeScript кэширование

Если типы не подхватываются после добавления нового роутера:

1. Перезапустите TypeScript сервер в IDE
2. Или перезапустите dev сервер
3. Или удалите `.next` и пересоберите

### Hot reload

При изменении API роутеров может потребоваться перезапуск dev сервера.

## Поддержка

Для вопросов и проблем:

- Смотрите `README-API.md` для детальной документации
- Изучите примеры в `apps/web/src/components/blog/`
- Следуйте стандартам из `.kiro/steering/`

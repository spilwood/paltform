# Quick Start: Использование API

## 🚀 Быстрый старт

### 1. Просмотр демо

```bash
bun run dev
```

Откройте: http://localhost:3000/blog/demo

### 2. Создание нового роутера

```typescript
// packages/api/src/routers/product/list.ts
import { publicProcedure } from "../../trpc";

export const list = publicProcedure.query(async ({ ctx }) => {
  return await ctx.db.query.Product.findMany();
});
```

```typescript
// packages/api/src/routers/product/index.ts
import type { TRPCRouterRecord } from "@trpc/server";
import { list } from "./list";

export const productRouter = {
  list,
} satisfies TRPCRouterRecord;
```

```typescript
// packages/api/src/root.ts
import { productRouter } from "./routers/product";

export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  product: productRouter, // ✅ Добавьте
});
```

### 3. Использование в компоненте

```tsx
"use client";

import { useTRPC } from "~/trpc/react";
import { useQuery } from "@tanstack/react-query";

export function ProductList() {
  const trpc = useTRPC();
  const { data, isPending } = useQuery(trpc.product.list.queryOptions());

  if (isPending) return <div>Загрузка…</div>;

  return (
    <div>
      {data?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## 📚 Паттерны

### Query (чтение)

```typescript
const { data, isPending, error } = useQuery(trpc.post.list.queryOptions());
```

### Mutation (изменение)

```typescript
const { mutate, isPending } = useMutation(
  trpc.post.create.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.post.list.queryKey(),
      });
    },
  })
);

mutate({ title: "Hello", content: "World" });
```

### Server Component

```tsx
import { api } from "~/trpc/server";

export default async function Page() {
  const caller = await api();
  const posts = await caller.post.list();

  return <div>{posts.length} постов</div>;
}
```

## 🎯 Чеклист для нового endpoint

- [ ] Создан файл процедуры (kebab-case)
- [ ] Добавлена валидация через Zod
- [ ] Используется правильная процедура (public/protected)
- [ ] Используется правильный метод (.query()/.mutation())
- [ ] Обработаны ошибки с TRPCError
- [ ] Добавлен экспорт в index.ts
- [ ] Зарегистрирован в root.ts
- [ ] Проверена типизация (bun run typecheck)

## 🔧 Полезные команды

```bash
# Проверка типов
bun run typecheck

# Линтинг
bun run check

# Запуск dev сервера
bun run dev

# Сборка
bun run build
```

## 📖 Документация

- `README-API.md` - полное руководство
- `IMPLEMENTATION-SUMMARY.md` - обзор реализации
- `.kiro/steering/trpc-api.md` - стандарты tRPC
- `.kiro/steering/trpc.md` - стандарты TanStack Query

## 💡 Примеры

Смотрите готовые примеры:

- `packages/api/src/routers/post/` - CRUD для постов
- `packages/api/src/routers/user/` - работа с пользователем
- `apps/web/src/components/blog/` - UI компоненты
- `apps/web/src/app/blog/demo/` - демо страница

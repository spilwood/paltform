# API Implementation Guide

## Структура проекта

```
packages/api/
├── src/
│   ├── routers/
│   │   ├── user/
│   │   │   ├── index.ts
│   │   │   ├── me.ts
│   │   │   ├── update-profile.ts
│   │   │   └── update-account.ts
│   │   └── post/
│   │       ├── index.ts
│   │       ├── list.ts
│   │       ├── get.ts
│   │       ├── create.ts
│   │       ├── update.ts
│   │       └── delete.ts
│   ├── root.ts
│   ├── trpc.ts
│   └── index.ts
└── package.json

apps/web/
├── src/
│   ├── trpc/
│   │   ├── react.tsx       # Клиентский tRPC провайдер
│   │   ├── server.tsx      # Серверный tRPC хелпер
│   │   └── query-client.ts # Конфигурация TanStack Query
│   ├── components/
│   │   └── blog/
│   │       ├── post-list.tsx
│   │       ├── post-card.tsx
│   │       └── create-post-form.tsx
│   ├── hooks/
│   │   └── use-user.ts
│   └── app/
│       ├── layout.tsx      # TRPCReactProvider обёртка
│       ├── api/
│       │   ├── trpc/[trpc]/route.ts  # tRPC endpoint
│       │   └── posts/route.ts        # REST API пример
│       └── blog/
│           └── demo/
│               └── page.tsx
```

## Использование API

### 1. Клиентские компоненты (Client Components)

```tsx
"use client";

import { useTRPC } from "~/trpc/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function MyComponent() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Query - получение данных
  const { data, isPending } = useQuery(trpc.post.list.queryOptions());

  // Mutation - изменение данных
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

### 2. Серверные компоненты (Server Components)

```tsx
import { api, prefetch, trpc } from "~/trpc/server";

async function ServerComponent() {
  // Вариант 1: Прямой вызов
  const caller = await api();
  const posts = await caller.post.list();

  // Вариант 2: Prefetch для клиента
  await prefetch(trpc.post.list.queryOptions());

  return <div>{/* UI */}</div>;
}
```

### 3. API Routes (REST endpoints)

```tsx
import { api } from "~/trpc/server";

export async function GET() {
  const caller = await api();
  const data = await caller.post.list();
  return Response.json(data);
}
```

### 4. Server Actions

```tsx
"use server";

import { api } from "~/trpc/server";

export async function createPost(formData: FormData) {
  const caller = await api();
  const post = await caller.post.create({
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  });
  return post;
}
```

## Создание нового роутера

### 1. Создайте файлы процедур

```typescript
// packages/api/src/routers/product/list.ts
import { publicProcedure } from "../../trpc";

export const list = publicProcedure.query(async ({ ctx }) => {
  return await ctx.db.query.Product.findMany();
});
```

```typescript
// packages/api/src/routers/product/create.ts
import { z } from "zod/v4";
import { protectedProcedure } from "../../trpc";

export const create = protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
      price: z.number().positive(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    return await ctx.db.insert(Product).values(input);
  });
```

### 2. Создайте index.ts роутера

```typescript
// packages/api/src/routers/product/index.ts
import type { TRPCRouterRecord } from "@trpc/server";
import { list } from "./list";
import { create } from "./create";

export const productRouter = {
  list,
  create,
} satisfies TRPCRouterRecord;
```

### 3. Зарегистрируйте в root.ts

```typescript
// packages/api/src/root.ts
import { productRouter } from "./routers/product";

export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  product: productRouter, // Добавьте новый роутер
});
```

## Best Practices

### Валидация

- Используйте Zod v4 для валидации входных данных
- Переиспользуйте схемы из `@spilwood/validators`
- Валидируйте на уровне API, не полагайтесь только на клиент

### Обработка ошибок

```typescript
import { TRPCError } from "@trpc/server";

if (!resource) {
  throw new TRPCError({
    code: "NOT_FOUND",
    message: "Ресурс не найден",
  });
}
```

Коды ошибок:

- `NOT_FOUND` - ресурс не найден
- `FORBIDDEN` - нет доступа
- `BAD_REQUEST` - некорректные данные
- `UNAUTHORIZED` - не авторизован
- `INTERNAL_SERVER_ERROR` - внутренняя ошибка

### Авторизация

```typescript
// Публичный доступ
export const list = publicProcedure.query(async ({ ctx }) => {
  // ctx.session может быть null
});

// Требуется авторизация
export const create = protectedProcedure.mutation(async ({ ctx }) => {
  // ctx.session.user гарантированно существует
  const userId = ctx.session.user.id;
});
```

### Инвалидация кэша

```typescript
const { mutate } = useMutation(
  trpc.post.create.mutationOptions({
    onSuccess: () => {
      // Инвалидировать конкретный запрос
      queryClient.invalidateQueries({
        queryKey: trpc.post.list.queryKey(),
      });

      // Инвалидировать весь роутер
      queryClient.invalidateQueries({
        queryKey: trpc.post.queryKey(),
      });
    },
  })
);
```

### Оптимистичные обновления

```typescript
const { mutate } = useMutation(
  trpc.post.update.mutationOptions({
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: trpc.post.list.queryKey(),
      });

      const previous = queryClient.getQueryData(trpc.post.list.queryKey());

      queryClient.setQueryData(trpc.post.list.queryKey(), (old) =>
        updateOptimistically(old, newData)
      );

      return { previous };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(trpc.post.list.queryKey(), context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.post.list.queryKey(),
      });
    },
  })
);
```

## Примеры компонентов

### Форма с валидацией

```tsx
"use client";

import { useTRPC } from "~/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Input, Label } from "@spilwood/ui";
import { toast } from "sonner";
import { useState } from "react";

export function CreateForm() {
  const trpc = useTRPC();
  const [title, setTitle] = useState("");

  const { mutate, isPending } = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: () => {
        toast.success("Создано");
        setTitle("");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, content: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="title">Заголовок</Label>
      <Input
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isPending}
        className="text-base"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Создание…" : "Создать"}
      </Button>
    </form>
  );
}
```

### Список с загрузкой

```tsx
"use client";

import { useTRPC } from "~/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export function List() {
  const trpc = useTRPC();
  const { data, isPending } = useQuery(trpc.post.list.queryOptions());

  if (isPending) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

## Тестирование

```typescript
import { appRouter } from "@spilwood/api";
import { createTRPCContext } from "@spilwood/api";

const ctx = await createTRPCContext({
  headers: new Headers(),
  auth: mockAuth,
});

const caller = appRouter.createCaller(ctx);
const posts = await caller.post.list();
```

## Полезные ссылки

- [tRPC Documentation](https://trpc.io)
- [TanStack Query](https://tanstack.com/query)
- [Zod v4](https://zod.dev)
- [Better Auth](https://better-auth.com)

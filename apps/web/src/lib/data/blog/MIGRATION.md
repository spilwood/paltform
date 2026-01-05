# Миграция блог-постов в отдельные файлы

## Что сделано

✅ Создана новая структура для хранения блог-постов в отдельных файлах
✅ Типы вынесены в `types.ts`
✅ Созданы файлы для первых двух постов:
  - `kak-sdelat-chasy-iz-spila.ts`
  - `obrabotka-spilov-maslom.ts`
✅ Остальные посты временно хранятся в `posts/index.ts`
✅ Основной файл `blog.tsx` обновлен для использования новой структуры
✅ Все функции (`getBlogPostBySlug`, `getRelatedPosts`, etc.) работают как раньше

## Структура

```
apps/web/src/lib/data/
├── blog.tsx                    # Основной файл с экспортами
└── blog/
    ├── types.ts                # Интерфейс BlogPost
    ├── README.md               # Документация
    ├── MIGRATION.md            # Этот файл
    └── posts/
        ├── index.ts            # Экспорт всех постов
        ├── kak-sdelat-chasy-iz-spila.ts
        ├── obrabotka-spilov-maslom.ts
        └── ... (TODO: создать файлы для остальных постов)
```

## Следующие шаги

Для завершения миграции нужно создать отдельные файлы для постов 3-8:

1. `spily-v-svadebnom-dekore.ts` (id: 3)
2. `5-porod-dereva-dlya-spilov.ts` (id: 4)
3. `podstavki-pod-goryachee-iz-spilov.ts` (id: 5)
4. `epoksidnaya-smola-i-spily.ts` (id: 6)
5. `svetilniki-iz-spilov.ts` (id: 7)
6. `servirovochnye-doski-iz-spilov.ts` (id: 8)

Каждый файл должен:
- Импортировать тип `BlogPost` из `../types`
- Экспортировать константу `post` с полным содержимым поста
- Быть добавлен в импорты в `posts/index.ts`

## Преимущества новой структуры

- ✅ Лучшая организация кода
- ✅ Легче найти и редактировать конкретный пост
- ✅ Меньше конфликтов при работе в команде
- ✅ Возможность lazy-loading постов в будущем
- ✅ Проще добавлять новые посты

## Обратная совместимость

Все импорты остались прежними:

```typescript
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/data/blog"
```

Никаких изменений в компонентах не требуется!

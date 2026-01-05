"use client";

import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductCardSkeleton } from "@/components/catalog/product-card-skeleton";
import {
  ProductFilters,
  type FilterState,
} from "@/components/catalog/product-filters";
import type { Product } from "@/lib/data/products";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

interface CategoryPageClientProps {
  category: string;
  meta: { title: string; description: string; h1: string };
  products: Product[];
  categoryDescription?: string;
}

function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    if (filters.inStockOnly && !product.inStock) return false;
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    )
      return false;
    if (filters.diameter.length > 0) {
      const d = product.diameter;
      const matchesDiameter = filters.diameter.some((size) => {
        if (size === "small") return d >= 10 && d <= 15;
        if (size === "medium") return d >= 16 && d <= 25;
        if (size === "large") return d >= 26 && d <= 35;
        if (size === "xlarge") return d >= 36;
        return true;
      });
      if (!matchesDiameter) return false;
    }
    return true;
  });
}

export function CategoryPageClient({
  category,
  meta,
  products,
  categoryDescription,
}: CategoryPageClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState<FilterState>({
    woodType: [],
    diameter: [],
    priceRange: [0, 1000],
    inStockOnly: false,
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setFilteredProducts(filterProducts(products, filters));
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, products]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumbs
            items={[{ label: "Спилы", href: "/spily" }, { label: meta.h1 }]}
          />

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-light tracking-tight md:text-5xl">
                {meta.h1}
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground">
                {categoryDescription}
              </p>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full gap-2 md:hidden bg-transparent"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="px-6">
                <SheetTitle>Фильтры</SheetTitle>
                <div className="mt-6">
                  <ProductFilters
                    onFilterChange={handleFilterChange}
                    showWoodType={false}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  Фильтры
                </h2>
                <ProductFilters
                  onFilterChange={handleFilterChange}
                  showWoodType={false}
                />
              </div>
            </aside>

            <div>
              <div className="mb-4 text-sm text-muted-foreground">
                {isLoading
                  ? "Загрузка..."
                  : `Найдено: ${filteredProducts.length}`}
              </div>

              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground">
                      Товары не найдены. Попробуйте изменить фильтры.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <section className="mt-24 border-t border-border pt-16">
            <h2 className="text-2xl font-light tracking-tight">
              {category === "bereza" ? "О спилах берёзы" : "О спилах сосны"}
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-muted-foreground">
              {category === "bereza" ? (
                <>
                  <p className="leading-relaxed">
                    Берёза — одно из самых популярных деревьев для создания
                    декоративных спилов. Её светлая древесина с характерной
                    белой корой создаёт нежный, скандинавский стиль в интерьере.
                  </p>
                  <p className="leading-relaxed">
                    Спилы берёзы идеальны для свадебного декора, подставок под
                    посуду, основы для часов и настенных панно. Текстура
                    древесины мягкая, хорошо поддаётся обработке и росписи.
                  </p>
                </>
              ) : (
                <>
                  <p className="leading-relaxed">
                    Сосна отличается тёплыми оттенками древесины и выраженным
                    рисунком годовых колец. Каждый спил сосны — это маленькое
                    произведение природы с уникальным узором.
                  </p>
                  <p className="leading-relaxed">
                    Из спилов сосны создают часы, сервировочные доски, подставки
                    и декоративные элементы. Древесина прочная, хорошо держит
                    нагрузку и долговечна.
                  </p>
                </>
              )}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

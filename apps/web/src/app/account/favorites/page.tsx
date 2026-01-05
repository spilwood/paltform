"use client";

import { useAuth } from "@/lib/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AccountNav } from "@/components/account/account-nav";
import { Button } from "@spilwood/ui";
import { Card, CardContent } from "@spilwood/ui";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@spilwood/ui";

// Mock favorites data
const mockFavorites = [
  {
    id: "1",
    name: "Спил дуба 30 см",
    price: 1200,
    image: "/oak-wood-slice-30cm.jpg",
    diameter: 30,
    thickness: 3,
    inStock: true,
  },
  {
    id: "2",
    name: "Спил берёзы 25 см",
    price: 800,
    image: "/birch-wood-slice-25cm.jpg",
    diameter: 25,
    thickness: 2.5,
    inStock: true,
  },
  {
    id: "3",
    name: "Спил сосны 40 см",
    price: 1500,
    image: "/pine-wood-slice-40cm.jpg",
    diameter: 40,
    thickness: 4,
    inStock: false,
  },
];

export default function FavoritesPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 text-3xl font-light tracking-tight">Избранное</h1>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <AccountNav />
        </aside>

        <div>
          {mockFavorites.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center py-16 text-center">
                <Heart className="h-16 w-16 text-muted-foreground/30" />
                <p className="mt-4 text-lg">Пока нет избранных товаров</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Добавляйте понравившиеся товары в избранное
                </p>
                <Button className="mt-6" asChild>
                  <Link href="/spily">Перейти в каталог</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockFavorites.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden border-0 bg-transparent shadow-none"
                >
                  <Link href={`/spily/${item.id}`}>
                    <AspectRatio
                      ratio={1}
                      className="relative overflow-hidden rounded-lg bg-muted"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                            Нет в наличии
                          </span>
                        </div>
                      )}
                      {/* Remove from favorites button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("[v0] Remove from favorites:", item.id);
                        }}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/95 text-red-500 opacity-0 shadow-sm backdrop-blur-sm transition-opacity hover:bg-background group-hover:opacity-100"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </button>
                    </AspectRatio>
                  </Link>
                  <CardContent className="px-0 pt-4">
                    <Link href={`/spily/${item.id}`}>
                      <h3 className="font-medium transition-colors group-hover:text-primary">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                      <span>⌀ {item.diameter} см</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span>{item.thickness} см</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-lg font-medium">
                        {item.price.toLocaleString()} ₽
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!item.inStock}
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("[v0] Add to cart:", item.id);
                        }}
                      >
                        <ShoppingCart className="h-3 w-3" />В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

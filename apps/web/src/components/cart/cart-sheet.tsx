"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@spilwood/ui";
import { Button } from "@spilwood/ui";
import { Separator } from "@spilwood/ui";
import { Badge } from "@spilwood/ui";
import { ScrollArea } from "@spilwood/ui";
import { ShoppingBag, Minus, Plus, X, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const _itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, x: -100, scale: 0.9 },
};

export function CartSheet() {
  const { cart, itemCount, updateQuantity, removeItem } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs transition-transform duration-300 animate-in zoom-in-50"
              key={itemCount}
            >
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Корзина</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col px-4 sm:px-6 sm:max-w-lg overscroll-contain data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2 data-[state=closed]:duration-300 data-[state=open]:duration-500">
        <SheetHeader>
          <SheetTitle className="text-lg font-medium">
            Корзина{" "}
            {itemCount > 0 && (
              <span className="text-muted-foreground">({itemCount})</span>
            )}
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center animate-in fade-in-50 duration-500">
            <div className="rounded-full bg-muted p-6 animate-in zoom-in-50 duration-700 delay-150">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
              <p className="text-lg font-medium">Корзина пуста</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Добавьте товары из каталога
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 bg-transparent animate-in slide-in-from-bottom-4 duration-500 delay-500"
              onClick={() => setOpen(false)}
              asChild
            >
              <Link href="/spily">Перейти в каталог</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <ul className="space-y-6 py-4">
                {cart.items.map((item, index) => (
                  <li
                    key={item.product.id}
                    className="flex gap-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium">
                            {item.product.name}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.product.diameter}&nbsp;см /{" "}
                            {item.product.thickness}&nbsp;см
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 transition-colors hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Удалить</span>
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-input">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none rounded-l-md transition-colors"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Уменьшить</span>
                          </Button>
                          <span
                            key={`${item.product.id}-${item.quantity}`}
                            className="flex h-8 w-10 items-center justify-center text-sm animate-in zoom-in-50 duration-200"
                          >
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none rounded-r-md transition-colors"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Увеличить</span>
                          </Button>
                        </div>
                        <span
                          key={`price-${item.product.id}-${item.quantity}`}
                          className="text-sm font-medium tabular-nums animate-in zoom-in-95 duration-300"
                        >
                          {(item.product.price * item.quantity).toLocaleString(
                            "ru-RU"
                          )}
                          &nbsp;₽
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <Separator className="my-4" />
            <div className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
              <div className="flex items-center justify-between text-lg">
                <span>Итого</span>
                <span
                  key={`total-${cart.total}`}
                  className="font-semibold tabular-nums animate-in zoom-in-95 duration-300"
                >
                  {cart.total.toLocaleString("ru-RU")}&nbsp;₽
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Без учёта доставки
              </p>
              <Button
                className="mt-6 w-full transition-transform hover:scale-[1.02]"
                size="lg"
                onClick={() => setOpen(false)}
                asChild
              >
                <Link href="/checkout">
                  Оформить заказ
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

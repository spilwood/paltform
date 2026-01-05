"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  User,
  Send,
  ShoppingCart,
  Package,
  Heart,
  Settings,
  LogOut,
  Layers,
  TreeDeciduous,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CartSheet } from "@/components/cart/cart-sheet";
import { MegaMenu } from "@/components/mega-menu";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { cart, itemCount } = useCart();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const AccountMenuContent = () => (
    <div className="space-y-1">
      {user ? (
        <>
          <div className="flex items-center gap-3 pb-3 border-b">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
          <Link
            href="/account/orders"
            className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors"
          >
            <Package className="h-4 w-4" />
            <span>Мои заказы</span>
          </Link>
          <Link
            href="/account/favorites"
            className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors"
          >
            <Heart className="h-4 w-4" />
            <span>Избранное</span>
          </Link>
          <Link
            href="/account/settings"
            className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Настройки</span>
          </Link>
          <Separator className="my-1" />
          <button className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Выйти</span>
          </button>
        </>
      ) : (
        <>
          <p className="text-sm font-medium pb-2">Личный кабинет</p>
          <Link
            href="/account/login"
            className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Войти
          </Link>
          <Link
            href="/account/register"
            className="flex items-center justify-center rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            Создать аккаунт
          </Link>
        </>
      )}
    </div>
  );

  const CartPreviewContent = () => (
    <>
      {itemCount === 0 ? (
        <div className="flex flex-col items-center gap-3 py-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <ShoppingCart className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Корзина пуста</p>
            <p className="text-xs text-muted-foreground mt-1">
              Добавьте товары из каталога
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b">
            <p className="text-sm font-medium">Корзина</p>
            <span className="text-xs text-muted-foreground">
              {itemCount} товаров
            </span>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cart.items.slice(0, 3).map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.product.images[0] || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} шт ×{" "}
                    {item.product.price.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
                <div className="text-sm font-medium">
                  {(item.product.price * item.quantity).toLocaleString("ru-RU")}{" "}
                  ₽
                </div>
              </div>
            ))}
            {cart.items.length > 3 && (
              <p className="text-xs text-muted-foreground text-center pt-2">
                И ещё {cart.items.length - 3} товаров...
              </p>
            )}
          </div>
          <Separator />
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-medium">Итого:</span>
            <span className="text-base font-semibold">
              {cart.total.toLocaleString("ru-RU")} ₽
            </span>
          </div>
          <Button asChild className="w-full mt-3">
            <Link href="/checkout">Оформить заказ</Link>
          </Button>
        </div>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Spilwood
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            asChild
          >
            <a
              href="https://t.me/spilwood_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Telegram магазин</span>
            </a>
          </Button>

          {isMobile ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex"
                  asChild
                >
                  <div>
                    <User className="h-5 w-5" />
                    <span className="sr-only">Аккаунт</span>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="end"
                className="w-64 p-3"
                sideOffset={8}
              >
                <AccountMenuContent />
              </PopoverContent>
            </Popover>
          ) : (
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex"
                  asChild
                >
                  <Link href="/account">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Аккаунт</span>
                  </Link>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                side="bottom"
                align="end"
                className="w-64 p-3"
                sideOffset={8}
              >
                <AccountMenuContent />
              </HoverCardContent>
            </HoverCard>
          )}

          {isMobile ? (
            <CartSheet />
          ) : (
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  asChild
                >
                  <Link href="/checkout">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                        {itemCount}
                      </Badge>
                    )}
                    <span className="sr-only">Корзина</span>
                  </Link>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                side="bottom"
                align="end"
                className="w-80 p-4"
                sideOffset={8}
              >
                <CartPreviewContent />
              </HoverCardContent>
            </HoverCard>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] px-0 flex flex-col overscroll-contain"
            >
              <SheetTitle className="sr-only">Меню навигации</SheetTitle>

              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between border-b px-6 pb-4 flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Spilwood
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Деревянные изделия
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="h-9 w-9"
                  aria-label="Закрыть меню"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>

              {/* Navigation Links - Scrollable */}
              <nav
                className="flex-1 overflow-y-auto px-3 py-6 pb-48"
                role="navigation"
                aria-label="Основная навигация"
              >
                <div className="space-y-1">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Каталог
                  </p>
                  <Link
                    href="/spily"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                  >
                    <Layers className="h-5 w-5 text-muted-foreground" />
                    <span>Спилы</span>
                  </Link>
                  <Link
                    href="/penki"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                  >
                    <TreeDeciduous className="h-5 w-5 text-muted-foreground" />
                    <span>Пеньки</span>
                  </Link>
                </div>

                <Separator className="my-3" />

                <div className="space-y-1">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Услуги
                  </p>
                  <Link
                    href="/zakaz"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                  >
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <span>Заказ</span>
                  </Link>
                  <Link
                    href="/dostavka"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                  >
                    <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    <span>Доставка</span>
                  </Link>
                </div>

                <Separator className="my-3" />

                <div className="space-y-1">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    О нас
                  </p>
                  <Link
                    href="/mastera"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                  >
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span>Мастера</span>
                  </Link>
                  <Link
                    href="/proizvodstvo"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                  >
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <span>Производство</span>
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                  >
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <span>Блог</span>
                  </Link>
                </div>
              </nav>

              {/* Bottom Actions - Fixed */}
              <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur p-6 space-y-3">
                <a
                  href="https://t.me/spilwood_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                >
                  <Send className="h-5 w-5" />
                  <span>Telegram магазин</span>
                </a>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-base font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                >
                  {user ? (
                    <>
                      <User className="h-5 w-5" />
                      <span>Личный кабинет</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Войти</span>
                    </>
                  )}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

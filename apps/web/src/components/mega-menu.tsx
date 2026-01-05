"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { TreeDeciduous, TreePine, Layers, Palette, Clock, UtensilsCrossed } from "lucide-react"

const catalogItems = [
  {
    title: "Спилы берёзы",
    href: "/spily/bereza",
    description: "Светлая древесина с характерной белой корой",
    icon: TreeDeciduous,
  },
  {
    title: "Спилы сосны",
    href: "/spily/sosna",
    description: "Тёплые оттенки с выраженными кольцами",
    icon: TreePine,
  },
  {
    title: "Пеньки",
    href: "/penki",
    description: "Декоративные пеньки для интерьера",
    icon: Layers,
  },
]

const usageItems = [
  {
    title: "Для часов",
    href: "/primenenie#chasy",
    description: "Основа для настенных часов",
    icon: Clock,
  },
  {
    title: "Для сервировки",
    href: "/primenenie#servirovka",
    description: "Доски и подставки для подачи",
    icon: UtensilsCrossed,
  },
  {
    title: "Для декора",
    href: "/primenenie#dekor",
    description: "Панно, рамки и арт-объекты",
    icon: Palette,
  },
]

export function MegaMenu() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Каталог</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Продукция</p>
                {catalogItems.map((item) => (
                  <ListItem key={item.title} href={item.href} title={item.title} icon={item.icon}>
                    {item.description}
                  </ListItem>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Применение</p>
                {usageItems.map((item) => (
                  <ListItem key={item.title} href={item.href} title={item.title} icon={item.icon}>
                    {item.description}
                  </ListItem>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/zakaz" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Заказ</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/mastera" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Мастера</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/proizvodstvo" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Производство</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Блог</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/dostavka" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Доставка</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string
  icon?: React.ComponentType<{ className?: string }>
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, icon: Icon, href, ...props }, ref) => {
    return (
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || "#"}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    )
  },
)
ListItem.displayName = "ListItem"

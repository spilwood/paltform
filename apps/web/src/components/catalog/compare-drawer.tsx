"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { GitCompareArrows, X, Trash2 } from "lucide-react"
import { useCompare } from "@/lib/store/compare"
import Image from "next/image"
import Link from "next/link"

export function CompareDrawer() {
  const { items, removeItem, clearAll } = useCompare()

  if (items.length === 0) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-20 right-6 z-40 gap-2 shadow-lg md:bottom-6 bg-transparent"
        >
          <GitCompareArrows className="h-4 w-4" />
          Сравнить
          <Badge variant="secondary" className="ml-1">
            {items.length}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Сравнение товаров</SheetTitle>
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <Trash2 className="mr-2 h-4 w-4" />
            Очистить
          </Button>
        </SheetHeader>

        <ScrollArea className="mt-6 h-full pb-20">
          <div className="flex gap-6 pb-6">
            {items.map((product) => (
              <div key={product.id} className="relative w-[280px] shrink-0 rounded-lg border border-border p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={() => removeItem(product.id)}
                >
                  <X className="h-3 w-3" />
                </Button>

                <Link href={`/spily/${product.category}/${product.slug}`}>
                  <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-md bg-muted">
                    <Image
                      src={product.images[0] || "/placeholder.svg?height=200&width=200&query=wood slice"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                <h3 className="mt-4 font-medium">{product.name}</h3>
                <p className="mt-1 text-lg font-semibold">{product.price} ₽</p>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-6 border-t border-border pt-6">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-[150px] pb-3 text-left font-medium text-muted-foreground">Характеристика</th>
                  {items.map((product) => (
                    <th key={product.id} className="pb-3 text-left font-medium">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 text-muted-foreground">Порода</td>
                  {items.map((product) => (
                    <td key={product.id} className="py-3">
                      {product.category === "bereza" ? "Берёза" : product.category === "sosna" ? "Сосна" : "Берёза"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-muted-foreground">Диаметр</td>
                  {items.map((product) => (
                    <td key={product.id} className="py-3">
                      {product.diameter} см
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-muted-foreground">Толщина</td>
                  {items.map((product) => (
                    <td key={product.id} className="py-3">
                      {product.thickness} см
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-muted-foreground">Цена</td>
                  {items.map((product) => (
                    <td key={product.id} className="py-3 font-semibold">
                      {product.price} ₽
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 text-muted-foreground">В наличии</td>
                  {items.map((product) => (
                    <td key={product.id} className="py-3">
                      <Badge variant={product.inStock ? "default" : "secondary"}>
                        {product.inStock ? "Да" : "Нет"}
                      </Badge>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

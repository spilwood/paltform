"use client"

import { useAuth } from "@/lib/store/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AccountNav } from "@/components/account/account-nav"
import { Button } from "@spilwood/ui"
import { Card, CardContent } from "@spilwood/ui"
import { Badge } from "@spilwood/ui"
import { Input } from "@spilwood/ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@spilwood/ui"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@spilwood/ui"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Package } from "lucide-react"

export default function ProductsPage() {
  const { isAuthenticated, isCraftsman, craftsmanProducts, deleteProduct } = useAuth()
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account/login")
    } else if (!isCraftsman) {
      router.push("/account")
    }
  }, [isAuthenticated, isCraftsman, router])

  if (!isAuthenticated || !isCraftsman) {
    return null
  }

  const filteredProducts = craftsmanProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-light tracking-tight">Мои изделия</h1>
        <Button asChild>
          <Link href="/account/products/new" className="gap-2">
            <Plus className="h-4 w-4" />
            Добавить изделие
          </Link>
        </Button>
      </div>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <AccountNav />
        </aside>

        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center py-16 text-center">
                <Package className="h-16 w-16 text-muted-foreground/30" />
                <p className="mt-4 text-lg">{search ? "Ничего не найдено" : "Пока нет добавленных изделий"}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {search ? "Попробуйте изменить поисковый запрос" : "Добавьте своё первое изделие в каталог"}
                </p>
                {!search && (
                  <Button className="mt-6" asChild>
                    <Link href="/account/products/new" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Добавить изделие
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative aspect-square bg-muted">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    )}
                    <div className="absolute right-2 top-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/account/products/${product.id}/edit`} className="gap-2">
                              <Edit className="h-4 w-4" />
                              Редактировать
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/spily/${product.id}`} className="gap-2">
                              <Eye className="h-4 w-4" />
                              Просмотреть
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2 text-destructive focus:text-destructive"
                            onClick={() => setDeleteId(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-medium truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <Badge variant={product.inStock ? "secondary" : "outline"}>
                        {product.inStock ? "В наличии" : "Нет"}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-lg font-semibold">{product.price.toLocaleString()} ₽</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {product.views}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить изделие?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Изделие будет удалено из вашего каталога.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}

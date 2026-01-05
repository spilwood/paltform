import Link from "next/link"
import type { Order } from "@/lib/store/orders"
import { OrderStatusBadge } from "./order-status-badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Link
      href={`/account/orders/${order.id}`}
      className="block border border-border p-6 transition-colors hover:bg-muted/50"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <p className="font-mono text-sm font-medium">{order.id}</p>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-medium">{order.total.toLocaleString("ru-RU")} ₽</p>
          <p className="text-sm text-muted-foreground">{order.items.length} товаров</p>
        </div>
      </div>

      {/* Product thumbnails */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex -space-x-3">
          {order.items.slice(0, 4).map((item, index) => (
            <div
              key={item.product.id}
              className="relative h-12 w-12 overflow-hidden border-2 border-background bg-muted"
              style={{ zIndex: 4 - index }}
            >
              <Image
                src={item.product.images[0] || "/placeholder.svg"}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="flex h-12 w-12 items-center justify-center border-2 border-background bg-muted text-xs font-medium">
              +{order.items.length - 4}
            </div>
          )}
        </div>
        <span className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
          Подробнее
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

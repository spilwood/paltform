import { getStatusLabel, getStatusColor, type OrderStatus } from "@/lib/store/orders"
import { cn } from "@/lib/utils"

interface OrderStatusBadgeProps {
  status: OrderStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center px-3 py-1 text-xs font-medium", getStatusColor(status))}>
      {getStatusLabel(status)}
    </span>
  )
}

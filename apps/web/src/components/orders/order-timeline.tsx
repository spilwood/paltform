import { Check, Package, Truck, Home, XCircle } from "lucide-react"
import type { OrderStatus } from "@/lib/store/orders"
import { cn } from "@/lib/utils"

interface OrderTimelineProps {
  status: OrderStatus
  createdAt: string
}

const steps = [
  { key: "confirmed", label: "Подтверждён", icon: Check },
  { key: "processing", label: "В обработке", icon: Package },
  { key: "shipped", label: "Отправлен", icon: Truck },
  { key: "delivered", label: "Доставлен", icon: Home },
]

const statusOrder: Record<OrderStatus, number> = {
  pending: -1,
  confirmed: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
}

export function OrderTimeline({ status, createdAt }: OrderTimelineProps) {
  const currentStep = statusOrder[status]

  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100">
        <XCircle className="h-5 w-5 text-red-600" />
        <div>
          <p className="font-medium text-red-800">Заказ отменён</p>
          <p className="text-sm text-red-600">
            {new Date(createdAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep >= index
          const isCurrent = currentStep === index
          const Icon = step.icon

          return (
            <div key={step.key} className="relative flex flex-col items-center flex-1">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-1/2 top-5 h-0.5 w-full",
                    currentStep > index ? "bg-foreground" : "bg-border",
                  )}
                />
              )}

              {/* Step indicator */}
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center",
                  isCompleted ? "bg-foreground text-background" : "bg-muted text-muted-foreground",
                  isCurrent && "ring-2 ring-foreground ring-offset-2",
                )}
              >
                {isCompleted && !isCurrent ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>

              {/* Label */}
              <p
                className={cn(
                  "mt-3 text-xs text-center",
                  isCompleted ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

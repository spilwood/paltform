"use client";

import { useAuth } from "@/lib/store/auth";
import { useOrders } from "@/lib/store/orders";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { AccountNav } from "@/components/account/account-nav";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { ArrowLeft, MapPin, Phone, Mail, Copy, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@spilwood/ui";
import { useState } from "react";

export default function OrderDetailPage() {
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const { getOrderById } = useOrders();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const order = getOrderById(params.id as string);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center py-16">
          <p className="text-lg">Заказ не найден</p>
          <Button className="mt-4 rounded-none" asChild>
            <Link href="/account/orders">Вернуться к заказам</Link>
          </Button>
        </div>
      </main>
    );
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/account/orders"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад к заказам
      </Link>

      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-mono text-2xl font-medium">{order.id}</h1>
            <button
              type="button"
              onClick={handleCopyOrderId}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <AccountNav />
        </aside>

        <div className="space-y-10">
          {/* Order Timeline */}
          <div className="border border-border p-6">
            <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Статус заказа
            </h2>
            <OrderTimeline status={order.status} createdAt={order.createdAt} />
            {order.trackingNumber && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">Трек-номер</p>
                <p className="mt-1 font-mono font-medium">
                  {order.trackingNumber}
                </p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div>
            <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Товары ({order.items.length})
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 border border-border p-4"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 bg-muted">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/spily/${item.product.category}/${item.product.slug}`}
                        className="font-medium hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.product.diameter} см / {item.product.thickness} см
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {(item.product.price * item.quantity).toLocaleString(
                          "ru-RU"
                        )}{" "}
                        ₽
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Shipping */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Shipping Address */}
            <div className="border border-border p-6">
              <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Адрес доставки
              </h2>
              <div className="space-y-3 text-sm">
                <p className="font-medium">{order.shipping.fullName}</p>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {order.shipping.postalCode}, {order.shipping.city}
                    <br />
                    {order.shipping.address}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{order.shipping.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{order.shipping.email}</span>
                </div>
                {order.shipping.comment && (
                  <p className="mt-3 pt-3 border-t border-border text-muted-foreground italic">
                    "{order.shipping.comment}"
                  </p>
                )}
              </div>
            </div>

            {/* Order Total */}
            <div className="border border-border p-6">
              <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Сумма заказа
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Товары (
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)} шт.)
                  </span>
                  <span>{order.total.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>Бесплатно</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-lg font-medium">
                  <span>Итого</span>
                  <span>{order.total.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

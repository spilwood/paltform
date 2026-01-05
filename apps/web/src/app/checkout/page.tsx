import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export const metadata: Metadata = {
  title: "Оформление заказа — Spilwood",
  description: "Оформите заказ на спилы дерева и пеньки от производителя",
}

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Вернуться на главную
      </Link>
      <h1 className="mb-10 text-3xl font-light tracking-tight md:text-4xl">Оформление заказа</h1>
      <CheckoutForm />
    </main>
  )
}

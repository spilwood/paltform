import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Регистрация — Spilwood",
  description: "Создайте аккаунт в Spilwood",
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50/30 via-orange-50/20 via-30% via-rose-50/20 via-60% to-stone-50/30 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-medium tracking-tight">
            Spilwood
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Присоединяйтесь к сообществу мастеров</p>
        </div>
        <RegisterForm />
      </div>
    </main>
  )
}

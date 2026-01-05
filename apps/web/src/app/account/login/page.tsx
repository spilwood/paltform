import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Вход — Spilwood",
  description: "Войдите в личный кабинет Spilwood",
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50/30 via-orange-50/20 via-30% via-rose-50/20 via-60% to-stone-50/30 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-medium tracking-tight">
            Spilwood
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Натуральные спилы дерева для вашего творчества</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}

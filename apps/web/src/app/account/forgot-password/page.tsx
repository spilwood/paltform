import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Восстановление пароля — Spilwood",
  description: "Восстановите доступ к аккаунту Spilwood",
}

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50/30 via-orange-50/20 via-30% via-rose-50/20 via-60% to-stone-50/30 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-medium tracking-tight">
            Spilwood
          </Link>
          <h1 className="mt-6 text-2xl font-light tracking-tight">Восстановление доступа</h1>
          <p className="mt-2 text-sm text-muted-foreground">Сбросьте пароль для вашего аккаунта</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </main>
  )
}

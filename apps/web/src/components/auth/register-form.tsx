"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/lib/store/auth"
import { AlertCircle } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!fullName || !email || !password) {
      setError("Заполните все поля")
      return
    }

    if (password.length < 8) {
      setError("Пароль должен быть не менее 8 символов")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const result = register(email, password, fullName)

    if (result.success) {
      router.push("/account")
    } else {
      setError(result.error || "Ошибка регистрации")
    }
    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Создайте аккаунт</CardTitle>
        <CardDescription>Введите email для создания аккаунта</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <FieldGroup>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Field>
              <FieldLabel htmlFor="fullName">Имя и фамилия</FieldLabel>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Иван Иванов"
                required
                autoComplete="name"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
                autoComplete="email"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <FieldDescription>Минимум 8 символов</FieldDescription>
            </Field>

            <Field>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner className="mr-2" />
                    Создание...
                  </>
                ) : (
                  "Создать аккаунт"
                )}
              </Button>
              <FieldDescription className="text-center">
                Уже есть аккаунт?{" "}
                <Link href="/account/login" className="font-medium text-primary hover:underline">
                  Войти
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <FieldDescription className="px-6 pb-6 text-center">
        Нажимая продолжить, вы соглашаетесь с{" "}
        <Link href="/oferta" className="font-medium text-primary hover:underline">
          условиями оферты
        </Link>{" "}
        и{" "}
        <Link href="/politika" className="font-medium text-primary hover:underline">
          политикой конфиденциальности
        </Link>
        .
      </FieldDescription>
    </Card>
  )
}

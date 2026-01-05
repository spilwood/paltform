"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { useAuth } from "@/lib/store/auth"
import { AlertCircle, ArrowLeft, CheckCircle2, KeyRound, Eye, EyeOff } from "lucide-react"

type Step = "email" | "verify" | "reset" | "success"

export function ForgotPasswordForm() {
  const { sendOTP, verifyOTP, resetPassword } = useAuth()

  const [step, setStep] = useState<Step>("email")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [email, setEmail] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [demoCode, setDemoCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!email) {
      setError("Введите email")
      setIsLoading(false)
      return
    }

    const result = sendOTP(email, "reset")
    if (result.success) {
      setDemoCode(result.code || "")
      setSuccess(`Код отправлен на ${email}`)
      setStep("verify")
    } else {
      setError(result.error || "Ошибка отправки кода")
    }
    setIsLoading(false)
  }

  const handleVerifyCode = async (code: string) => {
    if (code.length !== 6) return

    setError("")
    setSuccess("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const result = verifyOTP(email, code)
    if (result.success && result.type === "reset") {
      setStep("reset")
    } else {
      setError(result.error || "Неверный код")
      setOtpCode("")
    }
    setIsLoading(false)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!newPassword || !confirmPassword) {
      setError("Заполните все поля")
      setIsLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setError("Пароль должен быть не менее 6 символов")
      setIsLoading(false)
      return
    }

    const result = resetPassword(email, newPassword)
    if (result.success) {
      setStep("success")
    } else {
      setError(result.error || "Ошибка сброса пароля")
    }
    setIsLoading(false)
  }

  const handleBackToEmail = () => {
    setStep("email")
    setOtpCode("")
    setError("")
    setSuccess("")
    setDemoCode("")
  }

  if (step === "success") {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold">Пароль изменён</CardTitle>
          <CardDescription>Ваш пароль был успешно обновлён</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full" size="lg">
            <Link href="/account/login">Войти в аккаунт</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          {step !== "email" && (
            <Button variant="ghost" size="icon" onClick={handleBackToEmail} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Назад</span>
            </Button>
          )}
          <div>
            <CardTitle className="text-2xl font-semibold">
              {step === "email" && "Восстановление пароля"}
              {step === "verify" && "Подтверждение"}
              {step === "reset" && "Новый пароль"}
            </CardTitle>
            <CardDescription>
              {step === "email" && "Введите email для восстановления доступа"}
              {step === "verify" && "Введите код, отправленный на email"}
              {step === "reset" && "Придумайте новый надёжный пароль"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {["email", "verify", "reset"].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`h-2 w-2 rounded-full transition-colors ${
                  step === s
                    ? "bg-primary"
                    : (step === "verify" && s === "email") || (step === "reset" && (s === "email" || s === "verify"))
                      ? "bg-primary/50"
                      : "bg-muted"
                }`}
              />
              {i < 2 && (
                <div
                  className={`h-0.5 w-8 mx-1 ${
                    (step === "verify" && s === "email") || (step === "reset" && (s === "email" || s === "verify"))
                      ? "bg-primary/50"
                      : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Email Step */}
        {step === "email" && (
          <form onSubmit={handleSendCode} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                autoComplete="email"
              />
              <p className="text-xs text-muted-foreground">Мы отправим код для сброса пароля на этот адрес</p>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Отправка...
                </>
              ) : (
                "Отправить код"
              )}
            </Button>

            <Button variant="link" asChild className="w-full text-muted-foreground">
              <Link href="/account/login">Вернуться к входу</Link>
            </Button>
          </form>
        )}

        {/* Verify Step */}
        {step === "verify" && (
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-primary/20 bg-primary/5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <AlertDescription className="text-foreground">{success}</AlertDescription>
              </Alert>
            )}

            {/* Demo code display */}
            {demoCode && (
              <Alert className="border-amber-500/20 bg-amber-500/5">
                <AlertDescription className="text-amber-700 dark:text-amber-400">
                  Демо-код: <span className="font-mono font-bold">{demoCode}</span>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label>Введите 6-значный код</Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otpCode}
                  onChange={(value) => {
                    setOtpCode(value)
                    if (value.length === 6) {
                      handleVerifyCode(value)
                    }
                  }}
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-xs text-muted-foreground text-center">Код действителен 5 минут</p>
            </div>

            {isLoading && (
              <div className="flex justify-center">
                <Spinner className="h-6 w-6" />
              </div>
            )}

            <Button
              variant="link"
              className="w-full text-muted-foreground"
              onClick={handleSendCode}
              disabled={isLoading}
            >
              Отправить код повторно
            </Button>
          </div>
        )}

        {/* Reset Step */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Новый пароль</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Подтвердите пароль</Label>
              <Input
                id="confirm-new-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {confirmPassword && newPassword === confirmPassword && (
                <div className="flex items-center gap-1.5 text-xs text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Пароли совпадают
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Сохранение...
                </>
              ) : (
                "Сохранить новый пароль"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

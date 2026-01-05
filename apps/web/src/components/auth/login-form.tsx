"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/store/auth"
import { AlertCircle, Mail, Lock, ArrowLeft, CheckCircle2 } from "lucide-react"

type LoginMethod = "password" | "otp"
type OTPStep = "email" | "verify"

export function LoginForm() {
  const router = useRouter()
  const { login, sendOTP, verifyOTP } = useAuth()

  // Shared state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Password login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // OTP login state
  const [otpEmail, setOtpEmail] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [otpStep, setOtpStep] = useState<OTPStep>("email")
  const [demoCode, setDemoCode] = useState("")

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!email || !password) {
      setError("Заполните все поля")
      setIsLoading(false)
      return
    }

    const result = login(email, password)
    if (result.success) {
      router.push("/account")
    } else {
      setError(result.error || "Ошибка входа")
    }
    setIsLoading(false)
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!otpEmail) {
      setError("Введите email")
      setIsLoading(false)
      return
    }

    const result = sendOTP(otpEmail, "login")
    if (result.success) {
      setDemoCode(result.code || "")
      setSuccess(`Код отправлен на ${otpEmail}`)
      setOtpStep("verify")
    } else {
      setError(result.error || "Ошибка отправки кода")
    }
    setIsLoading(false)
  }

  const handleVerifyOTP = async (code: string) => {
    if (code.length !== 6) return

    setError("")
    setSuccess("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const result = verifyOTP(otpEmail, code)
    if (result.success) {
      router.push("/account")
    } else {
      setError(result.error || "Ошибка верификации")
      setOtpCode("")
    }
    setIsLoading(false)
  }

  const handleBackToEmail = () => {
    setOtpStep("email")
    setOtpCode("")
    setError("")
    setSuccess("")
    setDemoCode("")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Вход</CardTitle>
        <CardDescription>Выберите удобный способ входа</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="password" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="password" className="gap-2">
              <Lock className="h-4 w-4" />
              Пароль
            </TabsTrigger>
            <TabsTrigger value="otp" className="gap-2">
              <Mail className="h-4 w-4" />
              Код на email
            </TabsTrigger>
          </TabsList>

          {/* Password Login Tab */}
          <TabsContent value="password">
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <Link
                    href="/account/forgot-password"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner className="mr-2" />
                    Вход...
                  </>
                ) : (
                  "Войти"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* OTP Login Tab */}
          <TabsContent value="otp">
            {otpStep === "email" ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="otp-email">Email</Label>
                  <Input
                    id="otp-email"
                    type="email"
                    value={otpEmail}
                    onChange={(e) => setOtpEmail(e.target.value)}
                    placeholder="email@example.com"
                    autoComplete="email"
                  />
                  <p className="text-xs text-muted-foreground">Мы отправим одноразовый код для входа</p>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" />
                      Отправка...
                    </>
                  ) : (
                    "Получить код"
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <Button variant="ghost" size="sm" onClick={handleBackToEmail} className="gap-2 -ml-2">
                  <ArrowLeft className="h-4 w-4" />
                  Изменить email
                </Button>

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

                {/* Demo code display - remove in production */}
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
                          handleVerifyOTP(value)
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
                  onClick={handleSendOTP}
                  disabled={isLoading}
                >
                  Отправить код повторно
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <p className="text-center text-sm text-muted-foreground">
          Нет аккаунта?{" "}
          <Link href="/account/register" className="font-medium text-primary underline-offset-4 hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

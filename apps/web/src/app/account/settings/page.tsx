"use client"

import type React from "react"

import { useAuth } from "@/lib/store/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AccountNav } from "@/components/account/account-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { Camera, CheckCircle2, MapPin } from "lucide-react"

const specializations = [
  "Спилы дерева",
  "Часы из дерева",
  "Мебель",
  "Декор интерьера",
  "Сервировочные доски",
  "Свадебный декор",
  "Детские изделия",
  "Садовый декор",
]

export default function SettingsPage() {
  const { isAuthenticated, user, isCraftsman, updateProfile } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [fullName, setFullName] = useState(user?.fullName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")

  // Craftsman fields
  const [workshopName, setWorkshopName] = useState(user?.workshopName || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [location, setLocation] = useState(user?.location || "")
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>(user?.specializations || [])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account/login")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (user) {
      setFullName(user.fullName)
      setEmail(user.email)
      setPhone(user.phone || "")
      setWorkshopName(user.workshopName || "")
      setBio(user.bio || "")
      setLocation(user.location || "")
      setSelectedSpecs(user.specializations || [])
    }
  }, [user])

  if (!isAuthenticated || !user) {
    return null
  }

  const toggleSpecialization = (spec: string) => {
    setSelectedSpecs((prev) => (prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateProfile({
      fullName,
      phone,
      ...(isCraftsman && {
        workshopName,
        bio,
        location,
        specializations: selectedSpecs,
      }),
    })

    setSuccess(true)
    setIsLoading(false)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 text-3xl font-light tracking-tight">Настройки</h1>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <AccountNav />
        </aside>

        <div className="max-w-2xl space-y-8">
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">Настройки успешно сохранены</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar */}
            <Card>
              <CardHeader>
                <CardTitle>Фото профиля</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {fullName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <Button type="button" variant="outline" size="sm">
                      Загрузить фото
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">JPG, PNG до 5 МБ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle>Личные данные</CardTitle>
                <CardDescription>Основная информация о вас</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Имя и фамилия</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground">Email нельзя изменить</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Craftsman Info */}
            {isCraftsman && (
              <Card>
                <CardHeader>
                  <CardTitle>Информация о мастерской</CardTitle>
                  <CardDescription>Эта информация будет видна покупателям</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="workshopName">Название мастерской</Label>
                    <Input
                      id="workshopName"
                      value={workshopName}
                      onChange={(e) => setWorkshopName(e.target.value)}
                      placeholder="Мастерская дерева"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">О мастерской</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Расскажите о своей мастерской, опыте и уникальности ваших изделий..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Местоположение</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="г. Москва"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Специализация</Label>
                    <div className="flex flex-wrap gap-2">
                      {specializations.map((spec) => (
                        <Badge
                          key={spec}
                          variant={selectedSpecs.includes(spec) ? "default" : "outline"}
                          className="cursor-pointer transition-colors"
                          onClick={() =>
                            selectedSpecs.length < 5 || selectedSpecs.includes(spec) ? toggleSpecialization(spec) : null
                          }
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Выбрано: {selectedSpecs.length}/5</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle>Безопасность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Пароль</p>
                    <p className="text-sm text-muted-foreground">Последнее изменение: никогда</p>
                  </div>
                  <Button type="button" variant="outline">
                    Изменить пароль
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner className="mr-2" />
                    Сохранение...
                  </>
                ) : (
                  "Сохранить изменения"
                )}
              </Button>
            </div>
          </form>

          <Separator />

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Опасная зона</CardTitle>
              <CardDescription>Необратимые действия с аккаунтом</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Удалить аккаунт</p>
                  <p className="text-sm text-muted-foreground">Все данные будут удалены безвозвратно</p>
                </div>
                <Button variant="destructive">Удалить аккаунт</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

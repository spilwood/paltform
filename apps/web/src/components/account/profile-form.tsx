"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@spilwood/ui"
import { Input } from "@spilwood/ui"
import { Label } from "@spilwood/ui"
import { useAuth } from "@/lib/store/auth"
import { Check, Loader2 } from "lucide-react"

export function ProfileForm() {
  const { user, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [fullName, setFullName] = useState(user?.fullName || "")
  const [phone, setPhone] = useState(user?.phone || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateProfile({ fullName, phone })
    setIsLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={user?.email || ""} disabled className="rounded-none bg-muted" />
        <p className="text-xs text-muted-foreground">Email нельзя изменить</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="fullName">Имя и фамилия</Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="rounded-none"
          placeholder="Иван Иванов"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Телефон</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-none"
          placeholder="+7 (999) 123-45-67"
        />
      </div>

      <Button type="submit" className="rounded-none" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Сохранение...
          </>
        ) : saved ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Сохранено
          </>
        ) : (
          "Сохранить изменения"
        )}
      </Button>
    </form>
  )
}

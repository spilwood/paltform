"use client"

import { useState } from "react"
import { ChevronLeft, Copy, Check, Users, Gift, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { openTelegramLink } from "@/lib/telegram"

interface ReferralViewProps {
  onBack: () => void
}

export function ReferralView({ onBack }: ReferralViewProps) {
  const [copied, setCopied] = useState(false)
  const referralCode = "SPIL-USER123"
  const referralLink = `https://t.me/spilwood_bot?start=${referralCode}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareToTelegram = () => {
    const text = encodeURIComponent(`Покупай натуральные спилы дерева в Spilwood и получи скидку 10% по моей ссылке!`)
    openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${text}`)
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10 rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Приведи друга</h1>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Users className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Получайте бонусы вместе!</h2>
          <p className="text-sm text-muted-foreground">
            Приглашайте друзей в Spilwood и получайте бонусы за каждого нового покупателя
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">200 ₽</p>
            <p className="text-xs text-muted-foreground mt-1">Вам на счет</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
              <Gift className="h-6 w-6 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-amber-500">10%</p>
            <p className="text-xs text-muted-foreground mt-1">Скидка другу</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Ваш реферальный код</p>
          <div className="flex gap-2">
            <Input value={referralCode} readOnly className="h-12 rounded-xl font-mono text-center" />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="h-12 w-12 rounded-xl flex-shrink-0 bg-transparent"
            >
              {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <Button onClick={shareToTelegram} className="w-full h-14 rounded-2xl text-base font-semibold">
          <Share2 className="h-5 w-5 mr-2" />
          Поделиться в Telegram
        </Button>

        <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
          <p className="text-sm font-semibold text-foreground">Как это работает?</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>1. Поделитесь ссылкой с друзьями</p>
            <p>2. Друг получит скидку 10% на первый заказ</p>
            <p>3. Вы получите 200 бонусных рублей после его покупки</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-4">
          <p className="text-sm font-semibold text-foreground mb-3">Ваша статистика</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Приглашено</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Купили</p>
            </div>
            <div>
              <p className="text-xl font-bold text-primary">400 ₽</p>
              <p className="text-xs text-muted-foreground">Заработано</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

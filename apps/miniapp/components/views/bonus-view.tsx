"use client"

import { ChevronLeft, Gift, TrendingUp, ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBonus } from "@/lib/bonus-context"

interface BonusViewProps {
  onBack: () => void
}

export function BonusView({ onBack }: BonusViewProps) {
  const { balance, transactions, level, nextLevelProgress } = useBonus()

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10 rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Бонусная программа</h1>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 text-primary-foreground">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90">Ваш баланс</p>
              <p className="text-3xl font-bold">{balance} ₽</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Gift className="h-7 w-7" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-90">Уровень: {level}</span>
              <span className="opacity-90">{Math.round(nextLevelProgress)}%</span>
            </div>
            <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-foreground rounded-full transition-all duration-500"
                style={{ width: `${nextLevelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* How to earn */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Как заработать бонусы
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Кэшбэк с покупок</span>
              <span className="text-foreground font-medium">5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">За приглашенного друга</span>
              <span className="text-foreground font-medium">200 ₽</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">За отзыв с фото</span>
              <span className="text-foreground font-medium">50 ₽</span>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">История операций</h3>
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 bg-card rounded-xl border border-border p-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === "earned" ? "bg-green-500/10" : "bg-red-500/10"
                }`}
              >
                {tx.type === "earned" ? (
                  <ArrowDownCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowUpCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <span className={`text-sm font-semibold ${tx.type === "earned" ? "text-green-500" : "text-red-500"}`}>
                {tx.type === "earned" ? "+" : "-"}
                {tx.amount} ₽
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

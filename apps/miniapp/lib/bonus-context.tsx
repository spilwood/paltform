"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

interface BonusTransaction {
  id: string
  date: string
  description: string
  amount: number
  type: "earned" | "spent"
}

interface BonusContextType {
  balance: number
  transactions: BonusTransaction[]
  earnBonus: (amount: number, description: string) => void
  spendBonus: (amount: number, description: string) => boolean
  level: string
  nextLevelProgress: number
}

const BonusContext = createContext<BonusContextType | undefined>(undefined)

const LEVELS = [
  { name: "Росток", minSpent: 0 },
  { name: "Саженец", minSpent: 3000 },
  { name: "Дерево", minSpent: 10000 },
  { name: "Дуб", minSpent: 25000 },
]

export function BonusProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(150)
  const [totalSpent, setTotalSpent] = useState(0)
  const [transactions, setTransactions] = useState<BonusTransaction[]>([
    {
      id: "1",
      date: "28 ноя 2025",
      description: "Бонус за регистрацию",
      amount: 100,
      type: "earned",
    },
    {
      id: "2",
      date: "29 ноя 2025",
      description: "Кэшбэк за заказ #SW-2847",
      amount: 50,
      type: "earned",
    },
  ])

  useEffect(() => {
    const savedBalance = localStorage.getItem("spilwood_bonus_balance")
    const savedTransactions = localStorage.getItem("spilwood_bonus_transactions")
    const savedTotalSpent = localStorage.getItem("spilwood_total_spent")

    if (savedBalance) setBalance(Number(savedBalance))
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions))
      } catch (e) {}
    }
    if (savedTotalSpent) setTotalSpent(Number(savedTotalSpent))
  }, [])

  useEffect(() => {
    localStorage.setItem("spilwood_bonus_balance", String(balance))
    localStorage.setItem("spilwood_bonus_transactions", JSON.stringify(transactions))
    localStorage.setItem("spilwood_total_spent", String(totalSpent))
  }, [balance, transactions, totalSpent])

  const earnBonus = useCallback((amount: number, description: string) => {
    setBalance((prev) => prev + amount)
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" }),
        description,
        amount,
        type: "earned",
      },
      ...prev,
    ])
  }, [])

  const spendBonus = useCallback(
    (amount: number, description: string) => {
      if (amount > balance) return false
      setBalance((prev) => prev - amount)
      setTotalSpent((prev) => prev + amount)
      setTransactions((prev) => [
        {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" }),
          description,
          amount,
          type: "spent",
        },
        ...prev,
      ])
      return true
    },
    [balance],
  )

  const currentLevel = LEVELS.filter((l) => totalSpent >= l.minSpent).pop() || LEVELS[0]
  const nextLevel = LEVELS.find((l) => l.minSpent > totalSpent)
  const nextLevelProgress = nextLevel
    ? ((totalSpent - currentLevel.minSpent) / (nextLevel.minSpent - currentLevel.minSpent)) * 100
    : 100

  return (
    <BonusContext.Provider
      value={{
        balance,
        transactions,
        earnBonus,
        spendBonus,
        level: currentLevel.name,
        nextLevelProgress,
      }}
    >
      {children}
    </BonusContext.Provider>
  )
}

export function useBonus() {
  const context = useContext(BonusContext)
  if (!context) {
    throw new Error("useBonus must be used within a BonusProvider")
  }
  return context
}

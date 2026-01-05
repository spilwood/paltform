"use client"

import useSWR, { mutate } from "swr"

export interface User {
  id: string
  email: string
  fullName: string
  phone?: string
  createdAt: string
  role: "buyer" | "craftsman"
  // Craftsman specific fields
  workshopName?: string
  bio?: string
  location?: string
  avatar?: string
  specializations?: string[]
  verified?: boolean
  rating?: number
  reviewsCount?: number
  salesCount?: number
  portfolioImages?: string[]
}

export interface CraftsmanProduct {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  inStock: boolean
  createdAt: string
  views: number
  inquiries: number
}

interface OTPData {
  code: string
  email: string
  expiresAt: number
  type: "login" | "reset"
}

const AUTH_KEY = "spilwood-auth"
const OTP_KEY = "spilwood-otp"
const CRAFTSMAN_PRODUCTS_KEY = "spilwood-craftsman-products"

function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(AUTH_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function saveUser(user: User | null) {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_KEY)
    }
  }
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function saveOTP(data: OTPData | null) {
  if (typeof window !== "undefined") {
    if (data) {
      localStorage.setItem(OTP_KEY, JSON.stringify(data))
    } else {
      localStorage.removeItem(OTP_KEY)
    }
  }
}

function getStoredOTP(): OTPData | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(OTP_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function getCraftsmanProducts(): CraftsmanProduct[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(CRAFTSMAN_PRODUCTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCraftsmanProducts(products: CraftsmanProduct[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CRAFTSMAN_PRODUCTS_KEY, JSON.stringify(products))
  }
}

export function useAuth() {
  const { data: user } = useSWR<User | null>("auth", getStoredUser, {
    fallbackData: null,
    revalidateOnFocus: false,
  })

  const { data: craftsmanProducts = [] } = useSWR<CraftsmanProduct[]>("craftsman-products", getCraftsmanProducts, {
    fallbackData: [],
    revalidateOnFocus: false,
  })

  const login = (
    email: string,
    _password: string,
    role: "buyer" | "craftsman" = "buyer",
  ): { success: boolean; error?: string } => {
    const mockUser: User = {
      id: `user-${Date.now()}`,
      email,
      fullName: email.split("@")[0],
      createdAt: new Date().toISOString(),
      role,
      ...(role === "craftsman" && {
        workshopName: "",
        bio: "",
        location: "",
        specializations: [],
        verified: false,
        rating: 0,
        reviewsCount: 0,
        salesCount: 0,
        portfolioImages: [],
      }),
    }
    saveUser(mockUser)
    mutate("auth", mockUser, false)
    return { success: true }
  }

  const register = (
    email: string,
    _password: string,
    fullName: string,
    role: "buyer" | "craftsman" = "buyer",
    craftsmanData?: { workshopName?: string; location?: string; specializations?: string[] },
  ): { success: boolean; error?: string } => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      createdAt: new Date().toISOString(),
      role,
      ...(role === "craftsman" && {
        workshopName: craftsmanData?.workshopName || "",
        bio: "",
        location: craftsmanData?.location || "",
        specializations: craftsmanData?.specializations || [],
        verified: false,
        rating: 0,
        reviewsCount: 0,
        salesCount: 0,
        portfolioImages: [],
      }),
    }
    saveUser(newUser)
    mutate("auth", newUser, false)
    return { success: true }
  }

  const logout = () => {
    saveUser(null)
    mutate("auth", null, false)
  }

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return
    const updatedUser = { ...user, ...updates }
    saveUser(updatedUser)
    mutate("auth", updatedUser, false)
  }

  const addProduct = (product: Omit<CraftsmanProduct, "id" | "createdAt" | "views" | "inquiries">) => {
    const newProduct: CraftsmanProduct = {
      ...product,
      id: `product-${Date.now()}`,
      createdAt: new Date().toISOString(),
      views: 0,
      inquiries: 0,
    }
    const updated = [...craftsmanProducts, newProduct]
    saveCraftsmanProducts(updated)
    mutate("craftsman-products", updated, false)
    return newProduct
  }

  const updateProduct = (id: string, updates: Partial<CraftsmanProduct>) => {
    const updated = craftsmanProducts.map((p) => (p.id === id ? { ...p, ...updates } : p))
    saveCraftsmanProducts(updated)
    mutate("craftsman-products", updated, false)
  }

  const deleteProduct = (id: string) => {
    const updated = craftsmanProducts.filter((p) => p.id !== id)
    saveCraftsmanProducts(updated)
    mutate("craftsman-products", updated, false)
  }

  const sendOTP = (
    email: string,
    type: "login" | "reset" = "login",
  ): { success: boolean; code?: string; error?: string } => {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Введите корректный email" }
    }

    const code = generateOTP()
    const otpData: OTPData = {
      code,
      email,
      expiresAt: Date.now() + 5 * 60 * 1000,
      type,
    }
    saveOTP(otpData)
    return { success: true, code }
  }

  const verifyOTP = (email: string, code: string): { success: boolean; error?: string; type?: "login" | "reset" } => {
    const stored = getStoredOTP()

    if (!stored) {
      return { success: false, error: "Код не найден. Запросите новый код." }
    }

    if (stored.email !== email) {
      return { success: false, error: "Email не совпадает" }
    }

    if (Date.now() > stored.expiresAt) {
      saveOTP(null)
      return { success: false, error: "Код истёк. Запросите новый код." }
    }

    if (stored.code !== code) {
      return { success: false, error: "Неверный код" }
    }

    const type = stored.type
    saveOTP(null)

    if (type === "login") {
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        fullName: email.split("@")[0],
        createdAt: new Date().toISOString(),
        role: "buyer",
      }
      saveUser(mockUser)
      mutate("auth", mockUser, false)
    }

    return { success: true, type }
  }

  const resetPassword = (_email: string, _newPassword: string): { success: boolean; error?: string } => {
    return { success: true }
  }

  const switchRole = (newRole: "buyer" | "craftsman") => {
    if (!user) return
    const updatedUser: User = {
      ...user,
      role: newRole,
      ...(newRole === "craftsman" &&
        !user.workshopName && {
          workshopName: "",
          bio: "",
          location: "",
          specializations: [],
          verified: false,
          rating: 0,
          reviewsCount: 0,
          salesCount: 0,
          portfolioImages: [],
        }),
    }
    saveUser(updatedUser)
    mutate("auth", updatedUser, false)
  }

  return {
    user,
    isAuthenticated: !!user,
    isCraftsman: user?.role === "craftsman",
    isBuyer: user?.role === "buyer",
    craftsmanProducts,
    login,
    register,
    logout,
    updateProfile,
    sendOTP,
    verifyOTP,
    resetPassword,
    switchRole,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}

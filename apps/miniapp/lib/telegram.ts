"use client"

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

export interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    query_id?: string
    user?: TelegramUser
    auth_date?: number
    hash?: string
  }
  version: string
  platform: string
  colorScheme: "light" | "dark"
  themeParams: ThemeParams
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  headerColor: string
  backgroundColor: string
  isClosingConfirmationEnabled: boolean
  ready: () => void
  expand: () => void
  close: () => void
  enableClosingConfirmation: () => void
  disableClosingConfirmation: () => void
  setHeaderColor: (color: string) => void
  setBackgroundColor: (color: string) => void
  MainButton: MainButton
  BackButton: BackButton
  HapticFeedback: HapticFeedback
  openLink: (url: string) => void
  openTelegramLink: (url: string) => void
  showPopup: (params: PopupParams, callback?: (buttonId: string) => void) => void
  showAlert: (message: string, callback?: () => void) => void
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void
  sendData: (data: string) => void
  CloudStorage: CloudStorage
}

export interface TelegramUser {
  id: number
  is_bot?: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

export interface ThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
}

export interface MainButton {
  text: string
  color: string
  textColor: string
  isVisible: boolean
  isActive: boolean
  isProgressVisible: boolean
  setText: (text: string) => void
  onClick: (callback: () => void) => void
  offClick: (callback: () => void) => void
  show: () => void
  hide: () => void
  enable: () => void
  disable: () => void
  showProgress: (leaveActive?: boolean) => void
  hideProgress: () => void
  setParams: (params: {
    text?: string
    color?: string
    text_color?: string
    is_active?: boolean
    is_visible?: boolean
  }) => void
}

export interface BackButton {
  isVisible: boolean
  onClick: (callback: () => void) => void
  offClick: (callback: () => void) => void
  show: () => void
  hide: () => void
}

export interface HapticFeedback {
  impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void
  notificationOccurred: (type: "error" | "success" | "warning") => void
  selectionChanged: () => void
}

export interface PopupParams {
  title?: string
  message: string
  buttons?: PopupButton[]
}

export interface PopupButton {
  id?: string
  type?: "default" | "ok" | "close" | "cancel" | "destructive"
  text?: string
}

export interface CloudStorage {
  setItem: (key: string, value: string, callback?: (error: Error | null, stored: boolean) => void) => void
  getItem: (key: string, callback?: (error: Error | null, value: string) => void) => void
  getItems: (keys: string[], callback?: (error: Error | null, values: Record<string, string>) => void) => void
  removeItem: (key: string, callback?: (error: Error | null, removed: boolean) => void) => void
  removeItems: (keys: string[], callback?: (error: Error | null, removed: boolean) => void) => void
  getKeys: (callback?: (error: Error | null, keys: string[]) => void) => void
}

// Helper functions
export function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    return window.Telegram.WebApp
  }
  return null
}

export function getTelegramUser(): TelegramUser | null {
  const webApp = getTelegramWebApp()
  return webApp?.initDataUnsafe?.user || null
}

export function isTelegramWebApp(): boolean {
  return getTelegramWebApp() !== null
}

export function hapticFeedback(type: "impact" | "notification" | "selection", style?: string) {
  const webApp = getTelegramWebApp()
  if (!webApp?.HapticFeedback) return

  switch (type) {
    case "impact":
      webApp.HapticFeedback.impactOccurred((style as "light" | "medium" | "heavy" | "rigid" | "soft") || "medium")
      break
    case "notification":
      webApp.HapticFeedback.notificationOccurred((style as "error" | "success" | "warning") || "success")
      break
    case "selection":
      webApp.HapticFeedback.selectionChanged()
      break
  }
}

export function showMainButton(text: string, onClick: () => void) {
  const webApp = getTelegramWebApp()
  if (!webApp?.MainButton) return

  webApp.MainButton.setText(text)
  webApp.MainButton.onClick(onClick)
  webApp.MainButton.show()
}

export function hideMainButton() {
  const webApp = getTelegramWebApp()
  if (!webApp?.MainButton) return
  webApp.MainButton.hide()
}

export function showBackButton(onClick: () => void) {
  const webApp = getTelegramWebApp()
  if (!webApp?.BackButton) return

  webApp.BackButton.onClick(onClick)
  webApp.BackButton.show()
}

export function hideBackButton() {
  const webApp = getTelegramWebApp()
  if (!webApp?.BackButton) return
  webApp.BackButton.hide()
}

export function openTelegramLink(url: string) {
  const webApp = getTelegramWebApp()
  if (webApp) {
    webApp.openTelegramLink(url)
  } else {
    window.open(url, "_blank")
  }
}

export function showAlert(message: string, callback?: () => void) {
  const webApp = getTelegramWebApp()
  if (webApp) {
    webApp.showAlert(message, callback)
  } else {
    alert(message)
    callback?.()
  }
}

export function showConfirm(message: string, callback: (confirmed: boolean) => void) {
  const webApp = getTelegramWebApp()
  if (webApp) {
    webApp.showConfirm(message, callback)
  } else {
    const result = confirm(message)
    callback(result)
  }
}

export const telegram = {
  getTelegramWebApp,
  getTelegramUser,
  isTelegramWebApp,
  hapticFeedback,
  showMainButton,
  hideMainButton,
  showBackButton,
  hideBackButton,
  openTelegramLink,
  showAlert,
  showConfirm,
}

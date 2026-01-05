"use client"

import { Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { openTelegramLink } from "@/lib/telegram"

interface ShareProductProps {
  productName: string
  productId: string
}

export function ShareProduct({ productName, productId }: ShareProductProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `https://t.me/spilwood_bot?start=product_${productId}`

  const handleShare = () => {
    const text = encodeURIComponent(`Посмотри этот товар в Spilwood: ${productName}`)
    openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${text}`)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleShare} className="h-9 rounded-lg gap-1.5 bg-transparent">
        <Share2 className="h-4 w-4" />
        Поделиться
      </Button>
      <Button variant="ghost" size="icon" onClick={handleCopy} className="h-9 w-9 rounded-lg">
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Bot, User, Sparkles, ShoppingBag, Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  slug: string
  category: string
  price: number
  inStock: boolean
}

export function ProductChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const quickQuestions = [
    "Что подойдёт для свадьбы?",
    "Хочу сделать часы",
    "Нужны подставки под кружки",
    "Что есть в наличии?",
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-110",
          "bg-primary hover:bg-primary/90",
          isOpen && "hidden",
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[380px] overflow-hidden border-0 shadow-2xl sm:w-[420px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">AI Помощник</h3>
                <p className="text-xs opacity-80">Помогу подобрать товар</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="h-[400px] bg-muted/30" ref={scrollRef}>
            <div className="flex flex-col gap-4 p-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-background p-3 shadow-sm">
                      <p className="text-sm">
                        Привет! Я AI помощник Spilwood. Расскажите, для чего вам нужны спилы или пеньки, и я подберу
                        идеальный вариант!
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q) => (
                      <Button
                        key={q}
                        variant="outline"
                        size="sm"
                        className="h-auto rounded-full py-1 text-xs bg-transparent"
                        onClick={() => {
                          sendMessage({ text: q })
                        }}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}>
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-primary/10",
                    )}
                  >
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-3 shadow-sm",
                      message.role === "user"
                        ? "rounded-tr-none bg-primary text-primary-foreground"
                        : "rounded-tl-none bg-background",
                    )}
                  >
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <p key={index} className="whitespace-pre-wrap text-sm">
                            {part.text}
                          </p>
                        )
                      }
                      if (part.type === "tool-recommendProducts" && part.state === "output-available") {
                        const result = part.output as { products: Product[]; reason: string }
                        return (
                          <div key={index} className="mt-3 space-y-2">
                            <p className="text-xs text-muted-foreground">{result.reason}</p>
                            {result.products.map((product) => (
                              <Link
                                key={product.id}
                                href={`/spily/${product.category}/${product.slug}`}
                                className="block"
                              >
                                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2 transition-colors hover:bg-muted">
                                  <div className="flex items-center gap-2">
                                    <ShoppingBag className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">{product.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold">{product.price} ₽</span>
                                    {product.inStock ? (
                                      <Badge variant="secondary" className="text-xs">
                                        В наличии
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-xs">
                                        Под заказ
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-background p-3 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <CardContent className="border-t p-3">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Напишите сообщение..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}

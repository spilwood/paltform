import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import type { MasterWork, Master } from "@/lib/data/masters"

interface WorkCardProps {
  work: MasterWork
  master: Master
}

export function WorkCard({ work, master }: WorkCardProps) {
  return (
    <Card className="group h-full overflow-hidden p-0 transition-all duration-200 hover:shadow-lg">
      <Link href={`/mastera/raboty/${work.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={work.images[0] || "/placeholder.svg?height=400&width=400&query=handmade wooden craft"}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute left-3 top-3 bg-background/95 text-foreground hover:bg-background">
            {work.categoryName}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/mastera/raboty/${work.slug}`}>
          <h3 className="font-semibold leading-tight transition-colors group-hover:text-primary">{work.title}</h3>
        </Link>

        <div className="mt-3 flex items-center gap-2">
          <Avatar className="h-6 w-6 border">
            <AvatarImage src={master.avatar || "/placeholder.svg"} alt={master.name} />
            <AvatarFallback className="text-xs">{master.name[0]}</AvatarFallback>
          </Avatar>
          <Link
            href={`/mastera/${master.slug}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {master.name}
          </Link>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Материал: {work.usedMaterials.map((m) => m.productName).join(", ")}
        </p>
      </CardContent>

      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-bold">{work.price.toLocaleString("ru-RU")} ₽</span>
          <Link
            href={`/mastera/raboty/${work.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
          >
            Подробнее
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

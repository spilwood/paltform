import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, MapPin, FolderOpen } from "lucide-react"
import type { Master } from "@/lib/data/masters"

interface MasterCardProps {
  master: Master
}

export function MasterCard({ master }: MasterCardProps) {
  return (
    <Link href={`/mastera/${master.slug}`} className="group block">
      <Card className="h-full transition-all duration-200 hover:border-primary/50 hover:shadow-md">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 border-2 border-muted">
              <AvatarImage src={master.avatar || "/placeholder.svg"} alt={master.name} />
              <AvatarFallback className="text-lg font-medium">{master.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold truncate transition-colors group-hover:text-primary">{master.name}</h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="font-normal">
                  <MapPin className="mr-1 h-3 w-3" />
                  {master.location}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  <FolderOpen className="mr-1 h-3 w-3" />
                  {master.worksCount} работ
                </Badge>
              </div>
            </div>
          </div>
          <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{master.bio}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

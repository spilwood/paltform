import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 bg-transparent shadow-none">
      <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
        <Skeleton className="h-full w-full" />
      </AspectRatio>
      <CardContent className="px-0 pt-4">
        <Skeleton className="h-5 w-3/4" />
        <div className="mt-2 flex items-center gap-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardContent>
    </Card>
  )
}

interface ProductGridSkeletonProps {
  count?: number
}

export function ProductGridSkeleton({ count = 4 }: ProductGridSkeletonProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

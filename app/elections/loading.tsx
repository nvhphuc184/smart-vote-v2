import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ElectionsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>

        {/* Filters Skeleton */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-40" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Elections Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-0 shadow-xl overflow-hidden">
              <Skeleton className="h-32 w-full" />
              <CardContent className="p-6">
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="text-center">
                      <Skeleton className="h-5 w-5 mx-auto mb-2" />
                      <Skeleton className="h-3 w-full mb-1" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
                <div className="mb-6">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((k) => (
                      <Skeleton key={k} className="w-10 h-10 rounded-full" />
                    ))}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function BlogPostSkeleton() {
  return (
    <article className="min-h-screen bg-background animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative h-[60vh] min-h-[400px] w-full bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl space-y-4">
            <Skeleton className="w-24 h-6 rounded-md" />
            <Skeleton className="h-10 w-3/4 rounded-md" />
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <Skeleton className="h-8 w-8 rounded-full" />
                </Avatar>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32 mt-1" />
                </div>
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8">
          {/* Main content skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>

            {/* Tags section */}
            <div className="pt-8 space-y-2">
              <Skeleton className="h-5 w-40" />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>

            {/* Author Card Skeleton */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="sticky top-24 flex flex-col gap-4">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Separator />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-36 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center mx-auto px-4">
      <div className="flex flex-col items-center gap-2 max-w-md">
        <Loader className="h-10 w-10 animate-spin text-primary" />
        <h2 className="text-xl font-semibold text-center">Loading...</h2>
        <p className="text-sm text-muted-foreground">Please wait while we load your content.</p>
      </div>
    </div>
  )
}


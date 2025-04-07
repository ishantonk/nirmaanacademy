"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/format"
import { toast } from "sonner"
import { ReviewType } from "@/lib/types"

interface CourseReviewsProps {
  reviews: ReviewType[]
  courseId: string
  isEnrolled: boolean
  averageRating: number
}

export function CourseReviews({ reviews, courseId, isEnrolled, averageRating }: CourseReviewsProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check if user has already reviewed
  const userReview = session ? reviews.find((review) => review.user.id === session.user.id) : null

  const handleSubmitReview = async () => {
    if (!session) {
      return router.push("/login")
    }

    if (!isEnrolled) {
      return toast.error("Enrollment required", {
        description: "You need to be enrolled in this course to leave a review."
      })
    }

    try {
      setIsSubmitting(true)

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          rating,
          comment,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit review")
      }

      toast.success("Review submitted", {
        description: "Your review has been submitted successfully."
      })

      router.refresh()
    } catch {
      toast.error("Error", {
        description: "Failed to submit review. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
          <span className="ml-1 text-yellow-500">★</span>
        </div>
        <div>
          <p className="text-muted-foreground">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>

      {isEnrolled && !userReview && (
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Write a Review</h3>
          <div className="mt-4">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                  <Star
                    className={`h-6 w-6 ${star <= rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                      }`}
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <Button onClick={handleSubmitReview} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  {review.user.image ? (
                    <Image
                      src={review.user.image || "/placeholder.svg"}
                      alt={review.user.name || ""}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      {review.user.name?.[0] || "U"}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{review.user.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
                  </div>
                </div>
              </div>
              {review.comment && <p className="mt-2 text-muted-foreground">{review.comment}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No reviews yet.</p>
      )}
    </div>
  )
}


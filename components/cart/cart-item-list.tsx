"use client"

import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { toast } from "sonner"

interface CartItemListProps {
  items: {
    id: string;
    course: {
      id: string;
      title: string;
      slug: string;
      thumbnail?: string;
      category?: {
        name: string;
      };
      price: number;
    };
  }[]
}

export function CartItemList({ items }: CartItemListProps) {
  const queryClient = useQueryClient()

  const removeFromCart = async (courseId: string) => {
    try {
      const response = await fetch(`/api/cart/${courseId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove item from cart")
      }

      // Invalidate cart query to refresh data
      queryClient.invalidateQueries({ queryKey: ["cart"] })

      toast.success("Item removed", {
        description: "The item has been removed from your cart",
      })
    } catch {
      toast.error("Error", {
        description: "Failed to remove item from cart",
      })
    }
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="flex gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-md">
            {item.course.thumbnail ? (
              <Image
                src={item.course.thumbnail || "/placeholder.svg"}
                alt={item.course.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <Link href={`/courses/${item.course.slug}`} className="line-clamp-1 font-medium hover:underline">
              {item.course.title}
            </Link>
            <p className="text-sm text-muted-foreground">{item.course.category?.name || "Uncategorized"}</p>
            <p className="font-medium">{formatPrice(item.course.price)}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.course.id)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </li>
      ))}
    </ul>
  )
}


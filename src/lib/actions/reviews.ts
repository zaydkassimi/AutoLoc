"use server"

import { db } from "@/lib/db"
import type { Review } from "@/lib/types"

function mapReview(r: any): Review {
  return {
    id: r.id,
    userId: r.userId,
    vehicleId: r.vehicleId,
    bookingId: r.bookingId,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt.toISOString(),
    userName: r.user?.name ?? "Anonyme",
    userAvatar: r.user?.avatar ?? undefined,
  }
}

export async function getReviews(): Promise<Review[]> {
  const reviews = await db.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  })
  return reviews.map(mapReview)
}

export async function getReviewsByVehicle(vehicleId: string): Promise<Review[]> {
  const reviews = await db.review.findMany({
    where: { vehicleId },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  })
  return reviews.map(mapReview)
}

export async function createReview(data: {
  userId: string
  vehicleId: string
  bookingId: string
  rating: number
  comment: string
}): Promise<Review> {
  const review = await db.review.create({
    data,
    include: { user: true },
  })
  return mapReview(review)
}

export async function deleteReview(id: string): Promise<void> {
  await db.review.delete({ where: { id } })
}

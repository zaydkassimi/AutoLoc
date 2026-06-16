import { getVehicleById } from "@/lib/actions/vehicles"
import { getReviewsByVehicle } from "@/lib/actions/reviews"
import { getBookings } from "@/lib/actions/bookings"
import { notFound } from "next/navigation"
import CarDetailClient from "./CarDetailClient"

interface CarDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params
  const [vehicle, vehicleReviews, bookings] = await Promise.all([
    getVehicleById(id),
    getReviewsByVehicle(id),
    getBookings(),
  ])

  if (!vehicle) {
    notFound()
  }

  const isReserved = bookings.some(
    b => b.vehicleId === id && (b.status === "pending" || b.status === "confirmed" || b.status === "active")
  )

  return <CarDetailClient vehicle={vehicle} reviews={vehicleReviews} isReserved={isReserved} />
}

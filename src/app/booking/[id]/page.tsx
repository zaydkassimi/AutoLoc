import { getVehicleById } from "@/lib/actions/vehicles"
import { getLocations } from "@/lib/actions/locations"
import { getBookings } from "@/lib/actions/bookings"
import { notFound, redirect } from "next/navigation"
import BookingPageClient from "./BookingPageClient"

interface BookingPageProps {
  params: Promise<{ id: string }>
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { id } = await params
  const [vehicle, locations, bookings] = await Promise.all([
    getVehicleById(id),
    getLocations(),
    getBookings(),
  ])

  if (!vehicle) {
    notFound()
  }

  const isReserved = bookings.some(
    b => b.vehicleId === id && (b.status === "pending" || b.status === "confirmed" || b.status === "active")
  )

  if (isReserved) {
    redirect(`/cars/${id}`)
  }

  return <BookingPageClient vehicle={vehicle} locations={locations} />
}

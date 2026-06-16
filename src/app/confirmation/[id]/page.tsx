import { getBookingById } from "@/lib/actions/bookings"
import { getVehicleById } from "@/lib/actions/vehicles"
import { notFound } from "next/navigation"
import ConfirmationPageClient from "./ConfirmationPageClient"

interface ConfirmationPageProps {
  params: Promise<{ id: string }>
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = await params
  const booking = await getBookingById(id)

  if (!booking) {
    notFound()
  }

  const vehicle = await getVehicleById(booking.vehicleId)

  if (!vehicle) {
    notFound()
  }

  return <ConfirmationPageClient booking={booking} vehicle={vehicle} />
}

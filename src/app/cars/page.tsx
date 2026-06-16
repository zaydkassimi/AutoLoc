import { getVehicles } from "@/lib/actions/vehicles"
import { getBookings } from "@/lib/actions/bookings"
import CarsPageClient from "./CarsPageClient"

export const dynamic = "force-dynamic"

export default async function CarsPage() {
  const [vehicles, bookings] = await Promise.all([
    getVehicles(),
    getBookings(),
  ])
  return <CarsPageClient vehicles={vehicles} bookings={bookings} />
}

import { getVehicles } from "@/lib/actions/vehicles"
import { getBookings } from "@/lib/actions/bookings"
import AgentPageClient from "./AgentPageClient"

export default async function AgentPage() {
  const [vehicles, bookings] = await Promise.all([
    getVehicles(),
    getBookings(),
  ])

  return <AgentPageClient vehicles={vehicles} bookings={bookings} />
}

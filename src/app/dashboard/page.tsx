import { getVehicles } from "@/lib/actions/vehicles"
import { getBookings } from "@/lib/actions/bookings"
import { getUsers } from "@/lib/actions/users"
import { getAgents } from "@/lib/actions/agents"
import { getReviews } from "@/lib/actions/reviews"
import DashboardPageClient from "./DashboardPageClient"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const [vehicles, bookings, users, agents, reviews] = await Promise.all([
    getVehicles(),
    getBookings(),
    getUsers(),
    getAgents(),
    getReviews(),
  ])

  return (
    <DashboardPageClient
      vehicles={vehicles}
      bookings={bookings}
      users={users}
      agents={agents}
      reviews={reviews}
    />
  )
}

import { getBookings } from "@/lib/actions/bookings"
import { getVehicles } from "@/lib/actions/vehicles"
import { getUsers } from "@/lib/actions/users"
import MyBookingsPageClient from "./MyBookingsPageClient"

export default async function BookingListPage() {
  const [bookings, vehicles, users] = await Promise.all([
    getBookings(),
    getVehicles(),
    getUsers(),
  ])

  return <MyBookingsPageClient bookings={bookings} vehicles={vehicles} users={users} />
}

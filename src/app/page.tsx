import { getFeaturedVehicles } from "@/lib/actions/vehicles"
import { getLocations } from "@/lib/actions/locations"
import HomeClient from "./HomeClient"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [vehicles, locations] = await Promise.all([
    getFeaturedVehicles(),
    getLocations(),
  ])

  return <HomeClient vehicles={vehicles} locations={locations} />
}

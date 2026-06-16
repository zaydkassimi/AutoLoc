"use server"

import { db } from "@/lib/db"
import type { Location } from "@/lib/types"

function mapLocation(l: any): Location {
  return {
    id: l.id,
    name: l.name,
    address: l.address,
    city: l.city,
    country: l.country,
    coordinates: {
      lat: l.latitude,
      lng: l.longitude,
    },
    operatingHours: l.operatingHours,
    phone: l.phone ?? undefined,
  }
}

export async function getLocations(): Promise<Location[]> {
  const locations = await db.location.findMany({
    orderBy: { city: "asc" },
  })
  return locations.map(mapLocation)
}

export async function getLocationById(id: string): Promise<Location | null> {
  const location = await db.location.findUnique({ where: { id } })
  return location ? mapLocation(location) : null
}

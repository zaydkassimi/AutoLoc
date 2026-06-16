"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Fuel, Users, Gauge, ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Vehicle } from "@/lib/types"

interface VehicleCardProps {
  vehicle: Vehicle
  isReserved?: boolean
}

const categoryLabels: Record<string, string> = {
  economique: "Économique",
  confort: "Confort",
  suv: "SUV",
  luxe: "Luxe",
  sport: "Sport",
  utilitaire: "Utilitaire",
  van: "Van",
  electrique: "Électrique",
}

const fuelLabels: Record<string, string> = {
  essence: "Essence",
  diesel: "Diesel",
  hybride: "Hybride",
  electrique: "Électrique",
}

const transmissionLabels: Record<string, string> = {
  automatique: "Auto",
  manuelle: "Manuel",
}

export function VehicleCard({ vehicle, isReserved }: VehicleCardProps) {
  return (
    <Link href={`/cars/${vehicle.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="overflow-hidden bg-[var(--color-paper)] border-[var(--color-rule)] hover:border-[var(--color-accent)]/50 transition-colors">
          <div className="relative aspect-[16/10] bg-gradient-to-br from-[var(--color-paper-2)] to-[var(--color-paper-3)]">
            {vehicle.images[0] ? (
              <img
                src={vehicle.images[0]}
                alt={vehicle.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-[var(--color-muted)]" />
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-[var(--color-accent)] text-[var(--color-accent-ink)]">
                {categoryLabels[vehicle.category] || vehicle.category}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Badge
                variant="secondary"
                className={isReserved
                  ? "bg-red-500/90 text-white"
                  : "bg-green-500/90 text-white"
                }
              >
                {isReserved ? "Réservé" : "Disponible"}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs text-[var(--color-muted)]">{vehicle.brand} · {vehicle.year}</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-2">
              {vehicle.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-[var(--color-muted)] mb-3">
              <MapPin className="h-3 w-3" />
              {vehicle.location}
            </div>
            <div className="flex items-center gap-4 text-xs text-[var(--color-muted)] mb-4">
              <div className="flex items-center gap-1">
                <Fuel className="h-3 w-3" />
                {fuelLabels[vehicle.fuelType] || vehicle.fuelType}
              </div>
              <div className="flex items-center gap-1">
                <Gauge className="h-3 w-3" />
                {transmissionLabels[vehicle.transmission] || vehicle.transmission}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {vehicle.seats} places
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[var(--color-rule)]">
              <div>
                <span className="text-2xl font-display font-bold text-[var(--color-accent)]">
                  {vehicle.pricePerDay}
                </span>
                <span className="text-sm text-[var(--color-muted)]"> MAD/jour</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

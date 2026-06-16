"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Star, Fuel, Users, Gauge, ArrowRight, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Vehicle } from "@/lib/types"

const categoryLabels: Record<string, string> = {
  economique: "Économique",
  confort: "Confort",
  suv: "SUV",
  luxe: "Luxe",
  sport: "Sport",
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

interface FeaturedCarsProps {
  vehicles: Vehicle[]
}

export function FeaturedCars({ vehicles }: FeaturedCarsProps) {
  const featuredVehicles = vehicles.slice(0, 6)

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 lg:mb-16 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] mb-3"
            >
              Notre flotte
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-ink)] tracking-tight"
            >
              Véhicules populaires
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/cars">
              <Button variant="ghost" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] hover:bg-transparent p-0 h-auto text-sm font-medium">
                Voir toute la flotte
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link href={`/cars/${vehicle.id}`}>
                <div className="group bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-xl overflow-hidden hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                  <div className="aspect-[16/10] bg-gradient-to-br from-[var(--color-paper-3)] to-[var(--color-paper-2)] relative overflow-hidden">
                    {vehicle.images[0] ? (
                      <img
                        src={vehicle.images[0]}
                        alt={vehicle.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[var(--color-muted)]">
                        <ImageIcon className="h-8 w-8" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] text-[10px] font-medium border-0">
                        {categoryLabels[vehicle.category] || vehicle.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-[var(--color-paper)]/90 backdrop-blur-sm px-2 py-0.5 rounded-md">
                      <Star className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                      <span className="text-xs font-medium text-[var(--color-ink)]">{vehicle.rating}</span>
                      <span className="text-[10px] text-[var(--color-muted)]">({vehicle.reviewCount})</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                          {vehicle.name}
                        </h3>
                        <p className="text-xs text-[var(--color-muted)] mt-0.5">{vehicle.brand} · {vehicle.year} · {vehicle.location}</p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <p className="font-display text-xl font-bold text-[var(--color-accent)]">
                          {vehicle.pricePerDay}
                        </p>
                        <p className="text-[10px] text-[var(--color-muted)]">MAD / jour</p>
                      </div>
                    </div>

                    <div className="h-px bg-[var(--color-rule)] my-3" />

                    <div className="flex items-center gap-4 text-[11px] text-[var(--color-muted)]">
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
                        {vehicle.seats}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

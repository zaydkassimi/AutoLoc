"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, Car, Clock, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import type { Booking, Vehicle, User } from "@/lib/types"

interface MyBookingsPageClientProps {
  bookings: Booking[]
  vehicles: Vehicle[]
  users: User[]
}

const statusLabels: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  active: "Active",
  completed: "Terminée",
  cancelled: "Annulée",
  rejected: "Rejetée",
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  active: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  rejected: "bg-red-100 text-red-800",
}

export default function MyBookingsPageClient({ bookings, vehicles, users }: MyBookingsPageClientProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  if (!isAuthenticated || !user) {
    router.push("/login")
    return null
  }

  const userBookings = bookings.filter(b => b.userId === user.id)

  const filteredBookings = userBookings.filter(b => {
    const vehicle = vehicles.find(v => v.id === b.vehicleId)
    const matchesSearch = search === "" ||
      vehicle?.name.toLowerCase().includes(search.toLowerCase()) ||
      vehicle?.brand.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
              Mes réservations
            </h1>
            <p className="text-[var(--color-ink-2)]">
              Consultez et suivez toutes vos réservations
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
              <Input
                placeholder="Rechercher un véhicule..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "pending", "confirmed", "active", "completed", "cancelled"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]" : ""}
                >
                  {status === "all" ? "Toutes" : statusLabels[status]}
                </Button>
              ))}
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-12 text-center">
              <Car className="h-12 w-12 text-[var(--color-muted)] mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-2">
                Aucune réservation trouvée
              </h3>
              <p className="text-[var(--color-muted)] mb-6">
                {userBookings.length === 0
                  ? "Vous n'avez pas encore de réservation."
                  : "Aucune réservation ne correspond à votre recherche."}
              </p>
              <Link href="/cars">
                <Button className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)]">
                  Parcourir les véhicules
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => {
                const vehicle = vehicles.find(v => v.id === booking.vehicleId)
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/confirmation/${booking.id}`}>
                      <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-5 hover:border-[var(--color-accent)]/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-16 h-16 rounded-lg bg-[var(--color-paper-2)] overflow-hidden shrink-0">
                              {vehicle?.images[0] ? (
                                <img src={vehicle.images[0]} alt={vehicle.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Car className="h-6 w-6 text-[var(--color-muted)]" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display font-semibold text-[var(--color-ink)] truncate">
                                  {vehicle?.name || "Véhicule inconnu"}
                                </h3>
                                <Badge className={`text-[10px] ${statusColors[booking.status] || "bg-gray-100 text-gray-800"}`}>
                                  {statusLabels[booking.status] || booking.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(booking.startDate).toLocaleDateString("fr-FR")} → {new Date(booking.endDate).toLocaleDateString("fr-FR")}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {booking.pickupLocation}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-display font-bold text-[var(--color-accent)]">
                              {booking.totalPrice} MAD
                            </p>
                            <ChevronRight className="h-4 w-4 text-[var(--color-muted)] ml-auto mt-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

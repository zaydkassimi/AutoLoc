"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, CheckCircle, XCircle, Calendar, Car, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { updateBookingStatus } from "@/lib/actions/bookings"
import { toast } from "sonner"
import type { Vehicle, Booking } from "@/lib/types"

interface AgentPageClientProps {
  vehicles: Vehicle[]
  bookings: Booking[]
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
}

export default function AgentPageClient({ vehicles, bookings }: AgentPageClientProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  if (!isAuthenticated || user?.role !== "agent") {
    router.push("/login")
    return null
  }

  const filteredBookings = bookings.filter(b => {
    const vehicle = vehicles.find(v => v.id === b.vehicleId)
    const matchesSearch = search === "" ||
      vehicle?.name.toLowerCase().includes(search.toLowerCase()) ||
      vehicle?.brand.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingCount = bookings.filter(b => b.status === "pending").length
  const activeCount = bookings.filter(b => b.status === "active" || b.status === "confirmed").length

  const handleConfirm = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, "confirmed")
      toast.success("Réservation confirmée")
      setRefreshKey(k => k + 1)
      router.refresh()
    } catch {
      toast.error("Erreur lors de la confirmation")
    }
  }

  const handleCancel = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, "cancelled")
      toast.success("Réservation annulée")
      setRefreshKey(k => k + 1)
      router.refresh()
    } catch {
      toast.error("Erreur lors de l'annulation")
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
              Espace Agent
            </h1>
            <p className="text-[var(--color-ink-2)]">
              Consultez et gérez les réservations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-[var(--color-ink)]">{pendingCount}</p>
                  <p className="text-xs text-[var(--color-muted)]">En attente</p>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-[var(--color-ink)]">{activeCount}</p>
                  <p className="text-xs text-[var(--color-muted)]">Actives / Confirmées</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6">
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

            <div className="border border-[var(--color-rule)] rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[var(--color-paper-2)]">
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-[var(--color-muted)]">
                        Aucune réservation trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => {
                      const vehicle = vehicles.find(v => v.id === booking.vehicleId)
                      return (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[var(--color-paper-2)] overflow-hidden shrink-0">
                                {vehicle?.images[0] ? (
                                  <img src={vehicle.images[0]} alt={vehicle.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Car className="h-4 w-4 text-[var(--color-muted)]" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-[var(--color-ink)] text-sm">{vehicle?.name || "N/A"}</p>
                                <p className="text-xs text-[var(--color-muted)]">{vehicle?.brand}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{new Date(booking.startDate).toLocaleDateString("fr-FR")}</p>
                            <p className="text-xs text-[var(--color-muted)]">→ {new Date(booking.endDate).toLocaleDateString("fr-FR")}</p>
                          </TableCell>
                          <TableCell className="text-sm text-[var(--color-ink)]">{booking.pickupLocation}</TableCell>
                          <TableCell className="font-medium text-[var(--color-accent)]">{booking.totalPrice} MAD</TableCell>
                          <TableCell>
                            <Badge className={`text-[10px] ${statusColors[booking.status] || "bg-gray-100 text-gray-800"}`}>
                              {statusLabels[booking.status] || booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedBooking(booking)}
                                title="Voir les détails"
                              >
                                <Calendar className="h-4 w-4" />
                              </Button>
                              {booking.status === "pending" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleConfirm(booking.id)}
                                    title="Confirmer"
                                  >
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleCancel(booking.id)}
                                    title="Annuler"
                                  >
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  </Button>
                                </>
                              )}
                              {booking.status === "confirmed" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleCancel(booking.id)}
                                  title="Annuler"
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Détails de la réservation</DialogTitle>
              </DialogHeader>
              {selectedBooking && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[var(--color-muted)]">Véhicule</p>
                      <p className="text-sm text-[var(--color-ink)]">{vehicles.find(v => v.id === selectedBooking.vehicleId)?.name || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted)]">Statut</p>
                      <Badge className={`text-[10px] ${statusColors[selectedBooking.status] || "bg-gray-100 text-gray-800"}`}>
                        {statusLabels[selectedBooking.status] || selectedBooking.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted)]">Date de début</p>
                      <p className="text-sm text-[var(--color-ink)]">{new Date(selectedBooking.startDate).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted)]">Date de fin</p>
                      <p className="text-sm text-[var(--color-ink)]">{new Date(selectedBooking.endDate).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted)]">Lieu de prise en charge</p>
                      <p className="text-sm text-[var(--color-ink)]">{selectedBooking.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted)]">Lieu de retour</p>
                      <p className="text-sm text-[var(--color-ink)]">{selectedBooking.returnLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted)]">Total</p>
                      <p className="text-sm font-bold text-[var(--color-accent)]">{selectedBooking.totalPrice} MAD</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted)]">Assurance</p>
                      <p className="text-sm text-[var(--color-ink)]">{selectedBooking.insurance || "Aucune"}</p>
                    </div>
                  </div>
                  {selectedBooking.notes && (
                    <div>
                      <p className="text-xs text-[var(--color-muted)]">Notes</p>
                      <p className="text-sm text-[var(--color-ink)]">{selectedBooking.notes}</p>
                    </div>
                  )}
                  <div className="flex gap-2 pt-2 border-t border-[var(--color-rule)]">
                    {selectedBooking.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => { handleConfirm(selectedBooking.id); setSelectedBooking(null) }}
                          className="bg-green-600 text-white hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirmer
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => { handleCancel(selectedBooking.id); setSelectedBooking(null) }}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Annuler
                        </Button>
                      </>
                    )}
                    {selectedBooking.status === "confirmed" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => { handleCancel(selectedBooking.id); setSelectedBooking(null) }}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Annuler
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </div>
  )
}

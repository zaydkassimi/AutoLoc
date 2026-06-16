"use client"

import { useState } from "react"
import { Search, Eye, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { updateBookingStatus } from "@/lib/actions/bookings"
import type { Booking, Vehicle, User } from "@/lib/types"

interface BookingManagementProps {
  bookings: Booking[]
  vehicles: Vehicle[]
  users: User[]
  onRefresh?: () => void
}

export function BookingManagement({ bookings, vehicles, users, onRefresh }: BookingManagementProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const filteredBookings = bookings.filter(b => {
    const vehicle = vehicles.find(v => v.id === b.vehicleId)
    const user = users.find(u => u.id === b.userId)
    const matchesSearch = search === "" ||
      vehicle?.name.toLowerCase().includes(search.toLowerCase()) ||
      user?.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmée"
      case "pending": return "En attente"
      case "active": return "Active"
      case "completed": return "Terminée"
      case "cancelled": return "Annulée"
      default: return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirmed": return "default"
      case "pending": return "secondary"
      case "active": return "default"
      case "completed": return "outline"
      case "cancelled": return "destructive"
      default: return "default"
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await updateBookingStatus(id, "confirmed")
      toast.success("Réservation confirmée")
      onRefresh?.()
    } catch {
      toast.error("Erreur")
    }
  }

  const handleReject = async (id: string) => {
    try {
      await updateBookingStatus(id, "cancelled")
      toast.success("Réservation annulée")
      onRefresh?.()
    } catch {
      toast.error("Erreur")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
          <Input
            placeholder="Rechercher une réservation..."
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
            >
              {status === "all" ? "Toutes" : getStatusLabel(status)}
            </Button>
          ))}
        </div>
      </div>

      <div className="border border-[var(--color-rule)] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--color-paper-2)]">
              <TableHead>Client</TableHead>
              <TableHead>Véhicule</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => {
              const vehicle = vehicles.find(v => v.id === booking.vehicleId)
              const user = users.find(u => u.id === booking.userId)
              return (
                <TableRow key={booking.id}>
                  <TableCell>
                    <p className="font-medium text-[var(--color-ink)]">{user?.name || "N/A"}</p>
                    <p className="text-xs text-[var(--color-muted)]">{user?.email}</p>
                  </TableCell>
                  <TableCell>{vehicle?.name || "N/A"}</TableCell>
                  <TableCell>
                    <p className="text-sm">{new Date(booking.startDate).toLocaleDateString("fr-FR")}</p>
                    <p className="text-xs text-[var(--color-muted)]">→ {new Date(booking.endDate).toLocaleDateString("fr-FR")}</p>
                  </TableCell>
                  <TableCell>{booking.totalPrice} MAD</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(booking.status) as any}>
                      {getStatusLabel(booking.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedBooking(booking)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {booking.status === "pending" && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleApprove(booking.id)}>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleReject(booking.id)}>
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
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
                  <p className="text-xs text-[var(--color-muted)]">Client</p>
                  <p className="text-sm text-[var(--color-ink)]">{users.find(u => u.id === selectedBooking.userId)?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Véhicule</p>
                  <p className="text-sm text-[var(--color-ink)]">{vehicles.find(v => v.id === selectedBooking.vehicleId)?.name}</p>
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
                  <p className="text-xs text-[var(--color-muted)]">Total</p>
                  <p className="text-sm font-bold text-[var(--color-accent)]">{selectedBooking.totalPrice} MAD</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Statut</p>
                  <Badge variant={getStatusVariant(selectedBooking.status) as any}>
                    {getStatusLabel(selectedBooking.status)}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

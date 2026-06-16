"use client"

import { useState } from "react"
import { Search, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { deleteReview } from "@/lib/actions/reviews"
import type { Review, Vehicle, User } from "@/lib/types"

interface ReviewManagementProps {
  reviews: Review[]
  vehicles: Vehicle[]
  users: User[]
  onRefresh?: () => void
}

export function ReviewManagement({ reviews, vehicles, users, onRefresh }: ReviewManagementProps) {
  const [search, setSearch] = useState("")

  const filteredReviews = reviews.filter(r => {
    const vehicle = vehicles.find(v => v.id === r.vehicleId)
    const user = users.find(u => u.id === r.userId)
    return search === "" ||
      vehicle?.name.toLowerCase().includes(search.toLowerCase()) ||
      user?.name.toLowerCase().includes(search.toLowerCase())
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id)
      toast.success("Avis supprimé")
      onRefresh?.()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
        <Input
          placeholder="Rechercher un avis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="border border-[var(--color-rule)] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--color-paper-2)]">
              <TableHead>Client</TableHead>
              <TableHead>Véhicule</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Commentaire</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => {
              const vehicle = vehicles.find(v => v.id === review.vehicleId)
              const user = users.find(u => u.id === review.userId)
              return (
                <TableRow key={review.id}>
                  <TableCell>{user?.name || "N/A"}</TableCell>
                  <TableCell>{vehicle?.name || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                              : "text-[var(--color-rule)]"
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                  <TableCell>{new Date(review.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(review.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Search, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { deleteUser } from "@/lib/actions/users"
import type { User, Booking } from "@/lib/types"

interface UserManagementProps {
  users: User[]
  bookings: Booking[]
  onRefresh?: () => void
}

export function UserManagement({ users, bookings, onRefresh }: UserManagementProps) {
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (user: User) => {
    if (user.email === "admin@autoloc.ma") {
      toast.error("Impossible de supprimer l'administrateur")
      return
    }
    try {
      await deleteUser(user.id)
      toast.success(`${user.name} supprimé`)
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
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="border border-[var(--color-rule)] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--color-paper-2)]">
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Réservations</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const userBookings = bookings.filter(b => b.userId === user.id)
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <p className="font-medium text-[var(--color-ink)]">{user.name}</p>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role === "admin" ? "Admin" : user.role === "agent" ? "Agent" : "Client"}
                    </Badge>
                  </TableCell>
                  <TableCell>{userBookings.length}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(user)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de l&apos;utilisateur</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Nom</p>
                  <p className="text-sm text-[var(--color-ink)]">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Email</p>
                  <p className="text-sm text-[var(--color-ink)]">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Téléphone</p>
                  <p className="text-sm text-[var(--color-ink)]">{selectedUser.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Rôle</p>
                  <Badge>{selectedUser.role === "admin" ? "Admin" : selectedUser.role === "agent" ? "Agent" : "Client"}</Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

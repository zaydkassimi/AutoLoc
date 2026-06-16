"use client"

import { useState } from "react"
import { Search, Eye, CheckCircle, XCircle, Shield, ShieldOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { verifyAgent, rejectAgent } from "@/lib/actions/agents"
import { updateUserRole } from "@/lib/actions/users"
import type { Agent } from "@/lib/types"

interface AgentManagementProps {
  agents: Agent[]
  onRefresh?: () => void
}

export function AgentManagement({ agents, onRefresh }: AgentManagementProps) {
  const [search, setSearch] = useState("")
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [processing, setProcessing] = useState<string | null>(null)

  const filteredAgents = agents.filter(a =>
    a.agencyName.toLowerCase().includes(search.toLowerCase()) ||
    a.agencyEmail.toLowerCase().includes(search.toLowerCase())
  )

  const handleApprove = async (agent: Agent) => {
    setProcessing(agent.id)
    try {
      await verifyAgent(agent.id)
      await updateUserRole(agent.userId, "agent")
      toast.success(`${agent.agencyName} a été approuvé`)
      onRefresh?.()
    } catch {
      toast.error("Erreur lors de l'approbation")
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (agent: Agent) => {
    setProcessing(agent.id)
    try {
      await rejectAgent(agent.id)
      toast.success(`${agent.agencyName} a été rejeté`)
      onRefresh?.()
    } catch {
      toast.error("Erreur lors du rejet")
    } finally {
      setProcessing(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
        <Input
          placeholder="Rechercher un agent..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="border border-[var(--color-rule)] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--color-paper-2)]">
              <TableHead>Agence</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>
                  <p className="font-medium text-[var(--color-ink)]">{agent.agencyName}</p>
                  <p className="text-xs text-[var(--color-muted)]">{agent.licenseNumber || "Pas de licence"}</p>
                </TableCell>
                <TableCell>{agent.agencyEmail}</TableCell>
                <TableCell>{agent.agencyPhone}</TableCell>
                <TableCell>
                  <Badge variant={agent.verified ? "default" : "secondary"}>
                    {agent.verified ? "Vérifié" : "En attente"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {!agent.verified && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleApprove(agent)}
                          disabled={processing === agent.id}
                          title="Approuver"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReject(agent)}
                          disabled={processing === agent.id}
                          title="Rejeter"
                        >
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => setSelectedAgent(agent)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de l&apos;agent</DialogTitle>
          </DialogHeader>
          {selectedAgent && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                {selectedAgent.verified ? (
                  <Shield className="h-5 w-5 text-green-600" />
                ) : (
                  <ShieldOff className="h-5 w-5 text-[var(--color-muted)]" />
                )}
                <div>
                  <p className="font-medium text-[var(--color-ink)]">{selectedAgent.agencyName}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {selectedAgent.verified ? "Agent vérifié" : "En attente de vérification"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Agence</p>
                  <p className="text-sm text-[var(--color-ink)]">{selectedAgent.agencyName}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Licence</p>
                  <p className="text-sm text-[var(--color-ink)]">{selectedAgent.licenseNumber || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Email</p>
                  <p className="text-sm text-[var(--color-ink)]">{selectedAgent.agencyEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Téléphone</p>
                  <p className="text-sm text-[var(--color-ink)]">{selectedAgent.agencyPhone}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Adresse</p>
                  <p className="text-sm text-[var(--color-ink)]">{selectedAgent.agencyAddress || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Note</p>
                  <p className="text-sm text-[var(--color-ink)]">{selectedAgent.rating}/5 ({selectedAgent.reviewCount} avis)</p>
                </div>
              </div>
              {!selectedAgent.verified && (
                <div className="flex gap-2 pt-4 border-t border-[var(--color-rule)]">
                  <Button
                    onClick={() => { setSelectedAgent(null); handleApprove(selectedAgent) }}
                    className="flex-1 bg-green-600 text-white hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approuver
                  </Button>
                  <Button
                    onClick={() => { setSelectedAgent(null); handleReject(selectedAgent) }}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejeter
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

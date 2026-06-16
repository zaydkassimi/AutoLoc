"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Search, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { ImageManager } from "./ImageManager"
import { addVehicle, updateVehicle, deleteVehicle as deleteVehicleAction } from "@/lib/actions/vehicles"
import type { Vehicle, Location } from "@/lib/types"

interface VehicleManagementProps {
  vehicles: Vehicle[]
  locations: Location[]
  onRefresh?: () => void
}

const defaultForm = {
  name: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  category: "luxe",
  pricePerDay: 0,
  images: [] as string[],
  description: "",
  engine: "",
  horsepower: 0,
  torque: "",
  drivetrain: "",
  fuelConsumption: "",
  co2Emissions: "",
  euroClass: "",
  features: [] as string[],
  available: true,
  location: "",
  mileage: 0,
  fuelType: "essence",
  transmission: "automatique",
  seats: 5,
  doors: 4,
  luggageCapacity: 0,
  enginePower: "",
  acceleration: "",
  topSpeed: "",
}

export function VehicleManagement({ vehicles, locations, onRefresh }: VehicleManagementProps) {
  const [search, setSearch] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [form, setForm] = useState(defaultForm)
  const [saving, setSaving] = useState(false)

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setEditingVehicle(null)
    setForm(defaultForm)
    setIsDialogOpen(true)
  }

  const openEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setForm({
      name: vehicle.name,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      category: vehicle.category,
      pricePerDay: vehicle.pricePerDay,
      images: vehicle.images || [],
      description: vehicle.description,
      engine: vehicle.specifications.engine,
      horsepower: vehicle.specifications.horsepower,
      torque: vehicle.specifications.torque,
      drivetrain: vehicle.specifications.drivetrain,
      fuelConsumption: vehicle.specifications.fuelConsumption,
      co2Emissions: vehicle.specifications.co2Emissions,
      euroClass: vehicle.specifications.EuroClass,
      features: vehicle.features || [],
      available: vehicle.available,
      location: vehicle.location,
      mileage: vehicle.mileage,
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      seats: vehicle.seats,
      doors: vehicle.doors,
      luggageCapacity: vehicle.luggageCapacity,
      enginePower: vehicle.enginePower,
      acceleration: vehicle.acceleration,
      topSpeed: vehicle.topSpeed,
    })
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.brand) {
      toast.error("Nom et marque requis")
      return
    }
    setSaving(true)
    try {
      if (editingVehicle) {
        await updateVehicle(editingVehicle.id, form)
        toast.success("Véhicule mis à jour")
      } else {
        await addVehicle(form)
        toast.success("Véhicule ajouté")
      }
      setIsDialogOpen(false)
      onRefresh?.()
    } catch {
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteVehicleAction(id)
      toast.success("Véhicule supprimé")
      onRefresh?.()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
          <Input
            placeholder="Rechercher un véhicule..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={openAdd} className="bg-[var(--color-accent)] text-[var(--color-accent-ink)]">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      <div className="border border-[var(--color-rule)] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--color-paper-2)]">
              <TableHead>Véhicule</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix/jour</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 rounded bg-[var(--color-paper-2)] overflow-hidden flex-shrink-0">
                      {vehicle.images[0] ? (
                        <img
                          src={vehicle.images[0]}
                          alt={vehicle.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-[var(--color-muted)]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-ink)]">{vehicle.name}</p>
                      <p className="text-xs text-[var(--color-muted)]">{vehicle.brand}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{vehicle.category}</TableCell>
                <TableCell>{vehicle.pricePerDay} MAD</TableCell>
                <TableCell>
                  <span className="text-xs text-[var(--color-muted)]">
                    {vehicle.images.length} photo{vehicle.images.length !== 1 ? "s" : ""}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={vehicle.available ? "default" : "secondary"}>
                    {vehicle.available ? "Disponible" : "Indisponible"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(vehicle)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(vehicle.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingVehicle ? "Modifier le véhicule" : "Ajouter un véhicule"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-[var(--color-ink)]">Photos</Label>
              <ImageManager
                images={form.images}
                onChange={(images) => setField("images", images)}
                maxImages={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Nom du véhicule" />
              </div>
              <div className="space-y-2">
                <Label>Marque</Label>
                <Input value={form.brand} onChange={(e) => setField("brand", e.target.value)} placeholder="Marque" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Modèle</Label>
                <Input value={form.model} onChange={(e) => setField("model", e.target.value)} placeholder="Modèle" />
              </div>
              <div className="space-y-2">
                <Label>Année</Label>
                <Input type="number" value={form.year} onChange={(e) => setField("year", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Prix / jour (MAD)</Label>
                <Input type="number" value={form.pricePerDay} onChange={(e) => setField("pricePerDay", Number(e.target.value))} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select value={form.category} onValueChange={(v) => setField("category", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economique">Économique</SelectItem>
                    <SelectItem value="confort">Confort</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="luxe">Luxe</SelectItem>
                    <SelectItem value="sport">Sport</SelectItem>
                    <SelectItem value="utilitaire">Utilitaire</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="electrique">Électrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Localisation</Label>
                <Select value={form.location} onValueChange={(v) => setField("location", v)}>
                  <SelectTrigger><SelectValue placeholder="Choisir..." /></SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Description du véhicule..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Carburant</Label>
                <Select value={form.fuelType} onValueChange={(v) => setField("fuelType", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="essence">Essence</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybride">Hybride</SelectItem>
                    <SelectItem value="electrique">Électrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Transmission</Label>
                <Select value={form.transmission} onValueChange={(v) => setField("transmission", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatique">Automatique</SelectItem>
                    <SelectItem value="manuelle">Manuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Places</Label>
                <Input type="number" value={form.seats} onChange={(e) => setField("seats", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Portes</Label>
                <Input type="number" value={form.doors} onChange={(e) => setField("doors", Number(e.target.value))} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Moteur</Label>
                <Input value={form.engine} onChange={(e) => setField("engine", e.target.value)} placeholder="ex: V6 3.0L" />
              </div>
              <div className="space-y-2">
                <Label>Puissance (ch)</Label>
                <Input type="number" value={form.horsepower} onChange={(e) => setField("horsepower", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Kilométrage</Label>
                <Input type="number" value={form.mileage} onChange={(e) => setField("mileage", Number(e.target.value))} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Coffre (L)</Label>
                <Input type="number" value={form.luggageCapacity} onChange={(e) => setField("luggageCapacity", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>0-100 km/h</Label>
                <Input value={form.acceleration} onChange={(e) => setField("acceleration", e.target.value)} placeholder="ex: 5.2s" />
              </div>
              <div className="space-y-2">
                <Label>Vitesse max</Label>
                <Input value={form.topSpeed} onChange={(e) => setField("topSpeed", e.target.value)} placeholder="ex: 250 km/h" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-rule)]">
              <div className="flex items-center gap-3">
                <Switch checked={form.available} onCheckedChange={(v) => setField("available", v)} />
                <Label className="cursor-pointer">Disponible à la location</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[var(--color-accent)] text-[var(--color-accent-ink)]"
                >
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

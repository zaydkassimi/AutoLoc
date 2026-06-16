"use client"

import { Suspense, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { VehicleCard } from "@/components/cars/VehicleCard"
import type { Vehicle, Booking } from "@/lib/types"

interface CarsPageClientProps {
  vehicles: Vehicle[]
  bookings: Booking[]
}

function CarsPageContent({ vehicles, bookings }: CarsPageClientProps) {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string>(initialCategory)
  const [fuelType, setFuelType] = useState<string>("all")
  const [transmission, setTransmission] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch = search === "" ||
        vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(search.toLowerCase())

      const matchesCategory = category === "all" || vehicle.category === category
      const matchesFuel = fuelType === "all" || vehicle.fuelType === fuelType
      const matchesTransmission = transmission === "all" || vehicle.transmission === transmission

      const matchesPrice = priceRange === "all" ||
        (priceRange === "0-500" && vehicle.pricePerDay <= 500) ||
        (priceRange === "500-1000" && vehicle.pricePerDay > 500 && vehicle.pricePerDay <= 1000) ||
        (priceRange === "1000+" && vehicle.pricePerDay > 1000)

      return matchesSearch && matchesCategory && matchesFuel && matchesTransmission && matchesPrice
    })
  }, [search, category, fuelType, transmission, priceRange, vehicles])

  const activeBookingVehicleIds = new Set(
    bookings
      .filter(b => b.status === "pending" || b.status === "confirmed" || b.status === "active")
      .map(b => b.vehicleId)
  )

  const activeFilters = [category, fuelType, transmission, priceRange].filter(f => f !== "all").length

  const clearFilters = () => {
    setCategory("all")
    setFuelType("all")
    setTransmission("all")
    setPriceRange("all")
    setSearch("")
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Car className="h-8 w-8 text-[var(--color-accent)]" />
            <div>
              <h1 className="font-display text-3xl font-bold text-[var(--color-ink)]">
                Nos Véhicules
              </h1>
              <p className="text-[var(--color-ink-2)]">
                {filteredVehicles.length} véhicule{filteredVehicles.length !== 1 ? "s" : ""} trouvé{filteredVehicles.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 shrink-0">
              <div className="sticky top-24 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                  <Input
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtres
                  {activeFilters > 0 && (
                    <Badge variant="secondary" className="ml-auto bg-[var(--color-accent)] text-[var(--color-accent-ink)]">
                      {activeFilters}
                    </Badge>
                  )}
                </Button>

                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label>Catégorie</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes</SelectItem>
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
                      <Label>Carburant</Label>
                      <Select value={fuelType} onValueChange={setFuelType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="essence">Essence</SelectItem>
                          <SelectItem value="electrique">Électrique</SelectItem>
                          <SelectItem value="hybride">Hybride</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Transmission</Label>
                      <Select value={transmission} onValueChange={setTransmission}>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes</SelectItem>
                          <SelectItem value="automatique">Automatique</SelectItem>
                          <SelectItem value="manuelle">Manuelle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Prix / jour</Label>
                      <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous</SelectItem>
                          <SelectItem value="0-500">Moins de 500 MAD</SelectItem>
                          <SelectItem value="500-1000">500 - 1000 MAD</SelectItem>
                          <SelectItem value="1000+">Plus de 1000 MAD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {activeFilters > 0 && (
                      <Button variant="ghost" className="w-full" onClick={clearFilters}>
                        <X className="h-4 w-4 mr-2" />
                        Effacer les filtres
                      </Button>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex-1">
              {filteredVehicles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[var(--color-muted)]">Aucun véhicule trouvé avec ces critères.</p>
                  <Button variant="link" onClick={clearFilters} className="mt-2">
                    Effacer les filtres
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <VehicleCard vehicle={vehicle} isReserved={activeBookingVehicleIds.has(vehicle.id)} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function CarsPageClient(props: CarsPageClientProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-[var(--color-muted)]">Chargement...</div>
          </div>
        </div>
      </div>
    }>
      <CarsPageContent {...props} />
    </Suspense>
  )
}

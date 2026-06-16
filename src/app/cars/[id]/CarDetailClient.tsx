"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Fuel, Users, Gauge, Calendar, Shield, Star, ChevronLeft, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import type { Vehicle, Review } from "@/lib/types"

interface CarDetailClientProps {
  vehicle: Vehicle
  reviews: Review[]
  isReserved: boolean
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
  automatique: "Automatique",
  manuelle: "Manuelle",
}

export default function CarDetailClient({ vehicle, reviews, isReserved }: CarDetailClientProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [currentImage, setCurrentImage] = useState(0)

  const handleReserve = () => {
    if (!isAuthenticated) {
      toast.error("Veuillez vous connecter pour réserver")
      router.push("/login")
      return
    }
    router.push(`/booking/${vehicle.id}`)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/cars" className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-6">
            <ChevronLeft className="h-4 w-4" />
            Retour aux véhicules
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="aspect-[16/10] bg-gradient-to-br from-[var(--color-paper-2)] to-[var(--color-paper-3)] rounded-xl overflow-hidden flex items-center justify-center">
                {vehicle.images[currentImage] ? (
                  <img
                    src={vehicle.images[currentImage]}
                    alt={`${vehicle.name} - ${currentImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[var(--color-muted)]">
                    <ImageIcon className="h-10 w-10" />
                    <span className="text-sm">Aucune image</span>
                  </div>
                )}
              </div>
              {vehicle.images.length > 1 && (
                <div className="flex gap-2">
                  {vehicle.images.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImage === i
                          ? "border-[var(--color-accent)]"
                          : "border-transparent hover:border-[var(--color-rule)]"
                      }`}
                    >
                      <img
                        src={url}
                        alt={`Miniature ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-[var(--color-accent)] text-[var(--color-accent-ink)]">
                    {categoryLabels[vehicle.category] || vehicle.category}
                  </Badge>
                </div>
                <h1 className="font-display text-3xl font-bold text-[var(--color-ink)]">
                  {vehicle.name}
                </h1>
                <p className="text-[var(--color-muted)]">{vehicle.brand} · {vehicle.year}</p>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--color-muted)]" />
                <span className="text-[var(--color-ink-2)]">{vehicle.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-3 bg-[var(--color-paper-2)] rounded-lg">
                  <Fuel className="h-5 w-5 text-[var(--color-accent)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-ink)]">Carburant</p>
                    <p className="text-xs text-[var(--color-muted)]">
                      {fuelLabels[vehicle.fuelType] || vehicle.fuelType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[var(--color-paper-2)] rounded-lg">
                  <Gauge className="h-5 w-5 text-[var(--color-accent)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-ink)]">Transmission</p>
                    <p className="text-xs text-[var(--color-muted)]">
                      {transmissionLabels[vehicle.transmission] || vehicle.transmission}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[var(--color-paper-2)] rounded-lg">
                  <Users className="h-5 w-5 text-[var(--color-accent)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-ink)]">Places</p>
                    <p className="text-xs text-[var(--color-muted)]">{vehicle.seats} places</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[var(--color-paper-2)] rounded-lg">
                  <Shield className="h-5 w-5 text-[var(--color-accent)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-ink)]">Kilométrage</p>
                    <p className="text-xs text-[var(--color-muted)]">{vehicle.mileage.toLocaleString()} km</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-[var(--color-paper-2)] rounded-xl p-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-display font-bold text-[var(--color-accent)]">
                    {vehicle.pricePerDay}
                  </span>
                  <span className="text-[var(--color-muted)]">MAD / jour</span>
                </div>
                <p className="text-sm text-[var(--color-muted)] mb-4">
                  {vehicle.description}
                </p>
                {isReserved ? (
                  <div className="space-y-3">
                    <Badge className="bg-red-500/10 text-red-600 border-red-200 w-full justify-center py-2 text-sm">
                      Ce véhicule est actuellement réservé
                    </Badge>
                    <Button
                      disabled
                      className="w-full"
                      variant="outline"
                      size="lg"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Indisponible
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleReserve}
                    className="w-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)]"
                    size="lg"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Réserver maintenant
                  </Button>
                )}
              </div>
            </div>
          </div>

          {vehicle.features.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-4">
                Équipements
              </h2>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature) => (
                  <Badge key={feature} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {reviews.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-6">
                Avis clients
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-[var(--color-paper-2)] rounded-xl p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                              : "text-[var(--color-rule)]"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[var(--color-ink)] italic mb-3">&ldquo;{review.comment}&rdquo;</p>
                    <p className="text-xs text-[var(--color-muted)]">
                      {review.userName} · {new Date(review.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

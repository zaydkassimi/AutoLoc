"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Calendar, MapPin, CreditCard, Check, ChevronLeft, ChevronRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { createBooking } from "@/lib/actions/bookings"
import { toast } from "sonner"
import type { Vehicle, Location } from "@/lib/types"

interface BookingPageClientProps {
  vehicle: Vehicle
  locations: Location[]
}

export default function BookingPageClient({ vehicle, locations }: BookingPageClientProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [step, setStep] = useState(1)
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")
  const [returnLocation, setReturnLocation] = useState("")
  const [options, setOptions] = useState({
    gps: false,
    childSeat: false,
    additionalDriver: false,
    insurance: false,
  })
  const [paymentMethod, setPaymentMethod] = useState("")

  if (!isAuthenticated || !user) {
    router.push("/login")
    return null
  }

  const days = pickupDate && returnDate
    ? Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const basePrice = days * vehicle.pricePerDay
  const optionsPrice = (options.gps ? 50 : 0) + (options.childSeat ? 30 : 0) + (options.additionalDriver ? 100 : 0) + (options.insurance ? 150 : 0)
  const totalPrice = basePrice + optionsPrice

  const handleNext = () => {
    if (step === 1 && (!pickupDate || !returnDate)) {
      toast.error("Veuillez sélectionner les dates")
      return
    }
    if (step === 2 && (!pickupLocation || !returnLocation)) {
      toast.error("Veuillez sélectionner les lieux")
      return
    }
    if (step === 4 && !paymentMethod) {
      toast.error("Veuillez sélectionner un moyen de paiement")
      return
    }
    if (step < 5) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleConfirm = async () => {
    if (!user) return
    try {
      const insuranceMap: Record<string, "none" | "basic" | "premium" | "full"> = {
        gps: "none",
        childSeat: "basic",
        additionalDriver: "premium",
        insurance: "full",
      }
      const selectedInsurance = insuranceMap[options.insurance ? "insurance" : "none"] || "none"

      const booking = await createBooking({
        userId: user.id,
        vehicleId: vehicle.id,
        startDate: pickupDate,
        endDate: returnDate,
        pickupLocation,
        returnLocation,
        insurance: selectedInsurance,
        paymentMethod: paymentMethod as "card" | "cash" | "bank_transfer",
        totalPrice,
      })
      toast.success("Réservation confirmée !")
      router.push(`/confirmation/${booking.id}`)
    } catch {
      toast.error("Erreur lors de la réservation")
    }
  }

  const steps = [
    { number: 1, label: "Dates", icon: Calendar },
    { number: 2, label: "Lieux", icon: MapPin },
    { number: 3, label: "Options", icon: Shield },
    { number: 4, label: "Paiement", icon: CreditCard },
    { number: 5, label: "Confirmation", icon: Check },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href={`/cars/${vehicle.id}`} className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-6">
            <ChevronLeft className="h-4 w-4" />
            Retour au véhicule
          </Link>

          <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
            Réserver {vehicle.name}
          </h1>
          <p className="text-[var(--color-ink-2)] mb-8">
            Complétez les étapes pour finaliser votre réservation
          </p>

          <div className="flex items-center justify-between mb-8">
            {steps.map((s, i) => (
              <div key={s.number} className="flex items-center">
                <div className={`flex items-center gap-2 ${
                  step >= s.number ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step > s.number
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]"
                      : step === s.number
                      ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
                      : "bg-[var(--color-paper-2)] text-[var(--color-muted)]"
                  }`}>
                    {step > s.number ? <Check className="h-4 w-4" /> : s.number}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 lg:w-16 h-px mx-2 ${
                    step > s.number ? "bg-[var(--color-accent)]" : "bg-[var(--color-rule)]"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                        Sélectionnez vos dates
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickup-date">Date de prise en charge</Label>
                          <Input
                            id="pickup-date"
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="return-date">Date de retour</Label>
                          <Input
                            id="return-date"
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            min={pickupDate || new Date().toISOString().split("T")[0]}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                        Sélectionnez les lieux
                      </h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Lieu de prise en charge</Label>
                          <Select value={pickupLocation} onValueChange={setPickupLocation}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir un lieu" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((loc) => (
                                <SelectItem key={loc.id} value={loc.id}>
                                  {loc.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Lieu de retour</Label>
                          <Select value={returnLocation} onValueChange={setReturnLocation}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir un lieu" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((loc) => (
                                <SelectItem key={loc.id} value={loc.id}>
                                  {loc.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                        Options supplémentaires
                      </h2>
                      <div className="space-y-4">
                        {[
                          { key: "gps", label: "GPS", price: 50 },
                          { key: "childSeat", label: "Siège enfant", price: 30 },
                          { key: "additionalDriver", label: "Conducteur supplémentaire", price: 100 },
                          { key: "insurance", label: "Assurance premium", price: 150 },
                        ].map((opt) => (
                          <div key={opt.key} className="flex items-center justify-between p-4 bg-[var(--color-paper-2)] rounded-lg">
                            <div className="flex items-center gap-3">
                              <Checkbox
                                id={opt.key}
                                checked={options[opt.key as keyof typeof options]}
                                onCheckedChange={(checked) =>
                                  setOptions({ ...options, [opt.key]: checked as boolean })
                                }
                              />
                              <Label htmlFor={opt.key} className="cursor-pointer">
                                {opt.label}
                              </Label>
                            </div>
                            <span className="text-sm text-[var(--color-muted)]">+{opt.price} MAD/jour</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                        Moyen de paiement
                      </h2>
                      <div className="space-y-4">
                        {[
                          { value: "card", label: "Carte bancaire" },
                          { value: "cash", label: "Espèces" },
                          { value: "bank_transfer", label: "Virement bancaire" },
                        ].map((method) => (
                          <div
                            key={method.value}
                            onClick={() => setPaymentMethod(method.value)}
                            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                              paymentMethod === method.value
                                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                                : "border-[var(--color-rule)] hover:border-[var(--color-accent)]/50"
                            }`}
                          >
                            <span className="font-medium text-[var(--color-ink)]">{method.label}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                        Récapitulatif
                      </h2>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">Véhicule</span>
                          <span className="text-[var(--color-ink)]">{vehicle.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">Dates</span>
                          <span className="text-[var(--color-ink)]">{pickupDate} → {returnDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">Lieux</span>
                          <span className="text-[var(--color-ink)]">
                            {locations.find(l => l.id === pickupLocation)?.name} → {locations.find(l => l.id === returnLocation)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">Paiement</span>
                          <span className="text-[var(--color-ink)]">
                            {paymentMethod === "card" ? "Carte bancaire" : paymentMethod === "cash" ? "Espèces" : "Virement bancaire"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[var(--color-paper-2)] rounded-xl p-6 sticky top-24">
                <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-4">
                  Résumé
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-muted)]">Véhicule</span>
                    <span className="text-[var(--color-ink)]">{vehicle.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-muted)]">Prix / jour</span>
                    <span className="text-[var(--color-ink)]">{vehicle.pricePerDay} MAD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-muted)]">Durée</span>
                    <span className="text-[var(--color-ink)]">{days} jours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-muted)]">Sous-total</span>
                    <span className="text-[var(--color-ink)]">{basePrice} MAD</span>
                  </div>
                  {optionsPrice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Options</span>
                      <span className="text-[var(--color-ink)]">+{optionsPrice} MAD</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium text-[var(--color-ink)]">Total</span>
                    <span className="text-xl font-display font-bold text-[var(--color-accent)]">
                      {totalPrice} MAD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack} disabled={step === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>
            {step < 5 ? (
              <Button onClick={handleNext} className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)]">
                Suivant
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleConfirm} className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)]">
                <Check className="h-4 w-4 mr-2" />
                Confirmer la réservation
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

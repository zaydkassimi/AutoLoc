"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Check, Download, Home, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import jsPDF from "jspdf"
import type { Vehicle, Booking } from "@/lib/types"

interface ConfirmationPageClientProps {
  vehicle: Vehicle
  booking: Booking
}

export default function ConfirmationPageClient({ vehicle, booking }: ConfirmationPageClientProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    router.push("/login")
    return null
  }

  const today = new Date().toLocaleDateString("fr-FR")

  const generatePDF = () => {
    const doc = new jsPDF()

    doc.setFont("helvetica", "bold")
    doc.setFontSize(24)
    doc.text("AutoLoc Pro", 20, 30)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.text("Confirmation de réservation", 20, 40)

    doc.setDrawColor(212, 175, 55)
    doc.line(20, 45, 190, 45)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.text("Numéro de réservation:", 20, 55)
    doc.setFont("helvetica", "normal")
    doc.text(booking.id.toUpperCase(), 80, 55)

    doc.setFont("helvetica", "bold")
    doc.text("Date d'émission:", 20, 65)
    doc.setFont("helvetica", "normal")
    doc.text(today, 80, 65)

    doc.setDrawColor(200, 200, 200)
    doc.line(20, 72, 190, 72)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("Détails du véhicule", 20, 82)

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("Véhicule:", 20, 92)
    doc.setFont("helvetica", "normal")
    doc.text(vehicle.name, 80, 92)

    doc.setFont("helvetica", "bold")
    doc.text("Marque:", 20, 102)
    doc.setFont("helvetica", "normal")
    doc.text(vehicle.brand, 80, 102)

    doc.setFont("helvetica", "bold")
    doc.text("Catégorie:", 20, 112)
    doc.setFont("helvetica", "normal")
    doc.text(vehicle.category, 80, 112)

    doc.setFont("helvetica", "bold")
    doc.text("Transmission:", 20, 122)
    doc.setFont("helvetica", "normal")
    doc.text(vehicle.transmission === "automatique" ? "Automatique" : "Manuelle", 80, 122)

    doc.setDrawColor(200, 200, 200)
    doc.line(20, 130, 190, 130)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("Détails de la réservation", 20, 140)

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("Date de prise en charge:", 20, 150)
    doc.setFont("helvetica", "normal")
    doc.text(new Date(booking.startDate).toLocaleDateString("fr-FR"), 80, 150)

    doc.setFont("helvetica", "bold")
    doc.text("Date de retour:", 20, 160)
    doc.setFont("helvetica", "normal")
    doc.text(new Date(booking.endDate).toLocaleDateString("fr-FR"), 80, 160)

    doc.setFont("helvetica", "bold")
    doc.text("Lieu de prise en charge:", 20, 170)
    doc.setFont("helvetica", "normal")
    doc.text(booking.pickupLocation, 80, 170)

    doc.setFont("helvetica", "bold")
    doc.text("Lieu de retour:", 20, 180)
    doc.setFont("helvetica", "normal")
    doc.text(booking.returnLocation, 80, 180)

    doc.setDrawColor(200, 200, 200)
    doc.line(20, 188, 190, 188)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("Paiement", 20, 198)

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("Prix par jour:", 20, 208)
    doc.setFont("helvetica", "normal")
    doc.text(`${vehicle.pricePerDay} MAD`, 80, 208)

    const days = Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24))
    doc.setFont("helvetica", "bold")
    doc.text("Durée:", 20, 218)
    doc.setFont("helvetica", "normal")
    doc.text(`${days} jours`, 80, 218)

    doc.setFont("helvetica", "bold")
    doc.text("Total:", 20, 228)
    doc.setFont("helvetica", "normal")
    doc.text(`${booking.totalPrice} MAD`, 80, 228)

    doc.setDrawColor(212, 175, 55)
    doc.line(20, 240, 190, 240)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.text("AutoLoc Pro - Location de véhicules de qualité au Maroc", 20, 250)
    doc.text("www.autoloc.ma | +212 5 24 00 00 00", 20, 256)

    doc.save(`AutoLoc_Confirmation_${booking.id}.pdf`)
  }

  const days = Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="h-10 w-10 text-[var(--color-accent-ink)]" />
          </motion.div>

          <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
            Réservation confirmée !
          </h1>
          <p className="text-[var(--color-ink-2)] mb-8">
            Merci {user.name} pour votre réservation. Un email de confirmation vous sera envoyé.
          </p>

          <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Car className="h-6 w-6 text-[var(--color-accent)]" />
              <span className="font-display text-xl font-bold text-[var(--color-ink)]">AutoLoc Pro</span>
            </div>
            <Separator className="mb-4" />
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-xs text-[var(--color-muted)]">Numéro de réservation</p>
                <p className="font-mono text-sm text-[var(--color-ink)]">{booking.id.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Date d&apos;émission</p>
                <p className="text-sm text-[var(--color-ink)]">{today}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Véhicule</p>
                <p className="text-sm text-[var(--color-ink)]">{vehicle.name}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Prix total</p>
                <p className="text-sm font-bold text-[var(--color-accent)]">{booking.totalPrice} MAD</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Date de prise en charge</p>
                <p className="text-sm text-[var(--color-ink)]">{new Date(booking.startDate).toLocaleDateString("fr-FR")}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Date de retour</p>
                <p className="text-sm text-[var(--color-ink)]">{new Date(booking.endDate).toLocaleDateString("fr-FR")}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Lieu de prise en charge</p>
                <p className="text-sm text-[var(--color-ink)]">{booking.pickupLocation}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Lieu de retour</p>
                <p className="text-sm text-[var(--color-ink)]">{booking.returnLocation}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Statut</p>
                <p className="text-sm text-[var(--color-ink)]">En attente</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Durée</p>
                <p className="text-sm text-[var(--color-ink)]">{days} jours</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-paper-2)] rounded-xl p-6 mb-8">
            <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-4">
              Prochaines étapes
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[var(--color-accent)]">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">Préparez vos documents</p>
                  <p className="text-xs text-[var(--color-muted)]">Permis de conduire, carte d&apos;identité</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[var(--color-accent)]">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">Rendez-vous à l&apos;agence</p>
                  <p className="text-xs text-[var(--color-muted)]">30 minutes avant la date prévue</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[var(--color-accent)]">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">Inspectez le véhicule</p>
                  <p className="text-xs text-[var(--color-muted)]">Vérifiez l&apos;état avec l&apos;agent</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={generatePDF} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Télécharger le PDF
            </Button>
            <Link href="/booking">
              <Button className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)]">
                <Car className="h-4 w-4 mr-2" />
                Mes réservations
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <Home className="h-4 w-4 mr-2" />
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

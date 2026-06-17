import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-6">
          <ChevronLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
          Conditions Générales
        </h1>
        <p className="text-sm text-[var(--color-muted)] mb-8">Dernière mise à jour : Janvier 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-[var(--color-ink-2)]">
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">1. Objet</h2>
            <p>Les présentes conditions générales régissent l&apos;utilisation du service de location de véhicules AutoLoc Pro, accessible via le site web autoloc.ma. En utilisant nos services, vous acceptez ces conditions dans leur intégralité.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">2. Inscription</h2>
            <p>L&apos;utilisation de nos services nécessite la création d&apos;un compte. Vous vous engagez à fournir des informations exactes et à maintenir la confidentialité de vos identifiants de connexion.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">3. Réservations</h2>
            <p>Les réservations sont soumises à disponibilité. Un paiement est requis pour confirmer la réservation. Le montant total inclut la location du véhicule et les options sélectionnées.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">4. Annulation</h2>
            <p>Les annulations sont acceptées sans frais jusqu&apos;à 48 heures avant la date de prise en charge. En dessous de ce délai, des frais d&apos;annulation peuvent s&apos;appliquer.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">5. Utilisation du véhicule</h2>
            <p>Le client s&apos;engage à utiliser le véhicule conformément aux lois en vigueur, à le restituer dans l&apos;état où il a été reçu, et à signaler tout dommage survenu pendant la période de location.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">6. Assurance</h2>
            <p>Une assurance de base est incluse dans chaque location. Des options d&apos;assurance complémentaires sont disponibles lors de la réservation.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">7. Responsabilité</h2>
            <p>AutoLoc Pro ne saurait être tenu responsable des dommages indirects résultant de l&apos;utilisation de ses services. Notre responsabilité est limitée au montant de la réservation.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

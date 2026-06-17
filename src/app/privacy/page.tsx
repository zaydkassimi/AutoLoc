import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-6">
          <ChevronLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
          Politique de Confidentialité
        </h1>
        <p className="text-sm text-[var(--color-muted)] mb-8">Dernière mise à jour : Janvier 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-[var(--color-ink-2)]">
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">1. Collecte des données</h2>
            <p>Nous collectons les informations que vous nous fournissez lors de votre inscription : nom, adresse e-mail, numéro de téléphone. Nous collectons également les données de navigation pour améliorer nos services.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">2. Utilisation des données</h2>
            <p>Vos données sont utilisées pour : gérer vos réservations, vous contacter concernant vos locations, améliorer nos services, et respecter nos obligations légales.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">3. Partage des données</h2>
            <p>Nous ne vendons pas vos données personnelles. Nous pouvons les partager avec des partenaires uniquement pour l&apos;exécution de nos services (assurance, paiement, etc.).</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">4. Sécurité</h2>
            <p>Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte ou altération.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">5. Vos droits</h2>
            <p>Conformément à la réglementation en vigueur, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données personnelles. Contactez-nous à contact@autoloc.ma pour exercer ces droits.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">6. Contact</h2>
            <p>Pour toute question relative à la protection de vos données, contactez-nous à : contact@autoloc.ma</p>
          </section>
        </div>
      </div>
    </div>
  )
}

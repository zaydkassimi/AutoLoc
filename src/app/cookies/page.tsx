import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-6">
          <ChevronLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
          Politique de Cookies
        </h1>
        <p className="text-sm text-[var(--color-muted)] mb-8">Dernière mise à jour : Janvier 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-[var(--color-ink-2)]">
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>Un cookie est un petit fichier texte déposé sur votre appareil lors de votre navigation sur un site web. Il permet de mémoriser vos préférences et d&apos;améliorer votre expérience.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">2. Cookies utilisés</h2>
            <p>Nous utilisons des cookies strictement nécessaires au fonctionnement du site (session, authentification). Aucun cookie publicitaire n&apos;est utilisé.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">3. Gestion des cookies</h2>
            <p>Vous pouvez paramétrer votre navigateur pour refuser les cookies ou être alerté lorsqu&apos;un cookie est déposé. Consultez l&apos;aide de votre navigateur pour en savoir plus.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

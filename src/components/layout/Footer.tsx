"use client"

import Link from "next/link"
import { Car, Mail, Phone, MapPin, Globe, MessageCircle, AtSign, Building } from "lucide-react"

const footerLinks = {
  services: [
    { href: "/cars?category=luxe", label: "Location Luxe" },
    { href: "/cars?category=suv", label: "Location SUV" },
    { href: "/cars?category=electrique", label: "Véhicules Électriques" },
    { href: "/cars?category=economique", label: "Économique" },
  ],
  company: [
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Conditions générales" },
    { href: "/privacy", label: "Politique de confidentialité" },
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Support client" },
    { href: "/insurance", label: "Assurances" },
    { href: "/roadside-assistance", label: "Assistance routière" },
  ],
}

const locations = [
  { city: "Marrakech", address: "Aéroport Marrakech Ménara" },
  { city: "Casablanca", address: "Aéroport Casablanca Mohammed V" },
  { city: "Rabat", address: "Avenue Hassan II" },
]

export function Footer() {
  return (
    <footer className="bg-[var(--color-paper-2)] border-t border-[var(--color-rule)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[var(--color-accent)] rounded-sm flex items-center justify-center">
                  <Car className="w-5 h-5 text-[var(--color-accent-ink)]" />
                </div>
                <span className="font-display text-xl font-bold text-[var(--color-ink)] tracking-tight">
                  AutoLoc
                </span>
              </Link>
              <p className="text-sm text-[var(--color-muted)] mb-6 max-w-xs">
                Location de véhicules de qualité au Maroc. Service premium, véhicules entretenus, satisfaction garantie.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
                  <AtSign className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">WhatsApp</span>
                </a>
                <a href="#" className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
                  <Building className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-4">
                Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-4">
                Entreprise
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-4">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-[var(--color-accent)] mt-0.5" />
                  <div>
                    <p className="text-sm text-[var(--color-ink)]">+212 5 24 00 00 00</p>
                    <p className="text-xs text-[var(--color-muted)]">24h/24, 7j/7</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-[var(--color-accent)] mt-0.5" />
                  <div>
                    <p className="text-sm text-[var(--color-ink)]">contact@autoloc.ma</p>
                    <p className="text-xs text-[var(--color-muted)]">Réponse sous 24h</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="py-8 border-t border-[var(--color-rule)]">
          <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-4">
            Nos agences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {locations.map((location) => (
              <div key={location.city} className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[var(--color-accent)] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{location.city}</p>
                  <p className="text-xs text-[var(--color-muted)]">{location.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--color-rule)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[var(--color-muted)]">
              © {new Date().getFullYear()} AutoLoc. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
                Conditions
              </Link>
              <Link href="/privacy" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
                Confidentialité
              </Link>
              <Link href="/cookies" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

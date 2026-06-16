"use client"

import { motion } from "framer-motion"
import { Shield, Users, MapPin, Award, Heart, ArrowRight, Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const values = [
  {
    icon: Shield,
    title: "Confiance",
    description: "Chaque véhicule est rigoureusement inspecté et entretenu. Votre sécurité est notre priorité absolue.",
  },
  {
    icon: Users,
    title: "Service client",
    description: "Une équipe dédiée disponible 24h/24, 7j/7 pour répondre à toutes vos questions et vous accompagner.",
  },
  {
    icon: MapPin,
    title: "Présence nationale",
    description: "50+ agences dans tout le Maroc, des aéroports aux centres-villes. Louez partout, retournez partout.",
  },
  {
    icon: Award,
    title: "Qualité premium",
    description: "Une flotte de 500+ véhicules soigneusement sélectionnés, des citadines aux berlines de luxe.",
  },
]

const timeline = [
  { year: "2018", title: "Création", text: "AutoLoc naît à Marrakech avec une vision : rendre la location de véhicules premium accessible à tous au Maroc." },
  { year: "2020", title: "Expansion", text: "Ouverture de 15 agences supplémentaires à Casablanca, Rabat, Tanger et Fès." },
  { year: "2022", title: "Innovation", text: "Lancement de l'application mobile et du service de livraison à l'hôtel." },
  { year: "2024", title: "Excellence", text: "50+ agences, 500+ véhicules, 10 000+ clients satisfaits. Note moyenne de 4.8/5." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] mb-3"
            >
              À propos
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-ink)] tracking-tight mb-6"
            >
              La location de véhicules{" "}
              <span className="text-[var(--color-accent)]">réinventée</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[var(--color-ink-2)] leading-relaxed"
            >
              AutoLoc simplifie la location de véhicules premium au Maroc.
              De la réservation en ligne à la restitution, chaque étape est conçue pour votre confort.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-[var(--color-paper-2)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] mb-3">
                Notre histoire
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--color-ink)] tracking-tight mb-6">
                Née à Marrakech, pensée pour tout le Maroc
              </h2>
              <div className="space-y-4 text-[var(--color-ink-2)] leading-relaxed">
                <p>
                  AutoLoc est née d&apos;une observation simple : louer une voiture au Maroc devrait être aussi
                  simple que de réserver un vol. En 2018, nous avons lancé notre première agence à Marrakech
                  avec une flotte de 20 véhicules.
                </p>
                <p>
                  Aujourd&apos;hui, nous comptons plus de 50 agences dans tout le Maroc, de Casablanca à Tanger,
                  en passant par Rabat, Fès et Marrakech. Notre flotte de 500+ véhicules comprend des citadines
                  économiques, des SUV familiaux et des berlines de luxe.
                </p>
                <p>
                  Notre mission : rendre la location de véhicules premium accessible, transparente et agréable
                  pour chaque Marocain et chaque visiteur du Royaume.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-5"
                >
                  <span className="text-xs font-mono font-bold text-[var(--color-accent)]">{item.year}</span>
                  <h4 className="font-display text-base font-semibold text-[var(--color-ink)] mt-1 mb-2">{item.title}</h4>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] mb-3">
              Fondateurs
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-ink)] tracking-tight">
              L&apos;équipe fondatrice
            </h2>
            <p className="mt-4 text-[var(--color-muted)] max-w-xl mx-auto">
              Deux visionnaires qui ont transformé l&apos;idée d&apos;une location de véhicules simple et premium
              en une référence nationale au Maroc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-2xl p-8 text-center hover:border-[var(--color-accent)]/30 transition-colors duration-300"
            >
              <div className="w-24 h-24 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-5">
                <span className="font-display text-3xl font-bold text-[var(--color-accent)]">ZK</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--color-ink)] mb-1">
                Zayd Kassimi
              </h3>
              <p className="text-sm font-medium text-[var(--color-accent)] mb-4">
                Co-fondateur & CEO
              </p>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
                Passionné par l&apos;innovation et l&apos;expérience client, Zayd a dirigé la vision stratégique
                d&apos;AutoLoc depuis sa création. Son objectif : faire de chaque location une expérience fluide et mémorable.
              </p>
              <div className="flex justify-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-[var(--color-paper)] border border-[var(--color-rule)] flex items-center justify-center hover:border-[var(--color-accent)] transition-colors">
                  <Globe className="h-4 w-4 text-[var(--color-muted)]" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[var(--color-paper)] border border-[var(--color-rule)] flex items-center justify-center hover:border-[var(--color-accent)] transition-colors">
                  <Mail className="h-4 w-4 text-[var(--color-muted)]" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-2xl p-8 text-center hover:border-[var(--color-accent)]/30 transition-colors duration-300"
            >
              <div className="w-24 h-24 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-5">
                <span className="font-display text-3xl font-bold text-[var(--color-accent)]">NK</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--color-ink)] mb-1">
                Nassime Khatib
              </h3>
              <p className="text-sm font-medium text-[var(--color-accent)] mb-4">
                Co-fondateur & Directeur Opérationnel
              </p>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
                Expert en opérations et en logistique, Nassime a bâti le réseau de 50+ agences d&apos;AutoLoc
                à travers tout le Maroc. Sa rigueur garantit un service fiable et de qualité partout.
              </p>
              <div className="flex justify-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-[var(--color-paper)] border border-[var(--color-rule)] flex items-center justify-center hover:border-[var(--color-accent)] transition-colors">
                  <Globe className="h-4 w-4 text-[var(--color-muted)]" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[var(--color-paper)] border border-[var(--color-rule)] flex items-center justify-center hover:border-[var(--color-accent)] transition-colors">
                  <Mail className="h-4 w-4 text-[var(--color-muted)]" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] mb-3">
              Nos valeurs
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-ink)] tracking-tight">
              Ce qui nous guide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-5 p-6 bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-xl hover:border-[var(--color-accent)]/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center shrink-0">
                  <value.icon className="h-6 w-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-1">{value.title}</h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[var(--color-paper-2)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="h-10 w-10 text-[var(--color-accent)] mx-auto mb-4" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--color-ink)] tracking-tight mb-4">
              Rejoignez 10 000+ clients satisfaits
            </h2>
            <p className="text-[var(--color-ink-2)] mb-8 leading-relaxed">
              Découvrez pourquoi des milliers de Marocains et de touristes font confiance à AutoLoc
              pour leurs déplacements.
            </p>
            <Link href="/cars">
              <Button size="lg" className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)] h-12 px-8">
                Explorer la flotte
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Search, Calendar, Key, MapPin } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Choisissez",
    description: "Parcourez notre flotte de 500+ véhicules et trouvez celui qui vous convient.",
  },
  {
    icon: Calendar,
    title: "Réservez",
    description: "Sélectionnez vos dates et lieux en quelques clics. Confirmation instantanée.",
  },
  {
    icon: Key,
    title: "Récupérez",
    description: "Recevez les clés à l'agence ou faites livrer à votre hôtel.",
  },
  {
    icon: MapPin,
    title: "Voyagez",
    description: "Circulez librement au Maroc avec un véhicule assuré et entretenu.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--color-paper-2)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-18">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] mb-3"
          >
            Simple et rapide
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-ink)] tracking-tight"
          >
            Comment ça marche
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center group"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-[var(--color-rule)]" />
              )}
              <div className="relative z-10 w-16 h-16 mx-auto mb-5 bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-2xl flex items-center justify-center group-hover:border-[var(--color-accent)]/40 group-hover:shadow-md transition-all duration-300">
                <step.icon className="h-7 w-7 text-[var(--color-accent)]" />
              </div>
              <span className="inline-block text-[10px] font-mono font-bold text-[var(--color-accent)] tracking-widest mb-2">
                0{index + 1}
              </span>
              <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[240px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

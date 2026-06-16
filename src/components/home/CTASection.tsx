"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/8 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-accent)]/5 rounded-full blur-[60px]" />
          <div className="relative px-8 py-14 lg:px-16 lg:py-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-ink)] mb-4 tracking-tight"
            >
              Prêt à rouler ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-[var(--color-ink-2)] max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Réservez votre véhicule dès maintenant et profitez d&apos;un service premium au Maroc.
              Assistance 24h/24, 7j/7.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/cars">
                <Button size="lg" className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)] h-12 px-8">
                  Réserver maintenant
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="tel:+212524000000">
                <Button size="lg" variant="outline" className="border-[var(--color-rule)] text-[var(--color-ink)] hover:bg-[var(--color-paper-3)] h-12 px-8">
                  <Phone className="h-4 w-4 mr-2" />
                  +212 5 24 00 00 00
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

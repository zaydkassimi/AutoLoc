"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Search, MapPin, Calendar, ArrowRight, Shield, Clock, Star, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Vehicle } from "@/lib/types"

const categoryLabels: Record<string, string> = {
  economique: "Économique",
  confort: "Confort",
  suv: "SUV",
  luxe: "Luxe",
  sport: "Sport",
  van: "Van",
  electrique: "Électrique",
}

interface HeroParallaxProps {
  vehicles?: Vehicle[]
}

export function HeroParallax({ vehicles = [] }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 200, damping: 30, bounce: 0 }
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -150]),
    springConfig
  )
  const translateX2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 150]),
    springConfig
  )
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  const heroCars = vehicles.length > 0
    ? vehicles.slice(0, 6)
    : [
        { id: "1", name: "Mercedes Classe C", category: "luxe" as const, pricePerDay: 1200, images: [] as string[] },
        { id: "2", name: "BMW Série 5", category: "luxe" as const, pricePerDay: 1500, images: [] as string[] },
        { id: "3", name: "Tesla Model 3", category: "electrique" as const, pricePerDay: 900, images: [] as string[] },
        { id: "4", name: "Porsche Cayenne", category: "suv" as const, pricePerDay: 2500, images: [] as string[] },
        { id: "5", name: "Audi Q5", category: "suv" as const, pricePerDay: 1100, images: [] as string[] },
        { id: "6", name: "Ford Mustang", category: "sport" as const, pricePerDay: 1800, images: [] as string[] },
      ] as Vehicle[]

  return (
    <div ref={ref} className="relative min-h-[100vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-paper-2)] via-[var(--color-paper)] to-[var(--color-paper)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-[120px]" />

      {/* Trust bar */}
      <div className="relative z-20 border-b border-[var(--color-rule)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 lg:gap-10 py-3 text-xs text-[var(--color-muted)]">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              <span>Assurance incluse</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              <span>Support 24h/24</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              <span>4.8/5 avis clients</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              <span>50+ agences au Maroc</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <motion.div style={{ opacity, scale }} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24">
        <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/15 rounded-full">
              <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-pulse" />
              Location premium au Maroc
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--color-ink)] mb-6 tracking-tight leading-[0.95]"
          >
            Louez la voiture
            <br />
            <span className="text-[var(--color-accent)]">de vos rêves</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-[var(--color-ink-2)] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Flotte premium de 500+ véhicules. Marrakech, Casablanca, Rabat et partout au Maroc.
            Service 24h/24, 7j/7.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/cars">
              <Button size="lg" className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)] h-12 px-8 text-base">
                Explorer la flotte
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-[var(--color-rule)] text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] h-12 px-8 text-base">
                En savoir plus
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/10">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">
                  Lieu
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                  <Select>
                    <SelectTrigger className="pl-10 bg-[var(--color-paper)] border-[var(--color-rule)] h-11">
                      <SelectValue placeholder="Choisir un lieu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marrakech">Marrakech</SelectItem>
                      <SelectItem value="casablanca">Casablanca</SelectItem>
                      <SelectItem value="rabat">Rabat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">
                  Début
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                  <Input type="date" className="pl-10 bg-[var(--color-paper)] border-[var(--color-rule)] h-11" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">
                  Fin
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                  <Input type="date" className="pl-10 bg-[var(--color-paper)] border-[var(--color-rule)] h-11" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-transparent select-none">Action</Label>
                <Link href="/cars">
                  <Button type="submit" className="w-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)] h-11">
                    <Search className="h-4 w-4 mr-2" />
                    Rechercher
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>

      {/* Parallax Row 1 */}
      <div className="relative mt-4 overflow-hidden">
        <motion.div style={{ x: translateX }} className="flex gap-4 px-4">
          {[...heroCars, ...heroCars].map((car, i) => (
            <motion.div
              key={`r1-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + (i % 3) * 0.1 }}
              className="flex-shrink-0 w-64 sm:w-72 lg:w-80"
            >
              <div className="bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-xl overflow-hidden hover:border-[var(--color-accent)]/40 transition-colors duration-300">
                <div className="aspect-[16/9] bg-gradient-to-br from-[var(--color-paper-3)] to-[var(--color-paper-2)] relative flex items-center justify-center overflow-hidden">
                  {car.images[0] ? (
                    <img src={car.images[0]} alt={car.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span className="text-[var(--color-muted)] text-xs">{car.name}</span>
                  )}
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-medium bg-[var(--color-accent)] text-[var(--color-accent-ink)] rounded">
                    {categoryLabels[car.category] || car.category}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <h4 className="font-display text-sm font-semibold text-[var(--color-ink)]">{car.name}</h4>
                  <p className="text-xs text-[var(--color-muted)]">À partir de {car.pricePerDay.toLocaleString("fr-FR")} <span className="text-[var(--color-accent)]">MAD</span>/jour</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Parallax Row 2 */}
      <div className="relative mt-4 pb-16 overflow-hidden">
        <motion.div style={{ x: translateX2 }} className="flex gap-4 px-4">
          {[...heroCars.slice(3), ...heroCars.slice(0, 3), ...heroCars.slice(3)].map((car, i) => (
            <motion.div
              key={`r2-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + (i % 3) * 0.1 }}
              className="flex-shrink-0 w-64 sm:w-72 lg:w-80"
            >
              <div className="bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-xl overflow-hidden hover:border-[var(--color-accent)]/40 transition-colors duration-300">
                <div className="aspect-[16/9] bg-gradient-to-br from-[var(--color-paper-3)] to-[var(--color-paper-2)] relative flex items-center justify-center overflow-hidden">
                  {car.images[0] ? (
                    <img src={car.images[0]} alt={car.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span className="text-[var(--color-muted)] text-xs">{car.name}</span>
                  )}
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-medium bg-[var(--color-accent)] text-[var(--color-accent-ink)] rounded">
                    {categoryLabels[car.category] || car.category}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <h4 className="font-display text-sm font-semibold text-[var(--color-ink)]">{car.name}</h4>
                  <p className="text-xs text-[var(--color-muted)]">À partir de {car.pricePerDay.toLocaleString("fr-FR")} <span className="text-[var(--color-accent)]">MAD</span>/jour</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-[var(--color-rule)] rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-2 bg-[var(--color-accent)] rounded-full mt-1.5" />
        </motion.div>
      </motion.div>
    </div>
  )
}

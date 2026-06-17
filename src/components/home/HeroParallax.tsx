"use client"

import { useState, useCallback } from "react"
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroParallax() {
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const imageX = useTransform(smoothX, [0, 1], [-15, 15])
  const imageY = useTransform(smoothY, [0, 1], [-10, 10])
  const spotlightX = useTransform(smoothX, [0, 1], [0, 100])
  const spotlightY = useTransform(smoothY, [0, 1], [0, 100])
  const overlayOpacity = useTransform(smoothY, [0, 1], [0.4, 0.7])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseX.set(x)
      mouseY.set(y)
    },
    [mouseX, mouseY]
  )

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }, [mouseX, mouseY])

  return (
    <div
      className="relative min-h-[100vh] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
          alt="Luxury Car"
          className="w-full h-full object-cover scale-110"
          style={{
            x: imageX,
            y: imageY,
          }}
          transition={{ type: "tween", duration: 0 }}
        />
        {/* Warm dark overlay matching site palette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/85 via-[var(--color-ink)]/50 to-transparent" />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-ink)]/70 to-transparent" />
        {/* Mouse spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useMotionTemplate`radial-gradient(circle 600px at ${spotlightX}% ${spotlightY}%, rgba(212,175,55,0.08), transparent 70%)`,
          }}
        />
        {/* Dynamic vignette that deepens at edges */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: overlayOpacity,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,12,0.6) 100%)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 min-h-[calc(100vh-44px)] flex items-center">
        <div className="max-w-2xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] bg-[var(--color-paper)]/5 border border-[var(--color-paper)]/10 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-pulse" />
              Location premium au Maroc
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--color-paper)] mb-6 tracking-tight leading-[1.05]"
          >
            Service de qualité
            <br />
            pour votre{" "}
            <span className="text-[var(--color-accent)]">véhicule</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-[var(--color-paper)]/60 mb-10 max-w-lg leading-relaxed"
          >
            Découvrez la passion et l&apos;expertise derrière AutoLoc.
            Flotte premium de 500+ véhicules au Maroc.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/cars">
              <Button size="lg" className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)] h-12 px-8 text-base">
                Explorer la flotte
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="bg-transparent border-[var(--color-paper)]/30 text-[var(--color-paper)] hover:bg-[var(--color-paper)]/10 h-12 px-8 text-base backdrop-blur-sm">
                En savoir plus
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto border-t border-[var(--color-paper)]/10 py-6 grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-[var(--color-paper)]">500+</p>
              <p className="text-xs text-[var(--color-paper)]/40 mt-0.5">Véhicules disponibles</p>
            </div>
            <div className="text-center border-x border-[var(--color-paper)]/10 px-6">
              <p className="text-2xl font-display font-bold text-[var(--color-paper)]">50+</p>
              <p className="text-xs text-[var(--color-paper)]/40 mt-0.5">Agences au Maroc</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-[var(--color-accent)]">4.8/5</p>
              <p className="text-xs text-[var(--color-paper)]/40 mt-0.5">Satisfaction client</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

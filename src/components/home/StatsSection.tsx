"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const stats = [
  { value: 500, suffix: "+", label: "Véhicules disponibles" },
  { value: 10000, suffix: "+", label: "Clients satisfaits" },
  { value: 50, suffix: "+", label: "Agences au Maroc" },
  { value: 4.8, suffix: "/5", label: "Note moyenne", decimals: 1 },
]

function AnimatedCounter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(current)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl lg:text-5xl font-bold text-[var(--color-accent)] mb-2">
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
      </div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
              <p className="text-sm text-[var(--color-muted)] text-center">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

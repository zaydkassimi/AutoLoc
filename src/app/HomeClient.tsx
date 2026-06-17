"use client"

import { motion } from "framer-motion"
import { HeroParallax } from "@/components/home/HeroParallax"
import { StatsSection } from "@/components/home/StatsSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CTASection } from "@/components/home/CTASection"
import { FeaturedCars } from "@/components/home/FeaturedCars"
import { HowItWorks } from "@/components/home/HowItWorks"
import type { Vehicle, Location } from "@/lib/types"

interface HomeClientProps {
  vehicles: Vehicle[]
  locations: Location[]
}

export default function HomeClient({ vehicles, locations }: HomeClientProps) {
  return (
    <div className="min-h-screen">
      <HeroParallax />
      <FeaturedCars vehicles={vehicles} />
      <HowItWorks />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}

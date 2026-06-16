"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: "t1",
    name: "Sarah Benali",
    role: "Voyageuse d'affaires",
    content: "Service exceptionnel ! La Mercedes Classe C était impeccable pour mes déplacements professionnels à Casablanca.",
    rating: 5,
    avatar: "/images/testimonials/sarah.jpg"
  },
  {
    id: "t2",
    name: "Youssef Mansouri",
    role: "Touriste",
    content: "Location parfaite pour notre road trip à travers le Maroc. Le Dacia Duster a été notre compagnon idéal.",
    rating: 5,
    avatar: "/images/testimonials/youssef.jpg"
  },
  {
    id: "t3",
    name: "Amina Rachid",
    role: "Expatriée",
    content: "Enfin un service de location fiable au Maroc. La Tesla Model 3 m'a permis de découvrir Marrakech en toute sérénité.",
    rating: 4,
    avatar: "/images/testimonials/amina.jpg"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-18">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] mb-3"
          >
            Témoignages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display text-3xl lg:text-5xl font-bold text-[var(--color-ink)] tracking-tight"
          >
            Ce que disent nos clients
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-xl p-6 lg:p-7 hover:border-[var(--color-accent)]/30 transition-colors duration-300"
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-[var(--color-accent)]/15" />
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < testimonial.rating
                        ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                        : "text-[var(--color-rule)]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[var(--color-ink)] mb-6 leading-relaxed text-sm">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-rule)]">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-[var(--color-accent)]/15 text-[var(--color-accent)] text-xs font-bold">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{testimonial.name}</p>
                  <p className="text-[11px] text-[var(--color-muted)]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

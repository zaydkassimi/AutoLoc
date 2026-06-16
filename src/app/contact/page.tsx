"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+212 5 24 00 00 00",
    href: "tel:+212524000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@autoloc.ma",
    href: "mailto:contact@autoloc.ma",
  },
  {
    icon: MapPin,
    label: "Siège social",
    value: "Avenue Mohammed V, Marrakech",
    href: null,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun-Sam : 8h00 - 20h00",
    href: null,
  },
]

const agencies = [
  { city: "Marrakech", address: "Avenue Mohammed V", phone: "+212 5 24 00 00 00" },
  { city: "Casablanca", address: "Boulevard Anfa", phone: "+212 5 22 00 00 00" },
  { city: "Rabat", address: "Avenue Hassan II", phone: "+212 5 37 00 00 00" },
  { city: "Tanger", address: "Boulevard Mohammed V", phone: "+212 5 39 00 00 00" },
]

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.")
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setIsSubmitting(false)
  }

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
              Contact
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-ink)] tracking-tight mb-6"
            >
              Nous sommes là pour{" "}
              <span className="text-[var(--color-accent)]">vous aider</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[var(--color-ink-2)] leading-relaxed"
            >
              Une question ? Un besoin particulier ? Notre équipe est disponible 24h/24, 7j/7.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-6">
                  Envoyez-nous un message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">
                        Nom complet
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Mohamed Alami"
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">
                      Sujet
                    </Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Réservation, info, réclamation..."
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">
                      Message
                    </Label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Décrivez votre demande en détail..."
                      required
                      rows={5}
                      className="w-full rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)] h-12 px-8"
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-6">
                  Coordonnées
                </h2>

                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4 p-4 bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-xl">
                      <div className="w-10 h-10 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center shrink-0">
                        <info.icon className="h-5 w-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-muted)] mb-0.5">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-[var(--color-ink)]">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Agencies */}
      <section className="py-20 lg:py-28 bg-[var(--color-paper-2)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] mb-3">
              Nos agences
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--color-ink)] tracking-tight">
              Retrouvez-nous partout au Maroc
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agencies.map((agency, index) => (
              <motion.div
                key={agency.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-5 hover:border-[var(--color-accent)]/30 transition-colors duration-300"
              >
                <h4 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-2">{agency.city}</h4>
                <div className="space-y-1.5 text-sm text-[var(--color-muted)]">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    {agency.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    {agency.phone}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

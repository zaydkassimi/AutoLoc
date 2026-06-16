"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Calendar, Users, Star } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { VehicleManagement } from "@/components/admin/VehicleManagement"
import { BookingManagement } from "@/components/admin/BookingManagement"
import { UserManagement } from "@/components/admin/UserManagement"
import { AgentManagement } from "@/components/admin/AgentManagement"
import { ReviewManagement } from "@/components/admin/ReviewManagement"
import type { Vehicle, Booking, User, Agent, Review } from "@/lib/types"

interface DashboardPageClientProps {
  vehicles: Vehicle[]
  bookings: Booking[]
  users: User[]
  agents: Agent[]
  reviews: Review[]
}

export default function DashboardPageClient({
  vehicles,
  bookings,
  users,
  agents,
  reviews,
}: DashboardPageClientProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  if (!isAuthenticated || user?.role !== "admin") {
    router.push("/login")
    return null
  }

  const stats = [
    { label: "Véhicules", value: vehicles.length, icon: Car, color: "text-blue-500" },
    { label: "Réservations", value: bookings.length, icon: Calendar, color: "text-green-500" },
    { label: "Clients", value: users.filter(u => u.role === "client").length, icon: Users, color: "text-purple-500" },
    { label: "Agents", value: agents.length, icon: Users, color: "text-orange-500" },
    { label: "Avis", value: reviews.length, icon: Star, color: "text-yellow-500" },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
              Tableau de bord
            </h1>
            <p className="text-[var(--color-ink-2)]">
              Gérez votre flotte, réservations et utilisateurs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-display font-bold text-[var(--color-ink)]">{stat.value}</p>
                    <p className="text-xs text-[var(--color-muted)]">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="vehicles" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="vehicles">Véhicules</TabsTrigger>
              <TabsTrigger value="bookings">Réservations</TabsTrigger>
              <TabsTrigger value="users">Clients</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>

            <TabsContent value="vehicles">
              <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6">
                <VehicleManagement vehicles={vehicles} locations={[]} onRefresh={() => router.refresh()} />
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6">
                <BookingManagement bookings={bookings} vehicles={vehicles} users={users} onRefresh={() => router.refresh()} />
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6">
                <UserManagement users={users} bookings={bookings} onRefresh={() => router.refresh()} />
              </div>
            </TabsContent>

            <TabsContent value="agents">
              <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6">
                <AgentManagement agents={agents} onRefresh={() => router.refresh()} />
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6">
                <ReviewManagement reviews={reviews} vehicles={vehicles} users={users} onRefresh={() => router.refresh()} />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

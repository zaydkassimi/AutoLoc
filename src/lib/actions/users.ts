"use server"

import { db } from "@/lib/db"
import type { User, UserRole } from "@/lib/types"

function mapUser(u: any): User {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    phone: u.phone ?? undefined,
    role: u.role as UserRole,
    createdAt: u.createdAt.toISOString(),
    avatar: u.avatar ?? undefined,
  }
}

export async function getUsers(): Promise<User[]> {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
  })
  return users.map(mapUser)
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await db.user.findUnique({ where: { id } })
  return user ? mapUser(user) : null
}

export async function getUserByEmail(email: string) {
  return db.user.findUnique({ where: { email } })
}

export async function createUser(data: {
  email: string
  password: string
  name: string
  phone?: string
  role?: UserRole
}) {
  return db.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      role: data.role ?? "client",
    },
  })
}

export async function updateUserRole(id: string, role: UserRole): Promise<User> {
  const user = await db.user.update({
    where: { id },
    data: { role: role as any },
  })
  return mapUser(user)
}

export async function deleteUser(id: string): Promise<void> {
  await db.agent.deleteMany({ where: { userId: id } })
  await db.review.deleteMany({ where: { userId: id } })
  await db.booking.deleteMany({ where: { userId: id } })
  await db.user.delete({ where: { id } })
}

export async function registerAgentServer(data: {
  email: string
  password: string
  name: string
  phone: string
  agency: string
}): Promise<{ success: boolean; error?: string; userId?: string }> {
  const existing = await db.user.findUnique({ where: { email: data.email } })
  if (existing) {
    return { success: false, error: "Cet email est déjà utilisé" }
  }

  const newUser = await db.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      role: "client",
    },
  })

  await db.agent.create({
    data: {
      userId: newUser.id,
      agencyName: data.agency,
      agencyAddress: "",
      agencyPhone: data.phone,
      agencyEmail: data.email,
      licenseNumber: "",
    },
  })

  return { success: true, userId: newUser.id }
}

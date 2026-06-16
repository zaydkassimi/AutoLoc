"use server"

import { db } from "@/lib/db"
import type { Agent } from "@/lib/types"

function mapAgent(a: any): Agent {
  return {
    id: a.id,
    userId: a.userId,
    agencyName: a.agencyName,
    agencyAddress: a.agencyAddress,
    agencyPhone: a.agencyPhone,
    agencyEmail: a.agencyEmail,
    licenseNumber: a.licenseNumber,
    vehicles: [],
    rating: a.rating,
    reviewCount: a.reviewCount,
    verified: a.verified,
  }
}

export async function getAgents(): Promise<Agent[]> {
  const agents = await db.agent.findMany({
    orderBy: { createdAt: "desc" },
  })
  return agents.map(mapAgent)
}

export async function getAgentById(id: string): Promise<Agent | null> {
  const agent = await db.agent.findUnique({ where: { id } })
  return agent ? mapAgent(agent) : null
}

export async function getAgentByUserId(userId: string): Promise<Agent | null> {
  const agent = await db.agent.findUnique({ where: { userId } })
  return agent ? mapAgent(agent) : null
}

export async function createAgent(data: {
  userId: string
  agencyName: string
  agencyAddress: string
  agencyPhone: string
  agencyEmail: string
  licenseNumber: string
}): Promise<Agent> {
  const agent = await db.agent.create({ data })
  return mapAgent(agent)
}

export async function verifyAgent(id: string): Promise<Agent> {
  const agent = await db.agent.update({
    where: { id },
    data: { verified: true },
  })
  return mapAgent(agent)
}

export async function rejectAgent(id: string): Promise<void> {
  const agent = await db.agent.findUnique({ where: { id } })
  if (agent) {
    await db.agent.delete({ where: { id } })
    await db.user.update({
      where: { id: agent.userId },
      data: { role: "client" },
    })
  }
}

export async function deleteAgent(id: string): Promise<void> {
  await db.agent.delete({ where: { id } })
}

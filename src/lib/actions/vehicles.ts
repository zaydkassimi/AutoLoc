"use server"

import { db } from "@/lib/db"
import type { Vehicle, VehicleCategory, FuelType, Transmission } from "@/lib/types"
import type { Prisma } from "@prisma/client"

function mapVehicle(v: any): Vehicle {
  return {
    id: v.id,
    name: v.name,
    brand: v.brand,
    model: v.model,
    year: v.year,
    category: v.category as VehicleCategory,
    pricePerDay: v.pricePerDay,
    currency: v.currency,
    images: v.images,
    description: v.description,
    specifications: {
      engine: v.engine,
      horsepower: v.horsepower,
      torque: v.torque,
      drivetrain: v.drivetrain,
      fuelConsumption: v.fuelConsumption,
      co2Emissions: v.co2Emissions,
      EuroClass: v.euroClass,
    },
    features: v.features,
    available: v.available,
    location: v.location,
    rating: v.rating,
    reviewCount: v.reviewCount,
    mileage: v.mileage,
    fuelType: v.fuelType as FuelType,
    transmission: v.transmission as Transmission,
    seats: v.seats,
    doors: v.doors,
    luggageCapacity: v.luggageCapacity,
    enginePower: v.enginePower,
    acceleration: v.acceleration,
    topSpeed: v.topSpeed,
  }
}

export async function getVehicles(): Promise<Vehicle[]> {
  const vehicles = await db.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  })
  return vehicles.map(mapVehicle)
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const vehicle = await db.vehicle.findUnique({ where: { id } })
  return vehicle ? mapVehicle(vehicle) : null
}

export async function getAvailableVehicles(): Promise<Vehicle[]> {
  const vehicles = await db.vehicle.findMany({
    where: { available: true },
    orderBy: { rating: "desc" },
  })
  return vehicles.map(mapVehicle)
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const vehicles = await db.vehicle.findMany({
    where: { available: true },
    orderBy: { rating: "desc" },
    take: 6,
  })
  return vehicles.map(mapVehicle)
}

export async function searchVehicles(params: {
  query?: string
  category?: VehicleCategory
  fuelType?: FuelType
  transmission?: Transmission
  minPrice?: number
  maxPrice?: number
  location?: string
}): Promise<Vehicle[]> {
  const where: any = { available: true }

  if (params.query) {
    where.OR = [
      { name: { contains: params.query, mode: "insensitive" } },
      { brand: { contains: params.query, mode: "insensitive" } },
      { model: { contains: params.query, mode: "insensitive" } },
      { description: { contains: params.query, mode: "insensitive" } },
    ]
  }

  if (params.category) where.category = params.category
  if (params.fuelType) where.fuelType = params.fuelType
  if (params.transmission) where.transmission = params.transmission
  if (params.location) where.location = { contains: params.location, mode: "insensitive" }

  if (params.minPrice || params.maxPrice) {
    where.pricePerDay = {}
    if (params.minPrice) where.pricePerDay.gte = params.minPrice
    if (params.maxPrice) where.pricePerDay.lte = params.maxPrice
  }

  const vehicles = await db.vehicle.findMany({
    where,
    orderBy: { rating: "desc" },
  })

  return vehicles.map(mapVehicle)
}

export async function addVehicle(data: {
  name: string
  brand: string
  model: string
  year: number
  category: string
  pricePerDay: number
  images: string[]
  description: string
  engine: string
  horsepower: number
  torque: string
  drivetrain: string
  fuelConsumption: string
  co2Emissions: string
  euroClass: string
  features: string[]
  available: boolean
  location: string
  mileage: number
  fuelType: string
  transmission: string
  seats: number
  doors: number
  luggageCapacity: number
  enginePower: string
  acceleration: string
  topSpeed: string
}): Promise<Vehicle> {
  const vehicle = await db.vehicle.create({
    data: {
      name: data.name,
      brand: data.brand,
      model: data.model,
      year: data.year,
      category: data.category as any,
      pricePerDay: data.pricePerDay,
      images: data.images,
      description: data.description,
      engine: data.engine,
      horsepower: data.horsepower,
      torque: data.torque,
      drivetrain: data.drivetrain,
      fuelConsumption: data.fuelConsumption,
      co2Emissions: data.co2Emissions,
      euroClass: data.euroClass,
      features: data.features,
      available: data.available,
      location: data.location,
      rating: 0,
      reviewCount: 0,
      mileage: data.mileage,
      fuelType: data.fuelType as any,
      transmission: data.transmission as any,
      seats: data.seats,
      doors: data.doors,
      luggageCapacity: data.luggageCapacity,
      enginePower: data.enginePower,
      acceleration: data.acceleration,
      topSpeed: data.topSpeed,
    },
  })
  return mapVehicle(vehicle)
}

export async function updateVehicle(
  id: string,
  data: {
    name?: string
    brand?: string
    model?: string
    year?: number
    category?: string
    pricePerDay?: number
    images?: string[]
    description?: string
    engine?: string
    horsepower?: number
    torque?: string
    drivetrain?: string
    fuelConsumption?: string
    co2Emissions?: string
    euroClass?: string
    features?: string[]
    available?: boolean
    location?: string
    mileage?: number
    fuelType?: string
    transmission?: string
    seats?: number
    doors?: number
    luggageCapacity?: number
    enginePower?: string
    acceleration?: string
    topSpeed?: string
  }
): Promise<Vehicle> {
  const updateData: Prisma.VehicleUpdateInput = {}
  if (data.name !== undefined) updateData.name = data.name
  if (data.brand !== undefined) updateData.brand = data.brand
  if (data.model !== undefined) updateData.model = data.model
  if (data.year !== undefined) updateData.year = data.year
  if (data.category !== undefined) updateData.category = data.category as any
  if (data.pricePerDay !== undefined) updateData.pricePerDay = data.pricePerDay
  if (data.images !== undefined) updateData.images = data.images
  if (data.description !== undefined) updateData.description = data.description
  if (data.engine !== undefined) updateData.engine = data.engine
  if (data.horsepower !== undefined) updateData.horsepower = data.horsepower
  if (data.torque !== undefined) updateData.torque = data.torque
  if (data.drivetrain !== undefined) updateData.drivetrain = data.drivetrain
  if (data.fuelConsumption !== undefined) updateData.fuelConsumption = data.fuelConsumption
  if (data.co2Emissions !== undefined) updateData.co2Emissions = data.co2Emissions
  if (data.euroClass !== undefined) updateData.euroClass = data.euroClass
  if (data.features !== undefined) updateData.features = data.features
  if (data.available !== undefined) updateData.available = data.available
  if (data.location !== undefined) updateData.location = data.location
  if (data.mileage !== undefined) updateData.mileage = data.mileage
  if (data.fuelType !== undefined) updateData.fuelType = data.fuelType as any
  if (data.transmission !== undefined) updateData.transmission = data.transmission as any
  if (data.seats !== undefined) updateData.seats = data.seats
  if (data.doors !== undefined) updateData.doors = data.doors
  if (data.luggageCapacity !== undefined) updateData.luggageCapacity = data.luggageCapacity
  if (data.enginePower !== undefined) updateData.enginePower = data.enginePower
  if (data.acceleration !== undefined) updateData.acceleration = data.acceleration
  if (data.topSpeed !== undefined) updateData.topSpeed = data.topSpeed

  const vehicle = await db.vehicle.update({
    where: { id },
    data: updateData,
  })
  return mapVehicle(vehicle)
}

export async function deleteVehicle(id: string): Promise<void> {
  await db.vehicle.delete({ where: { id } })
}

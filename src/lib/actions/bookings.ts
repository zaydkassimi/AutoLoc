"use server"

import { db } from "@/lib/db"
import type { Booking, BookingStatus, PaymentStatus, InsuranceOption, PaymentMethod } from "@/lib/types"

function mapBooking(b: any): Booking {
  return {
    id: b.id,
    userId: b.userId,
    vehicleId: b.vehicleId,
    startDate: b.startDate.toISOString(),
    endDate: b.endDate.toISOString(),
    pickupLocation: b.pickupLocation,
    returnLocation: b.returnLocation,
    status: b.status as BookingStatus,
    totalPrice: b.totalPrice,
    currency: b.currency,
    insurance: b.insurance as InsuranceOption,
    paymentMethod: b.paymentMethod as PaymentMethod | undefined,
    paymentStatus: b.paymentStatus as PaymentStatus,
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    notes: b.notes ?? undefined,
  }
}

export async function getBookings(): Promise<Booking[]> {
  const bookings = await db.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { vehicle: true, user: true },
  })
  return bookings.map(mapBooking)
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const booking = await db.booking.findUnique({
    where: { id },
    include: { vehicle: true, user: true },
  })
  return booking ? mapBooking(booking) : null
}

export async function getBookingsByUser(userId: string): Promise<Booking[]> {
  const bookings = await db.booking.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { vehicle: true },
  })
  return bookings.map(mapBooking)
}

export async function createBooking(data: {
  userId: string
  vehicleId: string
  startDate: string
  endDate: string
  pickupLocation: string
  returnLocation: string
  insurance: InsuranceOption
  paymentMethod: PaymentMethod
  totalPrice: number
  notes?: string
}): Promise<Booking> {
  const booking = await db.booking.create({
    data: {
      userId: data.userId,
      vehicleId: data.vehicleId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      pickupLocation: data.pickupLocation,
      returnLocation: data.returnLocation,
      status: "pending",
      totalPrice: data.totalPrice,
      insurance: data.insurance,
      paymentMethod: data.paymentMethod,
      paymentStatus: "pending",
      notes: data.notes,
    },
  })
  return mapBooking(booking)
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<Booking> {
  const booking = await db.booking.update({
    where: { id },
    data: { status },
  })
  return mapBooking(booking)
}

export async function updatePaymentStatus(
  id: string,
  paymentStatus: PaymentStatus
): Promise<Booking> {
  const booking = await db.booking.update({
    where: { id },
    data: { paymentStatus },
  })
  return mapBooking(booking)
}

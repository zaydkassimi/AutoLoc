export interface Vehicle {
  id: string
  name: string
  brand: string
  model: string
  year: number
  category: VehicleCategory
  pricePerDay: number
  currency: string
  images: string[]
  description: string
  specifications: VehicleSpecifications
  features: string[]
  available: boolean
  location: string
  rating: number
  reviewCount: number
  mileage: number
  fuelType: FuelType
  transmission: Transmission
  seats: number
  doors: number
  luggageCapacity: number
  enginePower: string
  acceleration: string
  topSpeed: string
}

export type VehicleCategory = 
  | "economique"
  | "confort"
  | "luxe"
  | "suv"
  | "sport"
  | "utilitaire"
  | "van"
  | "electrique"

export type FuelType = 
  | "essence"
  | "diesel"
  | "hybride"
  | "electrique"

export type Transmission = 
  | "automatique"
  | "manuelle"

export interface VehicleSpecifications {
  engine: string
  horsepower: number
  torque: string
  drivetrain: string
  fuelConsumption: string
  co2Emissions: string
  EuroClass: string
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: UserRole
  createdAt: string
  avatar?: string
}

export type UserRole = "client" | "agent" | "admin"

export interface Booking {
  id: string
  userId: string
  vehicleId: string
  startDate: string
  endDate: string
  pickupLocation: string
  returnLocation: string
  status: BookingStatus
  totalPrice: number
  currency: string
  insurance: InsuranceOption
  paymentMethod?: PaymentMethod
  paymentStatus: PaymentStatus
  createdAt: string
  updatedAt: string
  notes?: string
}

export type BookingStatus = 
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled"
  | "rejected"

export type PaymentStatus = 
  | "pending"
  | "completed"
  | "failed"
  | "refunded"

export type InsuranceOption = 
  | "none"
  | "basic"
  | "premium"
  | "full"

export type PaymentMethod = 
  | "card"
  | "cash"
  | "bank_transfer"
  | "online"

export interface Agent {
  id: string
  userId: string
  agencyName: string
  agencyAddress: string
  agencyPhone: string
  agencyEmail: string
  licenseNumber: string
  vehicles: Vehicle[]
  rating: number
  reviewCount: number
  verified: boolean
}

export interface Review {
  id: string
  userId: string
  vehicleId: string
  bookingId: string
  rating: number
  comment: string
  createdAt: string
  userName: string
  userAvatar?: string
}

export interface Location {
  id: string
  name: string
  address: string
  city: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
  operatingHours: string
  phone?: string
}

export interface FilterOptions {
  category?: VehicleCategory[]
  fuelType?: FuelType[]
  transmission?: Transmission[]
  priceRange?: {
    min: number
    max: number
  }
  seats?: number
  features?: string[]
  available?: boolean
}

export interface SortOptions {
  field: "price" | "rating" | "year" | "name"
  direction: "asc" | "desc"
}

export interface SearchQuery {
  query?: string
  location?: string
  startDate?: string
  endDate?: string
  filters?: FilterOptions
  sort?: SortOptions
}

export interface BookingFormData {
  vehicleId: string
  startDate: string
  endDate: string
  pickupLocation: string
  returnLocation: string
  insurance: InsuranceOption
  paymentMethod: PaymentMethod
  notes?: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface DashboardStats {
  totalBookings: number
  activeBookings: number
  totalRevenue: number
  averageRating: number
  totalVehicles: number
  totalUsers: number
  recentBookings: Booking[]
  popularVehicles: Vehicle[]
}

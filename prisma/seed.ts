import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  // Clean existing data
  await prisma.review.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.agent.deleteMany()
  await prisma.location.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  const admin = await prisma.user.create({
    data: {
      id: "u1",
      email: "admin@autoloc.ma",
      password: "admin",
      name: "Admin AutoLoc",
      phone: "+212 6 00 00 00 00",
      role: "admin",
    },
  })

  const agentUser = await prisma.user.create({
    data: {
      id: "u2",
      email: "agent@autoloc.ma",
      password: "agent123",
      name: "Agent Marrakech",
      phone: "+212 6 11 11 11 11",
      role: "agent",
    },
  })

  const client = await prisma.user.create({
    data: {
      id: "u3",
      email: "client@example.com",
      password: "client123",
      name: "Mohammed Alami",
      phone: "+212 6 22 22 22 22",
      role: "client",
    },
  })

  console.log("Users seeded.")

  // Create vehicles
  const vehiclesData = [
    {
      id: "v1", name: "Renault Clio", brand: "Renault", model: "Clio", year: 2024,
      category: "economique" as const, pricePerDay: 250, images: ["/images/vehicles/clio-1.jpg"],
      description: "Citadine compacte et économique, idéale pour les trajets urbains à Marrakech.",
      engine: "1.0 TCe 90", horsepower: 90, torque: "142 Nm", drivetrain: "Traction",
      fuelConsumption: "5.2L/100km", co2Emissions: "118 g/km", euroClass: "Euro 6d",
      features: ["Climatisation", "Bluetooth", "Caméra de recul", "Android Auto", "Apple CarPlay"],
      available: true, location: "Marrakech", rating: 4.5, reviewCount: 128, mileage: 15000,
      fuelType: "essence" as const, transmission: "manuelle" as const,
      seats: 5, doors: 5, luggageCapacity: 300, enginePower: "90 ch",
      acceleration: "12.5s (0-100km/h)", topSpeed: "180 km/h",
    },
    {
      id: "v2", name: "Peugeot 208", brand: "Peugeot", model: "208", year: 2024,
      category: "economique" as const, pricePerDay: 280, images: ["/images/vehicles/208-1.jpg"],
      description: "Design élégant et technologie de pointe pour une conduite plaisir en ville.",
      engine: "1.2 PureTech 75", horsepower: 75, torque: "118 Nm", drivetrain: "Traction",
      fuelConsumption: "4.8L/100km", co2Emissions: "109 g/km", euroClass: "Euro 6d",
      features: ["Climatisation", "Bluetooth", "Écran tactile", "Android Auto", "Apple CarPlay"],
      available: true, location: "Casablanca", rating: 4.3, reviewCount: 95, mileage: 12000,
      fuelType: "essence" as const, transmission: "automatique" as const,
      seats: 5, doors: 5, luggageCapacity: 310, enginePower: "75 ch",
      acceleration: "13.2s (0-100km/h)", topSpeed: "170 km/h",
    },
    {
      id: "v3", name: "Dacia Duster", brand: "Dacia", model: "Duster", year: 2024,
      category: "suv" as const, pricePerDay: 450, images: ["/images/vehicles/duster-1.jpg"],
      description: "SUV robuste et polyvalent, parfait pour les aventures sur les pistes marocaines.",
      engine: "1.5 dCi 115", horsepower: 115, torque: "260 Nm", drivetrain: "4x4",
      fuelConsumption: "5.8L/100km", co2Emissions: "152 g/km", euroClass: "Euro 6d",
      features: ["Climatisation", "Bluetooth", "Caméra de recul", "GPS", "Sièges chauffants"],
      available: true, location: "Marrakech", rating: 4.6, reviewCount: 203, mileage: 25000,
      fuelType: "diesel" as const, transmission: "manuelle" as const,
      seats: 5, doors: 5, luggageCapacity: 445, enginePower: "115 ch",
      acceleration: "10.5s (0-100km/h)", topSpeed: "185 km/h",
    },
    {
      id: "v4", name: "Volkswagen Golf", brand: "Volkswagen", model: "Golf", year: 2023,
      category: "confort" as const, pricePerDay: 550, images: ["/images/vehicles/golf-1.jpg"],
      description: "Berline premium avec finition soignée et technologies avancées.",
      engine: "2.0 TDI 150", horsepower: 150, torque: "340 Nm", drivetrain: "Traction",
      fuelConsumption: "4.5L/100km", co2Emissions: "118 g/km", euroClass: "Euro 6d",
      features: ["Climatisation bi-zone", "Bluetooth", "GPS", "Toit ouvrant", "Caméra 360°"],
      available: true, location: "Casablanca", rating: 4.7, reviewCount: 167, mileage: 18000,
      fuelType: "diesel" as const, transmission: "automatique" as const,
      seats: 5, doors: 5, luggageCapacity: 380, enginePower: "150 ch",
      acceleration: "8.8s (0-100km/h)", topSpeed: "220 km/h",
    },
    {
      id: "v5", name: "Mercedes Classe C", brand: "Mercedes-Benz", model: "Classe C", year: 2024,
      category: "luxe" as const, pricePerDay: 1200, images: ["/images/vehicles/mercedes-c-1.jpg"],
      description: "Berline de luxe alliant élégance, confort et performances exceptionnelles.",
      engine: "C 200 1.5T", horsepower: 204, torque: "300 Nm", drivetrain: "Traction",
      fuelConsumption: "6.2L/100km", co2Emissions: "141 g/km", euroClass: "Euro 6d",
      features: ["Climatisation bi-zone", "Bluetooth", "GPS", "Intérieur cuir", "Son Harman Kardon"],
      available: true, location: "Casablanca", rating: 4.8, reviewCount: 89, mileage: 8000,
      fuelType: "essence" as const, transmission: "automatique" as const,
      seats: 5, doors: 5, luggageCapacity: 455, enginePower: "204 ch",
      acceleration: "7.3s (0-100km/h)", topSpeed: "240 km/h",
    },
    {
      id: "v6", name: "BMW Série 5", brand: "BMW", model: "Série 5", year: 2024,
      category: "luxe" as const, pricePerDay: 1500, images: ["/images/vehicles/bmw-5-1.jpg"],
      description: "Berline executive de prestige pour les voyageurs exigeants.",
      engine: "530i 2.0T", horsepower: 252, torque: "350 Nm", drivetrain: "Propulsion",
      fuelConsumption: "6.8L/100km", co2Emissions: "155 g/km", euroClass: "Euro 6d",
      features: ["Climatisation bi-zone", "Bluetooth", "GPS", "Intérieur cuir", "Affichage tête haute"],
      available: true, location: "Rabat", rating: 4.9, reviewCount: 72, mileage: 5000,
      fuelType: "essence" as const, transmission: "automatique" as const,
      seats: 5, doors: 5, luggageCapacity: 530, enginePower: "252 ch",
      acceleration: "6.2s (0-100km/h)", topSpeed: "250 km/h",
    },
    {
      id: "v7", name: "Porsche Cayenne", brand: "Porsche", model: "Cayenne", year: 2023,
      category: "luxe" as const, pricePerDay: 2500, images: ["/images/vehicles/cayenne-1.jpg"],
      description: "SUV de luxe sportif pour une expérience de conduite unique au Maroc.",
      engine: "Cayenne 3.0 V6", horsepower: 340, torque: "450 Nm", drivetrain: "Intégral",
      fuelConsumption: "9.4L/100km", co2Emissions: "214 g/km", euroClass: "Euro 6d",
      features: ["Climatisation bi-zone", "Bluetooth", "GPS", "Intérieur cuir", "Suspension pneumatique"],
      available: true, location: "Marrakech", rating: 4.9, reviewCount: 45, mileage: 12000,
      fuelType: "essence" as const, transmission: "automatique" as const,
      seats: 5, doors: 5, luggageCapacity: 580, enginePower: "340 ch",
      acceleration: "6.1s (0-100km/h)", topSpeed: "250 km/h",
    },
    {
      id: "v8", name: "Audi Q5", brand: "Audi", model: "Q5", year: 2024,
      category: "suv" as const, pricePerDay: 1100, images: ["/images/vehicles/q5-1.jpg"],
      description: "SUV premium alliant confort, technologies et design raffiné.",
      engine: "40 TDI 2.0", horsepower: 204, torque: "400 Nm", drivetrain: "Intégral Quattro",
      fuelConsumption: "5.9L/100km", co2Emissions: "155 g/km", euroClass: "Euro 6d",
      features: ["Climatisation bi-zone", "Bluetooth", "GPS", "Intérieur cuir", "Virtual Cockpit"],
      available: true, location: "Casablanca", rating: 4.7, reviewCount: 112, mileage: 10000,
      fuelType: "diesel" as const, transmission: "automatique" as const,
      seats: 5, doors: 5, luggageCapacity: 520, enginePower: "204 ch",
      acceleration: "8.1s (0-100km/h)", topSpeed: "220 km/h",
    },
    {
      id: "v9", name: "Renault Captur", brand: "Renault", model: "Captur", year: 2024,
      category: "suv" as const, pricePerDay: 400, images: ["/images/vehicles/captur-1.jpg"],
      description: "Crossover compact et stylé, idéal pour la famille en voyage.",
      engine: "1.3 TCe 140", horsepower: 140, torque: "240 Nm", drivetrain: "Traction",
      fuelConsumption: "5.6L/100km", co2Emissions: "128 g/km", euroClass: "Euro 6d",
      features: ["Climatisation", "Bluetooth", "Caméra de recul", "Écran tactile", "Toit panoramique"],
      available: true, location: "Marrakech", rating: 4.4, reviewCount: 156, mileage: 20000,
      fuelType: "essence" as const, transmission: "automatique" as const,
      seats: 5, doors: 5, luggageCapacity: 455, enginePower: "140 ch",
      acceleration: "9.9s (0-100km/h)", topSpeed: "200 km/h",
    },
    {
      id: "v10", name: "Ford Mustang", brand: "Ford", model: "Mustang", year: 2023,
      category: "sport" as const, pricePerDay: 1800, images: ["/images/vehicles/mustang-1.jpg"],
      description: "Muscle car iconique pour une conduite sportive inoubliable.",
      engine: "5.0 V8 GT", horsepower: 450, torque: "529 Nm", drivetrain: "Propulsion",
      fuelConsumption: "12.4L/100km", co2Emissions: "282 g/km", euroClass: "Euro 6d",
      features: ["Climatisation", "Bluetooth", "GPS", "Intérieur cuir", "Son premium"],
      available: true, location: "Casablanca", rating: 4.8, reviewCount: 67, mileage: 8000,
      fuelType: "essence" as const, transmission: "automatique" as const,
      seats: 4, doors: 2, luggageCapacity: 400, enginePower: "450 ch",
      acceleration: "4.6s (0-100km/h)", topSpeed: "250 km/h",
    },
    {
      id: "v11", name: "Volkswagen Transporter", brand: "Volkswagen", model: "Transporter", year: 2023,
      category: "van" as const, pricePerDay: 800, images: ["/images/vehicles/transporter-1.jpg"],
      description: "Fourgon spacieux pour les besoins professionnels et familiaux.",
      engine: "2.0 TDI 150", horsepower: 150, torque: "340 Nm", drivetrain: "Traction",
      fuelConsumption: "7.2L/100km", co2Emissions: "189 g/km", euroClass: "Euro 6d",
      features: ["Climatisation", "Bluetooth", "GPS", "Caméra de recul", "Portes coulissantes"],
      available: true, location: "Casablanca", rating: 4.5, reviewCount: 89, mileage: 35000,
      fuelType: "diesel" as const, transmission: "automatique" as const,
      seats: 9, doors: 5, luggageCapacity: 1200, enginePower: "150 ch",
      acceleration: "12.0s (0-100km/h)", topSpeed: "180 km/h",
    },
    {
      id: "v12", name: "Tesla Model 3", brand: "Tesla", model: "Model 3", year: 2024,
      category: "electrique" as const, pricePerDay: 900, images: ["/images/vehicles/model3-1.jpg"],
      description: "Berline 100% électrique avec technologie de pointe et autonomie exceptionnelle.",
      engine: "Électrique", horsepower: 283, torque: "450 Nm", drivetrain: "Propulsion",
      fuelConsumption: "15 kWh/100km", co2Emissions: "0 g/km", euroClass: "Euro 6d",
      features: ["Climatisation", "GPS", "Écran tactile 15\"", "Autopilot", "Supercharge"],
      available: true, location: "Casablanca", rating: 4.8, reviewCount: 134, mileage: 15000,
      fuelType: "electrique" as const, transmission: "automatique" as const,
      seats: 5, doors: 4, luggageCapacity: 425, enginePower: "283 ch",
      acceleration: "6.1s (0-100km/h)", topSpeed: "225 km/h",
    },
    {
      id: "v13", name: "Peugeot 308", brand: "Peugeot", model: "308", year: 2024,
      category: "confort" as const, pricePerDay: 480, images: ["/images/vehicles/308-1.jpg"],
      description: "Berline élégante avec intérieur raffiné et technologies dernière génération.",
      engine: "1.5 BlueHDi 130", horsepower: 130, torque: "300 Nm", drivetrain: "Traction",
      fuelConsumption: "4.7L/100km", co2Emissions: "123 g/km", euroClass: "Euro 6d",
      features: ["Climatisation bi-zone", "Bluetooth", "GPS", "Intérieur cuir", "Toit ouvrant"],
      available: true, location: "Marrakech", rating: 4.6, reviewCount: 142, mileage: 14000,
      fuelType: "diesel" as const, transmission: "automatique" as const,
      seats: 5, doors: 5, luggageCapacity: 412, enginePower: "130 ch",
      acceleration: "9.6s (0-100km/h)", topSpeed: "210 km/h",
    },
    {
      id: "v14", name: "Mercedes Classe GLE", brand: "Mercedes-Benz", model: "Classe GLE", year: 2024,
      category: "suv" as const, pricePerDay: 2000, images: ["/images/vehicles/gle-1.jpg"],
      description: "SUV de luxe premium pour un voyage confortable et majestueux.",
      engine: "GLE 450 3.0T", horsepower: 367, torque: "500 Nm", drivetrain: "Intégral 4MATIC",
      fuelConsumption: "8.9L/100km", co2Emissions: "203 g/km", euroClass: "Euro 6d",
      features: ["Climatisation tri-zone", "Bluetooth", "GPS", "Intérieur cuir", "Suspension air"],
      available: true, location: "Casablanca", rating: 4.9, reviewCount: 56, mileage: 7000,
      fuelType: "essence" as const, transmission: "automatique" as const,
      seats: 5, doors: 5, luggageCapacity: 630, enginePower: "367 ch",
      acceleration: "5.7s (0-100km/h)", topSpeed: "250 km/h",
    },
  ]

  for (const v of vehiclesData) {
    await prisma.vehicle.create({ data: v })
  }

  console.log("Vehicles seeded.")

  // Create locations
  const locationsData = [
    { id: "l1", name: "Aéroport Marrakech Ménara", address: "Aéroport Marrakech Ménara, Marrakech", city: "Marrakech", country: "Maroc", latitude: 31.6069, longitude: -8.0363, operatingHours: "24h/24, 7j/7", phone: "+212 5 24 00 00 00" },
    { id: "l2", name: "Aéroport Casablanca Mohammed V", address: "Aéroport Casablanca Mohammed V, Casablanca", city: "Casablanca", country: "Maroc", latitude: 33.3675, longitude: -7.5898, operatingHours: "24h/24, 7j/7", phone: "+212 5 22 00 00 00" },
    { id: "l3", name: "Centre-ville Rabat", address: "Avenue Hassan II, Rabat", city: "Rabat", country: "Maroc", latitude: 34.0209, longitude: -6.8416, operatingHours: "08:00 - 20:00, 7j/7", phone: "+212 5 37 00 00 00" },
  ]

  for (const l of locationsData) {
    await prisma.location.create({ data: l })
  }

  console.log("Locations seeded.")

  // Create bookings
  const booking1 = await prisma.booking.create({
    data: {
      id: "b1", userId: "u3", vehicleId: "v5",
      startDate: new Date("2026-06-20"), endDate: new Date("2026-06-25"),
      pickupLocation: "Marrakech", returnLocation: "Marrakech",
      status: "confirmed", totalPrice: 6000, insurance: "premium",
      paymentMethod: "card", paymentStatus: "completed", notes: "Vol Arrivée 14h",
    },
  })

  const booking2 = await prisma.booking.create({
    data: {
      id: "b2", userId: "u3", vehicleId: "v1",
      startDate: new Date("2026-06-15"), endDate: new Date("2026-06-17"),
      pickupLocation: "Casablanca", returnLocation: "Casablanca",
      status: "completed", totalPrice: 500, insurance: "basic",
      paymentMethod: "cash", paymentStatus: "completed",
    },
  })

  console.log("Bookings seeded.")

  // Create reviews
  await prisma.review.create({
    data: {
      id: "r1", userId: "u3", vehicleId: "v5", bookingId: "b1",
      rating: 5, comment: "Voiture exceptionnelle, service impeccable. Je recommande vivement AutoLoc pour la location de véhicules de luxe au Maroc.",
    },
  })

  await prisma.review.create({
    data: {
      id: "r2", userId: "u3", vehicleId: "v1", bookingId: "b2",
      rating: 4, comment: "Bonne voiture pour le prix, parfait pour se déplacer en ville. Le service client était très réactif.",
    },
  })

  console.log("Reviews seeded.")

  // Create agent
  await prisma.agent.create({
    data: {
      id: "a1", userId: "u2", agencyName: "AutoLoc Marrakech",
      agencyAddress: "Avenue Mohammed V, Marrakech",
      agencyPhone: "+212 5 24 00 00 00", agencyEmail: "marrakech@autoloc.ma",
      licenseNumber: "MA-2024-001", rating: 4.8, reviewCount: 245, verified: true,
    },
  })

  console.log("Agents seeded.")
  console.log("Seed complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

# AutoLoc Pro

Luxury car rental platform for Morocco. Browse, reserve, and manage premium vehicles with a sleek, modern web experience.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Database:** PostgreSQL (Neon) + Prisma 7
- **Forms:** React Hook Form + Zod
- **PDF Generation:** jsPDF
- **Charts:** Recharts
- **Notifications:** Sonner

## Features

### Client
- Browse 14+ vehicles with advanced filters (category, fuel, transmission, price)
- Category-based browsing from footer links
- Vehicle detail pages with image gallery, specs, and reviews
- 5-step booking wizard (dates, locations, options, payment, confirmation)
- PDF booking confirmation download
- Personal reservations dashboard
- Real-time availability status on vehicle cards

### Agent
- View all reservations with search and status filters
- Confirm pending reservations
- Cancel pending or confirmed reservations
- Booking detail dialogs

### Admin
- Full dashboard with KPIs (vehicles, bookings, clients, agents, reviews)
- Vehicle management (CRUD with image management)
- Booking management (approve/reject)
- Client management (delete with cascade)
- Agent management (approve/reject registration requests)
- Review management (delete)

### Design
- Light-mode luxury aesthetic (Soft Platinum + Champagne Gold palette)
- Playfair Display + Lato typography
- Fully responsive (mobile-first)
- Smooth page transitions and micro-interactions

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/autoloc-pro.git
cd autoloc-pro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Push database schema
npx prisma db push

# Seed the database
npx prisma db seed

# Start development server
npm run dev
Environment Variables
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
Database Schema
Model
User
Vehicle
Booking
Review
Agent
Location
Scripts
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint
npx prisma db seed   # Seed database
npx prisma db push   # Sync schema
License
Private — All rights reserved.

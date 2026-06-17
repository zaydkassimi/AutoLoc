# AutoLoc Pro

Premium car rental platform in Morocco — online reservation system.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- **UI:** shadcn/ui, Framer Motion, Lucide Icons
- **Backend:** Server Actions, Prisma 7, Neon PostgreSQL
- **Validation:** React Hook Form + Zod
- **Other:** Recharts (charts), jsPDF (PDF invoices), Sonner (toasts)

## Features

### Client
- Vehicle catalog with filters (category, fuel, transmission, location)
- Vehicle detail with image gallery
- 5-step reservation flow with real-time availability check
- Confirmation page with PDF generation
- Personal booking management
- Authentication (register / login)

### Agent
- Reservations dashboard
- Confirm and cancel reservations

### Admin
- Dashboard with statistics (Recharts)
- Fleet management (CRUD + images)
- Reservation management (approve / reject)
- User management
- Agent management (verify / reject)
- Review management

## Installation

```bash
git clone https://github.com/YOUR_USER/autoloc-pro.git
cd autoloc-pro
npm install
```

## Configuration

Create a `.env` file at the root:

```
DATABASE_URL="postgresql://..."
```

## Database

```bash
npx prisma db push
npx prisma db seed
```

## Development

```bash
npm run dev
```

## Deployment

```bash
npm run build
npm start
```

Vercel deployment: add `DATABASE_URL` to your Vercel project environment variables.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── about/                # About
│   ├── contact/              # Contact
│   ├── cars/                 # Vehicle catalog
│   ├── booking/              # Reservation
│   ├── confirmation/         # Confirmation + PDF
│   ├── login/                # Authentication
│   ├── agent/                # Agent dashboard
│   ├── dashboard/            # Admin panel
│   ├── terms/                # Terms of service
│   ├── privacy/              # Privacy policy
│   └── cookies/              # Cookie policy
├── components/
│   ├── home/                 # Homepage components
│   ├── cars/                 # Vehicle components
│   ├── admin/                # Admin components
│   ├── layout/                # Navbar, Footer
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── db.ts                 # Prisma client
│   ├── types.ts              # TypeScript types
│   ├── auth-context.tsx      # Authentication context
│   └── actions/              # Server Actions (CRUD)
prisma/
├── schema.prisma             # Database schema
├── seed.ts                   # Seed script
└── prisma.config.ts          # Prisma 7 config
```

## Authors

- Zayd Kassimi — Co-founder & CEO
- Nassime Khatib — Co-founder & COO

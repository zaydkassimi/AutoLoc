import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "AutoLoc | Location de véhicules de luxe au Maroc",
  description: "Service de location de véhicules premium au Maroc. Réservez votre voiture de rêve à Marrakech, Casablanca, Rabat et partout au Maroc.",
  keywords: ["location voiture", "Maroc", "Marrakech", "Casablanca", "luxe", "premium", "véhicule"],
  openGraph: {
    title: "AutoLoc | Location de véhicules de luxe au Maroc",
    description: "Service de location de véhicules premium au Maroc",
    type: "website",
    locale: "fr_MA",
    siteName: "AutoLoc",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="min-h-full flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)]">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

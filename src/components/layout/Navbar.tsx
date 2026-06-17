"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, LogOut, ChevronDown, Car, Calendar, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/cars", label: "Véhicules" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => pathname === href

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-paper)]/95 backdrop-blur-xl border-b border-[var(--color-rule)] shadow-lg shadow-black/5"
          : "bg-[var(--color-paper)]"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--color-accent)] rounded-sm flex items-center justify-center">
                <Car className="w-5 h-5 text-[var(--color-accent-ink)]" />
              </div>
              <span className="font-display text-xl font-bold text-[var(--color-ink)] tracking-tight">
                AutoLoc
              </span>
            </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              "href" in link ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {link.label}
                </Link>
              ) : null
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-[var(--color-accent)] text-[var(--color-accent-ink)]">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-[var(--color-muted)]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-[var(--color-ink)]">{user?.name}</p>
                    <p className="text-xs text-[var(--color-muted)]">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user?.role === "agent" && (
                    <DropdownMenuItem asChild>
                      <Link href="/agent" className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        Espace Agent
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/booking" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Mes réservations
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-[var(--color-destructive)]">
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-[var(--color-rule)] text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]">
                    Connexion
                  </Button>
                </Link>
                <Link href="/login?tab=register">
                  <Button className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)]">
                    Réserver
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6 text-[var(--color-ink)]" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[var(--color-paper)]">
              <SheetTitle className="text-[var(--color-ink)]">Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  "href" in link ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors duration-200 ${
                        isActive(link.href)
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : null
                ))}
                <div className="h-px bg-[var(--color-rule)]" />
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-[var(--color-accent)] text-[var(--color-accent-ink)]">
                          {user?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-ink)]">{user?.name}</p>
                        <p className="text-xs text-[var(--color-muted)]">{user?.email}</p>
                      </div>
                    </div>
                    {user?.role === "admin" && (
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                      >
                        <Settings className="h-4 w-4" />
                        Dashboard
                      </Link>
                    )}
                    {user?.role === "agent" && (
                      <Link
                        href="/agent"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                      >
                        <Car className="h-4 w-4" />
                        Espace Agent
                      </Link>
                    )}
                    <Link
                      href="/booking"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                    >
                      <Calendar className="h-4 w-4" />
                      Mes réservations
                    </Link>
                    <Button
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                      variant="ghost"
                      className="justify-start text-[var(--color-destructive)]"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-[var(--color-rule)] text-[var(--color-ink)]">
                        Connexion
                      </Button>
                    </Link>
                    <Link href="/login?tab=register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)]">
                        Réserver
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}

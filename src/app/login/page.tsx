"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { Car, Mail, Lock, User, Phone, MapPin, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [agency, setAgency] = useState("")
  const { login, register, registerAgent, isAuthenticated } = useAuth()
  const router = useRouter()

  if (isAuthenticated) {
    router.push("/")
    return null
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await login(email, password)
    if (result.success) {
      toast.success("Connexion réussie !")
      if (email === "admin@autoloc.ma") {
        router.push("/dashboard")
      } else {
        router.push("/")
      }
    } else {
      toast.error(result.error || "Email ou mot de passe incorrect")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await register(name, email, password)
    if (result.success) {
      toast.success("Compte créé avec succès !")
      router.push("/")
    } else {
      toast.error(result.error || "Cet email est déjà utilisé")
    }
  }

  const handleAgentRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await registerAgent(email, password, name, phone, agency)
    if (result.success) {
      toast.success("Votre demande d'inscription a été envoyée !")
    } else {
      toast.error(result.error || "Cet email est déjà utilisé")
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Car className="h-8 w-8 text-[var(--color-accent)]" />
              <span className="font-display text-2xl font-bold text-[var(--color-ink)]">AutoLoc</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
              Bienvenue
            </h1>
            <p className="text-[var(--color-ink-2)]">
              Connectez-vous ou créez un compte pour réserver
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Créer compte</TabsTrigger>
              <TabsTrigger value="agent">Agent</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleLogin}
                className="space-y-4 bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)]">
                  Se connecter
                </Button>
                <p className="text-xs text-center text-[var(--color-muted)]">
                  Admin: admin@autoloc.ma / admin
                </p>
              </motion.form>
            </TabsContent>

            <TabsContent value="register">
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleRegister}
                className="space-y-4 bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Nom complet</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="reg-name"
                      placeholder="Mohamed Alami"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="reg-phone"
                      placeholder="+212 6XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)]">
                  Créer mon compte
                </Button>
              </motion.form>
            </TabsContent>

            <TabsContent value="agent">
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleAgentRegister}
                className="space-y-4 bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-xl p-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Nom complet</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="agent-name"
                      placeholder="Mohamed Alami"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="agent-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="agent-phone"
                      placeholder="+212 6XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-agency">Nom de l'agence</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="agent-agency"
                      placeholder="Agence AutoLoc Casablanca"
                      value={agency}
                      onChange={(e) => setAgency(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <Input
                      id="agent-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent-hover)]">
                  Devenir agent
                </Button>
                <p className="text-xs text-center text-[var(--color-muted)]">
                  Un administrateur examinera votre demande
                </p>
              </motion.form>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { User, UserRole } from "./types"
import { getUserByEmail, createUser, registerAgentServer } from "./actions/users"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  registerAgent: (email: string, password: string, name: string, phone: string, agency: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("autoloc-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("autoloc-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check for admin credentials
    if (email === "admin@autoloc.ma" && password === "admin") {
      const adminUser = await getUserByEmail(email)
      if (adminUser) {
        const userObj: User = {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          phone: adminUser.phone ?? undefined,
          role: adminUser.role as UserRole,
          createdAt: adminUser.createdAt.toISOString(),
          avatar: adminUser.avatar ?? undefined,
        }
        setUser(userObj)
        localStorage.setItem("autoloc-user", JSON.stringify(userObj))
        setIsLoading(false)
        return { success: true }
      }
    }

    // Check database
    const dbUser = await getUserByEmail(email)
    if (dbUser && dbUser.password === password) {
      const userObj: User = {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        phone: dbUser.phone ?? undefined,
        role: dbUser.role as UserRole,
        createdAt: dbUser.createdAt.toISOString(),
        avatar: dbUser.avatar ?? undefined,
      }
      setUser(userObj)
      localStorage.setItem("autoloc-user", JSON.stringify(userObj))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Email ou mot de passe incorrect" }
  }

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check if email already exists in database
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: "Cet email est déjà utilisé" }
    }

    // Check localStorage too
    const existingUsers = JSON.parse(localStorage.getItem("autoloc-registered-users") || "[]")
    if (existingUsers.some((u: any) => u.email === email)) {
      setIsLoading(false)
      return { success: false, error: "Cet email est déjà utilisé" }
    }

    // Create new user in database
    try {
      const newUser = await createUser({
        email,
        name,
        password,
        role: "client",
      })

      const userObj: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone ?? undefined,
        role: newUser.role as UserRole,
        createdAt: newUser.createdAt.toISOString(),
      }
      setUser(userObj)
      localStorage.setItem("autoloc-user", JSON.stringify(userObj))
      
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      // Fallback to localStorage if database fails
      const newUser = {
        id: `u${Date.now()}`,
        email,
        name,
        password,
        role: "client" as UserRole,
        createdAt: new Date().toISOString()
      }

      existingUsers.push(newUser)
      localStorage.setItem("autoloc-registered-users", JSON.stringify(existingUsers))

      const userObj: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
      setUser(userObj)
      localStorage.setItem("autoloc-user", JSON.stringify(userObj))
      
      setIsLoading(false)
      return { success: true }
    }
  }

  const registerAgent = async (email: string, password: string, name: string, phone: string, agency: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    const result = await registerAgentServer({ email, password, name, phone, agency })

    if (result.success && result.userId) {
      const userObj: User = {
        id: result.userId,
        email,
        name,
        phone: phone || undefined,
        role: "client",
        createdAt: new Date().toISOString(),
      }
      setUser(userObj)
      localStorage.setItem("autoloc-user", JSON.stringify(userObj))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: result.error || "Erreur lors de l'inscription" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("autoloc-user")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("autoloc-user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      registerAgent,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

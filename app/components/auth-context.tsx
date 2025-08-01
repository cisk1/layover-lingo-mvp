"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  isPro: boolean
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  upgradeToPro: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("layoverlingo-user")
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser)
        setUser(parsed)
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("layoverlingo-user")
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("layoverlingo-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("layoverlingo-user")
    }
  }, [user])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user_" + Date.now(),
        email,
        name: email.split("@")[0],
        isPro: false,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      setUser(mockUser)
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user_" + Date.now(),
        email,
        name,
        isPro: false,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      setUser(mockUser)
    } catch (error) {
      throw new Error("Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const upgradeToPro = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser({ ...user, isPro: true })
    } catch (error) {
      throw new Error("Upgrade failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, upgradeToPro }}>
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

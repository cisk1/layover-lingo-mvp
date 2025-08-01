"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LanguageContextType {
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState("")

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("locallingo-selected-language")
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage)
    }
  }, [])

  // Save language when it changes
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    if (language) {
      localStorage.setItem("locallingo-selected-language", language)
    } else {
      localStorage.removeItem("locallingo-selected-language")
    }
  }

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

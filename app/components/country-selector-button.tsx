"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { countries, getCountryByCode } from "../data/countries"
import CountryFlag from "./country-flag"
import { useParams, useRouter } from "next/navigation"

export default function CountrySelectorButton() {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const router = useRouter()
  const currentCountryCode = params?.country as string

  const currentCountry = getCountryByCode(currentCountryCode)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDropdown])

  const handleCountryChange = (countryCode: string) => {
    setShowDropdown(false)
    router.push(`/country/${countryCode}`)
  }

  if (!currentCountry) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-transparent hover:bg-[#3c3e41] text-white border-0 flex items-center gap-3 text-xl font-bold"
      >
        <CountryFlag flag={currentCountry.flag} fallback={currentCountry.fallback} size="lg" />
        <span>{currentCountry.name}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
      </Button>

      {showDropdown && (
        <Card className="absolute top-full left-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-64">
          <CardContent className="p-2">
            <div className="space-y-1">
              {countries.map((country) => (
                <Button
                  key={country.code}
                  onClick={() => handleCountryChange(country.code)}
                  variant="ghost"
                  className={`w-full justify-start text-left hover:bg-[#3c3e41] p-3 ${
                    country.code === currentCountryCode ? "bg-[#3c3e41]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CountryFlag flag={country.flag} fallback={country.fallback} size="lg" />
                    <span className="text-white font-medium">{country.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, X } from "lucide-react"
import { countries, getCountryByCode } from "../data/countries"
import CountryFlag from "./country-flag"
import { useRouter } from "next/navigation"

interface CountryHeaderButtonProps {
  currentCountry?: string
  onCountryChange?: (country: string) => void
  showClearOption?: boolean
}

export default function CountryHeaderButton({
  currentCountry,
  onCountryChange,
  showClearOption = false,
}: CountryHeaderButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const country = currentCountry ? getCountryByCode(currentCountry) : null

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
    if (onCountryChange) {
      onCountryChange(countryCode)
    } else {
      router.push(`/country/${countryCode}`)
    }
  }

  const handleClearSelection = () => {
    setShowDropdown(false)
    if (onCountryChange) {
      onCountryChange("")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-transparent hover:bg-[#3c3e41] text-white border-0 flex items-center gap-3 text-xl font-bold"
      >
        {country ? (
          <>
            <CountryFlag flag={country.flag} fallback={country.fallback} size="lg" />
            <span>{country.name}</span>
          </>
        ) : (
          <span>All Countries</span>
        )}
        <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
      </Button>

      {showDropdown && (
        <Card className="absolute top-full left-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-64">
          <CardContent className="p-2">
            <div className="space-y-1">
              {showClearOption && (
                <>
                  <Button
                    onClick={handleClearSelection}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-[#3c3e41] text-gray-400"
                  >
                    <div className="flex items-center gap-3">
                      <X className="w-5 h-5" />
                      <span>All Countries</span>
                    </div>
                  </Button>
                  <div className="border-t border-[#3c3e41] my-1" />
                </>
              )}

              {countries.map((countryOption) => (
                <Button
                  key={countryOption.code}
                  onClick={() => handleCountryChange(countryOption.code)}
                  variant="ghost"
                  className={`w-full justify-start text-left hover:bg-[#3c3e41] p-3 ${
                    countryOption.code === currentCountry ? "bg-[#3c3e41]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CountryFlag flag={countryOption.flag} fallback={countryOption.fallback} size="lg" />
                    <span className="text-white font-medium">{countryOption.name}</span>
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

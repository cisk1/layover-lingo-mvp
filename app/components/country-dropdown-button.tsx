"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, X } from "lucide-react"
import { countries, getCountryByCode } from "../data/countries"
import CountryFlag from "./country-flag"

interface CountryDropdownButtonProps {
  value: string
  onChange: (value: string) => void
}

export default function CountryDropdownButton({ value, onChange }: CountryDropdownButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedCountry = getCountryByCode(value)

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
    onChange(countryCode)
    setShowDropdown(false)
  }

  const clearSelection = () => {
    onChange("")
    setShowDropdown(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-[#2c2e31] hover:bg-[#35373a] text-white border-0 rounded-full px-6 py-3 flex items-center gap-3 shadow-lg transition-all duration-200"
      >
        {selectedCountry ? (
          <>
            <CountryFlag flag={selectedCountry.flag} fallback={selectedCountry.fallback} size="md" />
            <span className="font-medium">{selectedCountry.name}</span>
          </>
        ) : (
          <span className="font-medium">Select a country</span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
      </Button>

      {showDropdown && (
        <Card className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-48">
          <CardContent className="p-2">
            <div className="space-y-1">
              {value && (
                <>
                  <Button
                    onClick={clearSelection}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-[#3c3e41] text-gray-400"
                  >
                    <div className="flex items-center gap-3">
                      <X className="w-4 h-4" />
                      <span>Clear selection</span>
                    </div>
                  </Button>
                  <div className="border-t border-[#3c3e41] my-1" />
                </>
              )}

              {countries.map((country) => (
                <Button
                  key={country.code}
                  onClick={() => handleCountryChange(country.code)}
                  variant="ghost"
                  className={`w-full justify-start text-left hover:bg-[#3c3e41] ${
                    country.code === value ? "bg-[#3c3e41]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CountryFlag flag={country.flag} fallback={country.fallback} size="md" />
                    <span className="text-white">{country.name}</span>
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

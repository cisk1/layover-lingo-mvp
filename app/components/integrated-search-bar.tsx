"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, ArrowRight, ChevronDown, Settings } from "lucide-react"
import { getAllPhrases } from "../data/phrase-packs"
import { countries, getCountryByCode } from "../data/countries"
import CountryFlag from "./country-flag"
import Link from "next/link"

interface SearchResult {
  id: string
  phrase: string
  translation: string
  language: string
  packName: string
  packId: string
}

interface IntegratedSearchBarProps {
  placeholder?: string
  onResultClick?: (result: SearchResult) => void
  className?: string
  selectedCountry: string
  onCountryChange: (country: string) => void
}

export default function IntegratedSearchBar({
  placeholder = "Search phrases and cultural tips...",
  onResultClick,
  className = "",
  selectedCountry,
  onCountryChange,
}: IntegratedSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const countryRef = useRef<HTMLDivElement>(null)

  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([])
      setShowResults(false)
      return
    }

    const allPhrases = getAllPhrases()
    const filteredResults = allPhrases
      .filter((phrase) => {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          phrase.phrase.toLowerCase().includes(query) ||
          phrase.translation.toLowerCase().includes(query) ||
          phrase.romanization.toLowerCase().includes(query) ||
          phrase.context.toLowerCase().includes(query) ||
          phrase.culturalNote.toLowerCase().includes(query)

        // Filter by selected country if one is chosen
        const matchesCountry = !selectedCountry || phrase.country === selectedCountryData?.name

        return matchesSearch && matchesCountry
      })
      .slice(0, 8) // Limit to 8 results

    setResults(filteredResults as SearchResult[])
    setShowResults(true)
  }, [searchQuery, selectedCountry, selectedCountryData?.name])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
        setIsSearchFocused(false)
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false)
    setSearchQuery("")
    setIsSearchFocused(false)
    if (onResultClick) {
      onResultClick(result)
    }
  }

  const handleCountrySelect = (countryCode: string) => {
    onCountryChange(countryCode)
    setShowCountryDropdown(false)
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
    if (searchQuery) {
      setShowResults(true)
    }
  }

  const handleAdvancedSearch = () => {
    // Navigate to the advanced search page
    window.location.href = "/country/all/category/all"
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case "spanish":
        return "bg-yellow-500"
      case "chinese":
        return "bg-red-500"
      case "japanese":
        return "bg-pink-500"
      case "french":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const shouldShowAdvancedSearch = isSearchFocused || showResults

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative flex">
        {/* Country Selector - Left Side */}
        <div ref={countryRef} className="relative">
          <Button
            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            className="bg-[#2c2e31] hover:bg-[#35373a] text-white border-0 rounded-l-full px-4 h-[60px] flex items-center gap-2 border-r border-[#3c3e41]"
          >
            {selectedCountryData ? (
              <>
                <CountryFlag flag={selectedCountryData.flag} fallback={selectedCountryData.fallback} size="sm" />
                <span className="hidden sm:inline text-sm">{selectedCountryData.name}</span>
              </>
            ) : (
              <span className="text-sm text-gray-400">All Countries</span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showCountryDropdown ? "rotate-180" : ""}`} />
          </Button>

          {/* Country Dropdown */}
          {showCountryDropdown && (
            <Card className="absolute top-full left-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-48 max-h-64 overflow-y-auto">
              <CardContent className="p-2">
                <div className="space-y-1">
                  <Button
                    onClick={() => handleCountrySelect("")}
                    variant="ghost"
                    className={`w-full justify-start text-left hover:bg-[#3c3e41] ${
                      !selectedCountry ? "bg-[#3c3e41]" : ""
                    }`}
                  >
                    <span className="text-white">All Countries</span>
                  </Button>
                  <div className="border-t border-[#3c3e41] my-1" />
                  {countries.map((country) => (
                    <Button
                      key={country.code}
                      onClick={() => handleCountrySelect(country.code)}
                      variant="ghost"
                      className={`w-full justify-start text-left hover:bg-[#3c3e41] ${
                        country.code === selectedCountry ? "bg-[#3c3e41]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CountryFlag flag={country.flag} fallback={country.fallback} size="sm" />
                        <span className="text-white">{country.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search Input - Right Side */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            className="pl-12 pr-12 h-[60px] text-lg bg-[#2c2e31] border-0 focus:ring-2 focus:ring-[#e2b714] rounded-r-full rounded-l-none text-white placeholder-gray-400 hover:bg-[#35373a] transition-colors"
          />
          {searchQuery && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 bg-[#e2b714] rounded-full flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-[#323437]" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results and Advanced Search */}
      {shouldShowAdvancedSearch && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-lg z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {/* Search Results */}
            {results.length === 0 && searchQuery ? (
              <div className="p-4 text-center text-gray-400">
                {selectedCountryData ? `No matches found in ${selectedCountryData.name}` : "No matches found"}
              </div>
            ) : searchQuery ? (
              <div className="divide-y divide-[#3c3e41]">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={`/phrase-pack/${result.packId}`}
                    onClick={() => handleResultClick(result)}
                    className="block p-4 hover:bg-[#3c3e41] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[#e2b714] font-medium">{result.phrase}</span>
                          <Badge className={`${getLanguageColor(result.language)} text-white text-xs px-2 py-0`}>
                            {result.language}
                          </Badge>
                        </div>
                        <div className="text-white text-sm mb-1">{result.translation}</div>
                        <div className="text-gray-400 text-xs">in {result.packName}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}

            {/* Advanced Search Option */}
            <div className="border-t border-[#3c3e41]">
              <Button
                onClick={handleAdvancedSearch}
                variant="ghost"
                className="w-full justify-start text-left hover:bg-[#3c3e41] p-4 text-[#e2b714]"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  <span>Advanced Search</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

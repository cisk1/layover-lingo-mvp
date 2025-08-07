"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, Settings } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import CountryDropdownButton from "./country-dropdown-button"
import CountryFlag from "./country-flag"
import { getAllPhrases } from "../data/phrase-packs"
import { getCountryByCode } from "../data/countries"
import Link from "next/link"

interface SearchResult {
  id: string
  phrase: string
  translation: string
  language: string
  packName: string
  packId: string
  country?: string
  romanization?: string
  context?: string
  culturalNote?: string
}

interface CombinedCountrySearchProps {
  selectedCountry?: string
  onCountryChange?: (country: string) => void
  className?: string
}

export default function CombinedCountrySearch({
  selectedCountry = "",
  onCountryChange = () => {},
  className = "",
}: CombinedCountrySearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [hasSelected, setHasSelected] = useState(!!selectedCountry)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null
  const allPhrases = useMemo(() => getAllPhrases(), [])

  // When country selection first happens, morph to search and focus input
  useEffect(() => {
    if (selectedCountry && !hasSelected) {
      setHasSelected(true)
      const t = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(t)
    }
  }, [selectedCountry, hasSelected])

  // Filter results when query changes
  useEffect(() => {
    if (!hasSelected) {
      setQuery("")
      setResults([])
      setShowResults(false)
      return
    }
    if (query.trim() === "") {
      setResults([])
      setShowResults(false)
      return
    }
    const filtered = allPhrases
      .filter((p: any) => {
        const q = query.toLowerCase()
        const matchesSearch =
          p.phrase.toLowerCase().includes(q) ||
          p.translation.toLowerCase().includes(q) ||
          (p.romanization?.toLowerCase?.().includes(q) ?? false) ||
          (p.context?.toLowerCase?.().includes(q) ?? false) ||
          (p.culturalNote?.toLowerCase?.().includes(q) ?? false)

        const matchesCountry = !selectedCountryData || p.country === selectedCountryData.name
        return matchesSearch && matchesCountry
      })
      .slice(0, 8)

    setResults(filtered as SearchResult[])
    setShowResults(true)
  }, [query, selectedCountryData, allPhrases, hasSelected])

  // Close popovers when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  // Keyboard shortcut to focus search after selected
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!hasSelected) return
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [hasSelected])

  const handleAdvancedSearch = () => {
    const target = selectedCountry ? selectedCountry : "all"
    router.push(`/country/${target}/category/all`)
  }

  const handleCountryNav = () => {
    if (!selectedCountry) return
    router.push(`/country/${selectedCountry}/category/all`)
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

  return (
    <div ref={containerRef} className={className}>
      <motion.div layout className="w-full max-w-3xl mx-auto">
        <AnimatePresence initial={false} mode="popLayout">
          {!hasSelected ? (
            <motion.div
              key="selector-only"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              <div className="rounded-xl bg-[#2c2e31]/80 backdrop-blur px-4 py-4 border border-[#3c3e41]">
                <p className="text-sm text-gray-300 text-center mb-3">Start by selecting a country</p>
                <div className="flex justify-center">
                  <CountryDropdownButton
                    value={selectedCountry}
                    onChange={onCountryChange}
                    buttonClassName="h-[60px]"
                  />
                </div>
              </div>
              <div className="mt-2 text-center text-xs text-gray-400">
                Tip: Press {'/'} to search after selecting a country
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search-mode"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              <div className="relative flex items-center gap-2">
                {/* Country nav button: clicking redirects to the country page */}
                <Button
                  type="button"
                  onClick={handleCountryNav}
                  className="bg-[#2c2e31] hover:bg-[#35373a] text-white border border-[#3c3e41] border-r-0 rounded-l-full h-[60px] px-4 flex items-center gap-2"
                  aria-label={selectedCountryData ? `Go to ${selectedCountryData.name} page` : "Go to country page"}
                >
                  {selectedCountryData && (
                    <>
                      <CountryFlag flag={selectedCountryData.flag} fallback={selectedCountryData.fallback} size="sm" />
                      <span className="hidden sm:inline text-sm">{selectedCountryData.name}</span>
                    </>
                  )}
                </Button>

                {/* Search input maintains the selected styling */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search phrases and cultural tips..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query && setShowResults(true)}
                    className="pl-12 pr-12 h-[60px] text-lg bg-[#2c2e31] border-0 focus:ring-2 focus:ring-[#e2b714] rounded-r-full rounded-l-none text-white placeholder-gray-400 hover:bg-[#35373a] transition-colors"
                    aria-label="Search phrases"
                  />
                  {query && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 bg-[#e2b714] rounded-full flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-[#323437]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Popover under the bar */}
              {hasSelected && query && (
                <Card className="mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-lg z-50 max-h-96 overflow-y-auto">
                  <CardContent className="p-0">
                    {results.length === 0 ? (
                      <div className="p-4 text-center text-gray-400">
                        {selectedCountryData ? `No matches found in ${selectedCountryData.name}` : "No matches found"}
                      </div>
                    ) : (
                      <div className="divide-y divide-[#3c3e41]">
                        {results.map((result) => (
                          <Link
                            key={result.id}
                            href={`/phrase-pack/${result.packId}`}
                            onClick={() => {
                              setShowResults(false)
                              setQuery("")
                            }}
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
                    )}

                    {/* Advanced Search */}
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

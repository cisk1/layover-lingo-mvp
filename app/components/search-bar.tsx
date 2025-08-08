"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, Sparkles } from "lucide-react"
import { getAllPhrases } from "../data/phrase-packs"
import { performIntentAwareSearch, getSearchSuggestions, type SearchResult as IntentSearchResult } from "../lib/search-utils"
import Link from "next/link"

interface SearchResult {
  id: string
  phrase: string
  translation: string
  language: string
  packName: string
  packId: string
  relevanceScore?: number
  matchType?: 'exact' | 'semantic' | 'contextual' | 'cultural'
}

interface SearchBarProps {
  placeholder?: string
  onResultClick?: (result: SearchResult) => void
  className?: string
  selectedLanguage?: string
}

export default function SearchBar({
  placeholder = "Search any phrase or topic",
  onResultClick,
  className = "",
  selectedLanguage = "",
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([])
      setShowResults(false)
      return
    }

    const allPhrases = getAllPhrases()
    
    // Use intent-aware search
    const intentResults = performIntentAwareSearch(searchQuery, allPhrases)
    
    // Filter by selected language if one is chosen
    const filteredResults = intentResults
      .filter((result) => !selectedLanguage || result.content.language === selectedLanguage)
      .slice(0, 8) // Limit to 8 results
      .map((result) => ({
        id: result.content.id,
        phrase: result.content.phrase,
        translation: result.content.translation,
        language: result.content.language,
        packName: result.content.packName || '',
        packId: result.content.packId || '',
        relevanceScore: result.relevanceScore,
        matchType: result.matchType
      }))

    setResults(filteredResults as SearchResult[])
    setShowResults(true)
  }, [searchQuery, selectedLanguage])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false)
    setSearchQuery("")
    if (onResultClick) {
      onResultClick(result)
    }
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

  const getMatchTypeColor = (matchType?: string) => {
    switch (matchType) {
      case "exact":
        return "text-green-400"
      case "semantic":
        return "text-blue-400"
      case "contextual":
        return "text-yellow-400"
      case "cultural":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  const getMatchTypeIcon = (matchType?: string) => {
    switch (matchType) {
      case "exact":
        return "🎯"
      case "semantic":
        return "💡"
      case "contextual":
        return "🔗"
      case "cultural":
        return "🌍"
      default:
        return "🔍"
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        {searchQuery && (
          <Sparkles className="absolute left-10 top-1/2 transform -translate-y-1/2 text-[#e2b714] w-4 h-4" />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowResults(true)}
          className={`pl-12 pr-12 py-4 text-lg bg-[#2c2e31] border-0 focus:ring-2 focus:ring-[#e2b714] rounded-full text-white placeholder-gray-400 hover:bg-[#35373a] transition-colors ${searchQuery ? 'pl-16' : 'pl-12'}`}
        />
        {searchQuery && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 bg-[#e2b714] rounded-full flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-[#323437]" />
            </div>
          </div>
        )}
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-lg z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {results.length === 0 ? (
              <div className="p-4 text-center text-gray-400">No matches found</div>
            ) : (
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
                          {result.matchType && (
                            <span className={`text-xs ${getMatchTypeColor(result.matchType)}`}>
                              {getMatchTypeIcon(result.matchType)}
                            </span>
                          )}
                        </div>
                        <div className="text-white text-sm mb-1">{result.translation}</div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-400 text-xs">in {result.packName}</div>
                          {result.relevanceScore && (
                            <div className="text-xs text-gray-500">
                              {Math.round(result.relevanceScore)}% match
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

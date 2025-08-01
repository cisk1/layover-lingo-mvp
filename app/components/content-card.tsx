"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Bookmark, BookmarkCheck, Volume2, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { categories } from "../data/categories"
import CountryFlag from "./country-flag"
import { getCountryByCode } from "../data/countries"

interface ContentItem {
  id: string
  type: "phrase" | "etiquette"
  // Phrase fields
  phrase?: string
  romanization?: string
  translation?: string
  language?: string
  context?: string
  // Etiquette fields
  title?: string
  summary?: string
  detail?: string
  category?: string
  // Common fields
  culturalNote?: string
  country: string
  importance: "low" | "medium" | "high"
  categories: string[]
}

interface ContentCardProps {
  content: ContentItem
  isBookmarked: boolean
  onBookmark: () => void
}

export default function ContentCard({ content, isBookmarked, onBookmark }: ContentCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const playAudio = async () => {
    if (content.type === "phrase") {
      setIsPlaying(true)
      setTimeout(() => setIsPlaying(false), 2000)
      console.log(`Playing audio for: ${content.phrase}`)
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case "low":
        return <CheckCircle className="w-4 h-4" />
      case "medium":
        return <Info className="w-4 h-4" />
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds
      .map((id) => categories.find((cat) => cat.id === id)?.name)
      .filter(Boolean)
      .join(", ")
  }

  return (
    <div className="perspective-1000">
      <Card
        className={`bg-[#2c2e31] border-0 hover:shadow-lg transition-all duration-500 cursor-pointer relative h-64 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <CardContent
          className={`absolute inset-0 p-4 flex flex-col justify-between backface-hidden ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          <div>
            <div className="flex justify-between items-start mb-3">
              <Badge className={`${getImportanceColor(content.importance)} text-white text-xs flex items-center gap-1`}>
                {getImportanceIcon(content.importance)}
                {content.importance}
              </Badge>
              <div className="flex items-center">
                <CountryFlag
                  flag={getCountryByCode(content.country.toLowerCase().replace(/\s+/g, "-"))?.flag || "🌍"}
                  fallback={
                    getCountryByCode(content.country.toLowerCase().replace(/\s+/g, "-"))?.fallback ||
                    content.country.slice(0, 2).toUpperCase()
                  }
                  size="md"
                />
              </div>
            </div>

            <div className="text-center mb-3">
              {content.type === "phrase" ? (
                <>
                  <div className="text-xl font-bold text-[#e2b714] mb-2">{content.phrase}</div>
                  <div className="text-xs text-gray-300 mb-2">{content.romanization}</div>
                  <div className="text-sm text-white mb-2">{content.translation}</div>
                </>
              ) : (
                <>
                  <div className="text-lg font-bold text-[#e2b714] mb-2">{content.title}</div>
                  <div className="text-xs text-white leading-relaxed">{content.summary}</div>
                </>
              )}
            </div>

            <div className="text-xs text-gray-400 text-center">Categories: {getCategoryNames(content.categories)}</div>
          </div>

          <div className="flex justify-between items-center">
            {content.type === "phrase" && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  playAudio()
                }}
                disabled={isPlaying}
                className="bg-[#3c3e41] hover:bg-[#4a4c4f] text-white border-0 flex items-center gap-1 text-xs px-2 py-1"
              >
                {isPlaying ? <Volume2 className="w-3 h-3 animate-pulse" /> : <Play className="w-3 h-3" />}
                {isPlaying ? "Playing..." : "Listen"}
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onBookmark()
              }}
              className={`text-white hover:bg-[#3c3e41] p-1 ${content.type === "etiquette" ? "ml-auto" : ""}`}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-[#e2b714]" /> : <Bookmark className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>

        {/* Back of card */}
        <CardContent
          className={`absolute inset-0 p-4 flex flex-col justify-center backface-hidden rotate-y-180 bg-[#e2b714] text-[#323437] ${
            isFlipped ? "" : "rotate-y-180"
          }`}
        >
          <div className="text-center">
            <h4 className="font-bold mb-3 text-sm uppercase tracking-wide">Cultural Insight</h4>
            <p className="text-xs leading-relaxed text-white mb-3">{content.culturalNote || content.detail}</p>
            <div className="text-xs opacity-75">Tap again to flip back</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

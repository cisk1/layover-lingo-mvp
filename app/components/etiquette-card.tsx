"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck, AlertTriangle, Info, CheckCircle } from "lucide-react"
import CountryFlag from "./country-flag"
import { getCountryByCode } from "../data/countries"

interface EtiquetteTip {
  id: string
  title: string
  summary: string
  detail: string
  country: string
  severity: "low" | "medium" | "high"
  category: string
}

interface EtiquetteCardProps {
  tip: EtiquetteTip
  isBookmarked: boolean
  onBookmark: () => void
}

export default function EtiquetteCard({ tip, isBookmarked, onBookmark }: EtiquetteCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
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

  return (
    <div className="perspective-1000">
      <Card
        className={`bg-[#2c2e31] border-0 hover:shadow-lg transition-all duration-500 cursor-pointer relative h-72 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <CardContent
          className={`absolute inset-0 p-6 flex flex-col justify-between backface-hidden ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <Badge className={`${getSeverityColor(tip.severity)} text-white text-xs flex items-center gap-1`}>
                {getSeverityIcon(tip.severity)}
                {tip.severity}
              </Badge>
              <div className="flex items-center">
                <CountryFlag
                  flag={getCountryByCode(tip.country.toLowerCase().replace(/\s+/g, "-"))?.flag || "🌍"}
                  fallback={
                    getCountryByCode(tip.country.toLowerCase().replace(/\s+/g, "-"))?.fallback ||
                    tip.country.slice(0, 2).toUpperCase()
                  }
                  size="md"
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#e2b714] mb-3">{tip.title}</h3>
              <p className="text-white text-sm leading-relaxed">{tip.summary}</p>
            </div>

            <div className="text-xs text-gray-400 capitalize">Category: {tip.category.replace("-", " ")}</div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onBookmark()
              }}
              className="text-white hover:bg-[#3c3e41]"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-[#e2b714]" /> : <Bookmark className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>

        {/* Back of card */}
        <CardContent
          className={`absolute inset-0 p-6 flex flex-col justify-center backface-hidden rotate-y-180 bg-[#e2b714] text-[#323437] ${
            isFlipped ? "" : "rotate-y-180"
          }`}
        >
          <div className="text-center">
            <h4 className="font-bold mb-4 text-lg uppercase tracking-wide">Cultural Context</h4>
            <p className="text-sm leading-relaxed text-white mb-4">{tip.detail}</p>
            <div className="text-xs opacity-75">Tap again to flip back</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

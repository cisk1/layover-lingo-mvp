"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Bookmark, BookmarkCheck, Volume2 } from "lucide-react"

interface Phrase {
  id: string
  phrase: string
  romanization: string
  translation: string
  culturalNote: string
  language: string
  difficulty: "beginner" | "intermediate" | "advanced"
  context: string
}

interface PhraseCardProps {
  phrase: Phrase
  isBookmarked: boolean
  onBookmark: () => void
}

export default function PhraseCardDetailed({ phrase, isBookmarked, onBookmark }: PhraseCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const playAudio = async () => {
    setIsPlaying(true)
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 2000)
    console.log(`Playing audio for: ${phrase.phrase}`)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-yellow-500"
      case "advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
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

  return (
    <div className="perspective-1000">
      <Card
        className={`bg-[#2c2e31] border-0 hover:shadow-lg transition-all duration-500 cursor-pointer relative h-80 transform-style-preserve-3d ${
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
              <Badge className={`${getDifficultyColor(phrase.difficulty)} text-white text-xs`}>
                {phrase.difficulty}
              </Badge>
              <Badge className={`${getLanguageColor(phrase.language)} text-white text-xs`}>{phrase.language}</Badge>
            </div>

            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-[#e2b714] mb-2">{phrase.phrase}</div>
              <div className="text-sm text-gray-300 mb-3">{phrase.romanization}</div>
              <div className="text-lg text-white mb-3">{phrase.translation}</div>
            </div>

            <div className="text-xs text-gray-400 text-center mb-4">Context: {phrase.context}</div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                playAudio()
              }}
              disabled={isPlaying}
              className="bg-[#3c3e41] hover:bg-[#4a4c4f] text-white border-0 flex items-center gap-2"
            >
              {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4" />}
              {isPlaying ? "Playing..." : "Listen"}
            </Button>

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
            <h4 className="font-bold mb-4 text-lg uppercase tracking-wide">Cultural Insight</h4>
            <p className="text-sm leading-relaxed text-white mb-4">{phrase.culturalNote}</p>
            <div className="text-xs opacity-75">Tap again to flip back</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

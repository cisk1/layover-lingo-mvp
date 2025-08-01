"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Bookmark, BookmarkCheck, Plus } from "lucide-react"

interface PhraseCardProps {
  id: string
  phrase: string
  romanization: string
  translation: string
  culturalNote: string
  isBookmarked: boolean
  onBookmark: () => void
  quizEnabled: boolean
}

export default function PhraseCard({
  id,
  phrase,
  romanization,
  translation,
  culturalNote,
  isBookmarked,
  onBookmark,
  quizEnabled,
}: PhraseCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const playAudio = () => {
    // Simulate audio playback
    console.log(`Playing audio for: ${phrase}`)
  }

  return (
    <div className="perspective-1000">
      <Card
        className={`bg-[#2c2e31] border-[#3c3e41] hover:shadow-lg transition-shadow cursor-pointer relative h-56  transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <CardContent
          className={`absolute inset-0 p-6 flex flex-col justify-center items-center backface-hidden ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          <div className="text-3xl font-bold text-[#e2b714] mb-2 text-center">{phrase}</div>
          <div className="text-sm text-gray-300 mb-4 text-center">{romanization}</div>
          <div className="text-lg text-gray-300 mb-4 text-center">{translation}</div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              playAudio()
            }}
            className="bg-[#3c3e41] hover:bg-[#4a4c4f] text-white border border-[#5f6368] flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Play
          </Button>
        </CardContent>

        {/* Back of card */}
        <CardContent
          className={`absolute inset-0 p-6 flex flex-col justify-between backface-hidden rotate-y-180 bg-[#e2b714] text-[#323437] ${
            isFlipped ? "" : "rotate-y-180"
          }`}
        >
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">Cultural Tidbit</h4>
            <p className="text-sm leading-relaxed text-white">{culturalNote}</p>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onBookmark()
              }}
              className="text-[#323437] hover:bg-white/20"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </Button>

            {quizEnabled && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  console.log(`Added ${phrase} to quiz`)
                }}
                className="text-[#323437] hover:bg-white/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add to Quiz
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

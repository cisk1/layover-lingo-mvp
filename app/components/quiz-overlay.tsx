"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Play, Pause } from "lucide-react"

interface QuizOverlayProps {
  phrases: string[]
  onClose: () => void
}

export default function QuizOverlay({ phrases, onClose }: QuizOverlayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [timeLeft, setTimeLeft] = useState(10)

  // Sample quiz data - in real app this would come from props/API
  const quizPhrases = [
    { phrase: "谢谢", translation: "Thank you", romanization: "xiè xie" },
    { phrase: "¿Cuánto sale?", translation: "How much?", romanization: "KWAN-toh SAH-leh" },
    { phrase: "Bonjour", translation: "Hello", romanization: "bon-ZHOOR" },
  ]

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCurrentIndex((current) => (current + 1) % Math.min(5, quizPhrases.length))
          return 10
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, quizPhrases.length])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-[#2c2e31] border-[#3c3e41]">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#e2b714]">Quiz Mode</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {Array.from({ length: Math.min(5, quizPhrases.length) }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-[#e2b714]" : "bg-[#3c3e41]"}`}
              />
            ))}
          </div>

          {/* Current phrase */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-white mb-4">{quizPhrases[currentIndex]?.phrase}</div>
            <div className="text-lg text-gray-300 mb-2">{quizPhrases[currentIndex]?.romanization}</div>
            <div className="text-xl text-gray-300">{quizPhrases[currentIndex]?.translation}</div>
          </div>

          {/* Timer and controls */}
          <div className="flex justify-center items-center space-x-4">
            <div className="text-lg font-semibold text-white">{timeLeft}s</div>
            <Button variant="outline" onClick={togglePlayPause} className="flex items-center gap-2 bg-transparent">
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

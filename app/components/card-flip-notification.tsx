"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, X } from "lucide-react"

export default function CardFlipNotification() {
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    // Check if user has seen the notification before
    const hasSeenNotification = localStorage.getItem("locallingo-card-flip-notification")

    if (!hasSeenNotification) {
      // Show notification after a short delay
      const timer = setTimeout(() => {
        setShowNotification(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setShowNotification(false)
    localStorage.setItem("locallingo-card-flip-notification", "true")
  }

  if (!showNotification) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Card className="bg-[#e2b714] border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <RotateCcw className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white text-sm mb-1">💡 Pro Tip</h4>
              <p className="text-white text-sm leading-relaxed">
                Click any phrase card to flip it over and discover cultural insights!
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="flex-shrink-0 text-white hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

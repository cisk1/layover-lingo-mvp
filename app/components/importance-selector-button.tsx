"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, AlertTriangle, Info, CheckCircle } from "lucide-react"

const importanceLevels = [
  { id: "high", name: "High", icon: AlertTriangle, color: "bg-red-500" },
  { id: "medium", name: "Medium", icon: Info, color: "bg-yellow-500" },
  { id: "low", name: "Low", icon: CheckCircle, color: "bg-green-500" },
]

interface ImportanceSelectorButtonProps {
  value: string
  onChange: (value: string) => void
}

export default function ImportanceSelectorButton({ value, onChange }: ImportanceSelectorButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedLevel = importanceLevels.find((level) => level.id === value)

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

  const handleLevelChange = (levelId: string) => {
    onChange(levelId)
    setShowDropdown(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${
          selectedLevel
            ? `${selectedLevel.color} hover:opacity-90 text-white`
            : "bg-[#3c3e41] hover:bg-[#4a4c4f] text-white"
        } border-0 flex items-center gap-2 min-w-32`}
      >
        {selectedLevel ? (
          <>
            <selectedLevel.icon className="w-4 h-4" />
            <span>{selectedLevel.name}</span>
          </>
        ) : (
          <span>All Levels</span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${showDropdown ? "rotate-180" : ""}`} />
      </Button>

      {showDropdown && (
        <Card className="absolute top-full right-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-48">
          <CardContent className="p-2">
            <div className="space-y-1">
              <Button
                onClick={() => handleLevelChange("all")}
                variant="ghost"
                className={`w-full justify-start text-left hover:bg-[#3c3e41] p-3 ${
                  value === "all" ? "bg-[#3c3e41]" : ""
                }`}
              >
                <span className="text-white">All Levels</span>
              </Button>

              <div className="border-t border-[#3c3e41] my-1" />

              {importanceLevels.map((level) => (
                <Button
                  key={level.id}
                  onClick={() => handleLevelChange(level.id)}
                  variant="ghost"
                  className={`w-full justify-start text-left hover:bg-[#3c3e41] p-3 ${
                    level.id === value ? "bg-[#3c3e41]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 ${level.color} rounded-full flex items-center justify-center`}>
                      <level.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{level.name}</span>
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

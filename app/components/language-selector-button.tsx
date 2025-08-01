"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, X } from "lucide-react"
import { useLanguage } from "./language-context"

const languages = [
  { code: "spanish", name: "Spanish" },
  { code: "chinese", name: "Chinese" },
  { code: "japanese", name: "Japanese" },
  { code: "french", name: "French" },
  { code: "italian", name: "Italian" },
  { code: "german", name: "German" },
  { code: "portuguese", name: "Portuguese" },
  { code: "korean", name: "Korean" },
  { code: "hindi", name: "Hindi" },
  { code: "thai", name: "Thai" },
]

export default function LanguageSelectorButton() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    setShowDropdown(false)
  }

  const clearLanguage = () => {
    setSelectedLanguage("")
    setShowDropdown(false)
  }

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

  if (!selectedLanguage) {
    return (
      <div className="relative" ref={dropdownRef}>
        <Button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-[#2c2e31] hover:bg-[#35373a] text-white border-0 rounded-full px-6 py-3 flex items-center gap-2 shadow-lg transition-all duration-200"
        >
          <span className="font-medium">Select a language</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
        </Button>

        {showDropdown && (
          <Card className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-48">
            <CardContent className="p-2">
              <div className="space-y-1">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-[#3c3e41]"
                  >
                    <span className="text-white">{lang.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage)
  if (!currentLanguage) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-[#2c2e31] hover:bg-[#35373a] text-white border-0 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition-all duration-200"
      >
        <span className="font-medium">{currentLanguage.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
      </Button>

      {showDropdown && (
        <Card className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-48">
          <CardContent className="p-2">
            <div className="space-y-1">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  variant="ghost"
                  className={`w-full justify-start text-left hover:bg-[#3c3e41] ${
                    lang.code === selectedLanguage ? "bg-[#3c3e41]" : ""
                  }`}
                >
                  <span className="text-white">{lang.name}</span>
                </Button>
              ))}

              <div className="border-t border-[#3c3e41] my-1" />

              <Button
                onClick={clearLanguage}
                variant="ghost"
                className="w-full justify-start text-left hover:bg-[#3c3e41] text-gray-400"
              >
                <div className="flex items-center gap-3">
                  <X className="w-3 h-3" />
                  <span>Clear selection</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

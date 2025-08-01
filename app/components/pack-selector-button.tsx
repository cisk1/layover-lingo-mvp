"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Backpack, Hand, DollarSign, AlertTriangle, X } from "lucide-react"
import { categories } from "../data/content"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function PackSelectorButton() {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const router = useRouter()
  const currentPackId = params?.id as string

  // Find the current pack data
  const currentPack = categories.find((cat) => cat.id === currentPackId)

  const IconComponent = currentPack
    ? {
        Backpack,
        Hand,
        DollarSign,
        AlertTriangle,
      }[currentPack.icon] || Backpack
    : Backpack

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

  const clearSelection = () => {
    setShowDropdown(false)
    router.push("/")
  }

  if (!currentPack) {
    return (
      <div className="relative" ref={dropdownRef}>
        <Button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-[#2c2e31] hover:bg-[#35373a] text-white border-0 rounded-full px-6 py-3 flex items-center gap-2 shadow-lg transition-all duration-200"
        >
          <span className="font-medium">Choose Pack</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
        </Button>

        {showDropdown && (
          <Card className="absolute top-full right-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-64">
            <CardContent className="p-2">
              <div className="space-y-1">
                {categories.map((category) => {
                  const IconComponent =
                    {
                      Backpack,
                      Hand,
                      DollarSign,
                      AlertTriangle,
                    }[category.icon] || Backpack

                  return (
                    <Link key={category.id} href={`/phrase-pack/${category.id}`}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left hover:bg-[#3c3e41] p-3"
                        onClick={() => setShowDropdown(false)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#e2b714] rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-4 h-4 text-[#323437]" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{category.name}</div>
                            <div className="text-gray-400 text-xs">{category.description}</div>
                          </div>
                        </div>
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-[#2c2e31] hover:bg-[#35373a] text-white border-0 rounded-full px-4 py-3 flex items-center gap-2 shadow-lg transition-all duration-200"
      >
        <div className="w-5 h-5 bg-[#e2b714] rounded-full flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-3 h-3 text-[#323437]" />
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
      </Button>

      {showDropdown && (
        <Card className="absolute top-full right-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-64">
          <CardContent className="p-2">
            <div className="space-y-1">
              {categories.map((category) => {
                const IconComponent =
                  {
                    Backpack,
                    Hand,
                    DollarSign,
                    AlertTriangle,
                  }[category.icon] || Backpack

                return (
                  <Link key={category.id} href={`/phrase-pack/${category.id}`}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left hover:bg-[#3c3e41] p-3 ${
                        category.id === currentPackId ? "bg-[#3c3e41]" : ""
                      }`}
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#e2b714] rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-[#323437]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{category.name}</div>
                          <div className="text-gray-400 text-xs">{category.description}</div>
                        </div>
                      </div>
                    </Button>
                  </Link>
                )
              })}

              <div className="border-t border-[#3c3e41] my-1" />

              <Button
                onClick={clearSelection}
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Users, Utensils, MapPin, Gift } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const etiquetteCategories = [
  {
    id: "dining",
    name: "Dining Etiquette",
    icon: "Utensils",
    description: "table manners, tipping customs",
  },
  {
    id: "social",
    name: "Social Customs",
    icon: "Users",
    description: "greetings, personal space, gestures",
  },
  {
    id: "business",
    name: "Business Protocol",
    icon: "MapPin",
    description: "meetings, cards, punctuality",
  },
  {
    id: "gift-giving",
    name: "Gift Giving",
    icon: "Gift",
    description: "occasions, taboos, wrapping",
  },
]

export default function EtiquettePackSelectorButton() {
  const [showDropdown, setShowDropdown] = useState(false)
  const params = useParams()
  const currentPackId = params?.id as string

  // Find the current pack data
  const currentPack = etiquetteCategories.find((cat) => cat.id === currentPackId)

  const IconComponent = currentPack
    ? {
        Users,
        Utensils,
        MapPin,
        Gift,
      }[currentPack.icon] || Users
    : Users

  return (
    <div className="relative">
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
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />

          {/* Dropdown */}
          <Card className="absolute top-full right-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-64">
            <CardContent className="p-2">
              <div className="space-y-1">
                {etiquetteCategories.map((category) => {
                  const IconComponent =
                    {
                      Users,
                      Utensils,
                      MapPin,
                      Gift,
                    }[category.icon] || Users

                  return (
                    <Link key={category.id} href={`/etiquette-pack/${category.id}`}>
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
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

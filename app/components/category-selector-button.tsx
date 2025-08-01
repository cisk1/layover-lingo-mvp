"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Backpack, Hand, DollarSign, AlertTriangle, Users, Utensils, MapPin, Gift } from "lucide-react"
import { categories } from "../data/categories"

interface CategorySelectorButtonProps {
  value: string
  onChange: (value: string) => void
}

export default function CategorySelectorButton({ value, onChange }: CategorySelectorButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedCategory = categories.find((cat) => cat.id === value)

  const IconComponent = selectedCategory
    ? {
        Backpack,
        Hand,
        DollarSign,
        AlertTriangle,
        Users,
        Utensils,
        MapPin,
        Gift,
      }[selectedCategory.icon] || Backpack
    : null

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

  const handleCategoryChange = (categoryId: string) => {
    onChange(categoryId)
    setShowDropdown(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-[#3c3e41] hover:bg-[#4a4c4f] text-white border-0 flex items-center gap-2 min-w-48"
      >
        {selectedCategory ? (
          <>
            <div className="w-5 h-5 bg-[#e2b714] rounded-full flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-3 h-3 text-[#323437]" />
            </div>
            <span className="truncate">{selectedCategory.name}</span>
          </>
        ) : (
          <span>All Categories</span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${showDropdown ? "rotate-180" : ""}`} />
      </Button>

      {showDropdown && (
        <Card className="absolute top-full left-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-64">
          <CardContent className="p-2">
            <div className="space-y-1">
              <Button
                onClick={() => handleCategoryChange("all")}
                variant="ghost"
                className={`w-full justify-start text-left hover:bg-[#3c3e41] p-3 ${
                  value === "all" ? "bg-[#3c3e41]" : ""
                }`}
              >
                <span className="text-white">All Categories</span>
              </Button>

              <div className="border-t border-[#3c3e41] my-1" />

              {categories.map((category) => {
                const IconComponent =
                  {
                    Backpack,
                    Hand,
                    DollarSign,
                    AlertTriangle,
                    Users,
                    Utensils,
                    MapPin,
                    Gift,
                  }[category.icon] || Backpack

                return (
                  <Button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    variant="ghost"
                    className={`w-full justify-start text-left hover:bg-[#3c3e41] p-3 ${
                      category.id === value ? "bg-[#3c3e41]" : ""
                    }`}
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
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

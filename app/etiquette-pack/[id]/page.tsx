"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Bookmark, Users } from "lucide-react"
import { etiquettePacksData } from "../../data/etiquette-packs"
import EtiquetteCard from "../../components/etiquette-card"
import SearchBar from "../../components/search-bar"
import CountryHeaderButton from "../../components/country-header-button"
import CategorySelectorButton from "../../components/category-selector-button"
import ImportanceSelectorButton from "../../components/importance-selector-button"
import { useRouter } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default function EtiquettePackPage({ params }: PageProps) {
  const [bookmarkedTips, setBookmarkedTips] = useState<string[]>([])
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState(params.id)
  const [importanceFilter, setImportanceFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("")
  const router = useRouter()

  const packData = etiquettePacksData[params.id as keyof typeof etiquettePacksData]

  if (!packData) {
    return (
      <div className="min-h-screen bg-[#323437] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Etiquette Pack Not Found</h1>
          <Button onClick={() => window.history.back()} className="bg-[#e2b714] hover:bg-[#d4a613] text-[#323437]">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const toggleBookmark = (tipId: string) => {
    setBookmarkedTips((prev) => (prev.includes(tipId) ? prev.filter((id) => id !== tipId) : [...prev, tipId]))
  }

  const filteredTips = packData.tips.filter((tip) => {
    const matchesBookmarks = !showBookmarksOnly || bookmarkedTips.includes(tip.id)
    const matchesImportance = importanceFilter === "all" || tip.importance === importanceFilter
    const matchesCountry = !countryFilter || tip.country === countryFilter
    return matchesBookmarks && matchesImportance && matchesCountry
  })

  return (
    <div className="min-h-screen bg-[#323437]">
      {/* Primary Header */}
      <header className="bg-[#2c2e31] border-b border-[#3c3e41] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="text-white hover:bg-[#3c3e41]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <CountryHeaderButton
                currentCountry={countryFilter}
                onCountryChange={setCountryFilter}
                showClearOption={true}
              />
            </div>

            {/* Bookmarks Filter - Top Right */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/bookmarks")}
              className="bg-transparent border-[#3c3e41] text-white hover:bg-[#3c3e41]"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmarks ({bookmarkedTips.length})
            </Button>
          </div>
        </div>
      </header>

      {/* Secondary Header - Search and Filters */}
      <section className="px-4 py-6 bg-[#2c2e31] border-b border-[#3c3e41]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar - Left */}
            <div className="flex-1 max-w-md">
              <SearchBar
                placeholder="Search etiquette tips..."
                onResultClick={(result) => {
                  console.log("Search result clicked:", result)
                }}
              />
            </div>

            <div className="flex gap-4">
              {/* Category Filter */}
              <CategorySelectorButton value={categoryFilter} onChange={setCategoryFilter} />

              {/* Importance Filter */}
              <ImportanceSelectorButton value={importanceFilter} onChange={setImportanceFilter} />
            </div>
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {filteredTips.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tips found</h3>
              <p className="text-gray-300">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Inline tip for first-time users */}
              <div className="mb-6 text-center">
                <p className="text-gray-400 text-sm">
                  💡 <span className="text-[#e2b714]">Tip:</span> Click any card to discover detailed cultural insights!
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredTips.map((tip) => (
                  <EtiquetteCard
                    key={tip.id}
                    tip={tip}
                    isBookmarked={bookmarkedTips.includes(tip.id)}
                    onBookmark={() => toggleBookmark(tip.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Footer */}
      <footer className="bg-[#2c2e31] border-t border-[#3c3e41] px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <span>Total: {packData.tips.length} tips</span>
              <span>Showing: {filteredTips.length} tips</span>
              <span>Bookmarked: {bookmarkedTips.length} tips</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#e2b714]" />
              <span className="text-sm text-gray-300">Cultural insights from local experts</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

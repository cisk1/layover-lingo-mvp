"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Bookmark, Volume2 } from "lucide-react"
import { getContentByCategory } from "../../data/all-content"
import { getCategoryById } from "../../data/categories"
import ContentCard from "../../components/content-card"
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

export default function CategoryPage({ params }: PageProps) {
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState(params.id)
  const [importanceFilter, setImportanceFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("")
  const router = useRouter()

  const category = getCategoryById(params.id)
  const allContent = getContentByCategory(params.id)

  if (!category) {
    return (
      <div className="min-h-screen bg-[#323437] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
          <Button onClick={() => window.history.back()} className="bg-[#e2b714] hover:bg-[#d4a613] text-[#323437]">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const toggleBookmark = (itemId: string) => {
    setBookmarkedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const filteredContent = allContent.filter((item) => {
    const matchesBookmarks = !showBookmarksOnly || bookmarkedItems.includes(item.id)
    const matchesImportance = importanceFilter === "all" || item.importance === importanceFilter
    const matchesCountry = !countryFilter || item.country === countryFilter
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
              Bookmarks ({bookmarkedItems.length})
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
                placeholder="Search content..."
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

      {/* Content Grid */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No content found</h3>
              <p className="text-gray-300">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Category Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
                <p className="text-gray-300 text-lg">{category.description}</p>
                <div className="text-[#e2b714] font-semibold mt-2">{filteredContent.length} items</div>
              </div>

              {/* Inline tip for first-time users */}
              <div className="mb-6 text-center">
                <p className="text-gray-400 text-sm">
                  💡 <span className="text-[#e2b714]">Tip:</span> Click any card to discover cultural insights!
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredContent.map((item) => (
                  <ContentCard
                    key={item.id}
                    content={item}
                    isBookmarked={bookmarkedItems.includes(item.id)}
                    onBookmark={() => toggleBookmark(item.id)}
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
              <span>Total: {allContent.length} items</span>
              <span>Showing: {filteredContent.length} items</span>
              <span>Bookmarked: {bookmarkedItems.length} items</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#e2b714]" />
              <span className="text-sm text-gray-300">Cultural insights from local experts</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

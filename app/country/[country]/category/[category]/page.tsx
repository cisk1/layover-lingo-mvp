"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Bookmark, Volume2, Grid3X3, List, Play, BookmarkCheck } from "lucide-react"
import { getContentByCategory, getContentByCountry, getAllContent } from "../../../../data/all-content"
import { getCategoryById } from "../../../../data/categories"
import { getCountryByCode } from "../../../../data/countries"
import ContentCard from "../../../../components/content-card"
import SearchBar from "../../../../components/search-bar"
import CountryHeaderButton from "../../../../components/country-header-button"
import CategorySelectorButton from "../../../../components/category-selector-button"
import ImportanceSelectorButton from "../../../../components/importance-selector-button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useBookmarks } from "../../../../components/bookmarks-context"
import CountryFlag from "../../../../components/country-flag"

interface PageProps {
  params: {
    country: string
    category: string
  }
}

export default function CountryCategoryPage({ params }: PageProps) {
  const [importanceFilter, setImportanceFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards")
  const [currentCategory, setCurrentCategory] = useState(params.category)
  const router = useRouter()
  const { bookmarkedItems, toggleBookmark } = useBookmarks()

  const country = params.country === "all" ? null : getCountryByCode(params.country)
  const category = currentCategory === "all" ? null : getCategoryById(currentCategory)

  // Update current category when URL params change
  useEffect(() => {
    setCurrentCategory(params.category)
  }, [params.category])

  // Get content based on filters
  let allContent = getAllContent()

  if (country && category) {
    // Both country and category specified
    allContent = allContent.filter((item) => item.country === country.name && item.categories.includes(category.id))
  } else if (country) {
    // Only country specified
    allContent = getContentByCountry(country.name)
  } else if (category) {
    // Only category specified
    allContent = getContentByCategory(category.id)
  }

  // Filter by current category selection (client-side)
  if (currentCategory !== "all" && currentCategory !== params.category) {
    const selectedCategory = getCategoryById(currentCategory)
    if (selectedCategory) {
      allContent = allContent.filter((item) => item.categories.includes(selectedCategory.id))
    }
  }

  const filteredContent = allContent.filter((item) => {
    const matchesImportance = importanceFilter === "all" || item.importance === importanceFilter
    return matchesImportance
  })

  const handleCountryChange = (newCountry: string) => {
    const countryParam = newCountry || "all"
    router.push(`/country/${countryParam}/category/${currentCategory}`)
  }

  const handleCategoryChange = (newCategory: string) => {
    // Update state immediately for instant UI response
    setCurrentCategory(newCategory)

    // Update URL without page refresh
    const newUrl = `/country/${params.country}/category/${newCategory}`
    router.replace(newUrl, { scroll: false })
  }

  const getPageTitle = () => {
    const displayCategory = currentCategory === "all" ? null : getCategoryById(currentCategory)

    if (country && displayCategory) {
      return `${country.name} - ${displayCategory.name}`
    } else if (country) {
      return `${country.name} - All Categories`
    } else if (displayCategory) {
      return `All Countries - ${displayCategory.name}`
    }
    return "All Countries - All Categories"
  }

  const getPageDescription = () => {
    const displayCategory = currentCategory === "all" ? null : getCategoryById(currentCategory)

    if (country && displayCategory) {
      return `${displayCategory.description} specific to ${country.name}`
    } else if (country) {
      return `All cultural content for ${country.name}`
    } else if (displayCategory) {
      return displayCategory.description
    }
    return "Browse all cultural content"
  }

  return (
    <div className="min-h-screen bg-[#323437]">
      {/* Primary Header */}
      <header className="bg-[#2c2e31] border-b border-[#3c3e41] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-[#3c3e41]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <CountryHeaderButton
                currentCountry={params.country === "all" ? "" : params.country}
                onCountryChange={handleCountryChange}
                showClearOption={true}
              />
            </div>

            {/* Bookmarks Filter */}
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

      {/* Secondary Header - Search, Filters, and View Toggle */}
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

            <div className="flex gap-4 items-center">
              {/* Category Filter */}
              <CategorySelectorButton value={currentCategory} onChange={handleCategoryChange} />

              {/* Importance Filter */}
              <ImportanceSelectorButton value={importanceFilter} onChange={setImportanceFilter} />

              {/* View Toggle */}
              <div className="flex bg-[#3c3e41] rounded-lg p-1">
                <Button
                  variant={viewMode === "cards" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className={`${
                    viewMode === "cards"
                      ? "bg-[#e2b714] text-[#323437] hover:bg-[#d4a613]"
                      : "text-white hover:bg-[#4a4c4f]"
                  } px-3 py-1`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`${
                    viewMode === "list"
                      ? "bg-[#e2b714] text-[#323437] hover:bg-[#d4a613]"
                      : "text-white hover:bg-[#4a4c4f]"
                  } px-3 py-1`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
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
              {/* Page Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">{getPageTitle()}</h1>
                <p className="text-gray-300 text-lg">{getPageDescription()}</p>
                <div className="text-[#e2b714] font-semibold mt-2">{filteredContent.length} items</div>
              </div>

              {/* Inline tip for first-time users */}
              <div className="mb-6 text-center">
                <p className="text-gray-400 text-sm">
                  💡 <span className="text-[#e2b714]">Tip:</span> Click any card to discover cultural insights!
                </p>
              </div>

              {/* Content Grid/List */}
              {viewMode === "cards" ? (
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
              ) : (
                <div className="space-y-4">
                  {filteredContent.map((item) => (
                    <div key={item.id} className="bg-[#2c2e31] rounded-lg p-6 hover:bg-[#35373a] transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge
                              className={`${
                                item.importance === "high"
                                  ? "bg-red-500"
                                  : item.importance === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              } text-white text-xs`}
                            >
                              {item.importance}
                            </Badge>
                            <div className="flex items-center">
                              <CountryFlag
                                flag={getCountryByCode(item.country.toLowerCase().replace(/\s+/g, "-"))?.flag || "🌍"}
                                fallback={
                                  getCountryByCode(item.country.toLowerCase().replace(/\s+/g, "-"))?.fallback ||
                                  item.country.slice(0, 2).toUpperCase()
                                }
                                size="sm"
                              />
                            </div>
                          </div>

                          {item.type === "phrase" ? (
                            <div>
                              <h3 className="text-xl font-bold text-[#e2b714] mb-2">{item.phrase}</h3>
                              <p className="text-sm text-gray-300 mb-1">{item.romanization}</p>
                              <p className="text-lg text-white mb-2">{item.translation}</p>
                            </div>
                          ) : (
                            <div>
                              <h3 className="text-xl font-bold text-[#e2b714] mb-2">{item.title}</h3>
                              <p className="text-white mb-2">{item.summary}</p>
                            </div>
                          )}

                          <p className="text-sm text-gray-400 mb-3">{item.culturalNote || item.detail}</p>
                          <p className="text-xs text-gray-500">
                            Categories:{" "}
                            {item.categories
                              .map((catId) => getCategoryById(catId)?.name)
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          {item.type === "phrase" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-[#3c3e41] hover:bg-[#4a4c4f] text-white border-0"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(item.id)}
                            className="text-white hover:bg-[#3c3e41]"
                          >
                            {bookmarkedItems.includes(item.id) ? (
                              <BookmarkCheck className="w-4 h-4 text-[#e2b714]" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Stats Footer */}
      <footer className="bg-[#2c2e31] border-t border-[#3c3e41] px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <span>Total: {getAllContent().length} items</span>
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Bookmark, Volume2, Backpack, Hand, DollarSign, AlertTriangle } from "lucide-react"
import { phrasePacksData } from "../../data/phrase-packs"
import PhraseCard from "../../components/phrase-card-detailed"
import SearchBar from "../../components/search-bar"

interface PageProps {
  params: {
    id: string
  }
}

export default function PhrasePackPage({ params }: PageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [bookmarkedPhrases, setBookmarkedPhrases] = useState<string[]>([])
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)

  const packData = phrasePacksData[params.id as keyof typeof phrasePacksData]

  if (!packData) {
    return (
      <div className="min-h-screen bg-[#323437] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Phrase Pack Not Found</h1>
          <Button onClick={() => window.history.back()} className="bg-[#e2b714] hover:bg-[#d4a613] text-[#323437]">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const IconComponent =
    {
      Backpack,
      Hand,
      DollarSign,
      AlertTriangle,
    }[packData.icon] || Backpack

  const toggleBookmark = (phraseId: string) => {
    setBookmarkedPhrases((prev) =>
      prev.includes(phraseId) ? prev.filter((id) => id !== phraseId) : [...prev, phraseId],
    )
  }

  const filteredPhrases = packData.phrases.filter((phrase) => {
    const matchesLanguage = selectedLanguage === "all" || phrase.language === selectedLanguage
    const matchesBookmarks = !showBookmarksOnly || bookmarkedPhrases.includes(phrase.id)
    return matchesLanguage && matchesBookmarks
  })

  const languages = [...new Set(packData.phrases.map((p) => p.language))]

  return (
    <div className="min-h-screen bg-[#323437]">
      {/* Header */}
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
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#e2b714] rounded-full flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-[#323437]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{packData.name}</h1>
                  <p className="text-sm text-gray-300">{packData.phrases.length} phrases</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-[#e2b714] text-[#323437]">
              {packData.description}
            </Badge>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <section className="px-4 py-6 bg-[#2c2e31] border-b border-[#3c3e41]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <SearchBar
                placeholder="Search phrases..."
                onResultClick={(result) => {
                  // Handle search result click if needed
                  console.log("Search result clicked:", result)
                }}
              />
            </div>

            {/* Language Filter */}
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40 bg-[#3c3e41] border-0 text-white">
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent className="bg-[#2c2e31] border-[#3c3e41]">
                <SelectItem value="all" className="text-white hover:bg-[#3c3e41]">
                  All Languages
                </SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang} className="text-white hover:bg-[#3c3e41]">
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Bookmarks Filter */}
            <Button
              variant={showBookmarksOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`${
                showBookmarksOnly
                  ? "bg-[#e2b714] text-[#323437] hover:bg-[#d4a613]"
                  : "bg-transparent border-[#3c3e41] text-white hover:bg-[#3c3e41]"
              }`}
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmarks ({bookmarkedPhrases.length})
            </Button>
          </div>
        </div>
      </section>

      {/* Phrases Grid */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {filteredPhrases.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No phrases found</h3>
              <p className="text-gray-300">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhrases.map((phrase) => (
                <PhraseCard
                  key={phrase.id}
                  phrase={phrase}
                  isBookmarked={bookmarkedPhrases.includes(phrase.id)}
                  onBookmark={() => toggleBookmark(phrase.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Footer */}
      <footer className="bg-[#2c2e31] border-t border-[#3c3e41] px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <span>Total: {packData.phrases.length} phrases</span>
              <span>Showing: {filteredPhrases.length} phrases</span>
              <span>Bookmarked: {bookmarkedPhrases.length} phrases</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#e2b714]" />
              <span className="text-sm text-gray-300">Click any phrase to hear pronunciation</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

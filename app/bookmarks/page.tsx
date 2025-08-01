"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bookmark, Volume2, Grid3X3, List, Play, BookmarkCheck, Trash2, Zap, Crown } from "lucide-react"
import { getAllContent } from "../data/all-content"
import ContentCard from "../components/content-card"
import PaywallModal from "../components/paywall-modal"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useBookmarks } from "../components/bookmarks-context"
import { useAuth } from "../components/auth-context"
import CountryFlag from "../components/country-flag"
import { getCountryByCode } from "../data/countries"

export default function BookmarksPage() {
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards")
  const [showPaywall, setShowPaywall] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { bookmarkedItems, toggleBookmark, clearAllBookmarks, isGuestMode } = useBookmarks()

  // Get all content to find bookmarked items
  const allContent = getAllContent()
  const bookmarkedContent = allContent.filter((item) => bookmarkedItems.includes(item.id))

  const handleQuizMode = () => {
    setShowPaywall(true)
  }

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all bookmarks?")) {
      clearAllBookmarks()
    }
  }

  return (
    <div className="min-h-screen bg-[#323437]">
      {/* Clean Header for Bookmarks */}
      <header className="bg-[#2c2e31] border-b border-[#3c3e41] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-[#3c3e41]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Bookmark className="w-6 h-6 text-[#e2b714]" />
                <h1 className="text-xl font-bold text-white">My Bookmarks</h1>
                {isGuestMode && (
                  <Badge variant="outline" className="text-blue-400 border-blue-500 text-xs">
                    Guest
                  </Badge>
                )}
              </div>
            </div>

            {/* Quiz Mode Button - Premium Feature */}
            {bookmarkedContent.length > 0 && (
              <Button
                onClick={handleQuizMode}
                className="bg-gradient-to-r from-[#e2b714] to-[#d4a613] hover:from-[#d4a613] hover:to-[#c19612] text-[#323437] font-semibold flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Quiz Mode
                <Crown className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Secondary Header - View Toggle and Actions */}
      <section className="px-4 py-6 bg-[#2c2e31] border-b border-[#3c3e41]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <span className="text-lg font-semibold">
                {bookmarkedContent.length} {bookmarkedContent.length === 1 ? "item" : "items"} saved
              </span>
            </div>

            <div className="flex items-center gap-4">
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

              {/* Clear All Button */}
              {bookmarkedContent.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  className="bg-transparent border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {bookmarkedContent.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Bookmark className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">No bookmarks yet</h3>
              <p className="text-gray-300 mb-6">
                Start exploring and bookmark your favorite phrases and cultural tips!
              </p>
              {isGuestMode && (
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm mb-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-blue-300">Sign up to save bookmarks permanently</span>
                  </div>
                </div>
              )}
              <Button onClick={() => router.push("/")} className="bg-[#e2b714] hover:bg-[#d4a613] text-[#323437]">
                Explore Content
              </Button>
            </div>
          ) : (
            <>
              {/* Bookmarks Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Your Saved Content</h2>
                <p className="text-gray-300 mb-4">
                  You have <span className="text-[#e2b714] font-semibold">{bookmarkedContent.length}</span> bookmarked{" "}
                  {bookmarkedContent.length === 1 ? "item" : "items"}
                  {isGuestMode && <span className="text-blue-300"> (saved temporarily as guest)</span>}
                </p>

                {/* Quiz Mode Teaser */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e2b714]/20 to-[#d4a613]/20 border border-[#e2b714]/30 rounded-full px-4 py-2 text-sm">
                  <Zap className="w-4 h-4 text-[#e2b714]" />
                  <span className="text-gray-300">Ready to test your knowledge?</span>
                  <Badge className="bg-[#e2b714] text-[#323437] text-xs">Pro</Badge>
                </div>
              </div>

              {/* Content Grid/List */}
              {viewMode === "cards" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {bookmarkedContent.map((item) => (
                    <ContentCard
                      key={item.id}
                      content={item}
                      isBookmarked={true}
                      onBookmark={() => toggleBookmark(item.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {bookmarkedContent.map((item) => (
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
                              .map((catId) => {
                                // Simple category name mapping
                                const categoryNames: { [key: string]: string } = {
                                  essentials: "Travel Essentials",
                                  greetings: "Greetings & Social",
                                  dining: "Dining & Food",
                                  money: "Money & Shopping",
                                  business: "Business & Professional",
                                  emergencies: "Emergencies & Help",
                                  gifts: "Gifts & Celebrations",
                                }
                                return categoryNames[catId] || catId
                              })
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
                            <BookmarkCheck className="w-4 h-4 text-[#e2b714]" />
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
              <span>Bookmarked: {bookmarkedContent.length} items</span>
              <span>
                {bookmarkedContent.filter((item) => item.type === "phrase").length} phrases,{" "}
                {bookmarkedContent.filter((item) => item.type === "etiquette").length} etiquette tips
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#e2b714]" />
              <span className="text-sm text-gray-300">Your personal collection of cultural insights</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Paywall Modal */}
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} feature="Interactive Quiz Mode" />
    </div>
  )
}

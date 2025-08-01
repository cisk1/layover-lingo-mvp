"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

interface BookmarksContextType {
  bookmarkedItems: string[]
  toggleBookmark: (itemId: string) => void
  clearAllBookmarks: () => void
  isGuestMode: boolean
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined)

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])
  const [guestBookmarks, setGuestBookmarks] = useState<string[]>([])
  const { user } = useAuth()

  const isGuestMode = !user

  // Load bookmarks based on auth state
  useEffect(() => {
    if (user) {
      // Logged in: Load user bookmarks from localStorage (in real app, from API)
      const userBookmarksKey = `layoverlingo-bookmarks-${user.id}`
      const savedBookmarks = localStorage.getItem(userBookmarksKey)

      if (savedBookmarks) {
        try {
          const parsed = JSON.parse(savedBookmarks)
          setBookmarkedItems(Array.isArray(parsed) ? parsed : [])
        } catch (error) {
          console.error("Failed to parse user bookmarks:", error)
          setBookmarkedItems([])
        }
      } else {
        // Check if there are guest bookmarks to migrate
        const guestBookmarksData = localStorage.getItem("layoverlingo-guest-bookmarks")
        if (guestBookmarksData) {
          try {
            const parsed = JSON.parse(guestBookmarksData)
            if (Array.isArray(parsed) && parsed.length > 0) {
              // Migrate guest bookmarks to user account
              setBookmarkedItems(parsed)
              // Clear guest bookmarks after migration
              localStorage.removeItem("layoverlingo-guest-bookmarks")
            }
          } catch (error) {
            console.error("Failed to migrate guest bookmarks:", error)
          }
        }
      }
    } else {
      // Guest: Load guest bookmarks
      const savedGuestBookmarks = localStorage.getItem("layoverlingo-guest-bookmarks")
      if (savedGuestBookmarks) {
        try {
          const parsed = JSON.parse(savedGuestBookmarks)
          const guestData = Array.isArray(parsed) ? parsed : []
          setGuestBookmarks(guestData)
          setBookmarkedItems(guestData)
        } catch (error) {
          console.error("Failed to parse guest bookmarks:", error)
          setGuestBookmarks([])
          setBookmarkedItems([])
        }
      }
    }
  }, [user])

  // Save bookmarks when they change
  useEffect(() => {
    if (user) {
      // Save to user-specific key
      const userBookmarksKey = `layoverlingo-bookmarks-${user.id}`
      localStorage.setItem(userBookmarksKey, JSON.stringify(bookmarkedItems))
    } else {
      // Save to guest key
      localStorage.setItem("layoverlingo-guest-bookmarks", JSON.stringify(bookmarkedItems))
      setGuestBookmarks(bookmarkedItems)
    }
  }, [bookmarkedItems, user])

  const toggleBookmark = (itemId: string) => {
    setBookmarkedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const clearAllBookmarks = () => {
    setBookmarkedItems([])
    if (!user) {
      setGuestBookmarks([])
    }
  }

  return (
    <BookmarksContext.Provider value={{ bookmarkedItems, toggleBookmark, clearAllBookmarks, isGuestMode }}>
      {children}
    </BookmarksContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarksContext)
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider")
  }
  return context
}

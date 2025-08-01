"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, User, LogOut, Bookmark, Settings, ChevronDown } from "lucide-react"
import { useAuth } from "./auth-context"
import { useBookmarks } from "./bookmarks-context"
import AuthModals from "./auth-modals"
import PaywallModal from "./paywall-modal"
import Link from "next/link"

export default function SiteHeader() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const { user, logout } = useAuth()
  const { bookmarkedItems } = useBookmarks()

  const handleSwitchToSignup = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(true)
  }

  const handleSwitchToLogin = () => {
    setIsSignupOpen(false)
    setIsLoginOpen(true)
  }

  const handleUpgrade = () => {
    setShowPaywall(true)
  }

  return (
    <>
      <header className="bg-[#2c2e31] border-b border-[#3c3e41] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                <span className="text-white">Layover</span>
                <span className="text-[#e2b714]">Lingo</span>
              </div>
            </Link>

            {/* Navigation & User Menu */}
            <div className="flex items-center gap-4">
              {/* Bookmarks Link */}
              <Link href="/bookmarks">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#3c3e41]">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Bookmarks
                  {bookmarkedItems.length > 0 && (
                    <Badge className="ml-2 bg-[#e2b714] text-[#323437] text-xs">{bookmarkedItems.length}</Badge>
                  )}
                </Button>
              </Link>

              {user ? (
                /* Logged In User Menu */
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="text-white hover:bg-[#3c3e41] flex items-center gap-2"
                  >
                    {user.avatar ? (
                      <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-6 h-6 rounded-full" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="hidden md:inline">{user.name}</span>
                    {user.isPro && <Crown className="w-3 h-3 text-[#e2b714]" />}
                    <ChevronDown className="w-3 h-3" />
                  </Button>

                  {showUserMenu && (
                    <>
                      {/* Backdrop */}
                      <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />

                      {/* Dropdown */}
                      <Card className="absolute top-full right-0 mt-2 bg-[#2c2e31] border-[#3c3e41] shadow-xl z-50 min-w-48">
                        <CardContent className="p-2">
                          <div className="space-y-1">
                            {/* User Info */}
                            <div className="px-3 py-2 border-b border-[#3c3e41]">
                              <div className="text-white font-medium">{user.name}</div>
                              <div className="text-gray-400 text-xs">{user.email}</div>
                              {user.isPro ? (
                                <Badge className="bg-[#e2b714] text-[#323437] text-xs mt-1">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Pro
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-gray-400 border-gray-500 text-xs mt-1">
                                  Free
                                </Badge>
                              )}
                            </div>

                            {/* Menu Items */}
                            <Link href="/bookmarks">
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-left hover:bg-[#3c3e41] text-white"
                                onClick={() => setShowUserMenu(false)}
                              >
                                <Bookmark className="w-4 h-4 mr-3" />
                                My Bookmarks
                                {bookmarkedItems.length > 0 && (
                                  <Badge className="ml-auto bg-[#e2b714] text-[#323437] text-xs">
                                    {bookmarkedItems.length}
                                  </Badge>
                                )}
                              </Button>
                            </Link>

                            {!user.isPro && (
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  setShowUserMenu(false)
                                  handleUpgrade()
                                }}
                                className="w-full justify-start text-left hover:bg-[#3c3e41] text-[#e2b714]"
                              >
                                <Crown className="w-4 h-4 mr-3" />
                                Upgrade to Pro
                              </Button>
                            )}

                            <Button
                              variant="ghost"
                              className="w-full justify-start text-left hover:bg-[#3c3e41] text-white"
                            >
                              <Settings className="w-4 h-4 mr-3" />
                              Settings
                            </Button>

                            <div className="border-t border-[#3c3e41] my-1" />

                            <Button
                              variant="ghost"
                              onClick={() => {
                                setShowUserMenu(false)
                                logout()
                              }}
                              className="w-full justify-start text-left hover:bg-[#3c3e41] text-gray-400"
                            >
                              <LogOut className="w-4 h-4 mr-3" />
                              Sign out
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              ) : (
                /* Guest User Buttons */
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLoginOpen(true)}
                    className="text-white hover:bg-[#3c3e41]"
                  >
                    Sign in
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsSignupOpen(true)}
                    className="bg-[#e2b714] hover:bg-[#d4a613] text-[#323437] font-semibold"
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modals */}
      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onSignupClose={() => setIsSignupOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
        onSwitchToLogin={handleSwitchToLogin}
      />

      {/* Paywall Modal */}
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} feature="LayoverLingo Pro" />
    </>
  )
}

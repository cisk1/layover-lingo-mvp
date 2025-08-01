"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Bookmark,
  Volume2,
  Github,
  Mail,
  Zap,
  Crown,
  Backpack,
  Hand,
  DollarSign,
  AlertTriangle,
  Users,
  Utensils,
  MapPin,
  Gift,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import QuizOverlay from "./components/quiz-overlay"
import SiteHeader from "./components/site-header"
import CountryFlag from "./components/country-flag"
import { phraseSpotlights } from "./data/content"
import { countries } from "./data/countries"
import { categories } from "./data/categories"
import CountryDropdownButton from "./components/country-dropdown-button"
import { useAuth } from "./components/auth-context"
import { useBookmarks } from "./components/bookmarks-context"
import IntegratedSearchBar from "./components/integrated-search-bar"

export default function LayoverLingoLanding() {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [currentSpotlight, setCurrentSpotlight] = useState(0)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showQuizMode, setShowQuizMode] = useState(false)
  const { user } = useAuth()
  const { bookmarkedItems, isGuestMode } = useBookmarks()

  const nextSpotlight = () => {
    setCurrentSpotlight((prev) => (prev + 1) % phraseSpotlights.length)
  }

  const prevSpotlight = () => {
    setCurrentSpotlight((prev) => (prev - 1 + phraseSpotlights.length) % phraseSpotlights.length)
  }

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-[#323437]">
      {/* Site Header */}
      <SiteHeader />

      {/* Hero Section - Google-like */}
      <section className="h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 relative">
        <div className="text-center w-full max-w-4xl mx-auto">
          {/* Title and Subtitle - Reduced spacing */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-white">Layover</span>
              <span className="text-[#e2b714]">Lingo</span>
            </h1>
            <p className="text-lg text-gray-400">Quick reference for authentic phrases and local etiquette</p>
          </div>

          {/* Integrated Search Bar - Centered and wider */}
          <div className="w-full max-w-3xl mx-auto">
            <IntegratedSearchBar
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              placeholder="Choose a country, then search phrases..."
            />
          </div>
        </div>

        {/* Scroll Indicator Arrow - Fixed positioning */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Button
            variant="ghost"
            onClick={scrollToContent}
            className="flex flex-col items-center gap-2 text-white hover:text-[#e2b714] hover:bg-transparent group transition-colors duration-300"
          >
            <span className="text-sm opacity-70 group-hover:opacity-100">Scroll to explore</span>
            <div className="w-12 h-8 flex items-center justify-center">
              <ChevronDown className="w-8 h-8 animate-bounce" />
            </div>
          </Button>
        </div>
      </section>

      {/* Feature Trio - Moved up */}
      <section className="px-4 py-16 bg-[#2a2c2f]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e2b714] rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-[#323437]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Native-Speaker Audio</h3>
              <p className="text-gray-400 text-sm mb-3">Hear authentic pronunciation from locals</p>
              <Badge className="bg-green-500 text-white text-xs">Free</Badge>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e2b714] rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-6 h-6 text-[#323437]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Save Favorites</h3>
              <p className="text-gray-400 text-sm mb-3">Bookmark phrases for quick reference</p>
              <Badge className="bg-green-500 text-white text-xs">Free</Badge>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#e2b714] to-[#d4a613] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-[#323437]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Interactive Learning</h3>
              <p className="text-gray-400 text-sm mb-3">Quiz mode and progress tracking</p>
              <Badge className="bg-gradient-to-r from-[#e2b714] to-[#d4a613] text-[#323437] text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Countries and Categories Section - Side by Side with Better Alignment */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Countries Section */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-center mb-10 text-white">Explore by Country</h2>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {countries.map((country) => (
                  <Link key={country.code} href={`/country/${country.code}/category/all`}>
                    <Card className="bg-[#2c2e31] border-0 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full">
                      <CardContent className="p-4 text-center">
                        <div className="mb-3">
                          <CountryFlag flag={country.flag} fallback={country.fallback} size="lg" />
                        </div>
                        <h3 className="text-sm font-medium text-white">{country.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Section */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-center mb-10 text-white">Browse Categories</h2>
              <div className="grid grid-cols-1 gap-4 flex-1">
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
                    <Link key={category.id} href={`/country/all/category/${category.id}`}>
                      <Card className="bg-[#2c2e31] border-0 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full">
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <IconComponent className="w-8 h-8 text-[#e2b714]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Banner */}
      <section className="px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-[#e2b714] text-white">
            <CardContent className="p-6 text-center">
              <p className="text-lg mb-4">Love digging into local speech? Help us keep it free.</p>
              <Button variant="secondary" className="bg-white text-[#e2b714] hover:bg-gray-100">
                Support LayoverLingo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-8 text-white">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-0">
              <AccordionTrigger className="text-left text-white">TBD Question 1</AccordionTrigger>
              <AccordionContent className="text-gray-400">TBD Answer 1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-white">TBD Question 2</AccordionTrigger>
              <AccordionContent className="text-gray-400">TBD Answer 2</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-white">TBD Question 3</AccordionTrigger>
              <AccordionContent className="text-gray-400">TBD Answer 3</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2e31] border-t border-[#3c3e41] px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold text-[#e2b714] text-lg mb-3">LayoverLingo</h3>
              <p className="text-gray-400 text-sm">Explore the world one local phrase at a time.</p>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-white">Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#e2b714]">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#e2b714] flex items-center gap-2">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#e2b714] flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-white">Newsletter</h4>
              <div className="flex gap-2">
                <Input type="email" placeholder="Your email" className="text-sm bg-[#3c3e41] border-0 text-white" />
                <Button size="sm" className="bg-[#e2b714] hover:bg-[#d4a613] text-[#323437]">
                  Subscribe
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-white">Country</h4>
              <CountryDropdownButton value={selectedCountry} onChange={setSelectedCountry} />
            </div>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      <Dialog open={showAboutModal} onOpenChange={setShowAboutModal}>
        <DialogContent className="max-w-2xl bg-[#2c2e31] border-[#3c3e41]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#e2b714]">Why Phrases, Not Grammar?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-gray-300">
            <p>
              Traditional language learning focuses on grammar rules and vocabulary lists. But when you're traveling,
              you need practical phrases that actually work in real situations.
            </p>
            <p>
              LayoverLingo focuses on bite-sized expressions that locals actually use, complete with cultural context
              that textbooks miss. Our phrases come from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Native speakers in major cities worldwide</li>
              <li>Cultural consultants who validate regional variants</li>
              <li>Traveler feedback and real-world testing</li>
            </ul>
            <p>
              Found an error or want to suggest a phrase?
              <a href="#" className="text-[#e2b714] hover:underline ml-1">
                Contact us
              </a>{" "}
              - we love hearing from our community!
            </p>
            <div className="pt-4">
              <Button
                onClick={() => setShowAboutModal(false)}
                className="bg-[#e2b714] hover:bg-[#d4a613] text-[#323437]"
              >
                Got it!
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Overlay */}
      {showQuizMode && <QuizOverlay phrases={bookmarkedItems} onClose={() => setShowQuizMode(false)} />}
    </div>
  )
}

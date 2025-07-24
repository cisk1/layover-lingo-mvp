"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Bookmark,
  Volume2,
  Github,
  Mail,
  ChevronLeft,
  ChevronRight,
  Settings,
  Backpack,
  Hand,
  DollarSign,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import QuizOverlay from "./components/quiz-overlay"
import { phraseSpotlights, categories, languages, faqItems } from "./data/content"
import SearchBar from "./components/search-bar"

export default function LayoverLingoLanding() {
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [currentSpotlight, setCurrentSpotlight] = useState(0)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showQuizMode, setShowQuizMode] = useState(false)
  const [quizEnabled, setQuizEnabled] = useState(false)
  const [bookmarkedPhrases, setBookmarkedPhrases] = useState<string[]>([])

  const nextSpotlight = () => {
    setCurrentSpotlight((prev) => (prev + 1) % phraseSpotlights.length)
  }

  const prevSpotlight = () => {
    setCurrentSpotlight((prev) => (prev - 1 + phraseSpotlights.length) % phraseSpotlights.length)
  }

  const toggleBookmark = (phraseId: string) => {
    setBookmarkedPhrases((prev) =>
      prev.includes(phraseId) ? prev.filter((id) => id !== phraseId) : [...prev, phraseId],
    )
  }

  return (
    <div className="min-h-screen bg-[#323437]">
      {/* Hero Section - Google-like */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide">LayoverLingo</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A quick reference guide for authentic phrases and local etiquette
          </p>

          {/* Search Bar - Main Focus */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar placeholder="Search any phrase or topic" selectedLanguage={selectedLanguage} />
          </div>

          {/* Search Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={() => {
                const phrasePacks = document.getElementById("phrase-packs")
                phrasePacks?.scrollIntoView({ behavior: "smooth" })
              }}
              className="bg-[#3c3e41] hover:bg-[#4a4c4f] text-white border-0 px-6 py-3 rounded"
            >
              Phrase Packs
            </Button>
            <Button
              onClick={() => {
                const phraseSpotlight = document.getElementById("phrase-spotlight")
                phraseSpotlight?.scrollIntoView({ behavior: "smooth" })
              }}
              className="bg-[#3c3e41] hover:bg-[#4a4c4f] text-white border-0 px-6 py-3 rounded"
            >
              I'm Feeling Lucky
            </Button>
          </div>

          {/* Language Selector - Simplified */}
          <div className="max-w-md mx-auto mb-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="bg-[#2c2e31] border-0 text-white hover:bg-[#35373a]">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent className="bg-[#2c2e31] border-[#3c3e41]">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-[#3c3e41]">
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tertiary Link */}
          <button onClick={() => setShowAboutModal(true)} className="text-sm text-[#e2b714] hover:underline">
            Why phrases, not grammar? →
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center">
          <svg className="w-16 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 32 16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6l12 8 12-8" />
          </svg>
        </div>
      </section>

      {/* Phrase Packs Section - Full Screen */}
      <section id="phrase-packs" className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">Cultural Phrase Packs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent =
                {
                  Backpack,
                  Hand,
                  DollarSign,
                  AlertTriangle,
                }[category.icon] || Backpack

              return (
                <Link key={category.id} href={`/phrase-pack/${category.id}`}>
                  <Card className="bg-[#2c2e31] border-0 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <IconComponent className="w-12 h-12 text-[#e2b714]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{category.name}</h3>
                      <Badge variant="secondary" className="mb-3">
                        {category.count} phrases
                      </Badge>
                      <p className="text-gray-300">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center">
          <svg className="w-16 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 32 16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6l12 8 12-8" />
          </svg>
        </div>
      </section>

      {/* Phrase Spotlight Carousel */}
      <section id="phrase-spotlight" className="px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Phrase Spotlight</h2>
          <div className="relative">
            <Card className="bg-[#2c2e31] border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Button variant="ghost" size="sm" onClick={prevSpotlight} className="p-1">
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </Button>
                  <div className="flex space-x-1">
                    {phraseSpotlights.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full ${
                          index === currentSpotlight ? "bg-[#e2b714]" : "bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" onClick={nextSpotlight} className="p-1">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3 text-[#e2b714]">
                    {phraseSpotlights[currentSpotlight].phrase}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{phraseSpotlights[currentSpotlight].story}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Trio */}
      <section className="px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e2b714] rounded-full flex items-center justify-center mx-auto mb-3">
                <Volume2 className="w-6 h-6 text-[#323437]" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-white">Native-Speaker Audio</h3>
              <p className="text-gray-300">Hear authentic pronunciation from locals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e2b714] rounded-full flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6 text-[#323437]" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-white">Save Favorites</h3>
              <p className="text-gray-300">Bookmark phrases for quick reference</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e2b714] rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-[#323437]" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-white">Quiz Mode</h3>
              <p className="text-gray-300">Practice with interactive drills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Banner */}
      <section className="px-4 mb-8">
        <div className="max-w-4xl mx-auto">
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
      <section className="px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-white">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-300">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2e31] border-t border-[#3c3e41] px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-semibold text-[#e2b714] text-xl mb-2">LayoverLingo</h3>
              <p className="text-gray-300 text-sm">Explore the world one local phrase at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-white">Links</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#e2b714]">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#e2b714] flex items-center gap-2">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#e2b714] flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-white">Newsletter</h4>
              <div className="flex gap-2">
                <Input type="email" placeholder="Your email" className="text-sm bg-[#3c3e41] border-0 text-white" />
                <Button size="sm" className="bg-[#e2b714] hover:bg-[#d4a613] text-[#323437]">
                  Subscribe
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-white">Language</h4>
              <Select>
                <SelectTrigger className="w-full bg-[#3c3e41] border-0 text-white">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2e31] border-[#3c3e41]">
                  <SelectItem value="en" className="text-white hover:bg-[#3c3e41]">
                    English
                  </SelectItem>
                  <SelectItem value="es" className="text-white hover:bg-[#3c3e41]">
                    Español
                  </SelectItem>
                  <SelectItem value="fr" className="text-white hover:bg-[#3c3e41]">
                    Français
                  </SelectItem>
                </SelectContent>
              </Select>
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
      {showQuizMode && <QuizOverlay phrases={bookmarkedPhrases} onClose={() => setShowQuizMode(false)} />}

      {/* Quiz Mode Button */}
      {quizEnabled && bookmarkedPhrases.length > 0 && (
        <Button
          onClick={() => setShowQuizMode(true)}
          className="fixed bottom-6 right-6 bg-[#FFB30F] hover:bg-[#FFB30F]/90 text-white rounded-full p-4 shadow-lg"
        >
          Start Quiz ({bookmarkedPhrases.length})
        </Button>
      )}
    </div>
  )
}

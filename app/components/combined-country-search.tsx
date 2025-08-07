'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CountryDropdownButton from './country-dropdown-button'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CombinedCountrySearch({
  selectedCountry,
  onCountryChange,
  className,
}: {
  selectedCountry: string
  onCountryChange: (code: string) => void
  className?: string
}) {
  const [query, setQuery] = useState('')
  const [hasSelected, setHasSelected] = useState(!!selectedCountry)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (selectedCountry && !hasSelected) {
      setHasSelected(true)
      // Focus search after first selection
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [selectedCountry, hasSelected])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const country = selectedCountry || 'all'
    const q = query.trim()
    const url = q
      ? `/country/${country}/category/all?query=${encodeURIComponent(q)}`
      : `/country/${country}/category/all`
    router.push(url)
  }

  return (
    <div className={cn('w-full mx-auto max-w-3xl', className)}>
      {/* Phase 1: Only the big country selector */}
      <AnimatePresence initial={false} mode="popLayout">
        {!hasSelected ? (
          <motion.div
            key="selector-only"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl p-2 bg-gradient-to-r from-[#3a3c3f] to-[#2c2e31] shadow-lg"
          >
            <div className="rounded-lg bg-[#2c2e31] border border-[#3c3e41] p-3">
              <div className="text-left mb-2">
                <p className="text-sm text-gray-300">Start by selecting a country</p>
              </div>
              <CountryDropdownButton
                value={selectedCountry}
                onChange={onCountryChange}
              />
            </div>
          </motion.div>
        ) : (
          // Phase 2: Morph into search with country selector docked left
          <motion.div
            key="selector-search"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl p-2 bg-gradient-to-r from-[#3a3c3f] to-[#2c2e31] shadow-lg"
          >
            <div className="rounded-lg bg-[#2c2e31] border border-[#3c3e41] p-2">
              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <div className="shrink-0">
                  <CountryDropdownButton
                    value={selectedCountry}
                    onChange={onCountryChange}
                  />
                </div>
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search phrases and etiquette..."
                  className="flex-1 bg-[#3c3e41] border-0 text-white placeholder:text-gray-400"
                  aria-label="Search phrases and etiquette"
                />
                <Button type="submit" className="bg-[#e2b714] hover:bg-[#d4a613] text-[#323437]">
                  <Search className="w-4 h-4 mr-2" />
                  {'Search'}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
